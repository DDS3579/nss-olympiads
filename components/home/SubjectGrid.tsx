"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { gradesOverlap } from "@/lib/grades";
import { SubjectCard } from "./SubjectCard";
import type { SubjectIndexItem } from "@/lib/types";

const FILTERS = [
  { id: "all", label: "All grades", lo: 0, hi: 99 },
  { id: "8-10", label: "Grades 8–10", lo: 8, hi: 10 },
  { id: "11-12", label: "Grades 11–12", lo: 11, hi: 12 },
] as const;

export function SubjectGrid({ subjects }: { subjects: SubjectIndexItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const active = FILTERS.find((f) => f.id === filter)!;
  const shown = subjects.filter((s) => gradesOverlap(s.grades, active.lo, active.hi));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by grade">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors sm:min-h-10",
              filter === f.id
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-secondary"
            )}
          >
            {f.label}
          </button>
        ))}
        <span role="status" aria-live="polite" className="ml-1 text-sm text-muted-foreground">
          Showing {shown.length} of {subjects.length}
        </span>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug} className="list-none">
            <SubjectCard s={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
