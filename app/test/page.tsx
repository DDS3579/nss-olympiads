"use client"

import { FadeIn } from "@/components/FadeIn"
import { BlurText } from "@/components/BlurText"
import { CountUp } from "@/components/CountUp"
import { GeometricHeroCanvas } from "@/components/GeometricHeroCanvas"
import { MagneticButton } from "@/components/MagneticButton"
import { CategoryCard } from "@/components/CategoryCard"
import { SectionLabel } from "@/components/SectionLabel"
import { ArrowRight, Sigma } from "lucide-react"
import Link from "next/link"

export default function TestPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Test */}
      <GeometricHeroCanvas variant="default" className="absolute inset-0 z-0" />

      <div className="relative z-10 container mx-auto px-6 py-24 space-y-24">
        
        {/* 1. BlurText & CountUp Test */}
        <section className="text-center space-y-8">
          <SectionLabel>Animation Engine Test</SectionLabel>
          <h1 className="font-heading text-5xl font-bold">
            <BlurText text="Every champion starts somewhere." />
          </h1>
          <div className="flex justify-center gap-12 text-xl font-heading font-semibold">
            <div className="flex items-center gap-2">
              <CountUp to={7} /> <span className="text-muted-foreground text-sm">Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <CountUp to={100} suffix="%" /> <span className="text-muted-foreground text-sm">Free</span>
            </div>
          </div>
        </section>

        {/* 2. MagneticButton Test */}
        <section className="flex justify-center">
          <MagneticButton>
            <Link 
              href="/olympiads" 
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground border-b-4 border-primary/40 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
            >
              Magnetic CTA <ArrowRight className="h-4 w-4" />
            </Link>
          </MagneticButton>
        </section>

        {/* 3. CategoryCard Test */}
        <section className="max-w-sm mx-auto">
          <FadeIn y={40}>
            <CategoryCard 
              slug="mathematics" 
              name="Mathematics" 
              tagline="Numbers don't lie. Neither will your solutions." 
              icon={Sigma} 
              colorVar="--subject-math" 
            />
          </FadeIn>
        </section>

        {/* 4. FadeIn Scroll Test */}
        <section className="h-[50vh] flex items-center justify-center border border-dashed border-border rounded-3xl">
          <p className="text-muted-foreground">Scroll down to see FadeIn trigger...</p>
        </section>

        <section className="space-y-4">
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-3xl font-bold">FadeIn Component</h2>
            <p className="text-muted-foreground">
              This block should slide up smoothly when it enters the viewport. 
              If you see this instantly without animation, check your Framer Motion installation.
            </p>
          </FadeIn>
        </section>

      </div>
    </main>
  )
}