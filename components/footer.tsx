import Link from "next/link";
import { Mail } from "lucide-react";
import { olympiads } from "@/lib/data/olympiads";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-8 pt-16" id="contact">
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
            {/* TODO: replace hrefs with real NSS Clubs social URLs and contact email */}
            <Link href="#" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link href="/" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">Home</Link></li>
            <li><Link href="/olympiads" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">Olympiads</Link></li>
            <li><Link href="/#why" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link></li>
            <li><Link href="/#team" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">Team</Link></li>
            <li><Link href="/#contact" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
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
                <Link href={`/olympiads/${o.slug}`} className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
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
            {/* TODO: FAQ and Report an Issue can point to placeholder routes if built later */}
            <li><Link href="/#contact" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
            <li><Link href="#" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</Link></li>
            <li><Link href="#" className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">Report Issue</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-6 pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>© 2026 NSS Clubs. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="transition-colors hover:text-foreground">Privacy</Link>
          <Link href="#" className="transition-colors hover:text-foreground">Terms</Link>
        </div>
      </div>
    </footer>
  );
}