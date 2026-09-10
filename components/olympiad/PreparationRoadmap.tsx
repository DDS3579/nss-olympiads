"use client";

import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { Motif, SectionHeading, scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad, RoadmapStage } from "@/lib/data/olympiads";

function RoadmapStageRow({
  stage,
  index,
  colorVar,
  isCurrent,
}: {
  stage: RoadmapStage;
  index: number;
  colorVar: string;
  isCurrent: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid gap-4 lg:grid-cols-2 lg:gap-12">
      {/* node on the trajectory line */}
      <span className="absolute left-4 top-6 z-10 flex -translate-x-1/2 items-center justify-center lg:left-1/2">
        <span 
          className={cn("h-3 w-3 rounded-full ring-4 ring-background transition-all", isCurrent && "h-4 w-4")}
          style={{ 
            background: `hsl(var(${colorVar}))`,
            boxShadow: isCurrent ? `0 0 16px hsl(var(${colorVar}) / 0.6)` : 'none'
          }} 
        />
      </span>

      <FadeIn
        x={isLeft ? -20 : 20}
        y={0}
        delay={0.05}
        className={cn(
          "pl-10 lg:pl-0",
          isLeft ? "lg:col-start-1 lg:pr-12 lg:text-right" : "lg:col-start-2 lg:pl-12"
        )}
      >
        <div className={cn(
          "rounded-2xl border bg-card p-6 transition-all",
          isCurrent ? "border-primary/50 shadow-sm" : "border-border"
        )} style={isCurrent ? { borderColor: `hsl(var(${colorVar}) / 0.4)` } : {}}>
          
          <div className="flex items-center justify-between gap-3 lg:justify-start">
            <span
              className="font-heading text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: `hsl(var(${colorVar}))` }}
            >
              Stage 0{index + 1}
            </span>
            {isCurrent && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: `hsl(var(${colorVar}))` }}>
                You are here
              </span>
            )}
          </div>
          
          <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{stage.stage}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
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
  const c = olympiad.colorVar;
  const { currentStage, isHydrated } = useOlympiadProgress();

  return (
    <section id="roadmap" className="section-anchor relative overflow-hidden border-y border-border bg-secondary/20 py-20 lg:py-28">
      <Motif motif={olympiad.motif} className="absolute -right-10 top-10 h-72 w-72 opacity-[0.05]" style={{ color: `hsl(var(${c}))` }} />

      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading index="07" label="Roadmap" title="Your trajectory" description="Five stages from first principles to competition day." colorVar={c} />

        <div className="relative">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-border lg:left-1/2" />
          <div className="space-y-10">
            {olympiad.roadmap.map((s, i) => (
              <RoadmapStageRow 
                key={s.stage} 
                stage={s} 
                index={i} 
                colorVar={c} 
                isCurrent={isHydrated && i === currentStage} 
              />
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