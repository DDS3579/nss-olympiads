"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { SubjectIndexItem } from "@/lib/types";

type Label =
  | "bottom"
  | "bottom-right"
  | "bottom-left"
  | "right"
  | "left"
  | "top-right"
  | "top-left";

/* ring order: top-centre → clockwise (percent of the hero box) */
const NODES: { x: number; y: number; label: Label }[] = [
  { x: 50, y: 8, label: "bottom" },
  { x: 89, y: 23, label: "bottom-left" },
  { x: 94, y: 53, label: "left" },
  { x: 82, y: 84, label: "top-left" },
  { x: 20, y: 76, label: "top-right" },
  { x: 6, y: 55, label: "right" },
  { x: 11, y: 27, label: "bottom-right" },
];

const LABEL_CLS: Record<Label, string> = {
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  "bottom-right": "left-3 top-full mt-2",
  "bottom-left": "right-3 top-full mt-2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  "top-right": "left-3 bottom-full mb-2",
  "top-left": "right-3 bottom-full mb-2",
};

export function OlympiadNodes({
  subjects,
  onActivate,
}: {
  subjects: SubjectIndexItem[];
  onActivate: (slug: string | null) => void;
}) {
  const items = subjects.slice(0, NODES.length);
  const pos = NODES.slice(0, items.length);

  return (
    <div className="absolute inset-0 z-[2] hidden md:block">
      {/* dotted ring joining the worlds */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {pos.map((p, i) => {
          const q = pos[(i + 1) % pos.length];
          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="rgba(40,184,242,0.12)"
              strokeWidth="1"
              strokeDasharray="1 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {items.map((o, i) => {
        const p = pos[i];
        const col = `hsl(var(${o.colorVar}))`;
        return (
          <Link
            key={o.slug}
            href={`/olympiads/${o.slug}`}
            aria-label={`Explore ${o.name}`}
            onMouseEnter={() => onActivate(o.slug)}
            onMouseLeave={() => onActivate(null)}
            onFocus={() => onActivate(o.slug)}
            onBlur={() => onActivate(null)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ left: `${p.x}%`, top: `${p.y}%` } as CSSProperties}
          >
            {/* node */}
            <span className="relative block h-2.5 w-2.5">
              <span
                className="absolute -inset-[7px] rounded-full border opacity-40 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ borderColor: col }}
              />
              <span
                className="absolute -inset-[3px] rounded-full opacity-30 blur-[3px] transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: col }}
              />
              <span
                className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ background: col, boxShadow: `0 0 10px ${col}` }}
              />
            </span>

            {/* label */}
            <span
              className={`pointer-events-none absolute z-10 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${LABEL_CLS[p.label]}`}
            >
              <span className="block w-max max-w-[220px] rounded-lg border border-white/10 bg-[#0a1226]/95 px-3 py-2 text-left shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <span className="block font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#f3f6fb]">
                  {o.name}
                </span>
                <span className="mt-0.5 block text-xs font-medium" style={{ color: col }}>
                  Explore →
                </span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
