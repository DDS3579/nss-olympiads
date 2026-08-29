"use client"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  y = 20, 
  once = true, 
  className 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  duration?: number, 
  y?: number, 
  once?: boolean, 
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}