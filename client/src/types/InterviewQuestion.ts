export interface InterviewQuestion {
  key: string;
  title: string;
  question: string;
  priority?: Priority;
  time?: number;
  levels: Record<string, string[]>;
}

export enum Priority {
  Critical = "Critical",
  High = "High",
  Standard = "Standard",
  Low = "Low",
  Cosmetic = "Cosmetic",
}
