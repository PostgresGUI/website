"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext, useProgressContext } from "./LearnProviders";
import { Sidebar } from "./Sidebar";
import { PhaseType } from "@/lib/learn/lessons/types";

interface SidebarNavProps {
  challengeParam?: string | null;
}

export function SidebarNav({ challengeParam: initialChallengeParam }: SidebarNavProps = {}) {
  const params = useParams();
  const router = useRouter();
  const { lesson, goToPhase, currentPhase, phases } = useLessonContext();
  const { isLessonComplete, isChallengeComplete } = useProgressContext();

  const lessonId = params?.lessonId as string | undefined;
  const challengeParam = initialChallengeParam || null;

  const lessons = module1.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle,
  }));

  const handleSelectLesson = useCallback(
    (selectedLessonId: string) => {
      // Check if lesson is accessible
      const lessonIndex = lessons.findIndex(l => l.id === selectedLessonId);
      if (lessonIndex > 0) {
        const prevLesson = lessons[lessonIndex - 1];
        if (!isLessonComplete(prevLesson.id)) {
          return; // Don't navigate to locked lesson
        }
      }
      router.push(`/learn-sql/${selectedLessonId}/context`);
    },
    [router, lessons, isLessonComplete]
  );

  const getPhaseRoute = useCallback((phase: PhaseType, targetLessonId: string) => {
    const basePath = `/learn-sql/${targetLessonId}`;
    // Map "guided" phase to "practice" route
    if (phase === "guided") {
      return `${basePath}/practice`;
    }
    return `${basePath}/${phase}`;
  }, []);

  const handlePhaseClick = useCallback(
    (phase: PhaseType, targetLessonId?: string) => {
      const effectiveLessonId = targetLessonId || lessonId;
      if (!effectiveLessonId) return;

      const allPhases: PhaseType[] = ['context', 'concept', 'guided', 'challenge', 'summary'];
      
      // If not current lesson, check if previous lesson is complete
      if (targetLessonId && targetLessonId !== lessonId) {
        const lessonIndex = lessons.findIndex(l => l.id === targetLessonId);
        if (lessonIndex > 0) {
          const prevLesson = lessons[lessonIndex - 1];
          if (!isLessonComplete(prevLesson.id)) {
            return; // Don't navigate to locked lesson
          }
        }
      }
      
      // For current lesson, check phase accessibility
      if (effectiveLessonId === lessonId) {
        const phaseIndex = allPhases.indexOf(phase);
        if (phaseIndex > 0) {
          // Check if previous phases are accessible
          const currentPhaseIndex = allPhases.indexOf(currentPhase || "context");
          if (currentPhaseIndex < phaseIndex - 1) {
            return; // Don't navigate to locked phase
          }
        }
      }

      const isDifferentLesson = targetLessonId && targetLessonId !== lessonId;
      const newUrl = getPhaseRoute(phase, effectiveLessonId);

      if (isDifferentLesson) {
        router.push(newUrl);
      } else {
        router.push(newUrl);
        goToPhase(phase);
      }
    },
    [lessonId, router, goToPhase, getPhaseRoute, currentPhase, lessons, isLessonComplete]
  );

  const handleChallengeClick = useCallback(
    (challengeId: string) => {
      if (!lessonId || !lesson) return;
      
      // Check if challenge is accessible
      const challengeIndex = lesson.phases.challenges.findIndex(c => c.id === challengeId);
      
      // First challenge is always accessible if we're in challenge phase
      if (challengeIndex === 0) {
        if (currentPhase !== "challenge") {
          return; // Must be in challenge phase to access challenges
        }
      } else if (challengeIndex > 0) {
        // Other challenges require previous challenge to be complete
        const previousChallenge = lesson.phases.challenges[challengeIndex - 1];
        if (!isChallengeComplete(lessonId, previousChallenge.id)) {
          return; // Don't navigate to locked challenge
        }
      }
      
      router.push(`/learn-sql/${lessonId}/challenge/${challengeId}`);
      goToPhase("challenge");
    },
    [lessonId, lesson, router, goToPhase, currentPhase, isChallengeComplete]
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
