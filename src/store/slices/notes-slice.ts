// Notes slice for Zustand store
import { StateCreator } from "zustand";
import { NotesState } from "@/types/store";

export const createNotesSlice: StateCreator<NotesState> = (set, get) => ({
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,

  setNotes: (notes) => set({ notes }),

  setCurrentNote: (note) => set({ currentNote: note }),

  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
    })),

  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      ),
      currentNote:
        state.currentNote?.id === id
          ? { ...state.currentNote, ...updates }
          : state.currentNote,
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      currentNote: state.currentNote?.id === id ? null : state.currentNote,
    })),

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      // Implement fetch notes logic
      // const notes = await apiClient.get('/notes');
      // set({ notes, isLoading: false });
      set({ isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },
});
