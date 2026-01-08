"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lesson } from "@/lib/learn/lessons/types";
import { useLessonContext, useSQLEngineContext } from "./LearnProviders";
import { PhaseIndicator } from "./PhaseIndicator";
import { ContextPhase } from "./phases/ContextPhase";
import { ConceptPhase } from "./phases/ConceptPhase";
import { GuidedPhase } from "./phases/GuidedPhase";
import { ChallengePhase } from "./phases/ChallengePhase";
import { SummaryPhase } from "./phases/SummaryPhase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface LessonViewProps {
  lesson: Lesson;
  onLessonComplete: () => void;
  className?: string;
}

export function LessonView({
  lesson,
  onLessonComplete,
  className,
}: LessonViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPhase, phases, nextPhase, prevPhase, goToPhase, resetLesson } =
    useLessonContext();
  const { initSchema, resetDatabase } = useSQLEngineContext();
  const isInitialMount = useRef(true);

  const currentChallengeId = searchParams.get("challenge");

  // Initialize lesson schema
  useEffect(() => {
    resetDatabase().then(() => {
      if (lesson.initialSchema) {
        initSchema(lesson.initialSchema);
      }
    });
    resetLesson();
    isInitialMount.current = true;
  }, [lesson.id, resetDatabase, initSchema, resetLesson]);

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

  // Wrapper functions that update URL when phase changes
  const handleNextPhase = useCallback(() => {
    nextPhase();
  }, [nextPhase]);

  const handlePrevPhase = useCallback(() => {
    prevPhase();
  }, [prevPhase]);

  const handleGoToPhase = useCallback(
    (phase: (typeof phases)[number]) => {
      goToPhase(phase);
    },
    [goToPhase, phases]
  );

  const handleChallengeClick = useCallback(
    (challengeId: string) => {
      if (pathname && pathname.includes("/learn-sql/")) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", "challenge");
        url.searchParams.set("challenge", challengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    },
    [pathname, router]
  );

  const renderPhase = useCallback(() => {
    switch (currentPhase) {
      case "context":
        return <ContextPhase message={lesson.phases.context} />;
      case "concept":
        return <ConceptPhase concepts={lesson.phases.concept} />;
      case "guided":
        return <GuidedPhase practice={lesson.phases.guided} />;
      case "challenge":
        return (
          <ChallengePhase
            challenges={lesson.phases.challenges}
            lessonId={lesson.id}
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
  }, [currentPhase, lesson]);

  return (
    <div
      className={cn(
        "relative h-full md:grid md:grid-rows-[auto_1fr_auto]",
        className
      )}
    >
      {/* Header - Fixed on mobile, static in grid on desktop */}
      <header className="fixed top-0 left-0 right-0 z-20 md:static md:z-auto px-4 py-3 border-b border-border bg-card/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
        <div className="max-w-2xl mx-auto">
          <PhaseIndicator
            currentPhase={currentPhase}
            phases={phases}
            onPhaseClick={handleGoToPhase}
            challenges={lesson.phases.challenges}
            currentChallengeId={currentChallengeId}
            onChallengeClick={handleChallengeClick}
          />
        </div>
      </header>

      {/* Content - Padded for fixed elements on mobile, scrollable in grid on desktop */}
      <main className="h-full overflow-y-auto pt-16 pb-24 md:pt-0 md:pb-0">
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

          {currentPhase === "context" && (
            <Button size="xl" onClick={handleNextPhase} className="min-w-0">
              <span className="truncate">Let&apos;s Learn</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          )}
          {currentPhase === "concept" && (
            <Button size="xl" onClick={handleNextPhase} className="min-w-0">
              <span className="truncate">Try It Out</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          )}
          {currentPhase === "guided" && (
            <Button size="xl" onClick={handleNextPhase} className="min-w-0">
              <span className="truncate">Take the Challenge</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          )}
          {currentPhase === "challenge" && (
            <Button size="xl" onClick={handleNextPhase} className="min-w-0">
              <span className="truncate">View Summary</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          )}
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
