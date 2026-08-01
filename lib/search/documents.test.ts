import { describe, expect, it } from "vitest";
import { popularSearchDocuments, searchDocumentsIndex } from "./documents";

describe("searchDocumentsIndex", () => {
  it("contains only unique internal destinations", () => {
    const hrefs = searchDocumentsIndex.map((document) => document.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true);
  });

  it("has complete display metadata", () => {
    for (const document of searchDocumentsIndex) {
      expect(document.title.trim()).not.toBe("");
      expect(document.description.trim()).not.toBe("");
      expect(document.keywords).toBeInstanceOf(Array);
    }
  });

  it("keeps every popular destination in the full index", () => {
    const hrefs = new Set(
      searchDocumentsIndex.map((document) => document.href),
    );

    expect(popularSearchDocuments).toHaveLength(6);
    expect(
      popularSearchDocuments.every((document) => hrefs.has(document.href)),
    ).toBe(true);
  });
});
