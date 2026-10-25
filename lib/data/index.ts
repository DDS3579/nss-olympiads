/**
 * lib/data/index.ts — SERVER-ONLY data loaders.
 * Never import this from a "use client" component. Server pages call these
 * and pass plain JSON down; icons travel as `iconKey` strings (R0.7).
 */
import fs from "node:fs";
import path from "node:path";
import { RAW, SLUGS } from "./registry.generated";
import { subjectStats } from "./stats";
import type { Level, Resource, SubjectData, SubjectIndexItem, SubjectMeta } from "@/lib/types";

const LEVEL_KEYS: Level[] = ["district", "province", "national", "international"];

const rawFor = (slug: string): Record<string, unknown> | null => {
  const all = RAW as Record<string, Record<string, unknown>>;
  return slug in all ? all[slug] : null;
};

/** Compute sizeBytes for hosted files (T8.4). Never throws. */
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
  const data: SubjectData = {
    meta: raw.meta as SubjectMeta,
    topics: (raw.topics ?? []) as SubjectData["topics"],
    // originals merge into the public library (§7.2)
    resources: withHostedSizes([
      ...((raw.resources ?? []) as Resource[]),
      ...((raw.originals ?? []) as Resource[]),
    ]),
    papers: (raw.papers ?? []) as SubjectData["papers"],
    syllabus: (raw.syllabus ?? []) as SubjectData["syllabus"],
    roadmap: (raw.roadmap ?? []) as SubjectData["roadmap"],
    featured: (raw.featured ?? []) as SubjectData["featured"],
    gaps: (raw.gaps ?? []) as SubjectData["gaps"],
  };
  return data;
}

export function getAllSubjects(): SubjectData[] {
  return (SLUGS as readonly string[])
    .map(getSubject)
    .filter((s): s is SubjectData => s != null);
}

/** Light index for nav / footer / switcher / search (no full records). */
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