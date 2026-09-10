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

export interface LastActivity {
  label: string;
  timestamp: number;
}

export interface NextAction {
  type: "topic" | "resource" | "paper";
  id: string;
  label: string;
}

export const STAGE_NAMES = [
  "Foundations",
  "Intermediate",
  "Advanced",
  "Simulation",
  "Olympiad",
];

interface ProgressData {
  startedTopics: string[];
  openedResources: string[];
  accessedPapers: string[];
  lastActivity: LastActivity | null;
}

interface ProgressState {
  percent: number;
  currentStage: number;
  currentStageName: string;
  hasStarted: boolean;
  lastActivity: LastActivity | null;
  isStarted: (id: string) => boolean;
  isResourceOpened: (id: string) => boolean;
  isPaperAccessed: (id: string) => boolean;
  toggleTopic: (id: string, label: string) => void;
  markResourceOpened: (id: string, label: string) => void;
  markPaperAccessed: (id: string, label: string) => void;
  nextTopic: Topic | null;
  nextAction: NextAction | null;
}

const ProgressContext = createContext<ProgressState | null>(null);

function getStageFromPercent(percent: number): number {
  if (percent < 25) return 0;
  if (percent < 50) return 1;
  if (percent < 70) return 2;
  if (percent < 90) return 3;
  return 4;
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
  const [data, setData] = useState<ProgressData>({
    startedTopics: [],
    openedResources: [],
    accessedPapers: [],
    lastActivity: null,
  });
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage (with legacy array-format migration)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setData({
            startedTopics: parsed.filter((id) => topics.some((t) => t.id === id)),
            openedResources: [],
            accessedPapers: [],
            lastActivity: null,
          });
        } else if (parsed && typeof parsed === "object") {
          setData({
            startedTopics: Array.isArray(parsed.startedTopics) ? parsed.startedTopics : [],
            openedResources: Array.isArray(parsed.openedResources) ? parsed.openedResources : [],
            accessedPapers: Array.isArray(parsed.accessedPapers) ? parsed.accessedPapers : [],
            lastActivity: parsed.lastActivity ?? null,
          });
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey, topics]);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data, hydrated, storageKey]);

  const toggleTopic = useCallback((id: string, label: string) => {
    setData((prev) => {
      const isRemoving = prev.startedTopics.includes(id);
      return {
        ...prev,
        startedTopics: isRemoving
          ? prev.startedTopics.filter((x) => x !== id)
          : [...prev.startedTopics, id],
        lastActivity: isRemoving
          ? prev.lastActivity
          : { label: `Started ${label}`, timestamp: Date.now() },
      };
    });
  }, []);

  const markResourceOpened = useCallback((id: string, label: string) => {
    setData((prev) => {
      if (prev.openedResources.includes(id)) return prev;
      return {
        ...prev,
        openedResources: [...prev.openedResources, id],
        lastActivity: { label: `Opened ${label}`, timestamp: Date.now() },
      };
    });
  }, []);

  const markPaperAccessed = useCallback((id: string, label: string) => {
    setData((prev) => {
      if (prev.accessedPapers.includes(id)) return prev;
      return {
        ...prev,
        accessedPapers: [...prev.accessedPapers, id],
        lastActivity: { label: `Started ${label}`, timestamp: Date.now() },
      };
    });
  }, []);

  const total = topics.length + resources.length + papers.length;
  const done =
    data.startedTopics.length + data.openedResources.length + data.accessedPapers.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const currentStage = getStageFromPercent(percent);
  const currentStageName = STAGE_NAMES[currentStage];
  const hasStarted = done > 0;

  const isStarted = useCallback(
    (id: string) => data.startedTopics.includes(id),
    [data.startedTopics]
  );
  const isResourceOpened = useCallback(
    (id: string) => data.openedResources.includes(id),
    [data.openedResources]
  );
  const isPaperAccessed = useCallback(
    (id: string) => data.accessedPapers.includes(id),
    [data.accessedPapers]
  );

  const nextTopic = useMemo(
    () => topics.find((t) => !data.startedTopics.includes(t.id)) ?? null,
    [topics, data.startedTopics]
  );

  const nextAction = useMemo<NextAction | null>(() => {
    const nt = topics.find((t) => !data.startedTopics.includes(t.id));
    if (nt) return { type: "topic", id: nt.id, label: nt.name };
    const nr = resources.find((r) => !data.openedResources.includes(r.title));
    if (nr) return { type: "resource", id: nr.title, label: nr.title };
    const np = papers.find((p) => !data.accessedPapers.includes(p.title));
    if (np) return { type: "paper", id: np.title, label: np.title };
    return null;
  }, [topics, resources, papers, data.startedTopics, data.openedResources, data.accessedPapers]);

  return (
    <ProgressContext.Provider
      value={{
        percent,
        currentStage,
        currentStageName,
        hasStarted,
        lastActivity: data.lastActivity,
        isStarted,
        isResourceOpened,
        isPaperAccessed,
        toggleTopic,
        markResourceOpened,
        markPaperAccessed,
        nextTopic,
        nextAction,
      }}
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