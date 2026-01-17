"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { databases, type Database } from "../_lib/databases";

export function DatabaseSelector({
  selected,
}: {
  selected: Database;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // For now, just show the dropdown but don't allow changing
  // since we only have PostgreSQL data
  // In the future, this could trigger a page navigation to /sql-cheatsheet/mysql etc.

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide mt-1 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
      >
        <span>For {selected.shortName}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded shadow-lg z-20 min-w-[140px]">
            {databases.map((db) => (
              <button
                key={db.id}
                onClick={() => {
                  // In the future: router.push(`/sql-cheatsheet/${db.id}`)
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-[11px] uppercase tracking-wide transition-colors cursor-pointer ${
                  db.id === selected.id
                    ? "bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-750"
                }`}
              >
                {db.name}
              </button>
            ))}
            {/* Coming soon placeholder */}
            <div className="px-3 py-2 text-[11px] uppercase tracking-wide text-stone-400 dark:text-stone-500 cursor-not-allowed border-t border-stone-200 dark:border-stone-700">
              More coming soon
            </div>
          </div>
        </>
      )}
    </div>
  );
}
