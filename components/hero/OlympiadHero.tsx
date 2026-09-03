"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/FadeIn"
import { CountUp } from "@/components/CountUp"
import { MagneticButton } from "@/components/MagneticButton"
import { olympiads } from "@/lib/data/olympiads"
import { OlympiadHeroBackdrop } from "./OlympiadHeroBackdrop"
import { OlympiadNodes } from "./OlympiadNodes"
import { ScrollCue } from "./ScrollCue"

const HERO_STATS = [
  { key: "olympiads", value: "7", label: "Olympiads", countUp: true },
  { key: "grade", value: "11–12", label: "Grade Focus", countUp: false },
  { key: "free", value: "100%", label: "Free Preparation", countUp: false },
]

export function OlympiadHero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background">
      {/* Layers 1–3: atmosphere · academic universe · depth objects */}
      <OlympiadHeroBackdrop activeIndex={activeIndex} />

      {/* The 7 Olympiad constellation (interactive) */}
      <OlympiadNodes olympiads={olympiads} onActivate={setActiveIndex} />

      {/* Hero content — clean negative space in the center */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-40 pt-36 text-center lg:pt-40">
        {/* Eyebrow */}
        <FadeIn delay={0.05} y={8}>
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              7 Olympiads · NSS STEM Club
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </FadeIn>

        {/* Headline — three strong lines, poster-tight */}
        <h1 className="font-heading text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-6xl sm:leading-[1.02] lg:text-[4.4rem] xl:text-[4.75rem]">
          <span className="hero-line inline-block lg:block" style={{ animationDelay: "0.12s" }}>
            Every Olympiad champion
          </span>{" "}
          <span className="hero-line inline-block lg:block" style={{ animationDelay: "0.24s" }}>
            was once a student who
          </span>{" "}
          <span className="hero-line inline-block lg:block" style={{ animationDelay: "0.36s" }}>
            decided to <span className="hero-start italic">start.</span>
          </span>
        </h1>

        {/* Subheadline */}
        <FadeIn delay={0.55} y={15}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Free preparation material, model question papers, and structured roadmaps for 7
            Olympiads — built by NSS Clubs for Grade 11 and 12 students ready to compete.
          </p>
        </FadeIn>

        {/* CTA row — the only strongly saturated element */}
        <FadeIn delay={0.7} y={15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton>
              <Link
                href="/olympiads"
                className="inline-flex items-center gap-2 rounded-full border-b-4 border-primary/40 bg-primary px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground shadow-[0_12px_40px_-10px_rgba(40,184,242,0.55)] transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-2"
              >
                Start Preparing <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </MagneticButton>

            <Link
              href="/olympiads"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-8 py-3.5 font-heading text-sm font-semibold text-foreground transition-colors duration-200 hover:border-white/25 hover:bg-secondary"
            >
              Explore Olympiads
            </Link>
          </div>
        </FadeIn>

        {/* Metadata — editorial stat blocks (the "0 categories" bug is gone) */}
        <FadeIn delay={0.85} y={10}>
          <div className="mt-16 grid grid-cols-3 divide-x divide-white/[0.08]">
            {HERO_STATS.map((s) => (
              <div key={s.key} className="px-5 text-center sm:px-10">
                <div className="font-heading text-xl font-bold text-foreground sm:text-[1.7rem]">
                  {s.countUp ? <CountUp to={7} /> : s.value}
                </div>
                <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-[10px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <ScrollCue />
    </section>
  )
}