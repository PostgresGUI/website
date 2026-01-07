'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useProgressContext } from './LearnProviders';
import { Lightbulb, Coins, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HintSystemProps {
  hints: [string, string, string];
  challengeId: string;
  lessonId: string;
  className?: string;
}

const HINT_COSTS = [10, 25, 50];
const HINT_LABELS = ['Concept Hint', 'Syntax Hint', 'Solution'];

export function HintSystem({
  hints,
  challengeId,
  lessonId,
  className
}: HintSystemProps) {
  const { progress, spendCoins, recordHintUsed } = useProgressContext();
  const [unlockedTier, setUnlockedTier] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if hints were already used in progress
  const savedTier = progress.lessonProgress[lessonId]?.hintsUsed[challengeId] || 0;
  const effectiveTier = Math.max(unlockedTier, savedTier);

  const unlockHint = (tier: number) => {
    if (tier <= effectiveTier) return; // Already unlocked

    const cost = HINT_COSTS[tier - 1];
    if (spendCoins(cost)) {
      setUnlockedTier(tier);
      recordHintUsed(lessonId, challengeId, tier);
    }
  };

  return (
    <div className={cn(
      'rounded-xl border border-border bg-card overflow-hidden shadow-swiftui',
      className
    )}>
      {/* Header - clickable to expand */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-medium text-sm">Need a hint?</span>
          {effectiveTier > 0 && (
            <span className="text-xs text-muted-foreground">
              ({effectiveTier}/3 unlocked)
            </span>
          )}
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 text-muted-foreground transition-transform',
          isExpanded && 'rotate-180'
        )} />
      </button>

      {/* Hints content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          {hints.map((hint, index) => {
            const tier = index + 1;
            const isUnlocked = tier <= effectiveTier;
            const cost = HINT_COSTS[index];

            return (
              <div
                key={index}
                className={cn(
                  'rounded-lg border p-3 transition-all',
                  isUnlocked
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-border bg-muted/20'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {HINT_LABELS[index]}
                  </span>
                  {!isUnlocked && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => unlockHint(tier)}
                      disabled={progress.coins < cost || tier > effectiveTier + 1}
                      className="h-6 px-2 text-xs gap-1"
                    >
                      {tier > effectiveTier + 1 ? (
                        <>
                          <Lock className="w-3 h-3" />
                          Unlock previous first
                        </>
                      ) : (
                        <>
                          <Coins className="w-3 h-3 text-amber-500" />
                          {cost} coins
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-sm text-foreground/90">{hint}</p>
                ) : (
                  <div className="h-4 bg-muted rounded animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
