"use client";

import { getOlympiadBySlug, olympiads as allOlympiads } from "@/lib/data/olympiads";
import { ProgressProvider } from "./context";
import { OlympiadHero } from "./OlympiadHero";
import { OlympiadNav } from "./OlympiadNav";
import { OlympiadOverview } from "./OlympiadOverview";
import { Constellation } from "./Constellation";
import { OlympiadTopics } from "./OlympiadTopics";
import { FeaturedProblem } from "./FeaturedProblem";
import { StudyMaterialSection } from "./StudyMaterialSection";
import { ModelPapersSection } from "./ModelPapersSection";
import { PreparationRoadmap } from "./PreparationRoadmap";
import { NextStep } from "./NextStep";
import { OlympiadCTA } from "./OlympiadCTA";

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
        <OlympiadNav olympiad={olympiad} allOlympiads={allOlympiads} />
        <main className="relative">
          <OlympiadOverview olympiad={olympiad} />
          <Constellation olympiad={olympiad} />
          <OlympiadTopics olympiad={olympiad} />
          <FeaturedProblem olympiad={olympiad} />
          <StudyMaterialSection olympiad={olympiad} />
          <ModelPapersSection olympiad={olympiad} />
          <PreparationRoadmap olympiad={olympiad} />
          <OlympiadCTA olympiad={olympiad} />
        </main>
        <NextStep olympiad={olympiad} />
      </div>
    </ProgressProvider>
  );
}