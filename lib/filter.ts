import type { Level, Paper, Resource } from "@/lib/types";
import type { Filters } from "@/lib/url-state";

export const norm = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

/** Fields shared by Resource and Paper that filters care about. */
type Filterable = {
  title: string;
  levels: Level[];
  topics: string[];
  nepalSpecific: boolean;
  why: string;
  author?: string;
  type: string;
};

export function matchesBase(r: Filterable, f: Filters): boolean {
  if (f.level !== "all" && !r.levels.includes(f.level as Level)) return false;
  // untagged items are shown only when the topic filter is off (plan T4.5)
  if (f.topic && !r.topics.includes(f.topic)) return false;
  if (f.type && r.type !== f.type) return false;
  if (f.nepal && !r.nepalSpecific) return false;
  if (f.q) {
    const hay = norm(`${r.title} ${r.why} ${r.author ?? ""} ${r.topics.join(" ")}`);
    if (!f.q.split(/\s+/).every((t) => hay.includes(norm(t)))) return false;
  }
  return true;
}

export const matchResource = (r: Resource, f: Filters) => matchesBase(r, f);

export function matchPaper(p: Paper, f: Filters): boolean {
  return matchesBase(p, f) && (!f.sol || p.hasSolutions);
}

/** Records whose files are all solutions — rendered as the soft-gated Answers block, never as paper cards (T1.6/T4.7). */
export const isAnswerSet = (p: Paper) =>
  p.files.length > 0 && p.files.every((f) => f.kind === "solutions");
