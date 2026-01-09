'use client';

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';
import { MentorMessage } from '../MentorMessage';
import { TextType, TextTypeRef } from '../TextType';
import { useProgressContext } from '../LearnProviders';
import Image from 'next/image';

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
    const isAlreadyComplete = isPhaseComplete(lessonId, 'context');

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
        markPhaseComplete(lessonId, 'context');
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

        <div className="flex gap-1 animate-slide-in">
          {/* Avatar */}
          <div className="shrink-0 pt-1">
            <Image
              src="/postgresgui-elephant.png"
              alt={message.name}
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
                <span className="font-semibold">{message.name}</span>
                <span className="text-sm text-muted-foreground">
                  {message.role}
                </span>
              </div>

              {/* Message */}
              <p className="text-lg leading-relaxed text-foreground">
                <TextType
                  ref={textTypeRef}
                  text={message.message}
                  speed={15}
                  onComplete={handleTypingComplete}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
