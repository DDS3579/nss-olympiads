"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  FileCheck,
  FileText,
  FileX,
  ListChecks,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FileKind, Paper, SubjectMeta } from "@/lib/types";
import { strong } from "@/lib/color";
import { Badge, Chip } from "@/components/system/Chips";
import { LevelChip } from "@/components/system/LevelChip";
import { AccessNote } from "@/components/system/AccessNote";
import { VerifiedBadge } from "@/components/system/VerifiedBadge";

const FILE_ICONS: Record<FileKind, LucideIcon> = {
  questions: FileText,
  solutions: FileCheck,
  marking: ListChecks,
  "answer-sheet": ClipboardList,
  results: Trophy,
  syllabus: BookOpen,
};

function FileButton({
  file,
  colorVar,
  primary,
}: {
  file: Paper["files"][number];
  colorVar: string;
  primary?: boolean;
}) {
  const Icon = FILE_ICONS[file.kind] ?? FileText;
  const hosted = file.url.startsWith("/");
  return (
    <span className="inline-flex items-center gap-1.5">
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          primary
            ? "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all hover:brightness-110 sm:min-h-10 sm:text-xs"
            : "inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:min-h-10 sm:text-xs"
        }
        style={primary ? { background: strong(colorVar), color: "hsl(var(--on-strong))" } : undefined}
      >
        <Icon aria-hidden className="h-3.5 w-3.5" />
        {file.label}
        {!hosted && <ArrowUpRight aria-hidden className="h-3 w-3" />}
        {!hosted && <span className="sr-only">(opens in new tab)</span>}
      </a>
      {hosted && (
        <a
          href={file.url}
          download
          aria-label={`Download ${file.label}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary sm:h-10 sm:w-10"
        >
          <ArrowDownToLine aria-hidden className="h-3.5 w-3.5" />
        </a>
      )}
    </span>
  );
}

export function PaperCard({
  p,
  meta,
  topicNames,
}: {
  p: Paper;
  meta: SubjectMeta;
  topicNames: Record<string, string>;
}) {
  const c = meta.colorVar;
  const questionsFile = p.files.find((f) => f.kind === "questions") ?? p.files[0];
  const otherFiles = p.files.filter((f) => f !== questionsFile);

  const fmtChips: string[] = [];
  if (p.format.duration) fmtChips.push(p.format.duration);
  if (p.format.marks != null) fmtChips.push(`${p.format.marks} marks`);
  if (p.format.questions) fmtChips.push(p.format.questions);
  if (p.format.calculator) fmtChips.push(`${p.format.calculator} calculator`);
  if (p.format.negativeMarking === false) fmtChips.push("No negative marking");
  else if (typeof p.format.negativeMarking === "string" && p.format.negativeMarking)
    fmtChips.push(p.format.negativeMarking);

  const topicLine = p.topics.map((t) => topicNames[t]).filter(Boolean).join(", ");

  return (
    <article className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {p.year != null && (
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                style={{ background: `hsl(var(${c}) / 0.12)`, color: `hsl(var(${c}-strong))` }}
              >
                {p.year}
              </span>
            )}
            {p.levels.map((lv) => (
              <LevelChip key={lv} level={lv} label={meta.levels[lv].label} colorVar={c} />
            ))}
            {p.round && <Chip>{p.round}</Chip>}
            {p.nepalSpecific && <Badge>🇳🇵 Nepal-specific</Badge>}
          </div>

          <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground">
            {p.title}
          </h3>

          {fmtChips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fmtChips.map((x) => (
                <Chip key={x}>{x}</Chip>
              ))}
            </div>
          )}

          <div className="mt-2">
            {p.hasSolutions ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <FileCheck aria-hidden className="h-3 w-3" /> Official solutions
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                <FileX aria-hidden className="h-3 w-3" /> No official solutions
              </span>
            )}
          </div>
        </div>

        {questionsFile && (
          <div className="flex-shrink-0">
            <FileButton file={questionsFile} primary colorVar={c} />
          </div>
        )}
      </div>

      {otherFiles.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="w-full text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:w-auto">
            Also available
          </span>
          {otherFiles.map((file) => (
            <FileButton key={file.url} file={file} colorVar={c} />
          ))}
        </div>
      )}

      {p.access === "caveat" && <AccessNote note={p.accessNote} />}

      {(p.sourcesCited?.length ?? 0) > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Problems adapted from: {p.sourcesCited!.join(" · ")}
        </p>
      )}
      {(p.alsoContains?.length ?? 0) > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">
          Also contains: {p.alsoContains!.join(" · ")}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border pt-3">
        <VerifiedBadge verified={p.verified} />
        {topicLine && <span className="text-xs text-muted-foreground">Topics: {topicLine}</span>}
      </div>
    </article>
  );
}

/** A record whose files are all solutions (e.g. "Answers (all papers)"). Never styled as a paper. */
export function AnswerSetCard({ p, meta }: { p: Paper; meta: SubjectMeta }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileCheck
            aria-hidden
            className="h-5 w-5 flex-shrink-0"
            style={{ color: strong(meta.colorVar) }}
          />
          <h4 className="font-heading font-semibold text-foreground">{p.title}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.files.map((file) => (
            <FileButton key={file.url} file={file} colorVar={meta.colorVar} />
          ))}
        </div>
      </div>
    </div>
  );
}
