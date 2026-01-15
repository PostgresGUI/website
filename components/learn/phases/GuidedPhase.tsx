"use client";

import { useState, useCallback, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { GuidedPractice, QueryResult } from "@/lib/learn/lessons/types";
import { QueryConsole } from "../QueryConsole";
import { MentorMessage } from "../MentorMessage";
import { TextTypeRef } from "../TextType";
import { useProgressContext } from "../LearnProviders";
import { playSound } from "@/lib/sounds";
import { validateGuidedQuery } from "@/lib/learn/guided-validation";

interface GuidedPhaseProps {
  practice: GuidedPractice;
  lessonId: string;
  className?: string;
  onStateChange?: (state: { canSkip: boolean; isComplete: boolean; hasPracticed: boolean }) => void;
}

export interface GuidedPhaseRef {
  handleSkip: () => void;
  canSkip: boolean;
  isComplete: boolean;
  hasPracticed: boolean;
}

export const GuidedPhase = forwardRef<GuidedPhaseRef, GuidedPhaseProps>(
  function GuidedPhase({ practice, lessonId, className, onStateChange }, ref) {
    const { markPhaseComplete } = useProgressContext();
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [queryComplete, setQueryComplete] = useState(false);
    const [hasPracticed, setHasPracticed] = useState(false);
    const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
    const [hintMessage, setHintMessage] = useState<string | null>(null);
    const [hasShownHint, setHasShownHint] = useState(false);
    const [hintShakeKey, setHintShakeKey] = useState(0);
    const textTypeRef = useRef<TextTypeRef>(null);
    const isSkippingRef = useRef(false);
    const onStateChangeRef = useRef<
      ((state: { canSkip: boolean; isComplete: boolean; hasPracticed: boolean }) => void) | undefined
    >(onStateChange);

    // Keep the callback ref up to date
    useEffect(() => {
      onStateChangeRef.current = onStateChange;
    }, [onStateChange]);

    // Reset state when practice changes
    useEffect(() => {
      setIsTypingComplete(false);
      setQueryComplete(false);
      setHasPracticed(false);
      setHasMarkedComplete(false);
      setHintMessage(null);
      setHasShownHint(false);
      setHintShakeKey(0);
      isSkippingRef.current = false;
      prevStateRef.current = null;
      isInitialMountRef.current = true;
    }, [practice]);

    const handleSkip = () => {
      if (!isTypingComplete && textTypeRef.current) {
        isSkippingRef.current = true;
        textTypeRef.current.skip();
        setIsTypingComplete(true);
      }
    };

    const handleTypingComplete = () => {
      // If we already skipped, don't update state again
      if (isSkippingRef.current) {
        isSkippingRef.current = false;
        return;
      }

      if (!isTypingComplete) {
        setIsTypingComplete(true);
      }
    };

    const handleQueryResult = useCallback(
      (result: QueryResult, query: string) => {
        // Track that user has practiced (run any query)
        setHasPracticed(true);

        // Mark phase complete when user runs their first query
        if (!hasMarkedComplete) {
          setHasMarkedComplete(true);
          markPhaseComplete(lessonId, 'guided');
        }

        // If query had an error, don't show our hint (SQL error is already shown)
        if (!result.success) {
          setHintMessage(null);
          return;
        }

        const validation = validateGuidedQuery(query, practice.expectedQuery);
        const { isValid, hasExpectedKeyword, hasValidContent } = validation;

        if (isValid) {
          setQueryComplete(true);
          setHintMessage(null);
          setHasShownHint(false);
          setHintShakeKey(0);
          playSound('success');
        } else {
          // Reset success state if they got it wrong after getting it right
          setQueryComplete(false);

          // If hint was already shown, trigger shake animation
          if (hasShownHint) {
            setHintShakeKey((prev) => prev + 1);
          }

          // Show a helpful hint based on what went wrong
          const expectedKeyword = practice.expectedQuery.trim().split(/\s+/)[0].toUpperCase();
          if (!hasExpectedKeyword) {
            setHintMessage(`Almost there! Try using the ${expectedKeyword} keyword to get started.`);
            playSound('hint');
          } else if (!hasValidContent) {
            setHintMessage("Good start! Now try adding some actual content. An empty value won't work here — add a message between the quotes!");
            playSound('hint');
          }

          // Mark that we've shown a hint
          if (!hasShownHint) {
            setHasShownHint(true);
          }
        }
      },
      [practice.expectedQuery, hasMarkedComplete, lessonId, markPhaseComplete, hasShownHint]
    );

    const canSkip = !isTypingComplete;

    // Track previous state to avoid unnecessary updates
    const prevStateRef = useRef<{
      canSkip: boolean;
      isComplete: boolean;
      hasPracticed: boolean;
    } | null>(null);
    const isInitialMountRef = useRef(true);

    // Expose controls to parent component
    useImperativeHandle(
      ref,
      () => ({
        handleSkip,
        canSkip,
        isComplete: isTypingComplete,
        hasPracticed,
      }),
      [handleSkip, canSkip, isTypingComplete, hasPracticed]
    );

    // Notify parent of state changes only when values actually change
    useEffect(() => {
      const newState = {
        canSkip,
        isComplete: isTypingComplete,
        hasPracticed,
      };

      // Skip on initial mount if values match default state (to avoid unnecessary update)
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
        // Always notify on initial mount so parent has correct initial state
        prevStateRef.current = newState;
        onStateChangeRef.current?.(newState);
      } else {
        // Only call onStateChange if state actually changed
        if (
          !prevStateRef.current ||
          prevStateRef.current.canSkip !== newState.canSkip ||
          prevStateRef.current.isComplete !== newState.isComplete ||
          prevStateRef.current.hasPracticed !== newState.hasPracticed
        ) {
          prevStateRef.current = newState;
          onStateChangeRef.current?.(newState);
        }
      }
    }, [canSkip, isTypingComplete, hasPracticed]);

    return (
      <div className={cn("animate-phase-enter space-y-6", className)}>
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold mb-1">Guided Practice</h2>
          <p className="text-sm text-muted-foreground">
            Follow along and try it yourself
          </p>
        </div>

        {/* Task prompt as chat bubble with typing animation */}
        <MentorMessage
          message={{
            name: "Sam",
            role: "Senior Database Engineer",
            message: practice.prompt,
          }}
          syntax={practice.template}
          showSyntax={isTypingComplete}
          animate={true}
          textTypeRef={textTypeRef}
          onTypingComplete={handleTypingComplete}
        />

        {/* Query console - only show after typing completes */}
        {isTypingComplete && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <QueryConsole
              initialQuery=""
              placeholder="Write your query here..."
              onQueryResult={handleQueryResult}
            />
          </div>
        )}

        {/* Hint message when query doesn't meet requirements */}
        {hintMessage && !queryComplete && (
          <MentorMessage
            key={hintShakeKey > 0 ? `hint-shake-${hintShakeKey}` : "hint-first"}
            message={{
              name: "Sam",
              role: "Senior Database Engineer",
              message: hintMessage,
            }}
            variant="hint"
            animate={false}
            className={hintShakeKey > 0 ? "animate-shake" : undefined}
          />
        )}

        {/* Success message - no typing animation */}
        {queryComplete && (
          <MentorMessage
            message={{
              name: "Sam",
              role: "Senior Database Engineer",
              message: "Great job! You've got the basics. Ready for a challenge?",
            }}
            variant="success"
            animate={false}
          />
        )}
      </div>
    );
  }
);
