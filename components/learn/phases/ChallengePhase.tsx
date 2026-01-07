'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Challenge, QueryResult } from '@/lib/learn/lessons/types';
import { QueryConsole } from '../QueryConsole';
import { SchemaExplorer } from '../SchemaExplorer';
import { HintSystem } from '../HintSystem';
import { SuccessCelebration } from '../SuccessCelebration';
import { useProgressContext } from '../LearnProviders';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Trophy, Star, CheckCircle2 } from 'lucide-react';

interface ChallengePhaseProps {
  challenges: Challenge[];
  lessonId: string;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function ChallengePhase({
  challenges,
  lessonId,
  onNext,
  onPrev,
  className
}: ChallengePhaseProps) {
  const { addXP, addCoins, markChallengeComplete, isChallengeComplete } = useProgressContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastReward, setLastReward] = useState({ xp: 0, coins: 0 });

  const currentChallenge = challenges[currentIndex];
  const isCurrentComplete = isChallengeComplete(lessonId, currentChallenge.id);
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

  const goToNextChallenge = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevChallenge = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

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

      {/* Challenge progress */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {challenges.map((c, i) => {
          const complete = isChallengeComplete(lessonId, c.id);
          const active = i === currentIndex;

          return (
            <button
              key={c.id}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                complete && 'bg-emerald-500/10 text-emerald-500',
                active && !complete && 'bg-[var(--postgres-blue)]/10 text-[var(--postgres-blue)] ring-2 ring-[var(--postgres-blue)]/30',
                !active && !complete && 'bg-muted text-muted-foreground'
              )}
            >
              {complete ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-sm font-mono">{i + 1}</span>
              )}
            </button>
          );
        })}
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

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrev} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {currentIndex > 0 && (
            <Button variant="outline" onClick={goToPrevChallenge}>
              Prev Challenge
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {currentIndex < challenges.length - 1 && isCurrentComplete && (
            <Button variant="outline" onClick={goToNextChallenge}>
              Next Challenge
            </Button>
          )}
          <Button onClick={onNext} disabled={!allComplete} className="gap-2">
            {allComplete ? 'Complete Lesson' : `${challenges.filter(c => isChallengeComplete(lessonId, c.id)).length}/${challenges.length} Complete`}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
