"use client";

import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { SyntaxExample } from "@/lib/learn/lessons/types";
import { TextTypeRef } from "../TextType";
import { MentorMessage } from "../MentorMessage";
import { useProgressContext, useScrollContext } from "../LearnProviders";

interface ConceptPhaseProps {
  concepts: SyntaxExample[];
  lessonId: string;
  className?: string;
  onAllComplete?: () => void;
  onStateChange?: (state: {
    canSkip: boolean;
    canNext: boolean;
    allComplete: boolean;
  }) => void;
}

export interface ConceptPhaseRef {
  handleSkip: () => void;
  handleNext: () => void;
  canSkip: boolean;
  canNext: boolean;
  allComplete: boolean;
}

export const ConceptPhase = forwardRef<ConceptPhaseRef, ConceptPhaseProps>(
  function ConceptPhase(
    { concepts, lessonId, className, onAllComplete, onStateChange },
    ref
  ) {
    const { markPhaseComplete } = useProgressContext();
    const { scrollContainerRef } = useScrollContext();
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const textTypeRef = useRef<TextTypeRef>(null);
    const [syntaxDisplayed, setSyntaxDisplayed] = useState(false);
    const [hasCalledOnComplete, setHasCalledOnComplete] = useState(false);
    const isSkippingRef = useRef(false);
    const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Scroll to current message when it changes
    useEffect(() => {
      const currentRef = messageRefs.current[currentMessageIndex];
      if (currentRef && scrollContainerRef.current) {
        // Small delay to ensure the opacity transition has started
        setTimeout(() => {
          currentRef.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 50);
      }
    }, [currentMessageIndex, scrollContainerRef]);

    // Reset state when concepts change
    useEffect(() => {
      setCurrentMessageIndex(0);
      setIsTypingComplete(false);
      setSyntaxDisplayed(false);
      setHasCalledOnComplete(false);
      isSkippingRef.current = false;
      prevStateRef.current = null;
      isInitialMountRef.current = true;
    }, [concepts]);

    const isLastMessage = currentMessageIndex === concepts.length - 1;
    const allMessagesComplete =
      currentMessageIndex === concepts.length - 1 &&
      isTypingComplete &&
      syntaxDisplayed;

    const handleSkip = () => {
      if (!isTypingComplete && textTypeRef.current) {
        isSkippingRef.current = true;
        textTypeRef.current.skip();
        // When skipping, show syntax immediately
        setIsTypingComplete(true);
        setSyntaxDisplayed(true);
      }
    };

    const handleNext = () => {
      if (isTypingComplete && syntaxDisplayed) {
        if (!isLastMessage) {
          setCurrentMessageIndex((prev) => prev + 1);
          setIsTypingComplete(false);
          setSyntaxDisplayed(false);
          isSkippingRef.current = false;
        }
      }
    };

    const canSkip = !isTypingComplete;
    const canNext = isTypingComplete && syntaxDisplayed && !isLastMessage;

    // Track previous state to avoid unnecessary updates
    const prevStateRef = useRef<{
      canSkip: boolean;
      canNext: boolean;
      allComplete: boolean;
    } | null>(null);
    const isInitialMountRef = useRef(true);
    const onStateChangeRef = useRef(onStateChange);

    // Keep the callback ref up to date
    useEffect(() => {
      onStateChangeRef.current = onStateChange;
    }, [onStateChange]);

    // Expose controls to parent component
    useImperativeHandle(
      ref,
      () => ({
        handleSkip,
        handleNext,
        canSkip,
        canNext,
        allComplete: allMessagesComplete,
      }),
      [handleSkip, handleNext, canSkip, canNext, allMessagesComplete]
    );

    // Notify parent of state changes only when values actually change
    useEffect(() => {
      const newState = {
        canSkip,
        canNext,
        allComplete: allMessagesComplete,
      };

      // Skip on initial mount if values match default state (to avoid unnecessary update)
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
        // Always notify on initial mount so parent has correct initial state
        prevStateRef.current = newState;
        onStateChangeRef.current?.(newState);
        return;
      }

      // Only call onStateChange if state actually changed
      if (
        !prevStateRef.current ||
        prevStateRef.current.canSkip !== newState.canSkip ||
        prevStateRef.current.canNext !== newState.canNext ||
        prevStateRef.current.allComplete !== newState.allComplete
      ) {
        prevStateRef.current = newState;
        onStateChangeRef.current?.(newState);
      }
    }, [canSkip, canNext, allMessagesComplete]);

    useEffect(() => {
      if (allMessagesComplete && !hasCalledOnComplete) {
        setHasCalledOnComplete(true);
        // Mark phase complete
        markPhaseComplete(lessonId, "concept");
        onAllComplete?.();
      }
    }, [
      allMessagesComplete,
      hasCalledOnComplete,
      onAllComplete,
      lessonId,
      markPhaseComplete,
    ]);

    const handleTypingComplete = () => {
      // If we already skipped, don't update state again
      if (isSkippingRef.current) {
        isSkippingRef.current = false;
        return;
      }

      if (!isTypingComplete) {
        setIsTypingComplete(true);
        // Small delay before showing syntax block for better UX
        setTimeout(() => {
          setSyntaxDisplayed(true);
        }, 300);
      }
    };

    if (concepts.length === 0) {
      return null;
    }

    return (
      <div className={cn("animate-phase-enter", className)}>
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold mb-1">Learn the Concept</h2>
          <p className="text-sm text-muted-foreground">
            Understanding the syntax and how it works
          </p>
        </div>

        <div className="space-y-4">
          {/* Render all messages upfront with transparency */}
          {concepts.map((concept, index) => {
            const isPast = index < currentMessageIndex;
            const isCurrent = index === currentMessageIndex;
            const isFuture = index > currentMessageIndex;

            return (
              <div
                key={index}
                ref={(el) => { messageRefs.current[index] = el; }}
                className={cn(
                  "transition-opacity duration-500",
                  isPast && "opacity-100",
                  isCurrent && "opacity-100",
                  isFuture && "opacity-0 pointer-events-none"
                )}
              >
                <MentorMessage
                  message={{
                    name: concept.title,
                    role: "",
                    message: concept.explanation,
                  }}
                  syntax={concept.syntax}
                  showSyntax={isPast || (isCurrent && syntaxDisplayed)}
                  animate={isCurrent}
                  textTypeRef={isCurrent ? textTypeRef : undefined}
                  onTypingComplete={isCurrent ? handleTypingComplete : undefined}
                  hideAvatar={index > 0}
                  disableAutoScroll
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
