"use client";

import { ArrowUpRight, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { strong } from "@/lib/color";
import { matchResource } from "@/lib/filter";
import { mailto } from "@/lib/site-config";
import { SectionHeading, scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import { useFilters } from "./UrlStateProvider";
import type { Resource, SubjectData } from "@/lib/types";

const TYPE_LABEL: Record<string, string> = {
  book: "Book",
  handout: "Handout",
  course: "Course",
  video: "Video",
  tool: "Tool",
  dataset: "Dataset",
  official: "Official",
  problemset: "Problem set",
  mock: "Mock exam",
  pastpaper: "Past paper",
};

const BTN =
  "inline-flex min-h-10 flex-shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary";

function ResourceRow({ r, index, colorVar }: { r: Resource; index: number; colorVar: string }) {
  const { isResourceOpened, markResourceOpened } = useOlympiadProgress();
  const opened = isResourceOpened(r.title); // keyed on title until the T5.1 store rewrite
  const hosted = r.url.startsWith("/");

  return (
    <FadeIn delay={index * 0.05}>
      <div className="flex items-center justify-between gap-4 py-5">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `hsl(var(${colorVar}) / 0.1)` }}
          >
            <FileText className="h-5 w-5" style={{ color: strong(colorVar) }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-heading font-semibold text-foreground">{r.title}</h3>
              {opened && (
                <CheckCircle2
                  className="h-3.5 w-3.5 flex-shrink-0"
                  style={{ color: strong(colorVar) }}
                />
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground">
                {TYPE_LABEL[r.type] ?? r.type}
              </span>
              {r.nepalSpecific && <span>🇳🇵 Nepal-specific</span>}
              {r.topics.length > 0 && <span>· topic-specific</span>}
            </div>
          </div>
        </div>

        {/* Primary action by kind (B-13): no `download` on external URLs, everything
            that leaves the page opens in a new tab and says so. */}
        {r.kind === "page" && !hosted ? (
          <Link href={r.url} onClick={() => markResourceOpened(r.title, r.title)} className={BTN}>
            <ArrowUpRight className="h-3.5 w-3.5" style={{ color: strong(colorVar) }} />
            <span className="hidden sm:inline">{opened ? "Opened" : "Read"}</span>
          </Link>
        ) : (
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => markResourceOpened(r.title, r.title)}
            className={BTN}
          >
            <ArrowUpRight className="h-3.5 w-3.5" style={{ color: strong(colorVar) }} />
            <span className="hidden sm:inline">
              {opened ? "Opened" : hosted ? "View PDF" : "Open"}
            </span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
      </div>
    </FadeIn>
  );
}

export function StudyMaterialSection({ data }: { data: SubjectData }) {
  const { f, reset } = useFilters();
  const c = data.meta.colorVar;
  const resources = data.resources.filter((r) => r.access !== "dead");
  const visible = resources.filter((r) => matchResource(r, f));
  const filtered =
    f.topic !== "" || f.level !== "all" || f.type !== "" || f.q !== "" || f.nepal || f.sol;
  const topicName = f.topic ? data.topics.find((t) => t.id === f.topic)?.name : undefined;

  return (
    <section
      id="library"
      aria-labelledby="library-title"
      className="section-anchor border-y border-border bg-secondary/20 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="01"
          label="Materials"
          title="Study material"
          titleId="library-title"
          description={
            f.topic
              ? `Materials matching ${topicName ?? "the selected topic"}.`
              : `Curated resources for ${data.meta.name}.`
          }
          colorVar={c}
        />

        {resources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              Your library is quiet for now
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Study materials will appear here as the {data.meta.name} library is curated and
              verified.
            </p>
            <button
              onClick={() => scrollToId("topics")}
              className="mt-6 inline-flex min-h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Explore Topics
            </button>
          </div>
        ) : filtered && visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No resources match these filters
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Try removing a filter, or search all levels.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button onClick={reset} className={BTN}>
                Clear filters
              </button>
              <a href={mailto(`Resource suggestion for ${data.meta.name}`)} className={BTN}>
                Suggest a resource
              </a>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {visible.map((r, i) => (
              <ResourceRow key={r.id} r={r} index={i} colorVar={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
