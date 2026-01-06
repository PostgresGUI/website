'use client';

import { cn } from '@/lib/utils';
import { PhaseType } from '@/lib/learn/lessons/types';
import { MessageSquare, BookOpen, PenTool, Trophy, FileCheck } from 'lucide-react';

interface PhaseIndicatorProps {
  currentPhase: PhaseType;
  phases: PhaseType[];
  onPhaseClick?: (phase: PhaseType) => void;
  className?: string;
}

const PHASE_CONFIG: Record<PhaseType, { label: string; icon: typeof MessageSquare }> = {
  context: { label: 'Context', icon: MessageSquare },
  concept: { label: 'Concept', icon: BookOpen },
  guided: { label: 'Practice', icon: PenTool },
  challenge: { label: 'Challenge', icon: Trophy },
  summary: { label: 'Summary', icon: FileCheck }
};

export function PhaseIndicator({
  currentPhase,
  phases,
  onPhaseClick,
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

        return (
          <button
            key={phase}
            onClick={() => isClickable && onPhaseClick(phase)}
            disabled={!isClickable}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-xs font-medium',
              isActive && 'bg-[var(--postgres-blue)] text-white shadow-md',
              isPast && 'bg-emerald-500/10 text-emerald-600',
              !isActive && !isPast && 'bg-muted/50 text-muted-foreground',
              isClickable && 'hover:scale-105 cursor-pointer',
              !isClickable && 'cursor-default'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
