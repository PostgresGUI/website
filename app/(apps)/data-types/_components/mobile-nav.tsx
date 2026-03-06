"use client";

import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="text-sm font-black text-stone-900 dark:text-stone-100 tracking-tighter uppercase">
              Data Type Picker
            </h2>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              PostgreSQL
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 right-0 z-40 h-full w-64 bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 dark:border-stone-800">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Categories
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 -mr-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <Suspense>
          <SidebarNav onNavClick={() => setIsOpen(false)} />
        </Suspense>

        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            <a
              href="/"
              className="hover:text-stone-800 dark:hover:text-stone-200"
            >
              PostgresGUI
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
