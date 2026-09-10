"use client"
import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'

export function CountUp({ 
  to, 
  duration = 1200, 
  suffix = "" 
}: { 
  to: number, 
  duration?: number, 
  suffix?: string 
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const obj = { val: 0 }
          animate(
            obj,
            {
              val: to,
              duration: duration,
              easing: 'easeOutExpo',
              onUpdate: () => {
                setDisplay(Math.round(obj.val))
              }
            }
          )
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, duration])

  return <span ref={ref}>{display}{suffix}</span>
}