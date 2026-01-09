"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "./LearnProviders";
import { Sidebar } from "./Sidebar";
import { PhaseType } from "@/lib/learn/lessons/types";

interface SidebarNavProps {
  challengeParam?: string | null;
}

export function SidebarNav({ challengeParam: initialChallengeParam }: SidebarNavProps = {}) {
  const params = useParams();
  const router = useRouter();
  const { lesson, goToPhase, currentPhase, phases } = useLessonContext();

  const lessonId = params?.lessonId as string | undefined;
  const challengeParam = initialChallengeParam || null;

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
    (phase: PhaseType, targetLessonId?: string) => {
      const effectiveLessonId = targetLessonId || lessonId;
      if (effectiveLessonId) {
        // If navigating to a different lesson, use push; otherwise use replace
        const isDifferentLesson = targetLessonId && targetLessonId !== lessonId;
        const basePath = `/learn-sql/${effectiveLessonId}`;
        const params = new URLSearchParams();
        params.set("phase", phase);

        // Note: For challenge phase, we don't auto-navigate to first challenge
        // The user must select a specific challenge from the dropdown

        const newUrl = `${basePath}?${params.toString()}`;
        if (isDifferentLesson) {
          router.push(newUrl);
        } else {
          router.replace(newUrl, { scroll: false });
          goToPhase(phase);
        }
      }
    },
    [lessonId, router, goToPhase]
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
