import { cn } from "@/lib/utils"

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary",
      className
    )}>
      {children}
    </span>
  )
}