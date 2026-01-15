"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowRight, FastForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TextType, TextTypeRef } from "@/components/learn/text-type";

const messages = [
  "Congratulations! 😊",
  "You just landed the job as a Junior Data Analyst at PostgresGUI Inc! Your first assignment is to help the team collect and organize information about our products and customers.",
  "There are many ways to collect data — you could use Excel spreadsheets, Google Sheets, or even write things down with pen and paper. But here at PostgresGUI Inc, we use something more powerful: a database. Let me show you why, and teach you SQL — the language we use to talk to it.",
];

export function WelcomePageClient() {
  const router = useRouter();

  const handleSelectLesson = useCallback(
    (lessonId: string) => {
      router.push(`/learn-sql/${lessonId}/context`);
    },
    [router]
  );

  return (
    <div className="h-full overflow-y-auto">
      <WelcomeScreen onStartLesson={() => handleSelectLesson("getting-started")} />
    </div>
  );
}

function WelcomeScreen({ onStartLesson }: { onStartLesson: () => void }) {
  // Track how many messages are visible
  const [visibleCount, setVisibleCount] = useState(1);
  // Track which message is currently typing (-1 = none)
  const [typingIndex, setTypingIndex] = useState(0);

  // Refs for TextType components
  const textTypeRefs = useRef<(TextTypeRef | null)[]>([null, null, null]);

  const isAllComplete = visibleCount === messages.length && typingIndex === -1;
  const canSkip = typingIndex >= 0;

  const handleTypingComplete = useCallback((index: number) => {
    // Mark typing as complete for this message
    if (index < messages.length - 1) {
      // After a delay, show the next message
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 1, messages.length));
        setTypingIndex(index + 1);
      }, 400);
    } else {
      // All messages done
      setTypingIndex(-1);
    }
  }, []);

  const handleSkip = useCallback(() => {
    if (typingIndex >= 0 && textTypeRefs.current[typingIndex]) {
      textTypeRefs.current[typingIndex]?.skip();
    }
  }, [typingIndex]);

  const handleButtonClick = useCallback(() => {
    if (canSkip) {
      handleSkip();
    } else if (isAllComplete) {
      onStartLesson();
    }
  }, [canSkip, isAllComplete, handleSkip, onStartLesson]);

  return (
    <div className="relative h-full md:grid md:grid-rows-[1fr_auto]">
      {/* Content */}
      <div className="h-full flex flex-col justify-center p-6 md:p-8 pb-24 md:pb-0">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {/* Message 1: Congratulations */}
          {visibleCount >= 1 && (
            <div className="flex gap-1 animate-slide-in">
              <div className="shrink-0 pt-1">
                <Image
                  src="/postgresgui-elephant.png"
                  alt="Sam"
                  width={72}
                  height={72}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-semibold">Sam</span>
                    <span className="text-sm text-muted-foreground">Senior Database Engineer</span>
                  </div>
                  <p className="text-lg leading-relaxed">
                    <TextType
                      ref={(el) => { textTypeRefs.current[0] = el; }}
                      text={messages[0]}
                      speed={15}
                      onComplete={() => handleTypingComplete(0)}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message 2: Got the job */}
          {visibleCount >= 2 && (
            <div className="flex gap-1 animate-slide-in">
              <div className="shrink-0 pt-1">
                <Image
                  src="/postgresgui-elephant.png"
                  alt="Sam"
                  width={72}
                  height={72}
                  className="object-contain opacity-0"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                  <p className="text-lg leading-relaxed">
                    <TextType
                      ref={(el) => { textTypeRefs.current[1] = el; }}
                      text={messages[1]}
                      speed={15}
                      onComplete={() => handleTypingComplete(1)}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message 3: Ways to collect data */}
          {visibleCount >= 3 && (
            <div className="flex gap-1 animate-slide-in">
              <div className="shrink-0 pt-1">
                <Image
                  src="/postgresgui-elephant.png"
                  alt="Sam"
                  width={72}
                  height={72}
                  className="object-contain opacity-0"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                  <p className="text-lg leading-relaxed">
                    <TextType
                      ref={(el) => { textTypeRefs.current[2] = el; }}
                      text={messages[2]}
                      speed={15}
                      onComplete={() => handleTypingComplete(2)}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with button */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 md:static md:z-auto border-t border-border bg-card/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none pb-[env(safe-area-inset-bottom)] md:pb-0">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-end items-center gap-4">
          <Button
            size="xl"
            onClick={handleButtonClick}
            className="min-w-0"
            disabled={!canSkip && !isAllComplete}
            variant={canSkip ? "outline" : "default"}
          >
            {canSkip ? (
              <FastForward className="w-5 h-5" />
            ) : (
              <>
                <span className="truncate">Let's Get Started</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
