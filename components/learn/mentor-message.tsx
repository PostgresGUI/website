"use client";

import Image from "next/image";
import { useEffect, useRef, RefObject } from "react";
import { cn } from "@/lib/utils";
import { TextType, TextTypeRef } from "./TextType";
import { Check, Trophy, CheckCircle2 } from "lucide-react";
import { useScrollContext } from "./LearnProviders";

// Challenge content props
interface ChallengeContent {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  isComplete?: boolean;
}

// Chat message props
interface ChatContent {
  name: string;
  role: string;
  message: string;
  learningObjectives?: string[];
}

type SyntaxBlockLabel = "Example" | "Syntax" | "Reference";

interface MentorMessageProps {
  // For chat variant
  message?: ChatContent;
  // For challenge variant
  challenge?: ChallengeContent;
  syntax?: string;
  syntaxLabel?: SyntaxBlockLabel; // Label for the syntax block
  showSyntax?: boolean; // Control syntax visibility (for delayed display)
  variant?: "default" | "success" | "error" | "hint" | "challenge";
  className?: string;
  animate?: boolean;
  textTypeRef?: RefObject<TextTypeRef | null>; // Ref to control TextType (for skip)
  onTypingComplete?: () => void; // Callback when typing animation finishes
  hideAvatar?: boolean; // Hide avatar (for stacked messages)
  disableAutoScroll?: boolean; // Disable auto-scroll on mount (for pre-rendered messages)
}

const getDifficultyStyles = (difficulty: ChallengeContent["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return {
        badge: "bg-emerald-500 text-white",
        label: "Easy",
      };
    case "medium":
      return {
        badge: "bg-amber-500 text-white",
        label: "Medium",
      };
    case "hard":
      return {
        badge: "bg-rose-500 text-white",
        label: "Hard",
      };
  }
};

export function MentorMessage({
  message,
  challenge,
  syntax,
  syntaxLabel = "Syntax",
  showSyntax = true,
  variant = "default",
  className,
  animate = true,
  textTypeRef,
  onTypingComplete,
  hideAvatar = false,
  disableAutoScroll = false,
}: MentorMessageProps) {
  const isSuccess = variant === "success";
  const isError = variant === "error";
  const isHint = variant === "hint";
  const isChallenge = variant === "challenge" && challenge;

  const displayName = isChallenge ? "Ellie" : message?.name;

  if (!message && !challenge) return null;

  // Only apply slide-in animation if shake animation is not present
  // Check if className contains animate-shake (could be part of a space-separated string)
  const hasShakeAnimation = className?.includes("animate-shake") ?? false;
  const shouldSlideIn = !hasShakeAnimation;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollToBottom } = useScrollContext();

  // Ensure shake animation triggers on mount when shake class is present
  useEffect(() => {
    if (hasShakeAnimation && containerRef.current) {
      const element = containerRef.current;
      // Force animation to restart by removing and re-adding the class
      // Remove the class, force reflow, then re-add it
      element.classList.remove("animate-shake");
      // Force a reflow
      void element.offsetWidth;
      // Re-add the class - this should trigger the animation
      requestAnimationFrame(() => {
        element.classList.add("animate-shake");
        // Force another reflow to ensure animation starts
        void element.offsetWidth;
      });
    }
  }, [hasShakeAnimation]);

  // Auto-scroll when message appears
  useEffect(() => {
    if (disableAutoScroll) return;
    // Small delay to let the slide-in animation start
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timeout);
  }, [scrollToBottom, disableAutoScroll]);

  // Note: Sounds are played from the event handlers that trigger these messages
  // (e.g., in GuidedPhase, ChallengePhase) to comply with browser autoplay policy.
  // Sounds must be triggered from user gestures, not from useEffect.

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex gap-1",
        shouldSlideIn && "animate-slide-in",
        className
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 pt-1">
        <Image
          src="/postgresgui-elephant.png"
          alt={displayName || "Mentor"}
          width={72}
          height={72}
          className={cn("object-contain", hideAvatar && "opacity-0")}
        />
      </div>

      {/* Chat bubble */}
      <div className="flex-1 min-w-0 max-w-2xl">
        <div
          className={cn(
            "bg-muted rounded-2xl rounded-tl-md px-4 py-3 w-full relative",
            isSuccess &&
              "bg-white dark:bg-zinc-900 shadow-[inset_0_0_30px_rgba(34,197,94,0.35)]",
            isError &&
              "bg-white dark:bg-zinc-900 shadow-[inset_0_0_30px_rgba(239,68,68,0.35)]",
            isHint &&
              "bg-white dark:bg-zinc-900 shadow-[inset_0_0_30px_rgba(251,191,36,0.35)]",
            isChallenge && challenge?.isComplete && "ring-2 ring-emerald-500/30"
          )}
        >
          {isSuccess && (
            <div className="absolute -top-2 right-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          )}

          {/* Challenge header inside bubble */}
          {isChallenge && challenge ? (
            <>
              {/* Challenge header row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-[15px]">
                    {challenge.title}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                    getDifficultyStyles(challenge.difficulty).badge
                  )}
                >
                  {getDifficultyStyles(challenge.difficulty).label}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-border/50 mb-3" />

              {/* Challenge description */}
              <p className="leading-relaxed text-foreground/90">
                {challenge.description}
              </p>

              {/* Completion badge */}
              {challenge.isComplete && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Challenge completed
                  </span>
                </div>
              )}
            </>
          ) : message ? (
            <>
              {/* Name and role */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-semibold">{message.name}</span>
                <span className="text-sm text-muted-foreground">
                  {message.role}
                </span>
              </div>

              {/* Message */}
              <p className="text-lg leading-relaxed text-foreground">
                {animate ? (
                  <TextType
                    ref={textTypeRef}
                    text={message.message}
                    speed={15}
                    onComplete={onTypingComplete}
                  />
                ) : (
                  message.message
                )}
              </p>

              {/* Optional syntax/reference block */}
              {syntax && showSyntax && (
                <div className="mt-3 rounded-lg bg-card border border-border p-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 font-mono">
                    {syntaxLabel}
                  </p>
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {syntax}
                  </pre>
                </div>
              )}

            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
