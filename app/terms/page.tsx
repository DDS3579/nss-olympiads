import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6 text-muted-foreground">
      <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400 font-semibold">
        Draft — pending owner review
      </div>
      <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
      <ul className="list-disc pl-6 space-y-3">
        <li>The site provides educational information and links; we try to keep it accurate but can't guarantee dates, rules or fees — always confirm with the official organiser.</li>
        <li>Materials we host are used under the licence stated on each item; third-party materials remain the property of their owners.</li>
        <li>You may not misuse the site (scraping at abusive rates, impersonation).</li>
        <li>We may correct or remove content at any time.</li>
      </ul>
    </div>
  );
}