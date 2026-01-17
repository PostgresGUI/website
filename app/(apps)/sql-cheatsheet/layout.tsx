"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import { sqlCategories } from "./_lib/data";

// Context for scroll
interface CheatsheetContextType {
  sectionRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}

const CheatsheetContext = createContext<CheatsheetContextType | null>(null);

export function useCheatsheetContext() {
  const context = useContext(CheatsheetContext);
  if (!context) {
    throw new Error("useCheatsheetContext must be used within CheatsheetLayout");
  }
  return context;
}

// Override parent layout's overflow-hidden
function useEnableScroll() {
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";
    document.body.style.position = "static";

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.overflowY = "";
      document.body.style.height = "";
      document.body.style.position = "";
    };
  }, []);
}

// Nav link
function NavLink({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[11px] font-semibold uppercase tracking-wide text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors whitespace-nowrap text-left py-1.5 cursor-pointer"
    >
      {name}
    </button>
  );
}

export default function CheatsheetLayout({ children }: { children: React.ReactNode }) {
  useEnableScroll();
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const scrollToCategory = (id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <CheatsheetContext.Provider value={{ sectionRefs }}>
      <div className="min-h-screen bg-white dark:bg-stone-950 flex">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 fixed top-0 left-0 h-screen flex flex-col">
          {/* Title */}
          <div className="px-4 py-4 border-b border-stone-200 dark:border-stone-800">
            <h1 className="text-sm font-black text-stone-900 dark:text-stone-100 tracking-tighter uppercase">
              SQL Cheatsheet
            </h1>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide mt-1">
              For PostgreSQL
            </p>
          </div>

          {/* Category nav */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <div className="flex flex-col">
              {sqlCategories.map((category) => (
                <NavLink
                  key={category.id}
                  name={category.name}
                  onClick={() => scrollToCategory(category.id)}
                />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              <a href="/" className="hover:text-stone-800 dark:hover:text-stone-200">
                PostgresGUI
              </a>
            </p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-48 px-6 lg:px-10 py-8">
          {children}
        </main>
      </div>
    </CheatsheetContext.Provider>
  );
}
