import Link from "next/link";
import Image from "next/image";
import { getSubjectIndex } from "@/lib/data";
import { siteConfig, mailto } from "@/lib/site-config";

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
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const linkCls =
  "inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const subjects = getSubjectIndex();

  return (
    <footer id="contact" className="border-t border-border bg-background pb-8 pt-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="font-heading text-lg font-semibold text-foreground">
              NSS Olympiad Hub
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Free, level-wise Olympiad preparation for students in Nepal — built by the STEM Club of
            NSS Clubs. Every link opened and checked by a person.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={mailto()}
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.contact.emailAddress}
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram (opens in new tab)</span>
            </a>
          </div>
        </div>

        {/* Olympiads */}
        <nav aria-label="Olympiads" className="col-span-1 lg:col-span-3">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Olympiads
          </h2>
          <ul className="mt-3">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link href={`/olympiads/${s.slug}`} className={linkCls}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Explore */}
        <nav aria-label="Explore" className="col-span-1 lg:col-span-2">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Explore
          </h2>
          <ul className="mt-3">
            <li><Link href="/olympiads" className={linkCls}>All Olympiads</Link></li>
            <li><Link href="/exams" className={linkCls}>Exam rules &amp; dates</Link></li>
            <li><Link href="/search" className={linkCls}>Search</Link></li>
            <li><Link href="/about" className={linkCls}>About &amp; verification</Link></li>
            <li><Link href="/faq" className={linkCls}>FAQ</Link></li>
          </ul>
        </nav>

        {/* Help */}
        <nav aria-label="Help and legal" className="col-span-2 lg:col-span-3">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Help
          </h2>
          <ul className="mt-3">
            <li>
              <a href={mailto("Broken or incorrect link", "Page:\nWhat's wrong:\n")} className={linkCls}>
                Report a broken link
              </a>
            </li>
            <li>
              <a href={mailto("Suggest a resource", "Subject:\nLink:\nWhy it helps:\n")} className={linkCls}>
                Suggest a resource
              </a>
            </li>
            <li><Link href={siteConfig.legal.privacy} className={linkCls}>Privacy</Link></li>
            <li><Link href={siteConfig.legal.terms} className={linkCls}>Terms</Link></li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-border px-5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} NSS Clubs · STEM Club. Free for every student.</p>
        <p>Always confirm dates and rules with the official organiser.</p>
      </div>
    </footer>
  );
}
