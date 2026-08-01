import { describe, expect, it } from "vitest";
import { normalizeSearchText, searchDocuments } from "./search";
import type { SearchDocument } from "./types";

const documents: SearchDocument[] = [
  {
    href: "/uuid-generator",
    title: "UUID Generator",
    description: "Generate UUID values for PostgreSQL test data.",
    type: "tool",
    keywords: ["generate uuid", "postgres uuid"],
    priority: 30,
  },
  {
    href: "/blog/postgresql-uuid-v4-vs-v7",
    title: "PostgreSQL UUIDv4 vs UUIDv7",
    description: "Compare UUID versions and index locality.",
    type: "guide",
    keywords: ["uuid generator postgres", "uuid v7"],
  },
  {
    href: "/schema-designer",
    title: "PostgreSQL Schema Designer",
    description: "Design related database tables visually.",
    type: "tool",
    keywords: ["database schema designer"],
    aliases: ["erd", "entity relationship diagram"],
  },
  {
    href: "/connection-string",
    title: "PostgreSQL Connection String Builder",
    description: "Build a database URL with SSL options.",
    type: "tool",
    keywords: ["postgres connection string", "ssl connection"],
  },
  {
    href: "/connection-guide",
    title: "PostgreSQL Connection Guide",
    description: "Understand database hosts and ports.",
    type: "guide",
    keywords: ["postgres connection"],
  },
];

describe("normalizeSearchText", () => {
  it("treats Postgres and PostgreSQL as the same term", () => {
    expect(normalizeSearchText("Postgres / PostgreSQL")).toBe(
      "postgresql postgresql",
    );
  });

  it("normalizes punctuation-heavy PostgreSQL identifiers", () => {
    expect(normalizeSearchText("pg_stat_statements()")).toBe(
      "pg stat statements",
    );
  });
});

describe("searchDocuments", () => {
  it("ranks an exact title above a keyword-only match", () => {
    const results = searchDocuments(documents, "uuid generator");

    expect(results.map((result) => result.href)).toEqual([
      "/uuid-generator",
      "/blog/postgresql-uuid-v4-vs-v7",
    ]);
  });

  it("requires every query word to match", () => {
    const results = searchDocuments(documents, "connection ssl");

    expect(results.map((result) => result.href)).toEqual([
      "/connection-string",
    ]);
  });

  it("matches explicit aliases", () => {
    const results = searchDocuments(documents, "erd");

    expect(results[0]?.href).toBe("/schema-designer");
  });

  it("uses priority only as a tie breaker", () => {
    const tiedDocuments: SearchDocument[] = [
      {
        href: "/low",
        title: "PostgreSQL Viewer",
        description: "Browse tables.",
        type: "product",
        keywords: [],
        priority: 1,
      },
      {
        href: "/high",
        title: "PostgreSQL Viewer",
        description: "Browse tables.",
        type: "product",
        keywords: [],
        priority: 20,
      },
    ];

    expect(searchDocuments(tiedDocuments, "postgres viewer")[0]?.href).toBe(
      "/high",
    );
  });

  it("returns no results for a blank query", () => {
    expect(searchDocuments(documents, "   ")).toEqual([]);
  });

  it("honors the result limit", () => {
    expect(searchDocuments(documents, "postgres", 2)).toHaveLength(2);
  });
});
