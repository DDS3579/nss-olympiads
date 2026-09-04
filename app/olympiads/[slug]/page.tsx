// import { notFound } from "next/navigation"
// import Link from "next/link"
// import { 
//   ArrowLeft, 
//   FileText, 
//   ArrowDownToLine, 
//   Calendar 
// } from "lucide-react"
// import { FadeIn } from "@/components/FadeIn"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { olympiads, getOlympiadBySlug } from "@/lib/data/olympiads"

// interface PageProps {
//   params: Promise<{ slug: string }>
// }

// export async function generateStaticParams() {
//   return olympiads.map((item) => ({
//     slug: item.slug,
//   }))
// }

// export async function generateMetadata({ params }: PageProps) {
//   const { slug } = await params
//   const olympiad = getOlympiadBySlug(slug)
//   if (!olympiad) return { title: "Olympiad Not Found" }

//   return {
//     title: `${olympiad.name} Olympiad | NSS Olympiad Hub`,
//     description: olympiad.description,
//   }
// }

// export default async function OlympiadDetailPage({ params }: PageProps) {
//   const { slug } = await params
//   const olympiad = getOlympiadBySlug(slug)

//   if (!olympiad) {
//     notFound()
//   }

//   const Icon = olympiad.icon

//   // Group model papers by year
//   const groupedPapers = olympiad.modelPapers.reduce((acc, paper) => {
//     const year = paper.year || "General"
//     if (!acc[year]) acc[year] = []
//     acc[year].push(paper)
//     return acc
//   }, {} as Record<string, typeof olympiad.modelPapers>)

//   const sortedYears = Object.keys(groupedPapers).sort((a, b) => b.localeCompare(a))

//   return (
//     <div className="min-h-screen bg-background pb-24">
//       {/* Header Band */}
//       <div 
//         className="pt-28 pb-16 lg:pt-32 lg:pb-20 border-b border-border transition-colors"
//         style={{
//           backgroundColor: `hsl(var(${olympiad.colorVar}) / 0.08)`,
//         }}
//       >
//         <div className="mx-auto max-w-4xl px-6">
//           <Link
//             href="/olympiads"
//             className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" /> All Olympiads
//           </Link>

//           <FadeIn y={10} duration={0.4}>
//             <div className="text-center">
//               <div 
//                 className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
//                 style={{
//                   backgroundColor: `hsl(var(${olympiad.colorVar}) / 0.15)`,
//                 }}
//               >
//                 <Icon 
//                   className="h-7 w-7" 
//                   style={{ color: `hsl(var(${olympiad.colorVar}))` }}
//                 />
//               </div>

//               <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground">
//                 {olympiad.name} Olympiad
//               </h1>

//               <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
//                 {olympiad.description}
//               </p>
//             </div>
//           </FadeIn>
//         </div>
//       </div>

//       {/* Main Tabs Container */}
//       <div className="mx-auto max-w-4xl px-6 mt-12">
//         <Tabs defaultValue="study-material" className="w-full">
//           <TabsList className="grid grid-cols-3 gap-2 rounded-2xl bg-secondary p-1.5">
//             <TabsTrigger value="study-material">Study Material</TabsTrigger>
//             <TabsTrigger value="model-papers">Model Papers</TabsTrigger>
//             <TabsTrigger value="prep-roadmap">Prep Roadmap</TabsTrigger>
//           </TabsList>

//           {/* TAB 1: Study Material */}
//           <TabsContent value="study-material">
//             <div className="grid gap-4 mt-8">
//               {/* PLACEHOLDER: 4–5 sample resource entries per subject — swap file field via Sanity once real materials are uploaded. Do not link to non-existent files in production. */}
//               {olympiad.studyMaterial.map((res, i) => (
//                 <FadeIn key={i} delay={i * 0.05} duration={0.3}>
//                   <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
//                         <FileText className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-heading font-semibold text-foreground">
//                           {res.title}
//                         </h3>
//                         <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
//                           {res.type}
//                         </span>
//                       </div>
//                     </div>

//                     <a
//                       href={res.fileUrl}
//                       download
//                       className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
//                       title="Download material"
//                     >
//                       <ArrowDownToLine className="h-3.5 w-3.5 text-primary" />
//                       <span>Download</span>
//                     </a>
//                   </div>
//                 </FadeIn>
//               ))}

//               {olympiad.studyMaterial.length === 0 && (
//                 <div className="text-center py-12 border border-dashed border-border rounded-2xl">
//                   <p className="text-muted-foreground">No study materials uploaded yet.</p>
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//           {/* TAB 2: Model Papers */}
//           <TabsContent value="model-papers">
//             <div className="mt-8 space-y-6">
//               {/* PLACEHOLDER: real papers pending upload */}
//               {sortedYears.map((year) => (
//                 <div key={year}>
//                   <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
//                     <Calendar className="h-4 w-4" />
//                     <span>{year} Question Papers</span>
//                   </div>

//                   <div className="grid gap-4">
//                     {groupedPapers[year].map((paper, i) => (
//                       <FadeIn key={i} delay={i * 0.05} duration={0.3}>
//                         <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
//                           <div className="flex items-center gap-4">
//                             <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
//                               <FileText className="h-5 w-5" />
//                             </div>
//                             <div>
//                               <h3 className="font-heading font-semibold text-foreground">
//                                 {paper.title}
//                               </h3>
//                               <span className="text-xs text-muted-foreground">
//                                 Year: {paper.year}
//                               </span>
//                             </div>
//                           </div>

//                           <a
//                             href={paper.fileUrl}
//                             download
//                             className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
//                           >
//                             <ArrowDownToLine className="h-3.5 w-3.5 text-accent" />
//                             <span>Download Paper</span>
//                           </a>
//                         </div>
//                       </FadeIn>
//                     ))}
//                   </div>
//                 </div>
//               ))}

//               {olympiad.modelPapers.length === 0 && (
//                 <div className="text-center py-12 border border-dashed border-border rounded-2xl">
//                   <p className="text-muted-foreground">No model question papers uploaded yet.</p>
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//           {/* TAB 3: Prep Roadmap */}
//           <TabsContent value="prep-roadmap">
//             <div className="relative pl-8 mt-8 space-y-10 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
//               {olympiad.roadmap.map((step, index) => (
//                 <FadeIn key={index} delay={index * 0.12} duration={0.4} x={-15}>
//                   <div className="relative">
//                     {/* Circle marker */}
//                     <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-primary border-4 border-background ring-2 ring-primary/30" />
                    
//                     <div className="space-y-1.5 bg-card border border-border rounded-2xl p-6">
//                       <div className="text-xs font-semibold uppercase tracking-wider text-primary">
//                         Stage {index + 1}
//                       </div>
//                       <h3 className="font-heading text-xl font-bold text-foreground">
//                         {step.stage}
//                       </h3>
//                       <p className="text-muted-foreground leading-relaxed text-sm">
//                         {step.description}
//                       </p>
//                     </div>
//                   </div>
//                 </FadeIn>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }


import { notFound } from "next/navigation";
import { olympiads, getOlympiadBySlug } from "@/lib/data/olympiads";
import { OlympiadExperience } from "@/components/olympiad/OlympiadExperience";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return olympiads.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const olympiad = getOlympiadBySlug(slug);
  if (!olympiad) return { title: "Olympiad Not Found" };
  return {
    title: `${olympiad.name} Olympiad | NSS Olympiad Hub`,
    description: olympiad.description,
  };
}

export default async function OlympiadDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const olympiad = getOlympiadBySlug(slug);
  if (!olympiad) notFound();

  return <OlympiadExperience slug={slug} />;
}