"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "issue-banner-dismissed-v1.1.0";

export function IssueBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    localStorage.setItem(STORAGE_KEY, "true");
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
          bg-gradient-to-r from-emerald-600/90 via-emerald-500/90 to-emerald-600/90
          dark:from-emerald-700/80 dark:via-emerald-600/80 dark:to-emerald-700/80
          border-b border-emerald-400/20
          ${
            isClosing
              ? "animate-[slide-out-up_0.3s_ease-in_forwards]"
              : "animate-[slide-in-down_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          }
        `}
      >
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center pr-8 sm:pr-0">
            {/* Rocket icon */}
            <span className="text-emerald-100 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {/* Message */}
            <p className="text-xs sm:text-sm text-white font-medium tracking-tight">
              <span className="font-semibold">v1.1.0 Coming Soon</span>
              <span className="text-white/70 mx-1.5 sm:mx-2">—</span>
              <span className="text-white/90 font-normal">
                Data display fix + new features
              </span>
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 group"
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
