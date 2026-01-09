"use client";

import { useState, useCallback, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { GuidedPractice, QueryResult } from "@/lib/learn/lessons/types";
import { QueryConsole } from "../QueryConsole";
import { MentorMessage } from "../MentorMessage";
import { TextType, TextTypeRef } from "../TextType";
import Image from "next/image";

interface GuidedPhaseProps {
  practice: GuidedPractice;
  className?: string;
  onStateChange?: (state: { canSkip: boolean; isComplete: boolean }) => void;
}

export interface GuidedPhaseRef {
  handleSkip: () => void;
  canSkip: boolean;
  isComplete: boolean;
}

export const GuidedPhase = forwardRef<GuidedPhaseRef, GuidedPhaseProps>(
  function GuidedPhase({ practice, className, onStateChange }, ref) {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [queryComplete, setQueryComplete] = useState(false);
    const textTypeRef = useRef<TextTypeRef>(null);
    const isSkippingRef = useRef(false);
    const onStateChangeRef = useRef(onStateChange);

    // Keep the callback ref up to date
    useEffect(() => {
      onStateChangeRef.current = onStateChange;
    }, [onStateChange]);

    // Reset state when practice changes
    useEffect(() => {
      setIsTypingComplete(false);
      setQueryComplete(false);
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
        if (result.success) {
          const normalized = query.toLowerCase().replace(/\s+/g, " ").trim();
          const expected = practice.expectedQuery
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
          if (normalized.includes(expected.split(" ")[0]) && result.success) {
            setQueryComplete(true);
          }
        }
      },
      [practice.expectedQuery]
    );

    const canSkip = !isTypingComplete;

    // Track previous state to avoid unnecessary updates
    const prevStateRef = useRef<{
      canSkip: boolean;
      isComplete: boolean;
    } | null>(null);
    const isInitialMountRef = useRef(true);

    // Expose controls to parent component
    useImperativeHandle(
      ref,
      () => ({
        handleSkip,
        canSkip,
        isComplete: isTypingComplete,
      }),
      [handleSkip, canSkip, isTypingComplete]
    );

    // Notify parent of state changes only when values actually change
    useEffect(() => {
      const newState = {
        canSkip,
        isComplete: isTypingComplete,
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
          prevStateRef.current.isComplete !== newState.isComplete
        ) {
          prevStateRef.current = newState;
          onStateChangeRef.current?.(newState);
        }
      }
    }, [canSkip, isTypingComplete]);

    return (
      <div className={cn("animate-phase-enter space-y-6", className)}>
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold mb-1">Guided Practice</h2>
          <p className="text-sm text-muted-foreground">
            Follow along and try it yourself
          </p>
        </div>

        {/* Task prompt as chat bubble with typing animation */}
        <div className="flex gap-1 animate-slide-in">
          {/* Avatar */}
          <div className="shrink-0 pt-1">
            <Image
              src="/postgresgui-elephant.png"
              alt="Sam"
              width={72}
              height={72}
              className="object-contain"
            />
          </div>

          {/* Chat bubble */}
          <div className="flex-1 min-w-0 max-w-2xl">
            <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 w-full relative">
              {/* Name and role */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-semibold">Sam</span>
                <span className="text-sm text-muted-foreground">
                  Senior Database Engineer
                </span>
              </div>

              {/* Message with typing animation */}
              <p className="text-lg leading-relaxed text-foreground mb-3">
                <TextType
                  ref={textTypeRef}
                  text={practice.prompt}
                  speed={15}
                  onComplete={handleTypingComplete}
                />
              </p>

              {/* Example syntax - show after typing completes */}
              {isTypingComplete && (
                <div className="mt-3 rounded-lg bg-card border border-border p-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Example
                  </p>
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {practice.template}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

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
