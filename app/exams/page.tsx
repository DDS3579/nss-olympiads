import Link from "next/link";
import { getSubjectIndex } from "@/lib/data";
import { getMarkingRules, getOperations, getTimeline } from "@/lib/data/shared";
import { formatIso } from "@/lib/date";
import { DateStatusChip } from "@/components/system/DateStatusChip";
import { mailto } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import { strong } from "@/lib/color";

export const metadata = pageMeta({
  title: "Exam rules, eligibility & dates",
  description:
    "Marking rules, negative marking, calculators, eligibility, fees and dates for every Olympiad in Nepal — compared in one place.",
  path: "/exams",
});

const NotVerified = () => (
  <span className="italic text-muted-foreground">Not yet verified</span>
);

const Val = ({ v }: { v: string | null | undefined }) => (v ? <>{v}</> : <NotVerified />);

const TH = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground";
const TD = "px-4 py-4 align-top text-sm text-foreground/90";

export default function ExamsPage() {
  const subjects = getSubjectIndex();
  const bySlug = Object.fromEntries(subjects.map((s) => [s.slug, s]));
  const marking = getMarkingRules();
  const ops = getOperations();
  const timeline = getTimeline();

  const SubjectCell = ({ slug }: { slug: string }) => {
    const s = bySlug[slug];
    return (
      <Link
        href={`/olympiads/${slug}`}
        className="inline-flex items-center gap-2 font-heading font-bold underline-offset-4 hover:underline"
        style={{ color: s ? strong(s.colorVar) : undefined }}
      >
        {s?.name ?? slug}
      </Link>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6 sm:pt-14">
      <header className="max-w-3xl">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Compare
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
          Exam rules, eligibility &amp; dates
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Different Olympiads in Nepal punish guessing differently, allow different calculators and
          register on different calendars. If you sit more than one, read this first. Anything we
          haven&apos;t confirmed from an official source says so — we never guess.
        </p>
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 text-sm">
          {[
            ["#marking", "Marking rules"],
            ["#operations", "Eligibility & fees"],
            ["#timeline", "Dates"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 font-medium transition-colors hover:bg-secondary"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ───── Marking rules ───── */}
      <section id="marking" aria-labelledby="marking-title" className="section-anchor mt-14">
        <h2 id="marking-title" className="font-heading text-2xl font-bold text-foreground">
          Marking rules
        </h2>
        <div
          role="region"
          tabIndex={0}
          aria-label="Marking rules table, scrolls horizontally"
          className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card"
        >
          <table className="w-full min-w-[760px] border-collapse">
            <thead className="border-b border-border bg-secondary/40">
              <tr>
                <th scope="col" className={`${TH} sticky left-0 bg-secondary`}>Subject</th>
                <th scope="col" className={TH}>Round</th>
                <th scope="col" className={TH}>Wrong answer</th>
                <th scope="col" className={TH}>Other marking notes</th>
                <th scope="col" className={TH}>Calculator</th>
                <th scope="col" className={TH}>Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marking.map((m) => (
                <tr key={`${m.subject}-${m.round ?? "x"}`}>
                  <th scope="row" className={`${TD} sticky left-0 bg-card text-left`}>
                    <SubjectCell slug={m.subject} />
                  </th>
                  <td className={TD}><Val v={m.round} /></td>
                  <td className={TD}><Val v={m.wrongAnswer} /></td>
                  <td className={TD}><Val v={m.notes} /></td>
                  <td className={TD}><Val v={m.calculator} /></td>
                  <td className={TD}>
                    {m.source ? (
                      <a
                        href={m.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        Source ↗<span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───── Operations ───── */}
      <section id="operations" aria-labelledby="ops-title" className="section-anchor mt-16">
        <h2 id="ops-title" className="font-heading text-2xl font-bold text-foreground">
          Eligibility, fees &amp; registration
        </h2>
        <div
          role="region"
          tabIndex={0}
          aria-label="Eligibility table, scrolls horizontally"
          className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card"
        >
          <table className="w-full min-w-[980px] border-collapse">
            <thead className="border-b border-border bg-secondary/40">
              <tr>
                <th scope="col" className={`${TH} sticky left-0 bg-secondary`}>Subject</th>
                <th scope="col" className={TH}>Organiser</th>
                <th scope="col" className={TH}>Grades</th>
                <th scope="col" className={TH}>Who can sit</th>
                <th scope="col" className={TH}>Fee</th>
                <th scope="col" className={TH}>Registration</th>
                <th scope="col" className={TH}>Camp</th>
                <th scope="col" className={TH}>Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ops.map((o) => (
                <tr key={o.subject}>
                  <th scope="row" className={`${TD} sticky left-0 bg-card text-left`}>
                    <SubjectCell slug={o.subject} />
                  </th>
                  <td className={TD}>
                    {o.organiser?.url ? (
                      <a
                        href={o.organiser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        {o.organiser.name}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <Val v={o.organiser?.name} />
                    )}
                  </td>
                  <td className={TD}><Val v={o.grades} /></td>
                  <td className={TD}><Val v={o.eligibility} /></td>
                  <td className={TD}><Val v={o.fee} /></td>
                  <td className={TD}><Val v={o.registration} /></td>
                  <td className={TD}><Val v={o.camp} /></td>
                  <td className={TD}><Val v={o.contact} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Know a missing detail?{" "}
          <a
            href={mailto("Exam detail to verify", "Subject:\nDetail:\nOfficial source link:\n")}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Help us verify it
          </a>
          .
        </p>
      </section>

      {/* ───── Timeline ───── */}
      <section id="timeline" aria-labelledby="timeline-title" className="section-anchor mt-16">
        <h2 id="timeline-title" className="font-heading text-2xl font-bold text-foreground">
          Dates
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Newest first. Statuses are computed in your browser, so they never go stale.
        </p>
        {timeline.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            No dates have been verified yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {timeline.map((t, i) => {
              const s = bySlug[t.slug];
              return (
                <li
                  key={`${t.slug}-${t.label}-${i}`}
                  className="flex flex-col gap-1.5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{t.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      <span style={{ color: s ? strong(s.colorVar) : undefined }} className="font-semibold">
                        {t.subject}
                      </span>{" "}
                      · {t.round}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="tabular-nums text-foreground/90">{formatIso(t.iso)}</span>
                    <DateStatusChip iso={t.iso} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
