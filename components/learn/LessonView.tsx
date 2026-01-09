"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lesson } from "@/lib/learn/lessons/types";
import {
  useLessonContext,
  useSQLEngineContext,
  useProgressContext,
} from "./LearnProviders";
import { ContextPhase, ContextPhaseRef } from "./phases/ContextPhase";
import { ConceptPhase, ConceptPhaseRef } from "./phases/ConceptPhase";
import { GuidedPhase, GuidedPhaseRef } from "./phases/GuidedPhase";
import { ChallengePhase } from "./phases/ChallengePhase";
import { SummaryPhase } from "./phases/SummaryPhase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, FastForward } from "lucide-react";

interface LessonViewProps {
  lesson: Lesson;
  onLessonComplete: () => void;
  className?: string;
  challengeParam?: string | null;
}

export function LessonView({
  lesson,
  onLessonComplete,
  className,
  challengeParam,
}: LessonViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentPhase, nextPhase, prevPhase, resetLesson } =
    useLessonContext();
  const { initSchema, resetDatabase } = useSQLEngineContext();
  const { isChallengeComplete } = useProgressContext();
  const isInitialMount = useRef(true);
  const hasInitializedLesson = useRef<string | null>(null);
  const [isConceptPhaseComplete, setIsConceptPhaseComplete] = useState(false);
  const conceptPhaseRef = useRef<ConceptPhaseRef>(null);
  const [conceptPhaseState, setConceptPhaseState] = useState<{
    canSkip: boolean;
    canNext: boolean;
    allComplete: boolean;
  }>({ canSkip: true, canNext: false, allComplete: false });
  const contextPhaseRef = useRef<ContextPhaseRef>(null);
  const [contextPhaseState, setContextPhaseState] = useState<{
    canSkip: boolean;
    isComplete: boolean;
  }>({ canSkip: true, isComplete: false });
  const guidedPhaseRef = useRef<GuidedPhaseRef>(null);
  const [guidedPhaseState, setGuidedPhaseState] = useState<{
    canSkip: boolean;
    isComplete: boolean;
    hasPracticed: boolean;
  }>({ canSkip: true, isComplete: false, hasPracticed: false });

  // Initialize lesson schema
  useEffect(() => {
    // Only reset lesson state if this is a different lesson than we've seen
    // Don't reset if we're just loading the same lesson (e.g., on page refresh)
    const isNewLesson = hasInitializedLesson.current !== lesson.id;

    if (isNewLesson) {
      hasInitializedLesson.current = lesson.id;
      resetLesson();
    }

    resetDatabase().then(() => {
      if (lesson.initialSchema) {
        initSchema(lesson.initialSchema);
      }
    });

    isInitialMount.current = true;
    setIsConceptPhaseComplete(false);
    setContextPhaseState({ canSkip: true, isComplete: false });
    setGuidedPhaseState({
      canSkip: true,
      isComplete: false,
      hasPracticed: false,
    });
  }, [lesson.id, resetDatabase, initSchema, resetLesson]);

  // Reset phase completion when leaving phases
  useEffect(() => {
    if (currentPhase !== "concept") {
      setIsConceptPhaseComplete(false);
      setConceptPhaseState({
        canSkip: true,
        canNext: false,
        allComplete: false,
      });
    }
    if (currentPhase !== "context") {
      setContextPhaseState({ canSkip: true, isComplete: false });
    }
    if (currentPhase !== "guided") {
      setGuidedPhaseState({
        canSkip: true,
        isComplete: false,
        hasPracticed: false,
      });
    }
  }, [currentPhase]);

  // Helper function to get phase route
  const getPhaseRoute = useCallback(
    (phase: string, challengeId?: string | null) => {
      const basePath = `/learn-sql/${lesson.id}`;
      if (phase === "challenge" && challengeId) {
        return `${basePath}/challenge/${challengeId}`;
      }
      // Map "guided" phase to "practice" route
      if (phase === "guided") {
        return `${basePath}/practice`;
      }
      return `${basePath}/${phase}`;
    },
    [lesson.id]
  );

  // Challenge navigation functions
  const goToNextChallenge = useCallback(() => {
    if (!challengeParam) return;

    const currentIndex = lesson.phases.challenges.findIndex(
      (c) => c.id === challengeParam
    );
    if (currentIndex === -1) return;

    if (currentIndex < lesson.phases.challenges.length - 1) {
      const nextChallengeId = lesson.phases.challenges[currentIndex + 1]?.id;
      if (nextChallengeId) {
        router.push(getPhaseRoute("challenge", nextChallengeId));
      }
    } else {
      // Last challenge, go to summary phase
      router.push(getPhaseRoute("summary"));
    }
  }, [challengeParam, lesson, router, getPhaseRoute]);

  const goToPrevChallenge = useCallback(() => {
    if (!challengeParam) return;

    const currentIndex = lesson.phases.challenges.findIndex(
      (c) => c.id === challengeParam
    );
    if (currentIndex === -1) return;

    if (currentIndex > 0) {
      const prevChallengeId = lesson.phases.challenges[currentIndex - 1]?.id;
      if (prevChallengeId) {
        router.push(getPhaseRoute("challenge", prevChallengeId));
      }
    } else {
      // First challenge, go to practice phase
      router.push(getPhaseRoute("practice"));
    }
  }, [challengeParam, lesson, router, getPhaseRoute]);

  // Wrapper functions that navigate to routes when phase changes
  const handleNextPhase = useCallback(() => {
    if (currentPhase === "challenge") {
      goToNextChallenge();
    } else {
      const phaseOrder: Record<string, string> = {
        context: "concept",
        concept: "practice",
        guided: "challenge",
        challenge: "summary",
        summary: "summary",
      };
      const nextPhase = phaseOrder[currentPhase] || "context";
      if (nextPhase === "challenge") {
        // Navigate to first challenge
        const firstChallengeId = lesson.phases.challenges[0]?.id;
        if (firstChallengeId) {
          router.push(getPhaseRoute("challenge", firstChallengeId));
        } else {
          router.push(getPhaseRoute("summary"));
        }
      } else {
        router.push(getPhaseRoute(nextPhase));
      }
    }
  }, [currentPhase, router, lesson, getPhaseRoute, goToNextChallenge]);

  const handlePrevPhase = useCallback(() => {
    if (currentPhase === "challenge") {
      goToPrevChallenge();
    } else {
      const phaseOrder: Record<string, string> = {
        context: "context",
        concept: "context",
        guided: "concept",
        challenge: "practice",
        summary: "challenge",
      };
      const prevPhase = phaseOrder[currentPhase] || "context";
      if (prevPhase === "challenge") {
        // Navigate to last challenge
        const lastChallengeId =
          lesson.phases.challenges[lesson.phases.challenges.length - 1]?.id;
        if (lastChallengeId) {
          router.push(getPhaseRoute("challenge", lastChallengeId));
        } else {
          router.push(getPhaseRoute("practice"));
        }
      } else {
        router.push(getPhaseRoute(prevPhase));
      }
    }
  }, [currentPhase, router, lesson, getPhaseRoute, goToPrevChallenge]);

  // Stable callbacks for ConceptPhase
  const handleConceptAllComplete = useCallback(() => {
    setIsConceptPhaseComplete(true);
  }, []);

  const handleConceptStateChange = useCallback(
    (state: { canSkip: boolean; canNext: boolean; allComplete: boolean }) => {
      setConceptPhaseState(state);
    },
    []
  );

  // Stable callbacks for ContextPhase
  const handleContextComplete = useCallback(() => {
    // Context phase completion is handled via state
  }, []);

  const handleContextStateChange = useCallback(
    (state: { canSkip: boolean; isComplete: boolean }) => {
      setContextPhaseState(state);
    },
    []
  );

  // Stable callbacks for GuidedPhase
  const handleGuidedStateChange = useCallback(
    (state: {
      canSkip: boolean;
      isComplete: boolean;
      hasPracticed: boolean;
    }) => {
      setGuidedPhaseState(state);
    },
    []
  );

  const renderPhase = useCallback(() => {
    switch (currentPhase) {
      case "context":
        return (
          <ContextPhase
            ref={contextPhaseRef}
            message={lesson.phases.context}
            lessonId={lesson.id}
            onComplete={handleContextComplete}
            onStateChange={handleContextStateChange}
          />
        );
      case "concept":
        return (
          <ConceptPhase
            ref={conceptPhaseRef}
            concepts={lesson.phases.concept}
            lessonId={lesson.id}
            onAllComplete={handleConceptAllComplete}
            onStateChange={handleConceptStateChange}
          />
        );
      case "guided":
        return (
          <GuidedPhase
            ref={guidedPhaseRef}
            practice={lesson.phases.guided}
            lessonId={lesson.id}
            onStateChange={handleGuidedStateChange}
          />
        );
      case "challenge":
        return (
          <ChallengePhase
            challenges={lesson.phases.challenges}
            lessonId={lesson.id}
            challengeParam={challengeParam}
          />
        );
      case "summary":
        return (
          <SummaryPhase
            card={lesson.phases.summary}
            lessonId={lesson.id}
            lessonTitle={lesson.shortTitle}
          />
        );
      default:
        return null;
    }
  }, [
    currentPhase,
    lesson,
    conceptPhaseRef,
    contextPhaseRef,
    guidedPhaseRef,
    challengeParam,
    handleConceptAllComplete,
    handleConceptStateChange,
    handleContextComplete,
    handleContextStateChange,
    handleGuidedStateChange,
  ]);

  return (
    <div
      className={cn(
        "relative h-full md:grid md:grid-rows-[1fr_auto]",
        className
      )}
    >
      {/* Content - scrollable */}
      <main className="h-full overflow-y-auto pb-24 md:pb-0">
        <div className="max-w-2xl mx-auto px-4 py-6">{renderPhase()}</div>
      </main>

      {/* Footer - Fixed on mobile, static in grid on desktop */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 md:static md:z-auto border-t border-border bg-card/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none pb-[env(safe-area-inset-bottom)] md:pb-0">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
          {currentPhase !== "context" ? (
            <Button
              size="xl"
              variant="outline"
              onClick={handlePrevPhase}
              className="px-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <div />
          )}

          {currentPhase === "context" &&
            (() => {
              const { canSkip, isComplete } = contextPhaseState;

              const handleContextButtonClick = () => {
                if (canSkip) {
                  contextPhaseRef.current?.handleSkip();
                } else if (isComplete) {
                  handleNextPhase();
                }
              };

              return (
                <Button
                  size="xl"
                  onClick={handleContextButtonClick}
                  className="min-w-0"
                  disabled={!canSkip && !isComplete}
                  variant={canSkip ? "outline" : "default"}
                >
                  {canSkip ? (
                    <FastForward className="w-5 h-5" />
                  ) : (
                    <>
                      <span className="truncate">Let's Learn</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </Button>
              );
            })()}
          {currentPhase === "concept" &&
            (() => {
              const { canSkip, canNext, allComplete } = conceptPhaseState;

              const handleConceptButtonClick = () => {
                if (canSkip) {
                  conceptPhaseRef.current?.handleSkip();
                } else if (canNext) {
                  conceptPhaseRef.current?.handleNext();
                } else if (allComplete) {
                  handleNextPhase();
                }
              };

              const getButtonText = () => {
                if (canNext) return "Next";
                if (allComplete) return "Try It Out";
                return "Try It Out";
              };

              return (
                <Button
                  size="xl"
                  onClick={handleConceptButtonClick}
                  className="min-w-0"
                  disabled={!canSkip && !canNext && !allComplete}
                  variant={canSkip ? "outline" : "default"}
                >
                  {canSkip ? (
                    <FastForward className="w-5 h-5" />
                  ) : (
                    <>
                      <span className="truncate">{getButtonText()}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </Button>
              );
            })()}
          {currentPhase === "guided" &&
            (() => {
              const { canSkip, isComplete, hasPracticed } = guidedPhaseState;

              const handleGuidedButtonClick = () => {
                if (canSkip) {
                  guidedPhaseRef.current?.handleSkip();
                } else if (hasPracticed) {
                  handleNextPhase();
                }
              };

              // Button is enabled only if typing is complete AND user has practiced
              const isButtonEnabled = !canSkip && hasPracticed;

              return (
                <Button
                  size="xl"
                  onClick={handleGuidedButtonClick}
                  className="min-w-0"
                  disabled={!canSkip && !isButtonEnabled}
                  variant={canSkip || !hasPracticed ? "outline" : "default"}
                >
                  {canSkip ? (
                    <FastForward className="w-5 h-5" />
                  ) : (
                    <>
                      <span className="truncate">Take the Challenge</span>
                      {isButtonEnabled && (
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      )}
                    </>
                  )}
                </Button>
              );
            })()}
          {currentPhase === "challenge" &&
            (() => {
              // Safely get current index, defaulting to 0 if not found or not provided
              const rawIndex = challengeParam
                ? lesson.phases.challenges.findIndex(
                    (c) => c.id === challengeParam
                  )
                : 0;
              // If challengeParam was invalid (not found), treat as first challenge
              const safeCurrentIndex = rawIndex === -1 ? 0 : rawIndex;
              const isLastChallenge =
                safeCurrentIndex === lesson.phases.challenges.length - 1;
              const currentChallengeId =
                lesson.phases.challenges[safeCurrentIndex]?.id;
              const isCurrentComplete = currentChallengeId
                ? isChallengeComplete(lesson.id, currentChallengeId)
                : false;

              // Button should be disabled if:
              // 1. Not on last challenge AND current challenge not complete
              // 2. No challenges exist
              const hasNoChallenges = lesson.phases.challenges.length === 0;

              return (
                <Button
                  size="xl"
                  onClick={handleNextPhase}
                  className="min-w-0"
                  disabled={hasNoChallenges || (!isLastChallenge && !isCurrentComplete)}
                >
                  <span className="truncate">
                    {isLastChallenge ? "View Summary" : "Next Challenge"}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
              );
            })()}
          {currentPhase === "summary" && (
            <Button
              size="xl"
              onClick={onLessonComplete}
              className="bg-emerald-600 hover:bg-emerald-700 min-w-0"
            >
              <span className="truncate">Complete Lesson</span>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
