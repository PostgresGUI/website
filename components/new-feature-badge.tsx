"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <Link
      href="/sql-editor"
      className="group fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-4 fade-in"
      style={{
        animationDuration: "400ms",
        animationFillMode: "both",
      }}
    >
      <div className="relative flex items-center gap-2 px-3 py-2 bg-stone-900 dark:bg-white rounded-lg shadow-2xl shadow-stone-900/25 dark:shadow-black/15 hover:scale-[1.02] transition-transform duration-200">
        {/* Animated gradient border */}
        <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[var(--postgres-blue)] via-blue-400 to-[var(--postgres-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[2px]" />
        <div className="absolute inset-0 rounded-lg bg-stone-900 dark:bg-white -z-[5]" />

        {/* Pulse dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        {/* Text */}
        <span className="text-[13px] font-semibold text-white dark:text-stone-900 tracking-tight">
          SQL Editor (NEW)
        </span>

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="ml-0.5 p-0.5 rounded hover:bg-white/10 dark:hover:bg-stone-900/10 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3 text-stone-500 dark:text-stone-400" />
        </button>
      </div>
    </Link>
  );
}
