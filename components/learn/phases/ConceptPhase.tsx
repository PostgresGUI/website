'use client';

import { cn } from '@/lib/utils';
import { SyntaxExample } from '@/lib/learn/lessons/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Code2 } from 'lucide-react';

interface ConceptPhaseProps {
  concepts: SyntaxExample[];
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function ConceptPhase({ concepts, onNext, onPrev, className }: ConceptPhaseProps) {
  return (
    <div className={cn('animate-phase-enter space-y-6', className)}>
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold mb-1">Learn the Concept</h2>
        <p className="text-sm text-muted-foreground">
          Understanding the syntax and how it works
        </p>
      </div>

      <div className="space-y-4">
        {concepts.map((concept, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-swiftui animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
              <div className="w-6 h-6 rounded-md bg-[var(--postgres-blue)]/10 flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-[var(--postgres-blue)]" />
              </div>
              <h3 className="font-semibold text-sm">{concept.title}</h3>
            </div>

            {/* Syntax */}
            <div className="p-4">
              <pre className="p-3 rounded-lg bg-muted/50 border border-border/30 overflow-x-auto mb-3">
                <code className="text-sm font-mono text-foreground/90 whitespace-pre">
                  {concept.syntax}
                </code>
              </pre>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {concept.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={onNext} className="gap-2">
          Try it out
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
