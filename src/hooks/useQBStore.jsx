import { create } from "zustand";
import { persist } from "zustand/middleware";
import questions from '../data/questions.js';

const useQBStore = create(
    persist(
        set => ({
            QB: questions,
            attemptHistory: [],
            setAttemptHistory: (attempt) => {set({attemptHistory: attempt})}
        })
    )
);

export default useQBStore;