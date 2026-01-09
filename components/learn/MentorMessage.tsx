"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TextType } from "./TextType";
import { Check, Trophy, CheckCircle2 } from "lucide-react";

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
}

interface MentorMessageProps {
  // For chat variant
  message?: ChatContent;
  // For challenge variant
  challenge?: ChallengeContent;
  syntax?: string;
  variant?: "default" | "success" | "error" | "hint" | "challenge";
  className?: string;
  animate?: boolean;
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
  variant = "default",
  className,
  animate = true,
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
          className="object-contain"
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
                  <TextType text={message.message} speed={15} />
                ) : (
                  message.message
                )}
              </p>

              {/* Optional example block */}
              {syntax && (
                <div className="mt-3 rounded-lg bg-card border border-border p-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Example
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
