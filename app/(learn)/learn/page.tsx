'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { module1 } from '@/lib/learn/lessons/module1';
import { Lesson } from '@/lib/learn/lessons/types';
import { useLessonContext } from '@/components/learn/LearnProviders';
import { Sidebar } from '@/components/learn/Sidebar';
import { SidebarMobile } from '@/components/learn/SidebarMobile';
import { LessonView } from '@/components/learn/LessonView';
import { Menu, Database, ArrowRight, Trophy, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LearnPage() {
  const { lesson, setLesson } = useLessonContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessons = module1.lessons.map(l => ({
    id: l.id,
    title: l.title,
    shortTitle: l.shortTitle
  }));

  const handleSelectLesson = useCallback((lessonId: string) => {
    const selected = module1.lessons.find(l => l.id === lessonId) || null;
    setLesson(selected);
  }, [setLesson]);

  const handleLessonComplete = useCallback(() => {
    // Find next lesson
    if (lesson) {
      const currentIndex = module1.lessons.findIndex(l => l.id === lesson.id);
      if (currentIndex < module1.lessons.length - 1) {
        setLesson(module1.lessons[currentIndex + 1]);
      } else {
        // All lessons complete
        setLesson(null);
      }
    }
  }, [lesson, setLesson]);

  return (
    <div className="min-h-screen bg-background">
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
      <header className="md:hidden sticky top-0 z-40 h-14 border-b border-border/30 bg-card/80 backdrop-blur-lg flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="ml-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-[var(--postgres-blue)]" />
          <span className="font-display text-sm">QueryCraft</span>
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

      {/* Main Content */}
      <main className="md:ml-[280px] min-h-screen">
        {lesson ? (
          <LessonView
            lesson={lesson}
            onLessonComplete={handleLessonComplete}
          />
        ) : (
          <WelcomeScreen onStartLesson={() => handleSelectLesson('1-1')} />
        )}
      </main>
    </div>
  );
}

function WelcomeScreen({ onStartLesson }: { onStartLesson: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg text-center animate-slide-in">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--postgres-blue)] to-purple-600 mx-auto mb-6 flex items-center justify-center shadow-xl shadow-[var(--postgres-blue)]/20">
          <Database className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-display mb-2">Welcome to QueryCraft</h1>
        <p className="text-muted-foreground mb-8">
          Master SQL through hands-on challenges. You'll be writing real queries in minutes.
        </p>

        {/* Features */}
        <div className="grid gap-3 mb-8 text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/30">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="font-medium text-sm">5 Interactive Lessons</p>
              <p className="text-xs text-muted-foreground">Learn by doing, not just reading</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/30">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-medium text-sm">Real Challenges</p>
              <p className="text-xs text-muted-foreground">Practice with realistic scenarios</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/30">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium text-sm">Earn XP & Track Progress</p>
              <p className="text-xs text-muted-foreground">Watch your skills grow</p>
            </div>
          </div>
        </div>

        <Button size="lg" onClick={onStartLesson} className="gap-2 px-8">
          Start Learning
          <ArrowRight className="w-4 h-4" />
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          Module 1: SQL Foundations • ~45 minutes
        </p>
      </div>
    </div>
  );
}
