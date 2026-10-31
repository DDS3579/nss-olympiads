"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Check,
  Database,
  FileCheck,
  FileText,
  Flag,
  Landmark,
  ListChecks,
  Play,
  Timer,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { Resource, ResourceType, SubjectMeta } from "@/lib/types";
import { strong } from "@/lib/color";
import { mailto } from "@/lib/site-config";
import { actions, useProgress } from "@/lib/progress/store";
import { useFilters } from "./UrlStateProvider";
import { useOlympiadProgress } from "./context"; // dual-write until T5.2 retires it
import { Badge } from "@/components/system/Chips";
import { LevelChip } from "@/components/system/LevelChip";
import { AccessNote } from "@/components/system/AccessNote";
import { VerifiedBadge } from "@/components/system/VerifiedBadge";

const TYPE_ICONS: Record<ResourceType, LucideIcon> = {
  book: BookOpen,
  handout: FileText,
  course: Play,
  video: Play,
  tool: Wrench,
  dataset: Database,
  official: Landmark,
  problemset: ListChecks,
  mock: Timer,
  pastpaper: FileCheck,
};

const fmtSize = (b: number) =>
  b >= 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`;

const PRIMARY_BTN =
  "inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold transition-all hover:brightness-110";
const ICON_BTN =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

export function ResourceCard({
  r,
  meta,
  topicNames,
}: {
  r: Resource;
  meta: SubjectMeta;
  topicNames: Record<string, string>;
}) {
  const c = meta.colorVar;
  const { set } = useFilters();
  const prog = useProgress(meta.slug);
  const legacy = useOlympiadProgress(); // dual-write until T5.2
  const saved = prog.saved.includes(r.id);
  const done = prog.done.includes(r.id);

  const hosted = r.url.startsWith("/");
  const Icon = TYPE_ICONS[r.type] ?? FileText;

  const markOpened = () => {
    actions.opened(meta.slug, r.id, r.title);
    legacy.markResourceOpened(r.title, r.title); // keeps NextStep/percent alive until T5.2
  };

  const reportHref = mailto(
    `Broken/incorrect link: ${r.id}`,
    `Subject: ${meta.slug}\nResource: ${r.title}\nURL: ${r.url}\nWhat's wrong: `
  );

  return (
    <article
      id={`res-${r.id}`}
      className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-4">
        {/* icon · title · badges */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `hsl(var(${c}) / 0.1)` }}
          >
            <Icon className="h-5 w-5" style={{ color: strong(c) }} />
          </div>
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-heading font-semibold leading-snug text-foreground" title={r.title}>
              {r.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {r.highlight && <Badge>⭐ Recommended</Badge>}
              {r.nepalSpecific && <Badge>🇳🇵 Nepal-specific</Badge>}
              {r.type === "official" && <Badge>Official</Badge>}
              {r.levels.map((lv) => (
                <LevelChip key={lv} level={lv} label={meta.levels[lv].label} colorVar={c} />
              ))}
              {r.lang && r.lang !== "en" && (
                <Badge>
                  <span lang="ne">नेपाली</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* primary action by kind (B-13 rules) */}
        <div className="flex flex-shrink-0 items-center gap-1.5">
          {r.kind === "page" && !hosted ? (
            <Link
              href={r.url}
              onClick={markOpened}
              className={PRIMARY_BTN}
              style={{ background: strong(c), color: "hsl(var(--on-strong))" }}
            >
              Read
            </Link>
          ) : (
            <>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={markOpened}
                className={PRIMARY_BTN}
                style={{ background: strong(c), color: "hsl(var(--on-strong))" }}
              >
                {hosted ? "View PDF" : "Open"}
                {!hosted && <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />}
                {!hosted && <span className="sr-only">(opens in new tab)</span>}
              </a>
              {hosted && (
                <a href={r.url} download aria-label={`Download ${r.title}`} className={ICON_BTN}>
                  <ArrowDownToLine className="h-4 w-4" />
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {r.why && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.why}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        {r.author && <span>{r.author}</span>}
        {r.format && (
          <>
            {r.author && <span aria-hidden>·</span>}
            <span>{r.format}</span>
          </>
        )}
        {r.sizeBytes != null && (
          <>
            <span aria-hidden>·</span>
            <span>{fmtSize(r.sizeBytes)}</span>
          </>
        )}
        {r.licence && (
          <>
            <span aria-hidden>·</span>
            <span>{r.licence}</span>
          </>
        )}
        {r.origin !== "external" && (
          <>
            <span aria-hidden>·</span>
            <span>
              {r.origin === "nss-ai-assisted" && r.reviewedBy && r.reviewedAt
                ? `NSS original · AI-assisted · reviewed by ${r.reviewedBy} (${r.reviewedAt})`
                : "NSS original"}
            </span>
          </>
        )}
        {r.sizeBytes != null && r.sizeBytes > 15_000_000 && (
          <span className="font-semibold text-amber-700 dark:text-amber-400">
            · Large file — download on Wi-Fi
          </span>
        )}
      </div>

      {r.topics.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {r.topics
            .filter((t) => topicNames[t])
            .map((t) => (
              <button
                key={t}
                onClick={() => set({ topic: t }, "push")}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {topicNames[t]}
              </button>
            ))}
        </div>
      )}

      {r.access === "caveat" && <AccessNote note={r.accessNote} />}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <VerifiedBadge verified={r.verified} />
          {(r.extraLinks ?? []).map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              {l.label} ↗<span className="sr-only">(opens in new tab)</span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => actions.toggleSaved(meta.slug, r.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${r.title} from saved` : `Save ${r.title} for later`}
            className={ICON_BTN}
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4" style={{ color: strong(c) }} />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => actions.toggleDone(meta.slug, r.id)}
            aria-pressed={done}
            className={
              done
                ? "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-transparent px-3 text-xs font-semibold transition-colors"
                : "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            }
            style={done ? { background: strong(c), color: "hsl(var(--on-strong))" } : undefined}
          >
            <Check aria-hidden className="h-3.5 w-3.5" />
            {done ? "Done" : "Mark done"}
          </button>
          <a
            href={reportHref}
            aria-label={`Report a problem with this link: ${r.title}`}
            className={ICON_BTN}
          >
            <Flag className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
