"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";
import { getLenis } from "@/components/SmoothScroll";
import type { MotifKey } from "@/lib/data/olympiads";

// ---------------------------------------------------------------------------
// Scroll helper (uses Lenis when available)
// ---------------------------------------------------------------------------
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(`#${id}`, { offset: -96, duration: 1.4 });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ---------------------------------------------------------------------------
// Deterministic pseudo-random (avoids hydration mismatch)
// ---------------------------------------------------------------------------
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Sparse, subtle star field
// ---------------------------------------------------------------------------
export function StarField({ count = 40, className }: { count?: number; className?: string }) {
  const stars = useMemo(() => {
    const rand = mulberry32(42);
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: rand() * 0.25 + 0.08,
      o: rand() * 0.4 + 0.1,
      twinkle: rand() > 0.7,
    }));
  }, [count]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="currentColor"
            opacity={s.o}
            className={s.twinkle ? "oly-twinkle" : undefined}
          />
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-Olympiad scientific motif
// ---------------------------------------------------------------------------
export function Motif({
  motif,
  className,
  style,
}: {
  motif: MotifKey;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={style}
    >
      {motif === "math" && (
        <>
          <circle cx="60" cy="70" r="38" />
          <circle cx="122" cy="92" r="26" opacity="0.7" />
          <path d="M100 30 L160 140 L40 140 Z" opacity="0.8" />
          <line x1="20" y1="170" x2="180" y2="170" opacity="0.6" />
          <line x1="30" y1="20" x2="30" y2="180" opacity="0.6" />
          <path d="M60 70 L122 92" strokeDasharray="3 4" opacity="0.7" />
        </>
      )}
      {motif === "physics" && (
        <>
          <ellipse cx="100" cy="100" rx="80" ry="28" transform="rotate(-18 100 100)" />
          <ellipse cx="100" cy="100" rx="80" ry="28" transform="rotate(42 100 100)" opacity="0.7" />
          <ellipse cx="100" cy="100" rx="80" ry="28" transform="rotate(102 100 100)" opacity="0.5" />
          <circle cx="100" cy="100" r="6" fill="currentColor" stroke="none" />
          <path d="M20 160 q 20 -18 40 0 t 40 0 t 40 0 t 40 0" opacity="0.7" />
        </>
      )}
      {motif === "chemistry" && (
        <>
          <polygon points="70,40 96,55 96,85 70,100 44,85 44,55" />
          <polygon points="130,75 156,90 156,120 130,135 104,120 104,90" opacity="0.8" />
          <line x1="96" y1="70" x2="104" y2="90" />
          <circle cx="70" cy="40" r="3" fill="currentColor" stroke="none" />
          <circle cx="130" cy="135" r="3" fill="currentColor" stroke="none" />
          <line x1="44" y1="85" x2="20" y2="100" opacity="0.6" />
          <line x1="156" y1="90" x2="180" y2="75" opacity="0.6" />
        </>
      )}
      {motif === "astronomy" && (
        <>
          <circle cx="100" cy="100" r="18" />
          <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(-14 100 100)" />
          <ellipse cx="100" cy="100" rx="86" ry="30" transform="rotate(-14 100 100)" opacity="0.6" />
          <circle cx="160" cy="86" r="3" fill="currentColor" stroke="none" />
          <circle cx="40" cy="120" r="2" fill="currentColor" stroke="none" />
          <circle cx="150" cy="150" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="55" cy="50" r="1.5" fill="currentColor" stroke="none" />
        </>
      )}
      {motif === "biology" && (
        <>
          <path d="M100 180 C 100 140 100 120 100 100" />
          <path d="M100 100 C 80 80 60 70 45 60" />
          <path d="M100 100 C 120 80 140 70 155 60" />
          <path d="M100 130 C 90 120 80 118 70 116" opacity="0.7" />
          <path d="M100 130 C 110 120 120 118 130 116" opacity="0.7" />
          <circle cx="45" cy="60" r="8" />
          <circle cx="155" cy="60" r="8" />
          <circle cx="70" cy="116" r="5" opacity="0.8" />
          <circle cx="130" cy="116" r="5" opacity="0.8" />
        </>
      )}
      {motif === "informatics" && (
        <>
          <defs>
            <marker id="oly-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
            </marker>
          </defs>
          <circle cx="50" cy="50" r="10" />
          <circle cx="150" cy="50" r="10" />
          <circle cx="100" cy="120" r="10" />
          <circle cx="100" cy="180" r="8" opacity="0.8" />
          <line x1="60" y1="55" x2="90" y2="112" markerEnd="url(#oly-arrow)" />
          <line x1="140" y1="55" x2="110" y2="112" markerEnd="url(#oly-arrow)" />
          <line x1="100" y1="130" x2="100" y2="168" markerEnd="url(#oly-arrow)" />
          <line x1="60" y1="48" x2="138" y2="48" markerEnd="url(#oly-arrow)" opacity="0.6" />
        </>
      )}
      {motif === "ai" && (
        <>
          <circle cx="40" cy="60" r="8" />
          <circle cx="40" cy="120" r="8" />
          <circle cx="100" cy="40" r="8" />
          <circle cx="100" cy="100" r="8" />
          <circle cx="100" cy="160" r="8" />
          <circle cx="160" cy="80" r="8" />
          <circle cx="160" cy="130" r="8" />
          <line x1="48" y1="60" x2="92" y2="45" opacity="0.6" />
          <line x1="48" y1="60" x2="92" y2="98" opacity="0.6" />
          <line x1="48" y1="120" x2="92" y2="102" opacity="0.6" />
          <line x1="48" y1="120" x2="92" y2="155" opacity="0.6" />
          <line x1="108" y1="45" x2="152" y2="78" opacity="0.6" />
          <line x1="108" y1="100" x2="152" y2="84" opacity="0.6" />
          <line x1="108" y1="100" x2="152" y2="126" opacity="0.6" />
          <line x1="108" y1="155" x2="152" y2="132" opacity="0.6" />
        </>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Editorial section heading — NOW accepts colorVar
// ---------------------------------------------------------------------------
export function SectionHeading({
  index,
  label,
  title,
  description,
  colorVar,
  className,
}: {
  index: string;
  label: string;
  title?: string;
  description?: string;
  colorVar?: string;
  className?: string;
}) {
  return (
    <FadeIn className={cn("mb-10 lg:mb-14", className)}>
      <div className="flex items-center gap-4">
        <span
          className="whitespace-nowrap font-heading text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: colorVar ? `hsl(var(${colorVar}))` : "hsl(var(--primary))" }}
        >
          {index} / {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      {title && (
        <h2 className="mt-5 font-heading text-3xl font-bold text-foreground text-balance lg:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </FadeIn>
  );
}

// ---------------------------------------------------------------------------
// Stat chip
// ---------------------------------------------------------------------------
export function StatChip({
  value,
  label,
  small,
}: {
  value: string | number;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        className={cn(
          "font-heading font-bold text-foreground",
          small ? "text-base leading-snug" : "text-xl lg:text-2xl"
        )}
      >
        {value}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Difficulty meter
// ---------------------------------------------------------------------------
export function DifficultyMeter({
  level,
  colorVar,
  className,
}: {
  level: number;
  colorVar?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`Difficulty ${level} of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1.5 w-4 rounded-full"
          style={{
            background:
              i <= level
                ? `hsl(var(${colorVar ?? "--primary"}))`
                : `hsl(var(--border))`,
          }}
        />
      ))}
    </div>
  );
}