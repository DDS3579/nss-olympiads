import recordsJson from "@/data/shared/records.json";
import spotlightJson from "@/data/shared/spotlight.json";
import markingJson from "@/data/shared/marking-rules.json";
import operationsJson from "@/data/shared/operations.json";
import { getAllSubjects } from "./index";
import type { CountryRecord } from "@/lib/types";

export interface SpotlightEntry {
  name: string;
  headline: string;
  contest: string;
  year: number;
  story: string;
  sourceUrl: string;
  photo: string | null;
  consent: boolean;
  approvedBy: string;
  verified: boolean;
}

export interface MarkingRule {
  subject: string;
  round: string | null;
  wrongAnswer: string | null;
  notes: string | null;
  calculator: string | null;
  source: string;
}

export interface OperationRow {
  subject: string;
  organiser: { name: string; url?: string } | null;
  eligibility: string | null;
  grades: string | null;
  fee: string | null;
  registration: string | null;
  camp: string | null;
  contact: string | null;
}

export interface TimelineItem {
  subject: string;
  slug: string;
  colorVar: string;
  round: string;
  label: string;
  iso: string | null;
}

/** A record counts only when it has an official source URL. */
export function getRecords() {
  const all = recordsJson as unknown as CountryRecord[];
  const sourced = all.filter((r) => r.source && r.source.trim() !== "");
  const total = sourced.reduce((n, r) => n + r.gold + r.silver + r.bronze + r.hm, 0);
  return { all, sourced, total };
}

/** Only fully approved stories render: verified + consent + approver + source. */
export function getSpotlight(): SpotlightEntry[] {
  return (spotlightJson as unknown as SpotlightEntry[]).filter(
    (s) => s.verified && s.consent && s.approvedBy && s.sourceUrl
  );
}

export const getMarkingRules = () => markingJson as unknown as MarkingRule[];
export const getOperations = () => operationsJson as unknown as OperationRow[];

/** Every dated round milestone across all subjects, newest first; undated last. */
export function getTimeline(): TimelineItem[] {
  const items: TimelineItem[] = getAllSubjects().flatMap((s) =>
    s.meta.rounds.flatMap((r) =>
      (r.dates ?? []).map((d) => ({
        subject: s.meta.name,
        slug: s.meta.slug,
        colorVar: s.meta.colorVar,
        round: r.name,
        label: d.label,
        iso: d.iso,
      }))
    )
  );
  const end = (i: TimelineItem) => (i.iso ? i.iso.split("/").pop()! : "");
  const dated = items.filter((i) => i.iso).sort((a, b) => end(b).localeCompare(end(a)));
  const undated = items.filter((i) => !i.iso);
  return [...dated, ...undated];
}

/** Unique authors of Nepal-specific material — feeds the Credits list on /about. */
export function getNepalAuthors(): string[] {
  const names = new Set<string>();
  for (const s of getAllSubjects()) {
    for (const x of [...s.resources, ...s.papers]) {
      if (x.nepalSpecific && x.author?.trim()) names.add(x.author.trim());
    }
  }
  return [...names].sort((a, b) => a.localeCompare(b));
}
