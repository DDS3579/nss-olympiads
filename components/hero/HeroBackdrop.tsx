"use client";

import { HERO_DIAGRAMS } from "./diagrams";

/* Deterministic star field (module scope → computed once, no hydration mismatch). */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const STARS = (() => {
  const rand = mulberry32(7);
  return Array.from({ length: 56 }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 0.22 + 0.07,
    o: rand() * 0.45 + 0.1,
    twinkle: rand() > 0.75,
  }));
})();

export function HeroBackdrop({
  subjects,
  activeSlug,
}: {
  subjects: { slug: string; colorVar: string }[];
  activeSlug: string | null;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(40,184,242,0.10),transparent_70%)]" />
      <div className="hero-motion hero-breathe absolute left-1/2 top-[62%] h-[80vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(40,184,242,0.10),transparent)]" />
      <div className="hero-grain absolute inset-0 opacity-[0.022]" data-heavy />

      {/* stars */}
      <svg
        data-heavy
        className="absolute inset-0 h-full w-full text-white"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {STARS.map((s, i) => (
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

      {/* one faint scientific diagram per subject; lights up with its node */}
      <div data-heavy className="hidden md:block">
        {subjects.map((s) => {
          const d = HERO_DIAGRAMS[s.slug];
          if (!d) return null;
          const active = activeSlug === s.slug;
          return (
            <div
              key={s.slug}
              className={`absolute transition-[opacity,color] duration-500 ${d.pos}`}
              style={{
                color: active ? `hsl(var(${s.colorVar}))` : "rgba(255,255,255,0.9)",
                opacity: active ? 0.55 : 0.07,
              }}
            >
              {d.svg}
            </div>
          );
        })}
      </div>
    </div>
  );
}
