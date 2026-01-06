'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { X } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  shortTitle: string;
}

interface SidebarMobileProps {
  open: boolean;
  onClose: () => void;
  lessons: Lesson[];
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
}

export function SidebarMobile({
  open,
  onClose,
  lessons,
  currentLessonId,
  onSelectLesson
}: SidebarMobileProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [open, onClose]);

  const handleSelectLesson = (lessonId: string) => {
    onSelectLesson(lessonId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-out md:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full bg-background">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <Sidebar
            lessons={lessons}
            currentLessonId={currentLessonId}
            onSelectLesson={handleSelectLesson}
            className="h-full"
          />
        </div>
      </div>
    </>
  );
}
