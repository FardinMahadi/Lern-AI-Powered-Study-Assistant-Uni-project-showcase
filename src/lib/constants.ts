// Application constants
import { AIModel } from "@/types";

export const APP_NAME = "Lern";
export const APP_DESCRIPTION = "Your personal learning companion";
export const APP_VERSION = "1.0.0";

export const ROUTES = {
  HOME: "/",
  CHAT: "/chat",
  NOTES: "/notes",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/overview",
  SETTINGS: "/settings",
};

export const AI_MODELS: AIModel[] = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "llama-3", name: "Llama 3", provider: "Meta" },
];

export const NOTE_CATEGORIES: string[] = [
  "General",
  "Study",
  "Work",
  "Personal",
  "Research",
];

export const COLORS = {
  primary: "#ffffff",
  accent: "#00D9FF",
  background: "#0a0a0a",
  surface: "#1a1a1a",
};
