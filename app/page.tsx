import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Compass,
  Crown,
  Eye,
  FileCheck,
  FlaskConical,
  Gift,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Users,
} from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionLabel } from "@/components/SectionLabel";
import { OlympiadHero } from "@/components/hero/OlympiadHero";
import { SubjectCard } from "@/components/home/SubjectCard";
import { RecordsSection } from "@/components/home/RecordsSection";
import { SpotlightSection } from "@/components/home/SpotlightSection";
import { getAllSubjects, getSubjectIndex } from "@/lib/data";
import { siteStats } from "@/lib/data/stats";
import { pageMeta } from "@/lib/seo";
import { strong } from "@/lib/color";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMeta({
  title: "NSS Olympiad Hub — Free Olympiad preparation for Nepal",
  description: siteConfig.description,
  path: "/",
  absolute: true,
});

const steps = [
  {
    icon: Compass,
    title: "Pick your Olympiad",
    body: "Seven subjects, each with its own exam ladder, syllabus and roadmap.",
  },
  {
    icon: Layers,
    title: "Find your level",
    body: "District, Province, National, International — we show which round you are actually sitting, and say plainly when a round doesn't exist.",
  },
  {
    icon: FileCheck,
    title: "Open verified material",
    body: "Every link is opened by a person, dated, and labelled with access notes and licences. Free, no account.",
  },
];

const whyRows = [
  {
    colorVar: "--subject-physics",
    tag: "Admissions",
    title: "Stand Out in University Applications",
    body: "Olympiad participation and medals carry real weight with scholarship boards and admissions committees, in Nepal and abroad — proof you can think under pressure, not just memorise.",
  },
  {
    colorVar: "--subject-chemistry",
    tag: "Entrance Exams",
    title: "A Sharper Foundation for IOE, CEE & NEB",
    body: "The problem-solving depth that wins Olympiad medals is exactly what engineering and medical entrance exams reward. Prepare for one and you are already ahead on the other.",
  },
  {
    colorVar: "--subject-astronomy",
    tag: "Global Stage",
    title: "Represent Nepal on a Global Stage",
    body: "Nepali students compete at the IMO, IPhO, IChO, IOAA, IBO and IOAI. Very few ever get that far — this is how you become one of them.",
  },
  {
    colorVar: "--subject-ai",
    tag: "Community",
    title: "You're Not Doing This Alone",
    body: "NSS Clubs' STEM Club curates the resources and keeps them honest, so preparation feels like a team effort, not a solo grind.",
  },
];

const trust = [
  {
    icon: ShieldCheck,
    title: "Checked by people",
    body: "Each link carries the date a person last opened it, plus access notes for slow or login-walled sites.",
  },
  {
    icon: Gift,
    title: "Free, no account",
    body: "Nothing to sign up for. We link to free sources and host only what the licence allows.",
  },
  {
    icon: Eye,
    title: "Honest about gaps",
    body: "Where no Nepali material exists, we say so — and show where the opportunity is.",
  },
];

const teamCards = [
  { icon: Crown, role: "President", name: "Divya D. Sharma" },
  { icon: Users, role: "Executive Team", name: "NSS Clubs" },
  { icon: FlaskConical, role: "Lead Organizer", name: "STEM Club" },
  { icon: HeartHandshake, role: "Supporting Partner", name: "Social Club" },
];

