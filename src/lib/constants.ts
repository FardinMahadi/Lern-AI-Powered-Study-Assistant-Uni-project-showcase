// Application constants
import { AIModel } from "@/types";

export const APP_NAME = "Lern";
export const APP_DESCRIPTION = "Your personal learning companion";
export const APP_VERSION = "1.0.0";

export const ROUTES = {
  HOME: "/",
  OVERVIEW: "/overview",
  CHAT: "/chat",
  NOTES: "/notes",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SETTINGS: "/settings",
};

export const AI_MODELS: AIModel[] = [
  {
    id: "openai/gpt-oss-20b",
    name: "GPT-OSS 20B",
    provider: "Groq",
    description: "Fast open-source 20B parameter model hosted on Groq.",
  },
  {
    id: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B",
    provider: "Groq",
    description: "Mixture of experts model optimized for long-form reasoning.",
  },
  {
    id: "llama-3.1-70b-versatile",
    name: "Llama 3.1 70B",
    provider: "Groq",
    description: "Balanced quality and speed for general-purpose chat.",
  },
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B",
    provider: "Groq",
    description: "Lightweight low-latency model for quick iterations.",
  },
];

export const NOTE_CATEGORIES: string[] = ["General", "Study", "Work", "Personal", "Research"];

export const COLORS = {
  primary: "#ffffff",
  accent: "#00D9FF",
  background: "#0a0a0a",
  surface: "#1a1a1a",
};
