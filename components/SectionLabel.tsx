import { cn } from "@/lib/utils"

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4", className)}>
      {children}
    </span>
  )
}