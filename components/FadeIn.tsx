"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MAX_DELAY = 0.4; // never wait longer than 0.4 s (row #100 no longer waits 5 s)

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 20,
  scale = 1,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  once?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={cn(className)}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay: Math.min(delay, MAX_DELAY), ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}