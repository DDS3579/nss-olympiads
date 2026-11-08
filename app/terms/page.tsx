import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms",
  description: "Terms of use for the NSS Olympiad Hub.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="Plain-language terms for using the hub."
      updated="7 November 2026"
    >
      <LegalSection title="Information, not guarantees">
        <p>
          The hub provides educational information and links. We work hard to keep it accurate, but
          we cannot guarantee dates, rules or fees. Always confirm with the official organiser — their
          links are on each subject page.
        </p>
      </LegalSection>

      <LegalSection title="Third-party material">
        <p>
          Materials we host are shared under the licence shown on each item. Third-party materials
          remain the property of their owners; please follow their terms when you use them.
        </p>
      </LegalSection>

      <LegalSection title="Fair use of the site">
        <p>
          Please don&apos;t misuse the site — for example by scraping at abusive rates or
          impersonating others.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>We may correct, update or remove content at any time.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions or removal requests:{" "}
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
