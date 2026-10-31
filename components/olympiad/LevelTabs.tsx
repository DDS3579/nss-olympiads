"use client";

import type { KeyboardEvent } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { onStrong, strong } from "@/lib/color";
import { persistLevel } from "@/lib/url-state";
import { useFilters } from "./UrlStateProvider";
import type { Level, SubjectMeta } from "@/lib/types";

const ORDER: ("all" | Level)[] = ["all", "district", "province", "national", "international"];

export function LevelTabs({
  meta,
  counts,
  colorVar,
}: {
  meta: SubjectMeta;
  counts: Record<string, number>;
  colorVar: string;
}) {
  const { f, set } = useFilters();
  const chosen = (ORDER as string[]).includes(f.level) ? f.level : "all";

  const select = (level: string) => {
    set({ level }, "push");
    persistLevel(meta.slug, level);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = ORDER.indexOf(chosen as "all" | Level);
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(idx + 1, ORDER.length - 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(idx - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ORDER.length - 1;
    else return;
    e.preventDefault();
    select(ORDER[next]);
    document.getElementById(`level-tab-${ORDER[next]}`)?.focus();
  };

  const chosenMeta = chosen !== "all" ? meta.levels[chosen as Level] : null;

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Exam level"
        onKeyDown={onKeyDown}
        className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-1"
      >
        {ORDER.map((k) => {
          const L = k === "all" ? null : meta.levels[k];
          const missing = L != null && !L.exists;
          const sel = chosen === k;
          return (
            <button
              key={k}
              id={`level-tab-${k}`}
              role="radio"
              aria-checked={sel}
              tabIndex={sel ? 0 : -1}
              onClick={() => select(k)}
              className={cn(
                "inline-flex min-h-11 snap-start items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                missing && "border-dashed",
                sel ? "border-transparent" : "border-border bg-background hover:bg-secondary"
              )}
              style={sel ? { background: strong(colorVar), color: onStrong } : undefined}
            >
              {missing && <Info className="h-3.5 w-3.5" aria-hidden />}
              {k === "all" ? "All levels" : meta.levels[k].label}
              <span className={cn("text-xs tabular-nums", sel ? "opacity-80" : "text-muted-foreground")}>
                {counts[k] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {chosenMeta && !chosenMeta.exists && chosenMeta.honestNote && (
        <p
          role="note"
          className="mt-3 rounded-xl border border-dashed border-border bg-secondary/40 p-3 text-sm leading-relaxed text-muted-foreground"
        >
          <b className="font-semibold text-foreground">Why “{chosenMeta.label}”?</b> {chosenMeta.honestNote}
        </p>
      )}
    </div>
  );
}
