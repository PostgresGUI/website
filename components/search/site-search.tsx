"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchInput } from "@/components/search/search-input";
import {
  SearchResultRow,
  searchTypeLabels,
} from "@/components/search/search-result-row";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { searchDocuments } from "@/lib/search/search";
import type {
  SearchDocument,
  SearchDocumentType,
  SearchResult,
} from "@/lib/search/types";
import { cn } from "@/lib/utils";

const typeOrder: SearchDocumentType[] = [
  "tool",
  "guide",
  "product",
  "comparison",
  "reference",
];

type SiteSearchProps = {
  className?: string;
};

export function SiteSearch({ className }: SiteSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<SearchDocument[]>([]);
  const [popular, setPopular] = useState<SearchDocument[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const loadIndex = useCallback(async () => {
    if (documents.length) return;
    const index = await import("@/lib/search/documents");
    setDocuments(index.searchDocumentsIndex);
    setPopular(index.popularSearchDocuments);
  }, [documents.length]);

  const openSearch = useCallback(() => {
    setOpen(true);
    void loadIndex();
  }, [loadIndex]);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (event.key === "/" && !isTyping && !open) {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [open, openSearch]);

  const allResults = useMemo(
    () => searchDocuments(documents, query),
    [documents, query],
  );
  const visibleResults = allResults.slice(0, 8);
  const popularResults: SearchResult[] = popular.map((document) => ({
    ...document,
    score: 0,
  }));
  const keyboardResults = query.trim() ? visibleResults : popularResults;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectResult = (result: SearchResult) => {
    closeSearch();
    router.push(result.href);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!keyboardResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % keyboardResults.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) =>
          (index - 1 + keyboardResults.length) % keyboardResults.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const result = keyboardResults[activeIndex] ?? keyboardResults[0];
      if (result) selectResult(result);
    }
  };

  const groupedResults = typeOrder.flatMap((type) => {
    const results = visibleResults.filter((result) => result.type === type);
    return results.length ? [{ type, results }] : [];
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search PostgresGUI"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white",
              className,
            )}
          >
            <Search aria-hidden="true" className="size-[18px]" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>

      <dialog
        ref={dialogRef}
        aria-labelledby="site-search-title"
        onClose={() => setOpen(false)}
        onCancel={closeSearch}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSearch();
        }}
        className="m-auto flex h-[min(720px,calc(100dvh-2rem))] w-[min(680px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-[2px]"
      >
        <h2 id="site-search-title" className="sr-only">
          Search PostgresGUI
        </h2>
        <div className="flex items-center gap-2 border-b border-border/70 p-3">
          <SearchInput
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            onKeyDown={handleKeyDown}
            placeholder="Search tools, guides, and PostgresGUI"
            className="flex-1"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            title="Close search"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-stone-100 hover:text-foreground dark:hover:bg-stone-900"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
          {!documents.length ? (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              Loading search…
            </p>
          ) : query.trim() ? (
            allResults.length ? (
              <>
                {groupedResults.map((group) => (
                  <section key={group.type} className="mb-3 last:mb-0">
                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                      {searchTypeLabels[group.type]}
                    </h3>
                    {group.results.map((result) => {
                      const index = visibleResults.findIndex(
                        (item) => item.href === result.href,
                      );
                      return (
                        <SearchResultRow
                          key={result.href}
                          result={result}
                          compact
                          active={index === activeIndex}
                          onMouseEnter={() => setActiveIndex(index)}
                          onSelect={closeSearch}
                        />
                      );
                    })}
                  </section>
                ))}
                {allResults.length > visibleResults.length ? (
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    onClick={closeSearch}
                    className="mt-2 flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-[var(--postgres-blue)] hover:bg-stone-50 dark:hover:bg-stone-900"
                  >
                    See all {allResults.length} results
                  </Link>
                ) : null}
              </>
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="font-semibold">No matching pages</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a shorter phrase or a PostgreSQL feature name.
                </p>
              </div>
            )
          ) : (
            <section>
              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                Popular destinations
              </h3>
              {popularResults.map((document, index) => (
                <SearchResultRow
                  key={document.href}
                  result={document}
                  compact
                  active={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onSelect={closeSearch}
                />
              ))}
            </section>
          )}
        </div>
      </dialog>
    </>
  );
}
