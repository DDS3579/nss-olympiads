"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Never hijack scrolling for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      // The "buttery" feel: ~1.25s glide with an exponential ease-out
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      // touch stays native momentum scrolling by default — that's what we want
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Smoothly handle navbar / anchor links (#why, #categories, #team, ...)
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute("href")
      if (!hash || hash === "#") return
      const target = document.querySelector(hash)
      if (!(target instanceof HTMLElement)) return

      event.preventDefault()
      lenis.scrollTo(target, {
        offset: -80,      // clears the fixed navbar — tune if yours is taller
        duration: 1.5,
      })
      window.history.pushState(null, "", hash)
    }
    window.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("click", onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}