export default function Home() {
  const subjects = getSubjectIndex();
  const totals = siteStats(getAllSubjects());

  return (
    <div className="overflow-x-clip bg-background">
      {/* ─────────── HERO ─────────── */}
      <OlympiadHero subjects={subjects} totalResources={totals.resources} />

      {/* ─────────── HOW IT WORKS ─────────── */}
      <section id="how" aria-labelledby="how-title" className="section-anchor py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-2xl">
            <FadeIn y={10}>
              <SectionLabel>HOW IT WORKS</SectionLabel>
            </FadeIn>
            <FadeIn y={16} delay={0.08}>
              <h2
                id="how-title"
                className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
              >
                Three steps from &ldquo;where do I start?&rdquo; to a real paper.
              </h2>
            </FadeIn>
          </div>
          <div role="list" className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <FadeIn key={st.title} delay={i * 0.08} y={14}>
                  <div role="listitem" className="h-full rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon aria-hidden className="h-5 w-5" />
                      </span>
                      <span
                        aria-hidden
                        className="font-heading text-sm font-bold tabular-nums text-muted-foreground"
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                      {st.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{st.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── WHY OLYMPIADS ─────────── */}
      <section
        id="why"
        aria-labelledby="why-title"
        className="section-anchor relative bg-secondary/30 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <FadeIn y={10}>
                  <SectionLabel>WHY OLYMPIADS</SectionLabel>
                </FadeIn>
                <FadeIn y={16} delay={0.08}>
                  <h2
                    id="why-title"
                    className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem]"
                  >
                    More than a competition.{" "}
                    <span className="italic text-primary">A launchpad.</span>
                  </h2>
                </FadeIn>
                <FadeIn y={12} delay={0.16}>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    For students in Grades 8–12, Olympiads open doors that regular exams
                    don&apos;t.
                  </p>
                </FadeIn>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div role="list" className="border-t border-border">
                {whyRows.map((row, i) => (
                  <FadeIn key={row.tag} y={18} delay={i * 0.07}>
                    <div
                      role="listitem"
                      className="group relative flex gap-5 border-b border-border py-7 transition-colors duration-300 hover:bg-[color:var(--c-soft)] sm:gap-7 sm:py-9"
                      style={
                        {
                          ["--c"]: `hsl(var(${row.colorVar}))`,
                          ["--c-soft"]: `hsl(var(${row.colorVar}) / 0.05)`,
                          ["--c-rail"]: `hsl(var(${row.colorVar}) / 0.25)`,
                        } as CSSProperties
                      }
                    >
                      <div aria-hidden className="flex w-7 flex-shrink-0 flex-col items-center self-stretch">
                        <span
                          className="font-heading text-[13px] font-bold leading-6 tabular-nums"
                          style={{ color: strong(row.colorVar) }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-3 w-px flex-1 bg-[color:var(--c-rail)] transition-colors duration-300 group-hover:bg-[color:var(--c)]" />
                      </div>
                      <div className="min-w-0 flex-1 pb-1">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: strong(row.colorVar) }}
                        >
                          {row.tag}
                        </span>
                        <h3 className="mt-1.5 font-heading text-xl font-bold leading-snug text-foreground sm:text-[1.35rem]">
                          {row.title}
                        </h3>
                        <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                          {row.body}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── PICK YOUR OLYMPIAD ─────────── */}
      <section
        id="categories"
        aria-labelledby="categories-title"
        className="section-anchor py-20 lg:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <FadeIn y={10}>
                <SectionLabel>OLYMPIAD CATEGORIES</SectionLabel>
              </FadeIn>
              <FadeIn y={16} delay={0.08}>
                <h2
                  id="categories-title"
                  className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
                >
                  Pick your arena.
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.16}>
              <p className="max-w-sm leading-relaxed text-muted-foreground md:text-right">
                Seven disciplines. Each one shows its real exam ladder, syllabus and roadmap.
              </p>
            </FadeIn>
          </div>

          <div role="list" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s, i) => (
              <FadeIn key={s.slug} y={16} delay={(i % 3) * 0.06}>
                <div role="listitem" className="h-full">
                  <SubjectCard s={s} />
                </div>
              </FadeIn>
            ))}
            <FadeIn y={16} delay={0.12}>
              <div role="listitem" className="h-full">
                <Link
                  href="/exams"
                  className="flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-dashed border-border bg-secondary/30 p-5 transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                >
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Sitting more than one exam?
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Compare marking rules, eligibility and dates across all seven Olympiads
                      before you register.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Compare exams <ArrowRight aria-hidden className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────── NEPAL'S RECORD (auto-hides without sourced data) ─────────── */}
      <RecordsSection />

      {/* ─────────── SPOTLIGHT (auto-hides until verified + consented) ─────────── */}
      <SpotlightSection />

      {/* ─────────── TRUST ─────────── */}
      <section aria-labelledby="trust-title" className="border-y border-border bg-secondary/20 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 id="trust-title" className="sr-only">
            Why you can trust this hub
          </h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.title} className="flex list-none gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-sm">
            <Link href="/about#verification" className="font-semibold text-primary underline-offset-4 hover:underline">
              How we verify and license material →
            </Link>
          </p>
        </div>
      </section>

      {/* ─────────── TEAM ─────────── */}
      <section id="team" aria-labelledby="team-title" className="section-anchor py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <FadeIn y={10}>
                <SectionLabel>WHO&apos;S BEHIND THIS</SectionLabel>
              </FadeIn>
              <FadeIn y={16} delay={0.08}>
                <h2
                  id="team-title"
                  className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
                >
                  Built by students, for students.
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.16}>
              <p className="max-w-sm leading-relaxed text-muted-foreground md:text-right">
                Organised by President Divya D. Sharma, the Executive Team and the STEM Club — with
                support from the Social Club of NSS Clubs.
              </p>
            </FadeIn>
          </div>

          <div role="list" className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamCards.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeIn key={m.role} delay={i * 0.08} y={14}>
                  <div role="listitem" className="border-t border-border pt-5">
                    <div className="flex items-center gap-2">
                      <Icon aria-hidden className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {m.role}
                      </span>
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-bold text-foreground sm:text-xl">
                      {m.name}
                    </h3>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── CTA (pure CSS background — no animation library) ─────────── */}
      <section
        aria-labelledby="home-cta-title"
        className="relative overflow-hidden bg-primary py-20 lg:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.22), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.14), transparent 45%), linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 44px 44px, 44px 44px",
          }}
        />
        <FadeIn scale={0.98} duration={0.5}>
          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <h2
              id="home-cta-title"
              className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl"
            >
              Ready to prove what you know?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">
              Pick your Olympiad, find your level, and open material that has actually been checked.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <Link
                  href="/olympiads"
                  className="inline-flex items-center gap-2 rounded-full border-b-4 border-black/15 bg-white px-8 py-3.5 font-heading text-sm font-semibold text-[#0a5f8a] transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-2"
                >
                  Start Preparing <ArrowRight aria-hidden className="h-[18px] w-[18px]" />
                </Link>
              </MagneticButton>
              <Link
                href="/search"
                className="inline-flex min-h-11 items-center text-sm font-medium text-primary-foreground underline-offset-4 hover:underline"
              >
                or search the library →
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
