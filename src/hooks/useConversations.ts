import { useState, useCallback } from "react";
import { conversationAPI } from "@/lib/server-client";

interface Conversation {
  id: string;
  title: string;
  model: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: { messages: number };
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conversationAPI.list();
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  }, []);

  const createConversation = useCallback(
    async (title: string = "New Conversation", model: string) => {
      try {
        setLoading(true);
        setError(null);
        const newConversation = await conversationAPI.create({ title, model });
        setConversations((prev) => [newConversation, ...prev]);
        return newConversation;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create conversation";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateConversation = useCallback(async (id: string, title: string) => {
    try {
      setError(null);
      const updated = await conversationAPI.update(id, { title });
      setConversations((prev) =>
        prev.map((conv) => (conv.id === id ? { ...conv, ...updated } : conv))
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update conversation");
      throw err;
    }
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      setError(null);
      await conversationAPI.delete(id);
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete conversation");
      throw err;
    }
  }, []);

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    createConversation,
    updateConversation,
    deleteConversation,
  };
}
