"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { type SQLCategory } from "../_lib/data";
import { type Database } from "../_lib/databases";
import { DatabaseSelector } from "./database-selector";

function NavLink({ id, name, onClick }: { id: string; name: string; onClick: () => void }) {
  const handleClick = () => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="text-[12px] font-semibold uppercase tracking-wide text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors whitespace-nowrap text-left py-2.5 cursor-pointer border-b border-stone-100 dark:border-stone-800 last:border-0"
    >
      {name}
    </button>
  );
}

export function MobileNav({
  categories,
  selectedDatabase,
}: {
  categories: SQLCategory[];
  selectedDatabase: Database;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-sm font-black text-stone-900 dark:text-stone-100 tracking-tighter uppercase">
              SQL Cheatsheet
            </h1>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              For {selectedDatabase.shortName}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-40 h-full w-64 bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 dark:border-stone-800">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Jump to
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 -mr-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Links */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto max-h-[calc(100vh-120px)]">
          <div className="flex flex-col">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                id={category.id}
                name={category.name}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            <a href="/" className="hover:text-stone-800 dark:hover:text-stone-200">
              PostgresGUI
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
