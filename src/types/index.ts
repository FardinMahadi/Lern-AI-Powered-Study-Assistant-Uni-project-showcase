// Core type definitions for the application

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  userId: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: number | string;
  role: "user" | "assistant" | "system";
  content: string;
  model?: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  userId: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
}

export type NoteCategory = "General" | "Study" | "Work" | "Personal" | "Research";

export type MessageRole = "user" | "assistant" | "system";

export type ToastType = "info" | "success" | "warning" | "error";

