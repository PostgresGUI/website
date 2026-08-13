import { describe, expect, it } from "vitest";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { searchDocumentsIndex } from "@/lib/search/documents";
import { trendBlogPosts } from "@/lib/trend-blog-posts";
import {
  getTrendGuide,
  trendGuideSlugs,
} from "@/lib/trend-guide-content";

const newGuideSlugs = [
  "postgres-connection-refused-mac",
  "postgresql-sslmode-explained",
  "postgresql-permission-denied-for-relation",
  "pg-dump-pg-restore-mac",
  "connect-postgresgui-to-postgres-app",
  "postgresql-locks-blocking-queries",
  "postgresql-index-types",
  "import-csv-postgresql",
  "postgresql-autovacuum-and-table-bloat",
  "postgresql-connection-string-errors",
  "postgresql-numeric-vs-double-precision",
  "postgresql-bigint-vs-integer",
];

describe("trend guide registry", () => {
  it("contains every new researched guide", () => {
    for (const slug of newGuideSlugs) {
      expect(trendGuideSlugs).toContain(slug);
      expect(getTrendGuide(slug)).toBeDefined();
    }
  });

  it("keeps metadata and article content complete", () => {
    for (const post of trendBlogPosts) {
      const guide = getTrendGuide(post.slug);

      expect(guide, post.slug).toBeDefined();
      expect(guide?.sections.length, post.slug).toBeGreaterThanOrEqual(4);
      expect(post.description.trim(), post.slug).not.toBe("");
      expect(post.keywords.length, post.slug).toBeGreaterThanOrEqual(3);
      expect(post.faqs?.length, post.slug).toBeGreaterThanOrEqual(2);
      expect(post.sources?.length, post.slug).toBeGreaterThanOrEqual(2);
      expect(
        post.sources?.every((source) => source.url.startsWith("https://")),
        post.slug,
      ).toBe(true);
    }
  });

  it("uses unique slugs and valid related-post references", () => {
    const slugs = trendBlogPosts.map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);

    for (const post of trendBlogPosts) {
      for (const relatedSlug of post.relatedSlugs) {
        expect(() => getBlogPost(relatedSlug), post.slug).not.toThrow();
      }
    }
  });

  it("adds every new guide to site search", () => {
    const searchHrefs = new Set(
      searchDocumentsIndex.map((document) => document.href),
    );
    const publishedSlugs = new Set(blogPosts.map((post) => post.slug));

    for (const slug of newGuideSlugs) {
      expect(publishedSlugs.has(slug)).toBe(true);
      expect(searchHrefs.has("/blog/" + slug)).toBe(true);
    }
  });
});
