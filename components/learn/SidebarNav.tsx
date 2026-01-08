"use client";

import { useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "./LearnProviders";
import { Sidebar } from "./Sidebar";
import { PhaseType } from "@/lib/learn/lessons/types";

export function SidebarNav() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lesson, goToPhase, currentPhase, phases } = useLessonContext();

  const lessonId = params?.lessonId as string | undefined;
  const challengeParam = searchParams?.get("challenge") || null;

  const lessons = module1.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle,
  }));

  const handleSelectLesson = useCallback(
    (selectedLessonId: string) => {
      router.push(`/learn-sql/${selectedLessonId}`);
    },
    [router]
  );

  const handlePhaseClick = useCallback(
    (phase: PhaseType) => {
      if (lessonId) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", phase);
        // If switching to challenge phase and no challenge param, set first challenge
        if (phase === "challenge" && lesson) {
          const firstChallengeId = lesson.phases.challenges[0]?.id;
          if (firstChallengeId && !url.searchParams.get("challenge")) {
            url.searchParams.set("challenge", firstChallengeId);
          }
        } else {
          // If leaving challenge phase, remove challenge param
          url.searchParams.delete("challenge");
        }
        router.replace(url.pathname + url.search, { scroll: false });
        goToPhase(phase);
      }
    },
    [lessonId, lesson, router, goToPhase]
  );

  const handleChallengeClick = useCallback(
    (challengeId: string) => {
      if (lessonId) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", "challenge");
        url.searchParams.set("challenge", challengeId);
        router.replace(url.pathname + url.search, { scroll: false });
        goToPhase("challenge");
      }
    },
    [lessonId, router, goToPhase]
  );

  return (
    <Sidebar
      lessons={lessons}
      currentLessonId={lessonId || null}
      onSelectLesson={handleSelectLesson}
      currentPhase={currentPhase}
      phases={phases}
      onPhaseClick={handlePhaseClick}
      challenges={lesson?.phases.challenges || []}
      currentChallengeId={challengeParam}
      onChallengeClick={handleChallengeClick}
      className="h-full"
    />
  );
}
