"use client"
import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'

export function MagneticButton({ 
  children, 
  strength = 0.3, 
  className 
}: { 
  children: React.ReactNode, 
  strength?: number, 
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    const distance = Math.sqrt(middleX ** 2 + middleY ** 2)
    if (distance < 120) {
      setPosition({ x: middleX * strength, y: middleY * strength })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}