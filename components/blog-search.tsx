"use client";

import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { SearchInput } from "@/components/search/search-input";
import { useSearchQuery } from "@/components/search/use-search-query";
import type { BlogPost } from "@/lib/blog";
import { searchDocuments } from "@/lib/search/search";
import type { SearchDocument } from "@/lib/search/types";

type BlogSearchProps = {
  posts: BlogPost[];
  connectionGuideSlugs: string[];
};

export function BlogSearch({ posts, connectionGuideSlugs }: BlogSearchProps) {
  const { query, setQuery } = useSearchQuery();
  const connectionSlugs = new Set(connectionGuideSlugs);
  const connectionGuides = posts.filter((post) =>
    connectionSlugs.has(post.slug),
  );
  const latestPosts = posts.filter((post) => !connectionSlugs.has(post.slug));
  const documents: SearchDocument[] = posts.map((post) => ({
    href: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    type: "guide",
    keywords: post.keywords,
    section: post.category,
  }));
  const results = searchDocuments(documents, query);
  const hasQuery = Boolean(query.trim());

  return (
    <>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search PostgreSQL guides"
        className="mb-10"
      />

      {hasQuery ? (
        <section aria-live="polite">
          {results.length ? (
            <>
              <p className="mb-5 text-sm font-medium text-muted-foreground">
                {results.length} {results.length === 1 ? "guide" : "guides"}
                {` for “${query.trim()}”`}
              </p>
              <div className="divide-y divide-border/70">
                {results.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    className="group block py-6 first:pt-0"
                  >
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      {result.section}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold group-hover:text-[var(--postgres-blue)]">
                      {result.title}
                    </h2>
                    <p className="mt-2 leading-7 text-muted-foreground">
                      {result.description}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="py-14 text-center">
              <h2 className="text-xl font-semibold">No matching guides</h2>
              <p className="mt-2 text-muted-foreground">
                Try a shorter phrase or a PostgreSQL feature name.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 text-sm font-semibold text-[var(--postgres-blue)] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : (
        <BlogPostList
          connectionGuides={connectionGuides}
          latestPosts={latestPosts}
        />
      )}
    </>
  );
}
