import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6 text-muted-foreground">
      <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400 font-semibold">
        Draft — pending owner review
      </div>
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <ul className="list-disc pl-6 space-y-3">
        <li>We don't ask you to create an account and don't collect names, emails or phone numbers on this site.</li>
        <li>Your progress (completed items, saved items, timer state, chosen level) is stored <strong>only in your browser's localStorage</strong>. It is never sent to us.</li>
        <li>We don't use advertising or tracking cookies.</li>
        <li>Hosting: the site is served by Vercel, which may keep standard server logs (IP address, user agent) for security and operation.</li>
        <li>External links lead to third-party sites that have their own privacy policies.</li>
      </ul>
    </div>
  );
}