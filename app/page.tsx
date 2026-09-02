import Link from "next/link"
import { 
  ArrowRight, 
  GraduationCap, 
  Target, 
  Globe2, 
  Users, 
  Quote, 
  Crown, 
  FlaskConical, 
  HeartHandshake 
} from "lucide-react"
import { FadeIn } from "@/components/FadeIn"
import { BlurText } from "@/components/BlurText"
import { CountUp } from "@/components/CountUp"
import { GeometricHeroCanvas } from "@/components/GeometricHeroCanvas"
import { MagneticButton } from "@/components/MagneticButton"
import { CategoryCard } from "@/components/CategoryCard"
import { SectionLabel } from "@/components/SectionLabel"
import { olympiads } from "@/lib/data/olympiads"

const whyRows = [
  {
    icon: GraduationCap,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    title: "Stand Out in University Applications",
    body: "Olympiad participation and medals carry real weight with scholarship boards and admissions committees, both in Nepal and internationally — proof you can think under pressure, not just memorize.",
  },
  {
    icon: Target,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "A Sharper Foundation for IOE, IOM & NEB",
    body: "The same problem-solving depth that wins Olympiad medals is exactly what engineering and medical entrance exams reward. Prepare for one, and you're already ahead on the other.",
  },
  {
    icon: Globe2,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    title: "Represent Nepal on a Global Stage",
    body: "IMO, IPhO, IChO, IOI, IOAA, and IBO all send national teams to compete internationally. Very few students ever get this far — this is how you become one of them.",
  },
  {
    icon: Users,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "You're Not Doing This Alone",
    body: "NSS Clubs' STEM Club runs structured mentorship, peer study groups, and curated resources — so preparation feels like a team effort, not a solo grind.",
  },
]

const teamCards = [
  { icon: Crown, role: "President", name: "Divya D. Sharma" },
  { icon: Users, role: "Executive Team", name: "NSS Clubs" },
  { icon: FlaskConical, role: "Lead Organizer", name: "STEM Club" },
  { icon: HeartHandshake, role: "Supporting Partner", name: "Social Club" },
]

