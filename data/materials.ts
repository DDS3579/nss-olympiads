export type MaterialType = "PDF" | "Video" | "Link" | "Doc";

export interface StudyMaterialEntry {
  title: string;
  type: MaterialType;
  fileUrl: string;
}

export interface ModelPaperEntry {
  title: string;
  year: string;
  fileUrl: string;
}

export const studyMaterials: Record<string, StudyMaterialEntry[]> = {
  mathematics: [],
  physics: [],
  chemistry: [],
  astronomy: [],
  ai: [],
  informatics: [],
  biology: [],
};

export const modelPapers: Record<string, ModelPaperEntry[]> = {
  mathematics: [
    {
      title: "Mathematics District Level 2026 - Paper 1",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-1.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 2",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-2.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 3",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-3.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 4",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-4.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 5",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-5.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 6",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-6.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 7",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-7.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 8",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-8.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Paper 9",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-9.pdf",
    },
        {
      title: "Mathematics District Level 2026 - Answers",
      year: "2026",
      fileUrl: "/materials/mathematics/papers/district-level-2026/math-district-q-2026-answers.pdf",
    },
  ],
  physics: [],
  chemistry: [],
  astronomy: [],
  ai: [],
  informatics: [],
  biology: [],
};