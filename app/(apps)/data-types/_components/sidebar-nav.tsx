"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Type,
  Hash,
  Clock,
  Braces,
  ToggleLeft,
  Fingerprint,
  Binary,
  List,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { categories, dataTypes } from "../_lib/data";
import { CategoryId } from "../_lib/types";

const categoryIcons: Record<CategoryId, React.ElementType> = {
  text: Type,
  numeric: Hash,
  datetime: Clock,
  json: Braces,
  boolean: ToggleLeft,
  uuid: Fingerprint,
  binary: Binary,
  arrays: List,
  special: Sparkles,
};

export function SidebarNav({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type");

  const isAll = pathname === "/data-types";

  // Determine which category is currently active from the URL
  const activeCategoryId = categories.find(
    (cat) => pathname === `/data-types/${cat.id}`
  )?.id;

  const [expanded, setExpanded] = useState<Set<CategoryId>>(new Set());

  // Auto-expand the active category
  useEffect(() => {
    if (activeCategoryId) {
      setExpanded((prev) => {
        const next = new Set(prev);
        next.add(activeCategoryId);
        return next;
      });
    }
  }, [activeCategoryId]);

  const toggleExpanded = (id: CategoryId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <nav className="flex-1 px-4 py-4 overflow-y-auto">
      <div className="flex flex-col gap-0.5">
        <Link
          href="/data-types"
          onClick={onNavClick}
          className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-left py-1.5 transition-colors ${
            isAll
              ? "text-stone-900 dark:text-stone-100"
              : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          All Types
        </Link>
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.id];
          const isActiveCategory = activeCategoryId === cat.id;
          const isExpanded = expanded.has(cat.id);
          const types = dataTypes.filter((t) => t.category === cat.id);

          return (
            <div key={cat.id}>
              <div className="flex items-center">
                <Link
                  href={`/data-types/${cat.id}`}
                  onClick={onNavClick}
                  className={`flex-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-left py-1.5 transition-colors ${
                    isActiveCategory
                      ? "text-stone-900 dark:text-stone-100"
                      : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  }`}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: cat.color }}
                  />
                  {cat.name}
                </Link>
                <button
                  onClick={() => toggleExpanded(cat.id)}
                  className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer"
                  aria-label={
                    isExpanded ? `Collapse ${cat.name}` : `Expand ${cat.name}`
                  }
                >
                  <ChevronRight
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
              {isExpanded && (
                <div className="ml-5.5 pl-2.5 border-l border-stone-200 dark:border-stone-700 mb-1">
                  {types.map((type) => {
                    const isActiveType =
                      isActiveCategory && activeType === type.id;
                    const isDefaultType =
                      isActiveCategory && !activeType && types[0]?.id === type.id;
                    const isHighlighted = isActiveType || isDefaultType;

                    return (
                      <Link
                        key={type.id}
                        href={`/data-types/${cat.id}?type=${type.id}`}
                        onClick={onNavClick}
                        className={`block text-[13px] py-1.5 pl-2.5 transition-colors ${
                          isHighlighted
                            ? "text-stone-900 dark:text-stone-100 font-semibold"
                            : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                        }`}
                      >
                        <span className="font-mono">{type.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
