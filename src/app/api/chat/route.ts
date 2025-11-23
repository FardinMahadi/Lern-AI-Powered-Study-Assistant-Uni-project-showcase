import groqClient from '@/lib/services/ai/groqClient';
import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse } from '@/types/api';

const DEFAULT_MODEL = 'llama-3.1-70b-versatile';
const FALLBACK_MODEL = 'llama-3.1-8b-instant';
const REQUEST_TIMEOUT = 60000; // 60 seconds

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Handle specific Groq API errors
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return 'Rate limit exceeded. Please wait a moment and try again.';
    }
    if (error.message.includes('401') || error.message.includes('unauthorized')) {
      return 'Authentication failed. Please check your API key configuration.';
    }
    if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      return 'Request timed out. The model may be busy. Please try again.';
    }
    if (error.message.includes('model') || error.message.includes('404')) {
      return 'Model not available. Trying fallback model...';
    }
    return error.message || 'An unexpected error occurred.';
  }
  return 'Failed to process chat request. Please try again.';
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model }: ChatRequest = await request.json();

    // Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Validate message structure
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: "Each message must have 'role' and 'content' fields" },
          { status: 400 }
        );
      }
    }

    const selectedModel = model || DEFAULT_MODEL;
    let lastError: Error | null = null;

    // Retry logic with fallback model
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const currentModel = attempt === MAX_RETRIES ? FALLBACK_MODEL : selectedModel;

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const completion = await groqClient.chat.completions.create(
          {
            model: currentModel,
            messages: messages.map(message => ({
              role: message.role,
              content: message.content,
            })),
            temperature: 0.7,
            max_tokens: 2048,
          },
          {
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        const choice = completion.choices[0]?.message?.content?.trim();

        if (!choice) {
          console.warn('Groq completion did not contain message content', completion);
          if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY * (attempt + 1));
            continue;
          }
          return NextResponse.json(
            { error: 'No content returned from the AI model' },
            { status: 502 }
          );
        }

        const aiResponse: ChatResponse = {
          id: completion.id || `chat-${Date.now()}`,
          role: 'assistant',
          content: choice,
          model: completion.model || currentModel,
          timestamp: completion.created
            ? new Date(completion.created * 1000).toISOString()
            : new Date().toISOString(),
        };

        return NextResponse.json(aiResponse);
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on certain errors
        if (
          lastError.message.includes('401') ||
          lastError.message.includes('unauthorized') ||
          lastError.message.includes('invalid')
        ) {
          break;
        }

        // If not last attempt, wait and retry
        if (attempt < MAX_RETRIES) {
          console.warn(`Attempt ${attempt + 1} failed, retrying...`, lastError.message);
          await sleep(RETRY_DELAY * (attempt + 1));
        }
      }
    }

    // All retries failed
    const errorMessage = getErrorMessage(lastError);
    console.error('Chat API Error (all retries failed):', lastError);

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? lastError?.message : undefined,
      },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error('Chat API Error (unexpected):', error);
    const errorMessage = getErrorMessage(error);

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
