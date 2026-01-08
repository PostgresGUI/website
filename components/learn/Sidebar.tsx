"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";
import { useProgressContext } from "./LearnProviders";
import {
  Check,
  CheckCircle,
  Lock,
  Sparkles,
  Coins,
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
  context: { label: "Context", icon: MessageSquare },
  concept: { label: "Concept", icon: BookOpen },
  guided: { label: "Practice", icon: PenTool },
  challenge: { label: "Challenge", icon: Trophy },
  summary: { label: "Summary", icon: FileCheck },
};

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  currentPhase?: PhaseType;
  phases?: PhaseType[];
  onPhaseClick?: (phase: PhaseType) => void;
  challenges?: Challenge[];
  currentChallengeId?: string | null;
  onChallengeClick?: (challengeId: string) => void;
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
  className,
}: SidebarProps) {
  const { progress, isLessonComplete } = useProgressContext();
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [challengeExpanded, setChallengeExpanded] = useState(true);

  const completedCount = lessons.filter((l) => isLessonComplete(l.id)).length;
  const progressPercent = (completedCount / lessons.length) * 100;

  const currentPhaseIndex = phases.indexOf(currentPhase || "context");

  // Auto-expand current lesson
  useEffect(() => {
    if (currentLessonId) {
      setExpandedLessons((prev) => new Set(prev).add(currentLessonId));
    }
  }, [currentLessonId]);

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
                    !isLocked && canExpand && "hover:bg-muted/50 cursor-pointer",
                    isLocked && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isLocked && canExpand && toggleExpanded(lesson.id)}
                >
                  {/* Status icon */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono shrink-0",
                      isComplete &&
                        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                      !isComplete &&
                        !isLocked &&
                        "bg-muted text-foreground/70",
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
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-6 mt-1 mb-2 pl-3 border-l-2 border-[var(--postgres-blue)]/20 space-y-0.5">
                        {phases.map((phase, phaseIndex) => {
                          const config = PHASE_CONFIG[phase];
                          const Icon = config.icon;
                          const isActivePhase = isCurrent && phase === currentPhase;
                          const isPastPhase = isCurrent && phaseIndex < currentPhaseIndex;
                          const isChallengePhase = phase === "challenge";
                          const canExpandChallenge = isCurrent && isChallengePhase && challenges.length > 0 && (isActivePhase || isPastPhase);

                          return (
                            <div key={phase}>
                              <div
                                className={cn(
                                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all duration-200 text-sm",
                                  isActivePhase &&
                                    !canExpandChallenge &&
                                    "bg-[var(--postgres-blue)] text-white font-medium",
                                  (!isActivePhase || canExpandChallenge) &&
                                    "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                              >
                                <button
                                  onClick={() => {
                                    if (!isCurrent) {
                                      onSelectLesson(lesson.id);
                                    }
                                    onPhaseClick?.(phase);
                                  }}
                                  className="flex items-center gap-2 flex-1 min-w-0"
                                >
                                  <Icon className="w-3.5 h-3.5 shrink-0" />
                                  <span>{config.label}</span>
                                </button>
                                {isPastPhase && !isActivePhase && (
                                  <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                                )}
                                {canExpandChallenge && (
                                  <button
                                    onClick={() => setChallengeExpanded(!challengeExpanded)}
                                    className="w-5 h-5 rounded flex items-center justify-center shrink-0 hover:bg-black/5 dark:hover:bg-white/5"
                                  >
                                    <ChevronRight
                                      className={cn(
                                        "w-3.5 h-3.5 transition-transform duration-300 ease-out",
                                        challengeExpanded && "rotate-90"
                                      )}
                                    />
                                  </button>
                                )}
                              </div>

                              {/* Challenge sub-items - animated */}
                              {canExpandChallenge && (
                                <div
                                  className={cn(
                                    "grid transition-all duration-300 ease-out",
                                    challengeExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                  )}
                                >
                                  <div className="overflow-hidden">
                                    <div className="ml-5 mt-0.5 space-y-0.5">
                                      {challenges.map((challenge, challengeIndex) => {
                                        const isChallengeActive =
                                          challenge.id === currentChallengeId &&
                                          isActivePhase;
                                        return (
                                          <button
                                            key={challenge.id}
                                            onClick={() =>
                                              onChallengeClick?.(challenge.id)
                                            }
                                            className={cn(
                                              "w-full flex items-center gap-2 px-3 py-1 rounded-full text-left transition-all duration-200 text-sm",
                                              isChallengeActive &&
                                                "bg-[var(--postgres-blue)] text-white font-medium",
                                              !isChallengeActive &&
                                                "text-muted-foreground/80 hover:text-foreground hover:bg-muted/30"
                                            )}
                                          >
                                            <span className="truncate">
                                              Challenge {challengeIndex + 1}
                                            </span>
                                            {isPastPhase && (
                                              <CheckCircle className="w-3.5 h-3.5 ml-auto shrink-0 text-emerald-500" />
                                            )}
                                          </button>
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
              currentLessonId === "project" && "bg-[var(--postgres-blue)]/10",
              completedCount < lessons.length &&
                "opacity-50 cursor-not-allowed",
              completedCount >= lessons.length &&
                currentLessonId !== "project" &&
                "hover:bg-muted/50"
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

      {/* XP and Coins */}
      <div className="p-4 border-t border-border bg-muted/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">XP</p>
              <p className="text-sm font-mono font-semibold">{progress.xp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Coins</p>
              <p className="text-sm font-mono font-semibold">
                {progress.coins}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
