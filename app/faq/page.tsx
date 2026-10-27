import type { Metadata } from "next";
import { useId, type ReactNode } from "react";
import { mailto, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about the NSS Olympiad Hub — free, level-wise Olympiad preparation for Nepal.",
};

function Item({ q, children }: { q: string; children: ReactNode }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="border-b border-border py-6">
      <h2 id={id} className="font-heading text-lg font-bold text-foreground">{q}</h2>
      <div className="mt-2 space-y-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
        Help
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-foreground">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 text-muted-foreground">
        Everything students ask about the hub, the levels, our links, and your
        progress.
      </p>

      <div className="mt-10">
        <Item q="Is it really free?">
          <p>
            Yes. Every resource is free to access; we link to free sources or
            host files we&apos;re allowed to host. A few Olympiad rounds charge
            registration (for example AI Round 2 and the Astronomy provincial
            round) — see the Exams page (coming soon).
          </p>
        </Item>

        <Item q="Who runs this site?">
          <p>
            NSS Clubs&apos; STEM Club, led by the NSS Clubs President, with the
            Executive Team and support from the Social Club.
          </p>
        </Item>

        <Item q='What does "level" mean?'>
          <p>
            The stage of the exam ladder: District → Province → National →
            International. It&apos;s different from <em>difficulty</em>: a
            problem can be hard but not appear in the exam you&apos;re sitting
            next month.
          </p>
        </Item>

        <Item q='Why does Physics have "Foundation" instead of "District"?'>
          <p>
            Nepal has no official district-level physics olympiad; the NEB
            syllabus is the practical foundation. Same for Astronomy
            (&quot;Entry&quot;) and AI (&quot;Round 1&quot;).
          </p>
        </Item>

        <Item q="How do you check links?">
          <p>
            A person opens every link; each shows the date it was verified. We
            re-check regularly and mark access problems (slow servers, logins,
            JavaScript-only sites).
          </p>
        </Item>

        <Item q="Do you copy other people's papers?">
          <p>
            No. We link to official sources. We host files only when the
            licence allows it (for example, IBO papers are CC BY-NC-SA) or
            when we made them.
          </p>
        </Item>

        <Item q='What does "AI-assisted, reviewed by …" mean?'>
          <p>
            Some study guides fill gaps that don&apos;t exist anywhere else. AI
            helped draft them; a named human checked them against the syllabus
            and re-derived the answers. If you find a mistake, tell us.
          </p>
        </Item>

        <Item q="Where is my progress saved?">
          <p>
            Only in your browser (localStorage). Export it from My plan (coming
            soon) to move devices. Clearing browser data deletes it.
          </p>
        </Item>

        <Item q="Do I need an account?">
          <p>No.</p>
        </Item>

        <Item q="A link is broken / a fact is wrong">
          <p>
            Use &quot;Report a problem&quot; on the card, or email{" "}
            <a
              href={mailto("Broken link or incorrect fact")}
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              {siteConfig.contact.emailAddress}
            </a>
            .
          </p>
        </Item>

        <Item q="Can I contribute?">
          <p>
            Yes — suggest resources, review guides, help translate to Nepali.
            Email{" "}
            <a
              href={mailto("Contributing to NSS Olympiad Hub")}
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              {siteConfig.contact.emailAddress}
            </a>
            .
          </p>
        </Item>

        <Item q="Keyboard shortcuts?">
          <p>
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">/</code>{" "}
            search ·{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">g</code>{" "}
            then{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
              l/p/s/r
            </code>{" "}
            jump to sections ·{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">?</code>{" "}
            help. (These arrive with the upcoming search &amp; navigation
            updates.)
          </p>
        </Item>
      </div>
    </div>
  );
}