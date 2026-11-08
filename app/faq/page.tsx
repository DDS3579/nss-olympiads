import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers about the NSS Olympiad Hub: is it free, how links are verified, what 'level' means and how to report a problem.",
  path: "/faq",
});

const email = siteConfig.contact.emailAddress;

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is it really free?",
    a: "Yes. Every resource is free to access: we link to free sources or host files we are allowed to host. A few Olympiad rounds charge a registration fee of their own — see the Exams page for what is confirmed.",
  },
  {
    q: "Who runs this site?",
    a: "The STEM Club of NSS Clubs, organised by the President and the Executive Team with support from the Social Club. We are students; we are not the official organisers of any Olympiad.",
  },
  {
    q: "What does “level” mean?",
    a: "The stage of the exam ladder: District → Province → National → International. It is different from difficulty: a problem can be very hard yet never appear in the round you sit next month.",
  },
  {
    q: "Why does Physics say “Foundation” instead of “District”?",
    a: "Nepal has no official district-level physics olympiad, so the NEB Grade 11–12 syllabus is the practical foundation. Astronomy (“Entry”) and AI (“Round 1”) are labelled the same honest way.",
  },
  {
    q: "How do you check links?",
    a: "A person opens every link before it is published. Each card shows the date it was last verified, and we flag access problems such as slow servers, logins, scans or JavaScript-only sites.",
  },
  {
    q: "Do you copy other people's papers?",
    a: "No. We link to official sources. We host a file only when its licence allows it or when we made it, and the licence is shown on the card.",
  },
  {
    q: "What does “AI-assisted, reviewed by …” mean?",
    a: "Some guides fill gaps that exist nowhere else. AI helped draft them; a named human checked them against the syllabus and re-derived the answers. If you find a mistake, tell us.",
  },
  {
    q: "Do I need an account?",
    a: "No. There are no accounts and the site does not track your progress — it is a library, not a course.",
  },
  {
    q: "Can I share a filtered view?",
    a: "Yes. Filters live in the page address, so a link like /olympiads/physics?level=province&topic=optics opens exactly that view for whoever you send it to.",
  },
  {
    q: "A link is broken or a fact is wrong.",
    a: `Use the “Report” button on the card, or email ${email}. We fix confirmed errors quickly.`,
  },
  {
    q: "Can I contribute?",
    a: `Yes — suggest resources, review guides or help with Nepali translations. Email ${email}.`,
  },
  {
    q: "Keyboard shortcuts?",
    a: "Press / (or Ctrl/⌘ + K) anywhere to open search.",
  },
];

export default function FaqPage() {
  return (
    <LegalPage
      title="Frequently asked questions"
      intro="Quick answers about how the hub works. Can't find yours? Email us."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {FAQ.map((f) => (
          <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold text-foreground">
              {f.q}
              <span
                aria-hidden
                className="flex-shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-2 pt-2 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        More on how we work: <Link href="/about" className="underline underline-offset-4">About &amp; verification</Link>.
      </p>
    </LegalPage>
  );
}
