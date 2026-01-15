"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { SyntaxCard as SyntaxCardType } from "@/lib/learn/lessons/types";
import { SyntaxCard } from "../syntax-card";
import { useProgressContext } from "../learn-providers";
import { CheckCircle2, PartyPopper } from "lucide-react";

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
  className,
}: SummaryPhaseProps) {
  const { markLessonComplete, isLessonComplete } = useProgressContext();

  // Auto-mark lesson complete when reaching summary
  useEffect(() => {
    if (!isLessonComplete(lessonId)) {
      markLessonComplete(lessonId);
    }
  }, [lessonId, isLessonComplete, markLessonComplete]);

  return (
    <div className={cn("animate-phase-enter space-y-6", className)}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 mx-auto mb-4 flex items-center justify-center">
          <PartyPopper className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Lesson Complete!</h2>
        <p className="text-sm text-muted-foreground">
          You&apos;ve mastered {lessonTitle}
        </p>
      </div>

      {/* What you learned */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="font-semibold text-sm">What you learned</h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <ol className="space-y-2 list-none">
            {card.examples.map((example, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="font-mono">{i + 1}.</span>
                <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                  {example.split(" ")[0]}
                </code>
                <span className="text-muted-foreground">syntax and usage</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Summary card */}
      <div className="mb-6">
        <SyntaxCard card={card} />
      </div>
    </div>
  );
}
