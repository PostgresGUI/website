'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, LessonProgress } from '@/lib/learn/lessons/types';

const STORAGE_KEY = 'postgresgui-learn-progress';

const defaultProgress: UserProgress = {
  completedLessons: [],
  lessonProgress: {},
  xp: 0,
  coins: 100, // Start with some coins
  savedCards: [],
  lastActiveLesson: null
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when progress changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  }, []);

  const addCoins = useCallback((amount: number) => {
    setProgress(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  }, []);

  const spendCoins = useCallback((amount: number): boolean => {
    if (progress.coins < amount) return false;
    setProgress(prev => ({
      ...prev,
      coins: prev.coins - amount
    }));
    return true;
  }, [progress.coins]);

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

  const markChallengeComplete = useCallback((lessonId: string, challengeId: string) => {
    setProgress(prev => {
      const lessonProg = prev.lessonProgress[lessonId] || {
        currentPhase: 0,
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

  const recordHintUsed = useCallback((lessonId: string, challengeId: string, tier: number) => {
    setProgress(prev => {
      const lessonProg = prev.lessonProgress[lessonId] || {
        currentPhase: 0,
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

  const saveCard = useCallback((cardId: string) => {
    setProgress(prev => ({
      ...prev,
      savedCards: prev.savedCards.includes(cardId)
        ? prev.savedCards
        : [...prev.savedCards, cardId]
    }));
  }, []);

  const isLessonComplete = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const isChallengeComplete = useCallback((lessonId: string, challengeId: string) => {
    return progress.lessonProgress[lessonId]?.completedChallenges.includes(challengeId) || false;
  }, [progress.lessonProgress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return {
    progress,
    isLoaded,
    addXP,
    addCoins,
    spendCoins,
    markLessonComplete,
    updateLessonProgress,
    markChallengeComplete,
    recordHintUsed,
    saveCard,
    isLessonComplete,
    isChallengeComplete,
    resetProgress
  };
}
