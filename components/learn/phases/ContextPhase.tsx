'use client';

import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';
import { MentorMessage } from '../MentorMessage';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ContextPhaseProps {
  message: MentorMessageType;
  onNext: () => void;
  className?: string;
}

export function ContextPhase({ message, onNext, className }: ContextPhaseProps) {
  return (
    <div className={cn('animate-phase-enter min-h-full flex flex-col', className)}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-lg font-semibold mb-1">Your Task</h2>
            <p className="text-sm text-muted-foreground">
              Sam has a new assignment for you
            </p>
          </div>

          <MentorMessage message={message} className="w-full" />
        </div>
      </div>

      <div className="sticky bottom-0 flex justify-end pt-4 pb-2 bg-gradient-to-t from-card via-card to-transparent">
        <Button size="xl" onClick={onNext} className="gap-2">
          Got it, let&apos;s learn
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
