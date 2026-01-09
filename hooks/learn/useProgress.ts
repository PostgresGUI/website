'use client';

import { useState, useCallback } from 'react';
import { UserProgress, LessonProgress } from '@/lib/learn/lessons/types';

const defaultProgress: UserProgress = {
  completedLessons: [],
  lessonProgress: {},
  lastActiveLesson: null
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId]
    }));
  }, []);

  const updateLessonProgress = useCallback((lessonId: string, update: Partial<LessonProgress>) => {
    setProgress(prev => ({
      ...prev,
      lessonProgress: {
        ...prev.lessonProgress,
        [lessonId]: {
          ...prev.lessonProgress[lessonId],
          ...update
        }
      },
      lastActiveLesson: lessonId
    }));
  }, []);

  const markPhaseComplete = useCallback((lessonId: string, phase: string) => {
    setProgress(prev => {
      const lessonProg = prev.lessonProgress[lessonId] || {
        currentPhase: 0,
        completedPhases: [],
        completedChallenges: [],
        hintsUsed: {},
        startedAt: new Date().toISOString()
      };

      if (lessonProg.completedPhases?.includes(phase)) {
        return prev; // Already complete
      }

      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...lessonProg,
            completedPhases: [...(lessonProg.completedPhases || []), phase]
          }
        }
      };
    });
  }, []);

  const markChallengeComplete = useCallback((lessonId: string, challengeId: string) => {
    setProgress(prev => {
      const lessonProg = prev.lessonProgress[lessonId] || {
        currentPhase: 0,
        completedPhases: [],
        completedChallenges: [],
        hintsUsed: {},
        startedAt: new Date().toISOString()
      };

      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...lessonProg,
            completedChallenges: lessonProg.completedChallenges.includes(challengeId)
              ? lessonProg.completedChallenges
              : [...lessonProg.completedChallenges, challengeId]
          }
        }
      };
    });
  }, []);

  const markChallengeIncomplete = useCallback((lessonId: string, challengeId: string) => {
    setProgress(prev => {
      const lessonProg = prev.lessonProgress[lessonId];
      if (!lessonProg) return prev;

      const newCompleted = lessonProg.completedChallenges.filter(id => id !== challengeId);
      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...lessonProg,
            completedChallenges: newCompleted
          }
        }
      };
    });
  }, []);

  const recordHintUsed = useCallback((lessonId: string, challengeId: string, tier: number) => {
    setProgress(prev => {
      const lessonProg = prev.lessonProgress[lessonId] || {
        currentPhase: 0,
        completedPhases: [],
        completedChallenges: [],
        hintsUsed: {},
        startedAt: new Date().toISOString()
      };

      const currentTier = lessonProg.hintsUsed[challengeId] || 0;

      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...lessonProg,
            hintsUsed: {
              ...lessonProg.hintsUsed,
              [challengeId]: Math.max(currentTier, tier)
            }
          }
        }
      };
    });
  }, []);

  const isLessonComplete = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const isPhaseComplete = useCallback((lessonId: string, phase: string) => {
    return progress.lessonProgress[lessonId]?.completedPhases?.includes(phase) || false;
  }, [progress.lessonProgress]);

  const isChallengeComplete = useCallback((lessonId: string, challengeId: string) => {
    return progress.lessonProgress[lessonId]?.completedChallenges.includes(challengeId) || false;
  }, [progress.lessonProgress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return {
    progress,
    markLessonComplete,
    updateLessonProgress,
    markPhaseComplete,
    markChallengeComplete,
    markChallengeIncomplete,
    recordHintUsed,
    isLessonComplete,
    isPhaseComplete,
    isChallengeComplete,
    resetProgress
  };
}
