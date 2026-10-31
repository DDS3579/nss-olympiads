"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { isAnswerSet, matchPaper } from "@/lib/filter";
import { mailto } from "@/lib/site-config";
import { useProgress } from "@/lib/progress/store";
import { useFilters } from "./UrlStateProvider";
import { SectionHeading } from "./primitives";
import { AnswerSetCard, PaperCard } from "./PaperCard";
import { PaperTimer } from "./PaperTimer";
import { MiniTimer } from "./MiniTimer";
import type { Level, Paper, SubjectData } from "@/lib/types";

const LEVEL_ORDER: Level[] = ["district", "province", "national", "international"];

const byYearDesc = (a: Paper, b: Paper) => (b.year ?? -Infinity) - (a.year ?? -Infinity);

export function ModelPapersSection({ data }: { data: SubjectData }) {
  const { f, reset } = useFilters();
  const { meta } = data;
  const c = meta.colorVar;
  const prog = useProgress(meta.slug);
  const [revealed, setRevealed] = useState(false);

  const papers = data.papers.filter((p) => p.access !== "dead");
  const answerSets = papers.filter(isAnswerSet);
  const cardPapers = papers.filter((p) => !isAnswerSet(p));

  const visible = cardPapers.filter((p) => matchPaper(p, f)).sort(byYearDesc);

  const [timerPaper, setTimerPaper] = useState<Paper | null>(null);
  const allPapersForTimer = [...cardPapers, ...answerSets];
  const openTimerById = (id: string) => {
    const found = allPapersForTimer.find((x) => x.id === id);
    if (found) setTimerPaper(found);
  };
  const topicNames = Object.fromEntries(data.topics.map((t) => [t.id, t.name]));

  const levelFilterOn = f.level !== "all";
  const filtered =
    f.topic !== "" || levelFilterOn || f.type !== "" || f.q !== "" || f.nepal || f.sol;

  const groups = LEVEL_ORDER.map((lv) => ({
    lv,
    items: visible.filter((p) => p.levels.includes(lv)),
  })).filter((g) => g.items.length > 0);

  const chosenMeta = levelFilterOn ? meta.levels[f.level as Level] : null;
  const nearest = (() => {
    if (!levelFilterOn) return null;
    const idx = LEVEL_ORDER.indexOf(f.level as Level);
    for (const step of [1, -1, 2, -2, 3, -3]) {
      const lv = LEVEL_ORDER[idx + step];
      if (lv && meta.levels[lv].exists && cardPapers.some((p) => p.levels.includes(lv))) return lv;
    }
    return null;
  })();

  // Answers: revealed automatically once any paper has an attempt (T4.7 soft gate)
  const attemptedAny = cardPapers.some((p) => prog.paper[p.id]);
  const answersOpen = attemptedAny || revealed;
  const answersVisible = answerSets.filter(
    (a) => !levelFilterOn || a.levels.includes(f.level as Level)
  );

  const renderYearGroups = (items: Paper[]) => {
    const yg = new Map<string, Paper[]>();
    for (const p of items) {
      const y = p.year != null ? String(p.year) : "Undated";
      yg.set(y, [...(yg.get(y) ?? []), p]);
    }
    return [...yg.entries()].map(([year, list]) => (
      <div key={year}>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {year}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="space-y-3">
          {list.map((p) => (
            <PaperCard key={p.id} p={p} meta={meta} topicNames={topicNames} onStartTimer={setTimerPaper} />
          ))}
        </div>
      </div>
    ));
  };

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
              ? `Papers matching ${topicNames[f.topic] ?? "the selected topic"}.`
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
                  {cardPapers
                    .filter((p) => p.levels.includes(nearest))
                    .sort(byYearDesc)
                    .slice(0, 2)
                    .map((p) => (
                      <PaperCard key={p.id} p={p} meta={meta} topicNames={topicNames} onStartTimer={setTimerPaper} />
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
        ) : filtered && visible.length === 0 && levelFilterOn && chosenMeta?.exists ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No past papers are publicly available for this level
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              You can request them from {meta.organiser.name} — we&apos;re asking too.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Clear filters
              </button>
              <a
                href={mailto(`Paper request for ${meta.name}`)}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Request a paper
              </a>
            </div>
          </div>
        ) : filtered && visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No papers match these filters
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Clear filters
              </button>
              <a
                href={mailto(`Paper request for ${meta.name}`)}
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Request a paper
              </a>
            </div>
          </div>
        ) : levelFilterOn ? (
          <div className="space-y-6">{renderYearGroups(visible)}</div>
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
                      {g.items.length} {g.items.length === 1 ? "paper" : "papers"}
                    </span>
                  </div>
                  <div className="space-y-6">{renderYearGroups(g.items)}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Soft-gated Answers block — never styled as a paper (Q3 default, T4.7) */}
        {answersVisible.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                Answers
              </h3>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-3">
              {answersVisible.map((a) => (
                <AnswerSetCard
                  key={a.id}
                  p={a}
                  meta={meta}
                  open={answersOpen}
                  onReveal={() => setRevealed(true)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <PaperTimer
        paper={timerPaper}
        open={!!timerPaper}
        onOpenChange={(o) => {
          if (!o) setTimerPaper(null);
        }}
        slug={meta.slug}
        colorVar={c}
      />
      <MiniTimer onOpen={openTimerById} />
    </section>
  );
}
