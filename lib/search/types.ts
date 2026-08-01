export type SearchDocumentType =
  "tool" | "guide" | "product" | "comparison" | "reference";

export type SearchDocument = {
  href: string;
  title: string;
  description: string;
  type: SearchDocumentType;
  keywords: string[];
  aliases?: string[];
  section?: string;
  priority?: number;
};

export type SearchResult = SearchDocument & {
  score: number;
};
