'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

interface SuccessCelebrationProps {
  show: boolean;
  xpEarned?: number;
  coinsEarned?: number;
  onComplete?: () => void;
}

export function SuccessCelebration({
  show,
  xpEarned = 0,
  coinsEarned = 0,
  onComplete
}: SuccessCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      // Generate confetti particles
      const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3
      }));
      setParticles(newParticles);

      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: '50%',
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Center checkmark */}
      <div className="animate-scale-bounce">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-500/30 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              className="animate-checkmark"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* XP notification */}
      {xpEarned > 0 && (
        <div
          className="absolute animate-xp-float"
          style={{ top: 'calc(50% - 60px)', right: 'calc(50% - 80px)' }}
        >
          <div className="px-3 py-1.5 rounded-full bg-purple-500 text-white text-sm font-semibold flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-4 h-4" />
            +{xpEarned} XP
          </div>
        </div>
      )}

      {/* Coins notification */}
      {coinsEarned > 0 && (
        <div
          className="absolute animate-xp-float"
          style={{ top: 'calc(50% - 60px)', left: 'calc(50% - 80px)', animationDelay: '0.1s' }}
        >
          <div className="px-3 py-1.5 rounded-full bg-amber-500 text-white text-sm font-semibold flex items-center gap-1.5 shadow-lg">
            +{coinsEarned} coins
          </div>
        </div>
      )}
    </div>
  );
}
