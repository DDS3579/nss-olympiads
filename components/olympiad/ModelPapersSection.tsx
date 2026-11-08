"use client";

import type { ReactNode } from "react";
import { FadeIn } from "@/components/FadeIn";
import { isAnswerSet, matchPaper } from "@/lib/filter";
import { mailto } from "@/lib/site-config";
import { useFilters } from "./UrlStateProvider";
import { SectionHeading, scrollToId } from "./primitives";
import { AnswerSetCard, PaperCard } from "./PaperCard";
import type { Level, Paper, SubjectData } from "@/lib/types";

const LEVEL_ORDER: Level[] = ["district", "province", "national", "international"];
const byYearDesc = (a: Paper, b: Paper) => (b.year ?? -Infinity) - (a.year ?? -Infinity);

const BTN =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:min-h-10";

function EmptyBox({
  title,
  children,
  actions,
  align = "center",
}: {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "rounded-2xl border border-dashed border-border p-8 text-center lg:p-14"
          : "rounded-2xl border border-dashed border-border p-6 lg:p-10"
      }
    >
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      {children && (
        <div
          className={
            align === "center"
              ? "mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground"
              : "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground"
          }
        >
          {children}
        </div>
      )}
      {actions && (
        <div
          className={
            align === "center"
              ? "mt-6 flex flex-wrap items-center justify-center gap-3"
              : "mt-6 flex flex-wrap items-center gap-3"
          }
        >
          {actions}
        </div>
      )}
    </div>
  );
}

export function ModelPapersSection({ data }: { data: SubjectData }) {
  const { f, reset } = useFilters();
  const { meta } = data;
  const c = meta.colorVar;

  const papers = data.papers.filter((p) => p.access !== "dead");
  const answerSets = papers.filter(isAnswerSet);
  const cardPapers = papers.filter((p) => !isAnswerSet(p));
  const visible = cardPapers.filter((p) => matchPaper(p, f)).sort(byYearDesc);
  const topicNames = Object.fromEntries(data.topics.map((t) => [t.id, t.name]));

  const levelFilterOn = f.level !== "all";
  const filtered = f.topic !== "" || levelFilterOn || f.type !== "" || f.q !== "" || f.nepal || f.sol;
  const chosenMeta = levelFilterOn ? meta.levels[f.level as Level] : null;

  const groups = LEVEL_ORDER.map((lv) => ({
    lv,
    items: visible.filter((p) => p.levels.includes(lv)),
  })).filter((g) => g.items.length > 0);

  const nearest = (() => {
    if (!levelFilterOn) return null;
    const idx = LEVEL_ORDER.indexOf(f.level as Level);
    for (const step of [1, -1, 2, -2, 3, -3]) {
      const lv = LEVEL_ORDER[idx + step];
      if (lv && meta.levels[lv].exists && cardPapers.some((p) => p.levels.includes(lv))) return lv;
    }
    return null;
  })();

  const answersVisible = answerSets.filter(
    (a) => !levelFilterOn || a.levels.includes(f.level as Level)
  );

  const clearBtn = (
    <button onClick={reset} className={BTN}>
      Clear filters
    </button>
  );
  const requestBtn = (
    <a href={mailto(`Paper request for ${meta.name}`)} className={BTN}>
      Request a paper
    </a>
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
            <PaperCard key={p.id} p={p} meta={meta} topicNames={topicNames} />
          ))}
        </div>
      </div>
    ));
  };

  let body: ReactNode;
  if (papers.length === 0) {
    body = (
      <EmptyBox
        title="No past papers published yet"
        actions={
          <>
            <button onClick={() => scrollToId("library")} className={BTN}>
              Browse study materials
            </button>
            {requestBtn}
          </>
        }
      >
        Papers appear here once each one has been opened, checked and cleared for publication. Know a
        paper that should be listed? Send it our way.
      </EmptyBox>
    );
  } else if (filtered && visible.length === 0 && chosenMeta && !chosenMeta.exists) {
    body = (
      <EmptyBox
        align="left"
        title={`No official ${chosenMeta.label} round`}
        actions={clearBtn}
      >
        {chosenMeta.honestNote}
        {nearest && (
          <div className="mt-6 text-foreground">
            <p className="text-sm font-semibold">Here&apos;s the closest level instead:</p>
            <div className="mt-3 space-y-3 text-left">
              {cardPapers
                .filter((p) => p.levels.includes(nearest))
                .sort(byYearDesc)
                .slice(0, 2)
                .map((p) => (
                  <PaperCard key={p.id} p={p} meta={meta} topicNames={topicNames} />
                ))}
            </div>
          </div>
        )}
      </EmptyBox>
    );
  } else if (filtered && visible.length === 0 && levelFilterOn) {
    body = (
      <EmptyBox
        title="No past papers are publicly available for this level"
        actions={
          <>
            {clearBtn}
            {requestBtn}
          </>
        }
      >
        You can request them from {meta.organiser.name} — we&apos;re asking too.
      </EmptyBox>
    );
  } else if (filtered && visible.length === 0) {
    body = (
      <EmptyBox
        title="No papers match these filters"
        actions={
          <>
            {clearBtn}
            {requestBtn}
          </>
        }
      />
    );
  } else if (levelFilterOn) {
    body = <div className="space-y-6">{renderYearGroups(visible)}</div>;
  } else {
    body = (
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
    );
  }

  return (
    <section id="papers" aria-labelledby="papers-title" className="section-anchor py-16 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionHeading
          index="02"
          label="Past Papers"
          title="Simulate the real thing"
          titleId="papers-title"
          description={
            f.topic
              ? `Papers matching ${topicNames[f.topic] ?? "the selected topic"}.`
              : "Real competition papers, grouped by round and year. Print one and sit it like the real exam."
          }
          colorVar={c}
        />

        {body}

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
                <AnswerSetCard key={a.id} p={a} meta={meta} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
