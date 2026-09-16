import Link from "next/link";
import { Mail } from "lucide-react";
import { olympiads } from "@/lib/data/olympiads";
import { siteConfig } from "@/lib/site-config";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-background pb-8 pt-16"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-primary-foreground">
              N
            </div>
            <span className="font-heading text-lg font-semibold text-foreground">
              NSS Olympiad Hub
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Free Olympiad preparation for NSS students — organized by NSS Clubs
            Education Section.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            {/* <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a> */}
            <a
              href={siteConfig.contact.email}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/olympiads"
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Olympiads
              </Link>
            </li>
            <li>
              <Link
                href="/#why"
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#team"
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
            Categories
          </h3>
          <ul className="space-y-2">
            {olympiads.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/olympiads/${o.slug}`}
                  className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.legal.faq}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.legal.reportIssue}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
              >
                Report Issue
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} NSS Clubs. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link
            href={siteConfig.legal.privacy}
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href={siteConfig.legal.terms}
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
