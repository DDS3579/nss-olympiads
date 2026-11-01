"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/FadeIn";
import { strong } from "@/lib/color";
import { DifficultyMeter, SectionHeading, scrollToId } from "./primitives";
import { LevelChip } from "@/components/system/LevelChip";
import { useFilters } from "./UrlStateProvider";
import type { SubjectData } from "@/lib/types";

/** Deterministic ISO week number — drives the weekly rotation (T4.12). */
function isoWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((date.getTime() - yearStart.getTime()) / 86_400_000 + 1 / 7);
}

export function FeaturedProblem({ data }: { data: SubjectData }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { set } = useFilters();
  const c = data.meta.colorVar;

  // Only verified problems ever render (T4.12 rule). Publication is gated by M-10.
  const verified = data.featured.filter((x) => x.verified);
  const p = verified.length > 0 ? verified[isoWeekNumber(new Date()) % verified.length] : null;

  if (!p) {
    return (
      <section id="problem" aria-labelledby="problem-title" className="section-anchor py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            index="06"
            label="Featured Problem"
            title="This week's challenge"
            titleId="problem-title"
            description={`A representative problem from ${data.meta.name}.`}
            colorVar={c}
          />
          <FadeIn>
            <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
              <p className="font-heading text-lg font-semibold text-foreground">
                Featured problem coming soon
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                We verify every statement against an official source before it appears here. No
                fabricated problems ship to production.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  const linkedTopic = data.topics.find((t) => t.id === p.topicId);

  return (
    <section id="problem" aria-labelledby="problem-title" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="06"
          label="Featured Problem"
          title={verified.length > 1 ? "This week's challenge" : "Featured problem"}
          titleId="problem-title"
          description={`A representative problem from ${data.meta.name}.`}
          colorVar={c}
        />

        <FadeIn>
          <article className="rounded-2xl border border-border bg-card p-7 lg:p-10">
            {/* badges: level + difficulty + source */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <LevelChip level={p.level} label={data.meta.levels[p.level].label} colorVar={c} />
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                Difficulty {p.difficulty}/5
                <DifficultyMeter level={p.difficulty} colorVar={c} />
              </span>
              <span className="text-xs text-muted-foreground">{p.source.label}</span>
              {p.source.url && (
                <a
                  href={p.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold underline underline-offset-2"
                  style={{ color: strong(c) }}
                >
                  Official paper ↗<span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>

            <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">{p.title}</h3>

            <p className="mt-4 whitespace-pre-line leading-relaxed text-foreground/85">{p.statement}</p>

            {/* hint reveal — accessible disclosure */}
            <div className="mt-6">
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="problem-hint"
                className="py-2 text-sm font-semibold hover:underline"
                style={{ color: strong(c) }}
              >
                {open ? "Hide hint" : "Reveal hint"}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3 }}
                    className="overflow-hidden"
                  >
                    <p
                      id="problem-hint"
                      className="mt-3 border-l-2 pl-4 text-sm text-muted-foreground"
                      style={{ borderColor: `hsl(var(${c}))` }}
                    >
                      {p.hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTAs below the statement on EVERY viewport (B-15) */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              {linkedTopic && (
                <button
                  onClick={() => {
                    set({ topic: p.topicId }, "push");
                    scrollToId("library");
                  }}
                  className="inline-flex min-h-10 items-center rounded-full px-5 text-sm font-semibold transition-all hover:brightness-110"
                  style={{ background: strong(c), color: "hsl(var(--on-strong))" }}
                >
                  Study this area
                </button>
              )}
              {p.solutionUrl && (
                <a
                  href={p.solutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Official solution ↗<span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>

            {p.verifiedBy && p.verifiedOn && (
              <p className="mt-4 text-xs text-muted-foreground">
                Verified by {p.verifiedBy} · {p.verifiedOn}
              </p>
            )}
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
