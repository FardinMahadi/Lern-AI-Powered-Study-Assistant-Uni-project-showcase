import groqClient from "@/lib/services/ai/groqClient";
import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse } from "@/types/api";

const DEFAULT_MODEL = "openai/gpt-oss-20b";

export async function POST(request: NextRequest) {
  try {
    const { messages, model }: ChatRequest = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const completion = await groqClient.chat.completions.create({
      model: model || DEFAULT_MODEL,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const choice = completion.choices[0]?.message?.content?.trim();

    if (!choice) {
      console.warn("Groq completion did not contain message content", completion);
      return NextResponse.json({ error: "No content returned from Groq" }, { status: 502 });
    }

    const aiResponse: ChatResponse = {
      id: completion.id,
      role: "assistant",
      content: choice,
      model: completion.model,
      timestamp: new Date(completion.created * 1000).toISOString(),
    };

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }
}
