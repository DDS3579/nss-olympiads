import {
  Sigma,
  Atom,
  FlaskConical,
  Telescope,
  BrainCircuit,
  Code2,
  Leaf,
  LucideIcon,
} from "lucide-react";

import {
  studyMaterials,
  modelPapers as addedModelPapers,
} from "@/data/materials";

// ---------------------------------------------------------------------------
// Types (Sanity-schema-ready)
// ---------------------------------------------------------------------------
export type MotifKey =
  | "math"
  | "physics"
  | "chemistry"
  | "astronomy"
  | "biology"
  | "informatics"
  | "ai";

export interface Resource {
  title: string;
  type: "PDF" | "Video" | "Link" | "Doc";
  fileUrl: string;
  topicIds?: string[]; // links resource to topics · empty/undefined = general
}

export interface ModelPaper {
  title: string;
  year: string;
  fileUrl: string;
  duration?: string;
  problems?: number;
  difficulty?: number; // 1–5
  topicIds?: string[]; // optional · comprehensive papers can stay untagged
}

export interface RoadmapStage {
  stage: string;
  description: string;
  outcome?: string;
  tasks?: string;
}

export interface Topic {
  id: string;
  name: string;
  blurb: string;
  subtopics: string[];
  problems: number;
  x: number; // constellation coordinate 0–100
  y: number; // constellation coordinate 0–100
  featured?: boolean;
}

export interface ConstellationEdge {
  from: string;
  to: string;
}

