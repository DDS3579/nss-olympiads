"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { mailto } from "@/lib/site-config";
import {
  loadRecent,
  pushRecent,
  searchItems,
  type SearchItem,
} from "@/lib/search";
import { ResultRow } from "./ResultRow";

export function SearchPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [items, setItems] = useState<SearchItem[] | null>(null); // null = not fetched yet
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [sel, setSel] = useState(0);

  // Lazy-fetch the index on first open only
  useEffect(() => {
    if (!open || items !== null) return;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setItems(Array.isArray(d) ? (d as SearchItem[]) : []))
      .catch(() => setItems([]));
  }, [open, items]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setSel(0);
    setRecent(loadRecent());
  }, [open]);

  // Global shortcuts: Ctrl/⌘+K anywhere · "/" only where FilterBar doesn't own it
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(true);
        return;
      }
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        if (
          t &&
          (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)
        )
          return;
        // Subject pages: the FilterBar search box owns "/" — but only when it is
        // actually on screen (below md it lives in the hidden desktop row).
        const filterInput = document.querySelector<HTMLElement>("[data-filter-search]");
        if (filterInput && filterInput.getBoundingClientRect().width > 0) return;
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  const results = useMemo(() => (items ? searchItems(items, q) : []), [items, q]);
  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    document.querySelector(`[data-search-row="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const activate = (index: number) => {
    if (q.trim() === "") {
      const term = recent[index];
      if (term) setQ(term);
      return;
    }
    const el = document.querySelector<HTMLAnchorElement>(`[data-search-row="${index}"]`);
    if (el) {
      setRecent(pushRecent(q, recent));
      onOpenChange(false);
      el.click();
    }
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const max = (q.trim() === "" ? recent.length : results.length) - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, Math.max(0, max)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      activate(sel);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="top-[12%] max-w-xl -translate-y-0 gap-0 p-0"
        aria-label="Search"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          document.getElementById("palette-search-input")?.focus();
        }}
      >
        <DialogTitle className="sr-only">Search materials, papers and topics</DialogTitle>

        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search aria-hidden className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <input
            id="palette-search-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search all 7 Olympiads — topics, materials, papers…"
            aria-label="Search all subjects"
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">
            esc
          </kbd>
        </div>

        <div data-lenis-prevent className="max-h-[55vh] overflow-y-auto p-2">
          {q.trim() === "" ? (
            recent.length > 0 ? (
              <>
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Recent
                </p>
                {recent.map((term, i) => (
                  <button
                    key={term}
                    data-search-row={i}
                    onClick={() => setQ(term)}
                    className={cn(
                      "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm text-foreground transition-colors",
                      sel === i ? "bg-secondary" : "hover:bg-secondary/60"
                    )}
                  >
                    {term}
                  </button>
                ))}
              </>
            ) : (
              <p className="px-3 py-10 text-center text-sm text-muted-foreground">
                Search topics, materials and papers across all 7 Olympiads. Try “optics”, “Kepler” or
                “Kalda”.
              </p>
            )
          ) : items === null ? (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">Loading search index…</p>
          ) : results.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <p className="text-sm font-medium text-foreground">No match for “{q.trim()}”</p>
              <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
                Try a subject name or topic — or{" "}
                <a href={mailto(`Search request: ${q.trim()}`)} className="underline underline-offset-2">
                  ask us to add it
                </a>
                .
              </p>
            </div>
          ) : (
            results.map((r, i) => (
              <div key={`${r.id}-${i}`}>
                {(i === 0 || results[i - 1].s !== r.s) && (
                  <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {r.sn}
                  </p>
                )}
                <ResultRow
                  r={r}
                  q={q}
                  selected={sel === i}
                  index={i}
                  onNavigate={() => {
                    setRecent(pushRecent(q, recent));
                    onOpenChange(false);
                  }}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span>↑↓ navigate · ↵ open · esc close</span>
          {q.trim() !== "" && results.length > 0 && <span>{results.length} results</span>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
