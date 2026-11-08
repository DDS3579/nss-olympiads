import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getSubjectIndex } from "@/lib/data";
import { SubjectGrid } from "@/components/home/SubjectGrid";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "All Olympiads",
  description:
    "Browse level-wise preparation for all 7 Olympiads in Nepal — Mathematics, Physics, Chemistry, Astronomy, AI, Informatics and Biology.",
  path: "/olympiads",
});

export default function OlympiadsPage() {
  const subjects = getSubjectIndex();

  return (
    <div className="relative overflow-x-clip pb-20 pt-10 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,hsl(var(--primary)/0.07),transparent_70%)]"
      />

      <header className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-primary/40" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            NSS Olympiad Series
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
          Seven Olympiads.{" "}
          <span className="italic text-primary">One honest ladder each.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Choose a subject to see its real rounds — District, Province, National, International —
          the official syllabus, past papers and a roadmap. Not sure where to start? Filter by your
          grade.
        </p>

        <form
          action="/search"
          role="search"
          className="mt-7 flex max-w-xl items-center gap-2 rounded-full border border-border bg-background p-1.5 pl-5 focus-within:border-primary/60"
        >
          <Search aria-hidden className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <label htmlFor="oly-q" className="sr-only">
            Search all Olympiads
          </label>
          <input
            id="oly-q"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Search every subject — optics, graphs, IMO…"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Search
          </button>
        </form>
      </header>

      <section aria-label="Olympiads" className="relative mx-auto mt-10 max-w-6xl px-5 sm:px-6">
        <SubjectGrid subjects={subjects} />

        <Link
          href="/exams"
          className="mt-10 flex flex-col gap-2 rounded-2xl border border-dashed border-border bg-secondary/30 p-6 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              Compare all rounds side by side
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Negative marking, calculators, eligibility, fees and dates for every Olympiad.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Open exam comparison <ArrowRight aria-hidden className="h-4 w-4" />
          </span>
        </Link>
      </section>
    </div>
  );
}