export interface FeaturedProblem {
  title: string;
  topic: string;
  source: string;
  statement: string;
  hint: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface OlympiadMeta {
  duration: string;
  difficultyRange: string;
  format: string;
}

export interface SyllabusUnit {
  unit: string;
  weight: string; // e.g. "Core", "High", "Medium"
  topics: string[];
}

export interface Olympiad {
  slug: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  colorVar: string;
  motif: MotifKey;
  disciplines: string[];
  meta: OlympiadMeta;
  topics: Topic[];
  syllabus: SyllabusUnit[];
  edges: ConstellationEdge[];
  featuredProblem: FeaturedProblem;
  studyMaterial: Resource[];
  modelPapers: ModelPaper[];
  roadmap: RoadmapStage[];
  syllabusFileUrl: string;
}

// ---------------------------------------------------------------------------
// Shared roadmap (a trajectory, not a list)
// ---------------------------------------------------------------------------
const DEFAULT_ROADMAP: RoadmapStage[] = [
  {
    stage: "Foundations",
    description:
      "Build core concepts from your school syllabus before touching Olympiad-level problems. Focus on accuracy over speed.",
    outcome: "Confident with fundamentals",
    tasks: "Concept notes · guided problems",
  },
  {
    stage: "Intermediate",
    description:
      "Work through Olympiad problems by topic. Start recognising the patterns that sit behind the problems.",
    outcome: "Topic-level fluency",
    tasks: "Topic sets · pattern logs",
  },
  {
    stage: "Advanced",
    description:
      "Tackle multi-concept and proof-based problems. Develop rigorous, competition-grade arguments.",
    outcome: "Solves hard problems",
    tasks: "Shortlists · proofs",
  },
  {
    stage: "Simulation",
    description:
      "Attempt full-length past papers under real timing. Build stamina and exam temperament.",
    outcome: "Exam-ready speed",
    tasks: "Timed mocks · review",
  },
  {
    stage: "Olympiad",
    description:
      "Final refinement. Light practice, weak-area review, and peak taper before the national round.",
    outcome: "Compete at nationals",
    tasks: "Review · rest · strategy",
  },
];

// ---------------------------------------------------------------------------
// Data — each Olympiad is a different scientific world in the same system
// ---------------------------------------------------------------------------
const baseOlympiads: Olympiad[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    series: "01",
    tagline: "Numbers don't lie. Neither will your solutions.",
    description:
      "Master algebra, combinatorics, geometry, and number theory with problems modeled directly on IMO and national Olympiad formats.",
    icon: Sigma,
    colorVar: "--subject-math",
    motif: "math",
    disciplines: ["Algebra", "Geometry", "Number Theory", "Combinatorics"],
    meta: {
      duration: "18–24 weeks",
      difficultyRange: "Beginner → IMO",
      format: "National → International",
    },
    topics: [
      {
        id: "algebra",
        name: "Algebra",
        featured: true,
        problems: 24,
        x: 50,
        y: 18,
        blurb: "The language of structure and transformation.",
        subtopics: [
          "Equations",
          "Inequalities",
          "Polynomials",
          "Functional equations",
        ],
      },
      {
        id: "geometry",
        name: "Geometry",
        problems: 18,
        x: 80,
        y: 44,
        blurb: "Reasoning about space, shape and proof.",
        subtopics: [
          "Triangles",
          "Circles",
          "Transformations",
          "Projective ideas",
        ],
      },
      {
        id: "number-theory",
        name: "Number Theory",
        problems: 22,
        x: 22,
        y: 50,
        blurb: "The properties of integers and divisibility.",
        subtopics: [
          "Divisibility",
          "Modular arithmetic",
          "Diophantine equations",
          "Primes",
        ],
      },
      {
        id: "combinatorics",
        name: "Combinatorics",
        problems: 20,
        x: 58,
        y: 80,
        blurb: "Counting, structure and extremal arguments.",
        subtopics: [
          "Counting",
          "Graph theory",
          "Pigeonhole",
          "Extremal problems",
        ],
      },
    ],
    syllabus: [
      {
        unit: "Algebra",
        weight: "Core",
        topics: [
          "Equations & inequalities",
          "Polynomials",
          "Functional equations",
          "Sequences & series",
        ],
      },
      {
        unit: "Geometry",
        weight: "Core",
        topics: [
          "Euclidean geometry",
          "Triangles & circles",
          "Transformations",
          "Analytic geometry",
        ],
      },
      {
        unit: "Number Theory",
        weight: "Core",
        topics: [
          "Divisibility",
          "Modular arithmetic",
          "Diophantine equations",
          "Primes & factorization",
        ],
      },
      {
        unit: "Combinatorics",
        weight: "Core",
        topics: [
          "Counting",
          "Graph theory",
          "Pigeonhole principle",
          "Extremal problems",
        ],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "algebra", to: "geometry" },
      { from: "algebra", to: "number-theory" },
      { from: "algebra", to: "combinatorics" },
      { from: "geometry", to: "combinatorics" },
      { from: "number-theory", to: "combinatorics" },
    ],
    featuredProblem: {
      title: "A Functional Equation",
      topic: "Algebra",
      source: "IMO Shortlist",
      difficulty: 4,
      statement:
        "Find all functions f : ℝ → ℝ such that f(x + f(y)) = f(x) + y for every real x and y.",
      hint: "Prove f is bijective, then show it must be additive and equal to the identity.",
    },
    studyMaterial: [
      {
        title: "IMO Shortlist 2024 — Algebra",
        type: "PDF",
        fileUrl: "#",
        topicIds: ["algebra"],
      },
      {
        title: "Number Theory Basics",
        type: "Video",
        fileUrl: "#",
        topicIds: ["number-theory"],
      },
    ],
    modelPapers: [
      {
        title: "National Round 2025",
        year: "2025",
        fileUrl: "#",
        duration: "4 hrs",
        problems: 6,
        difficulty: 4,
      },
      {
        title: "National Round 2024",
        year: "2024",
        fileUrl: "#",
        duration: "4 hrs",
        problems: 6,
        difficulty: 4,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
  {
    slug: "physics",
    name: "Physics",
    series: "02",
    tagline:
      "Passionate about how the universe actually works? This one's for you.",
    description:
      "Explore mechanics, thermodynamics, electromagnetism, and modern physics through challenging theoretical and experimental problems.",
    icon: Atom,
    colorVar: "--subject-physics",
    motif: "physics",
    disciplines: [
      "Mechanics",
      "Electromagnetism",
      "Thermodynamics",
      "Optics",
      "Modern Physics",
    ],
    meta: {
      duration: "16–22 weeks",
      difficultyRange: "Foundation → IPhO",
      format: "National → International",
    },
    topics: [
      {
        id: "mechanics",
        name: "Mechanics",
        featured: true,
        problems: 26,
        x: 18,
        y: 30,
        blurb: "Motion, forces and conservation laws.",
        subtopics: ["Kinematics", "Newton's laws", "Work & energy", "Rotation"],
      },
      {
        id: "electromagnetism",
        name: "Electromagnetism",
        problems: 18,
        x: 58,
        y: 14,
        blurb: "Fields, circuits and induction.",
        subtopics: ["Electrostatics", "Circuits", "Magnetism", "Induction"],
      },
      {
        id: "thermodynamics",
        name: "Thermodynamics",
        problems: 14,
        x: 40,
        y: 56,
        blurb: "Heat, engines and entropy.",
        subtopics: ["Laws of thermo", "Heat engines", "Kinetic theory"],
      },
      {
        id: "optics",
        name: "Optics",
        problems: 12,
        x: 80,
        y: 46,
        blurb: "Light as rays and waves.",
        subtopics: ["Geometric optics", "Waves", "Interference"],
      },
      {
        id: "modern-physics",
        name: "Modern Physics",
        problems: 10,
        x: 62,
        y: 84,
        blurb: "Where classical intuition breaks.",
        subtopics: ["Relativity", "Quantum ideas", "Nuclear"],
      },
    ],
    syllabus: [
      {
        unit: "Mechanics",
        weight: "High",
        topics: ["Kinematics", "Newton's laws", "Work & energy", "Rotation & momentum"],
      },
      {
        unit: "Electromagnetism",
        weight: "High",
        topics: ["Electrostatics", "DC circuits", "Magnetism", "Induction"],
      },
      {
        unit: "Thermodynamics",
        weight: "Medium",
        topics: ["Laws of thermodynamics", "Heat engines", "Kinetic theory"],
      },
      {
        unit: "Optics & Waves",
        weight: "Medium",
        topics: ["Geometric optics", "Wave optics", "Interference & diffraction"],
      },
      {
        unit: "Modern Physics",
        weight: "Medium",
        topics: ["Relativity", "Quantum phenomena", "Nuclear physics"],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "mechanics", to: "electromagnetism" },
      { from: "mechanics", to: "thermodynamics" },
      { from: "electromagnetism", to: "optics" },
      { from: "thermodynamics", to: "modern-physics" },
      { from: "optics", to: "modern-physics" },
      { from: "mechanics", to: "optics" },
    ],
    featuredProblem: {
      title: "Escape Velocity",
      topic: "Mechanics",
      source: "IPhO Preparation",
      difficulty: 3,
      statement:
        "A body is projected vertically from Earth's surface. Find the minimum speed needed to escape Earth's gravitational field, neglecting air resistance.",
      hint: "Conserve mechanical energy between the surface and infinity.",
    },
    studyMaterial: [
      {
        title: "IPhO Syllabus Guide",
        type: "PDF",
        fileUrl: "#",
        topicIds: [
          "mechanics",
          "electromagnetism",
          "thermodynamics",
          "optics",
          "modern-physics",
        ],
      },
      {
        title: "Mechanics Problem Set",
        type: "Doc",
        fileUrl: "#",
        topicIds: ["mechanics"],
      },
    ],
    modelPapers: [
      {
        title: "National Selection 2025",
        year: "2025",
        fileUrl: "#",
        duration: "4 hrs",
        problems: 6,
        difficulty: 4,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    series: "03",
    tagline: "If reactions excite you more than gossip, welcome home.",
    description:
      "Dive into organic, inorganic, and physical chemistry with a focus on reaction mechanisms and laboratory intuition.",
    icon: FlaskConical,
    colorVar: "--subject-chemistry",
    motif: "chemistry",
    disciplines: ["Physical", "Organic", "Inorganic", "Analytical"],
    meta: {
      duration: "16–20 weeks",
      difficultyRange: "Foundation → IChO",
      format: "National → International",
    },
    topics: [
      {
        id: "physical",
        name: "Physical Chemistry",
        featured: true,
        problems: 20,
        x: 30,
        y: 20,
        blurb: "The quantitative backbone of chemistry.",
        subtopics: [
          "Kinetics",
          "Equilibrium",
          "Electrochemistry",
          "Thermodynamics",
        ],
      },
      {
        id: "organic",
        name: "Organic Chemistry",
        problems: 22,
        x: 72,
        y: 26,
        blurb: "Mechanisms and molecular design.",
        subtopics: ["Mechanisms", "Stereochemistry", "Spectroscopy"],
      },
      {
        id: "inorganic",
        name: "Inorganic Chemistry",
        problems: 16,
        x: 50,
        y: 54,
        blurb: "Structure, bonding and the periodic table.",
        subtopics: ["Coordination", "Periodic trends", "Bonding"],
      },
      {
        id: "analytical",
        name: "Analytical Chemistry",
        problems: 12,
        x: 28,
        y: 80,
        blurb: "Measuring what matter is made of.",
        subtopics: ["Titrations", "Qualitative analysis"],
      },
    ],
    syllabus: [
      {
        unit: "Physical Chemistry",
        weight: "High",
        topics: ["Thermodynamics", "Kinetics", "Equilibrium", "Electrochemistry"],
      },
      {
        unit: "Organic Chemistry",
        weight: "High",
        topics: ["Reaction mechanisms", "Stereochemistry", "Functional groups", "Synthesis"],
      },
      {
        unit: "Inorganic Chemistry",
        weight: "Medium",
        topics: ["Periodic trends", "Coordination compounds", "Chemical bonding"],
      },
      {
        unit: "Analytical Chemistry",
        weight: "Medium",
        topics: ["Titrations", "Spectroscopy", "Qualitative analysis"],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "physical", to: "organic" },
      { from: "physical", to: "inorganic" },
      { from: "organic", to: "analytical" },
      { from: "inorganic", to: "analytical" },
      { from: "physical", to: "analytical" },
    ],
    featuredProblem: {
      title: "Weak Acid Equilibrium",
      topic: "Physical Chemistry",
      source: "IChO Preparatory",
      difficulty: 3,
      statement:
        "A 0.1 M solution of a weak acid HA has pH 3. Estimate the acid dissociation constant Ka.",
      hint: "Use Ka ≈ [H+]² / (c − [H+]) with [H+] = 10⁻³.",
    },
    studyMaterial: [
      {
        title: "Organic Chemistry Roadmap",
        type: "PDF",
        fileUrl: "#",
        topicIds: ["organic"],
      },
    ],
    modelPapers: [
      {
        title: "IChO Preparatory Round",
        year: "2025",
        fileUrl: "#",
        duration: "5 hrs",
        problems: 8,
        difficulty: 4,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
  {
    slug: "astronomy",
    name: "Astronomy",
    series: "04",
    tagline: "Ever stared at the sky and needed answers? This one's for you.",
    description:
      "Study celestial mechanics, astrophysics, and observational techniques to prepare for IOAA and national astronomy challenges.",
    icon: Telescope,
    colorVar: "--subject-astronomy",
    motif: "astronomy",
    disciplines: [
      "Celestial Mechanics",
      "Stellar Physics",
      "Observational",
      "Cosmology",
    ],
    meta: {
      duration: "12–18 weeks",
      difficultyRange: "Beginner → IOAA",
      format: "National → International",
    },
    topics: [
      {
        id: "celestial-mechanics",
        name: "Celestial Mechanics",
        featured: true,
        problems: 16,
        x: 50,
        y: 20,
        blurb: "Orbits and the mathematics of the sky.",
        subtopics: ["Orbits", "Kepler's laws", "Perturbations"],
      },
      {
        id: "stellar",
        name: "Stellar Physics",
        problems: 14,
        x: 22,
        y: 48,
        blurb: "How stars live and die.",
        subtopics: ["Stellar structure", "Evolution", "Magnitudes"],
      },
      {
        id: "observational",
        name: "Observational Astronomy",
        problems: 12,
        x: 78,
        y: 42,
        blurb: "Tools and techniques of the observer.",
        subtopics: ["Telescopes", "Coordinates", "Imaging"],
      },
      {
        id: "cosmology",
        name: "Cosmology",
        problems: 10,
        x: 52,
        y: 80,
        blurb: "The universe at the largest scale.",
        subtopics: ["Expansion", "Distance ladder", "CMB"],
      },
    ],
    syllabus: [
      {
        unit: "Celestial Mechanics",
        weight: "High",
        topics: ["Orbital motion", "Kepler's laws", "Gravitation"],
      },
      {
        unit: "Stellar Physics",
        weight: "High",
        topics: ["Stellar structure", "Stellar evolution", "Magnitudes & luminosity"],
      },
      {
        unit: "Observational Astronomy",
        weight: "Medium",
        topics: ["Telescopes", "Coordinate systems", "Imaging & photometry"],
      },
      {
        unit: "Cosmology",
        weight: "Medium",
        topics: ["Expansion of the universe", "Distance ladder", "Cosmic microwave background"],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "celestial-mechanics", to: "stellar" },
      { from: "celestial-mechanics", to: "observational" },
      { from: "observational", to: "cosmology" },
      { from: "stellar", to: "cosmology" },
      { from: "celestial-mechanics", to: "cosmology" },
    ],
    featuredProblem: {
      title: "Binary Star Masses",
      topic: "Celestial Mechanics",
      source: "IOAA Data Round",
      difficulty: 4,
      statement:
        "Two stars orbit their common centre of mass with period P and separation a. Express the total mass of the system.",
      hint: "Apply Kepler's third law: M = 4π²a³ / (G P²).",
    },
    studyMaterial: [
      {
        title: "Stellar Evolution Notes",
        type: "PDF",
        fileUrl: "#",
        topicIds: ["stellar"],
      },
    ],
    modelPapers: [
      {
        title: "IOAA Data Analysis Round",
        year: "2024",
        fileUrl: "#",
        duration: "3 hrs",
        problems: 5,
        difficulty: 4,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
  {
    slug: "ai",
    name: "Artificial Intelligence",
    series: "05",
    tagline: "Built something smarter than your professor? Let's go further.",
    description:
      "Learn machine learning fundamentals, neural networks, and ethical AI deployment through practical project challenges.",
    icon: BrainCircuit,
    colorVar: "--subject-ai",
    motif: "ai",
    disciplines: [
      "Machine Learning",
      "Neural Networks",
      "Optimization",
      "Probabilistic Models",
      "Computer Vision",
      "NLP",
    ],
    meta: {
      duration: "12–18 weeks",
      difficultyRange: "Beginner → IOAI",
      format: "National → International",
    },
    topics: [
      {
        id: "machine-learning",
        name: "Machine Learning",
        featured: true,
        problems: 24,
        x: 50,
        y: 14,
        blurb: "Learning patterns from data.",
        subtopics: ["Supervised", "Unsupervised", "Evaluation"],
      },
      {
        id: "neural-networks",
        name: "Neural Networks",
        problems: 18,
        x: 24,
        y: 40,
        blurb: "Layered models that approximate anything.",
        subtopics: ["Architectures", "Backprop", "Regularisation"],
      },
      {
        id: "optimization",
        name: "Optimization",
        problems: 14,
        x: 76,
        y: 40,
        blurb: "Finding the best parameters.",
        subtopics: ["Gradient descent", "Convexity", "Hyperparameters"],
      },
      {
        id: "probabilistic",
        name: "Probabilistic Models",
        problems: 12,
        x: 36,
        y: 70,
        blurb: "Reasoning under uncertainty.",
        subtopics: ["Bayes", "Distributions", "Inference"],
      },
      {
        id: "computer-vision",
        name: "Computer Vision",
        problems: 12,
        x: 64,
        y: 72,
        blurb: "Teaching machines to see.",
        subtopics: ["Convolution", "Detection", "Segmentation"],
      },
      {
        id: "nlp",
        name: "NLP",
        problems: 10,
        x: 50,
        y: 88,
        blurb: "Language as a learning problem.",
        subtopics: ["Tokenisation", "Embeddings", "Transformers"],
      },
    ],
    syllabus: [
      {
        unit: "Machine Learning",
        weight: "High",
        topics: ["Supervised learning", "Unsupervised learning", "Model evaluation"],
      },
      {
        unit: "Neural Networks",
        weight: "High",
        topics: ["Architectures", "Backpropagation", "Regularization"],
      },
      {
        unit: "Optimization",
        weight: "Medium",
        topics: ["Gradient descent", "Loss functions", "Hyperparameters"],
      },
      {
        unit: "Probabilistic Models",
        weight: "Medium",
        topics: ["Bayesian reasoning", "Distributions", "Inference"],
      },
      {
        unit: "Applications",
        weight: "Medium",
        topics: ["Computer vision", "NLP", "Ethics & safety"],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "machine-learning", to: "neural-networks" },
      { from: "machine-learning", to: "optimization" },
      { from: "neural-networks", to: "computer-vision" },
      { from: "neural-networks", to: "nlp" },
      { from: "optimization", to: "probabilistic" },
      { from: "probabilistic", to: "machine-learning" },
      { from: "computer-vision", to: "nlp" },
    ],
    featuredProblem: {
      title: "Gradient Descent Update",
      topic: "Optimization",
      source: "IOAI Qualifier",
      difficulty: 2,
      statement:
        "State the parameter update rule for gradient descent on a loss L(θ) with learning rate η.",
      hint: "θ ← θ − η∇L(θ).",
    },
    studyMaterial: [
      {
        title: "Intro to Neural Networks",
        type: "Video",
        fileUrl: "#",
        topicIds: ["neural-networks"],
      },
    ],
    modelPapers: [
      {
        title: "AI Olympiad Qualifier",
        year: "2025",
        fileUrl: "#",
        duration: "2 hrs",
        problems: 4,
        difficulty: 3,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
  {
    slug: "informatics",
    name: "Informatics",
    series: "06",
    tagline: "Think in loops and logic? Time to compete like it.",
    description:
      "Sharpen your algorithmic thinking, data structures, and competitive programming skills for IOI and national coding rounds.",
    icon: Code2,
    colorVar: "--subject-informatics",
    motif: "informatics",
    disciplines: [
      "Data Structures",
      "Algorithms",
      "Graph Theory",
      "Dynamic Programming",
    ],
    meta: {
      duration: "14–20 weeks",
      difficultyRange: "Beginner → IOI",
      format: "National → International",
    },
    topics: [
      {
        id: "data-structures",
        name: "Data Structures",
        featured: true,
        problems: 22,
        x: 50,
        y: 14,
        blurb: "Organising data for speed.",
        subtopics: ["Arrays", "Trees", "Heaps", "Hash maps"],
      },
      {
        id: "algorithms",
        name: "Algorithms",
        problems: 28,
        x: 24,
        y: 46,
        blurb: "Step-by-step problem solving.",
        subtopics: ["Sorting", "Searching", "Greedy", "Complexity"],
      },
      {
        id: "graph-theory",
        name: "Graph Theory",
        problems: 18,
        x: 76,
        y: 46,
        blurb: "Networks, paths and connectivity.",
        subtopics: ["Traversal", "Shortest paths", "MST"],
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        problems: 20,
        x: 50,
        y: 80,
        blurb: "Breaking problems into overlapping subproblems.",
        subtopics: ["Memoisation", "Subsequences", "Intervals"],
      },
    ],
    syllabus: [
      {
        unit: "Data Structures",
        weight: "High",
        topics: ["Arrays & strings", "Trees", "Heaps", "Hash maps"],
      },
      {
        unit: "Algorithms",
        weight: "High",
        topics: ["Sorting", "Searching", "Greedy methods", "Complexity analysis"],
      },
      {
        unit: "Graph Theory",
        weight: "High",
        topics: ["Traversal", "Shortest paths", "Minimum spanning trees", "Network flow"],
      },
      {
        unit: "Dynamic Programming",
        weight: "High",
        topics: ["Memoization", "Subsequences", "Interval DP"],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "data-structures", to: "algorithms" },
      { from: "algorithms", to: "graph-theory" },
      { from: "algorithms", to: "dynamic-programming" },
      { from: "graph-theory", to: "dynamic-programming" },
      { from: "data-structures", to: "graph-theory" },
    ],
    featuredProblem: {
      title: "Merge Sort Recurrence",
      topic: "Algorithms",
      source: "National Round",
      difficulty: 2,
      statement:
        "Give the time complexity of merge sort and justify it from its recurrence.",
      hint: "T(n) = 2T(n/2) + O(n), which solves to O(n log n).",
    },
    studyMaterial: [
      {
        title: "Dynamic Programming Patterns",
        type: "Link",
        fileUrl: "#",
        topicIds: ["dynamic-programming"],
      },
    ],
    modelPapers: [
      {
        title: "National Informatics Round 1",
        year: "2025",
        fileUrl: "#",
        duration: "3 hrs",
        problems: 4,
        difficulty: 3,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
  {
    slug: "biology",
    name: "Biology",
    series: "07",
    tagline: "Obsessed with how life actually works? This one's for you.",
    description:
      "Investigate cell biology, genetics, evolution, and ecology with the depth required for IBO and national biology exams.",
    icon: Leaf,
    colorVar: "--subject-biology",
    motif: "biology",
    disciplines: [
      "Cell Biology",
      "Genetics",
      "Physiology",
      "Ecology",
      "Evolution",
    ],
    meta: {
      duration: "16–22 weeks",
      difficultyRange: "Foundation → IBO",
      format: "National → International",
    },
    topics: [
      {
        id: "cell",
        name: "Cell Biology",
        featured: true,
        problems: 20,
        x: 50,
        y: 16,
        blurb: "The fundamental unit of life.",
        subtopics: ["Membranes", "Organelles", "Cell cycle"],
      },
      {
        id: "genetics",
        name: "Genetics",
        problems: 18,
        x: 26,
        y: 44,
        blurb: "Inheritance and gene expression.",
        subtopics: ["Inheritance", "Gene expression", "Pedigrees"],
      },
      {
        id: "physiology",
        name: "Physiology",
        problems: 16,
        x: 74,
        y: 40,
        blurb: "How living systems function.",
        subtopics: ["Systems", "Homeostasis"],
      },
      {
        id: "ecology",
        name: "Ecology",
        problems: 12,
        x: 34,
        y: 76,
        blurb: "Organisms and their environments.",
        subtopics: ["Populations", "Ecosystems"],
      },
      {
        id: "evolution",
        name: "Evolution",
        problems: 14,
        x: 68,
        y: 78,
        blurb: "The unifying theory of biology.",
        subtopics: ["Natural selection", "Phylogeny"],
      },
    ],
    syllabus: [
      {
        unit: "Cell Biology",
        weight: "High",
        topics: ["Cell structure", "Membranes & transport", "Cell cycle"],
      },
      {
        unit: "Genetics",
        weight: "High",
        topics: ["Inheritance", "Gene expression", "Pedigree analysis"],
      },
      {
        unit: "Physiology",
        weight: "Medium",
        topics: ["Body systems", "Homeostasis"],
      },
      {
        unit: "Ecology & Evolution",
        weight: "Medium",
        topics: ["Ecosystems", "Natural selection", "Phylogeny"],
      },
    ],
    syllabusFileUrl: "#",
    edges: [
      { from: "cell", to: "genetics" },
      { from: "cell", to: "physiology" },
      { from: "genetics", to: "evolution" },
      { from: "physiology", to: "ecology" },
      { from: "ecology", to: "evolution" },
      { from: "genetics", to: "physiology" },
    ],
    featuredProblem: {
      title: "Dihybrid Cross",
      topic: "Genetics",
      source: "IBO Theory",
      difficulty: 2,
      statement:
        "In a dihybrid cross AaBb × AaBb, what fraction of offspring display both dominant phenotypes?",
      hint: "Independent assortment gives 9/16.",
    },
    studyMaterial: [
      {
        title: "Genetics Crash Course",
        type: "Video",
        fileUrl: "#",
        topicIds: ["genetics"],
      },
    ],
    modelPapers: [
      {
        title: "IBO Theory Paper 1",
        year: "2024",
        fileUrl: "#",
        duration: "3 hrs",
        problems: 30,
        difficulty: 3,
      },
    ],
    roadmap: DEFAULT_ROADMAP,
  },
];

// ---------------------------------------------------------------------------
// Merge with CMS-added materials (kept exactly as before)
// ---------------------------------------------------------------------------
export const olympiads: Olympiad[] = baseOlympiads.map((olympiad) => {
  const addedStudyMaterials = studyMaterials[olympiad.slug] ?? [];
  const addedPapers = addedModelPapers[olympiad.slug] ?? [];

  return {
    ...olympiad,
    studyMaterial: [
      ...addedStudyMaterials,
      ...olympiad.studyMaterial.filter((item) => item.fileUrl !== "#"),
    ],
    modelPapers: [
      ...addedPapers,
      ...olympiad.modelPapers.filter((item) => item.fileUrl !== "#"),
    ],
  };
});

export const getOlympiadBySlug = (slug: string) =>
  olympiads.find((o) => o.slug === slug);

export function getOlympiadStats(o: Olympiad) {
  return {
    topics: o.topics.length,
    problems: o.topics.reduce((sum, t) => sum + t.problems, 0),
    resources: o.studyMaterial.length,
    papers: o.modelPapers.length,
  };
}
