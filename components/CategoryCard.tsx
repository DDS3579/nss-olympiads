import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  slug: string
  name: string
  tagline: string
  icon: LucideIcon
  colorVar: string
}

export function CategoryCard({ slug, name, tagline, icon: Icon, colorVar }: CategoryCardProps) {
  return (
    <Link
      href={`/olympiads/${slug}`}
      className={cn(
        "group relative flex flex-col items-start gap-4 rounded-3xl border-2 p-6 transition-transform duration-150 border-b-[6px] active:translate-y-1 active:border-b-[2px] hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      )}
      style={{
        backgroundColor: `hsl(var(${colorVar}) / 0.08)`,
        borderColor: `hsl(var(${colorVar}) / 0.35)`,
      }}
    >
      <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/80 shadow-sm dark:bg-card">
        <Icon 
          className="h-6 w-6" 
          style={{ color: `hsl(var(${colorVar}))` }} 
        />
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-snug">{tagline}</p>
      </div>
    </Link>
  )
}