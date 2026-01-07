'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';

interface MentorMessageProps {
  message: MentorMessageType;
  className?: string;
}

export function MentorMessage({ message, className }: MentorMessageProps) {
  return (
    <div className={cn(
      'animate-slide-in rounded-xl border border-border bg-card shadow-swiftui overflow-hidden',
      className
    )}>
      {/* Slack-style header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/40">
        {/* Avatar */}
        <Image
          src="/postgresgui-elephant.png"
          alt="Sam"
          width={40}
          height={40}
          className="object-contain"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">{message.name}</span>
            <span className="text-xs text-muted-foreground">{message.role}</span>
          </div>
        </div>
      </div>

      {/* Message body */}
      <div className="p-4">
        <p className="text-[15px] leading-relaxed text-foreground">
          {message.message}
        </p>
      </div>
    </div>
  );
}
