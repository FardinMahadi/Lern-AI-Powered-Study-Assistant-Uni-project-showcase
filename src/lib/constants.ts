// Application constants
import { AIModel } from '@/types';

export const APP_NAME = 'Lern';
export const APP_DESCRIPTION = 'Your personal learning companion';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  OVERVIEW: '/overview',
  CHAT: '/chat',
  NOTES: '/notes',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SETTINGS: '/settings',
};

export const AI_MODELS: AIModel[] = [
  {
    id: 'llama-3.1-70b-versatile',
    name: 'Llama 3.1 70B',
    provider: 'Groq',
    description:
      "Meta's powerful 70B model - excellent for complex reasoning and long conversations.",
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    provider: 'Groq',
    description:
      'Mixture of experts model - exceptional for long-form reasoning and complex queries.',
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    provider: 'Groq',
    description: 'Fast and efficient 8B model - great for quick responses and general chat.',
  },
  {
    id: 'llama-3.2-3b-instruct',
    name: 'Llama 3.2 3B',
    provider: 'Groq',
    description: 'Lightweight 3B model - ultra-fast responses for simple queries.',
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    provider: 'Groq',
    description: "Google's Gemma 2 model - balanced performance with fast inference.",
  },
  {
    id: 'deepseek-r1-distill-llama-8b',
    name: 'DeepSeek R1 8B',
    provider: 'Groq',
    description: "DeepSeek's reasoning model - excellent for step-by-step problem solving.",
  },
];

export const NOTE_CATEGORIES: string[] = ['General', 'Study', 'Work', 'Personal', 'Research'];

export const COLORS = {
  primary: '#ffffff',
  accent: '#00D9FF',
  background: '#0a0a0a',
  surface: '#1a1a1a',
};
