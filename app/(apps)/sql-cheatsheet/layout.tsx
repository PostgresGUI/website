import { getCategories } from "./_lib/data";
import { defaultDatabase } from "./_lib/databases";
import { DatabaseSelector } from "./_components/database-selector";
import { CategoryNav } from "./_components/category-nav";
import { ScrollEnabler } from "./_components/scroll-enabler";

export default function CheatsheetLayout({ children }: { children: React.ReactNode }) {
  const selectedDatabase = defaultDatabase;
  const categories = getCategories(selectedDatabase.id);

  return (
    <>
      <ScrollEnabler />
      <div className="min-h-screen bg-white dark:bg-stone-950 flex">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 fixed top-0 left-0 h-screen flex flex-col">
          {/* Title */}
          <div className="px-4 py-4 border-b border-stone-200 dark:border-stone-800">
            <h1 className="text-sm font-black text-stone-900 dark:text-stone-100 tracking-tighter uppercase">
              SQL Cheatsheet
            </h1>
            <DatabaseSelector selected={selectedDatabase} />
          </div>

          {/* Category nav - client component for scroll behavior */}
          <CategoryNav categories={categories} />

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
    </>
  );
}
