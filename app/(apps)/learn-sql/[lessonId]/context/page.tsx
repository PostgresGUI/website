import { Suspense } from "react";
import { generateLessonStaticParams } from "@/lib/learn/static-params";
import { generateLessonPhaseMetadata } from "@/lib/learn/metadata";
import { LoadingFallback } from "@/components/learn/LoadingFallback";
import { PhasePageClient } from "../PhasePageClient";

export const generateStaticParams = generateLessonStaticParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  return generateLessonPhaseMetadata(params, "context");
}

export default function ContextPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PhasePageClient phase="context" />
    </Suspense>
  );
}
