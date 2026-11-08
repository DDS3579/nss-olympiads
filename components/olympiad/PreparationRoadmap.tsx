"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { strong } from "@/lib/color";
import { dateStatus, statusLabel } from "@/lib/date";
import { Motif, SectionHeading, scrollToId } from "./primitives";
import { useFilters } from "./UrlStateProvider";
import type { RoadmapStage, RoundDate, SubjectData } from "@/lib/types";

function ActionButton({ action, colorVar }: { action: RoadmapStage["actions"][number]; colorVar: string }) {
  const { set } = useFilters();
  const cls =
    "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary";
  if (action.kind === "filter") {
    return (
      <button
        className={cls}
        onClick={() => {
          set(action.filters, "push");
          scrollToId(action.scroll);
        }}
      >
        {action.label}
      </button>
    );
  }
  if (action.kind === "resource") {
    return (
      <button className={cls} onClick={() => scrollToId(`res-${action.ref}`)}>
        {action.label}
      </button>
    );
  }
  return (
    <a className={cls} href={action.url} target="_blank" rel="noopener noreferrer">
      {action.label} ↗<span className="sr-only">(opens in new tab)</span>
    </a>
  );
}

function StageDates({ all, now }: { all: RoundDate[]; now: number | null }) {
  if (all.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
      {all.map((d) => {
        const s = dateStatus(d.iso, d.status, now);
        return (
          <li key={d.label} className="flex items-start gap-2 text-xs">
            <span
              aria-hidden
              className={cn(
                "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                s === "upcoming" ? "bg-emerald-500" : s === "past" ? "bg-muted-foreground/50" : "bg-border"
              )}
            />
            <span>
              <span className="font-medium text-foreground">{d.label}</span>{" "}
              <span className="text-muted-foreground">· {statusLabel(s)}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function StageRow({
  stage,
  index,
  colorVar,
  isCurrent,
  now,
}: {
  stage: RoadmapStage;
  index: number;
  colorVar: string;
  isCurrent: boolean;
  now: number | null;
}) {
  const isLeft = index % 2 === 0;
  const allDates = [...(stage.when ? [stage.when] : []), ...(stage.dates ?? [])];

  return (
    <div className="relative grid gap-4 lg:grid-cols-2 lg:gap-12">
      {/* node on the trajectory line */}
      <span
        className={cn(
          "absolute left-4 top-6 z-10 flex -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-background lg:left-1/2",
          isCurrent ? "h-5 w-5" : "h-3.5 w-3.5"
        )}
        style={{
          background: isCurrent ? `hsl(var(${colorVar}))` : `hsl(var(--muted-foreground) / 0.35)`,
          boxShadow: isCurrent ? `0 0 16px hsl(var(${colorVar}) / 0.6)` : "none",
        }}
        aria-hidden
      />

      <FadeIn
        x={isLeft ? -20 : 20}
        y={0}
        delay={0.05}
        className={cn(
          "pl-10 lg:pl-0",
          isLeft ? "lg:col-start-1 lg:pr-12" : "lg:col-start-2 lg:pl-12"
        )}
      >
        <div
          className={cn("rounded-2xl border bg-card p-6", isCurrent ? "" : "border-border")}
          style={isCurrent ? { borderColor: `hsl(var(${colorVar}-strong) / 0.55)` } : undefined}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className="font-heading text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: strong(colorVar) }}
            >
              Stage {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-2">
              {isCurrent && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: strong(colorVar), color: "hsl(var(--on-strong))" }}
                >
                  You are here
                </span>
              )}
              {stage.placeholder && (
                <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Draft roadmap
                </span>
              )}
            </span>
          </div>

          <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{stage.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.what}</p>

          {stage.facts && stage.facts.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              {stage.facts.map((f) => (
                <li key={f} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                    style={{ background: `hsl(var(${colorVar}))` }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          )}

          <StageDates all={allDates} now={now} />

          {stage.actions.length > 0 && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                What to do this week
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {stage.actions.map((a, i) => (
                  <ActionButton key={`${a.kind}-${i}`} action={a} colorVar={colorVar} />
                ))}
              </div>
            </div>
          )}

          {stage.outcome && (
            <p className="mt-3 text-sm font-semibold" style={{ color: strong(colorVar) }}>
              Outcome — {stage.outcome}
            </p>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export function PreparationRoadmap({ data }: { data: SubjectData }) {
  const { f } = useFilters();
  const c = data.meta.colorVar;
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  // "You are here" = the FIRST stage whose level matches the student's chosen level.
  // No completion claims, no percent-derived state (U-25).
  const currentId =
    f.level === "all" ? null : data.roadmap.find((s) => s.level === f.level)?.id ?? null;

  const hasDraft = data.roadmap.some((s) => s.placeholder);

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="section-anchor relative overflow-hidden border-b border-border bg-secondary/20 py-20 lg:py-28"
    >
      <Motif
        motif={data.meta.motif}
        className="absolute -right-10 top-10 h-72 w-72 opacity-[0.05]"
        style={{ color: `hsl(var(${c}))` }}
      />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          index="07"
          label="Roadmap"
          title="Your trajectory"
          titleId="roadmap-title"
          description={
            hasDraft
              ? "Draft stages — real dates and actions are being transcribed from the official notices."
              : "Every stage of the ladder, what each one tests, and what to do this week."
          }
          colorVar={c}
        />

        <div className="relative">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-border lg:left-1/2" />
          <div className="space-y-10">
            {data.roadmap.map((s, i) => (
              <StageRow
                key={s.id}
                stage={s}
                index={i}
                colorVar={c}
                isCurrent={s.id === currentId}
                now={now}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToId("library")}
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-7 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Begin with the study material
          </button>
        </div>
      </div>
    </section>
  );
}
