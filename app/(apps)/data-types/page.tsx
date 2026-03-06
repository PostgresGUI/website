import { Metadata } from "next";
import Link from "next/link";
import {
  Type,
  Hash,
  Clock,
  Braces,
  ToggleLeft,
  Fingerprint,
  Binary,
  List,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { categories, dataTypes } from "./_lib/data";
import { CategoryId } from "./_lib/types";

export const metadata: Metadata = {
  title: "PostgreSQL Data Types — Compare & Choose | PostgresGUI",
  description:
    "Compare PostgreSQL data types side by side. varchar vs text, int vs bigint, jsonb vs json, timestamptz and more. Storage sizes, performance notes, and clear recommendations.",
  keywords: [
    "postgres data types",
    "postgresql types",
    "varchar vs text",
    "int vs bigint",
    "jsonb vs json",
    "timestamptz vs timestamp",
    "postgresql types comparison",
    "postgres integer types",
    "postgres text types",
    "postgres date types",
    "postgres uuid type",
    "postgres boolean",
    "postgres array type",
    "postgres serial vs identity",
    "postgres numeric vs float",
  ],
  openGraph: {
    title: "PostgreSQL Data Types — Compare & Choose",
    description:
      "Compare PostgreSQL data types side by side. Storage sizes, performance notes, and clear recommendations for every type.",
    type: "website",
    url: "https://postgresgui.com/data-types",
    siteName: "PostgresGUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgreSQL Data Types — Compare & Choose | PostgresGUI",
    description:
      "Compare PostgreSQL data types side by side. varchar vs text, int vs bigint, jsonb vs json, and more.",
  },
  alternates: {
    canonical: "https://postgresgui.com/data-types",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PostgreSQL Data Type Picker",
  description:
    "Compare PostgreSQL data types side by side. varchar vs text, int vs bigint, jsonb vs json, timestamptz and more. Storage sizes, performance notes, and clear recommendations.",
  url: "https://postgresgui.com/data-types",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "PostgresGUI",
    url: "https://postgresgui.com",
  },
  featureList:
    "Data type comparison, storage sizes, performance notes, SQL examples, copy-to-clipboard",
};

const categoryIcons: Record<CategoryId, React.ElementType> = {
  text: Type,
  numeric: Hash,
  datetime: Clock,
  json: Braces,
  boolean: ToggleLeft,
  uuid: Fingerprint,
  binary: Binary,
  arrays: List,
  special: Sparkles,
};

export default function DataTypesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">
        PostgreSQL Data Types — Compare and Choose the Right Type
      </h1>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const typeCount = dataTypes.filter(
              (t) => t.category === cat.id
            ).length;
            return (
              <Link
                key={cat.id}
                href={`/data-types/${cat.id}`}
                className="group rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800/50 hover:border-stone-300 dark:hover:border-stone-600 transition-all p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    className="w-5 h-5 shrink-0"
                    style={{ color: cat.color }}
                  />
                  <h2 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-stone-900 dark:text-stone-100">
                    {cat.name}
                  </h2>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                  {cat.tldr}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                    {typeCount} {typeCount === 1 ? "type" : "types"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-stone-500 dark:group-hover:text-stone-400 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