export default function Home() {
  return (
    <div className="bg-background overflow-hidden">
      {/* 6.2 HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background pt-40 pb-24 lg:pt-48 lg:pb-32">
        <GeometricHeroCanvas className="absolute inset-0 -z-10 opacity-70" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Badge */}
          <FadeIn delay={0} y={10}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              NSS Clubs · Education Section
            </div>
          </FadeIn>

          {/* Headline */}
          <div className="mt-6">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
              <BlurText text="Every Olympiad champion was once a student who decided to" />{" "}
              <span className="italic text-primary">start.</span>
            </h1>
          </div>

          {/* Subheadline */}
          <FadeIn delay={0.55} y={15}>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Free preparation material, model question papers, and structured roadmaps for 7 Olympiads — built by NSS Clubs for Grade 11 and 12 students ready to compete.
            </p>
          </FadeIn>

          {/* CTA Row */}
          <FadeIn delay={0.7} y={15}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/olympiads"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold font-heading text-primary-foreground border-b-4 border-primary/40 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
                >
                  Start Preparing <ArrowRight className="h-[18px] w-[18px]" />
                </Link>
              </MagneticButton>

              <Link
                href="/olympiads"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-8 py-3.5 text-sm font-semibold font-heading text-foreground transition-colors duration-200 hover:bg-secondary"
              >
                View Categories
              </Link>
            </div>
          </FadeIn>

          {/* Stat Row */}
          <FadeIn delay={0.85} y={10}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium">
                <span className="font-heading text-lg font-bold text-foreground">
                  <CountUp to={7} />
                </span>
                <span>Olympiad Categories</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-border hidden sm:block" />
              <div className="flex items-center gap-2 font-medium">
                <span>Grade 11 & 12 Focused</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-border hidden sm:block" />
              <div className="flex items-center gap-2 font-medium">
                <span>Organized by NSS STEM Club</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6.3 WHY OLYMPIADS? */}
      <section className="relative bg-secondary/30 py-24 lg:py-32" id="why">
        <div className="mx-auto max-w-2xl px-6 text-center mb-16">
          <FadeIn y={10}>
            <SectionLabel>WHY OLYMPIADS</SectionLabel>
          </FadeIn>
          <FadeIn y={15} delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
              More than a competition. A{" "}
              <span className="italic text-primary">launchpad</span>.
            </h2>
          </FadeIn>
          <FadeIn y={10} delay={0.2}>
            <p className="mt-4 text-muted-foreground text-lg">
              For NSS students in Grade 11 and 12, Olympiads open doors regular exams don&apos;t.
            </p>
          </FadeIn>
        </div>

        {/* 4 Alternating Rows */}
        <div className="mx-auto max-w-5xl px-6 space-y-20">
          {whyRows.map((row, index) => {
            const isOdd = index % 2 !== 0
            const Icon = row.icon
            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isOdd ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Visual panel */}
                <FadeIn
                  x={isOdd ? 40 : -40}
                  y={0}
                  duration={0.6}
                  delay={0}
                >
                  <div className={`h-48 sm:h-56 lg:aspect-square lg:h-auto max-w-sm mx-auto w-full rounded-3xl ${row.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-20 w-20 lg:h-24 lg:w-24 ${row.iconColor}`} />
                  </div>
                </FadeIn>

                {/* Text block */}
                <FadeIn
                  x={isOdd ? 40 : -40}
                  y={0}
                  duration={0.6}
                  delay={0.15}
                >
                  <div className="space-y-3 text-center lg:text-left">
                    <h3 className="font-heading text-2xl font-bold text-foreground">
                      {row.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {row.body}
                    </p>
                  </div>
                </FadeIn>
              </div>
            )
          })}

          {/* Success Spotlight Card */}
          {/* PLACEHOLDER — CMS FIELD: studentSuccessStory. Do not publish with fabricated names/achievements. Replace with a verified example once confirmed. Sanity schema: name, photo, olympiadCategory, achievement, resultingOpportunity, quote. */}
          <FadeIn y={20}>
            <div className="mt-20 rounded-3xl border border-border bg-card p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <Quote className="h-10 w-10 text-primary/40" />
              </div>
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Success Spotlight
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Real NSS students are already competing
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  This space is reserved for a verified student success story — swapped in via CMS once confirmed.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6.4 OLYMPIAD CATEGORIES */}
      <section className="py-24 lg:py-32 bg-background" id="categories">
        <div className="mx-auto max-w-2xl px-6 text-center mb-16">
          <FadeIn y={10}>
            <SectionLabel>OLYMPIAD CATEGORIES</SectionLabel>
          </FadeIn>
          <FadeIn y={15} delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
              Pick your arena.
            </h2>
          </FadeIn>
          <FadeIn y={10} delay={0.2}>
            <p className="mt-4 text-muted-foreground text-lg">
              Seven categories. One decision. Everything you need starts here.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto px-6 mt-16">
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
      </section>

      {/* 6.5 TEAM */}
      <section className="py-20 lg:py-28 bg-secondary/20 border-y border-border" id="team">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn y={10}>
            <SectionLabel>WHO&apos;S BEHIND THIS</SectionLabel>
          </FadeIn>
          <FadeIn y={15} delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
              Built by students, for students.
            </h2>
          </FadeIn>
          <FadeIn y={10} delay={0.2}>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              NSS Olympiad Hub is organized by President Divya D. Sharma, the Executive Team, and the STEM Club — with support from the Social Club of NSS Clubs.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 max-w-4xl mx-auto px-6">
          {teamCards.map((card, index) => {
            const Icon = card.icon
            return (
              <FadeIn key={index} delay={index * 0.1} duration={0.4} y={15}>
                <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 flex flex-col items-center text-center gap-3 h-full justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground font-semibold block">
                      {card.role}
                    </span>
                    <h3 className="font-heading font-semibold text-sm sm:text-base text-foreground mt-1">
                      {card.name}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* 6.6 CTA (PRE-FOOTER) */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-primary">
        <GeometricHeroCanvas variant="light" className="absolute inset-0 -z-10 opacity-15" />

        <FadeIn scale={0.98} duration={0.5}>
          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
              Ready to prove what you know?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed">
              Pick your Olympiad and get instant access to study material, model papers, and a roadmap built to get you there.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/olympiads"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-3.5 text-sm font-semibold font-heading border-b-4 border-white/30 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
                >
                  Start Preparing <ArrowRight className="h-[18px] w-[18px]" />
                </Link>
              </MagneticButton>

              <Link
                href="/olympiads"
                className="text-primary-foreground/90 underline-offset-4 hover:underline text-sm font-medium py-2"
              >
                or browse all 7 categories →
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
