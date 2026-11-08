"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  CheckCircle2,
  CircleDashed,
  CircleSlash,
  Printer,
  SearchX,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { strong } from "@/lib/color";
import { SectionHeading, scrollToId } from "./primitives";
import { LevelChip } from "@/components/system/LevelChip";
import { useFilters } from "./UrlStateProvider";
import type { Level, SubjectData, SyllabusSection as SyllabusSectionData } from "@/lib/types";

const NEB_BADGE: Record<
  "full" | "partial" | "none" | "unknown",
  { label: string; Icon: typeof CheckCircle2; cls: string }
> = {
  full: { label: "Fully covered at school", Icon: CheckCircle2, cls: "text-emerald-700 dark:text-emerald-400" },
  partial: { label: "Partly covered at school", Icon: CircleDashed, cls: "text-amber-700 dark:text-amber-400" },
  none: { label: "Not covered at school", Icon: CircleSlash, cls: "text-foreground" },
  unknown: { label: "Not yet mapped", Icon: SearchX, cls: "text-muted-foreground italic" },
};

const roundKey = (s: SyllabusSectionData) => (Array.isArray(s.round) ? s.round.join("+") : s.round);

function SectionRow({ s, data }: { s: SyllabusSectionData; data: SubjectData }) {
  const { set } = useFilters();
  const c = data.meta.colorVar;
  const levels = (Array.isArray(s.round) ? s.round : [s.round]) as Level[];
  const neb = NEB_BADGE[s.nebCoverage ?? "unknown"];
  const NebIcon = neb.Icon;
  const checkKey = (i: number) => `sy:${s.id}:${i}`;

  return (
    <details className="group border-b border-border">
      <summary className="grid cursor-pointer list-none grid-cols-1 gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-secondary/40 md:grid-cols-[2.1fr_1.4fr_0.7fr_1.3fr_1.3fr] md:items-center">
        <span className="font-heading font-bold text-foreground">{s.name}</span>
        <span className="flex flex-wrap gap-1">
          {levels.map((lv) => (
            <LevelChip key={lv} level={lv} label={data.meta.levels[lv].label} colorVar={c} />
          ))}
        </span>
        <span className="text-sm">
          {s.officialWeight != null ? (
            <span className="flex items-center gap-2">
              <span className="font-semibold tabular-nums text-foreground">{s.officialWeight}%</span>
              <span className="h-1 w-14 overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${Math.min(100, s.officialWeight * 4)}%`, background: strong(c) }}
                />
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground" title="No official weight published">
              —
            </span>
          )}
        </span>
        <span className={`flex items-center gap-1.5 text-xs font-medium ${neb.cls}`}>
          <NebIcon aria-hidden className="h-3.5 w-3.5 flex-shrink-0" />
          {neb.label}
        </span>
        <span>
          {s.nepalMaterialExists ? (
            <span className="text-xs font-medium text-foreground">🇳🇵 Nepali material exists</span>
          ) : s.topicId ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                set({ topic: s.topicId! }, "push");
                scrollToId("library");
              }}
              className="text-xs font-semibold text-amber-700 underline-offset-2 hover:underline dark:text-amber-400"
            >
              ⚠ No Nepali material — start here →
            </button>
          ) : (
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
              ⚠ No Nepali material yet
            </span>
          )}
        </span>
      </summary>

      <div className="px-2 pb-5 md:pr-8">
        {s.nebNote && (
          <p className="mb-3 rounded-lg bg-secondary/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            {s.nebNote}
          </p>
        )}
        {s.items.length > 0 && (
          <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {s.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                <input
                  type="checkbox"
                  id={checkKey(i)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[hsl(var(--primary))]"
                />
                <label htmlFor={checkKey(i)} className="min-w-0 leading-snug">
                  {item}
                </label>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          Source:{" "}
          <a
            href={s.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {s.source.label} ↗
          </a>
        </p>
      </div>
    </details>
  );
}

export function SyllabusSection({ data }: { data: SubjectData }) {
  const { f, set } = useFilters();
  const c = data.meta.colorVar;
  const { meta } = data;
  const sm = meta.syllabusMeta;
  const syllabus = data.syllabus;

  const levelFilterOn = f.level !== "all";
  const visible = syllabus.filter(
    (s) =>
      !levelFilterOn ||
      (Array.isArray(s.round) ? s.round.includes(f.level as Level) : s.round === f.level)
  );

  const groups: [string, SyllabusSectionData[]][] = [];
  for (const s of visible) {
    const k = roundKey(s);
    const g = groups.find(([key]) => key === k);
    if (g) g[1].push(s);
    else groups.push([k, [s]]);
  }

  const groupLabel = (k: string) =>
    k
      .split("+")
      .map((lv) => meta.levels[lv as Level]?.label ?? lv)
      .join(" + ");

  return (
    <section id="syllabus" aria-labelledby="syllabus-title" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          label="Syllabus"
          title={sm?.officialVerified ? "Official syllabus" : "Topic areas"}
          titleId="syllabus-title"
          description={`What is examined in the ${meta.name} Olympiad, round by round. Tick items as you revise, or print this page as a checklist (ticks are not saved).`}
          colorVar={c}
        />

        {!sm?.officialVerified && syllabus.length > 0 && (
          <p className="-mt-6 mb-6 inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-muted-foreground lg:-mt-10 lg:mb-8">
            Draft taxonomy — official transcription in progress
          </p>
        )}

        {/* Chemistry: Level-1/2/3 strip */}
        {sm?.levelCounts && sm.levelCounts.L1 != null && (
          <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">IChO syllabus depth:</span> Level 1 ={" "}
            {sm.levelCounts.L1} entries · Level 2 = {sm.levelCounts.L2} · Level 3 ={" "}
            {sm.levelCounts.L3}
            <span className="mt-1 block text-xs">
              Level 3 topics can appear only if they occur in that year&apos;s preparatory problems.
            </span>
          </div>
        )}

        {/* Informatics: IOI category strip */}
        {sm?.levelCounts && sm.levelCounts.included != null && (
          <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">IOI Syllabus 2025:</span>{" "}
            {sm.levelCounts.included} included · {sm.levelCounts.excluded} excluded ·{" "}
            {sm.levelCounts.outsideOfFocus} outside-of-focus
            <span className="mt-1 block text-xs">
              NOI adopts the IOI syllabus — topics from earlier rounds are prerequisites for later
              rounds.
            </span>
          </div>
        )}

        {/* Biology: whose weights these are */}
        {sm?.weightSource && (
          <p className="mb-6 text-xs text-muted-foreground">
            Weights are the {sm.weightSource.label.split("§")[0].trim()}&apos;s own (§
            {sm.weightSource.label.split("§")[1] ?? ""}) —{" "}
            <a
              href={sm.weightSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              source ↗
            </a>
          </p>
        )}

        {/* Download + print + under-review note */}
        <div className="mb-8 flex flex-wrap items-center gap-3" data-no-print>
          <a
            href={meta.syllabusFileUrl}
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-all hover:brightness-110"
            style={{ background: strong(c), color: "hsl(var(--on-strong))" }}
          >
            <ArrowDownToLine className="h-4 w-4" /> Download syllabus PDF
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Printer className="h-4 w-4" /> Print checklist
          </button>
          {sm?.pdfUnderReview && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              <AlertTriangle aria-hidden className="h-3.5 w-3.5" /> Syllabus PDF is being re-checked
            </span>
          )}
        </div>

        {syllabus.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">Syllabus coming soon</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              The official {meta.name} syllabus is being transcribed and verified. Meanwhile, explore
              the topic map below.
            </p>
            <button
              onClick={() => scrollToId("topics")}
              className="mt-6 inline-flex min-h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Explore Topics
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              No official syllabus is published for this level
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {meta.organiser.name} has not released one — see Start Here for what this round is known
              to test.
            </p>
            <button
              onClick={() => set({ level: "all" }, "push")}
              className="mt-6 inline-flex min-h-10 items-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Show all levels
            </button>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[2.1fr_1.4fr_0.7fr_1.3fr_1.3fr] gap-3 border-b border-border px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:grid">
              <span>Section</span>
              <span>Round(s)</span>
              <span>Weight</span>
              <span>At school (NEB)</span>
              <span>Nepali material</span>
            </div>
            {groups.map(([key, items]) => (
              <FadeIn key={key}>
                <div>
                  {!levelFilterOn && groups.length > 1 && (
                    <h3 className="mb-1 mt-6 font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                      {groupLabel(key)}
                    </h3>
                  )}
                  {items.map((s) => (
                    <SectionRow key={s.id} s={s} data={data} />
                  ))}
                </div>
              </FadeIn>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
