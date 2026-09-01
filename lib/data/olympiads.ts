import { 
  Sigma, 
  Atom, 
  FlaskConical, 
  Telescope, 
  BrainCircuit, 
  Code2, 
  Leaf, 
  LucideIcon 
} from 'lucide-react'

// --- Types (Sanity Schema Ready) ---

export interface Resource {
  title: string
  type: 'PDF' | 'Video' | 'Link' | 'Doc'
  fileUrl: string // Placeholder for future Sanity file asset
}

export interface ModelPaper {
  title: string
  year: string
  fileUrl: string
}

export interface RoadmapStage {
  stage: string
  description: string
}

export interface Olympiad {
  slug: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  colorVar: string
  studyMaterial: Resource[]
  modelPapers: ModelPaper[]
  roadmap: RoadmapStage[]
}

// --- Shared Roadmap Content ---
const DEFAULT_ROADMAP: RoadmapStage[] = [
  {
    stage: "Foundation",
    description: "Build core concepts from your school syllabus before touching Olympiad-level problems. Focus on accuracy over speed."
  },
  {
    stage: "Problem Practice",
    description: "Work through past national and international papers by topic. Track which problem types consistently trip you up."
  },
  {
    stage: "Timed Mocks",
    description: "Simulate real exam conditions — full-length, timed, no shortcuts. This is where speed and accuracy start to merge."
  },
  {
    stage: "Exam-Ready",
    description: "Final review of weak areas, light practice only. Trust the preparation — this is peak-taper, not cram time."
  }
]

// --- Data ---
export const olympiads: Olympiad[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Numbers don't lie. Neither will your solutions.",
    description: "Master algebra, combinatorics, geometry, and number theory with problems modeled directly on IMO and national Olympiad formats.",
    icon: Sigma,
    colorVar: "--subject-math",
    studyMaterial: [
      { title: "IMO Shortlist 2024 - Algebra", type: "PDF", fileUrl: "#" },
      { title: "Number Theory Basics", type: "Video", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "National Round 2025", year: "2025", fileUrl: "#" },
      { title: "National Round 2024", year: "2024", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  },
  {
    slug: "physics",
    name: "Physics",
    tagline: "Passionate about how the universe actually works? This one's for you.",
    description: "Explore mechanics, thermodynamics, electromagnetism, and modern physics through challenging theoretical and experimental problems.",
    icon: Atom,
    colorVar: "--subject-physics",
    studyMaterial: [
      { title: "IPhO Syllabus Guide", type: "PDF", fileUrl: "#" },
      { title: "Mechanics Problem Set", type: "Doc", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "Physics Bowl 2025", year: "2025", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    tagline: "If reactions excite you more than gossip, welcome home.",
    description: "Dive into organic, inorganic, and physical chemistry with a focus on reaction mechanisms and laboratory intuition.",
    icon: FlaskConical,
    colorVar: "--subject-chemistry",
    studyMaterial: [
      { title: "Organic Chemistry Roadmap", type: "PDF", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "IChO Preparatory Round", year: "2025", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  },
  {
    slug: "astronomy",
    name: "Astronomy",
    tagline: "Ever stared at the sky and needed answers? This one's for you.",
    description: "Study celestial mechanics, astrophysics, and observational techniques to prepare for IOAA and national astronomy challenges.",
    icon: Telescope,
    colorVar: "--subject-astronomy",
    studyMaterial: [
      { title: "Stellar Evolution Notes", type: "PDF", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "IOAA Data Analysis Round", year: "2024", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    tagline: "Built something smarter than your professor? Let's go further.",
    description: "Learn machine learning fundamentals, neural networks, and ethical AI deployment through practical project challenges.",
    icon: BrainCircuit,
    colorVar: "--subject-ai",
    studyMaterial: [
      { title: "Intro to Neural Networks", type: "Video", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "AI Olympiad Qualifier", year: "2025", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  },
  {
    slug: "informatics",
    name: "Informatics",
    tagline: "Think in loops and logic? Time to compete like it.",
    description: "Sharpen your algorithmic thinking, data structures, and competitive programming skills for IOI and national coding rounds.",
    icon: Code2,
    colorVar: "--subject-informatics",
    studyMaterial: [
      { title: "Dynamic Programming Patterns", type: "Link", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "National Informatics Round 1", year: "2025", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  },
  {
    slug: "biology",
    name: "Biology",
    tagline: "Obsessed with how life actually works? This one's for you.",
    description: "Investigate cell biology, genetics, evolution, and ecology with the depth required for IBO and national biology exams.",
    icon: Leaf,
    colorVar: "--subject-biology",
    studyMaterial: [
      { title: "Genetics Crash Course", type: "Video", fileUrl: "#" },
    ],
    modelPapers: [
      { title: "IBO Theory Paper 1", year: "2024", fileUrl: "#" },
    ],
    roadmap: DEFAULT_ROADMAP
  }
]

// Helper to get a single olympiad by slug
export const getOlympiadBySlug = (slug: string) => {
  return olympiads.find((o) => o.slug === slug)
}