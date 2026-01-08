"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "@/components/learn/LearnProviders";
import { LessonView } from "@/components/learn/LessonView";
import { Sidebar } from "@/components/learn/Sidebar";
import { SidebarMobile } from "@/components/learn/SidebarMobile";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { PhaseType } from "@/lib/learn/lessons/types";

export function LessonPageClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lesson, setLesson, goToPhase, currentPhase, phases } = useLessonContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessonId = params.lessonId as string;
  const phaseParam = searchParams.get("phase");
  const challengeParam = searchParams.get("challenge");

  const lessons = module1.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle,
  }));

  // Load lesson from URL on mount or when lessonId changes
  useEffect(() => {
    if (lessonId) {
      const foundLesson = module1.lessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        // Invalid lesson ID, redirect to welcome
        router.replace("/learn-sql");
      }
    }
  }, [lessonId, setLesson, router]);

  // Sync phase from URL query param or set default
  useEffect(() => {
    if (lesson) {
      const validPhases = ["context", "concept", "guided", "challenge", "summary"];

      // If challenge param exists but phase is not challenge, set phase to challenge
      if (challengeParam && phaseParam !== "challenge") {
        const challengeExists = lesson.phases.challenges.some(c => c.id === challengeParam);
        if (challengeExists) {
          router.replace(`/learn-sql/${lessonId}?phase=challenge&challenge=${challengeParam}`, { scroll: false });
          return;
        } else {
          // Invalid challenge ID, remove it
          router.replace(`/learn-sql/${lessonId}?phase=${phaseParam || "context"}`, { scroll: false });
          return;
        }
      }

      if (phaseParam && validPhases.includes(phaseParam)) {
        goToPhase(phaseParam as PhaseType);
      } else if (!phaseParam) {
        // No phase param, set default to context
        router.replace(`/learn-sql/${lessonId}?phase=context`, { scroll: false });
      }
    }
  }, [phaseParam, challengeParam, lesson, goToPhase, lessonId, router]);

  const handleSelectLesson = useCallback(
    (selectedLessonId: string) => {
      router.push(`/learn-sql/${selectedLessonId}`);
    },
    [router]
  );

  const handlePhaseClick = useCallback(
    (phase: PhaseType) => {
      if (lesson) {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", phase);
        // If switching to challenge phase and no challenge param, set first challenge
        if (phase === "challenge") {
          const firstChallengeId = lesson.phases.challenges[0]?.id;
          if (firstChallengeId && !url.searchParams.get("challenge")) {
            url.searchParams.set("challenge", firstChallengeId);
          }
        } else {
          // If leaving challenge phase, remove challenge param
          url.searchParams.delete("challenge");
        }
        router.replace(url.pathname + url.search, { scroll: false });
        goToPhase(phase);
      }
    },
    [lesson, router, goToPhase]
  );

  const handleChallengeClick = useCallback(
    (challengeId: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set("phase", "challenge");
      url.searchParams.set("challenge", challengeId);
      router.replace(url.pathname + url.search, { scroll: false });
      goToPhase("challenge");
    },
    [router, goToPhase]
  );

  const handleLessonComplete = useCallback(() => {
    if (lesson) {
      const currentIndex = module1.lessons.findIndex((l) => l.id === lesson.id);
      if (currentIndex < module1.lessons.length - 1) {
        // Navigate to next lesson
        const nextLessonId = module1.lessons[currentIndex + 1].id;
        router.push(`/learn-sql/${nextLessonId}`);
      } else {
        // All lessons complete, go back to welcome
        router.push("/learn-sql");
      }
    }
  }, [lesson, router]);

  // Show loading state while lesson is being loaded
  if (!lesson || lesson.id !== lessonId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-muted/50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-[280px] z-30">
        <Sidebar
          lessons={lessons}
          currentLessonId={lesson.id}
          onSelectLesson={handleSelectLesson}
          currentPhase={currentPhase}
          phases={phases}
          onPhaseClick={handlePhaseClick}
          challenges={lesson.phases.challenges}
          currentChallengeId={challengeParam}
          onChallengeClick={handleChallengeClick}
          className="h-full"
        />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 h-14 border-b border-border bg-card/90 backdrop-blur-lg flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="ml-3 flex items-center gap-2">
          <Image
            src="/postgresgui-elephant.png"
            alt="PostgresGUI"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-display">Learn PostgreSQL</span>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <SidebarMobile
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        lessons={lessons}
        currentLessonId={lesson.id}
        onSelectLesson={handleSelectLesson}
        currentPhase={currentPhase}
        phases={phases}
        onPhaseClick={handlePhaseClick}
        challenges={lesson.phases.challenges}
        currentChallengeId={challengeParam}
        onChallengeClick={handleChallengeClick}
      />

      {/* Main Content - Elevated Panel */}
      <main className="md:ml-[280px] h-[calc(100%-3.5rem)] md:h-full md:p-4">
        <div className="h-full bg-card md:rounded-xl md:border md:border-border md:shadow-lg overflow-hidden">
          <LessonView
            lesson={lesson}
            onLessonComplete={handleLessonComplete}
            className="h-full"
          />
        </div>
      </main>
    </div>
  );
}
