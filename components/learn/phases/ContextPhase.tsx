'use client';

import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';
import { MentorMessage } from '../MentorMessage';

interface ContextPhaseProps {
  message: MentorMessageType;
  className?: string;
}

export function ContextPhase({ message, className }: ContextPhaseProps) {
  return (
    <div className={cn('animate-phase-enter', className)}>
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold mb-1">Your Task</h2>
        <p className="text-sm text-muted-foreground">
          Sam has a new assignment for you
        </p>
      </div>

      <MentorMessage message={message} />
    </div>
  );
}
