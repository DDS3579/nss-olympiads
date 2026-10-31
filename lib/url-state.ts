/**
 * URL = source of truth for filters (plan §7.3, T4.2).
 * Pure helpers — the React provider lives in components/olympiad/UrlStateProvider.tsx.
 */
export type Filters = {
  level: string; // "all" | Level
  topic: string; // topic id or ""
  type: string;  // ResourceType or ""
  q: string;
  nepal: boolean;
  sol: boolean;
};

export const DEFAULT_FILTERS: Filters = {
  level: "all", topic: "", type: "", q: "", nepal: false, sol: false,
};

export const FILTER_KEYS = ["level", "topic", "type", "q", "nepal", "sol"] as const;

export function readFilters(search: string): Filters {
  const p = new URLSearchParams(search);
  return {
    level: p.get("level") || "all",
    topic: p.get("topic") || "",
    type: p.get("type") || "",
    q: p.get("q") || "",
    nepal: p.get("nepal") === "1",
    sol: p.get("sol") === "1",
  };
}

/** Serialize only non-default filters; keeps URLs short and shareable. */
export function filtersToSearch(f: Filters): string {
  const p = new URLSearchParams();
  if (f.level !== "all") p.set("level", f.level);
  if (f.topic) p.set("topic", f.topic);
  if (f.type) p.set("type", f.type);
  if (f.q) p.set("q", f.q);
  if (f.nepal) p.set("nepal", "1");
  if (f.sol) p.set("sol", "1");
  return p.toString();
}

export function countActive(f: Filters): number {
  return [f.level !== "all", !!f.topic, !!f.type, !!f.q, f.nepal, f.sol].filter(Boolean).length;
}

/**
 * Browser-only. Preserves unrelated params + hash. `push` for clicks (Back works),
 * `replace` for typing (no history spam).
 */
export function writeFilters(f: Filters, mode: "push" | "replace") {
  const p = new URLSearchParams(window.location.search);
  FILTER_KEYS.forEach((k) => p.delete(k));
  const qs = filtersToSearch(f);
  new URLSearchParams(qs).forEach((v, k) => p.set(k, v));
  const s = p.toString();
  const url = `${window.location.pathname}${s ? `?${s}` : ""}${window.location.hash}`;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}
