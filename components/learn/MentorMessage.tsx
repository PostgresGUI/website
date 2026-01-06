'use client';

import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';

interface MentorMessageProps {
  message: MentorMessageType;
  className?: string;
}

export function MentorMessage({ message, className }: MentorMessageProps) {
  return (
    <div className={cn(
      'animate-slide-in rounded-xl border border-border/40 bg-card shadow-swiftui overflow-hidden',
      className
    )}>
      {/* Slack-style header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-muted/30">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--postgres-blue)] to-purple-600 flex items-center justify-center text-white font-display text-sm">
            S
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">{message.name}</span>
            <span className="text-xs text-muted-foreground">{message.role}</span>
          </div>
          <p className="text-xs text-muted-foreground">{message.timestamp}</p>
        </div>
      </div>

      {/* Message body */}
      <div className="p-4">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          {message.message}
        </p>
      </div>
    </div>
  );
}
