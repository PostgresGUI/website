import { Suspense } from "react";
import { SidebarNav } from "./_components/sidebar-nav";
import { MobileNav } from "./_components/mobile-nav";

export default function DataTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNav />

      <div className="min-h-screen bg-white dark:bg-stone-950 flex mx-auto max-w-7xl">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-56 shrink-0 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 sticky top-0 h-screen flex-col">
          <div className="px-4 py-4 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-sm font-black text-stone-900 dark:text-stone-100 tracking-tighter uppercase">
              Data Type Picker
            </h2>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide mt-0.5">
              PostgreSQL
            </p>
          </div>

          <Suspense>
            <SidebarNav />
          </Suspense>

          <div className="px-4 py-4 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              <a
                href="/"
                className="hover:text-stone-800 dark:hover:text-stone-200"
              >
                PostgresGUI
              </a>
            </p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-10 pt-20 lg:pt-8 pb-8">
          {children}
        </main>
      </div>
    </>
  );
}
