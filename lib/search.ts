import { norm } from "@/lib/filter";

export type SearchItem = {
  id: string;
  k: "resource" | "paper" | "topic";
  s: string;    // subject slug
  sn: string;   // subject name
  cv?: string;  // subject colorVar (for the result dot)
  t: string;    // title / name
  ty?: string;
  lv?: string[];
  tp?: string[];
  w?: string;   // why / blurb
  np?: boolean;
  y?: number | null;
};

/** Token AND-search with weighted scoring (plan T5.3):
 *  title-prefix 5 · title-contains 3 · subject/topic 2 · why/blurb 1 · 🇳🇵 boost. Top 30. */
export function searchItems(items: SearchItem[], q: string): SearchItem[] {
  const tokens = norm(q).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = norm(item.t);
    const why = norm(item.w ?? "");
    const meta = `${norm(item.sn)} ${(item.tp ?? []).map(norm).join(" ")}`;
    let score = 0;
    let matched = true;
    for (const tok of tokens) {
      let s = 0;
      if (title.startsWith(tok)) s = 5;
      else if (title.includes(tok)) s = 3;
      if (meta.includes(tok)) s = Math.max(s, 2);
      if (why.includes(tok)) s = Math.max(s, 1);
      if (s === 0) {
        matched = false;
        break;
      }
      score += s;
    }
    if (!matched) continue;
    if (item.np) score += 0.5;
    scored.push({ item, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.item.t.localeCompare(b.item.t))
    .slice(0, 30)
    .map((x) => x.item);
}

/** Deep link for a search hit: topics → ?topic=; records → ?q= + hl= (flash highlight lands later). */
export function itemHref(item: SearchItem, q: string): string {
  if (item.k === "topic") {
    const topicId = item.id.split(":").slice(1).join(":");
    return `/olympiads/${item.s}?topic=${encodeURIComponent(topicId)}#topics`;
  }
  const section = item.k === "paper" ? "papers" : "library";
  return `/olympiads/${item.s}?q=${encodeURIComponent(q)}&hl=${encodeURIComponent(item.id)}#${section}`;
}

const RECENT_KEY = "nss:v2:recent-searches";

export function loadRecent(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function pushRecent(term: string, prev: string[]): string[] {
  const t = term.trim();
  if (!t) return prev;
  const next = [t, ...prev.filter((r) => r !== t)].slice(0, 5);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
  return next;
}
