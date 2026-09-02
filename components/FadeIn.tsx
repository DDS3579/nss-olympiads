"use client"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  x = 0,
  y = 20, 
  scale = 1,
  once = true, 
  className 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  duration?: number, 
  x?: number,
  y?: number, 
  scale?: number,
  once?: boolean, 
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}