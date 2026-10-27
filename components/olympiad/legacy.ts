"use client";

/**
 * TEMPORARY Phase-1 bridge (T1.8).
 * Maps the new JSON SubjectData onto the legacy `Olympiad` contract that the
 * pre-rebuild section components consume. Each piece is deleted as Phase 4
 * rebuilds its section (T4.3–T4.15). Do NOT add new features here.
 */
import type { LucideIcon } from "lucide-react";
import type { MotifKey, SubjectData } from "@/lib/types";
import { SUBJECT_ICONS } from "@/lib/data/icons";
import { layoutTopics } from "@/lib/layout";

export interface Resource {
  title: string;
  type: "PDF" | "Video" | "Link" | "Doc";
  fileUrl: string;
  topicIds?: string[];
}

export interface ModelPaper {
  title: string;
  year: string;
  fileUrl: string;
  duration?: string;
  problems?: number;
  difficulty?: number;
  topicIds?: string[];
}

export interface RoadmapStage {
  stage: string;
  description: string;
  outcome?: string;
  placeholder?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  blurb: string;
  subtopics: string[];
  /** legacy field — UI shows sub-topics since T0.11; kept for type compat */
  problems: number;
  x: number;
  y: number;
  featured?: boolean;
}

export interface ConstellationEdge {
  from: string;
  to: string;
}

export interface FeaturedProblem {
  title: string;
  topic: string;
  source: string;
  statement: string;
  hint: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface OlympiadMeta {
  duration: string;
  difficultyRange: string;
  format: string;
}

export interface SyllabusUnit {
  unit: string;
  weight: string;
  topics: string[];
}

export interface Olympiad {
  slug: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  colorVar: string;
  motif: MotifKey;
  disciplines: string[];
  meta: OlympiadMeta;
  topics: Topic[];
  syllabus: SyllabusUnit[];
  edges: ConstellationEdge[];
  featuredProblem: FeaturedProblem | null;
  studyMaterial: Resource[];
  modelPapers: ModelPaper[];
  roadmap: RoadmapStage[];
  syllabusFileUrl: string;
}

const LEGACY_TYPE: Record<string, Resource["type"]> = {
  book: "PDF", handout: "PDF", official: "PDF", problemset: "PDF",
  mock: "PDF", pastpaper: "PDF", dataset: "PDF",
  course: "Video", video: "Video", tool: "Link",
};

export function toOlympiad(data: SubjectData): Olympiad {
  const { meta } = data;
  const pos = layoutTopics(data.topics);

  const topics: Topic[] = data.topics.map((t) => {
    const p = pos[t.id] ?? { x: 50, y: 50, ring: "province" as const };
    return {
      id: t.id, name: t.name, blurb: t.blurb, subtopics: t.subtopics,
      problems: t.subtopics.length,
      x: p.x, y: p.y, featured: t.featured,
    };
  });

  // Edges only from declared prereqs — never invent dependencies (T4.10 rule).
  const edges: ConstellationEdge[] = data.topics.flatMap((t) =>
    (t.prereqs ?? []).map((from) => ({ from, to: t.id }))
  );

  // Unverified featured problems stay hidden until M-10 (T4.12 rule).
  const f = data.featured[0];
  const featuredProblem: FeaturedProblem | null =
    f && f.verified
      ? {
          title: f.title,
          topic: data.topics.find((t) => t.id === f.topicId)?.name ?? "",
          source: f.source.label,
          statement: f.statement,
          hint: f.hint,
          difficulty: f.difficulty,
        }
      : null;

  const studyMaterial: Resource[] = data.resources
    .filter((r) => r.access !== "dead")
    .map((r) => ({
      title: r.title,
      type: LEGACY_TYPE[r.type] ?? "Link",
      fileUrl: r.url,
      topicIds: r.topics,
    }));

  const modelPapers: ModelPaper[] = data.papers
    .filter((p) => p.access !== "dead")
    .map((p) => ({
      title: p.title,
      year: p.year != null ? String(p.year) : "General",
      fileUrl: p.files[0]?.url ?? "",
      duration: p.format.duration ?? undefined,
      problems: undefined,
      difficulty: undefined,
      topicIds: p.topics,
    }));

  const roadmap: RoadmapStage[] = data.roadmap.map((s) => ({
    stage: s.title,
    description: s.what,
    outcome: s.outcome,
    placeholder: s.placeholder,
  }));

  const intl = meta.levels.international;
  const contest =
    intl.officialName && intl.officialName.length <= 12 ? intl.officialName : intl.label;

  return {
    slug: meta.slug, name: meta.name, series: meta.series,
    tagline: meta.tagline, description: meta.description,
    icon: SUBJECT_ICONS[meta.iconKey],
    colorVar: meta.colorVar, motif: meta.motif,
    disciplines: data.topics.slice(0, 5).map((t) => t.name),
    meta: { duration: "", difficultyRange: contest, format: "" },
    topics,
    syllabus: [], // honest empty state until syllabus.json is transcribed (GS-6)
    edges,
    featuredProblem,
    studyMaterial,
    modelPapers,
    roadmap,
    syllabusFileUrl: meta.syllabusFileUrl,
  };
}

export function getOlympiadStats(o: Olympiad) {
  return {
    topics: o.topics.length,
    papers: o.modelPapers.length,
    resources: o.studyMaterial.length,
    subtopics: o.topics.reduce((n, t) => n + t.subtopics.length, 0),
  };
}
