"use client";

import { FadeIn } from "@/components/FadeIn";
import { matchResource } from "@/lib/filter";
import { mailto } from "@/lib/site-config";
import { useFilters } from "./UrlStateProvider";
import { SectionHeading, scrollToId } from "./primitives";
import { ResourceCard } from "./ResourceCard";
import type { Level, Resource, SubjectData } from "@/lib/types";

const LEVEL_ORDER: Level[] = ["district", "province", "national", "international"];

const byPriority = (a: Resource, b: Resource) =>
  Number(b.highlight ?? false) - Number(a.highlight ?? false) ||
  Number(b.nepalSpecific) - Number(a.nepalSpecific) ||
  a.title.localeCompare(b.title);

export function StudyMaterialSection({ data }: { data: SubjectData }) {
  const { f, reset } = useFilters();
  const { meta } = data;
  const c = meta.colorVar;

  const resources = data.resources.filter((r) => r.access !== "dead");
  const visible = resources.filter((r) => matchResource(r, f)).sort(byPriority);
  const topicNames = Object.fromEntries(data.topics.map((t) => [t.id, t.name]));

  const levelFilterOn = f.level !== "all";
  const filtered =
    f.topic !== "" || levelFilterOn || f.type !== "" || f.q !== "" || f.nepal || f.sol;

  // level = all → grouped by level (subject-specific labels); else flat (T4.6)
  const groups = LEVEL_ORDER.map((lv) => ({
    lv,
    items: visible.filter((r) => r.levels.includes(lv)),
  })).filter((g) => g.items.length > 0);

  // Honest empty state for non-existent levels (J.2): nearest real level's top 2
  const chosenMeta = levelFilterOn ? meta.levels[f.level as Level] : null;
  const nearest = (() => {
    if (!levelFilterOn) return null;
    const idx = LEVEL_ORDER.indexOf(f.level as Level);
    for (const step of [1, -1, 2, -2, 3, -3]) {
      const lv = LEVEL_ORDER[idx + step];
      if (lv && meta.levels[lv].exists && resources.some((r) => r.levels.includes(lv))) return lv;
    }
    return null;
  })();

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
              ? `Materials matching ${topicNames[f.topic] ?? "the selected topic"}.`
              : `Curated resources for ${meta.name}.`
          }
          colorVar={c}
        />

        {resources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              Your library is quiet for now
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Study materials will appear here as the {meta.name} library is curated and
              verified.
            </p>
            <button
              onClick={() => scrollToId("topics")}
              className="mt-6 inline-flex min-h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Explore Topics
            </button>
          </div>
        ) : filtered && visible.length === 0 && chosenMeta && !chosenMeta.exists ? (
          <div className="rounded-2xl border border-dashed border-border p-8 lg:p-12">
            <p className="font-heading text-lg font-semibold text-foreground">
              No official {chosenMeta.label} round
            </p>
            {chosenMeta.honestNote && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {chosenMeta.honestNote}
              </p>
            )}
            {nearest && (
              <>
                <p className="mt-6 text-sm font-semibold text-foreground">
                  Here&apos;s the closest level instead:
                </p>
                <div className="mt-3 space-y-3">
                  {resources
                    .filter((r) => r.levels.includes(nearest))
                    .sort(byPriority)
                    .slice(0, 2)
                    .map((r) => (
                      <ResourceCard key={r.id} r={r} meta={meta} topicNames={topicNames} />
                    ))}
                </div>
              </>
            )}
            <button
              onClick={reset}
              className="mt-6 inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Clear filters
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
              <button
                onClick={reset}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Clear filters
              </button>
              <a
                href={mailto(`Resource suggestion for ${meta.name}`)}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Suggest a resource
              </a>
            </div>
          </div>
        ) : levelFilterOn ? (
          <div className="space-y-3">
            {visible.map((r) => (
              <ResourceCard key={r.id} r={r} meta={meta} topicNames={topicNames} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((g) => (
              <FadeIn key={g.lv}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                      {meta.levels[g.lv].label}
                    </h3>
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">
                      {g.items.length} {g.items.length === 1 ? "resource" : "resources"}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {g.items.map((r) => (
                      <ResourceCard key={r.id} r={r} meta={meta} topicNames={topicNames} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
