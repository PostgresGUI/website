import { Suspense } from "react";
import { Metadata } from "next";
import { module1 } from "@/lib/learn/lessons/module1";
import { PhasePageClient } from "../PhasePageClient";

// Required for static export - generates all lesson routes at build time
export function generateStaticParams() {
  return module1.lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

// Generate metadata for each lesson's context phase
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = module1.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return {
      title: "Lesson Not Found | Learn PostgreSQL",
      description: "The requested lesson could not be found.",
    };
  }

  const lessonNumber = module1.lessons.findIndex((l) => l.id === lesson.id) + 1;
  const totalLessons = module1.lessons.length;

  return {
    title: `${lesson.title} - Context | Learn PostgreSQL Lesson ${lessonNumber} | PostgresGUI`,
    description: `Introduction to ${lesson.title.toLowerCase()}. ${lesson.description} Part ${lessonNumber} of ${totalLessons} in our interactive PostgreSQL tutorial.`,
    keywords: [
      "learn postgresql",
      "sql tutorial",
      "postgresql tutorial",
      lesson.title.toLowerCase(),
      "interactive sql",
      "database tutorial",
      "sql lesson",
      "sql context",
    ],
    openGraph: {
      title: `${lesson.title} - Context | Learn PostgreSQL`,
      description: `Introduction to ${lesson.title.toLowerCase()}. ${lesson.description}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} - Context | Learn PostgreSQL`,
      description: `Introduction to ${lesson.title.toLowerCase()}. ${lesson.description}`,
    },
    alternates: {
      canonical: `/learn-sql/${lesson.id}/context`,
    },
  };
}

export default function ContextPage() {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading lesson...</div>
        </div>
      }
    >
      <PhasePageClient phase="context" />
    </Suspense>
  );
}
