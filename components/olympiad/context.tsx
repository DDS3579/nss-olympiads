"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Topic } from "@/lib/data/olympiads";

interface ProgressState {
  started: string[];
  percent: number;
  isStarted: (id: string) => boolean;
  toggle: (id: string) => void;
  nextTopic: Topic | null;
}

const ProgressContext = createContext<ProgressState | null>(null);

export function ProgressProvider({
  slug,
  topics,
  children,
}: {
  slug: string;
  topics: Topic[];
  children: React.ReactNode;
}) {
  const storageKey = `olympiad-progress:${slug}`;
  const [started, setStarted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          setStarted(arr.filter((id) => topics.some((t) => t.id === id)));
        }
      }
    } catch {
      /* ignore */
    }
  }, [storageKey, topics]);

  const toggle = useCallback(
    (id: string) => {
      setStarted((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [storageKey]
  );

  const percent = topics.length
    ? Math.round((started.length / topics.length) * 100)
    : 0;

  const isStarted = useCallback((id: string) => started.includes(id), [started]);

  const nextTopic = useMemo(
    () => topics.find((t) => !started.includes(t.id)) ?? null,
    [topics, started]
  );

  return (
    <ProgressContext.Provider
      value={{ started, percent, isStarted, toggle, nextTopic }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useOlympiadProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useOlympiadProgress must be used within ProgressProvider");
  }
  return ctx;
}