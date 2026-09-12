"use client";

import { ArrowDownToLine, FileText, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading, scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad, Resource } from "@/lib/data/olympiads";

function ResourceRow({ r, index, colorVar }: { r: Resource; index: number; colorVar: string }) {
  const { isResourceOpened, markResourceOpened } = useOlympiadProgress();
  const opened = isResourceOpened(r.title);

  return (
    <FadeIn delay={index * 0.05}>
      <div className="flex items-center justify-between gap-4 py-5">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `hsl(var(${colorVar}) / 0.1)` }}
          >
            <FileText className="h-5 w-5" style={{ color: `hsl(var(${colorVar}))` }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-heading font-semibold text-foreground">{r.title}</h3>
              {opened && (
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: `hsl(var(${colorVar}))` }} />
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground">
                {r.type}
              </span>
              {(r.topicIds?.length ?? 0) > 0 && <span>· topic-specific</span>}
            </div>
          </div>
        </div>
        <a
          href={r.fileUrl}
          download
          onClick={() => markResourceOpened(r.title, r.title)}
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" style={{ color: `hsl(var(${colorVar}))` }} />
          <span className="hidden sm:inline">{opened ? "Opened" : "Download"}</span>
        </a>
      </div>
    </FadeIn>
  );
}

export function StudyMaterialSection({ olympiad }: { olympiad: Olympiad }) {
  const { focusedTopic, matchesFocus, clearFocus } = useOlympiadProgress();
  const resources = olympiad.studyMaterial;
  const c = olympiad.colorVar;

  const visible = resources.filter((r) => matchesFocus(r.topicIds));
  const isFocused = !!focusedTopic;

  return (
    <section id="library" className="section-anchor border-y border-border bg-secondary/20 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="05"
          label="Library"
          title="Study material"
          description={
            isFocused
              ? `Materials for ${focusedTopic.name}, plus general resources.`
              : `Curated resources for ${olympiad.name}.`
          }
          colorVar={c}
        />

        {resources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">Your library is quiet for now</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Study materials will appear here as the Olympiad library grows.
            </p>
            <button
              onClick={() => scrollToId("topics")}
              className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Explore Topics
            </button>
          </div>
        ) : isFocused && visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No {focusedTopic.name} materials yet
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Nothing is tagged to this topic yet. Clear the focus to see all materials.
            </p>
            <button
              onClick={clearFocus}
              className="mt-6 inline-flex items-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View all materials
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {visible.map((r, i) => (
              <ResourceRow key={`${r.title}-${i}`} r={r} index={i} colorVar={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}