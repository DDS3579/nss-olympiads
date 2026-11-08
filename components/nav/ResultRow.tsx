"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { itemHref, type SearchItem } from "@/lib/search";

const KIND_LABEL: Record<SearchItem["k"], string> = {
  resource: "Material",
  paper: "Paper",
  topic: "Topic",
};

const LEVEL_LABEL: Record<string, string> = {
  district: "District",
  province: "Province",
  national: "National",
  international: "International",
};

export function ResultRow({
  r,
  q,
  selected,
  index,
  onNavigate,
}: {
  r: SearchItem;
  q: string;
  selected: boolean;
  index: number;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={itemHref(r, q)}
      onClick={onNavigate}
      data-search-row={index}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
        selected ? "bg-secondary" : "hover:bg-secondary/60"
      )}
    >
      <span
        aria-hidden
        className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
        style={{ background: r.cv ? `hsl(var(${r.cv}))` : "hsl(var(--muted-foreground))" }}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{r.t}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {r.sn} · {KIND_LABEL[r.k]}
          {r.np ? " · 🇳🇵 Nepal-specific" : ""}
          {r.y != null ? ` · ${r.y}` : ""}
        </span>
      </span>
      {(r.lv ?? []).slice(0, 2).map((l) => (
        <span
          key={l}
          className="hidden flex-shrink-0 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-semibold text-muted-foreground sm:inline"
        >
          {LEVEL_LABEL[l] ?? l}
        </span>
      ))}
    </Link>
  );
}
