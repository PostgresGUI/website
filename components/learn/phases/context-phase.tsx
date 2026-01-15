'use client';

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';
import { MentorMessage } from '../MentorMessage';
import { TextTypeRef } from '../TextType';
import { useProgressContext } from '../LearnProviders';
import { BookOpen } from 'lucide-react';

interface ContextPhaseProps {
  message: MentorMessageType;
  lessonId: string;
  className?: string;
  onComplete?: () => void;
  onStateChange?: (state: { canSkip: boolean; isComplete: boolean }) => void;
}

export interface ContextPhaseRef {
  handleSkip: () => void;
  canSkip: boolean;
  isComplete: boolean;
}

export const ContextPhase = forwardRef<ContextPhaseRef, ContextPhaseProps>(
  function ContextPhase({ message, lessonId, className, onComplete, onStateChange }, ref) {
    const { markPhaseComplete, isPhaseComplete } = useProgressContext();
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const textTypeRef = useRef<TextTypeRef>(null);
    const [hasCalledOnComplete, setHasCalledOnComplete] = useState(false);
    const isSkippingRef = useRef(false);
    const onStateChangeRef = useRef(onStateChange);
    const onCompleteRef = useRef(onComplete);

    // Check if phase is already complete
    const isAlreadyComplete = isPhaseComplete(lessonId, 'intro');

    // Keep the callback refs up to date
    useEffect(() => {
      onStateChangeRef.current = onStateChange;
      onCompleteRef.current = onComplete;
    }, [onStateChange, onComplete]);

    // Reset state when message changes
    useEffect(() => {
      setIsTypingComplete(false);
      setHasCalledOnComplete(false);
      isSkippingRef.current = false;
      prevStateRef.current = null;
      isInitialMountRef.current = true;
    }, [message]);

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

      if (isTypingComplete && !hasCalledOnComplete) {
        setHasCalledOnComplete(true);
        // Mark phase complete
        markPhaseComplete(lessonId, 'intro');
        onCompleteRef.current?.();
      }
    }, [canSkip, isTypingComplete, hasCalledOnComplete, lessonId, markPhaseComplete]);

    return (
      <div className={cn('animate-phase-enter', className)}>
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold mb-1">Your Task</h2>
          <p className="text-sm text-muted-foreground">
            Sam has a new assignment for you
          </p>
        </div>

        <MentorMessage
          message={{
            name: message.name,
            role: message.role,
            message: message.message,
          }}
          animate={true}
          textTypeRef={textTypeRef}
          onTypingComplete={handleTypingComplete}
        />

        {/* What You'll Learn - appears after typing */}
        {message.learningObjectives && message.learningObjectives.length > 0 && isTypingComplete && (
          <div className="flex gap-1 animate-slide-in mt-4">
            {/* Avatar placeholder for alignment */}
            <div className="shrink-0 w-[72px]" />

            {/* Card */}
            <div className="flex-1 min-w-0 max-w-2xl">
              <div className="rounded-2xl rounded-tl-md bg-white dark:bg-zinc-900 border border-sky-400 dark:border-sky-700 p-4">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md shadow-sky-500/20">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    What You'll Learn
                  </h3>
                </div>

                {/* Learning objectives list */}
                <ol className="space-y-2 ml-10 list-decimal list-inside">
                  {message.learningObjectives.map((objective, index) => (
                    <li
                      key={index}
                      className="text-stone-700 dark:text-stone-300"
                    >
                      {objective}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
