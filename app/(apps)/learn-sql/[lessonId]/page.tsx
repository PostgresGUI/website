import { Metadata } from "next";
import { module1 } from "@/lib/learn/lessons/module1";
import { LessonPageClient } from "./LessonPageClient";

// Required for static export - generates all lesson routes at build time
export function generateStaticParams() {
  return module1.lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

// Generate metadata for each lesson
export function generateMetadata({
  params,
}: {
  params: { lessonId: string };
}): Metadata {
  const lesson = module1.lessons.find((l) => l.id === params.lessonId);

  if (!lesson) {
    return {
      title: "Lesson Not Found | Learn PostgreSQL",
      description: "The requested lesson could not be found.",
    };
  }

  const lessonNumber = module1.lessons.findIndex((l) => l.id === lesson.id) + 1;
  const totalLessons = module1.lessons.length;

  return {
    title: `${lesson.title} - Learn PostgreSQL Lesson ${lessonNumber} | PostgresGUI`,
    description: `${lesson.description} Part ${lessonNumber} of ${totalLessons} in our interactive PostgreSQL tutorial. Estimated time: ${lesson.estimatedMinutes} minutes.`,
    keywords: [
      "learn postgresql",
      "sql tutorial",
      "postgresql tutorial",
      lesson.title.toLowerCase(),
      "interactive sql",
      "database tutorial",
      "sql lesson",
    ],
    openGraph: {
      title: `${lesson.title} - Learn PostgreSQL`,
      description: lesson.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} - Learn PostgreSQL`,
      description: lesson.description,
    },
    alternates: {
      canonical: `/learn-sql/${lesson.id}`,
    },
  };
}

export default function LessonPage() {
  return <LessonPageClient />;
}
