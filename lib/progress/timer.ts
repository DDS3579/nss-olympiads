import { useSyncExternalStore } from "react";

export type TimerStatus = "running" | "paused" | "timeup" | "finished";

export type TimerData = {
  paperId: string;
  slug: string;
  title: string;
  durationMs: number;
  endsAt: number | null; // when running
  pausedRemainingMs: number | null; // when paused
  status: TimerStatus;
  startedAt: number;
  sound: boolean;
};

const KEY = "nss:v2:timer";
let cache: TimerData | null = null;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as TimerData) : null;
  } catch {
    cache = null;
  }
}
function persist() {
  try {
    if (cache) localStorage.setItem(KEY, JSON.stringify(cache));
    else localStorage.removeItem(KEY);
  } catch {
    /* quota / private mode */
  }
  listeners.forEach((l) => l());
}

export const subscribe = (l: () => void) => {
  load();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
export const getSnapshot = () => cache;
export const getServerSnapshot = () => null;

export function remainingMs(t: TimerData, now = Date.now()): number {
  if (t.status === "running" && t.endsAt != null) return Math.max(0, t.endsAt - now);
  if (t.status === "paused" && t.pausedRemainingMs != null) return t.pausedRemainingMs;
  return 0;
}
export function usedMs(t: TimerData, now = Date.now()): number {
  return Math.max(0, Math.min(t.durationMs, t.durationMs - remainingMs(t, now)));
}

export const timerActions = {
  start(paperId: string, slug: string, title: string, durationMs: number, sound: boolean) {
    const now = Date.now();
    cache = {
      paperId, slug, title, durationMs,
      endsAt: now + durationMs, pausedRemainingMs: null,
      status: "running", startedAt: now, sound,
    };
    persist();
  },
  pause() {
    if (!cache || cache.status !== "running") return;
    cache = { ...cache, status: "paused", pausedRemainingMs: remainingMs(cache), endsAt: null };
    persist();
  },
  resume() {
    if (!cache || cache.status !== "paused") return;
    const now = Date.now();
    cache = {
      ...cache,
      status: "running",
      endsAt: now + (cache.pausedRemainingMs ?? 0),
      pausedRemainingMs: null,
    };
    persist();
  },
  reset() {
    if (!cache) return;
    const now = Date.now();
    cache = {
      ...cache,
      endsAt: now + cache.durationMs,
      pausedRemainingMs: null,
      status: "running",
      startedAt: now,
    };
    persist();
  },
  timeup() {
    if (!cache || cache.status !== "running") return;
    cache = { ...cache, status: "timeup", endsAt: null, pausedRemainingMs: 0 };
    persist();
  },
  setSound(on: boolean) {
    if (!cache) return;
    cache = { ...cache, sound: on };
    persist();
  },
  clear() {
    cache = null;
    persist();
  },
};

export function useTimer(): TimerData | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** "100 min" / "3 h 15 m" / "4.5 h" → ms. Returns null if unparseable. */
export function parseDurationMs(s: string | null | undefined): number | null {
  if (!s) return null;
  const lc = s.toLowerCase();
  let ms = 0;
  let matched = false;
  const h = lc.match(/([\d.]+)\s*(?:h|hr|hrs|hour|hours)/);
  const m = lc.match(/([\d.]+)\s*(?:m|min|mins|minute|minutes)/);
  if (h) {
    ms += parseFloat(h[1]) * 3_600_000;
    matched = true;
  }
  if (m) {
    ms += parseFloat(m[1]) * 60_000;
    matched = true;
  }
  if (!matched) {
    const num = lc.match(/([\d.]+)/);
    if (num) {
      ms += parseFloat(num[1]) * 60_000;
      matched = true;
    }
  }
  return matched && ms > 0 ? Math.round(ms) : null;
}

export function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
