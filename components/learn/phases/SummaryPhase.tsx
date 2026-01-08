'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SyntaxCard as SyntaxCardType } from '@/lib/learn/lessons/types';
import { SyntaxCard } from '../SyntaxCard';
import { useProgressContext } from '../LearnProviders';
import { CheckCircle2, PartyPopper } from 'lucide-react';

interface SummaryPhaseProps {
  card: SyntaxCardType;
  lessonId: string;
  lessonTitle: string;
  className?: string;
}

export function SummaryPhase({
  card,
  lessonId,
  lessonTitle,
  className
}: SummaryPhaseProps) {
  const { markLessonComplete, isLessonComplete } = useProgressContext();

  // Auto-mark lesson complete when reaching summary
  useEffect(() => {
    if (!isLessonComplete(lessonId)) {
      markLessonComplete(lessonId);
    }
  }, [lessonId, isLessonComplete, markLessonComplete]);

  return (
    <div className={cn('animate-phase-enter space-y-6', className)}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 mx-auto mb-4 flex items-center justify-center">
          <PartyPopper className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Lesson Complete!</h2>
        <p className="text-sm text-muted-foreground">
          You&apos;ve mastered {lessonTitle}
        </p>
      </div>

      {/* Summary card */}
      <div className="mb-6">
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Save this reference card for later:
        </p>
        <SyntaxCard card={card} />
      </div>

      {/* What you learned */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-swiftui">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          What you learned
        </h3>
        <ul className="space-y-2">
          {card.examples.map((example, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-[var(--postgres-blue)] mt-1">•</span>
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                {example.split(' ')[0]}
              </code>
              <span className="text-muted-foreground">syntax and usage</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
