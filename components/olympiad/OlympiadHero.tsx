"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { MagneticButton } from "@/components/MagneticButton";
import { Motif, StarField, StatChip } from "./primitives";
import { getOlympiadStats, type Olympiad } from "@/lib/data/olympiads";

export function OlympiadHero({ olympiad }: { olympiad: Olympiad }) {
  const Icon = olympiad.icon;
  const stats = getOlympiadStats(olympiad);
  const c = olympiad.colorVar;

  return (
    <section className="relative overflow-hidden pb-14 pt-28 lg:pb-20 lg:pt-32">
      {/* ambient subject illumination */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(90% 60% at 70% 0%, hsl(var(${c}) / 0.08), transparent 60%)`,
        }}
      />
      <StarField count={46} className="text-foreground/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn y={8}>
          <Link
            href="/olympiads"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All Olympiads
          </Link>
        </FadeIn>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: editorial content */}
          <div>
            <FadeIn y={10}>
              <div className="flex items-center gap-3 font-heading text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                <span
                  className="h-px w-8"
                  style={{ background: `hsl(var(${c}))` }}
                />
                NSS Olympiad Series / {olympiad.series}
              </div>
            </FadeIn>

            <FadeIn y={12} delay={0.08}>
              <h1 className="mt-5 font-heading font-extrabold leading-[0.98] tracking-tight text-foreground">
                <span className="block text-5xl sm:text-6xl lg:text-7xl">
                  {olympiad.name}
                </span>
                <span className="mt-1 block text-2xl font-bold uppercase tracking-[0.08em] text-muted-foreground sm:text-3xl lg:text-4xl">
                  Olympiad
                </span>
              </h1>
            </FadeIn>

            <FadeIn y={10} delay={0.16}>
              <p
                className="mt-4 text-sm font-medium"
                style={{ color: `hsl(var(${c}))` }}
              >
                {olympiad.disciplines.join(" · ")}
              </p>
            </FadeIn>

            <FadeIn y={10} delay={0.22}>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {olympiad.description}
              </p>
            </FadeIn>

            <FadeIn y={12} delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <a
                    href="#topics"
                    className="inline-flex items-center gap-2 rounded-full border-b-4 px-7 py-3 font-heading text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:translate-y-1 active:border-b-2"
                    style={{
                      backgroundColor: `hsl(var(${c}))`,
                      borderColor: `hsl(var(${c}) / 0.4)`,
                    }}
                  >
                    Start Preparing <ArrowRight className="h-4 w-4" />
                  </a>
                </MagneticButton>
                <a
                  href="#constellation"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  View Constellation
                </a>
              </div>
            </FadeIn>

            <FadeIn y={10} delay={0.38}>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4">
                <StatChip value={stats.topics} label="Topics" />
                <StatChip value={stats.problems} label="Problems" />
                <StatChip value={stats.papers} label="Model Papers" />
                <StatChip value={olympiad.meta.difficultyRange} label="Level" small />
              </div>
            </FadeIn>
          </div>

          {/* Right: subject identity motif (desktop only) */}
          <div className="relative hidden items-center justify-center lg:flex">
            <FadeIn scale={0.96} duration={0.7}>
              <div className="relative h-80 w-80 xl:h-96 xl:w-96">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(closest-side, hsl(var(${c}) / 0.12), transparent 70%)`,
                  }}
                />
                <Motif
                  motif={olympiad.motif}
                  className="absolute inset-0 h-full w-full"
                  style={{ color: `hsl(var(${c}))`, opacity: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: `hsl(var(${c}) / 0.15)` }}
                  >
                    <Icon
                      className="h-8 w-8"
                      style={{ color: `hsl(var(${c}))` }}
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}