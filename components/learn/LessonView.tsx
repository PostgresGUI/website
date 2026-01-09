"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lesson } from "@/lib/learn/lessons/types";
import { useLessonContext, useSQLEngineContext, useProgressContext } from "./LearnProviders";
import { ContextPhase, ContextPhaseRef } from "./phases/ContextPhase";
import { ConceptPhase, ConceptPhaseRef } from "./phases/ConceptPhase";
import { GuidedPhase, GuidedPhaseRef } from "./phases/GuidedPhase";
import { ChallengePhase } from "./phases/ChallengePhase";
import { SummaryPhase } from "./phases/SummaryPhase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

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
    resetDatabase().then(() => {
      if (lesson.initialSchema) {
        initSchema(lesson.initialSchema);
      }
    });
    resetLesson();
    isInitialMount.current = true;
    setIsConceptPhaseComplete(false);
    setContextPhaseState({ canSkip: true, isComplete: false });
    setGuidedPhaseState({ canSkip: true, isComplete: false, hasPracticed: false });
  }, [lesson.id, resetDatabase, initSchema, resetLesson]);

  // Reset phase completion when leaving phases
  useEffect(() => {
    if (currentPhase !== "concept") {
      setIsConceptPhaseComplete(false);
      setConceptPhaseState({ canSkip: true, canNext: false, allComplete: false });
    }
    if (currentPhase !== "context") {
      setContextPhaseState({ canSkip: true, isComplete: false });
    }
    if (currentPhase !== "guided") {
      setGuidedPhaseState({ canSkip: true, isComplete: false, hasPracticed: false });
    }
  }, [currentPhase]);

  // Sync phase changes to URL query params
  useEffect(() => {
    // Skip on initial mount to avoid overriding URL phase param
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only update URL if we're on a lesson page (has lessonId in path)
    if (pathname?.includes("/learn-sql/") && pathname !== "/learn-sql") {
      const url = new URL(window.location.href);
      const currentPhaseParam = url.searchParams.get("phase");

      // Only update if phase actually changed
      if (currentPhaseParam !== currentPhase) {
        url.searchParams.set("phase", currentPhase);
        // If switching to challenge phase and no challenge param, set first challenge
        if (
          currentPhase === "challenge" &&
          !url.searchParams.get("challenge")
        ) {
          const firstChallengeId = lesson.phases.challenges[0]?.id;
          if (firstChallengeId) {
            url.searchParams.set("challenge", firstChallengeId);
          }
        }
        // If leaving challenge phase, remove challenge param
        if (currentPhase !== "challenge" && url.searchParams.get("challenge")) {
          url.searchParams.delete("challenge");
        }
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [currentPhase, pathname, router, lesson.phases.challenges]);

  // Challenge navigation functions
  const goToNextChallenge = useCallback(() => {
    if (!pathname || !challengeParam) return;
    
    const currentIndex = lesson.phases.challenges.findIndex(c => c.id === challengeParam);
    if (currentIndex === -1) return;
    
    if (currentIndex < lesson.phases.challenges.length - 1) {
      const nextChallengeId = lesson.phases.challenges[currentIndex + 1]?.id;
      if (nextChallengeId) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", "challenge");
        url.searchParams.set("challenge", nextChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    } else {
      // Last challenge, go to next phase
      nextPhase();
    }
  }, [pathname, challengeParam, lesson, router, nextPhase]);

  const goToPrevChallenge = useCallback(() => {
    if (!pathname || !challengeParam) return;
    
    const currentIndex = lesson.phases.challenges.findIndex(c => c.id === challengeParam);
    if (currentIndex === -1) return;
    
    if (currentIndex > 0) {
      const prevChallengeId = lesson.phases.challenges[currentIndex - 1]?.id;
      if (prevChallengeId) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", "challenge");
        url.searchParams.set("challenge", prevChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    } else {
      // First challenge, go to previous phase
      prevPhase();
    }
  }, [pathname, challengeParam, lesson, router, prevPhase]);

  // Wrapper functions that update URL when phase changes
  const handleNextPhase = useCallback(() => {
    if (currentPhase === "challenge") {
      goToNextChallenge();
    } else {
      nextPhase();
    }
  }, [currentPhase, nextPhase, goToNextChallenge]);

  const handlePrevPhase = useCallback(() => {
    if (currentPhase === "challenge") {
      goToPrevChallenge();
    } else {
      prevPhase();
    }
  }, [currentPhase, prevPhase, goToPrevChallenge]);

  // Stable callbacks for ConceptPhase
  const handleConceptAllComplete = useCallback(() => {
    setIsConceptPhaseComplete(true);
  }, []);

  const handleConceptStateChange = useCallback((state: {
    canSkip: boolean;
    canNext: boolean;
    allComplete: boolean;
  }) => {
    setConceptPhaseState(state);
  }, []);

  // Stable callbacks for ContextPhase
  const handleContextComplete = useCallback(() => {
    // Context phase completion is handled via state
  }, []);

  const handleContextStateChange = useCallback((state: {
    canSkip: boolean;
    isComplete: boolean;
  }) => {
    setContextPhaseState(state);
  }, []);

  // Stable callbacks for GuidedPhase
  const handleGuidedStateChange = useCallback((state: {
    canSkip: boolean;
    isComplete: boolean;
    hasPracticed: boolean;
  }) => {
    setGuidedPhaseState(state);
  }, []);

  const renderPhase = useCallback(() => {
    switch (currentPhase) {
      case "context":
        return (
          <ContextPhase
            ref={contextPhaseRef}
            message={lesson.phases.context}
            onComplete={handleContextComplete}
            onStateChange={handleContextStateChange}
          />
        );
      case "concept":
        return (
          <ConceptPhase
            ref={conceptPhaseRef}
            concepts={lesson.phases.concept}
            onAllComplete={handleConceptAllComplete}
            onStateChange={handleConceptStateChange}
          />
        );
      case "guided":
        return (
          <GuidedPhase
            ref={guidedPhaseRef}
            practice={lesson.phases.guided}
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
  }, [currentPhase, lesson, conceptPhaseRef, contextPhaseRef, guidedPhaseRef, challengeParam, handleConceptAllComplete, handleConceptStateChange, handleContextComplete, handleContextStateChange, handleGuidedStateChange]);

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

          {currentPhase === "context" && (() => {
            const { canSkip, isComplete } = contextPhaseState;

            const handleContextButtonClick = () => {
              if (canSkip) {
                contextPhaseRef.current?.handleSkip();
              } else if (isComplete) {
                handleNextPhase();
              }
            };

            const getButtonText = () => {
              if (canSkip) return "Skip";
              if (isComplete) return "Let's Learn";
              return "Let's Learn";
            };

            return (
              <Button
                size="xl"
                onClick={handleContextButtonClick}
                className="min-w-0"
                disabled={!canSkip && !isComplete}
                variant={canSkip ? "outline" : "default"}
              >
                <span className="truncate">{getButtonText()}</span>
                {!canSkip && <ArrowRight className="w-4 h-4 shrink-0" />}
              </Button>
            );
          })()}
          {currentPhase === "concept" && (() => {
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
              if (canSkip) return "Skip";
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
                <span className="truncate">{getButtonText()}</span>
                {!canSkip && <ArrowRight className="w-4 h-4 shrink-0" />}
              </Button>
            );
          })()}
          {currentPhase === "guided" && (() => {
            const { canSkip, isComplete, hasPracticed } = guidedPhaseState;

            const handleGuidedButtonClick = () => {
              if (canSkip) {
                guidedPhaseRef.current?.handleSkip();
              } else if (hasPracticed) {
                handleNextPhase();
              }
            };

            const getButtonText = () => {
              if (canSkip) return "Skip";
              return "Take the Challenge";
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
                <span className="truncate">{getButtonText()}</span>
                {isButtonEnabled && <ArrowRight className="w-4 h-4 shrink-0" />}
              </Button>
            );
          })()}
          {currentPhase === "challenge" && (() => {
            const currentIndex = challengeParam 
              ? lesson.phases.challenges.findIndex(c => c.id === challengeParam)
              : -1;
            const isLastChallenge = currentIndex === lesson.phases.challenges.length - 1;
            const currentChallengeId = challengeParam || lesson.phases.challenges[0]?.id;
            const isCurrentComplete = currentChallengeId 
              ? isChallengeComplete(lesson.id, currentChallengeId)
              : false;
            
            return (
              <Button 
                size="xl" 
                onClick={handleNextPhase} 
                className="min-w-0"
                disabled={!isLastChallenge && !isCurrentComplete}
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
