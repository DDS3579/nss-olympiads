"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { Menu, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/olympiads", label: "Olympiads" },
  { href: "/#why", label: "About" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [activeHash, setActiveHash] = useState("")
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // Track hash changes for active link highlighting
  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash)
    setActiveHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const isActive = (href: string) => {
    // Exact match for non-hash routes
    if (!href.includes("#")) {
      return pathname === href
    }
    // For hash links like /#why — active when on homepage and hash matches
    const [basePath, hash] = href.split("#")
    const baseMatch = basePath === "" || basePath === "/" ? pathname === "/" : pathname === basePath
    return baseMatch && activeHash === `#${hash}`
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={hidden ? { y: "-100%", opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 inset-x-0 z-50 h-20 border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-300"
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading text-sm">
            N
          </div>
          <span className="text-lg font-heading font-semibold text-foreground">
            NSS Olympiad Hub
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200 py-1",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Link
            href="/olympiads"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold font-heading text-primary-foreground border-b-4 border-primary/40 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
          >
            Start Preparing
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 text-foreground" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-left font-heading">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg font-medium py-2 border-b border-border transition-colors",
                        isActive(link.href) ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/olympiads"
                    className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold font-heading text-primary-foreground border-b-4 border-primary/40 active:translate-y-1 active:border-b-2 transition-all duration-150"
                  >
                    Start Preparing <ArrowRight className="h-4 w-4" />
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}