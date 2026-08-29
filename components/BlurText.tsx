"use client"
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { cn } from '@/lib/utils'

export function BlurText({ 
  text, 
  className, 
  staggerDelay = 40, 
  baseDelay = 150 
}: { 
  text: string, 
  className?: string, 
  staggerDelay?: number, 
  baseDelay?: number 
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          anime({
            targets: containerRef.current.querySelectorAll('.word'),
            opacity: [0, 1],
            filter: ['blur(8px)', 'blur(0px)'],
            translateY: [20, 0],
            delay: anime.stagger(staggerDelay, { start: baseDelay }),
            easing: 'easeOutExpo'
          })
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [staggerDelay, baseDelay])

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <span 
          key={i} 
          className="word inline-block mr-[0.25em] opacity-0 blur-[8px] translate-y-[20px]"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}