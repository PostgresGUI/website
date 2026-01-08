"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GuidedPractice, QueryResult } from "@/lib/learn/lessons/types";
import { QueryConsole } from "../QueryConsole";
import { MentorMessage } from "../MentorMessage";

interface GuidedPhaseProps {
  practice: GuidedPractice;
  className?: string;
}

export function GuidedPhase({ practice, className }: GuidedPhaseProps) {
  const [isComplete, setIsComplete] = useState(false);

  const handleQueryResult = useCallback(
    (result: QueryResult, query: string) => {
      if (result.success) {
        const normalized = query.toLowerCase().replace(/\s+/g, " ").trim();
        const expected = practice.expectedQuery
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();
        if (normalized.includes(expected.split(" ")[0]) && result.success) {
          setIsComplete(true);
        }
      }
    },
    [practice.expectedQuery]
  );

  return (
    <div className={cn("animate-phase-enter space-y-6", className)}>
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold mb-1">Guided Practice</h2>
        <p className="text-sm text-muted-foreground">
          Follow along and try it yourself
        </p>
      </div>

      {/* Task prompt as chat bubble with syntax */}
      <MentorMessage
        message={{
          name: "Sam",
          role: "Senior Database Engineer",
          message: practice.prompt,
        }}
        syntax={practice.template}
        animate={false}
      />

      {/* Query console */}
      <QueryConsole
        initialQuery=""
        placeholder="Write your query here..."
        onQueryResult={handleQueryResult}
      />

      {/* Success message */}
      {isComplete && (
        <MentorMessage
          message={{
            name: "Sam",
            role: "Senior Database Engineer",
            message: "Great job! You've got the basics. Ready for a challenge?",
          }}
          variant="success"
          animate={false}
        />
      )}
    </div>
  );
}
