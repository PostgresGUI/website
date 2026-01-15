"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { SidebarMobile } from "./sidebar-mobile";
import { useParams, useRouter, usePathname } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext, useProgressContext } from "./learn-providers";
import { PhaseType } from "@/lib/learn/lessons/types";

interface LearnLayoutClientProps {
  children: React.ReactNode;
}

export function LearnLayoutClient(props: LearnLayoutClientProps) {
  const { children } = props;
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { lesson, goToPhase, phases } = useLessonContext();
  const { isLessonComplete, isChallengeComplete } = useProgressContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessonId = params?.lessonId as string | undefined;
  const challengeId = params?.challengeId as string | undefined;

  // Determine current phase from pathname
  const currentPhase: PhaseType | null = pathname
    ? (pathname.includes("/quiz/")
        ? "quiz"
        : pathname.includes("/intro")
        ? "intro"
        : pathname.includes("/learn")
        ? "learn"
        : pathname.includes("/practice")
        ? "practice"
        : pathname.includes("/cheatsheet")
        ? "cheatsheet"
        : null)
    : null;

  const challengeParam = challengeId || null;

  const lessons = module1.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle,
  }));

  const getPhaseRoute = (phase: PhaseType, targetLessonId: string) => {
    const basePath = `/learn-sql/${targetLessonId}`;
    return `${basePath}/${phase}`;
  };

  const handleSelectLesson = (selectedLessonId: string) => {
    // Check if lesson is accessible
    const lessonIndex = lessons.findIndex(l => l.id === selectedLessonId);
    if (lessonIndex > 0) {
      const prevLesson = lessons[lessonIndex - 1];
      if (!isLessonComplete(prevLesson.id)) {
        setSidebarOpen(false);
        return; // Don't navigate to locked lesson
      }
    }
    router.push(`/learn-sql/${selectedLessonId}/intro`);
    setSidebarOpen(false);
  };

  const handlePhaseClick = (phase: PhaseType, targetLessonId?: string) => {
    const effectiveLessonId = targetLessonId || lessonId;
    if (!effectiveLessonId) {
      setSidebarOpen(false);
      return;
    }

    const allPhases: PhaseType[] = ['intro', 'learn', 'practice', 'quiz', 'cheatsheet'];
    
    // If not current lesson, check if previous lesson is complete
    if (targetLessonId && targetLessonId !== lessonId) {
      const lessonIndex = lessons.findIndex(l => l.id === targetLessonId);
      if (lessonIndex > 0) {
        const prevLesson = lessons[lessonIndex - 1];
        if (!isLessonComplete(prevLesson.id)) {
          setSidebarOpen(false);
          return; // Don't navigate to locked lesson
        }
      }
    }
    
    // For current lesson, check phase accessibility
    if (effectiveLessonId === lessonId) {
      const phaseIndex = allPhases.indexOf(phase);
      if (phaseIndex > 0) {
        // Check if previous phases are accessible
        const currentPhaseIndex = currentPhase ? allPhases.indexOf(currentPhase) : 0;
        if (currentPhaseIndex < phaseIndex - 1) {
          setSidebarOpen(false);
          return; // Don't navigate to locked phase
        }
      }
    }

    const isDifferentLesson = targetLessonId && targetLessonId !== lessonId;
    const newUrl = getPhaseRoute(phase, effectiveLessonId);

    if (isDifferentLesson) {
      router.push(newUrl);
    } else {
      router.push(newUrl);
      goToPhase(phase);
    }
    setSidebarOpen(false);
  };

  const handleChallengeClick = (challengeId: string) => {
    if (!lessonId || !lesson) {
      setSidebarOpen(false);
      return;
    }

    // Check if challenge is accessible
    const challengeIndex = lesson.phases.quiz.findIndex(c => c.id === challengeId);

    // First challenge is always accessible if we're in quiz phase
    if (challengeIndex === 0) {
      if (currentPhase !== "quiz") {
        setSidebarOpen(false);
        return; // Must be in quiz phase to access challenges
      }
    } else if (challengeIndex > 0) {
      // Other challenges require previous challenge to be complete
      const previousChallenge = lesson.phases.quiz[challengeIndex - 1];
      if (!isChallengeComplete(lessonId, previousChallenge.id)) {
        setSidebarOpen(false);
        return; // Don't navigate to locked challenge
      }
    }

    router.push(`/learn-sql/${lessonId}/quiz/${challengeId}`);
    goToPhase("quiz");
    setSidebarOpen(false);
  };

  return (
    <div className="h-full overflow-hidden bg-muted/50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-[280px] z-30">
        <SidebarNav challengeParam={challengeParam} />
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
        currentLessonId={lessonId || null}
        onSelectLesson={handleSelectLesson}
        currentPhase={currentPhase || undefined}
        phases={phases}
        onPhaseClick={handlePhaseClick}
        challenges={lesson?.phases.quiz}
        currentChallengeId={challengeParam}
        onChallengeClick={handleChallengeClick}
        isChallengeComplete={isChallengeComplete}
      />

      {/* Main Content - Elevated Panel */}
      <main className="md:ml-[280px] h-[calc(100%-3.5rem)] md:h-full md:p-4">
        <div className="h-full bg-card md:rounded-xl md:border md:border-border md:shadow-lg overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
