'use client';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextTypeProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export interface TextTypeRef {
  skip: () => void;
  isComplete: boolean;
}

export const TextType = forwardRef<TextTypeRef, TextTypeProps>(function TextType({
  text,
  speed = 20,
  className,
  onComplete,
}, ref) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useImperativeHandle(ref, () => ({
    skip: () => {
      if (!isComplete) {
        setDisplayedText(text);
        setCurrentIndex(text.length);
        setIsComplete(true);
        onComplete?.();
      }
    },
    isComplete,
  }));

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span className={cn(className)}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse" />
      )}
    </span>
  );
});
