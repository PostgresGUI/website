"use client";

import { useEffect, Suspense, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "@/components/learn/LearnProviders";
import { LessonView } from "@/components/learn/LessonView";
import { PhaseType } from "@/lib/learn/lessons/types";
import { useCallback } from "react";

interface PhasePageClientProps {
  phase: PhaseType;
  challengeId?: string | null;
}

function PhasePageContent(props: PhasePageClientProps) {
  const { phase } = props;
  const params = useParams();
  const router = useRouter();
  const { lesson, setLesson, goToPhase } = useLessonContext();
  const phaseSetRef = useRef(false);

  const lessonId = params.lessonId as string;
  // Get challengeId from route params if available (for challenge pages)
  const challengeId = (params.challengeId as string | undefined) || props.challengeId || null;

  // Load lesson from URL on mount or when lessonId changes
  useEffect(() => {
    if (lessonId) {
      const foundLesson = module1.lessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
        phaseSetRef.current = false; // Reset flag when lesson changes
      } else {
        // Invalid lesson ID, redirect to welcome
        router.replace("/learn-sql");
      }
    }
  }, [lessonId, setLesson, router]);

  // Sync phase from route - this runs after lesson is set and state has updated
  // Use a ref to ensure we set the phase even if the effect runs multiple times
  useEffect(() => {
    if (lesson && lesson.id === lessonId && !phaseSetRef.current) {
      // Use setTimeout to ensure this runs after any resetLesson() calls
      setTimeout(() => {
        goToPhase(phase);
        phaseSetRef.current = true;
      }, 0);
    }
  }, [phase, lesson, lessonId, goToPhase]);

  const handleLessonComplete = useCallback(() => {
    if (lesson) {
      const currentIndex = module1.lessons.findIndex((l) => l.id === lesson.id);
      if (currentIndex < module1.lessons.length - 1) {
        // Navigate to next lesson's context phase
        const nextLessonId = module1.lessons[currentIndex + 1].id;
        router.push(`/learn-sql/${nextLessonId}/intro`);
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
      challengeParam={challengeId}
    />
  );
}

export function PhasePageClient(props: PhasePageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading lesson...</div>
        </div>
      }
    >
      <PhasePageContent {...props} />
    </Suspense>
  );
}
