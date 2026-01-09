"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SyntaxExample } from "@/lib/learn/lessons/types";
import { TextType, TextTypeRef } from "../TextType";
import { Button } from "@/components/ui/button";

interface ConceptPhaseProps {
  concepts: SyntaxExample[];
  className?: string;
  onAllComplete?: () => void;
}

export function ConceptPhase({ concepts, className, onAllComplete }: ConceptPhaseProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textTypeRef = useRef<TextTypeRef>(null);
  const [syntaxDisplayed, setSyntaxDisplayed] = useState(false);
  const [hasCalledOnComplete, setHasCalledOnComplete] = useState(false);
  const isSkippingRef = useRef(false);

  // Reset state when concepts change
  useEffect(() => {
    setCurrentMessageIndex(0);
    setIsTypingComplete(false);
    setSyntaxDisplayed(false);
    setHasCalledOnComplete(false);
    isSkippingRef.current = false;
  }, [concepts]);

  const currentConcept = concepts[currentMessageIndex];
  const isLastMessage = currentMessageIndex === concepts.length - 1;
  const allMessagesComplete = currentMessageIndex === concepts.length - 1 && isTypingComplete && syntaxDisplayed;

  useEffect(() => {
    if (allMessagesComplete && !hasCalledOnComplete) {
      setHasCalledOnComplete(true);
      onAllComplete?.();
    }
  }, [allMessagesComplete, hasCalledOnComplete, onAllComplete]);

  const handleSkip = () => {
    if (!isTypingComplete && textTypeRef.current) {
      isSkippingRef.current = true;
      textTypeRef.current.skip();
      // When skipping, show syntax immediately
      setIsTypingComplete(true);
      setSyntaxDisplayed(true);
    }
  };

  const handleNext = () => {
    if (isTypingComplete && syntaxDisplayed) {
      if (!isLastMessage) {
        setCurrentMessageIndex((prev) => prev + 1);
        setIsTypingComplete(false);
        setSyntaxDisplayed(false);
        isSkippingRef.current = false;
      }
    }
  };

  const handleTypingComplete = () => {
    // If we already skipped, don't update state again
    if (isSkippingRef.current) {
      isSkippingRef.current = false;
      return;
    }
    
    if (!isTypingComplete) {
      setIsTypingComplete(true);
      // Small delay before showing syntax block for better UX
      setTimeout(() => {
        setSyntaxDisplayed(true);
      }, 300);
    }
  };

  if (concepts.length === 0) {
    return null;
  }

  return (
    <div className={cn("animate-phase-enter", className)}>
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold mb-1">Learn the Concept</h2>
        <p className="text-sm text-muted-foreground">
          Understanding the syntax and how it works
        </p>
      </div>

      <div className="space-y-4">
        {/* Display all previous messages */}
        {concepts.slice(0, currentMessageIndex).map((concept, index) => (
          <div key={index} className="flex gap-3">
            <div className="shrink-0 pt-1">
              <Image
                src="/postgresgui-elephant.png"
                alt="Sam"
                width={72}
                height={72}
                className={cn("object-contain", index > 0 && "opacity-0")}
              />
            </div>

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

        {/* Current message with typing animation */}
        <div className="flex gap-3">
          <div className="shrink-0 pt-1">
            <Image
              src="/postgresgui-elephant.png"
              alt="Sam"
              width={72}
              height={72}
              className={cn("object-contain", currentMessageIndex > 0 && "opacity-0")}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-semibold">{currentConcept.title}</span>
              </div>

              <p className="text-lg leading-relaxed text-foreground mb-3">
                <TextType
                  key={currentMessageIndex}
                  ref={textTypeRef}
                  text={currentConcept.explanation}
                  speed={15}
                  onComplete={handleTypingComplete}
                />
              </p>

              {syntaxDisplayed && (
                <pre className="p-3 rounded-lg bg-card border border-border overflow-x-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <code className="text-sm font-mono text-foreground/90 whitespace-pre">
                    {currentConcept.syntax}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skip/Next Button */}
      <div className="flex justify-end mt-6">
        <Button
          size="lg"
          onClick={isTypingComplete && syntaxDisplayed ? handleNext : handleSkip}
          disabled={isLastMessage && isTypingComplete && syntaxDisplayed}
          variant={isTypingComplete && syntaxDisplayed ? "default" : "outline"}
        >
          {isTypingComplete && syntaxDisplayed
            ? isLastMessage
              ? "Complete"
              : "Next"
            : "Skip"}
        </Button>
      </div>
    </div>
  );
}
