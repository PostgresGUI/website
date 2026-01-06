'use client';

import { cn } from '@/lib/utils';
import { SyntaxCard as SyntaxCardType } from '@/lib/learn/lessons/types';
import { useProgressContext } from './LearnProviders';
import { Bookmark, BookmarkCheck, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SyntaxCardProps {
  card: SyntaxCardType;
  className?: string;
  showSaveButton?: boolean;
}

export function SyntaxCard({ card, className, showSaveButton = true }: SyntaxCardProps) {
  const { progress, saveCard } = useProgressContext();
  const isSaved = progress.savedCards.includes(card.id);

  return (
    <div className={cn(
      'rounded-xl border border-border/50 bg-card overflow-hidden shadow-swiftui',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--postgres-blue)]/10 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-[var(--postgres-blue)]" />
          </div>
          <h3 className="font-semibold text-sm">{card.title}</h3>
        </div>
        {showSaveButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => saveCard(card.id)}
            className={cn(
              'h-8 px-2',
              isSaved && 'text-[var(--postgres-blue)]'
            )}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Syntax */}
      <div className="p-4">
        <pre className="p-3 rounded-lg bg-muted/50 border border-border/30 overflow-x-auto">
          <code className="text-sm font-mono text-foreground/90 whitespace-pre">
            {card.syntax}
          </code>
        </pre>
      </div>

      {/* Examples */}
      {card.examples.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Examples</p>
          <div className="space-y-2">
            {card.examples.map((example, i) => (
              <pre
                key={i}
                className="p-2 rounded-md bg-muted/30 border border-border/20 overflow-x-auto"
              >
                <code className="text-xs font-mono text-foreground/80">{example}</code>
              </pre>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {card.tips && card.tips.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Tips</p>
          <ul className="space-y-1">
            {card.tips.map((tip, i) => (
              <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                <span className="text-[var(--postgres-blue)]">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
