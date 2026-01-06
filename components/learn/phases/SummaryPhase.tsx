'use client';

import { cn } from '@/lib/utils';
import { SyntaxCard as SyntaxCardType } from '@/lib/learn/lessons/types';
import { SyntaxCard } from '../SyntaxCard';
import { useProgressContext } from '../LearnProviders';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, PartyPopper } from 'lucide-react';

interface SummaryPhaseProps {
  card: SyntaxCardType;
  lessonId: string;
  lessonTitle: string;
  onPrev: () => void;
  onComplete: () => void;
  className?: string;
}

export function SummaryPhase({
  card,
  lessonId,
  lessonTitle,
  onPrev,
  onComplete,
  className
}: SummaryPhaseProps) {
  const { markLessonComplete, isLessonComplete } = useProgressContext();
  const alreadyComplete = isLessonComplete(lessonId);

  const handleComplete = () => {
    if (!alreadyComplete) {
      markLessonComplete(lessonId);
    }
    onComplete();
  };

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
      <div className="rounded-xl border border-border/50 bg-card p-4 shadow-swiftui">
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

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Review
        </Button>
        <Button onClick={handleComplete} className="gap-2">
          {alreadyComplete ? 'Continue' : 'Complete & Continue'}
          <CheckCircle2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
