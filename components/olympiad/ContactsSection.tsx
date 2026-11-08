"use client";

import { Mail, Phone } from "lucide-react";
import { strong } from "@/lib/color";
import { mailto } from "@/lib/site-config";
import { SectionHeading } from "./primitives";
import type { Gap, SubjectData } from "@/lib/types";

const STATUS_LABEL: Record<Gap["status"], string> = {
  open: "Open",
  drafting: "Drafting",
  "in-review": "In review",
  published: "Published",
};

const PRIORITY_LABEL: Record<Gap["priority"], string> = {
  P1: "High priority",
  P2: "Medium",
  P3: "Later",
};

function StatusChip({ status }: { status: Gap["status"] }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold";
  if (status === "published")
    return <span className={`${base} bg-emerald-500/12 text-emerald-700 dark:text-emerald-400`}>{STATUS_LABEL[status]}</span>;
  if (status === "in-review")
    return <span className={`${base} bg-amber-500/12 text-amber-700 dark:text-amber-400`}>{STATUS_LABEL[status]}</span>;
  if (status === "drafting")
    return <span className={`${base} bg-secondary text-secondary-foreground`}>{STATUS_LABEL[status]}</span>;
  return <span className={`${base} border border-dashed border-border text-muted-foreground`}>{STATUS_LABEL[status]}</span>;
}

export function ContactsSection({ data }: { data: SubjectData }) {
  const { meta } = data;
  const c = meta.colorVar;
  const gaps = data.gaps;

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="section-anchor border-t border-border py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="08"
          label="Contacts & Help"
          title="Who runs it — and what's missing"
          titleId="contacts-title"
          description={`Official contacts for the ${meta.name} Olympiad, and the content gaps we are working to fill.`}
          colorVar={c}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ── Official bodies ── */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Official bodies
            </h3>
            {meta.contacts.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                Contacts for {meta.name} are being verified against the research file.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {meta.contacts.map((ct) => (
                  <div key={ct.body} className="rounded-2xl border border-border bg-card p-5">
                    <h4 className="font-heading font-bold text-foreground">{ct.body}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ct.role}</p>
                    {(ct.links.length > 0 || ct.email || ct.phone) && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {ct.links.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                          >
                            {l.label} ↗<span className="sr-only">(opens in new tab)</span>
                          </a>
                        ))}
                        {ct.email && (
                          <a
                            href={`mailto:${ct.email}`}
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                          >
                            <Mail aria-hidden className="h-3.5 w-3.5" /> {ct.email}
                          </a>
                        )}
                        {ct.phone && (
                          <span className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-secondary px-3 text-xs font-semibold text-secondary-foreground">
                            <Phone aria-hidden className="h-3.5 w-3.5" /> {ct.phone}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Help wanted: the gap register ── */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Missing — and we&apos;re building it
            </h3>
            {gaps.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                The {meta.name} gap register is being compiled from the research file.
              </p>
            ) : (
              <>
                <ul className="mt-4 space-y-3">
                  {gaps.map((g) => (
                    <li key={g.id} className="rounded-2xl border border-border bg-card p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-secondary px-2 py-0.5 font-heading text-[11px] font-bold uppercase tracking-wide text-secondary-foreground">
                          {g.id}
                        </span>
                        <StatusChip status={g.status} />
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {g.level === "all" ? "All levels" : g.level.charAt(0).toUpperCase() + g.level.slice(1)} · {PRIORITY_LABEL[g.priority]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{g.title}</p>
                      {g.status === "published" && g.publishedId && (
                        <a
                          href="#library"
                          className="mt-2 inline-block text-xs font-semibold underline underline-offset-2"
                          style={{ color: strong(c) }}
                        >
                          View the published resource →
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href={mailto(
                    `Offering to help with ${meta.name} gaps`,
                    `I'd like to help fill a gap for ${meta.name}.\nGap ID(s): \nI can: `
                  )}
                  className="mt-5 inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold transition-all hover:brightness-110"
                  style={{ background: strong(c), color: "hsl(var(--on-strong))" }}
                >
                  Offer to help
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
