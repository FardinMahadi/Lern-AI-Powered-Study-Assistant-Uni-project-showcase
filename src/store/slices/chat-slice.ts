// Chat slice for Zustand store
import { StateCreator } from "zustand";
import { ChatState } from "@/types/store";

export const createChatSlice: StateCreator<ChatState> = (set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  selectedModel: "gpt-4",
  isLoading: false,
  error: null,

  setConversations: (conversations) => set({ conversations }),

  setCurrentConversation: (conversation) =>
    set({ currentConversation: conversation }),

  setMessages: (messages) => set({ messages }),

  setSelectedModel: (model) => set({ selectedModel: model }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  sendMessage: async (content) => {
    const { messages, selectedModel } = get();
    const userMessage = {
      id: Date.now(),
      role: "user" as const,
      content,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Implement AI API call
      // const response = await apiClient.post('/chat', {
      //   messages: [...messages, userMessage],
      //   model: selectedModel,
      // });

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant" as const,
        content: `This is a simulated response from ${selectedModel}`,
        model: selectedModel,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, aiMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearMessages: () => set({ messages: [] }),

  deleteMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
});
