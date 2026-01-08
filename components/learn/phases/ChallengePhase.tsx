'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Challenge, QueryResult } from '@/lib/learn/lessons/types';
import { QueryConsole } from '../QueryConsole';
import { SchemaExplorer } from '../SchemaExplorer';
import { HintSystem } from '../HintSystem';
import { SuccessCelebration } from '../SuccessCelebration';
import { useProgressContext } from '../LearnProviders';
import { Trophy, Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ChallengePhaseProps {
  challenges: Challenge[];
  lessonId: string;
  className?: string;
}

export function ChallengePhase({
  challenges,
  lessonId,
  className
}: ChallengePhaseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addXP, addCoins, markChallengeComplete, isChallengeComplete } = useProgressContext();
  
  // Find initial challenge index from URL or default to 0
  const challengeParam = searchParams.get('challenge');
  const getInitialIndex = useCallback(() => {
    if (challengeParam) {
      const index = challenges.findIndex(c => c.id === challengeParam);
      return index >= 0 ? index : 0;
    }
    return 0;
  }, [challengeParam, challenges]);

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastReward, setLastReward] = useState({ xp: 0, coins: 0 });

  // Sync challenge index with URL query param on mount
  useEffect(() => {
    const challengeFromUrl = searchParams.get('challenge');
    if (challengeFromUrl) {
      const index = challenges.findIndex(c => c.id === challengeFromUrl);
      if (index >= 0 && index !== currentIndex) {
        setCurrentIndex(index);
      }
    } else if (pathname && pathname.includes('/learn-sql/') && challenges.length > 0) {
      // No challenge param but we're in challenge phase, set first challenge
      const firstChallengeId = challenges[0]?.id;
      if (firstChallengeId) {
        const url = new URL(window.location.href);
        url.searchParams.set('phase', 'challenge');
        url.searchParams.set('challenge', firstChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [searchParams, challenges, currentIndex, pathname, router]);

  // Update URL when challenge index changes
  useEffect(() => {
    if (pathname && pathname.includes('/learn-sql/')) {
      const currentChallengeId = challenges[currentIndex]?.id;
      const url = new URL(window.location.href);
      const currentChallengeParam = url.searchParams.get('challenge');

      if (currentChallengeId && currentChallengeParam !== currentChallengeId) {
        url.searchParams.set('phase', 'challenge');
        url.searchParams.set('challenge', currentChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [currentIndex, challenges, pathname, router]);

  const currentChallenge = challenges[currentIndex];
  const isCurrentComplete = currentChallenge ? isChallengeComplete(lessonId, currentChallenge.id) : false;
  const allComplete = challenges.every(c => isChallengeComplete(lessonId, c.id));

  const handleQueryResult = useCallback((result: QueryResult, query: string) => {
    if (isCurrentComplete) return;

    const validation = currentChallenge.validate(result, query);

    if (validation.correct) {
      // Mark complete and award XP/coins
      markChallengeComplete(lessonId, currentChallenge.id);
      addXP(currentChallenge.xpReward);
      addCoins(currentChallenge.coinReward);

      setLastReward({
        xp: currentChallenge.xpReward,
        coins: currentChallenge.coinReward
      });
      setShowCelebration(true);
    }
  }, [currentChallenge, lessonId, isCurrentComplete, markChallengeComplete, addXP, addCoins]);

  const goToNextChallenge = useCallback(() => {
    if (currentIndex < challenges.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextChallengeId = challenges[nextIndex]?.id;
      if (nextChallengeId && pathname) {
        const url = new URL(window.location.href);
        url.searchParams.set('phase', 'challenge');
        url.searchParams.set('challenge', nextChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [currentIndex, challenges, pathname, router]);

  const goToPrevChallenge = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevChallengeId = challenges[prevIndex]?.id;
      if (prevChallengeId && pathname) {
        const url = new URL(window.location.href);
        url.searchParams.set('phase', 'challenge');
        url.searchParams.set('challenge', prevChallengeId);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [currentIndex, challenges, pathname, router]);

  const goToChallenge = useCallback((index: number) => {
    const challengeId = challenges[index]?.id;
    if (challengeId && pathname) {
      const url = new URL(window.location.href);
      url.searchParams.set('phase', 'challenge');
      url.searchParams.set('challenge', challengeId);
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [challenges, pathname, router]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-500 bg-emerald-500/10';
      case 'medium': return 'text-amber-500 bg-amber-500/10';
      case 'hard': return 'text-red-500 bg-red-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className={cn('animate-phase-enter space-y-6', className)}>
      <SuccessCelebration
        show={showCelebration}
        xpEarned={lastReward.xp}
        coinsEarned={lastReward.coins}
        onComplete={() => setShowCelebration(false)}
      />

      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-1">Challenge Time</h2>
        <p className="text-sm text-muted-foreground">
          Put your knowledge to the test
        </p>
      </div>

      {/* Current challenge */}
      <div className="rounded-xl border border-border bg-card shadow-swiftui overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-sm">{currentChallenge.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full font-medium capitalize',
              getDifficultyColor(currentChallenge.difficulty)
            )}>
              {currentChallenge.difficulty}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 text-amber-500" />
              {currentChallenge.xpReward} XP
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-foreground/90 mb-4">
            {currentChallenge.description}
          </p>

          {isCurrentComplete && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Challenge completed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Schema explorer */}
      <SchemaExplorer />

      {/* Query console */}
      <QueryConsole
        placeholder="Write your solution..."
        onQueryResult={handleQueryResult}
      />

      {/* Hints */}
      {!isCurrentComplete && (
        <HintSystem
          hints={currentChallenge.hints}
          challengeId={currentChallenge.id}
          lessonId={lessonId}
        />
      )}

      {/* Challenge navigation */}
      {challenges.length > 1 && (
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={goToPrevChallenge}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            {challenges.filter(c => isChallengeComplete(lessonId, c.id)).length} of {challenges.length} complete
          </span>
          <button
            onClick={goToNextChallenge}
            disabled={currentIndex === challenges.length - 1 || !isCurrentComplete}
            className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
