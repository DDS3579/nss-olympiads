import Link from "next/link";
import { getNepalAuthors } from "@/lib/data/shared";
import { mailto, siteConfig } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About, verification & licensing",
  description:
    "Who runs the NSS Olympiad Hub, how every link is verified, what we host versus link to, and how AI-assisted material is reviewed.",
  path: "/about",
});

const H2 = "section-anchor font-heading text-2xl font-bold text-foreground";
const P = "mt-3 leading-relaxed text-muted-foreground";

export default function AboutPage() {
  const authors = getNepalAuthors();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-6 sm:pt-14">
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        About
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
        A materials hub you can trust
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        The NSS Olympiad Hub is a free library for students in Nepal preparing for Olympiads. It is
        not a course or a tracker — it is a carefully checked set of pointers to the best material,
        organised by the exam you are actually sitting.
      </p>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 text-sm">
        {[
          ["#who", "Who we are"],
          ["#verification", "How we verify"],
          ["#licensing", "Licensing"],
          ["#ai", "AI-assisted material"],
          ["#corrections", "Corrections"],
          ["#credits", "Credits"],
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

      <section id="who" className="mt-12">
        <h2 className={H2}>Who we are</h2>
        <p className={P}>
          The hub is built and maintained by the STEM Club of NSS Clubs, organised by President
          Divya D. Sharma and the Executive Team, with support from the Social Club. We are students
          helping students; we are not the official organisers of any Olympiad. Always confirm dates
          and rules with the organiser (linked on every subject page).
        </p>
      </section>

      <section id="verification" className="mt-12">
        <h2 className={H2}>How we verify</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">A person opens every link</strong> before it is
            published. The date they did is shown on the card as &ldquo;Verified …&rdquo;.
          </li>
          <li>
            <strong className="text-foreground">Access notes are never hidden.</strong> If a site is
            slow outside Nepal, needs a login, is a scanned image or runs only with JavaScript, the
            card says so.
          </li>
          <li>
            <strong className="text-foreground">Links are re-checked regularly.</strong> Anything
            older than four months is flagged for re-checking.
          </li>
          <li>
            <strong className="text-foreground">Known-bad sites are blocked.</strong> We keep a list
            of defunct or inaccurate sources that can never be added.
          </li>
          <li>
            <strong className="text-foreground">Nothing is invented.</strong> If a fact (a fee, a
            date, a marking rule) is not confirmed, the site says &ldquo;Not yet verified&rdquo;.
          </li>
        </ul>
      </section>

      <section id="licensing" className="mt-12">
        <h2 className={H2}>Licensing: what we host and what we link</h2>
        <p className={P}>
          Most material is <strong className="text-foreground">linked, not copied</strong> — it stays
          on its owner&apos;s site under their terms. We host a file ourselves only when its licence
          allows it (for example, some papers published under Creative Commons licences) or when we
          made it. Each hosted item shows its licence. If you own something we host and want it
          removed, tell us and we will remove it promptly.
        </p>
      </section>

      <section id="ai" className="mt-12">
        <h2 className={H2}>AI-assisted material</h2>
        <p className={P}>
          Some study guides fill gaps that exist nowhere else in Nepal. When AI helps draft one, a
          named human reviews it against the official syllabus and re-derives the answers before it
          is published. Such items are labelled{" "}
          <em>&ldquo;NSS original · AI-assisted · reviewed by NAME (date)&rdquo;</em>. Unreviewed
          drafts are never shown.
        </p>
      </section>

      <section id="corrections" className="mt-12">
        <h2 className={H2}>Corrections</h2>
        <p className={P}>
          Found a broken link, a wrong date or a mistake? Use the &ldquo;Report&rdquo; button on any
          card, or write to{" "}
          <a
            href={mailto("Correction")}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {siteConfig.contact.emailAddress}
          </a>
          . You can also{" "}
          <a
            href={mailto("Suggest a resource", "Subject:\nLink:\nWhy it helps:\n")}
            className="font-medium text-foreground underline underline-offset-4"
          >
            suggest a resource
          </a>
          .
        </p>
      </section>

      <section id="credits" className="mt-12">
        <h2 className={H2}>Credits</h2>
        {authors.length > 0 ? (
          <>
            <p className={P}>
              With thanks to the Nepali authors and organisations whose material this hub points to:
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm text-foreground sm:grid-cols-2">
              {authors.map((a) => (
                <li key={a} className="list-disc">
                  {a}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={P}>Credits will appear here as Nepal-specific resources are published.</p>
        )}
      </section>

      <p className="mt-14 text-sm text-muted-foreground">
        See also: <Link href="/faq" className="underline underline-offset-4">FAQ</Link> ·{" "}
        <Link href="/privacy" className="underline underline-offset-4">Privacy</Link> ·{" "}
        <Link href="/terms" className="underline underline-offset-4">Terms</Link>
      </p>
    </div>
  );
}
