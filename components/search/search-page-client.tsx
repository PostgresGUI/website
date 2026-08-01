"use client";

import { SearchInput } from "@/components/search/search-input";
import { SearchResultRow } from "@/components/search/search-result-row";
import { useSearchQuery } from "@/components/search/use-search-query";
import { searchDocuments } from "@/lib/search/search";
import type { SearchDocument } from "@/lib/search/types";

type SearchPageClientProps = {
  documents: SearchDocument[];
  popular: SearchDocument[];
};

export function SearchPageClient({
  documents,
  popular,
}: SearchPageClientProps) {
  const { query, setQuery } = useSearchQuery();
  const results = searchDocuments(documents, query);
  const hasQuery = Boolean(query.trim());

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search tools, guides, and PostgresGUI"
      />

      <div className="mt-8" aria-live="polite">
        {hasQuery ? (
          results.length ? (
            <>
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                {results.length} {results.length === 1 ? "result" : "results"}
                {` for “${query.trim()}”`}
              </p>
              <div className="divide-y divide-border/70">
                {results.map((result) => (
                  <SearchResultRow key={result.href} result={result} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <h2 className="text-xl font-semibold">No matching pages</h2>
              <p className="mt-2 text-muted-foreground">
                Try a shorter phrase, a tool name, or a PostgreSQL feature.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 text-sm font-semibold text-[var(--postgres-blue)] hover:underline"
              >
                Clear search
              </button>
            </div>
          )
        ) : (
          <section>
            <h2 className="mb-4 text-lg font-semibold">Popular destinations</h2>
            <div className="divide-y divide-border/70">
              {popular.map((document) => (
                <SearchResultRow
                  key={document.href}
                  result={{ ...document, score: 0 }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
