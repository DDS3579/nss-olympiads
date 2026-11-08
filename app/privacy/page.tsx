import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy",
  description:
    "The NSS Olympiad Hub has no accounts, no tracking and stores nothing about you on our side.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="Short version: we don't ask who you are and we don't track what you read."
      updated="7 November 2026"
    >
      <LegalSection title="What we collect">
        <p>
          Nothing. There are no accounts, and the site does not collect names, e-mail addresses or
          phone numbers. We do not run advertising or analytics scripts.
        </p>
      </LegalSection>

      <LegalSection title="What your browser remembers">
        <p>
          Two small preferences are stored <strong className="text-foreground">on your own
          device</strong> and never sent to us: your light/dark theme, and your last few search
          terms (so search can suggest them again). Clearing your browser data removes both.
        </p>
      </LegalSection>

      <LegalSection title="Hosting">
        <p>
          The site is served by Vercel, which may keep standard server logs (such as IP address and
          browser type) for security and operation. We do not use those logs to identify visitors.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          Cards link to third-party websites that have their own privacy policies. We are not
          responsible for what they collect.
        </p>
      </LegalSection>

      <LegalSection title="If you email us">
        <p>
          We use your message only to reply or to correct the site. Contact:{" "}
          <a
            href={`mailto:${siteConfig.contact.emailAddress}`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {siteConfig.contact.emailAddress}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
