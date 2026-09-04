"use client";

import { Calendar, ArrowDownToLine } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { DifficultyMeter, SectionHeading } from "./primitives";
import type { ModelPaper, Olympiad } from "@/lib/data/olympiads";

function PaperRow({ paper, colorVar }: { paper: ModelPaper; colorVar: string }) {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-5 transition-colors"
      style={{ ["--hover-color" as string]: `hsl(var(${colorVar}) / 0.4)` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span
              className="rounded-full px-2 py-0.5 font-semibold"
              style={{
                background: `hsl(var(${colorVar}) / 0.12)`,
                color: `hsl(var(${colorVar}))`,
              }}
            >
              {paper.year}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Not started
            </span>
          </div>
          <h3 className="mt-2 font-heading text-lg font-bold text-foreground">
            {paper.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {[paper.problems && `${paper.problems} problems`, paper.duration]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          {typeof paper.difficulty === "number" && (
            <DifficultyMeter level={paper.difficulty} colorVar={colorVar} />
          )}
          <a
            href={paper.fileUrl}
            download
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: `hsl(var(${colorVar}))` }}
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Start Paper
          </a>
        </div>
      </div>
    </div>
  );
}

function EmptyPapers() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
      <p className="font-heading text-lg font-semibold text-foreground">
        No papers published yet
      </p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Model question papers will appear here as they are released.
      </p>
    </div>
  );
}

export function ModelPapersSection({ olympiad }: { olympiad: Olympiad }) {
  const papers = olympiad.modelPapers;
  const c = olympiad.colorVar;

  const grouped = papers.reduce((acc, paper) => {
    const year = paper.year || "General";
    if (!acc[year]) acc[year] = [];
    acc[year].push(paper);
    return acc;
  }, {} as Record<string, ModelPaper[]>);

  const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <section id="papers" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="06"
          label="Model Papers"
          title="Simulate the real thing"
          description="Timed, competition-format papers. Treat each one like the real round."
          colorVar={c}
        />

        {papers.length === 0 ? (
          <EmptyPapers />
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
                  {grouped[year].map((p, i) => (
                    <FadeIn key={`${p.title}-${i}`} delay={i * 0.06}>
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