'use client';

import { useState, useCallback, useMemo } from 'react';
import { Lesson, PhaseType } from '@/lib/learn/lessons/types';

const PHASES: PhaseType[] = ['intro', 'learn', 'practice', 'quiz', 'cheatsheet'];

export function useLesson(lesson: Lesson | null) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const currentPhase = useMemo(() => PHASES[phaseIndex], [phaseIndex]);

  const totalPhases = PHASES.length;

  const nextPhase = useCallback(() => {
    setPhaseIndex(prev => Math.min(prev + 1, PHASES.length - 1));
  }, []);

  const prevPhase = useCallback(() => {
    setPhaseIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const goToPhase = useCallback((phase: PhaseType) => {
    const index = PHASES.indexOf(phase);
    if (index !== -1) {
      setPhaseIndex(index);
    }
  }, []);

  const nextChallenge = useCallback(() => {
    if (!lesson) return;
    setCurrentChallengeIndex(prev =>
      Math.min(prev + 1, lesson.phases.quiz.length - 1)
    );
  }, [lesson]);

  const currentChallenge = useMemo(() => {
    if (!lesson) return null;
    return lesson.phases.quiz[currentChallengeIndex] || null;
  }, [lesson, currentChallengeIndex]);

  const isLastPhase = phaseIndex === PHASES.length - 1;
  const isFirstPhase = phaseIndex === 0;

  const isLastChallenge = useMemo(() => {
    if (!lesson) return true;
    return currentChallengeIndex === lesson.phases.quiz.length - 1;
  }, [lesson, currentChallengeIndex]);

  const resetLesson = useCallback(() => {
    setPhaseIndex(0);
    setCurrentChallengeIndex(0);
  }, []);

  return {
    currentPhase,
    phaseIndex,
    totalPhases,
    nextPhase,
    prevPhase,
    goToPhase,
    isFirstPhase,
    isLastPhase,
    currentChallengeIndex,
    currentChallenge,
    nextChallenge,
    isLastChallenge,
    resetLesson,
    phases: PHASES
  };
}
