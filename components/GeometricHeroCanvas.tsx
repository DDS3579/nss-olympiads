"use client"
import { useEffect, useRef } from 'react'
import { animate, remove } from 'animejs'
import { cn } from '@/lib/utils'

export function GeometricHeroCanvas({ 
  variant = 'default', 
  className 
}: { 
  variant?: 'default' | 'light', 
  className?: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const shapes = [
    { type: 'circle', color: 'var(--primary)', x: '15%', y: '20%', size: 120 },
    { type: 'triangle', color: 'var(--accent)', x: '80%', y: '15%', size: 80 },
    { type: 'hexagon', color: 'var(--subject-math)', x: '25%', y: '70%', size: 100 },
    { type: 'circle', color: 'var(--subject-biology)', x: '75%', y: '80%', size: 60 },
    { type: 'square', color: 'var(--subject-physics)', x: '50%', y: '40%', size: 90 },
    { type: 'triangle', color: 'var(--subject-astronomy)', x: '10%', y: '85%', size: 50 },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const targets = containerRef.current.querySelectorAll('.shape')
    
    const timelines = Array.from(targets).map((target, i) => {
      return animate(target, {
        translateY: [0, -20, 0],
        rotate: [0, 15, 0],
        duration: 8000 + i * 600,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
        delay: i * 200,
      })
    })

    return () => {
      timelines.forEach(tl => tl.pause())
      remove(targets)
    }
  }, [])

  const renderShape = (shape: any, index: number) => {
    const fill = variant === 'light' ? 'white' : `hsl(${shape.color})`
    const opacity = variant === 'light' ? 0.1 : 0.15 

    return (
      <div
        key={index}
        className={cn("shape absolute", variant === 'light' ? 'text-white' : '')}
        style={{
          left: shape.x,
          top: shape.y,
          width: shape.size,
          height: shape.size,
          opacity: opacity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {shape.type === 'circle' && <circle cx="50" cy="50" r="50" fill={fill} />}
          {shape.type === 'triangle' && <polygon points="50,0 100,100 0,100" fill={fill} />}
          {shape.type === 'hexagon' && <polygon points="25,0 75,0 100,50 75,100 25,100 0,50" fill={fill} />}
          {shape.type === 'square' && <rect width="100" height="100" rx="20" fill={fill} />}
        </svg>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {shapes.map((shape, i) => renderShape(shape, i))}
    </div>
  )
}