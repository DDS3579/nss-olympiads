"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
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
import { cn } from "@/lib/utils";
import { mailto } from "@/lib/site-config";
import { useFilters } from "./UrlStateProvider";
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
  "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all hover:brightness-110 sm:min-h-10 sm:flex-none sm:text-xs";
const ICON_BTN =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-10 sm:w-10";

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
  const [flash, setFlash] = useState(false);

  const hosted = r.url.startsWith("/");
  const Icon = TYPE_ICONS[r.type] ?? FileText;

  // Deep link from search: /olympiads/<slug>?hl=<id>#library
  useEffect(() => {
    const hl = new URLSearchParams(window.location.search).get("hl");
    if (hl !== r.id) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => {
      document
        .getElementById(`res-${r.id}`)
        ?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      setFlash(true);
    }, 450);
    const t2 = setTimeout(() => setFlash(false), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [r.id]);

  const reportHref = mailto(
    `Broken/incorrect link: ${r.id}`,
    `Subject: ${meta.slug}\nResource: ${r.title}\nURL: ${r.url}\nWhat's wrong: `
  );

  const primaryStyle = { background: strong(c), color: "hsl(var(--on-strong))" };

  return (
    <article
      id={`res-${r.id}`}
      className={cn(
        "section-anchor rounded-2xl border bg-card p-4 transition-all sm:p-5",
        flash ? "border-transparent ring-2" : "border-border hover:border-primary/40"
      )}
      style={flash ? ({ ["--tw-ring-color" as string]: strong(c) } as CSSProperties) : undefined}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        {/* icon · title · badges */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `hsl(var(${c}) / 0.1)` }}
          >
            <Icon aria-hidden className="h-5 w-5" style={{ color: strong(c) }} />
          </div>
          <div className="min-w-0">
            <h3
              className="line-clamp-3 font-heading font-semibold leading-snug text-foreground sm:line-clamp-2"
              title={r.title}
            >
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

        {/* primary action by kind */}
        <div className="flex w-full flex-shrink-0 items-center gap-1.5 sm:w-auto">
          {r.kind === "page" && !hosted ? (
            <Link href={r.url} className={PRIMARY_BTN} style={primaryStyle}>
              Read
            </Link>
          ) : (
            <>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className={PRIMARY_BTN}
                style={primaryStyle}
              >
                {hosted ? "View PDF" : "Open"}
                {!hosted && <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />}
                {!hosted && <span className="sr-only">(opens in new tab)</span>}
              </a>
              {hosted && (
                <a href={r.url} download aria-label={`Download ${r.title}`} className={ICON_BTN}>
                  <ArrowDownToLine aria-hidden className="h-4 w-4" />
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

      {r.topics.some((t) => topicNames[t]) && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {r.topics
            .filter((t) => topicNames[t])
            .map((t) => (
              <button
                key={t}
                onClick={() => set({ topic: t }, "push")}
                className="inline-flex min-h-8 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
        <a
          href={reportHref}
          aria-label={`Report a problem with this link: ${r.title}`}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Flag aria-hidden className="h-3.5 w-3.5" /> Report
        </a>
      </div>
    </article>
  );
}
