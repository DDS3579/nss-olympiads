"use client";

import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { Motif, SectionHeading, scrollToId } from "./primitives";
import type { Olympiad, RoadmapStage } from "@/lib/data/olympiads";

function RoadmapStageRow({
  stage,
  index,
  colorVar,
}: {
  stage: RoadmapStage;
  index: number;
  colorVar: string;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid gap-4 lg:grid-cols-2 lg:gap-12">
      {/* node on the trajectory line */}
      <span
        className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-background lg:left-1/2"
        style={{ background: `hsl(var(${colorVar}))` }}
      />

      <FadeIn
        x={isLeft ? -20 : 20}
        y={0}
        delay={0.05}
        className={cn(
          "pl-10 lg:pl-0",
          isLeft ? "lg:col-start-1 lg:pr-12 lg:text-right" : "lg:col-start-2 lg:pl-12"
        )}
      >
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3 lg:justify-start">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Stage 0{index + 1}
            </span>
            {stage.tasks && (
              <span className="text-[11px] text-muted-foreground">{stage.tasks}</span>
            )}
          </div>
          <h3 className="mt-2 font-heading text-xl font-bold text-foreground">
            {stage.stage}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {stage.description}
          </p>
          {stage.outcome && (
            <p className="mt-3 text-sm font-semibold" style={{ color: `hsl(var(${colorVar}))` }}>
              Outcome — {stage.outcome}
            </p>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export function PreparationRoadmap({ olympiad }: { olympiad: Olympiad }) {
  return (
    <section
      id="roadmap"
      className="section-anchor relative overflow-hidden border-y border-border bg-secondary/20 py-20 lg:py-28"
    >
      <Motif
        motif={olympiad.motif}
        className="absolute -right-10 top-10 h-72 w-72 opacity-[0.05]"
        style={{ color: `hsl(var(${olympiad.colorVar}))` }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          index="07"
          label="Roadmap"
          title="Your trajectory"
          description="Five stages from first principles to competition day."
        />

        <div className="relative">
          {/* trajectory line */}
          <div className="absolute bottom-2 left-4 top-2 w-px bg-border lg:left-1/2" />
          <div className="space-y-10">
            {olympiad.roadmap.map((s, i) => (
              <RoadmapStageRow key={s.stage} stage={s} index={i} colorVar={olympiad.colorVar} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToId("library")}
            className="inline-flex items-center rounded-full border border-border bg-background px-7 py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Begin with the study material
          </button>
        </div>
      </div>
    </section>
  );
}