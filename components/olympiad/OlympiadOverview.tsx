"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading, scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad } from "@/lib/data/olympiads";

const STEPS = [
  { title: "Build foundations", body: "Understand the core ideas." },
  { title: "Train", body: "Develop problem-solving intuition." },
  { title: "Simulate", body: "Attempt competition-style papers." },
  { title: "Refine", body: "Analyse mistakes, strengthen weak areas." },
];

export function OlympiadOverview({ olympiad }: { olympiad: Olympiad }) {
  return (
    <section id="overview" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          label="Your Path"
          title="How preparation unfolds"
          description="A simple loop, repeated until it becomes instinct."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Editorial numbered journey */}
          <div className="divide-y divide-border border-y border-border">
            {STEPS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="flex gap-6 py-6">
                  <span className="w-8 font-heading text-sm font-bold text-primary">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <ProgressTracker olympiad={olympiad} />
        </div>
      </div>
    </section>
  );
}

function ProgressTracker({ olympiad }: { olympiad: Olympiad }) {
  const { percent, started, nextTopic, toggle } = useOlympiadProgress();
  const total = olympiad.topics.length;

  return (
    <FadeIn delay={0.2}>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Your preparation
          </span>
          <span className="font-heading font-bold text-foreground">{percent}%</span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ background: `hsl(var(${olympiad.colorVar}))` }}
          />
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {started.length} / {total} topics started
        </p>

        {nextTopic ? (
          <div className="mt-5 rounded-xl bg-secondary/60 p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Next
            </div>
            <div className="mt-1 font-heading font-semibold text-foreground">
              {nextTopic.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {nextTopic.subtopics[0]}
            </div>
            <button
              onClick={() => {
                toggle(nextTopic.id);
                scrollToId(`topic-${nextTopic.id}`);
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-5 rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
            All topics started. Keep the momentum going.
          </div>
        )}
      </div>
    </FadeIn>
  );
}