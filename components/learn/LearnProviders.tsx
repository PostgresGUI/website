"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useRef,
  RefObject,
} from "react";
import { useSQLEngine } from "@/hooks/learn/useSQLEngine";
import { useProgress } from "@/hooks/learn/useProgress";
import { useLesson } from "@/hooks/learn/useLesson";
import {
  Lesson,
  PhaseType,
  QueryResult,
  TableInfo,
  UserProgress,
  Challenge,
} from "@/lib/learn/lessons/types";

// SQL Engine Context
interface SQLEngineContextType {
  isLoading: boolean;
  error: string | null;
  schema: TableInfo[];
  executeQuery: (sql: string) => QueryResult;
  resetDatabase: () => Promise<void>;
  initSchema: (sql: string) => QueryResult;
}

const SQLEngineContext = createContext<SQLEngineContextType | null>(null);

export function useSQLEngineContext() {
  const context = useContext(SQLEngineContext);
  if (!context) {
    throw new Error("useSQLEngineContext must be used within LearnProviders");
  }
  return context;
}

// Progress Context
interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string) => void;
  markPhaseComplete: (lessonId: string, phase: string) => void;
  markChallengeComplete: (lessonId: string, challengeId: string) => void;
  markChallengeIncomplete: (lessonId: string, challengeId: string) => void;
  recordHintUsed: (lessonId: string, challengeId: string, tier: number) => void;
  isLessonComplete: (lessonId: string) => boolean;
  isPhaseComplete: (lessonId: string, phase: string) => boolean;
  isChallengeComplete: (lessonId: string, challengeId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgressContext must be used within LearnProviders");
  }
  return context;
}

// Lesson Context
interface LessonContextType {
  lesson: Lesson | null;
  setLesson: (lesson: Lesson | null) => void;
  currentPhase: PhaseType;
  phaseIndex: number;
  totalPhases: number;
  nextPhase: () => void;
  prevPhase: () => void;
  goToPhase: (phase: PhaseType) => void;
  isFirstPhase: boolean;
  isLastPhase: boolean;
  currentChallengeIndex: number;
  currentChallenge: Challenge | null;
  nextChallenge: () => void;
  isLastChallenge: boolean;
  resetLesson: () => void;
  phases: PhaseType[];
}

const LessonContext = createContext<LessonContextType | null>(null);

export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within LearnProviders");
  }
  return context;
}

// Scroll Context - for auto-scrolling when content expands
interface ScrollContextType {
  scrollContainerRef: RefObject<HTMLElement | null>;
  scrollToBottom: () => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within LearnProviders");
  }
  return context;
}

// Combined Provider
interface LearnProvidersProps {
  children: ReactNode;
}

export function LearnProviders({ children }: LearnProvidersProps) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const sqlEngine = useSQLEngine();
  const progressHook = useProgress();
  const lessonHook = useLesson(currentLesson);

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, []);

  // Initialize schema when lesson changes
  useEffect(() => {
    if (currentLesson?.initialSchema && !sqlEngine.isLoading) {
      sqlEngine.resetDatabase().then(() => {
        if (currentLesson.initialSchema) {
          sqlEngine.initSchema(currentLesson.initialSchema);
        }
      });
    }
  }, [currentLesson?.id]);

  const setLesson = useCallback(
    (lesson: Lesson | null) => {
      // Only reset lesson state if this is a different lesson
      // Don't reset if we're just loading the same lesson (e.g., on page refresh)
      const isNewLesson = currentLesson?.id !== lesson?.id;
      setCurrentLesson(lesson);
      if (isNewLesson) {
        lessonHook.resetLesson();
      }
    },
    [currentLesson?.id, lessonHook.resetLesson]
  );

  return (
    <SQLEngineContext.Provider value={sqlEngine}>
      <ProgressContext.Provider value={progressHook}>
        <LessonContext.Provider
          value={{
            lesson: currentLesson,
            setLesson,
            ...lessonHook,
          }}
        >
          <ScrollContext.Provider value={{ scrollContainerRef, scrollToBottom }}>
            {children}
          </ScrollContext.Provider>
        </LessonContext.Provider>
      </ProgressContext.Provider>
    </SQLEngineContext.Provider>
  );
}
