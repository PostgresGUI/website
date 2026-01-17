"use client";

import { type SQLCategory } from "../_lib/data";

function NavLink({ id, name }: { id: string; name: string }) {
  const handleClick = () => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[11px] font-semibold uppercase tracking-wide text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors whitespace-nowrap text-left py-1.5 cursor-pointer"
    >
      {name}
    </button>
  );
}

export function CategoryNav({ categories }: { categories: SQLCategory[] }) {
  return (
    <nav className="flex-1 px-4 py-4 overflow-y-auto">
      <div className="flex flex-col">
        {categories.map((category) => (
          <NavLink key={category.id} id={category.id} name={category.name} />
        ))}
      </div>
    </nav>
  );
}
