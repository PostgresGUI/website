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

// Generate metadata for each lesson's practice phase
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
    title: `${lesson.title} - Practice | Learn PostgreSQL Lesson ${lessonNumber} | PostgresGUI`,
    description: `Practice writing SQL queries for ${lesson.title.toLowerCase()}. ${lesson.description} Part ${lessonNumber} of ${totalLessons} in our interactive PostgreSQL tutorial.`,
    keywords: [
      "learn postgresql",
      "sql tutorial",
      "postgresql tutorial",
      lesson.title.toLowerCase(),
      "interactive sql",
      "database tutorial",
      "sql lesson",
      "sql practice",
      "sql exercises",
    ],
    openGraph: {
      title: `${lesson.title} - Practice | Learn PostgreSQL`,
      description: `Practice writing SQL queries for ${lesson.title.toLowerCase()}. ${lesson.description}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} - Practice | Learn PostgreSQL`,
      description: `Practice writing SQL queries for ${lesson.title.toLowerCase()}. ${lesson.description}`,
    },
    alternates: {
      canonical: `/learn-sql/${lesson.id}/practice`,
    },
  };
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading lesson...</div>
        </div>
      }
    >
      <PhasePageClient phase="guided" />
    </Suspense>
  );
}
