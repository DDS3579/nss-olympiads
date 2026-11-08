"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { onStrong, strong } from "@/lib/color";
import { dateStatus } from "@/lib/date";
import { persistLevel } from "@/lib/url-state";
import { useFilters } from "./UrlStateProvider";
import { scrollToId, SectionHeading } from "./primitives";
import type { Level, RoundDate, SubjectData } from "@/lib/types";

const LEVEL_ORDER: Level[] = ["district", "province", "national", "international"];


function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{k}</dt>
      <dd className="mt-0.5 text-xs leading-relaxed text-foreground/80">{v}</dd>
    </div>
  );
}

function LevelCard({ data, k, now }: { data: SubjectData; k: Level; now: number | null }) {
  const { set } = useFilters();
  const { meta } = data;
  const c = meta.colorVar;
  const L = meta.levels[k];
  const rounds = meta.rounds.filter((r) => r.level === k);
  const primary = rounds[0];
  const resources = data.resources.filter((r) => r.levels.includes(k)).length;
  const papers = data.papers.filter((p) => p.levels.includes(k)).length;

  const dates = rounds
    .flatMap((r) => r.dates ?? [])
    .sort((a, b) => {
      const rank = (x: RoundDate) =>
        dateStatus(x.iso, x.status, now) === "upcoming"
          ? 0
          : dateStatus(x.iso, x.status, now) === "past"
            ? 1
            : 2;
      return rank(a) - rank(b);
    })
    .slice(0, 3);

  const choose = () => {
    set({ level: k }, "push");
    persistLevel(meta.slug, k);
  };

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card p-5",
        !L.exists && "border-dashed"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border bg-background font-heading text-xs font-bold"
          style={{ borderColor: `hsl(var(${c}) / 0.4)`, color: strong(c) }}
        >
          {LEVEL_ORDER.indexOf(k) + 1}
        </span>
        <h3 className="min-w-0 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
          {L.label}
        </h3>
      </div>

      <span
        className={cn(
          "mt-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
          L.exists
            ? "border-transparent"
            : "border-dashed border-border text-muted-foreground"
        )}
        style={L.exists ? { background: `hsl(var(${c}) / 0.12)`, color: strong(c) } : undefined}
      >
        {L.exists ? "Official round" : "No official round"}
      </span>

      {L.exists && primary ? (
        <dl className="mt-3 space-y-2 text-xs">
          {primary.format && <Fact k="Format" v={primary.format} />}
          {primary.marking && <Fact k="Marking" v={primary.marking} />}
          {primary.calculator && <Fact k="Calculator" v={primary.calculator} />}
          {primary.eligibility && <Fact k="Who can sit" v={primary.eligibility} />}
          {primary.registration && <Fact k="Registration" v={primary.registration} />}
        </dl>
      ) : (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{L.honestNote}</p>
      )}

      {dates.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
          {dates.map((d) => {
            const s = dateStatus(d.iso, d.status, now);
            return (
              <li key={d.label} className="flex items-start gap-2 text-xs">
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                    s === "upcoming"
                      ? "bg-emerald-500"
                      : s === "past"
                        ? "bg-muted-foreground/50"
                        : "bg-border"
                  )}
                />
                <span className="min-w-0">
                  <span className="font-medium text-foreground">{d.label}</span>{" "}
                  <span className="text-muted-foreground">
                    {s === "upcoming" ? "· Upcoming" : s === "past" ? "· Last held" : "· Date not announced"}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        {resources} {resources === 1 ? "resource" : "resources"} · {papers}{" "}
        {papers === 1 ? "paper" : "papers"}
      </p>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <button
          onClick={() => {
            choose();
            scrollToId("library");
          }}
          className="inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-semibold transition-all hover:brightness-110"
          style={{ background: strong(c), color: onStrong }}
        >
          Study materials
        </button>
        <button
          onClick={() => {
            choose();
            scrollToId("papers");
          }}
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Past papers
        </button>
      </div>
    </article>
  );
}

export function StartHere({ data }: { data: SubjectData }) {
  const { set } = useFilters();
  const { meta } = data;
  const c = meta.colorVar;
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const firstExisting = LEVEL_ORDER.find((k) => meta.levels[k].exists) ?? "province";
  const sources = [...new Set(meta.rounds.map((r) => r.source.label).filter(Boolean))];

  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="section-anchor border-b border-border py-12 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="00"
          label="Start here"
          title="Which exam are you preparing for?"
          description={`The ${meta.name} ladder, level by level — what each round looks like, when it happens, and what to study.`}
          colorVar={c}
          titleId="start-title"
        />

        {/* The ladder */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-8 right-8 top-[34px] hidden border-t border-dashed border-border lg:block"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEVEL_ORDER.map((k) => (
              <LevelCard key={k} data={data} k={k} now={now} />
            ))}
          </div>
        </div>

        {/* New to Olympiads? */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5">
          <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-foreground">
            New to Olympiads?
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => {
                set({ level: firstExisting, type: "handout" }, "push");
                persistLevel(meta.slug, firstExisting);
                scrollToId("library");
              }}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Beginner path
            </button>
            <button
              onClick={() => scrollToId("papers")}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Browse past papers
            </button>
            <button
              onClick={() => scrollToId("syllabus")}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              See the syllabus
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Facts verified from {sources.length} published {sources.length === 1 ? "source" : "sources"} ·
          last updated {meta.updatedAt}
        </p>
      </div>
    </section>
  );
}
