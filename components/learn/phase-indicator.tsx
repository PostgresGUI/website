'use client';

import { cn } from '@/lib/utils';
import { PhaseType, Challenge } from '@/lib/learn/lessons/types';
import { MessageSquare, BookOpen, PenTool, Trophy, FileCheck } from 'lucide-react';

interface PhaseIndicatorProps {
  currentPhase: PhaseType;
  phases: PhaseType[];
  onPhaseClick?: (phase: PhaseType) => void;
  challenges?: Challenge[];
  currentChallengeId?: string | null;
  onChallengeClick?: (challengeId: string) => void;
  className?: string;
}

const PHASE_CONFIG: Record<PhaseType, { label: string; icon: typeof MessageSquare }> = {
  intro: { label: 'Intro', icon: MessageSquare },
  learn: { label: 'Learn', icon: BookOpen },
  practice: { label: 'Practice', icon: PenTool },
  quiz: { label: 'Quiz', icon: Trophy },
  cheatsheet: { label: 'Cheatsheet', icon: FileCheck }
};

export function PhaseIndicator({
  currentPhase,
  phases,
  onPhaseClick,
  challenges,
  currentChallengeId,
  onChallengeClick,
  className
}: PhaseIndicatorProps) {
  const currentIndex = phases.indexOf(currentPhase);

  return (
    <div className={cn('flex items-center justify-center gap-1 sm:gap-2', className)}>
      {phases.map((phase, index) => {
        const config = PHASE_CONFIG[phase];
        const Icon = config.icon;
        const isActive = phase === currentPhase;
        const isPast = index < currentIndex;
        const isClickable = onPhaseClick && (isPast || index === currentIndex + 1);
        
        // Special handling for challenge phase - don't make it blue
        const isChallengePhase = phase === 'quiz';
        const showChallengeCircles = isChallengePhase && challenges && challenges.length > 0;

        return (
          <button
            key={phase}
            onClick={() => isClickable && onPhaseClick && onPhaseClick(phase)}
            disabled={!isClickable}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-xs font-medium border',
              // Challenge phase stays inactive (not blue) even when active
              isChallengePhase && isActive && 'bg-muted/50 text-muted-foreground border-border',
              // Challenge phase gets green when past (completed)
              isChallengePhase && isPast && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
              // Other phases get blue when active
              !isChallengePhase && isActive && 'bg-[var(--postgres-blue)] text-white shadow-md border-[var(--postgres-blue)]',
              // Other phases get green when past (completed)
              isPast && !isChallengePhase && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
              // Inactive phases
              !isActive && !isPast && !isChallengePhase && 'bg-muted/50 text-muted-foreground border-transparent',
              isClickable && 'hover:scale-105 cursor-pointer',
              !isClickable && 'cursor-default'
            )}
          >
            {showChallengeCircles ? (
              // Show challenge circles inside challenge pill
              <>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline mr-1">{config.label}</span>
                <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                  {challenges.map((challenge, challengeIndex) => {
                    const isChallengeActive = challenge.id === currentChallengeId;
                    return (
                      <button
                        key={challenge.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onChallengeClick) {
                            onChallengeClick(challenge.id);
                          }
                        }}
                        className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-all border',
                          isChallengeActive && 'bg-[var(--postgres-blue)] text-white border-white',
                          // When challenge phase is past (green), use green styling for circles
                          isPast && !isChallengeActive && 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
                          // When challenge phase is not past, use muted styling
                          !isPast && !isChallengeActive && 'bg-muted text-muted-foreground hover:bg-muted/80 border-transparent'
                        )}
                      >
                        {challengeIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              // Regular phase button
              <>
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{config.label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
