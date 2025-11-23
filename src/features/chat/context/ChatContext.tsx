"use client";

import { Message } from "@/types";
import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";

interface ChatContextValue {
  messages: Message[];
  input: string;
  selectedModel: string;
  isLoading: boolean;
  setInput: (input: string) => void;
  setSelectedModel: (model: string) => void;
  addMessage: (message: Message) => void;
  addMessages: (messages: Message[]) => void;
  clearMessages: () => void;
  setIsLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const addMessages = useCallback((newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = useMemo<ChatContextValue>(
    () => ({
      messages,
      input,
      selectedModel,
      isLoading,
      setInput,
      setSelectedModel,
      addMessage,
      addMessages,
      clearMessages,
      setIsLoading,
    }),
    [messages, input, selectedModel, isLoading, addMessage, addMessages, clearMessages]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
