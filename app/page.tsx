"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Crown,
  FlaskConical,
  HeartHandshake,
  Users,
} from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { GeometricHeroCanvas } from "@/components/GeometricHeroCanvas";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionLabel } from "@/components/SectionLabel";
import { OlympiadHero } from "@/components/hero/OlympiadHero";
import { olympiads } from "@/lib/data/olympiads";

/* Each reason gets its own subject accent color — ties the section into the
   olympiad palette without introducing anything new. */
const whyRows = [
  {
    colorVar: "--subject-physics",
    tag: "Admissions",
    title: "Stand Out in University Applications",
    body: "Olympiad participation and medals carry real weight with scholarship boards and admissions committees, both in Nepal and internationally — proof you can think under pressure, not just memorize.",
  },
  {
    colorVar: "--subject-chemistry",
    tag: "Entrance Exams",
    title: "A Sharper Foundation for IOE, IOM & NEB",
    body: "The same problem-solving depth that wins Olympiad medals is exactly what engineering and medical entrance exams reward. Prepare for one, and you're already ahead on the other.",
  },
  {
    colorVar: "--subject-astronomy",
    tag: "Global Stage",
    title: "Represent Nepal on a Global Stage",
    body: "IMO, IPhO, IChO, IOI, IOAA, and IBO all send national teams to compete internationally. Very few students ever get this far — this is how you become one of them.",
  },
  {
    colorVar: "--subject-ai",
    tag: "Community",
    title: "You're Not Doing This Alone",
    body: "NSS Clubs' STEM Club runs structured mentorship, peer study groups, and curated resources — so preparation feels like a team effort, not a solo grind.",
  },
];

const teamCards = [
  { icon: Crown, role: "President", name: "Divya D. Sharma" },
  { icon: Users, role: "Executive Team", name: "NSS Clubs" },
  { icon: FlaskConical, role: "Lead Organizer", name: "STEM Club" },
  { icon: HeartHandshake, role: "Supporting Partner", name: "Social Club" },
];

