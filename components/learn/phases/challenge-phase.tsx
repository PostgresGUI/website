"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Challenge, QueryResult } from "@/lib/learn/lessons/types";
import { QueryConsole } from "../query-console";
import { SchemaExplorer } from "../schema-explorer";
import { SuccessCelebration } from "../success-celebration";
import { MentorMessage } from "../mentor-message";
import { useProgressContext } from "../learn-providers";
import { playSound } from "@/lib/sounds";

interface ChallengePhaseProps {
  challenges: Challenge[];
  lessonId: string;
  className?: string;
  challengeParam?: string | null;
}

export function ChallengePhase({
  challenges,
  lessonId,
  className,
  challengeParam: initialChallengeParam,
}: ChallengePhaseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    markChallengeComplete,
    isChallengeComplete,
  } = useProgressContext();

  // Find initial challenge index from URL or default to 0
  const challengeParam = initialChallengeParam || null;
  const getInitialIndex = useCallback(() => {
    if (challengeParam) {
      const index = challenges.findIndex((c) => c.id === challengeParam);
      return index >= 0 ? index : 0;
    }
    return 0;
  }, [challengeParam, challenges]);

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [showCelebration, setShowCelebration] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const [hasShownError, setHasShownError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // Local visual state for completion badge - resets on wrong answers
  const [showAsComplete, setShowAsComplete] = useState(false);

  // Sync challenge index with URL query param on mount
  useEffect(() => {
    const challengeFromUrl = challengeParam;
    if (challengeFromUrl) {
      const index = challenges.findIndex((c) => c.id === challengeFromUrl);
      if (index >= 0 && index !== currentIndex) {
        setCurrentIndex(index);
      }
    } else if (
      pathname &&
      pathname.includes("/learn-sql/") &&
      challenges.length > 0
    ) {
      // No challenge param but we're in challenge phase, set first challenge
      const firstChallengeId = challenges[0]?.id;
      if (firstChallengeId) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", "quiz");
        url.searchParams.set("challenge", firstChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [challengeParam, challenges, currentIndex, pathname, router]);

  // Update URL when challenge index changes
  useEffect(() => {
    if (pathname && pathname.includes("/learn-sql/")) {
      const currentChallengeId = challenges[currentIndex]?.id;
      const url = new URL(window.location.href);
      const currentChallengeParam = url.searchParams.get("challenge");

      if (currentChallengeId && currentChallengeParam !== currentChallengeId) {
        url.searchParams.set("phase", "quiz");
        url.searchParams.set("challenge", currentChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [currentIndex, challenges, pathname, router]);

  const currentChallenge = challenges[currentIndex];
  const isCurrentComplete = currentChallenge
    ? isChallengeComplete(lessonId, currentChallenge.id)
    : false;

  // Reset UI state when navigating to a different challenge
  useEffect(() => {
    setShowSuccessMessage(false);
    setValidationMessage(null);
    setHasShownError(false);
    setShakeKey(0);
    // Set initial completion state based on whether challenge was already completed
    setShowAsComplete(isChallengeComplete(lessonId, challenges[currentIndex]?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleQueryResult = useCallback(
    (result: QueryResult, query: string) => {
      // Always validate, even if challenge is already marked complete
      // This allows re-evaluation if user runs a different query
      const validation = currentChallenge.validate(result, query);

      if (validation.correct) {
        setValidationMessage(null); // Clear error message on success
        setHasShownError(false); // Reset error tracking on success
        setShakeKey(0); // Reset shake key on success

        // Always show success message on correct submission
        setShowSuccessMessage(true);
        setShowAsComplete(true); // Show completion badge

        // Only celebrate on first completion
        if (!isCurrentComplete) {
          markChallengeComplete(lessonId, currentChallenge.id);
          setShowCelebration(true);
          playSound('celebration');
        } else {
          // Play a subtle success sound for re-submissions
          playSound('success');
        }
      } else {
        // Reset visual completion state on wrong answer
        setShowAsComplete(false);
        // Hide success message on validation failure
        setShowSuccessMessage(false);
        // Check if this is a repeated error BEFORE updating state
        // If hasShownError is already true, this is a repeated error - trigger shake
        if (hasShownError) {
          // Increment shakeKey to force animation re-trigger
          setShakeKey((prev) => prev + 1);
        }
        // Show error message to user
        setValidationMessage(validation.message);
        // Mark that we've shown an error (for future repeated errors)
        if (!hasShownError) {
          setHasShownError(true);
        }
        playSound('error');
      }
    },
    [
      currentChallenge,
      lessonId,
      isCurrentComplete,
      hasShownError,
      markChallengeComplete,
    ]
  );

  return (
    <div className={cn("animate-phase-enter space-y-6", className)}>
      <SuccessCelebration
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />

      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-1">Challenge Time</h2>
        <p className="text-sm text-muted-foreground">
          Put your knowledge to the test
        </p>
      </div>

      {/* Current challenge */}
      <MentorMessage
        variant="challenge"
        challenge={{
          title: currentChallenge.title,
          description: currentChallenge.description,
          difficulty: currentChallenge.difficulty,
          isComplete: showAsComplete,
        }}
      />

      {/* Schema explorer */}
      <SchemaExplorer />

      {/* Query console */}
      <QueryConsole
        placeholder="Write your solution..."
        onQueryResult={handleQueryResult}
      />

      {/* Success message when challenge is completed */}
      {showSuccessMessage && showAsComplete && (
        <MentorMessage
          message={{
            name: "Ellie",
            role: "Your SQL Mentor",
            message:
              "Excellent work! You've solved this challenge correctly. Keep it up!",
          }}
          variant="success"
          animate={true}
        />
      )}

      {/* Validation error message */}
      {validationMessage && (
        <MentorMessage
          key={shakeKey > 0 ? `shake-${shakeKey}` : "error-first"}
          message={{
            name: "Ellie",
            role: "Your SQL Mentor",
            message: validationMessage,
          }}
          variant="error"
          animate={false}
          className={shakeKey > 0 ? "animate-shake" : undefined}
        />
      )}
    </div>
  );
}
