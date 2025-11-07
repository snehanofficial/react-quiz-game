import { create } from "zustand";
import { persist } from "zustand/middleware";
import questions from '../data/questions.js';

const useQBStore = create(
    persist(
        set => ({
            QB: questions,
            attemptHistory: [],
            setAttemptHistory: (attempt) => set((state) => ({
                attemptHistory: [...state.attemptHistory, attempt]
            })),
            clearHistory: () => set({ attemptHistory: [] })
        })
    )
);

export default useQBStore;