import Link from "next/link";
import { SubjectIcon } from "@/lib/data/icons";
import type { SubjectIndexItem } from "@/lib/types";

/** Phones: all 7 Olympiads as swipeable, named, 44 px pills. */
export function SubjectChips({ subjects }: { subjects: SubjectIndexItem[] }) {
  return (
    <nav aria-label="Olympiads" className="relative z-10 mt-10 md:hidden">
      <p className="mb-3 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Pick your Olympiad
      </p>
      <ul className="no-scrollbar -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1">
        {subjects.map((s) => (
          <li key={s.slug} className="flex-shrink-0 snap-start">
            <Link
              href={`/olympiads/${s.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border bg-white/[0.04] px-4 text-sm font-medium text-foreground transition-colors active:bg-white/10"
              style={{ borderColor: `hsl(var(${s.colorVar}) / 0.4)` }}
            >
              <SubjectIcon
                iconKey={s.iconKey}
                className="h-4 w-4"
                style={{ color: `hsl(var(${s.colorVar}))` }}
              />
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
