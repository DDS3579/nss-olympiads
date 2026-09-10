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

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

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
                  <span
                    className="w-8 font-heading text-sm font-bold"
                    style={{ color: `hsl(var(${c}))` }}
                  >
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
  const {
    percent,
    currentStageName,
    lastActivity,
    nextAction,
    hasStarted,
    toggleTopic,
  } = useOlympiadProgress();
  const c = olympiad.colorVar;

  const handleContinue = () => {
    if (!nextAction) return;
    if (nextAction.type === "topic") {
      toggleTopic(nextAction.id, nextAction.label);
      scrollToId(`topic-${nextAction.id}`);
    } else if (nextAction.type === "resource") {
      scrollToId("library");
    } else {
      scrollToId("papers");
    }
  };

  // First visit — no progress yet
  if (!hasStarted) {
    return (
      <FadeIn delay={0.2}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 lg:p-7">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: `hsl(var(${c}) / 0.15)` }}
          />
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: `hsl(var(${c}))` }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: `hsl(var(${c}))` }}
                />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Begin your journey
              </span>
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
              Ready to start {olympiad.name}?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your progress across topics, materials, and papers is saved on this
              device — pick up right where you left off.
            </p>
            {nextAction && (
              <button
                onClick={handleContinue}
                className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ background: `hsl(var(${c}))` }}
              >
                Start with {nextAction.label} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </FadeIn>
    );
  }

  // Returning visitor — show resume state
  return (
    <FadeIn delay={0.2}>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Your preparation
          </span>
          <span className="font-heading text-lg font-bold" style={{ color: `hsl(var(${c}))` }}>
            {percent}%
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ background: `hsl(var(${c}))` }}
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Current stage
            </span>
            <div className="mt-0.5 font-heading text-sm font-semibold text-foreground">
              {currentStageName}
            </div>
          </div>
          {lastActivity && (
            <div className="text-right">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Last activity
              </span>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {lastActivity.label} · {timeAgo(lastActivity.timestamp)}
              </div>
            </div>
          )}
        </div>

        {nextAction ? (
          <div className="mt-5 rounded-xl bg-secondary/60 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Next
            </div>
            <div className="mt-1 truncate font-heading font-semibold text-foreground">
              {nextAction.label}
            </div>
            <button
              onClick={handleContinue}
              className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110"
              style={{ background: `hsl(var(${c}))` }}
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-5 rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
            Everything explored. Time to refine and compete.
          </div>
        )}
      </div>
    </FadeIn>
  );
}