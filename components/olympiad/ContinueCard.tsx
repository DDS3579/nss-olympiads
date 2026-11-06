"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { onStrong, strong } from "@/lib/color";
import { actions, useProgress } from "@/lib/progress/store";
import type { SubjectData } from "@/lib/types";

function relativeTime(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

/** Inline, never fixed-position (U-12). Lives at the top of #start;
 *  T6.1/T6.2 will reuse it on the homepage and /olympiads. */
export function ContinueCard({ data }: { data: SubjectData }) {
  const { meta } = data;
  const prog = useProgress(meta.slug);
  const last = prog.recent[0] ?? null;
  const [timeLabel, setTimeLabel] = useState<string | null>(null); // client-only → no hydration mismatch
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!last) return;
    setTimeLabel(relativeTime(last.at));
    const id = setInterval(() => setTimeLabel(relativeTime(last.at)), 60_000);
    return () => clearInterval(id);
  }, [last]);

  const rec = last
    ? data.resources.find((r) => r.id === last.id) ??
      data.papers.find((p) => p.id === last.id) ??
      null
    : null;
  const kindLabel = rec ? ("files" in rec ? "Paper" : "Material") : "Item";
  const openHref = rec ? ("files" in rec ? rec.files[0]?.url : rec.url) : undefined;

  const hasAnything =
    prog.recent.length > 0 ||
    prog.done.length > 0 ||
    prog.saved.length > 0 ||
    prog.tracked.length > 0 ||
    Object.keys(prog.paper).length > 0;

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-4 lg:p-5">
      {last ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Continue where you left off
              </p>
              <p className="mt-1 truncate font-heading font-bold text-foreground">{last.title}</p>
              <p className="text-xs text-muted-foreground">
                {kindLabel}
                {timeLabel ? ` · Last opened ${timeLabel}` : ""}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              {openHref && (
                <a
                  href={openHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold transition-all hover:brightness-110"
                  style={{ background: strong(meta.colorVar), color: onStrong }}
                >
                  Open ↗<span className="sr-only">(opens in new tab)</span>
                </a>
              )}
              {hasAnything && !confirming && (
                <button
                  onClick={() => setConfirming(true)}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
                </button>
              )}
            </div>
          </div>
          {confirming && (
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs">
              <span className="text-muted-foreground">
                Reset all {meta.name} progress stored in this browser?
              </span>
              <button
                onClick={() => {
                  actions.reset(meta.slug);
                  setConfirming(false);
                }}
                className="rounded-full bg-destructive px-3 py-1.5 font-semibold text-destructive-foreground"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded-full border border-border bg-background px-3 py-1.5 font-semibold text-foreground hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          <b className="font-semibold text-foreground">New here?</b> Pick your level below, then open your
          first material. Your progress is saved only in this browser.
        </p>
      )}
    </div>
  );
}
