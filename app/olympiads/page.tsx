import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FadeIn } from "@/components/FadeIn"
import { SectionLabel } from "@/components/SectionLabel"
import { CategoryCard } from "@/components/CategoryCard"
import { olympiads } from "@/lib/data/olympiads"

export const metadata = {
  title: "All Olympiads | NSS Olympiad Hub",
  description: "Browse preparation material, model papers, and roadmaps for all 7 Olympiad categories.",
}

export default function OlympiadsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      {/* Back Link */}
      <div className="mx-auto max-w-6xl px-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-2xl px-6 text-center mt-8 mb-16">
        <SectionLabel>ALL OLYMPIADS</SectionLabel>
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mt-3">
          Choose your Olympiad.
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Each category includes free study material, model papers, and a step-by-step roadmap.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto px-6">
        {olympiads.map((item, index) => (
          <FadeIn key={item.slug} delay={index * 0.08} duration={0.4} scale={0.95}>
            <CategoryCard
              slug={item.slug}
              name={item.name}
              tagline={item.tagline}
              icon={item.icon}
              colorVar={item.colorVar}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
