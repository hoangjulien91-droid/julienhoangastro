"use client";

/**
 * Bridges the currently-displayed flashcard's text to the StudyTools text-
 * to-speech button. The original Astro widget scraped #fcQ/#fcA by ID from
 * whatever page happened to be mounted; here Flashcards publishes its
 * current card text explicitly instead of being queried from the outside.
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface CurrentCardContextValue {
  text: string;
  setText: (text: string) => void;
}

const CurrentCardContext = createContext<CurrentCardContextValue | null>(null);

export function CurrentCardProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState("");
  const value = useMemo(() => ({ text, setText }), [text]);
  return (
    <CurrentCardContext.Provider value={value}>
      {children}
    </CurrentCardContext.Provider>
  );
}

export function useCurrentCardText() {
  const ctx = useContext(CurrentCardContext);
  if (!ctx)
    throw new Error(
      "useCurrentCardText must be used within a CurrentCardProvider",
    );
  return ctx;
}
