
export type SkillLevel = "Mới bắt đầu" | "Trung bình" | "Nâng cao";

export type LearningGoal = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
};

export type LearningResource = {
  id: string;
  title: string;
  type: "Video" | "Article" | "Book" | "Course" | "Practice";
  url?: string;
  description: string;
};

export type LearningStage = {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  goals: LearningGoal[];
  resources: LearningResource[];
  completed: boolean;
};

export type LearningPathway = {
  id: string;
  subject: string;
  currentLevel: SkillLevel;
  targetLevel: string;
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  stages: LearningStage[];
  progress: number; // percentage
};

export type TaskItem = {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  stageId: string;
  priority: "Low" | "Medium" | "High";
};

export type FormData = {
  subject: string;
  currentLevel: SkillLevel;
  targetLevel: string;
  duration: number;
};
