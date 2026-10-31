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
import { actions, useProgress } from "@/lib/progress/store";
import { useOlympiadProgress } from "./context"; // dual-write until T5.2
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
  onOpen,
}: {
  file: Paper["files"][number];
  colorVar: string;
  primary?: boolean;
  onOpen?: () => void;
}) {
  const Icon = FILE_ICONS[file.kind] ?? FileText;
  const hosted = file.url.startsWith("/");
  return (
    <span className="inline-flex items-center gap-1.5">
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onOpen}
        className={
          primary
            ? "inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold transition-all hover:brightness-110"
            : "inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" />
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
  const prog = useProgress(meta.slug);
  const legacy = useOlympiadProgress(); // dual-write until T5.2
  const st = prog.paper[p.id];
  const bestScore = st?.attempts
    .map((a) => a.score)
    .filter((s): s is number => s != null)
    .sort((a, b) => b - a)[0];

  const qFile = p.files.find((f) => f.kind === "questions") ?? p.files[0];
  const otherFiles = p.files.filter((f) => f !== qFile);

  const fmtChips: string[] = [];
  if (p.format.duration) fmtChips.push(p.format.duration);
  if (p.format.marks != null) fmtChips.push(`${p.format.marks} marks`);
  if (p.format.questions) fmtChips.push(p.format.questions);
  if (p.format.calculator) fmtChips.push(`${p.format.calculator} calculator`);
  if (p.format.negativeMarking === false) fmtChips.push("No negative marking");
  else if (typeof p.format.negativeMarking === "string" && p.format.negativeMarking)
    fmtChips.push(p.format.negativeMarking);

  const openQuestions = () => {
    actions.opened(meta.slug, p.id, p.title);
    legacy.markPaperAccessed(p.title, p.title); // keeps NextStep/percent alive until T5.2
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-start justify-between gap-4">
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
            {st && (
              <Badge>
                {st.status === "reviewed" ? "Reviewed" : "Attempted"}
                {bestScore != null && p.format.marks != null ? ` · ${bestScore}/${p.format.marks}` : ""}
              </Badge>
            )}
          </div>

          <h3 className="mt-2 font-heading text-lg font-bold text-foreground">{p.title}</h3>

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

        {/* files: one button each; 2×2 grid for paper sets (EuPhO-style, T4.7) */}
        <div className={p.files.length >= 4 ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}>
          <FileButton file={qFile} primary colorVar={c} onOpen={openQuestions} />
          {otherFiles.map((file) => (
            <FileButton key={file.url} file={file} colorVar={c} />
          ))}
        </div>
      </div>

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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <VerifiedBadge verified={p.verified} />
        {p.topics.filter((t) => topicNames[t]).length > 0 && (
          <span className="text-xs text-muted-foreground">
            Topics: {p.topics.map((t) => topicNames[t]).filter(Boolean).join(", ")}
          </span>
        )}
      </div>
    </article>
  );
}

/** Soft-gated answers record (Q3 default): reachable, never styled as a paper. */
export function AnswerSetCard({
  p,
  meta,
  open,
  onReveal,
}: {
  p: Paper;
  meta: SubjectMeta;
  open: boolean;
  onReveal: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FileCheck className="h-5 w-5" style={{ color: strong(meta.colorVar) }} aria-hidden />
          <div>
            <h4 className="font-heading font-semibold text-foreground">{p.title}</h4>
            {!open && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Hidden until you attempt a paper — or show it anyway.
              </p>
            )}
          </div>
        </div>
        {open ? (
          <div className="flex flex-wrap gap-2">
            {p.files.map((file) => (
              <FileButton key={file.url} file={file} colorVar={meta.colorVar} />
            ))}
          </div>
        ) : (
          <button
            onClick={onReveal}
            className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Show anyway
          </button>
        )}
      </div>
    </div>
  );
}
