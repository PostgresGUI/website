import { Metadata } from "next";
import { Cheatsheet } from "./_components/cheatsheet";

export const metadata: Metadata = {
  title: "SQL Cheatsheet - Quick PostgreSQL Reference",
  description:
    "Comprehensive SQL cheatsheet with examples for SELECT, WHERE, JOIN, GROUP BY, window functions, CTEs, and more. Copy-paste ready PostgreSQL queries.",
  keywords: [
    "sql cheatsheet",
    "postgresql cheatsheet",
    "sql reference",
    "sql examples",
    "postgresql examples",
    "sql syntax",
    "sql queries",
    "select statement",
    "join syntax",
    "window functions",
    "cte examples",
  ],
  openGraph: {
    title: "SQL Cheatsheet - Quick PostgreSQL Reference",
    description:
      "Comprehensive SQL cheatsheet with copy-paste ready examples for all PostgreSQL queries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Cheatsheet - Quick PostgreSQL Reference",
    description:
      "Comprehensive SQL cheatsheet with copy-paste ready PostgreSQL examples.",
  },
  alternates: {
    canonical: "/sql-cheatsheet",
  },
};

export default function SQLCheatsheetPage() {
  return <Cheatsheet />;
}
