import { Metadata } from "next";
import { module1 } from "./lessons/module1";

export type LessonPhase = "intro" | "learn" | "practice" | "cheatsheet";

interface PhaseMetaConfig {
  titlePrefix: string;
  descriptionPrefix: string;
  keywords: string[];
}

const PHASE_CONFIG: Record<LessonPhase, PhaseMetaConfig> = {
  intro: {
    titlePrefix: "Introduction",
    descriptionPrefix: "Introduction to",
    keywords: ["sql introduction"],
  },
  learn: {
    titlePrefix: "Learn",
    descriptionPrefix: "Learn the SQL concepts and syntax for",
    keywords: ["sql concepts", "sql syntax"],
  },
  practice: {
    titlePrefix: "Practice",
    descriptionPrefix: "Practice writing SQL queries for",
    keywords: ["sql practice", "sql exercises"],
  },
  cheatsheet: {
    titlePrefix: "Cheatsheet",
    descriptionPrefix: "SQL cheatsheet and quick reference for",
    keywords: ["sql cheatsheet", "sql reference"],
  },
};

const BASE_KEYWORDS = [
  "learn postgresql",
  "sql tutorial",
  "postgresql tutorial",
  "interactive sql",
  "database tutorial",
  "sql lesson",
];

const NOT_FOUND_METADATA: Metadata = {
  title: "Lesson Not Found | Learn PostgreSQL",
  description: "The requested lesson could not be found.",
};

export function findLesson(lessonId: string) {
  return module1.lessons.find((l) => l.id === lessonId);
}

export function getLessonNumbers(lessonId: string) {
  const lessonIndex = module1.lessons.findIndex((l) => l.id === lessonId);
  return {
    lessonNumber: lessonIndex + 1,
    totalLessons: module1.lessons.length,
  };
}

export async function generateLessonPhaseMetadata(
  params: Promise<{ lessonId: string }>,
  phase: LessonPhase
): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = findLesson(lessonId);

  if (!lesson) {
    return NOT_FOUND_METADATA;
  }

  const { lessonNumber, totalLessons } = getLessonNumbers(lessonId);
  const config = PHASE_CONFIG[phase];
  const lowerTitle = lesson.title.toLowerCase();

  return {
    title: `${lesson.title} - ${config.titlePrefix} | Learn PostgreSQL Lesson ${lessonNumber} | PostgresGUI`,
    description: `${config.descriptionPrefix} ${lowerTitle}. ${lesson.description} Part ${lessonNumber} of ${totalLessons} in our interactive PostgreSQL tutorial.`,
    keywords: [
      ...BASE_KEYWORDS,
      lowerTitle,
      ...config.keywords,
    ],
    openGraph: {
      title: `${lesson.title} - ${config.titlePrefix} | Learn PostgreSQL`,
      description: `${config.descriptionPrefix} ${lowerTitle}. ${lesson.description}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} - ${config.titlePrefix} | Learn PostgreSQL`,
      description: `${config.descriptionPrefix} ${lowerTitle}. ${lesson.description}`,
    },
    alternates: {
      canonical: `/learn-sql/${lesson.id}/${phase}`,
    },
  };
}

export async function generateChallengeMetadata(
  params: Promise<{ lessonId: string; challengeId: string }>
): Promise<Metadata> {
  const { lessonId, challengeId } = await params;
  const lesson = findLesson(lessonId);

  if (!lesson) {
    return NOT_FOUND_METADATA;
  }

  const challenge = lesson.phases.quiz.find((c) => c.id === challengeId);

  if (!challenge) {
    return {
      title: "Quiz Not Found | Learn PostgreSQL",
      description: "The requested quiz could not be found.",
    };
  }

  const { lessonNumber, totalLessons } = getLessonNumbers(lessonId);
  const challengeIndex = lesson.phases.quiz.findIndex((c) => c.id === challengeId) + 1;
  const totalChallenges = lesson.phases.quiz.length;

  return {
    title: `${challenge.title} - Quiz ${challengeIndex} | ${lesson.title} | Learn PostgreSQL | PostgresGUI`,
    description: `${challenge.description} Part of ${lesson.title.toLowerCase()}. ${lesson.description} Quiz ${challengeIndex} of ${totalChallenges} in lesson ${lessonNumber} of ${totalLessons}.`,
    keywords: [
      ...BASE_KEYWORDS,
      lesson.title.toLowerCase(),
      "sql quiz",
      "sql practice",
      challenge.difficulty,
    ],
    openGraph: {
      title: `${challenge.title} - Quiz | ${lesson.title} | Learn PostgreSQL`,
      description: challenge.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${challenge.title} - Quiz | ${lesson.title}`,
      description: challenge.description,
    },
    alternates: {
      canonical: `/learn-sql/${lesson.id}/quiz/${challenge.id}`,
    },
  };
}
