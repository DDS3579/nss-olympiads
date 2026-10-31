"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { onStrong, strong } from "@/lib/color";
import { isAnswerSet, matchPaper, matchResource } from "@/lib/filter";
import { persistLevel } from "@/lib/url-state";
import { useFilters } from "./UrlStateProvider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Level, SubjectData } from "@/lib/types";

const LEVEL_KEYS: Level[] = ["district", "province", "national", "international"];

const TYPE_OPTIONS = [
  { value: "", label: "Any type" },
  { value: "book", label: "Books" },
  { value: "handout", label: "Handouts" },
  { value: "course", label: "Courses" },
  { value: "video", label: "Videos" },
  { value: "tool", label: "Tools" },
  { value: "dataset", label: "Datasets" },
  { value: "official", label: "Official docs" },
  { value: "problemset", label: "Problem sets" },
  { value: "mock", label: "Mock exams" },
  { value: "pastpaper", label: "Past papers" },
];

const selectCls =
  "h-10 rounded-full border border-border bg-background px-3 text-sm text-foreground transition-colors hover:bg-secondary";

function FilterControls({
  data,
  searchRef,
  wide,
}: {
  data: SubjectData;
  searchRef?: RefObject<HTMLInputElement | null>;
  wide?: boolean;
}) {
  const { f, set, reset, active } = useFilters();
  const c = data.meta.colorVar;

  // Debounced search → URL (replace, 200 ms)
  const [qLocal, setQLocal] = useState(f.q);
  useEffect(() => {
    setQLocal(f.q);
  }, [f.q]);
  useEffect(() => {
    const t = setTimeout(() => {
      if (qLocal !== f.q) set({ q: qLocal }, "replace");
    }, 200);
    return () => clearTimeout(t);
  }, [qLocal, f.q, set]);

  return (
    <>
      {/* Search */}
      <div className="relative min-w-[200px] flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={searchRef}
          type="search"
          value={qLocal}
          onChange={(e) => setQLocal(e.target.value)}
          placeholder={`Search ${data.meta.name} materials & papers…`}
          aria-label={`Search ${data.meta.name} materials and papers`}
          className="h-10 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
        />
      </div>

      {/* Level */}
      <select
        aria-label="Exam level"
        value={f.level}
        onChange={(e) => {
          set({ level: e.target.value }, "push");
          persistLevel(data.meta.slug, e.target.value);
        }}
        className={cn(selectCls, wide ? "w-full" : "max-w-[220px]")}
      >
        <option value="all">All levels</option>
        {LEVEL_KEYS.map((k) => (
          <option key={k} value={k}>
            {data.meta.levels[k].label}
          </option>
        ))}
      </select>

      {/* Topic */}
      <select
        aria-label="Topic"
        value={f.topic}
        onChange={(e) => set({ topic: e.target.value }, "push")}
        className={cn(selectCls, wide ? "w-full" : "max-w-[220px]")}
      >
        <option value="">All topics</option>
        {data.topics.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        aria-label="Resource type"
        value={f.type}
        onChange={(e) => set({ type: e.target.value }, "push")}
        className={cn(selectCls, wide ? "w-full" : "max-w-[220px]")}
      >
        {TYPE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Nepal-specific */}
      <button
        onClick={() => set({ nepal: !f.nepal }, "push")}
        aria-pressed={f.nepal}
        className={cn(
          "inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-xs font-semibold transition-colors",
          f.nepal ? "border-transparent" : "border-border bg-background hover:bg-secondary"
        )}
        style={f.nepal ? { background: strong(c), color: onStrong } : undefined}
      >
        🇳🇵 Nepal-specific
      </button>

      {/* Has solutions */}
      <button
        onClick={() => set({ sol: !f.sol }, "push")}
        aria-pressed={f.sol}
        title="Applies to past papers"
        className={cn(
          "inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-xs font-semibold transition-colors",
          f.sol ? "border-transparent" : "border-border bg-background hover:bg-secondary"
        )}
        style={f.sol ? { background: strong(c), color: onStrong } : undefined}
      >
        Has solutions
        <span className="sr-only">(applies to past papers only)</span>
      </button>

      {/* Clear */}
      <button
        onClick={reset}
        disabled={active === 0}
        className={cn(
          "inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-border px-3.5 text-xs font-semibold transition-colors",
          active > 0
            ? "bg-background text-foreground hover:bg-secondary"
            : "cursor-not-allowed text-muted-foreground/60"
        )}
      >
        Clear filters{active > 0 ? ` (${active})` : ""}
      </button>
    </>
  );
}

export function FilterBar({ data }: { data: SubjectData }) {
  const { f, active } = useFilters();
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses the search box (T5.7 lands the full shortcut set)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)
      )
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const resTotal = useMemo(
    () => data.resources.filter((r) => r.access !== "dead").length,
    [data.resources]
  );
  // Answer-key records live in the soft-gated Answers block, not the paper list (T4.7)
  const papTotal = useMemo(
    () => data.papers.filter((p) => p.access !== "dead" && !isAnswerSet(p)).length,
    [data.papers]
  );
  const resVisible = useMemo(
    () => data.resources.filter((r) => r.access !== "dead" && matchResource(r, f)).length,
    [data.resources, f]
  );
  const papVisible = useMemo(
    () => data.papers.filter((p) => p.access !== "dead" && !isAnswerSet(p) && matchPaper(p, f)).length,
    [data.papers, f]
  );

  // Announce result counts to screen readers (#sr-status lives in the layout, T3.6)
  useEffect(() => {
    const el = document.getElementById("sr-status");
    if (el)
      el.textContent = `Showing ${resVisible} of ${resTotal} resources · ${papVisible} of ${papTotal} papers`;
  }, [resVisible, resTotal, papVisible, papTotal]);

  return (
    <div
      data-no-print
      className="sticky z-30 border-b border-border bg-background/95 backdrop-blur-md"
      style={{ top: "calc(var(--nav-offset) + var(--subnav-h))" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-3">
        {/* Desktop: one wrapping row */}
        <div className="hidden flex-wrap items-center gap-2.5 md:flex">
          <FilterControls data={data} searchRef={searchRef} />
        </div>

        {/* Mobile: Filters button → bottom sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                <SlidersHorizontal aria-hidden className="h-4 w-4" />
                Filters{active > 0 ? ` (${active})` : ""}
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
              <SheetHeader>
                <SheetTitle className="text-left font-heading">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                <FilterControls data={data} wide />
              </div>
              <SheetClose asChild>
                <button
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-all hover:brightness-110"
                  style={{ background: strong(data.meta.colorVar), color: onStrong }}
                >
                  Show {resVisible} {resVisible === 1 ? "resource" : "resources"} · {papVisible}{" "}
                  {papVisible === 1 ? "paper" : "papers"}
                </button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        {/* Result line — visible twin of the #sr-status announcement */}
        <p className="mt-2 text-xs text-muted-foreground">
          Showing {resVisible} of {resTotal} resources · {papVisible} of {papTotal} papers
        </p>
      </div>
    </div>
  );
}
