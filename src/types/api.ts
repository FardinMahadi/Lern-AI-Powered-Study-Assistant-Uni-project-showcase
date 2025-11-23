// API related type definitions

export interface APIResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  model: string;
}

export interface ChatResponse {
  id: number | string;
  role: 'assistant';
  content: string;
  model: string;
  timestamp: string;
}

export interface NoteCreateRequest {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}

export interface NoteUpdateRequest extends Partial<NoteCreateRequest> {
  id: string;
}

export interface AIGenerateRequest {
  prompt: string;
  model: string;
  type: 'quiz' | 'flashcard' | 'summary' | 'explanation';
}

export interface AIGenerateResponse {
  content: string;
  type: string;
  model: string;
  timestamp: string;
}

export interface Suggestion {
  label: string;
  prompt: string;
  icon?: string;
}

export interface SuggestionsResponse {
  suggestions: Suggestion[];
}
