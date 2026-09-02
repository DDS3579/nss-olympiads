import Link from "next/link"
import { Mail } from "lucide-react"
import { olympiads } from "@/lib/data/olympiads"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8" id="contact">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand */}
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading text-sm">
              N
            </div>
            <span className="text-lg font-heading font-semibold text-foreground">
              NSS Olympiad Hub
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Free Olympiad preparation for NSS students — organized by NSS Clubs Education Section.
          </p>
          <div className="mt-6 flex gap-4">
            {/* TODO: replace hrefs with real NSS Clubs social URLs and contact email */}
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">Home</Link></li>
            <li><Link href="/olympiads" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">Olympiads</Link></li>
            <li><Link href="/#why" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">About</Link></li>
            <li><Link href="/#team" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">Team</Link></li>
            <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">Contact</Link></li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
          <ul className="space-y-2">
            {olympiads.map((o) => (
              <li key={o.slug}>
                <Link href={`/olympiads/${o.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Support */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
          <ul className="space-y-2">
            {/* TODO: FAQ and Report an Issue can point to placeholder routes if built later */}
            <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">Contact</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">FAQ</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">Report Issue</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 NSS Clubs. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}