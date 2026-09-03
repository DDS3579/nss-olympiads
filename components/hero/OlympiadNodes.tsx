"use client"

import Link from "next/link"

type NodeOlympiad = { slug: string; name: string }

type NodeDef = {
  x: number
  y: number
  label: "bottom" | "bottom-right" | "bottom-left" | "right" | "left" | "top-right" | "top-left"
}

/* ring order: top-center → clockwise */
const NODES: NodeDef[] = [
  { x: 50, y: 8,  label: "bottom" },
  { x: 89, y: 23, label: "bottom-left" },
  { x: 94, y: 53, label: "left" },
  { x: 82, y: 84, label: "top-left" },
  { x: 20, y: 76, label: "top-right" },
  { x: 6,  y: 55, label: "right" },
  { x: 11, y: 27, label: "bottom-right" },
]

const LABEL_CLS: Record<NodeDef["label"], string> = {
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  "bottom-right": "left-3 top-full mt-2",
  "bottom-left": "right-3 top-full mt-2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  "top-right": "left-3 bottom-full mb-2",
  "top-left": "right-3 bottom-full mb-2",
}

export function OlympiadNodes({
  olympiads,
  onActivate,
}: {
  olympiads: NodeOlympiad[]
  onActivate: (index: number | null) => void
}) {
  const items = olympiads.slice(0, 7)
  const pos = NODES.slice(0, items.length)

  return (
    <div className="absolute inset-0 z-[2] hidden md:block">
      {/* dotted ring connecting the seven worlds */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {pos.map((p, i) => {
          const q = pos[(i + 1) % pos.length]
          return (
            <line
              key={i}
              x1={p.x} y1={p.y} x2={q.x} y2={q.y}
              stroke="rgba(40,184,242,0.12)"
              strokeWidth="1"
              strokeDasharray="1 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>

      {/* the seven Olympiad nodes */}
      {items.map((o, i) => {
        const p = pos[i]
        return (
          <Link
            key={o.slug}
            href={`/olympiads/${o.slug}`}
            aria-label={`Explore ${o.name}`}
            onMouseEnter={() => onActivate(i)}
            onMouseLeave={() => onActivate(null)}
            onFocus={() => onActivate(i)}
            onBlur={() => onActivate(null)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 p-3"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {/* node */}
            <span className="relative block h-2.5 w-2.5">
              <span className="absolute -inset-[7px] rounded-full border border-primary/20 transition-colors duration-300 group-hover:border-primary/60" />
              <span className="absolute -inset-[3px] rounded-full bg-primary/20 blur-[3px] transition-colors duration-300 group-hover:bg-primary/50" />
              <span className="absolute inset-0 rounded-full bg-[#7fdcfb] shadow-[0_0_10px_rgba(40,184,242,0.9)] transition-transform duration-300 group-hover:scale-125" />
            </span>

            {/* hover label */}
            <span
              className={`pointer-events-none absolute z-10 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 ${LABEL_CLS[p.label]}`}
            >
              <span className="block rounded-lg border border-white/10 bg-[#0a1226]/95 px-3 py-2 text-left shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur">
                <span className="block whitespace-nowrap font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#f3f6fb]">
                  {o.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-medium text-[#28b8f2]">
                  Explore →
                </span>
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}