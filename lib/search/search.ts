import type { SearchDocument, SearchResult } from "./types";

const canonicalTerms: Array<[RegExp, string]> = [
  [/\bpostgres\b/g, "postgresql"],
  [/\bpostgre sql\b/g, "postgresql"],
  [/\berd\b/g, "entity relationship diagram"],
];

export function normalizeSearchText(value: string): string {
  let normalized = value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  for (const [pattern, replacement] of canonicalTerms) {
    normalized = normalized.replace(pattern, replacement);
  }

  return normalized.replace(/\s+/g, " ").trim();
}

function normalizedValues(values: string[] | undefined): string[] {
  return values?.map(normalizeSearchText).filter(Boolean) ?? [];
}

function scoreDocument(document: SearchDocument, query: string): number | null {
  const title = normalizeSearchText(document.title);
  const description = normalizeSearchText(document.description);
  const type = normalizeSearchText(document.type);
  const section = normalizeSearchText(document.section ?? "");
  const keywords = normalizedValues(document.keywords);
  const aliases = normalizedValues(document.aliases);
  const tokens = query.split(" ").filter(Boolean);
  const searchable = [
    title,
    description,
    type,
    section,
    ...keywords,
    ...aliases,
  ].join(" ");

  if (!tokens.every((token) => searchable.includes(token))) return null;

  let score = 0;

  if (title === query) score += 100;
  else if (title.startsWith(query)) score += 60;
  else if (title.includes(query)) score += 40;

  if (aliases.includes(query)) score += 80;
  else if (aliases.some((alias) => alias.includes(query))) score += 35;

  if (keywords.includes(query)) score += 45;
  else if (keywords.some((keyword) => keyword.includes(query))) score += 25;

  for (const token of tokens) {
    if (title.includes(token)) score += 30;
    if (aliases.some((alias) => alias.includes(token))) score += 25;
    if (keywords.some((keyword) => keyword.includes(token))) score += 20;
    if (section.includes(token) || type.includes(token)) score += 10;
    if (description.includes(token)) score += 5;
  }

  return score + (document.priority ?? 0) / 100;
}

export function searchDocuments(
  documents: SearchDocument[],
  rawQuery: string,
  limit = Number.POSITIVE_INFINITY,
): SearchResult[] {
  const query = normalizeSearchText(rawQuery);
  if (!query) return [];

  return documents
    .map((document) => {
      const score = scoreDocument(document, query);
      return score === null ? null : { ...document, score };
    })
    .filter((result): result is SearchResult => result !== null)
    .sort(
      (left, right) =>
        right.score - left.score || left.title.localeCompare(right.title),
    )
    .slice(0, limit);
}
