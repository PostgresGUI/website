'use client';

import { useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Lesson } from '@/lib/learn/lessons/types';
import { useLessonContext, useSQLEngineContext } from './LearnProviders';
import { PhaseIndicator } from './PhaseIndicator';
import { ContextPhase } from './phases/ContextPhase';
import { ConceptPhase } from './phases/ConceptPhase';
import { GuidedPhase } from './phases/GuidedPhase';
import { ChallengePhase } from './phases/ChallengePhase';
import { SummaryPhase } from './phases/SummaryPhase';

interface LessonViewProps {
  lesson: Lesson;
  onLessonComplete: () => void;
  className?: string;
}

export function LessonView({ lesson, onLessonComplete, className }: LessonViewProps) {
  const {
    currentPhase,
    phases,
    nextPhase,
    prevPhase,
    goToPhase,
    resetLesson
  } = useLessonContext();
  const { initSchema, resetDatabase } = useSQLEngineContext();

  // Initialize lesson schema
  useEffect(() => {
    resetDatabase().then(() => {
      if (lesson.initialSchema) {
        initSchema(lesson.initialSchema);
      }
    });
    resetLesson();
  }, [lesson.id]);

  const renderPhase = useCallback(() => {
    switch (currentPhase) {
      case 'context':
        return (
          <ContextPhase
            message={lesson.phases.context}
            onNext={nextPhase}
          />
        );
      case 'concept':
        return (
          <ConceptPhase
            concepts={lesson.phases.concept}
            onNext={nextPhase}
            onPrev={prevPhase}
          />
        );
      case 'guided':
        return (
          <GuidedPhase
            practice={lesson.phases.guided}
            onNext={nextPhase}
            onPrev={prevPhase}
          />
        );
      case 'challenge':
        return (
          <ChallengePhase
            challenges={lesson.phases.challenges}
            lessonId={lesson.id}
            onNext={nextPhase}
            onPrev={prevPhase}
          />
        );
      case 'summary':
        return (
          <SummaryPhase
            card={lesson.phases.summary}
            lessonId={lesson.id}
            lessonTitle={lesson.shortTitle}
            onPrev={prevPhase}
            onComplete={onLessonComplete}
          />
        );
      default:
        return null;
    }
  }, [currentPhase, lesson, nextPhase, prevPhase, onLessonComplete]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Phase indicator */}
      <div className="shrink-0 px-4 py-4 border-b border-border bg-card/50">
        <PhaseIndicator
          currentPhase={currentPhase}
          phases={phases}
          onPhaseClick={goToPhase}
        />
      </div>

      {/* Phase content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {renderPhase()}
        </div>
      </div>
    </div>
  );
}
