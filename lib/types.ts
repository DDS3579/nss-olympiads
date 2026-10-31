export type Level = "district" | "province" | "national" | "international";
export type IconKey = "sigma" | "atom" | "flask" | "telescope" | "brain" | "code" | "leaf";
export type MotifKey = "math" | "physics" | "chemistry" | "astronomy" | "biology" | "informatics" | "ai";
export type ResourceType = "book" | "handout" | "course" | "video" | "tool" | "dataset" | "official" | "problemset" | "mock" | "pastpaper";
export type Access = "ok" | "caveat" | "dead" | "unknown";
export type Origin = "external" | "nss-original" | "nss-ai-assisted";
export type Kind = "external" | "hosted" | "page";
export type DateStatus = "upcoming" | "past" | "unknown";

export interface Provenance {
  id: string;                      // kebab-case, globally unique, STABLE (progress is keyed on it)
  title: string;
  levels: Level[];                 // ≥ 1
  topics: string[];                // ids from topics.json (official taxonomy)
  nepalSpecific: boolean;          // see §2.2 definition (OPEN-QUESTIONS Q9)
  author?: string;
  lang?: "en" | "ne";
  access: Access;                  // dead ⇒ not publishable
  accessNote?: string;             // required when access = "caveat"
  licence?: string;                // "CC BY-NC-SA 4.0" | "proprietary — link only" | …
  hostable?: boolean;
  verified: string;                // ISO YYYY-MM-DD (date a human opened it)
  why: string;                     // ≤ 160 chars ideal, ≤ 220 max — the "curation" sentence
  highlight?: boolean;             // ⭐ recommended
  origin: Origin;
  reviewedBy?: string; reviewedAt?: string;   // mandatory for nss-* origins
  gapId?: string;                  // which gap an original fills
  needsReview?: boolean;           // true on drafts; blocks strict validation
  sourceIds?: string[];            // original research-file ids (S13, P4…) — audit trail
}

export interface Resource extends Provenance {
  type: ResourceType;
  kind: Kind;
  url: string;                     // https URL, or /materials/… for hosted, or /olympiads/<slug>/guides/<id> for page
  extraLinks?: { label: string; url: string }[];
  format?: string;                 // "PDF, 91 pp"
  sizeBytes?: number;              // computed for hosted
}

export type FileKind = "questions" | "solutions" | "marking" | "answer-sheet" | "results" | "syllabus";

export interface Paper extends Provenance {
  type: "pastpaper" | "official" | "mock" | "problemset" | "tool";
  year: number | null;
  round?: string;                  // e.g. "Round 1 (Pre-selection)"
  files: { label: string; url: string; kind: FileKind }[];     // ≥ 1
  format: { duration: string | null; marks: number | null; questions: string | null; calculator: string | null; negativeMarking: string | boolean | null };
  hasSolutions: boolean;           // MUST be explicit — "No official solutions" is a feature
  alsoContains?: string[];         // e.g. ["Official NePhO pre-selection syllabus"]
  sourcesCited?: string[];         // e.g. ["USAMO 2017","Baltic Way 2019 P3"]
  kindHosting?: Kind;
}

export interface Topic {
  id: string; name: string; blurb: string;
  levels: Level[]; subtopics: string[];
  featured?: boolean;
  prereqs?: string[];              // draw edges only from this
  gap?: boolean; gapSubstituteId?: string | null;
  officialWeight?: number | null;  // %
}

export interface SyllabusSection {
  id: string; name: string; topicId?: string;
  round: Level | Level[];
  source: { label: string; url: string };
  items: string[];
  officialWeight?: number | null;
  ioiCategory?: "included-unlimited" | "included-to-be-defined" | "included-not-for-description" | "outside-of-focus" | "excluded-open" | "excluded" | null;
  nebCoverage?: "full" | "partial" | "none" | null;
  nebNote?: string;
  nepalMaterialExists?: boolean;
}

export interface RoundDate { label: string; iso: string | null; status: DateStatus }

export interface Round {
  level: Level; name: string;
  format?: string | null; marking?: string | null; calculator?: string | null;
  eligibility?: string | null; registration?: string | null; centres?: string | null;
  dates: RoundDate[];
  source: { label: string; url: string };
}

export interface RoadmapStage {
  id: string; level: Level; title: string; what: string; facts?: string[];
  when?: RoundDate;
  actions: ({ label: string; kind: "resource"; ref: string } | { label: string; kind: "filter"; filters: Partial<Record<"level"|"topic"|"type"|"q", string>>; scroll: "library" | "papers" | "syllabus" } | { label: string; kind: "link"; url: string })[];
  outcome: string;
  placeholder?: boolean;
}

export interface FeaturedProblem {
  id: string; title: string; topicId: string; level: Level; difficulty: 1|2|3|4|5;
  statement: string; hint: string; solutionUrl?: string | null;
  source: { label: string; url: string };
  verified: boolean; verifiedBy?: string; verifiedOn?: string;
}

export interface Gap {
  id: string; level: string; title: string; priority: "P1" | "P2" | "P3";
  aiSpec: string; status: "open" | "drafting" | "in-review" | "published"; publishedId?: string;
}

export interface Contact { body: string; role: string; links: { label: string; url: string }[]; email?: string; phone?: string }

export interface SubjectMeta {
  slug: string; name: string; series: string;
  iconKey: IconKey; colorVar: string; motif: MotifKey;
  tagline: string; description: string; grades: string | null;
  organiser: { name: string; url?: string };
  levels: Record<Level, { exists: boolean; label: string; officialName: string | null; honestNote?: string }>;
  rounds: Round[]; contacts: Contact[];
  syllabusFileUrl: string;
  syllabusMeta?: {
    officialVerified: boolean;
    verifiedOn?: string;
    levelCounts?: Record<string, number>;
    pdfUnderReview?: boolean;                       // T4.9 — "Syllabus PDF is being re-checked"
    weightSource?: { label: string; url: string };  // T4.9 — whose weights these are (IBO etc.)
  };
  updatedAt: string;
}

export interface SubjectData {
  meta: SubjectMeta; topics: Topic[]; resources: Resource[]; papers: Paper[];
  syllabus: SyllabusSection[]; roadmap: RoadmapStage[]; featured: FeaturedProblem[]; gaps: Gap[];
}

export type SubjectIndexItem = Pick<SubjectMeta, "slug"|"name"|"series"|"iconKey"|"colorVar"|"tagline"|"grades"> & {
  levels: Record<Level, { exists: boolean; label: string }>; counts: { resources: number; papers: number; nepal: number };
};

export interface CountryRecord {
  subject: string; contest: string; gold: number; silver: number; bronze: number; hm: number; other?: string;
  firstYear: number | null; appearances?: number;
  note?: string;
  medallists: { name: string; year: number; award: string; rank?: number; school?: string }[];
  source: string;                   // official database URL
}