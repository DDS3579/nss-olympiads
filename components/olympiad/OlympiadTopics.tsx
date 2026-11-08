"use client";

import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { strong } from "@/lib/color";
import { SectionHeading, scrollToId } from "./primitives";
import { useFilters } from "./UrlStateProvider";
import type { Level, SubjectData, Topic } from "@/lib/types";

const LEVELS: Level[] = ["district", "province", "national", "international"];

export function OlympiadTopics({ data }: { data: SubjectData }) {
  const c = data.meta.colorVar;
  const { meta, topics } = data;
  const featuredId = topics.find((t) => t.featured)?.id;

  return (
    <section id="topics" aria-labelledby="topics-title" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          label="Topics"
          title="The territory you'll master"
          titleId="topics-title"
          description="Pick a topic to filter the study materials and past papers down to just that area."
          colorVar={c}
        />

        {/* histogram legend — subject-specific level labels */}
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-[0.18em]">Examined at:</span>
          {LEVELS.map((lv) => (
            <span key={lv} className="inline-flex items-center gap-1.5">
              <span className="inline-flex h-5 min-w-8 items-center justify-center rounded border border-border bg-secondary/50 px-1 font-heading text-xs font-bold text-foreground">
                {lv[0].toUpperCase()}
              </span>
              {meta.levels[lv].label}
            </span>
          ))}
        </div>

        {topics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">Topics coming soon</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              The official {meta.name} topic list is being transcribed. The syllabus table below
              already shows every examined item.
            </p>
            <button
              onClick={() => scrollToId("syllabus")}
              className="mt-6 inline-flex min-h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              See the syllabus
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {topics.map((t, i) => (
              <FadeIn
                key={t.id}
                delay={Math.min(i * 0.04, 0.3)}
                scale={0.98}
                className={cn(t.id === featuredId && "sm:col-span-2 lg:col-span-2")}
              >
                <TopicCard t={t} data={data} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TopicCard({ t, data }: { t: Topic; data: SubjectData }) {
  const { meta } = data;
  const c = meta.colorVar;
  const { f, set } = useFilters();
  const focused = f.topic === t.id;

  const resCount = data.resources.filter(
    (r) => r.access !== "dead" && r.topics.includes(t.id)
  ).length;
  const papCount = data.papers.filter((p) => p.access !== "dead" && p.topics.includes(t.id)).length;

  return (
    <article
      id={`topic-${t.id}`}
      className={cn(
        "section-anchor relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all",
        focused ? "" : "border-border hover:border-primary/40",
        t.featured && "p-7"
      )}
      style={
        focused
          ? {
              borderColor: `hsl(var(${c}-strong) / 0.6)`,
              boxShadow: `0 0 0 1px hsl(var(${c}-strong) / 0.3)`,
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-bold text-foreground">{t.name}</h3>
        {t.featured && (
          <span className="flex-shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
            Core
          </span>
        )}
      </div>

      {/* gap badge — owner-confirmed via Appendix G (T4.11 rule) */}
      {t.gap && (
        <div className="mt-2 rounded-lg border border-dashed border-amber-500/50 bg-amber-500/10 px-3 py-2">
          <p
            className="text-xs font-semibold text-amber-700 dark:text-amber-400"
            title="No Nepali-language or Nepal-authored resource in our verified library covers this."
          >
            ⚠ No Nepali material — self-study required
          </p>
          <button
            onClick={() => {
              set({ topic: t.id }, "push");
              scrollToId("library");
            }}
            className="mt-1 text-xs font-semibold underline-offset-2 hover:underline"
            style={{ color: strong(c) }}
          >
            Start here →
          </button>
        </div>
      )}

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.blurb}</p>

      {/* level histogram */}
      <div className="mt-3">
        <span className="sr-only">
          Examined at: {t.levels.map((lv) => meta.levels[lv].label).join(", ")}
        </span>
        <div aria-hidden className="flex items-center gap-1">
          {LEVELS.map((lv) => {
            const on = t.levels.includes(lv);
            return (
              <span
                key={lv}
                title={meta.levels[lv].label}
                className={cn(
                  "inline-flex h-5 min-w-8 items-center justify-center rounded border px-1 font-heading text-xs font-bold",
                  on ? "border-transparent" : "border-dashed border-border text-muted-foreground/50"
                )}
                style={
                  on
                    ? { background: `hsl(var(${c}-strong) / 0.14)`, color: `hsl(var(${c}-strong))` }
                    : undefined
                }
              >
                {lv[0].toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>

      {t.featured && t.subtopics.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
          {t.subtopics.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-foreground/80">
              <span
                aria-hidden
                className="h-1 w-1 flex-shrink-0 rounded-full"
                style={{ background: `hsl(var(${c}))` }}
              />
              {s}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 text-xs text-muted-foreground">
        {t.subtopics.length} sub-topics ·{" "}
        {resCount + papCount > 0
          ? `${resCount} ${resCount === 1 ? "resource" : "resources"} · ${papCount} ${
              papCount === 1 ? "paper" : "papers"
            }`
          : "None tagged yet"}
      </div>

      <div className="mt-auto pt-5">
        <button
          onClick={() => {
            set({ topic: focused ? "" : t.id }, "push");
            if (!focused) scrollToId("library");
          }}
          aria-pressed={focused}
          className={cn(
            "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition-colors sm:min-h-10 sm:w-auto",
            focused ? "border-transparent" : "border-border bg-background text-foreground hover:bg-secondary"
          )}
          style={focused ? { background: strong(c), color: "hsl(var(--on-strong))" } : undefined}
        >
          {focused ? "Clear topic filter" : "Show materials & papers"}
          <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
