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
    <div className={cn('animate-phase-enter space-y-6', className)}>
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold mb-1">Your Task</h2>
        <p className="text-sm text-muted-foreground">
          Sam has a new assignment for you
        </p>
      </div>

      <MentorMessage message={message} />

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} className="gap-2">
          Got it, let&apos;s learn
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
