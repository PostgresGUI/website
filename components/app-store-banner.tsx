"use client";

import { useState } from "react";

export function AppStoreBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes slide-in-down {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-out-up {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-100%);
          }
        }
      `}</style>
      <div
        className={`
          relative overflow-hidden
          bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]
          dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a]
          border-b border-white/5
          ${
            isClosing
              ? "animate-[slide-out-up_0.3s_ease-in_forwards]"
              : "animate-[slide-in-down_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          }
        `}
      >
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center pr-8 sm:pr-0">
            {/* Status indicator */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>

            {/* Message */}
            <p className="text-xs sm:text-sm text-white/90 font-medium tracking-tight">
              <span className="hidden sm:inline">Pending App Store Review</span>
              <span className="sm:hidden">App Store Review</span>
              <span className="text-white/50 mx-1.5 sm:mx-2">—</span>
              <span className="text-white/70 font-normal">
                <span className="hidden sm:inline">Submitted </span>
                Jan 3, 2025
                <span className="hidden sm:inline"> at 1:46 PM EST</span>
              </span>
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200 group"
            aria-label="Dismiss banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
