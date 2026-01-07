'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { GuidedPractice, QueryResult } from '@/lib/learn/lessons/types';
import { QueryConsole } from '../QueryConsole';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react';

interface GuidedPhaseProps {
  practice: GuidedPractice;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function GuidedPhase({ practice, onNext, onPrev, className }: GuidedPhaseProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const handleQueryResult = useCallback((result: QueryResult, query: string) => {
    if (result.success) {
      // Simple check - in a real app you'd want more sophisticated validation
      const normalized = query.toLowerCase().replace(/\s+/g, ' ').trim();
      const expected = practice.expectedQuery.toLowerCase().replace(/\s+/g, ' ').trim();

      // Check if the query is close enough
      if (normalized.includes(expected.split(' ')[0]) && result.success) {
        setIsComplete(true);
      }
    }
  }, [practice.expectedQuery]);

  const showNextHint = () => {
    if (currentHint < practice.hints.length) {
      setCurrentHint(prev => prev + 1);
    }
  };

  return (
    <div className={cn('animate-phase-enter space-y-6', className)}>
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold mb-1">Guided Practice</h2>
        <p className="text-sm text-muted-foreground">
          Follow along and try it yourself
        </p>
      </div>

      {/* Task prompt */}
      <div className="rounded-xl border border-[var(--postgres-blue)]/30 bg-[var(--postgres-blue)]/5 p-4">
        <p className="text-sm font-medium text-foreground/90">
          {practice.prompt}
        </p>
      </div>

      {/* Template hint */}
      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <p className="text-xs text-muted-foreground mb-2">Template:</p>
        <pre className="text-sm font-mono text-foreground/70 whitespace-pre-wrap">
          {practice.template}
        </pre>
      </div>

      {/* Query console */}
      <QueryConsole
        initialQuery=""
        placeholder="Write your query here..."
        onQueryResult={handleQueryResult}
      />

      {/* Hints section */}
      {!isComplete && practice.hints.length > 0 && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={showNextHint}
            disabled={currentHint >= practice.hints.length}
            className="gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {currentHint === 0 ? 'Need a hint?' : 'Another hint'}
          </Button>

          {currentHint > 0 && (
            <p className="text-sm text-muted-foreground">
              {practice.hints[currentHint - 1]}
            </p>
          )}
        </div>
      )}

      {/* Success message */}
      {isComplete && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="font-medium text-emerald-600 dark:text-emerald-400 text-sm">Great job!</p>
            <p className="text-sm text-muted-foreground">
              You&apos;ve got the basics. Ready for a challenge?
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete} className="gap-2">
          {isComplete ? 'Take the challenge' : 'Complete practice first'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
