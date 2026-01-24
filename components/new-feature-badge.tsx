"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sql-editor-promo-dismissed";

export function NewFeatureBadge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isVisible) return null;

  return (
    <a
      href="/sql-editor"
      className="group fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-4 fade-in"
      style={{
        animationDuration: "400ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-stone-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg shadow-stone-900/10 dark:shadow-black/20 hover:bg-gray-100 dark:hover:bg-stone-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
        {/* Pulse dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        {/* Text */}
        <span className="text-[13px] font-semibold text-gray-600 dark:text-gray-400 tracking-tight">
          SQL Editor (NEW)
        </span>

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="ml-0.5 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-stone-700 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3 text-gray-400 dark:text-gray-500" />
        </button>
      </div>
    </a>
  );
}
