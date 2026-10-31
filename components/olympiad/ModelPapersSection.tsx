"use client";

import { ArrowUpRight, Calendar } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { onStrong, strong } from "@/lib/color";
import { matchPaper } from "@/lib/filter";
import { mailto } from "@/lib/site-config";
import { SectionHeading } from "./primitives";
import { useOlympiadProgress } from "./context";
import { useFilters } from "./UrlStateProvider";
import type { Paper, SubjectData } from "@/lib/types";

function PaperRow({ paper, colorVar }: { paper: Paper; colorVar: string }) {
  const { isPaperAccessed, markPaperAccessed } = useOlympiadProgress();
  const accessed = isPaperAccessed(paper.title); // keyed on title until the T5.1 store rewrite
  const primary = paper.files[0];
  const formatBits = [paper.format.questions, paper.format.duration].filter(Boolean).join(" · ");

  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span
              className="rounded-full px-2 py-0.5 font-semibold"
              style={{ background: `hsl(var(${colorVar}) / 0.12)`, color: strong(colorVar) }}
            >
              {paper.year != null ? String(paper.year) : "General"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {accessed ? "In progress" : "Not started"}
            </span>
          </div>
          <h3 className="mt-2 font-heading text-lg font-bold text-foreground">{paper.title}</h3>
          {formatBits && <p className="mt-1 text-sm text-muted-foreground">{formatBits}</p>}
        </div>
        <a
          href={primary?.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => markPaperAccessed(paper.title, paper.title)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold transition-all hover:brightness-110"
          style={{ background: strong(colorVar), color: onStrong }}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          {accessed ? "Continue Paper" : "Start Paper"}
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </div>
  );
}

export function ModelPapersSection({ data }: { data: SubjectData }) {
  const { f, reset } = useFilters();
  const c = data.meta.colorVar;
  const papers = data.papers.filter((p) => p.access !== "dead");
  const visible = papers.filter((p) => matchPaper(p, f));
  const filtered =
    f.topic !== "" || f.level !== "all" || f.type !== "" || f.q !== "" || f.nepal || f.sol;
  const topicName = f.topic ? data.topics.find((t) => t.id === f.topic)?.name : undefined;

  const grouped = visible.reduce(
    (acc, p) => {
      const year = p.year != null ? String(p.year) : "General";
      if (!acc[year]) acc[year] = [];
      acc[year].push(p);
      return acc;
    },
    {} as Record<string, Paper[]>
  );
  const sortedYears = Object.keys(grouped).sort((a, b) =>
    a === "General" ? 1 : b === "General" ? -1 : b.localeCompare(a)
  );

  return (
    <section id="papers" aria-labelledby="papers-title" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="02"
          label="Past Papers"
          title="Simulate the real thing"
          titleId="papers-title"
          description={
            f.topic
              ? `Papers matching ${topicName ?? "the selected topic"}.`
              : "Timed, competition-format papers. Treat each one like the real round."
          }
          colorVar={c}
        />

        {papers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No papers published yet
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Past papers will appear here once they are verified and cleared for publication.
            </p>
          </div>
        ) : filtered && visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No papers match these filters
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Try removing a filter, or search all levels.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Clear filters
              </button>
              <a
                href={mailto(`Paper request for ${data.meta.name}`)}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Request a paper
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedYears.map((year) => (
              <div key={year}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                    {year}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-3">
                  {grouped[year].map((p) => (
                    <FadeIn key={p.id} delay={0.06}>
                      <PaperRow paper={p} colorVar={c} />
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
