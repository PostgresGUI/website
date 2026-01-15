"use client";

import { useEffect, Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "@/components/learn/LearnProviders";
import { LessonView } from "@/components/learn/LessonView";
import { PhaseType } from "@/lib/learn/lessons/types";
import { useCallback } from "react";

// Helper function to get search params client-side only
function useClientSearchParams() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    // Only access search params on client side
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  return searchParams;
}

function LessonPageContent() {
  const params = useParams();
  const router = useRouter();
  const { lesson, setLesson, goToPhase } = useLessonContext();
  const searchParams = useClientSearchParams();

  const lessonId = params.lessonId as string;
  const phaseParam = searchParams?.get("phase") || null;
  const challengeParam = searchParams?.get("challenge") || null;

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
      const validPhases = ["intro", "learn", "practice", "quiz", "cheatsheet"];

      // If challenge param exists but phase is not quiz, set phase to quiz
      if (challengeParam && phaseParam !== "quiz") {
        const challengeExists = lesson.phases.quiz.some(c => c.id === challengeParam);
        if (challengeExists) {
          router.replace(`/learn-sql/${lessonId}?phase=quiz&challenge=${challengeParam}`, { scroll: false });
          return;
        } else {
          // Invalid challenge ID, remove it
          router.replace(`/learn-sql/${lessonId}?phase=${phaseParam || "intro"}`, { scroll: false });
          return;
        }
      }

      if (phaseParam && validPhases.includes(phaseParam)) {
        goToPhase(phaseParam as PhaseType);
      } else if (!phaseParam) {
        // No phase param, set default to intro
        router.replace(`/learn-sql/${lessonId}?phase=intro`, { scroll: false });
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
      challengeParam={challengeParam}
    />
  );
}

export function LessonPageClient() {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading lesson...</div>
        </div>
      }
    >
      <LessonPageContent />
    </Suspense>
  );
}
