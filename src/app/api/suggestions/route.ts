import { NextResponse } from 'next/server';
import { SuggestionsResponse } from '@/types/api';

// Icon mapping for suggestions
const ICON_MAP: Record<string, string> = {
  lightbulb: 'lightbulb',
  code: 'code',
  trending: 'trending',
  book: 'book',
  question: 'question',
  calculator: 'calculator',
  science: 'science',
  language: 'language',
};

// Default suggestions fallback
const DEFAULT_SUGGESTIONS = [
  {
    label: 'Explain quantum computing',
    prompt: 'Explain quantum computing in simple terms',
    icon: 'lightbulb',
  },
  {
    label: 'Write Python code',
    prompt: 'Write a Python function to sort a list',
    icon: 'code',
  },
  {
    label: 'Latest AI trends',
    prompt: 'What are the latest AI trends?',
    icon: 'trending',
  },
];

export async function GET(): Promise<NextResponse<SuggestionsResponse>> {
  try {
    // In the future, this could fetch from a database or external API
    // For now, we'll return dynamic suggestions based on context
    // You can customize this to fetch from your backend or AI service

    // Example: Could fetch from an external API or database
    // const response = await fetch('https://your-api.com/suggestions');
    // const data = await response.json();

    // For now, return default suggestions
    // In production, you might want to:
    // 1. Fetch from a database
    // 2. Generate suggestions based on user history
    // 3. Use AI to generate contextual suggestions
    // 4. Cache suggestions for performance

    const suggestions = DEFAULT_SUGGESTIONS.map(suggestion => ({
      label: suggestion.label,
      prompt: suggestion.prompt,
      icon: ICON_MAP[suggestion.icon] || 'lightbulb',
    }));

    // Validate response structure
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      console.warn('Suggestions array is empty or invalid, using defaults');
      const fallbackSuggestions = DEFAULT_SUGGESTIONS.map(suggestion => ({
        label: suggestion.label,
        prompt: suggestion.prompt,
        icon: ICON_MAP[suggestion.icon] || 'lightbulb',
      }));
      return NextResponse.json({ suggestions: fallbackSuggestions }, { status: 200 });
    }

    console.log(`[Suggestions API] Returning ${suggestions.length} suggestions`);
    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error('[Suggestions API] Error fetching suggestions:', error);

    // Log error details for debugging
    if (error instanceof Error) {
      console.error('[Suggestions API] Error message:', error.message);
      console.error('[Suggestions API] Error stack:', error.stack);
    }

    // Return default suggestions on error
    const suggestions = DEFAULT_SUGGESTIONS.map(suggestion => ({
      label: suggestion.label,
      prompt: suggestion.prompt,
      icon: ICON_MAP[suggestion.icon] || 'lightbulb',
    }));

    return NextResponse.json({ suggestions }, { status: 200 });
  }
}
