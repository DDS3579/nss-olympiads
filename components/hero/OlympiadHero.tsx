"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { CountUp } from "@/components/CountUp";
import { MagneticButton } from "@/components/MagneticButton";
import type { SubjectIndexItem } from "@/lib/types";

import { HeroBackdrop } from "./HeroBackdrop";
import { OlympiadNodes } from "./OlympiadNodes";
import { SubjectChips } from "./SubjectChips";
import { ScrollCue } from "./ScrollCue";

export function OlympiadHero({
  subjects,
  totalResources,
}: {
  subjects: SubjectIndexItem[];
  /** computed on the server; the third stat only shows it when > 0 */
  totalResources: number;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Pause the infinite hero animations whenever the hero is off-screen,
  // and switch the heavy layers off entirely on data-saver connections.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) document.documentElement.classList.add("no-heavy");
    const io = new IntersectionObserver(
      ([entry]) => el.setAttribute("data-paused", String(!entry.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stats: { key: string; label: string; node: React.ReactNode }[] = [
    { key: "olympiads", label: "Olympiads", node: <CountUp to={subjects.length} /> },
    { key: "grades", label: "Grades", node: "8–12" },
    totalResources > 0
      ? { key: "resources", label: "Verified resources", node: totalResources }
      : { key: "free", label: "Free, always", node: "100%" },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="dark relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background"
    >
      <HeroBackdrop subjects={subjects} activeSlug={activeSlug} />
      <OlympiadNodes subjects={subjects} onActivate={setActiveSlug} />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-14 pt-28 text-center md:pb-40 lg:pt-40">
        {/* Eyebrow */}
        <FadeIn delay={0.05} y={8}>
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50 sm:w-10" />
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:tracking-[0.32em]">
              7 Olympiads · NSS STEM Club
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50 sm:w-10" />
          </div>
        </FadeIn>

        {/* Headline */}
        <h1
          id="hero-title"
          className="font-heading text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground min-[400px]:text-4xl sm:text-6xl sm:leading-[1.02] lg:text-[4.4rem] xl:text-[4.75rem]"
        >
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

        {/* Sub-headline */}
        <FadeIn delay={0.5} y={15}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Free, level-wise preparation for 7 Olympiads — verified study material, past papers and
            roadmaps, built by NSS Clubs for students in Grades 8–12.
          </p>
        </FadeIn>

        {/* Search (plain GET form → /search?q=…, works without JS) */}
        <FadeIn delay={0.62} y={12} className="w-full">
          <form
            action="/search"
            role="search"
            className="mx-auto mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 transition-colors focus-within:border-primary/60 md:backdrop-blur-sm"
          >
            <Search aria-hidden className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <label htmlFor="hero-q" className="sr-only">
              Search the hub
            </label>
            <input
              id="hero-q"
              name="q"
              type="search"
              autoComplete="off"
              placeholder="Search a topic or exam — optics, IMO, graphs…"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105"
            >
              Search
            </button>
          </form>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.72} y={12}>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <MagneticButton>
              <Link
                href="/olympiads"
                className="inline-flex items-center gap-2 rounded-full border-b-4 border-primary/40 bg-primary px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground shadow-[0_12px_40px_-10px_rgba(40,184,242,0.55)] transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-2"
              >
                Start Preparing <ArrowRight aria-hidden className="h-[18px] w-[18px]" />
              </Link>
            </MagneticButton>
            <a
              href="#how"
              className="inline-flex min-h-11 items-center px-4 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              See how it works
            </a>
          </div>
        </FadeIn>

        {/* Stats (computed) */}
        <FadeIn delay={0.85} y={10}>
          <dl className="mt-12 grid grid-cols-3 divide-x divide-white/[0.08] sm:mt-14">
            {stats.map((s) => (
              <div key={s.key} className="flex flex-col-reverse px-4 text-center sm:px-10">
                <dt className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.22em]">
                  {s.label}
                </dt>
                <dd className="font-heading text-xl font-bold text-foreground sm:text-[1.7rem]">
                  {s.node}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <SubjectChips subjects={subjects} />
      </div>

      <ScrollCue />
    </section>
  );
}
