"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { SyntaxExample } from "@/lib/learn/lessons/types";

interface ConceptPhaseProps {
  concepts: SyntaxExample[];
  className?: string;
}

export function ConceptPhase({ concepts, className }: ConceptPhaseProps) {
  return (
    <div className={cn("animate-phase-enter", className)}>
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
  );
}
