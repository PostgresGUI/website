"use client";

import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "@/components/learn/LearnProviders";
import { LessonView } from "@/components/learn/LessonView";
import { PhaseType } from "@/lib/learn/lessons/types";
import { useCallback } from "react";

export function LessonPageClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lesson, setLesson, goToPhase } = useLessonContext();

  const lessonId = params.lessonId as string;
  const phaseParam = searchParams.get("phase");
  const challengeParam = searchParams.get("challenge");

  // Load lesson from URL on mount or when lessonId changes
  useEffect(() => {
    if (lessonId) {
      const foundLesson = module1.lessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        // Invalid lesson ID, redirect to welcome
        router.replace("/learn-sql");
      }
    }
  }, [lessonId, setLesson, router]);

  // Sync phase from URL query param or set default
  useEffect(() => {
    if (lesson) {
      const validPhases = ["context", "concept", "guided", "challenge", "summary"];

      // If challenge param exists but phase is not challenge, set phase to challenge
      if (challengeParam && phaseParam !== "challenge") {
        const challengeExists = lesson.phases.challenges.some(c => c.id === challengeParam);
        if (challengeExists) {
          router.replace(`/learn-sql/${lessonId}?phase=challenge&challenge=${challengeParam}`, { scroll: false });
          return;
        } else {
          // Invalid challenge ID, remove it
          router.replace(`/learn-sql/${lessonId}?phase=${phaseParam || "context"}`, { scroll: false });
          return;
        }
      }

      if (phaseParam && validPhases.includes(phaseParam)) {
        goToPhase(phaseParam as PhaseType);
      } else if (!phaseParam) {
        // No phase param, set default to context
        router.replace(`/learn-sql/${lessonId}?phase=context`, { scroll: false });
      }
    }
  }, [phaseParam, challengeParam, lesson, goToPhase, lessonId, router]);

  const handleLessonComplete = useCallback(() => {
    if (lesson) {
      const currentIndex = module1.lessons.findIndex((l) => l.id === lesson.id);
      if (currentIndex < module1.lessons.length - 1) {
        // Navigate to next lesson
        const nextLessonId = module1.lessons[currentIndex + 1].id;
        router.push(`/learn-sql/${nextLessonId}`);
      } else {
        // All lessons complete, go back to welcome
        router.push("/learn-sql");
      }
    }
  }, [lesson, router]);

  // Show loading state while lesson is being loaded
  if (!lesson || lesson.id !== lessonId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading lesson...</div>
      </div>
    );
  }

  return (
    <LessonView
      lesson={lesson}
      onLessonComplete={handleLessonComplete}
      className="h-full"
    />
  );
}
