"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

let lenisInstance: Lenis | null = null

/** For the future: modals/overlays can call getLenis()?.stop() / .start() */
export function getLenis() {
  return lenisInstance
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const mounted = useRef(false)
  const popNav = useRef(false)

  useEffect(() => {
    // Never hijack scrolling for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis
    lenisInstance = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Same-page anchor links on ANY page (#why, #categories, #team, ...)
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute("href")
      if (!hash || hash === "#") return
      const target = document.querySelector(hash)
      if (!(target instanceof HTMLElement)) return

      event.preventDefault()
      lenis.scrollTo(target, {
        offset: -80, // clears the fixed navbar — one value, applies everywhere
        duration: 1.5,
      })
      window.history.pushState(null, "", hash)
    }
    window.addEventListener("click", onClick)

    // Don't fight the browser's back/forward scroll restoration
    const onPopState = () => { popNav.current = true }
    window.addEventListener("popstate", onPopState)

    return () => {
      window.removeEventListener("click", onClick)
      window.removeEventListener("popstate", onPopState)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      lenisInstance = null
    }
  }, [])

  // The layout never unmounts, so reset to top on every route change
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return } // skip initial load
    if (popNav.current) { popNav.current = false; return }    // skip back/forward
    if (window.location.hash) return                          // let deep links resolve
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}