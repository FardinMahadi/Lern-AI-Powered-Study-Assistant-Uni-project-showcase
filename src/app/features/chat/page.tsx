"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { AI_MODELS } from "@/lib/constants";
import { Message } from "@/types";
import apiClient from "@/lib/api-client";
import { ChatResponse } from "@/types/api";
import { useDashboardLayout } from "@/layouts/dashboard";
import { ChatEmptyState, ChatMessageList, ChatInputArea } from "./components";
import { BRAND_COLORS } from "./ChatStyles";

const AUTO_HIDE_THRESHOLD = 6;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { hideSidebar, showSidebar } = useDashboardLayout();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length >= AUTO_HIDE_THRESHOLD) {
      hideSidebar();
    } else {
      showSidebar();
    }
    return () => {
      showSidebar();
    };
  }, [messages.length, hideSidebar, showSidebar]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiClient.post<ChatResponse>("/chat", {
        messages: updatedMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        model: selectedModel,
      });

      const aiMessage: Message = {
        id: response.id,
        role: "assistant",
        content: response.content,
        model: response.model,
        timestamp: new Date(response.timestamp),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error("Failed to fetch AI response:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, I couldn't reach the AI service right now. Please try again.",
        model: selectedModel,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: BRAND_COLORS.neutralDark,
      }}
    >
      {/* Messages Container */}
      <Box sx={{ flexGrow: 1, overflow: "auto", pb: 2 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {messages.length === 0 ? (
            <ChatEmptyState
              selectedModel={selectedModel}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          )}
        </Container>
      </Box>

      {/* Input Area */}
      <ChatInputArea
        input={input}
        selectedModel={selectedModel}
        isLoading={isLoading}
        messageCount={messages.length}
        onInputChange={setInput}
        onModelChange={setSelectedModel}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}
