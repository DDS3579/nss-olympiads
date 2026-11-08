"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { mailto } from "@/lib/site-config";
import { loadRecent, pushRecent, searchItems, type SearchItem } from "@/lib/search";
import { ResultRow } from "./ResultRow";

export function SearchPageClient() {
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [ready, setReady] = useState(false); // hold off URL writes until ?q= has been read

  useEffect(() => {
    try {
      setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    } catch {}
    setReady(true);
    setRecent(loadRecent());
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setItems(Array.isArray(d) ? (d as SearchItem[]) : []))
      .catch(() => setItems([]));
  }, []);

  const results = useMemo(() => (items ? searchItems(items, q) : []), [items, q]);
  useEffect(() => setSel(0), [q]);

  // Shareable ?q= links without history spam
  useEffect(() => {
    if (!ready) return;
    const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
    window.history.replaceState(null, "", url);
  }, [q, ready]);

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, Math.max(0, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector<HTMLAnchorElement>(`[data-search-row="${sel}"]`)?.click();
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 lg:pt-32">
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
        Search
      </p>
      <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Find your next resource
      </h1>
      <p className="mt-2 text-muted-foreground">
        Topics, materials and papers across all 7 Olympiads.
      </p>

      <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 transition-shadow focus-within:ring-2 focus-within:ring-[hsl(var(--ring))]">
        <Search aria-hidden className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onInputKey}
          placeholder='Try "optics", "Kepler" or "Kalda"…'
          aria-label="Search all subjects"
          className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-6">
        {items === null ? (
          <p className="py-10 text-center text-sm text-muted-foreground">Loading search index…</p>
        ) : q.trim() === "" ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Type to search — results appear as you type.
          </p>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
            <p className="font-heading text-lg font-semibold text-foreground">
              No match for “{q.trim()}”
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Try a subject name or topic — or{" "}
              <a href={mailto(`Search request: ${q.trim()}`)} className="underline underline-offset-2">
                ask us to add it
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="mb-2 text-xs text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <div className="space-y-1">
              {results.map((r, i) => (
                <div key={`${r.id}-${i}`}>
                  {(i === 0 || results[i - 1].s !== r.s) && (
                    <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {r.sn}
                    </p>
                  )}
                  <ResultRow
                    r={r}
                    q={q}
                    selected={sel === i}
                    index={i}
                    onNavigate={() => setRecent(pushRecent(q, recent))}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
