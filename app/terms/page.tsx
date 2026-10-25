import type { Metadata } from "next";
import { mailto, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms of service for the NSS Olympiad Hub — short, plain, and honest.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <div className="mb-8 rounded-xl border border-dashed border-amber-500/60 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-700 dark:text-amber-400">
        Draft — pending owner review. This banner disappears once the text is
        approved.
      </div>

      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
        Legal
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-foreground">
        Terms of Service
      </h1>

      <ul className="mt-10 list-disc space-y-4 pl-6 leading-relaxed text-muted-foreground">
        <li>
          The site provides educational information and links; we try to keep
          it accurate but can&apos;t guarantee dates, rules or fees — always
          confirm with the official organiser (links provided).
        </li>
        <li>
          Materials we host are used under the licence stated on each item;
          third-party materials remain the property of their owners — follow
          their terms.
        </li>
        <li>
          You may not misuse the site (scraping at abusive rates,
          impersonation).
        </li>
        <li>We may correct or remove content at any time.</li>
      </ul>

      <p className="mt-10 text-sm text-muted-foreground">
        Contact:{" "}
        <a
          href={mailto("Terms question")}
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          {siteConfig.contact.emailAddress}
        </a>
        . Last updated: 24 October 2026 (draft).
      </p>
    </div>
  );
}