'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MentorMessage as MentorMessageType } from '@/lib/learn/lessons/types';
import { TextType } from './TextType';

interface MentorMessageProps {
  message: MentorMessageType;
  className?: string;
  animate?: boolean;
}

export function MentorMessage({ message, className, animate = true }: MentorMessageProps) {
  return (
    <div className={cn('animate-slide-in flex gap-3', className)}>
      {/* Avatar */}
      <div className="shrink-0 pt-1">
        <Image
          src="/postgresgui-elephant.png"
          alt={message.name}
          width={72}
          height={72}
          className="object-contain"
        />
      </div>

      {/* Chat bubble */}
      <div className="flex-1 min-w-0 max-w-2xl">
        <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 w-full">
          {/* Name and role */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-semibold">{message.name}</span>
            <span className="text-sm text-muted-foreground">{message.role}</span>
          </div>

          {/* Message */}
          <p className="text-lg leading-relaxed text-foreground">
            {animate ? (
              <TextType text={message.message} speed={15} />
            ) : (
              message.message
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
