"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "issue-banner-dismissed-float-bug";

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
          bg-gradient-to-r from-amber-600/90 via-amber-500/90 to-amber-600/90
          dark:from-amber-700/80 dark:via-amber-600/80 dark:to-amber-700/80
          border-b border-amber-400/20
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
            {/* Warning icon */}
            <span className="text-amber-100 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {/* Message */}
            <p className="text-xs sm:text-sm text-white font-medium tracking-tight">
              <span className="font-semibold">Known Issue</span>
              <span className="text-white/70 mx-1.5 sm:mx-2">—</span>
              <span className="text-white/90 font-normal">
                <span className="hidden sm:inline">
                  Float values may appear incorrectly. Fix in progress.
                </span>
                <span className="sm:hidden">
                  Float values may display incorrectly.
                </span>
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
