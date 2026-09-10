"use client";

import Link from "next/link";

type MobileNode = { slug: string; name: string; colorVar: string };

/**
 * Mobile-only constellation. The desktop `OlympiadNodes` is hidden below md,
 * so phones previously lost the signature "7 olympiads" motif entirely.
 * Renders 7 glowing subject-colored nodes on a dashed star-line, each tappable.
 */
export function OlympiadMobileConstellation({ olympiads }: { olympiads: MobileNode[] }) {
  const items = olympiads.slice(0, 7);

  return (
    <div className="absolute inset-x-0 bottom-24 z-[2] px-5 md:hidden">
      <div className="relative flex items-center justify-between">
        {/* dashed connector */}
        <span
          aria-hidden
          className="absolute left-2 right-2 top-1/2 -translate-y-1/2 border-t border-dashed border-primary/25"
        />
        {items.map((o) => (
          <Link
            key={o.slug}
            href={`/olympiads/${o.slug}`}
            aria-label={`Explore ${o.name}`}
            className="group relative z-[1] flex h-9 w-9 items-center justify-center"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-active:opacity-100"
              style={{ background: `hsl(var(${o.colorVar}) / 0.16)` }}
            />
            <span
              className="h-2 w-2 rounded-full transition-transform duration-300 group-active:scale-150"
              style={{
                background: `hsl(var(${o.colorVar}))`,
                boxShadow: `0 0 10px hsl(var(${o.colorVar}) / 0.8)`,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}