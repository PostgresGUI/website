import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/search/search-page-client";
import {
  popularSearchDocuments,
  searchDocumentsIndex,
} from "@/lib/search/documents";

export const metadata: Metadata = {
  title: "Search PostgresGUI",
  description:
    "Search PostgresGUI tools, PostgreSQL guides, comparisons, and product pages.",
  alternates: {
    canonical: "https://postgresgui.com/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

function SearchFallback() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="h-12 rounded-md bg-stone-100 dark:bg-stone-900" />
      <div className="h-24 rounded-md bg-stone-50 dark:bg-stone-900/60" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="flex-1 px-6 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-display tracking-tight md:text-5xl">
            Search PostgresGUI
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Find PostgreSQL tools, guides, comparisons, and product pages.
          </p>
        </header>
        <Suspense fallback={<SearchFallback />}>
          <SearchPageClient
            documents={searchDocumentsIndex}
            popular={popularSearchDocuments}
          />
        </Suspense>
      </div>
    </main>
  );
}
