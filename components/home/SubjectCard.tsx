import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { SubjectIcon } from "@/lib/data/icons";
import { cn } from "@/lib/utils";
import type { Level, SubjectIndexItem } from "@/lib/types";

const ORDER: Level[] = ["district", "province", "national", "international"];

export function SubjectCard({ s }: { s: SubjectIndexItem }) {
  const { resources, papers } = s.counts;
  const hasLibrary = resources + papers > 0;
  const grades = s.grades ? (/^\d/.test(s.grades) ? `Grades ${s.grades}` : s.grades) : null;
  const strongCol = `hsl(var(${s.colorVar}-strong))`;

  return (
    <Link
      href={`/olympiads/${s.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--c)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ ["--c" as string]: `hsl(var(${s.colorVar}))` } as CSSProperties}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `hsl(var(${s.colorVar}))` }}
      />

      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
          style={{
            borderColor: `hsl(var(${s.colorVar}) / 0.25)`,
            background: `hsl(var(${s.colorVar}) / 0.08)`,
          }}
        >
          <SubjectIcon iconKey={s.iconKey} className="h-5 w-5" style={{ color: strongCol }} />
        </span>
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:text-foreground"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{s.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>

      <ul aria-label="Exam levels" className="mt-4 flex flex-wrap gap-1.5">
        {ORDER.map((k) => {
          const L = s.levels[k];
          return (
            <li key={k}>
              <span
                className={cn(
                  "inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  !L.exists && "border border-dashed border-border text-muted-foreground"
                )}
                style={
                  L.exists
                    ? { background: `hsl(var(${s.colorVar}-strong) / 0.12)`, color: strongCol }
                    : undefined
                }
                title={L.exists ? "Official round" : "No official round — see the subject page"}
              >
                {L.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-5 text-xs text-muted-foreground">
        <span>{grades ?? "Grades vary by round"}</span>
        <span className="font-medium">
          {hasLibrary
            ? `${resources} ${resources === 1 ? "resource" : "resources"} · ${papers} ${papers === 1 ? "paper" : "papers"}`
            : "Library being curated"}
        </span>
      </div>
    </Link>
  );
}
