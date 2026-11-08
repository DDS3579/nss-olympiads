import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionLabel } from "@/components/SectionLabel";
import { getRecords } from "@/lib/data/shared";

export function RecordsSection() {
  const { sourced, total } = getRecords();
  if (sourced.length < 2) return null;

  return (
    <section
      id="record"
      aria-labelledby="record-title"
      className="border-y border-border bg-secondary/20 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <FadeIn y={10}>
              <SectionLabel>NEPAL&apos;S RECORD</SectionLabel>
            </FadeIn>
            <FadeIn y={16} delay={0.08}>
              <h2
                id="record-title"
                className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
              >
                Nepal already competes.{" "}
                <span className="italic text-primary">The pipeline is what&apos;s missing.</span>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.16}>
            <p className="max-w-sm leading-relaxed text-muted-foreground md:text-right">
              <strong className="text-foreground">{total} awards</strong> across {sourced.length}{" "}
              Olympiads (medals and honourable mentions), each linked to its official database.
            </p>
          </FadeIn>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sourced.map((r) => (
            <li key={r.subject}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-lg font-bold text-foreground">{r.contest}</h3>
                  {r.firstYear != null && (
                    <span className="flex-shrink-0 text-xs text-muted-foreground">
                      since {r.firstYear}
                    </span>
                  )}
                </div>
                <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {[
                    ["Gold", r.gold],
                    ["Silver", r.silver],
                    ["Bronze", r.bronze],
                    ["Hon. mention", r.hm],
                  ].map(([label, n]) => (
                    <div key={label as string} className="rounded-lg bg-secondary/50 px-1 py-2">
                      <dd className="font-heading text-xl font-bold tabular-nums text-foreground">
                        {n as number}
                      </dd>
                      <dt className="text-[11px] leading-tight text-muted-foreground">
                        {label as string}
                      </dt>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-xs">
                  <Link
                    href={`/olympiads/${r.subject}`}
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Prepare for it →
                  </Link>
                  <a
                    href={r.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Official source <ArrowUpRight aria-hidden className="h-3 w-3" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
