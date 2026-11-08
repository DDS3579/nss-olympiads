/**
 * lib/data/index.ts — SERVER-ONLY data loaders.
 * Never import this from a "use client" component. Server pages call these
 * and pass plain JSON down; icons travel as `iconKey` strings.
 */
import fs from "node:fs";
import path from "node:path";
import { RAW, SLUGS } from "./registry.generated";
import { subjectStats } from "./stats";
import type {
  Level,
  Paper,
  Resource,
  SubjectData,
  SubjectIndexItem,
  SubjectMeta,
} from "@/lib/types";

const LEVEL_KEYS: Level[] = ["district", "province", "national", "international"];

/** Drafts (needsReview:true) are visible in dev, or in a preview deploy with SHOW_DRAFTS=1. */
const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1" || process.env.NODE_ENV === "development";
const live = <T extends { needsReview?: boolean }>(xs: T[]): T[] =>
  SHOW_DRAFTS ? xs : xs.filter((x) => !x.needsReview);

const rawFor = (slug: string): Record<string, unknown> | null => {
  const all = RAW as Record<string, Record<string, unknown>>;
  return slug in all ? all[slug] : null;
};

/** Compute sizeBytes for hosted files. Never throws. */
function withHostedSizes(items: Resource[]): Resource[] {
  return items.map((r) => {
    if (r.kind !== "hosted" || !r.url?.startsWith("/") || r.sizeBytes != null) return r;
    try {
      const file = path.join(process.cwd(), "public", decodeURI(r.url.split("#")[0]));
      return { ...r, sizeBytes: fs.statSync(file).size };
    } catch {
      return r;
    }
  });
}

export function getSubject(slug: string): SubjectData | undefined {
  const raw = rawFor(slug);
  if (!raw || raw.meta == null) return undefined;
  return {
    meta: raw.meta as SubjectMeta,
    topics: (raw.topics ?? []) as SubjectData["topics"],
    // originals (NSS-made guides) merge into the public library
    resources: withHostedSizes(
      live([...((raw.resources ?? []) as Resource[]), ...((raw.originals ?? []) as Resource[])])
    ),
    papers: live((raw.papers ?? []) as Paper[]),
    syllabus: (raw.syllabus ?? []) as SubjectData["syllabus"],
    roadmap: (raw.roadmap ?? []) as SubjectData["roadmap"],
    featured: (raw.featured ?? []) as SubjectData["featured"],
    gaps: (raw.gaps ?? []) as SubjectData["gaps"],
  };
}

/** All subjects in site order (series 01 → 07). */
export function getAllSubjects(): SubjectData[] {
  return (SLUGS as readonly string[])
    .map(getSubject)
    .filter((s): s is SubjectData => s != null)
    .sort((a, b) => a.meta.series.localeCompare(b.meta.series));
}

/** Light index for nav / footer / switcher / search / home (no full records). */
export function getSubjectIndex(): SubjectIndexItem[] {
  return getAllSubjects().map((s) => {
    const counts = subjectStats(s);
    return {
      slug: s.meta.slug,
      name: s.meta.name,
      series: s.meta.series,
      iconKey: s.meta.iconKey,
      colorVar: s.meta.colorVar,
      tagline: s.meta.tagline,
      grades: s.meta.grades,
      levels: Object.fromEntries(
        LEVEL_KEYS.map((k) => [
          k,
          { exists: s.meta.levels[k].exists, label: s.meta.levels[k].label },
        ])
      ) as SubjectIndexItem["levels"],
      counts: {
        resources: counts.resources,
        papers: counts.papers,
        nepal: counts.nepalSpecific,
      },
    };
  });
}
