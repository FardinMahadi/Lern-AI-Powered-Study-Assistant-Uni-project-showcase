// Auth slice for Zustand store
import { StateCreator } from "zustand";
import { AuthState } from "@/types/store";

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      error: null,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Implement login logic
      // const user = await signIn(email, password);
      // set({ user, isAuthenticated: true, isLoading: false });
      throw new Error("Login not implemented");
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Implement logout logic
      // await signOut();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Implement signup logic
      // const user = await signUp(email, password);
      // set({ user, isAuthenticated: true, isLoading: false });
      throw new Error("Signup not implemented");
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
});
