"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function WelcomePageClient() {
  const router = useRouter();

  const handleSelectLesson = useCallback(
    (lessonId: string) => {
      router.push(`/learn-sql/${lessonId}`);
    },
    [router]
  );

  return (
    <div className="h-full overflow-y-auto">
      <WelcomeScreen onStartLesson={() => handleSelectLesson("1-0")} />
    </div>
  );
}

function WelcomeScreen({ onStartLesson }: { onStartLesson: () => void }) {
  const [visibleMessages, setVisibleMessages] = useState<boolean[]>([false, false, false]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show first message immediately
    const timer1 = setTimeout(() => {
      setVisibleMessages([true, false, false]);
    }, 100);

    // Show second message after first animation completes (700ms) + delay
    const timer2 = setTimeout(() => {
      setVisibleMessages([true, true, false]);
    }, 1000);

    // Show third message after second animation completes
    const timer3 = setTimeout(() => {
      setVisibleMessages([true, true, true]);
    }, 1900);

    // Show button after third animation completes
    const timer4 = setTimeout(() => {
      setShowButton(true);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="h-full flex flex-col justify-center p-6 md:p-8">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Message 1: Congratulations */}
        <div className={cn(
          "flex gap-3 transition-opacity duration-700",
          visibleMessages[0] ? "opacity-100 animate-slide-in" : "opacity-0"
        )}>
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
              <p className="text-lg leading-relaxed">Congratulations! 😊</p>
            </div>
          </div>
        </div>

        {/* Message 2: Got the job */}
        <div className={cn(
          "flex gap-3 transition-opacity duration-700",
          visibleMessages[1] ? "opacity-100 animate-slide-in" : "opacity-0"
        )}>
          <div className="shrink-0 pt-1 w-[72px]" />
          <div className="flex-1 min-w-0">
            <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
              <p className="text-lg leading-relaxed">
                You just landed the job as a Junior Data Analyst at NorthLoop! Your first assignment is to help the team collect and organize information about our products and customers.
              </p>
            </div>
          </div>
        </div>

        {/* Message 3: Ways to collect data */}
        <div className={cn(
          "flex gap-3 transition-opacity duration-700",
          visibleMessages[2] ? "opacity-100 animate-slide-in" : "opacity-0"
        )}>
          <div className="shrink-0 pt-1 w-[72px]" />
          <div className="flex-1 min-w-0">
            <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
              <p className="text-lg leading-relaxed">
                There are many ways to collect data — you could use Excel spreadsheets, Google Sheets, or even write things down with pen and paper. But here at NorthLoop, we use something more powerful: a <strong>database</strong>. Let me show you why, and teach you SQL — the language we use to talk to it.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className={cn(
          "flex gap-3 transition-opacity duration-700",
          showButton ? "opacity-100 animate-slide-in" : "opacity-0"
        )}>
          <div className="shrink-0 pt-1 w-[72px]" />
          <div className="flex-1 min-w-0">
            <Button size="lg" onClick={onStartLesson} className="gap-2 px-8">
              Let's Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
