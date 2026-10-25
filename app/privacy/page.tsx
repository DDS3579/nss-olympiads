import type { Metadata } from "next";
import { mailto, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the NSS Olympiad Hub handles your data. Short version: we collect almost none of it.",
};

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>

      <ul className="mt-10 list-disc space-y-4 pl-6 leading-relaxed text-muted-foreground">
        <li>
          We don&apos;t ask you to create an account and don&apos;t collect
          names, emails or phone numbers on this site.
        </li>
        <li>
          Your progress (completed items, saved items, timer state, chosen
          level) is stored <strong className="text-foreground">only in your
          browser&apos;s localStorage</strong>. It is never sent to us. You can
          export or delete it in My plan (coming soon).
        </li>
        <li>
          We don&apos;t use advertising or tracking cookies, and we currently
          run no analytics. If we ever add privacy-respecting analytics, this
          policy will be updated first.
        </li>
        <li>
          Hosting: the site is served by Vercel, which may keep standard server
          logs (IP address, user agent) for security and operation.
        </li>
        <li>
          External links lead to third-party sites that have their own privacy
          policies.
        </li>
        <li>
          If you email us, we use your message only to respond or correct the
          site.
        </li>
      </ul>

      <p className="mt-10 text-sm text-muted-foreground">
        Contact:{" "}
        <a
          href={mailto("Privacy question")}
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          {siteConfig.contact.emailAddress}
        </a>
        . Last updated: 24 October 2026 (draft).
      </p>
    </div>
  );
}