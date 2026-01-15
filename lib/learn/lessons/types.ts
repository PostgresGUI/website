// Phase types
export type PhaseType = 'intro' | 'learn' | 'practice' | 'quiz' | 'cheatsheet';

// Query result from sql.js
export interface QueryResult {
  success: boolean;
  columns?: string[];
  rows?: unknown[][];
  rowCount?: number;
  error?: string;
}

// Validation result for challenges
export interface ValidationResult {
  correct: boolean;
  message: string;
  partialCredit?: number;
}

// Mentor message (Intro phase)
export interface MentorMessage {
  name: string;
  role: string;
  message: string;
  timestamp: string;
  learningObjectives?: string[];
}

// Syntax example (Learn phase)
export interface SyntaxExample {
  title: string;
  syntax: string;
  explanation: string;
}

// Guided practice blank slot
export interface BlankSlot {
  id: string;
  placeholder: string;
  answer: string;
  acceptedAnswers?: string[];
}

// Guided practice (fill-in-the-blank)
export interface GuidedPractice {
  prompt: string;
  template: string;
  blanks: BlankSlot[];
  expectedQuery: string;
  hints: string[];
}

// Quiz task
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  setupSQL?: string;
  hints: [string, string, string];
  validate: (result: QueryResult, query: string) => ValidationResult;
}

// Syntax card (Cheatsheet phase)
export interface SyntaxCard {
  id: string;
  title: string;
  syntax: string;
  examples: string[];
  tips?: string[];
}

// Complete lesson structure
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  shortTitle: string;
  description: string;
  estimatedMinutes: number;
  initialSchema?: string;
  phases: {
    intro: MentorMessage;
    learn: SyntaxExample[];
    practice: GuidedPractice;
    quiz: Challenge[];
    cheatsheet: SyntaxCard;
  };
}

// Module structure
export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

// User progress tracking
export interface LessonProgress {
  currentPhase: number;
  completedPhases: string[];
  completedChallenges: string[];
  hintsUsed: Record<string, number>;
  startedAt: string;
  completedAt?: string;
}

export interface UserProgress {
  completedLessons: string[];
  lessonProgress: Record<string, LessonProgress>;
  lastActiveLesson: string | null;
}

// Schema information for explorer
export interface TableColumn {
  name: string;
  type: string;
}

export interface TableInfo {
  name: string;
  columns: TableColumn[];
  rowCount: number;
}
