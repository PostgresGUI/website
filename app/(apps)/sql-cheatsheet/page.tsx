import { Metadata } from "next";
import { Cheatsheet } from "./_components/cheatsheet";

export const metadata: Metadata = {
  title: "SQL Cheatsheet",
  description: "SQL cheatsheet with copy-paste examples.",
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
    title: "SQL Cheatsheet",
    description: "SQL cheatsheet with copy-paste examples.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Cheatsheet",
    description: "SQL cheatsheet with copy-paste examples.",
  },
  alternates: {
    canonical: "/sql-cheatsheet",
  },
};

export default function SQLCheatsheetPage() {
  return <Cheatsheet />;
}
