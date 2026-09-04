"use client";

import { ArrowDownToLine, FileText } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading, scrollToId } from "./primitives";
import type { Olympiad, Resource } from "@/lib/data/olympiads";

function ResourceRow({ r, index, colorVar }: { r: Resource; index: number; colorVar: string }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div className="flex items-center justify-between gap-4 py-5">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-heading font-semibold text-foreground">{r.title}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span
                className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground"
              >
                {r.type}
              </span>
              {r.time && <span>· {r.time}</span>}
              {r.difficulty && <span>· {r.difficulty}</span>}
            </div>
          </div>
        </div>
        <a
          href={r.fileUrl}
          download
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" style={{ color: `hsl(var(${colorVar}))` }} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>
    </FadeIn>
  );
}

function EmptyLibrary() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
      <p className="font-heading text-lg font-semibold text-foreground">
        Your library is quiet for now
      </p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Study materials will appear here as the Olympiad library grows. Meanwhile,
        explore the topics to start mapping your path.
      </p>
      <button
        onClick={() => scrollToId("topics")}
        className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Explore Topics
      </button>
    </div>
  );
}

export function StudyMaterialSection({ olympiad }: { olympiad: Olympiad }) {
  const resources = olympiad.studyMaterial;

  return (
    <section
      id="library"
      className="section-anchor border-y border-border bg-secondary/20 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="05"
          label="Library"
          title="Study material"
          description={`Curated resources for ${olympiad.name}.`}
        />

        {resources.length === 0 ? (
          <EmptyLibrary />
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {resources.map((r, i) => (
              <ResourceRow key={`${r.title}-${i}`} r={r} index={i} colorVar={olympiad.colorVar} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}