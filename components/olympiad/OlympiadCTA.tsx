"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { MagneticButton } from "@/components/MagneticButton";
import { StarField } from "./primitives";
import type { Olympiad } from "@/lib/data/olympiads";

export function OlympiadCTA({ olympiad }: { olympiad: Olympiad }) {
  const c = olympiad.colorVar;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at 50% 100%, hsl(var(${c}) / 0.1), transparent 70%)`,
        }}
      />
      <StarField count={60} className="opacity-60" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <span
            className="font-heading text-[11px] font-semibold uppercase tracking-[0.32em]"
            style={{ color: `hsl(var(${c}))` }}
          >
            Ready to begin?
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
            Your next problem is waiting.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick a topic, follow the constellation, and start building toward the{" "}
            {olympiad.name} national round.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton>
              <a
                href="#topics"
                className="inline-flex items-center gap-2 rounded-full border-b-4 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:translate-y-1 active:border-b-2"
                style={{
                  backgroundColor: `hsl(var(${c}))`,
                  borderColor: `hsl(var(${c}) / 0.4)`,
                }}
              >
                Start Preparing <ArrowRight className="h-[18px] w-[18px]" />
              </a>
            </MagneticButton>
            <Link
              href="/olympiads"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-3.5 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              All Olympiads
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}