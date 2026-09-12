"use client";

import { getOlympiadBySlug } from "@/lib/data/olympiads";
import { ProgressProvider } from "./context";
import { OlympiadHero } from "./OlympiadHero";
import { OlympiadNav } from "./OlympiadNav";
import { TopicFocusBar } from "./TopicFocusBar";
import { StudyMaterialSection } from "./StudyMaterialSection";
import { ModelPapersSection } from "./ModelPapersSection";
import { SyllabusSection } from "./SyllabusSection";
import { Constellation } from "./Constellation";
import { OlympiadTopics } from "./OlympiadTopics";
import { FeaturedProblem } from "./FeaturedProblem";
import { PreparationRoadmap } from "./PreparationRoadmap";
import { NextStep } from "./NextStep";
import { OlympiadCTA } from "./OlympiadCTA";

function GoDeeper({ colorVar }: { colorVar: string }) {
  return (
    <div className="relative border-y border-border bg-secondary/20 py-14 lg:py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span
          className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: `hsl(var(${colorVar}))` }}
        >
          Go deeper
        </span>
        <h2 className="mt-3 font-heading text-2xl font-bold text-foreground lg:text-3xl">
          Map the territory, then plan your run
        </h2>
        <p className="mt-3 text-muted-foreground">
          Once you've grabbed the materials, explore how the topics connect and chart
          your preparation.
        </p>
      </div>
    </div>
  );
}

export function OlympiadExperience({ slug }: { slug: string }) {
  const olympiad = getOlympiadBySlug(slug);
  if (!olympiad) return null;

  return (
    <ProgressProvider
      slug={slug}
      topics={olympiad.topics}
      resources={olympiad.studyMaterial}
      papers={olympiad.modelPapers}
    >
      <div className="relative bg-background text-foreground">
        <OlympiadHero olympiad={olympiad} />
        <OlympiadNav olympiad={olympiad} />
        <TopicFocusBar olympiad={olympiad} />

        <main className="relative">
          {/* ── Core resources: what the student came for ── */}
          <StudyMaterialSection olympiad={olympiad} />
          <ModelPapersSection olympiad={olympiad} />
          <SyllabusSection olympiad={olympiad} />

          {/* ── Transition into the exploration layer ── */}
          <GoDeeper colorVar={olympiad.colorVar} />

          {/* ── Supplementary: map, topics, problem, roadmap ── */}
          <Constellation olympiad={olympiad} />
          <OlympiadTopics olympiad={olympiad} />
          <FeaturedProblem olympiad={olympiad} />
          <PreparationRoadmap olympiad={olympiad} />
          <OlympiadCTA olympiad={olympiad} />
        </main>

        <NextStep olympiad={olympiad} />
      </div>
    </ProgressProvider>
  );
}