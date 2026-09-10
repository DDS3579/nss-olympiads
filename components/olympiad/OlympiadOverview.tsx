"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
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

const STAGE_NAMES = ["Foundations", "Intermediate", "Advanced", "Simulation", "Olympiad"];

export function OlympiadOverview({ olympiad }: { olympiad: Olympiad }) {
  const c = olympiad.colorVar;

  return (
    <section id="overview" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          label="Your Path"
          title="How preparation unfolds"
          description="A simple loop, repeated until it becomes instinct."
          colorVar={c}
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="divide-y divide-border border-y border-border">
            {STEPS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="flex gap-6 py-6">
                  <span className="w-8 font-heading text-sm font-bold" style={{ color: `hsl(var(${c}))` }}>
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

          <ResumePanel olympiad={olympiad} />
        </div>
      </div>
    </section>
  );
}

function ResumePanel({ olympiad }: { olympiad: Olympiad }) {
  const { isHydrated, percent, currentStage, nextTopic, toggleTopic, topics } = useOlympiadProgress();
  const c = olympiad.colorVar;
  const total = topics.length;

  // First visit state
  if (isHydrated && percent === 0) {
    return (
      <FadeIn delay={0.2}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl" style={{ background: `hsl(var(${c}))` }} />
          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `hsl(var(${c}))` }}>
              <Sparkles className="h-3.5 w-3.5" /> Begin Journey
            </div>
            <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">
              Ready to start {olympiad.name}?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your progress is saved locally. Pick your first topic below to map your constellation and begin tracking your preparation.
            </p>
            {nextTopic && (
              <button
                onClick={() => {
                  toggleTopic(nextTopic.id);
                  scrollToId(`topic-${nextTopic.id}`);
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: `hsl(var(${c}))` }}
              >
                Start with {nextTopic.name} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </FadeIn>
    );
  }

  // Returning user state
  return (
    <FadeIn delay={0.2}>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Current Stage
          </span>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
            {STAGE_NAMES[currentStage]}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="font-heading text-3xl font-bold text-foreground">{percent}%</span>
          <span className="text-xs text-muted-foreground">
            {isHydrated ? `${percent === 100 ? 'All' : ''} items tracked` : 'Loading...'}
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ background: `hsl(var(${c}))` }}
          />
        </div>

        {nextTopic && percent < 100 ? (
          <div className="mt-6 rounded-xl bg-secondary/40 p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Next Action
            </div>
            <div className="mt-1 font-heading text-lg font-semibold text-foreground">
              {nextTopic.name}
            </div>
            <button
              onClick={() => {
                toggleTopic(nextTopic.id);
                scrollToId(`topic-${nextTopic.id}`);
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: `hsl(var(${c}))` }}
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : percent === 100 ? (
           <div className="mt-6 rounded-xl bg-secondary/40 p-4 text-center">
             <p className="font-heading text-lg font-bold text-foreground">Preparation Complete</p>
             <p className="mt-1 text-xs text-muted-foreground">You've engaged with all tracked materials. Time to compete.</p>
           </div>
        ) : null}
      </div>
    </FadeIn>
  );
}