import { Suspense } from "react";
import { Metadata } from "next";
import { module1 } from "@/lib/learn/lessons/module1";
import { PhasePageClient } from "../../PhasePageClient";

// Required for static export - generates all challenge routes at build time
export function generateStaticParams() {
  const params: Array<{ lessonId: string; challengeId: string }> = [];
  
  for (const lesson of module1.lessons) {
    for (const challenge of lesson.phases.challenges) {
      params.push({
        lessonId: lesson.id,
        challengeId: challenge.id,
      });
    }
  }
  
  return params;
}

// Generate metadata for each challenge
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string; challengeId: string }>;
}): Promise<Metadata> {
  const { lessonId, challengeId } = await params;
  const lesson = module1.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return {
      title: "Lesson Not Found | Learn PostgreSQL",
      description: "The requested lesson could not be found.",
    };
  }

  const challenge = lesson.phases.challenges.find((c) => c.id === challengeId);

  if (!challenge) {
    return {
      title: "Challenge Not Found | Learn PostgreSQL",
      description: "The requested challenge could not be found.",
    };
  }

  const lessonNumber = module1.lessons.findIndex((l) => l.id === lesson.id) + 1;
  const totalLessons = module1.lessons.length;
  const challengeIndex = lesson.phases.challenges.findIndex((c) => c.id === challengeId) + 1;
  const totalChallenges = lesson.phases.challenges.length;

  return {
    title: `${challenge.title} - Challenge ${challengeIndex} | ${lesson.title} | Learn PostgreSQL | PostgresGUI`,
    description: `${challenge.description} Part of ${lesson.title.toLowerCase()}. ${lesson.description} Challenge ${challengeIndex} of ${totalChallenges} in lesson ${lessonNumber} of ${totalLessons}.`,
    keywords: [
      "learn postgresql",
      "sql tutorial",
      "postgresql tutorial",
      lesson.title.toLowerCase(),
      "interactive sql",
      "database tutorial",
      "sql lesson",
      "sql challenge",
      "sql practice",
      challenge.difficulty,
    ],
    openGraph: {
      title: `${challenge.title} - Challenge | ${lesson.title} | Learn PostgreSQL`,
      description: challenge.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${challenge.title} - Challenge | ${lesson.title}`,
      description: challenge.description,
    },
    alternates: {
      canonical: `/learn-sql/${lesson.id}/challenge/${challenge.id}`,
    },
  };
}

export default function ChallengePage() {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading challenge...</div>
        </div>
      }
    >
      <PhasePageClient phase="challenge" />
    </Suspense>
  );
}
