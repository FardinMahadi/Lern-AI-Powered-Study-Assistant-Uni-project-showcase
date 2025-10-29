import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createNotesSlice } from "./slices/notes-slice";
import { createChatSlice } from "./slices/chat-slice";
import { Store } from "@/types/store";

// Combine all slices into one store
export const useStore = create<Store>()((...a) => ({
  ...createAuthSlice(...a),
  ...createNotesSlice(...a),
  ...createChatSlice(...a),
}));

// Individual hooks for better organization (optional)
export const useAuth = () =>
  useStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    setUser: state.setUser,
    login: state.login,
    logout: state.logout,
    signup: state.signup,
  }));

export const useNotes = () =>
  useStore((state) => ({
    notes: state.notes,
    currentNote: state.currentNote,
    isLoading: state.isLoading,
    error: state.error,
    setNotes: state.setNotes,
    setCurrentNote: state.setCurrentNote,
    addNote: state.addNote,
    updateNote: state.updateNote,
    deleteNote: state.deleteNote,
    fetchNotes: state.fetchNotes,
  }));

export const useChat = () =>
  useStore((state) => ({
    conversations: state.conversations,
    currentConversation: state.currentConversation,
    messages: state.messages,
    selectedModel: state.selectedModel,
    isLoading: state.isLoading,
    error: state.error,
    setSelectedModel: state.setSelectedModel,
    addMessage: state.addMessage,
    sendMessage: state.sendMessage,
    clearMessages: state.clearMessages,
    deleteMessage: state.deleteMessage,
  }));
