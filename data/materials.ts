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
  "artificial-intelligence": [],
  informatics: [],
  biology: [],
};

export const modelPapers: Record<string, ModelPaperEntry[]> = {
  mathematics: [],
  physics: [],
  chemistry: [],
  astronomy: [],
  "artificial-intelligence": [],
  informatics: [],
  biology: [],
};