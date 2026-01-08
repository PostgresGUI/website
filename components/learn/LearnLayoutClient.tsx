"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { SidebarNav } from "./SidebarNav";
import { SidebarMobile } from "./SidebarMobile";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";
import { useLessonContext } from "./LearnProviders";
import { PhaseType } from "@/lib/learn/lessons/types";

interface LearnLayoutClientProps {
  children: React.ReactNode;
}

export function LearnLayoutClient(props: LearnLayoutClientProps) {
  const { children } = props;
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lesson, goToPhase, phases } = useLessonContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessonId = params?.lessonId as string | undefined;
  const currentPhase = searchParams?.get("phase") as PhaseType | null;
  const challengeParam = searchParams?.get("challenge") || null;

  const lessons = module1.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle,
  }));

  const handleSelectLesson = (selectedLessonId: string) => {
    router.push(`/learn-sql/${selectedLessonId}`);
    setSidebarOpen(false);
  };

  const handlePhaseClick = (phase: PhaseType) => {
    if (lessonId) {
      const url = new URL(window.location.href);
      url.searchParams.set("phase", phase);
      if (phase === "challenge" && lesson) {
        const firstChallengeId = lesson.phases.challenges[0]?.id;
        if (firstChallengeId && !url.searchParams.get("challenge")) {
          url.searchParams.set("challenge", firstChallengeId);
        }
      } else {
        url.searchParams.delete("challenge");
      }
      router.replace(url.pathname + url.search, { scroll: false });
      goToPhase(phase);
    }
    setSidebarOpen(false);
  };

  const handleChallengeClick = (challengeId: string) => {
    if (lessonId) {
      const url = new URL(window.location.href);
      url.searchParams.set("phase", "challenge");
      url.searchParams.set("challenge", challengeId);
      router.replace(url.pathname + url.search, { scroll: false });
      goToPhase("challenge");
    }
    setSidebarOpen(false);
  };

  return (
    <div className="h-full overflow-hidden bg-muted/50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-[280px] z-30">
        <SidebarNav />
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
        challenges={lesson?.phases.challenges}
        currentChallengeId={challengeParam}
        onChallengeClick={handleChallengeClick}
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
