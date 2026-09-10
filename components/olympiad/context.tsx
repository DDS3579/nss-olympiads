"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Topic, Resource, ModelPaper } from "@/lib/data/olympiads";

export interface ProgressState {
  isHydrated: boolean;
  topics: string[];
  resources: string[];
  papers: string[];
  percent: number;
  currentStage: number; // 0 to 4
  isTopicStarted: (id: string) => boolean;
  isResourceOpened: (id: string) => boolean;
  isPaperStarted: (id: string) => boolean;
  toggleTopic: (id: string) => void;
  markResourceOpened: (id: string) => void;
  markPaperStarted: (id: string) => void;
  nextTopic: Topic | null;
}

const ProgressContext = createContext<ProgressState | null>(null);

// Map percentage to the 5 roadmap stages
function getStageFromPercent(p: number): number {
  if (p === 0) return 0;
  if (p <= 20) return 0; // Foundations
  if (p <= 45) return 1; // Intermediate
  if (p <= 75) return 2; // Advanced
  if (p <= 95) return 3; // Simulation
  return 4;              // Olympiad
}

export function ProgressProvider({
  slug,
  topics,
  resources,
  papers,
  children,
}: {
  slug: string;
  topics: Topic[];
  resources: Resource[];
  papers: ModelPaper[];
  children: React.ReactNode;
}) {
  const storageKey = `olympiad-progress:${slug}`;
  
  const [isHydrated, setIsHydrated] = useState(false);
  const [topicsState, setTopicsState] = useState<string[]>([]);
  const [resourcesState, setResourcesState] = useState<string[]>([]);
  const [papersState, setPapersState] = useState<string[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.topics) setTopicsState(parsed.topics);
        if (parsed.resources) setResourcesState(parsed.resources);
        if (parsed.papers) setPapersState(parsed.papers);
      }
    } catch { /* ignore */ }
    setIsHydrated(true);
  }, [storageKey]);

  // Persist to localStorage
  const persist = useCallback((t: string[], r: string[], p: string[]) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ topics: t, resources: r, papers: p }));
    } catch { /* ignore */ }
  }, [storageKey]);

  const toggleTopic = useCallback((id: string) => {
    setTopicsState((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      persist(next, resourcesState, papersState);
      return next;
    });
  }, [persist, resourcesState, papersState]);

  const markResourceOpened = useCallback((id: string) => {
    setResourcesState((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persist(topicsState, next, papersState);
      return next;
    });
  }, [persist, topicsState, papersState]);

  const markPaperStarted = useCallback((id: string) => {
    setPapersState((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persist(topicsState, resourcesState, next);
      return next;
    });
  }, [persist, topicsState, resourcesState]);

  const totalItems = topics.length + resources.length + papers.length;
  const doneItems = topicsState.length + resourcesState.length + papersState.length;
  const percent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
  const currentStage = getStageFromPercent(percent);

  const isTopicStarted = useCallback((id: string) => topicsState.includes(id), [topicsState]);
  const isResourceOpened = useCallback((id: string) => resourcesState.includes(id), [resourcesState]);
  const isPaperStarted = useCallback((id: string) => papersState.includes(id), [papersState]);

  const nextTopic = useMemo(
    () => topics.find((t) => !topicsState.includes(t.id)) ?? null,
    [topics, topicsState]
  );

  return (
    <ProgressContext.Provider
      value={{
        isHydrated,
        topics: topicsState,
        resources: resourcesState,
        papers: papersState,
        percent,
        currentStage,
        isTopicStarted,
        isResourceOpened,
        isPaperStarted,
        toggleTopic,
        markResourceOpened,
        markPaperStarted,
        nextTopic,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useOlympiadProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useOlympiadProgress must be used within ProgressProvider");
  return ctx;
}