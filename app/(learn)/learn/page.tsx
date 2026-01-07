"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { module1 } from "@/lib/learn/lessons/module1";
import { Lesson } from "@/lib/learn/lessons/types";
import { useLessonContext } from "@/components/learn/LearnProviders";
import { Sidebar } from "@/components/learn/Sidebar";
import { SidebarMobile } from "@/components/learn/SidebarMobile";
import { LessonView } from "@/components/learn/LessonView";
import { Menu, ArrowRight, Trophy, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
  const { lesson, setLesson } = useLessonContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessons = module1.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle,
  }));

  const handleSelectLesson = useCallback(
    (lessonId: string) => {
      const selected = module1.lessons.find((l) => l.id === lessonId) || null;
      setLesson(selected);
    },
    [setLesson]
  );

  const handleLessonComplete = useCallback(() => {
    // Find next lesson
    if (lesson) {
      const currentIndex = module1.lessons.findIndex((l) => l.id === lesson.id);
      if (currentIndex < module1.lessons.length - 1) {
        setLesson(module1.lessons[currentIndex + 1]);
      } else {
        // All lessons complete
        setLesson(null);
      }
    }
  }, [lesson, setLesson]);

  return (
    <div className="h-screen overflow-hidden bg-muted/50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-[280px] z-30">
        <Sidebar
          lessons={lessons}
          currentLessonId={lesson?.id || null}
          onSelectLesson={handleSelectLesson}
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
        currentLessonId={lesson?.id || null}
        onSelectLesson={handleSelectLesson}
      />

      {/* Main Content - Elevated Panel */}
      <main className="md:ml-[280px] h-screen md:p-4">
        <div className="h-full md:h-[calc(100vh-2rem)] bg-card md:rounded-xl md:border md:border-border md:shadow-lg overflow-hidden">
          <div className="h-full overflow-y-auto">
            {lesson ? (
              <LessonView
                lesson={lesson}
                onLessonComplete={handleLessonComplete}
              />
            ) : (
              <WelcomeScreen onStartLesson={() => handleSelectLesson("1-1")} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function WelcomeScreen({ onStartLesson }: { onStartLesson: () => void }) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="max-w-lg text-center animate-slide-in">
        <h2 className="text-3xl mb-12 font-bold">
          Learn SQL through hands-on challenges. You'll be writing real queries
          in minutes.
        </h2>

        {/* Features */}
        <div className="grid gap-3 mb-8 text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-bold">5 Interactive Lessons</p>
              <p className="text-muted-foreground">
                Learn by doing, not just reading
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold">Real Challenges</p>
              <p className="text-muted-foreground">
                Practice with realistic scenarios
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-bold">Earn XP & Track Progress</p>
              <p className="text-muted-foreground">Watch your skills grow</p>
            </div>
          </div>
        </div>

        <Button size="lg" onClick={onStartLesson} className="gap-2 px-8">
          Start Learning
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
