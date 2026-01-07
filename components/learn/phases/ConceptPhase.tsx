"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { SyntaxExample } from "@/lib/learn/lessons/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ConceptPhaseProps {
  concepts: SyntaxExample[];
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function ConceptPhase({
  concepts,
  onNext,
  onPrev,
  className,
}: ConceptPhaseProps) {
  return (
    <div className={cn("animate-phase-enter min-h-full flex flex-col", className)}>
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-2xl space-y-6 px-4">
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
                className="animate-slide-in flex gap-3"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Avatar - only visible on first message */}
                <div className="shrink-0 pt-1">
                  <Image
                    src="/postgresgui-elephant.png"
                    alt="Sam"
                    width={72}
                    height={72}
                    className={cn("object-contain", index > 0 && "opacity-0")}
                  />
                </div>

                {/* Chat bubble */}
                <div className="flex-1 min-w-0">
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-semibold">{concept.title}</span>
                    </div>

                    <p className="text-lg leading-relaxed text-foreground mb-3">
                      {concept.explanation}
                    </p>

                    <pre className="p-3 rounded-lg bg-card border border-border overflow-x-auto">
                      <code className="text-sm font-mono text-foreground/90 whitespace-pre">
                        {concept.syntax}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 flex justify-between pt-4 pb-2 bg-gradient-to-t from-card via-card to-transparent px-4">
        <Button size="xl" variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button size="xl" onClick={onNext} className="gap-2">
          Try it out
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
