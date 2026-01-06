'use client';

import { cn } from '@/lib/utils';
import { ProgressRing } from './ProgressRing';
import { useProgressContext } from './LearnProviders';
import {
  Database,
  Check,
  Lock,
  Sparkles,
  Coins,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  shortTitle: string;
}

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  className?: string;
}

export function Sidebar({
  lessons,
  currentLessonId,
  onSelectLesson,
  className
}: SidebarProps) {
  const { progress, isLessonComplete } = useProgressContext();

  const completedCount = lessons.filter(l => isLessonComplete(l.id)).length;
  const progressPercent = (completedCount / lessons.length) * 100;

  return (
    <aside className={cn(
      'flex flex-col h-full bg-card/50 border-r border-border/30',
      className
    )}>
      {/* Header */}
      <div className="p-5 border-b border-border/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--postgres-blue)]/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-[var(--postgres-blue)]" />
          </div>
          <div>
            <h1 className="font-display text-base">QueryCraft</h1>
            <p className="text-xs text-muted-foreground">Learn SQL</p>
          </div>
        </div>
      </div>

      {/* Module Progress */}
      <div className="p-5 border-b border-border/30">
        <div className="flex items-center gap-4">
          <ProgressRing progress={progressPercent} size={56} strokeWidth={4} />
          <div>
            <p className="text-sm font-medium">Module 1</p>
            <p className="text-xs text-muted-foreground">Foundations</p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} of {lessons.length} complete
            </p>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3">
        <div className="space-y-1">
          {lessons.map((lesson, index) => {
            const isComplete = isLessonComplete(lesson.id);
            const isCurrent = currentLessonId === lesson.id;
            const isLocked = index > 0 && !isLessonComplete(lessons[index - 1].id) && !isCurrent;

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && onSelectLesson(lesson.id)}
                disabled={isLocked}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-swiftui group',
                  isCurrent && 'bg-[var(--postgres-blue)]/10 text-[var(--postgres-blue)]',
                  !isCurrent && !isLocked && 'hover:bg-muted/50',
                  isLocked && 'opacity-50 cursor-not-allowed'
                )}
              >
                {/* Status icon */}
                <div className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono shrink-0',
                  isComplete && 'bg-emerald-500/10 text-emerald-600',
                  isCurrent && !isComplete && 'bg-[var(--postgres-blue)]/10 text-[var(--postgres-blue)]',
                  !isCurrent && !isComplete && !isLocked && 'bg-muted text-muted-foreground',
                  isLocked && 'bg-muted text-muted-foreground'
                )}>
                  {isComplete ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-medium truncate',
                    isCurrent && 'text-[var(--postgres-blue)]'
                  )}>
                    {lesson.shortTitle}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lesson.title}
                  </p>
                </div>

                {/* Arrow for current */}
                {isCurrent && (
                  <ChevronRight className="w-4 h-4 text-[var(--postgres-blue)] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Final Project */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <button
            onClick={() => onSelectLesson('project')}
            disabled={completedCount < lessons.length}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-swiftui',
              currentLessonId === 'project' && 'bg-[var(--postgres-blue)]/10',
              completedCount < lessons.length && 'opacity-50 cursor-not-allowed',
              completedCount >= lessons.length && currentLessonId !== 'project' && 'hover:bg-muted/50'
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-md flex items-center justify-center',
              completedCount >= lessons.length ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground'
            )}>
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Final Project</p>
              <p className="text-xs text-muted-foreground">Design Your Database</p>
            </div>
          </button>
        </div>
      </div>

      {/* XP and Coins */}
      <div className="p-4 border-t border-border/30 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">XP</p>
              <p className="text-sm font-mono font-semibold">{progress.xp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Coins</p>
              <p className="text-sm font-mono font-semibold">{progress.coins}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
