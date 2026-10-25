import { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6 text-muted-foreground">
      <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400 font-semibold">
        Draft — pending owner review
      </div>
      <h1 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
      
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Is it really free?</h2>
        <p>Yes. Every resource is free to access; we link to free sources or host files we're allowed to host. A few Olympiad rounds charge registration (e.g. AI Round 2, Astronomy provincial) — see /exams.</p>
      </section>
      
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Who runs this site?</h2>
        <p>NSS Clubs' STEM Club, led by the NSS Clubs President, with the Executive Team and support from the Social Club.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Where is my progress saved?</h2>
        <p>Only in your browser (localStorage). Export it from My plan to move devices. Clearing browser data deletes it.</p>
      </section>
    </div>
  );
}