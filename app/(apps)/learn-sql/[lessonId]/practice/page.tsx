import { Suspense } from "react";
import { generateLessonStaticParams } from "@/lib/learn/static-params";
import { generateLessonPhaseMetadata } from "@/lib/learn/metadata";
import { LoadingFallback } from "@/components/learn/loading-fallback";
import { PhasePageClient } from "../phase-page-client";

export const generateStaticParams = generateLessonStaticParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  return generateLessonPhaseMetadata(params, "practice");
}

export default function PracticePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PhasePageClient phase="practice" />
    </Suspense>
  );
}