export default function Home() {
  return (
    <div className="bg-background overflow-hidden">
      {/* HERO */}
      <OlympiadHero />

      {/* ───────────────────────── WHY OLYMPIADS ───────────────────────── */}
      <section className="relative bg-secondary/30 py-24 lg:py-32" id="why">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Left — sticky editorial intro */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <FadeIn y={10}>
                  <SectionLabel>WHY OLYMPIADS</SectionLabel>
                </FadeIn>
                <FadeIn y={16} delay={0.08}>
                  <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem]">
                    More than a competition.{" "}
                    <span className="italic text-primary">A launchpad.</span>
                  </h2>
                </FadeIn>
                <FadeIn y={12} delay={0.16}>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    For NSS students in Grade 11 and 12, Olympiads open doors
                    regular exams don&apos;t.
                  </p>
                </FadeIn>

                {/* mini-constellation — the four reasons, mapped as stars */}
                <FadeIn delay={0.24}>
                  <div className="mt-10">
                    <svg
                      viewBox="0 0 240 90"
                      className="w-full max-w-[250px]"
                      aria-hidden
                    >
                      <path
                        d="M22 62 L84 24 L152 58 L214 20"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                        strokeDasharray="1 6"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="22"
                        cy="62"
                        r="9"
                        fill="hsl(var(--subject-physics) / 0.14)"
                      />
                      <circle
                        cx="84"
                        cy="24"
                        r="9"
                        fill="hsl(var(--subject-chemistry) / 0.14)"
                      />
                      <circle
                        cx="152"
                        cy="58"
                        r="9"
                        fill="hsl(var(--subject-astronomy) / 0.14)"
                      />
                      <circle
                        cx="214"
                        cy="20"
                        r="9"
                        fill="hsl(var(--subject-ai) / 0.14)"
                      />
                      <circle
                        cx="22"
                        cy="62"
                        r="3.5"
                        fill="hsl(var(--subject-physics))"
                      />
                      <circle
                        cx="84"
                        cy="24"
                        r="3.5"
                        fill="hsl(var(--subject-chemistry))"
                      />
                      <circle
                        cx="152"
                        cy="58"
                        r="3.5"
                        fill="hsl(var(--subject-astronomy))"
                      />
                      <circle
                        cx="214"
                        cy="20"
                        r="3.5"
                        fill="hsl(var(--subject-ai))"
                      />
                    </svg>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-primary/40" />
                      <span className="text-xs font-medium text-muted-foreground/70">
                        Four reasons. Zero cost.
                      </span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Right — numbered index */}
            <div className="lg:col-span-7">
              <div className="border-t border-border">
                {whyRows.map((row, i) => (
                  <FadeIn key={i} y={18} delay={i * 0.07}>
                    <article
                      className="group relative flex gap-5 border-b border-border py-8 transition-colors duration-300 hover:bg-[color:var(--c-soft)] sm:gap-7 sm:py-9"
                      style={{
                        ["--c" as any]: `hsl(var(${row.colorVar}))`,
                        ["--c-soft" as any]: `hsl(var(${row.colorVar}) / 0.05)`,
                        ["--c-rail" as any]: `hsl(var(${row.colorVar}) / 0.25)`,
                      }}
                    >
                      {/* index + color rail */}
                      <div className="flex w-7 flex-shrink-0 flex-col items-center self-stretch">
                        <span
                          className="font-heading text-[13px] font-bold leading-6 tabular-nums"
                          style={{ color: `hsl(var(${row.colorVar}))` }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden
                          className="mt-3 w-px flex-1 bg-[color:var(--c-rail)] transition-colors duration-300 group-hover:bg-[color:var(--c)]"
                        />
                      </div>

                      {/* copy */}
                      <div className="min-w-0 flex-1 pb-1">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: `hsl(var(${row.colorVar}) / 0.8)` }}
                        >
                          {row.tag}
                        </span>
                        <h3 className="mt-1.5 font-heading text-xl font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-[color:var(--c)] sm:text-[1.35rem]">
                          {row.title}
                        </h3>
                        <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                          {row.body}
                        </p>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* Success spotlight — pull-quote with ghost glyph */}
          <FadeIn y={20}>
            <figure
              className="relative mt-16 border-l-2 pl-6 sm:pl-8 lg:mt-24"
              style={{ borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 left-0 select-none font-heading text-[110px] leading-none"
                style={{ color: "hsl(var(--primary) / 0.08)" }}
              >
                &ldquo;
              </span>
              <figcaption className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Success Spotlight
              </figcaption>
              <blockquote className="relative mt-3 font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl lg:text-[1.7rem]">
                &ldquo;Real NSS students are already competing — your name
                belongs in this space.&rdquo;
              </blockquote>
              <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Reserved for a verified student success story — swapped in via
                CMS once confirmed. No fabricated achievements ship to
                production.
              </p>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────── PICK YOUR ARENA ─────────────────────── */}
      <section className="bg-background py-24 lg:py-32" id="categories">
        <div className="mx-auto max-w-5xl px-6">
          {/* split editorial header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <FadeIn y={10}>
                <SectionLabel>OLYMPIAD CATEGORIES</SectionLabel>
              </FadeIn>
              <FadeIn y={16} delay={0.08}>
                <h2 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                  Pick your arena.
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.16}>
              <p className="max-w-sm leading-relaxed text-muted-foreground md:text-right">
                Seven disciplines. Study material, model papers, and a roadmap
                for every single one.
              </p>
            </FadeIn>
          </div>

          {/* manifest list — each row carries its own olympiad color */}
          <div className="mt-12 border-t border-border lg:mt-16">
            {olympiads.map((o, i) => {
              const Icon = o.icon;
              return (
                <FadeIn key={o.slug} y={16} delay={i * 0.05}>
                  <Link
                    href={`/olympiads/${o.slug}`}
                    style={{
                      ["--c" as any]: `hsl(var(${o.colorVar}))`,
                      ["--c-soft" as any]: `hsl(var(${o.colorVar}) / 0.07)`,
                    }}
                    className="group relative flex items-center gap-4 border-b border-border px-2 py-6 transition-colors duration-300 hover:bg-[color:var(--c-soft)] sm:gap-6 sm:px-3 sm:py-7"
                  >
                    {/* index */}
                    <span className="hidden w-7 flex-shrink-0 font-heading text-xs font-bold tabular-nums text-muted-foreground/50 transition-colors duration-300 group-hover:text-[color:var(--c)] sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* icon chip — small, colored, no white blob */}
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
                      style={{
                        borderColor: `hsl(var(${o.colorVar}) / 0.25)`,
                        background: `hsl(var(${o.colorVar}) / 0.06)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                        style={{ color: `hsl(var(${o.colorVar}))` }}
                      />
                    </span>

                    {/* copy */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors duration-300 group-hover:text-[color:var(--c)] sm:text-lg">
                        {o.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                        {o.tagline}
                      </p>
                    </div>

                    {/* arrow */}
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c-soft)] group-hover:text-[color:var(--c)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── TEAM (unchanged) ───────────────────────── */}
      {/* TEAM — editorial masthead */}
      <section
        className="border-y border-border bg-secondary/20 py-24 lg:py-32"
        id="team"
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* split editorial header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <FadeIn y={10}>
                <SectionLabel>WHO&apos;S BEHIND THIS</SectionLabel>
              </FadeIn>
              <FadeIn y={16} delay={0.08}>
                <h2 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                  Built by students, for students.
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.16}>
              <p className="max-w-sm leading-relaxed text-muted-foreground md:text-right">
                Organized by President Divya D. Sharma, the Executive Team, and
                the STEM Club — with support from the Social Club of NSS Clubs.
              </p>
            </FadeIn>
          </div>

          {/* credits */}
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {teamCards.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeIn key={i} delay={i * 0.08} y={14}>
                  <div className="group border-t border-border pt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-[11px] font-bold tabular-nums text-muted-foreground/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-primary/40 transition-transform duration-300 group-hover:scale-150" />
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {m.role}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-heading text-lg font-bold text-foreground sm:text-xl">
                      {m.name}
                    </h3>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA (unchanged) ───────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-primary">
        <GeometricHeroCanvas
          variant="light"
          className="absolute inset-0 -z-10 opacity-15"
        />
        <FadeIn scale={0.98} duration={0.5}>
          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
              Ready to prove what you know?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed">
              Pick your Olympiad and get instant access to study material, model
              papers, and a roadmap built to get you there.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/olympiads"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-3.5 text-sm font-semibold font-heading border-b-4 border-white/30 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
                >
                  Start Preparing <ArrowRight className="h-[18px] w-[18px]" />
                </Link>
              </MagneticButton>
              <Link
                href="/olympiads"
                className="text-primary-foreground/90 underline-offset-4 hover:underline text-sm font-medium py-2"
              >
                or browse all 7 categories →
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
