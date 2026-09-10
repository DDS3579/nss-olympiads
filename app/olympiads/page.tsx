import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { olympiads } from "@/lib/data/olympiads";

export const metadata = {
  title: "All Olympiads | NSS Olympiad Hub",
  description:
    "Browse preparation material, model papers, and roadmaps for all 7 Olympiad categories.",
};

/* A little constellation of the seven Olympiads — the header flourish.
   Nodes are colored per subject, joined by a dotted path. */
const NODE_POS = [
  { x: 34, y: 130 },
  { x: 78, y: 66 },
  { x: 128, y: 108 },
  { x: 168, y: 46 },
  { x: 210, y: 96 },
  { x: 250, y: 56 },
  { x: 236, y: 150 },
];

const NODE_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [4, 6], [1, 3], [0, 2],
];

export default function OlympiadsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-24 pt-32">
      {/* soft top glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(60%_100%_at_50%_0%,hsl(var(--primary)/0.07),transparent_70%)]"
      />

      {/* Back link */}
      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn y={6} duration={0.4}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </FadeIn>
      </div>

      {/* Editorial header + constellation */}
      <header className="relative mx-auto mt-10 max-w-5xl px-6 lg:mt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <FadeIn y={10}>
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  NSS Olympiad Series
                </span>
              </div>
            </FadeIn>

            <FadeIn y={14} delay={0.08}>
              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Choose your <span className="italic text-primary">Olympiad.</span>
              </h1>
            </FadeIn>

            <FadeIn y={12} delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Seven disciplines, each with free study material, model papers,
                and a step-by-step roadmap to the national round.
              </p>
            </FadeIn>

            <FadeIn y={10} delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                <span>7 disciplines</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>100% free</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Updated 2026</span>
              </div>
            </FadeIn>
          </div>

          {/* constellation of the seven */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <FadeIn scale={0.96} duration={0.7} delay={0.2}>
              <svg
                viewBox="0 0 300 200"
                className="w-full max-w-[300px]"
                fill="none"
                aria-hidden
              >
                {NODE_EDGES.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={NODE_POS[a].x}
                    y1={NODE_POS[a].y}
                    x2={NODE_POS[b].x}
                    y2={NODE_POS[b].y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="1 5"
                    strokeLinecap="round"
                  />
                ))}
                {olympiads.slice(0, 7).map((o, i) => (
                  <g key={o.slug}>
                    <circle
                      cx={NODE_POS[i].x}
                      cy={NODE_POS[i].y}
                      r="10"
                      fill={`hsl(var(${o.colorVar}) / 0.12)`}
                    />
                    <circle
                      cx={NODE_POS[i].x}
                      cy={NODE_POS[i].y}
                      r="3.2"
                      fill={`hsl(var(${o.colorVar}))`}
                    />
                  </g>
                ))}
              </svg>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* The manifest */}
      <div className="relative mx-auto mt-14 max-w-5xl px-6 lg:mt-20">
        <div className="border-t border-border">
          {olympiads.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.slug} y={16} delay={index * 0.05}>
                <Link
                  href={`/olympiads/${item.slug}`}
                  style={{
                    ["--c" as any]: `hsl(var(${item.colorVar}))`,
                    ["--c-soft" as any]: `hsl(var(${item.colorVar}) / 0.07)`,
                  }}
                  className="group relative flex items-center gap-4 border-b border-border px-2 py-6 transition-colors duration-300 hover:bg-[color:var(--c-soft)] sm:gap-6 sm:px-3 sm:py-7"
                >
                  {/* index */}
                  <span className="hidden w-8 flex-shrink-0 font-heading text-xs font-bold tabular-nums text-muted-foreground/50 transition-colors duration-300 group-hover:text-[color:var(--c)] sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* icon chip */}
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
                    style={{
                      borderColor: `hsl(var(${item.colorVar}) / 0.25)`,
                      background: `hsl(var(${item.colorVar}) / 0.06)`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                      style={{ color: `hsl(var(${item.colorVar}))` }}
                    />
                  </span>

                  {/* copy */}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-heading text-base font-bold text-foreground transition-colors duration-300 group-hover:text-[color:var(--c)] sm:text-lg">
                      {item.name}
                    </h2>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                      {item.tagline}
                    </p>
                  </div>

                  {/* arrow */}
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c-soft)] group-hover:text-[color:var(--c)]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}