"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./progress-ring";
import { useProgressContext } from "./learn-providers";
import {
  Check,
  CheckCircle,
  Lock,
  ChevronRight,
  BookOpen,
  MessageSquare,
  PenTool,
  Trophy,
  FileCheck,
} from "lucide-react";
import { PhaseType, Challenge } from "@/lib/learn/lessons/types";

interface Lesson {
  id: string;
  title: string;
  shortTitle: string;
}

const PHASE_CONFIG: Record<
  PhaseType,
  { label: string; icon: typeof MessageSquare }
> = {
  intro: { label: "Intro", icon: MessageSquare },
  learn: { label: "Learn", icon: BookOpen },
  practice: { label: "Practice", icon: PenTool },
  quiz: { label: "Quiz", icon: Trophy },
  cheatsheet: { label: "Cheatsheet", icon: FileCheck },
};

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  currentPhase?: PhaseType;
  phases?: PhaseType[];
  onPhaseClick?: (phase: PhaseType, lessonId?: string) => void;
  challenges?: Challenge[];
  currentChallengeId?: string | null;
  onChallengeClick?: (challengeId: string) => void;
  isChallengeComplete?: (lessonId: string, challengeId: string) => boolean;
  className?: string;
}

export function Sidebar({
  lessons,
  currentLessonId,
  onSelectLesson,
  currentPhase,
  phases = [],
  onPhaseClick,
  challenges = [],
  currentChallengeId,
  onChallengeClick,
  isChallengeComplete,
  className,
}: SidebarProps) {
  const { isLessonComplete, isChallengeComplete: isChallengeCompleteFromContext } = useProgressContext();

  // Use context version as fallback if prop not provided
  const checkChallengeComplete = isChallengeComplete || isChallengeCompleteFromContext;
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    new Set()
  );
  const [challengeExpanded, setChallengeExpanded] = useState(true);

  const completedCount = lessons.filter((l) => isLessonComplete(l.id)).length;
  const progressPercent = (completedCount / lessons.length) * 100;

  const currentPhaseIndex = phases.indexOf(currentPhase || "intro");

  // Find current challenge index
  const currentChallengeIndex = currentChallengeId
    ? challenges.findIndex(c => c.id === currentChallengeId)
    : -1;

  // Simple linear progression:
  // - Everything above current = completed
  // - Current = active
  // - Everything below = locked

  const getPhaseState = (phaseIndex: number, lessonId: string): 'completed' | 'active' | 'locked' => {
    // If not current lesson
    if (lessonId !== currentLessonId) {
      const lessonIndex = lessons.findIndex(l => l.id === lessonId);
      const currentLessonIndex = lessons.findIndex(l => l.id === currentLessonId);

      if (lessonIndex < currentLessonIndex) {
        return 'completed'; // Previous lessons are complete
      }
      return 'locked'; // Future lessons are locked
    }

    // Current lesson - simple linear check
    if (phaseIndex < currentPhaseIndex) {
      return 'completed';
    }
    if (phaseIndex === currentPhaseIndex) {
      return 'active';
    }
    return 'locked';
  };

  const getChallengeState = (challengeIndex: number, challenge: Challenge): 'completed' | 'active' | 'locked' => {
    // Check actual completion status from progress first
    const isCompleted = currentLessonId && checkChallengeComplete(currentLessonId, challenge.id);

    if (isCompleted) {
      return 'completed';
    }

    // If we're past the quiz phase (on cheatsheet), show challenges as completed
    // This matches the behavior of other phases which show as complete when passed
    if (currentPhase === 'cheatsheet') {
      return 'completed';
    }

    // If not in quiz phase yet, challenges are locked
    if (currentPhase !== 'quiz') {
      return 'locked';
    }

    if (challengeIndex === currentChallengeIndex) {
      return 'active';
    }
    // Check if previous challenge is complete (to determine if this one is accessible)
    if (challengeIndex > 0) {
      const prevChallenge = challenges[challengeIndex - 1];
      const prevCompleted = currentLessonId && checkChallengeComplete(currentLessonId, prevChallenge.id);
      if (!prevCompleted) {
        return 'locked';
      }
    }
    return 'locked';
  };

  // Auto-expand current lesson
  useEffect(() => {
    if (currentLessonId) {
      setExpandedLessons((prev) => new Set(prev).add(currentLessonId));
    }
  }, [currentLessonId]);

  // Auto-expand challenges when a challenge is selected
  useEffect(() => {
    if (
      currentChallengeId &&
      challenges.length > 0 &&
      currentPhase === "quiz"
    ) {
      setChallengeExpanded(true);
    }
  }, [currentChallengeId, challenges.length, currentPhase]);

  const toggleExpanded = (lessonId: string) => {
    setExpandedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  return (
    <aside className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-5">
        <h1 className="font-display text-base font-bold">Learn PostgreSQL</h1>
      </div>

      {/* Module Progress */}
      <div className="p-5">
        <div className="flex items-center gap-4">
          <ProgressRing progress={progressPercent} size={56} strokeWidth={4} />
          <div>
            <p className="text-sm font-medium">Module 1</p>
            <p className="text-xs text-muted-foreground">Foundations</p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} of {lessons.length} complete
            </p>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3">
        <div className="space-y-1">
          {lessons.map((lesson, index) => {
            const isComplete = isLessonComplete(lesson.id);
            const isCurrent = currentLessonId === lesson.id;
            const isLocked =
              index > 0 &&
              !isLessonComplete(lessons[index - 1].id) &&
              !isCurrent;
            const isExpanded = expandedLessons.has(lesson.id);
            const canExpand = !isLocked && phases.length > 0;

            return (
              <div key={lesson.id}>
                <div
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                    !isLocked &&
                      canExpand &&
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer",
                    isLocked && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() =>
                    !isLocked && canExpand && toggleExpanded(lesson.id)
                  }
                >
                  {/* Status icon */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono shrink-0",
                      isComplete &&
                        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                      !isComplete && !isLocked && "bg-muted text-foreground/70",
                      isLocked && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isComplete ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : isLocked ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Lesson info - not clickable, only for display */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {lesson.shortTitle}
                    </p>
                  </div>

                  {/* Expand/collapse toggle */}
                  {canExpand && (
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 text-muted-foreground">
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform duration-300 ease-out",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Phase submenu - animated */}
                {canExpand && (
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-6 mt-1 mb-2 pl-3 border-l-2 border-muted-foreground/20 space-y-0.5">
                        {phases.map((phase, phaseIndex) => {
                          const config = PHASE_CONFIG[phase];
                          const Icon = config.icon;
                          const phaseState = getPhaseState(phaseIndex, lesson.id);
                          const isActivePhase = phaseState === 'active';
                          const isCompleted = phaseState === 'completed';
                          const isPhaseLocked = phaseState === 'locked';
                          const isChallengePhase = phase === "quiz";
                          const hasChallenges =
                            isCurrent &&
                            isChallengePhase &&
                            challenges.length > 0;
                          const canShowChallenges = hasChallenges;

                          return (
                            <div key={phase}>
                              <div
                                className={cn(
                                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all duration-200 text-sm",
                                  isActivePhase &&
                                    !hasChallenges &&
                                    "bg-zinc-200 dark:bg-zinc-700 font-medium text-foreground",
                                  !isActivePhase &&
                                    !isPhaseLocked &&
                                    "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                  isPhaseLocked &&
                                    "opacity-50 cursor-not-allowed text-muted-foreground"
                                )}
                              >
                                {hasChallenges ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        setChallengeExpanded(!challengeExpanded)
                                      }
                                      className="flex items-center gap-2 flex-1 min-w-0"
                                    >
                                      <Icon className="w-3.5 h-3.5 shrink-0" />
                                      <span>{config.label}</span>
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setChallengeExpanded(
                                          !challengeExpanded
                                        );
                                      }}
                                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 hover:bg-black/5 dark:hover:bg-white/5"
                                    >
                                      <ChevronRight
                                        className={cn(
                                          "w-3.5 h-3.5 transition-transform duration-300 ease-out",
                                          challengeExpanded && "rotate-90"
                                        )}
                                      />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        if (isPhaseLocked) return;
                                        if (!isCurrent) {
                                          onSelectLesson(lesson.id);
                                        }
                                        onPhaseClick?.(phase, lesson.id);
                                      }}
                                      disabled={isPhaseLocked}
                                      className="flex items-center gap-2 flex-1 min-w-0"
                                    >
                                      <Icon className="w-3.5 h-3.5 shrink-0" />
                                      <span>{config.label}</span>
                                    </button>
                                    {isPhaseLocked && (
                                      <Lock className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                                    )}
                                    {isCompleted && (
                                      <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                                    )}
                                  </>
                                )}
                              </div>

                              {/* Challenge sub-items - animated */}
                              {canShowChallenges && (
                                <div
                                  className={cn(
                                    "grid transition-all duration-300 ease-out",
                                    challengeExpanded
                                      ? "grid-rows-[1fr] opacity-100"
                                      : "grid-rows-[0fr] opacity-0"
                                  )}
                                >
                                  <div className="overflow-hidden">
                                    <div className="ml-5 mt-0.5 space-y-0.5">
                                      {challenges.map(
                                        (challenge, challengeIndex) => {
                                          const challengeState = getChallengeState(challengeIndex, challenge);
                                          const isChallengeActive = challengeState === 'active';
                                          const isChallengeCompleted = challengeState === 'completed';
                                          const isChallengeLocked = challengeState === 'locked';

                                          return (
                                            <button
                                              key={challenge.id}
                                              onClick={() => {
                                                if (isChallengeLocked) return;
                                                onChallengeClick?.(challenge.id);
                                              }}
                                              disabled={isChallengeLocked}
                                              className={cn(
                                                "w-full flex items-center gap-2 px-3 py-1 rounded-full text-left transition-all duration-200 text-sm",
                                                isChallengeActive &&
                                                  "bg-zinc-200 dark:bg-zinc-700 font-medium text-foreground",
                                                !isChallengeActive &&
                                                  !isChallengeLocked &&
                                                  "text-muted-foreground/80 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                                isChallengeLocked &&
                                                  "opacity-50 cursor-not-allowed text-muted-foreground/50"
                                              )}
                                            >
                                              <span className="truncate">
                                                Challenge {challengeIndex + 1}
                                              </span>
                                              {isChallengeLocked && (
                                                <Lock className="w-3.5 h-3.5 ml-auto shrink-0 text-muted-foreground" />
                                              )}
                                              {isChallengeCompleted && (
                                                <CheckCircle className="w-3.5 h-3.5 ml-auto shrink-0 text-emerald-500" />
                                              )}
                                            </button>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Project */}
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => onSelectLesson("project")}
            disabled={completedCount < lessons.length}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
              currentLessonId === "project" && "bg-muted",
              completedCount < lessons.length &&
                "opacity-50 cursor-not-allowed",
              completedCount >= lessons.length &&
                currentLessonId !== "project" &&
                "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center",
                completedCount >= lessons.length
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Final Project</p>
              <p className="text-xs text-muted-foreground">
                Design Your Database
              </p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
