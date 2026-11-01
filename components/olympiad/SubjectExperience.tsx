"use client";

import { useMemo } from "react";
import type { SubjectData, SubjectIndexItem } from "@/lib/types";
import { toOlympiad } from "./legacy";
import { strong } from "@/lib/color";
import { UrlStateProvider } from "./UrlStateProvider";
import { ProgressProvider } from "./context";
import { OlympiadHero } from "./OlympiadHero";
import { OlympiadNav } from "./OlympiadNav";
import { FilterBar } from "./FilterBar";
import { StudyMaterialSection } from "./StudyMaterialSection";
import { ModelPapersSection } from "./ModelPapersSection";
import { SyllabusSection } from "./SyllabusSection";
import { Constellation } from "./Constellation";
import { OlympiadTopics } from "./OlympiadTopics";
import { FeaturedProblem } from "./FeaturedProblem";
import { PreparationRoadmap } from "./PreparationRoadmap";
import { ContactsSection } from "./ContactsSection";
import { NextStep } from "./NextStep";
import { OlympiadCTA } from "./OlympiadCTA";
import { LevelTabs } from "./LevelTabs";
import { StartHere } from "./StartHere";
import { TopicToast } from "./TopicToast";

function GoDeeper({ colorVar }: { colorVar: string }) {
  return (
    <div className="relative border-y border-border bg-secondary/20 py-14 lg:py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span
          className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: strong(colorVar) }}
        >
          Go deeper
        </span>
        <h2 className="mt-3 font-heading text-2xl font-bold text-foreground lg:text-3xl">
          Map the territory, then plan your run
        </h2>
        <p className="mt-3 text-muted-foreground">
          Once you&apos;ve grabbed the materials, explore how the topics connect
          and chart your preparation.
        </p>
      </div>
    </div>
  );
}

export function SubjectExperience({
  data,
  index,
}: {
  data: SubjectData;
  index: SubjectIndexItem[];
}) {
  const olympiad = useMemo(() => toOlympiad(data), [data]);

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: 0, district: 0, province: 0, national: 0, international: 0,
    };
    for (const it of [...data.resources, ...data.papers]) {
      counts.all += 1;
      for (const l of it.levels) if (l in counts) counts[l] += 1;
    }
    return counts;
  }, [data]);

  return (
    <UrlStateProvider slug={data.meta.slug}>
      <ProgressProvider
        slug={data.meta.slug}
        topics={olympiad.topics}
        resources={olympiad.studyMaterial}
        papers={olympiad.modelPapers}
      >
        <div className="relative bg-background text-foreground">
          <OlympiadHero olympiad={olympiad} data={data} />
          <OlympiadNav olympiad={olympiad} index={index} />

          <div className="relative">
            {/* ── 00 Start Here (T4.4) ── */}
            <StartHere data={data} />

            {/* ── Level control: "Which exam are you sitting?" (T4.3) ── */}
            <div className="mx-auto max-w-6xl px-6 pt-12 lg:pt-16">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Which exam are you sitting?
              </p>
              <div className="mt-4">
                <LevelTabs meta={data.meta} counts={levelCounts} colorVar={data.meta.colorVar} />
              </div>
            </div>

            {/* ── Core resources: what the student came for ──
                FilterBar is sticky inside this wrapper, so it follows the
                reader only while Materials + Papers are on screen (T4.5). */}
            <div>
              <FilterBar data={data} />
              <StudyMaterialSection data={data} />
              <ModelPapersSection data={data} />
            </div>
            <SyllabusSection data={data} />

            {/* ── Transition into the exploration layer ── */}
            <GoDeeper colorVar={olympiad.colorVar} />

            {/* ── Supplementary: map, topics, problem, roadmap ── */}
            <Constellation data={data} />
            <OlympiadTopics data={data} />
            <FeaturedProblem data={data} />
            <PreparationRoadmap data={data} />
            <ContactsSection data={data} />
            <OlympiadCTA olympiad={olympiad} />
          </div>

          <TopicToast data={data} />
        <NextStep olympiad={olympiad} />
        </div>
      </ProgressProvider>
    </UrlStateProvider>
  );
}
