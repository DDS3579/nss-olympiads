import { useSyncExternalStore } from "react";

export type Attempt = { at: number; usedMs: number; score?: number };

export type SubjectProgress = {
  done: string[];
  saved: string[];
  tracked: string[]; // record ids / topic ids
  checks: string[]; // syllabus checklist keys "sy:<sectionId>:<i>"
  paper: Record<string, { status: "attempted" | "reviewed"; attempts: Attempt[] }>;
  recent: { id: string; title: string; at: number }[]; // max 12
  level?: string;
};

type State = { v: 2; subjects: Record<string, SubjectProgress> };

const KEY = "nss:v2:progress";
const empty = (): SubjectProgress => ({ done: [], saved: [], tracked: [], checks: [], paper: {}, recent: [] });

let state: State = { v: 2, subjects: {} };
const listeners = new Set<() => void>();
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw);
    migrateV1();
  } catch {
    /* corrupt payload — start empty */
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode — keep in-memory state */
  }
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      try {
        state = JSON.parse(e.newValue || "{}");
      } catch {
        /* ignore */
      }
      listeners.forEach((l) => l());
    }
  });
}

export const subscribe = (l: () => void) => {
  load();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
export const getSnapshot = () => state; // immutable updates → new object each change
// Stable identity: returning a fresh object here makes useSyncExternalStore loop.
const SERVER_SNAPSHOT: State = Object.freeze({ v: 2, subjects: Object.freeze({}) }) as State;
export const getServerSnapshot = () => SERVER_SNAPSHOT;

const upd = (slug: string, fn: (s: SubjectProgress) => SubjectProgress) => {
  const cur = state.subjects[slug] ?? empty();
  state = { ...state, subjects: { ...state.subjects, [slug]: fn(cur) } };
  persist();
};

const toggle = (arr: string[], id: string) =>
  arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

export const actions = {
  toggleDone: (slug: string, id: string) => upd(slug, (s) => ({ ...s, done: toggle(s.done, id) })),
  toggleSaved: (slug: string, id: string) => upd(slug, (s) => ({ ...s, saved: toggle(s.saved, id) })),
  toggleTracked: (slug: string, id: string) => upd(slug, (s) => ({ ...s, tracked: toggle(s.tracked, id) })),
  toggleCheck: (slug: string, key: string) => upd(slug, (s) => ({ ...s, checks: toggle(s.checks, key) })),
  opened: (slug: string, id: string, title: string) =>
    upd(slug, (s) => ({
      ...s,
      recent: [{ id, title, at: Date.now() }, ...s.recent.filter((r) => r.id !== id)].slice(0, 12),
    })),
  setLevel: (slug: string, level: string) => upd(slug, (s) => ({ ...s, level })),
  attempt: (slug: string, paperId: string, a: Attempt) =>
    upd(slug, (s) => ({
      ...s,
      paper: {
        ...s.paper,
        [paperId]: { status: "attempted", attempts: [...(s.paper[paperId]?.attempts ?? []), a] },
      },
    })),
  markReviewed: (slug: string, paperId: string) =>
    upd(slug, (s) => ({
      ...s,
      paper: { ...s.paper, [paperId]: { ...(s.paper[paperId] ?? { attempts: [] }), status: "reviewed" } },
    })),
  reset: (slug?: string) => {
    state = slug
      ? { ...state, subjects: { ...state.subjects, [slug]: empty() } }
      : { v: 2, subjects: {} };
    persist();
  },
  exportJson: () => JSON.stringify(state, null, 2),
  importJson: (json: string) => {
    try {
      const p = JSON.parse(json);
      if (p?.v === 2 && p.subjects) {
        state = p;
        persist();
        return true;
      }
    } catch {
      /* ignore */
    }
    return false;
  },
};

function migrateV1() {
  // old key: olympiad-progress:<slug> → tracked topics only (titles can't be mapped to ids)
  for (const k of Object.keys(localStorage)) {
    if (!k.startsWith("olympiad-progress:")) continue;
    const slug = k.split(":")[1];
    try {
      const p = JSON.parse(localStorage.getItem(k) || "{}");
      const tracked: string[] = Array.isArray(p) ? p : (p.startedTopics ?? []);
      state.subjects[slug] = {
        ...(state.subjects[slug] ?? empty()),
        tracked: [...new Set([...(state.subjects[slug]?.tracked ?? []), ...tracked])],
      };
    } catch {
      /* ignore */
    }
    localStorage.removeItem(k);
  }
}

export function useProgress(slug: string): SubjectProgress {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return s.subjects[slug] ?? empty();
}
