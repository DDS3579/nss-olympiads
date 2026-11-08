import type { SubjectData } from "@/lib/types";

export function subjectStats(s: SubjectData) {
  const live = (a: { access: string }) => a.access !== "dead";
  const lastVerified =
    [...s.resources, ...s.papers].map((x) => x.verified).sort().at(-1) ?? null;
  return {
    resources: s.resources.filter(live).length,
    papers: s.papers.filter(live).length,
    nepalSpecific: [...s.resources, ...s.papers].filter((x) => x.nepalSpecific).length,
    topics: s.topics.length,
    syllabusSections: s.syllabus.length,
    subtopics: s.topics.reduce((n, t) => n + t.subtopics.length, 0),
    levelsAvailable: (Object.values(s.meta.levels) as { exists: boolean }[]).filter(
      (l) => l.exists
    ).length,
    gapsOpen: s.gaps.filter((g) => g.status !== "published").length,
    lastVerified,
  };
}

export const siteStats = (all: SubjectData[]) =>
  all.reduce(
    (a, s) => {
      const st = subjectStats(s);
      a.resources += st.resources;
      a.papers += st.papers;
      a.nepal += st.nepalSpecific;
      return a;
    },
    { resources: 0, papers: 0, nepal: 0 }
  );