import Link from "next/link";
import { BookOpen, Box, Database, Scale, Wrench } from "lucide-react";
import type { SearchDocumentType, SearchResult } from "@/lib/search/types";
import { cn } from "@/lib/utils";

export const searchTypeLabels: Record<SearchDocumentType, string> = {
  tool: "Free tools",
  guide: "Guides",
  product: "Product",
  comparison: "Comparisons",
  reference: "PostgreSQL reference",
};

const typeIcons = {
  tool: Wrench,
  guide: BookOpen,
  product: Box,
  comparison: Scale,
  reference: Database,
};

type SearchResultRowProps = {
  result: SearchResult;
  active?: boolean;
  onMouseEnter?: () => void;
  onSelect?: () => void;
  compact?: boolean;
};

export function SearchResultRow({
  result,
  active = false,
  onMouseEnter,
  onSelect,
  compact = false,
}: SearchResultRowProps) {
  const Icon = typeIcons[result.type];

  return (
    <Link
      href={result.href}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      className={cn(
        "group flex gap-3 rounded-md px-3 transition-colors",
        compact ? "py-2.5" : "py-4",
        active
          ? "bg-stone-100 dark:bg-stone-900"
          : "hover:bg-stone-50 dark:hover:bg-stone-900/70",
      )}
    >
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-stone-100 text-[var(--postgres-blue)] dark:bg-stone-900">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span className="min-w-0">
        {!compact ? (
          <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
            {result.section ?? searchTypeLabels[result.type]}
          </span>
        ) : null}
        {compact ? (
          <span className="block font-semibold leading-5 text-foreground group-hover:text-[var(--postgres-blue)]">
            {result.title}
          </span>
        ) : (
          <h2 className="font-semibold leading-5 text-foreground group-hover:text-[var(--postgres-blue)]">
            {result.title}
          </h2>
        )}
        <span
          className={cn(
            "mt-1 block text-muted-foreground",
            compact ? "line-clamp-1 text-xs" : "text-sm leading-6",
          )}
        >
          {result.description}
        </span>
      </span>
    </Link>
  );
}
