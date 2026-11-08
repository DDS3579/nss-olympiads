import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { getSpotlight } from "@/lib/data/shared";

export function SpotlightSection() {
  const stories = getSpotlight();
  if (stories.length === 0) return null;

  return (
    <section aria-labelledby="spotlight-title" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl space-y-14 px-5 sm:px-6">
        <h2 id="spotlight-title" className="sr-only">
          Success spotlight
        </h2>
        {stories.map((s) => (
          <FadeIn key={s.name} y={20}>
            <figure
              className="relative border-l-2 pl-6 sm:pl-8"
              style={{ borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 left-0 select-none font-heading text-[110px] leading-none"
                style={{ color: "hsl(var(--primary) / 0.08)" }}
              >
                &ldquo;
              </span>
              <figcaption className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Success spotlight · {s.contest} {s.year}
              </figcaption>
              <blockquote className="relative mt-3 font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl lg:text-[1.7rem]">
                {s.headline}
              </blockquote>
              {s.story && (
                <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {s.story}
                </p>
              )}
              <p className="relative mt-3 text-sm font-medium text-foreground">
                {s.name}{" "}
                <a
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Source <ArrowUpRight aria-hidden className="h-3 w-3" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </p>
            </figure>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
