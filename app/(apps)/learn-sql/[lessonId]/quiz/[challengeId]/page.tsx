import { Suspense } from "react";
import { generateChallengeStaticParams } from "@/lib/learn/static-params";
import { generateChallengeMetadata as generateMetadataUtil } from "@/lib/learn/metadata";
import { LoadingFallback } from "@/components/learn/LoadingFallback";
import { PhasePageClient } from "../../PhasePageClient";

export const generateStaticParams = generateChallengeStaticParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string; challengeId: string }>;
}) {
  return generateMetadataUtil(params);
}

export default function QuizPage() {
  return (
    <Suspense fallback={<LoadingFallback text="Loading quiz..." />}>
      <PhasePageClient phase="quiz" />
    </Suspense>
  );
}
