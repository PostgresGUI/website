import { Metadata } from "next";
import Link from "next/link";
import { UuidGenerator } from "./_components/uuid-generator";

export const metadata: Metadata = {
  title: "Free UUID Generator — v4 & v7 | PostgresGUI",
  description:
    "Generate UUID v4 (random) and v7 (time-ordered) values instantly. One-click copy, bulk generation up to 100, and JSON export. Free online tool for PostgreSQL primary keys, test data, and configuration.",
  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "uuid v7 generator",
    "postgresql uuid",
    "random uuid online",
    "time-ordered uuid",
    "guid generator",
    "unique identifier generator",
    "postgres primary key uuid",
    "bulk uuid generator",
    "uuid generator online free",
  ],
  openGraph: {
    title: "Free UUID Generator — v4 & v7",
    description:
      "Generate UUID v4 and v7 values instantly. One-click copy, bulk generation, and JSON export. Free online tool by PostgresGUI.",
    type: "website",
    url: "https://postgresgui.com/uuid-generator",
    siteName: "PostgresGUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UUID Generator — v4 & v7 | PostgresGUI",
    description:
      "Generate UUID v4 and v7 values instantly. One-click copy, bulk generation, and JSON export.",
  },
  alternates: {
    canonical: "https://postgresgui.com/uuid-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator",
  description:
    "Generate UUID v4 (random) and v7 (time-ordered) values instantly. One-click copy, bulk generation up to 100, and JSON export. Free online tool for PostgreSQL.",
  url: "https://postgresgui.com/uuid-generator",
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
    "UUID v4 generation, UUID v7 generation, one-click copy, bulk generation, JSON export, uppercase/lowercase, with/without hyphens",
};

export default function UuidGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UuidGenerator />
      <section className="border-t border-stone-200 bg-white px-6 py-14 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            UUIDv4 or UUIDv7 for PostgreSQL?
          </h2>
          <p className="mt-4 leading-7 text-stone-600 dark:text-stone-400">
            UUIDv4 is random. UUIDv7 begins with time information, so newly
            generated values are roughly ordered and friendlier to a growing
            B-tree primary-key index. PostgreSQL 18 can generate both with{" "}
            <code>uuidv4()</code> and <code>uuidv7()</code>.
          </p>
          <p className="mt-4 leading-7 text-stone-600 dark:text-stone-400">
            Older PostgreSQL releases can store either version in a{" "}
            <code>uuid</code> column, but UUIDv7 generation must come from your
            application or an extension. Existing UUIDv4 keys do not need to be
            rewritten.
          </p>
          <Link
            href="/blog/postgresql-uuid-v4-vs-v7"
            className="mt-6 inline-flex font-semibold text-[var(--postgres-blue)] hover:underline"
          >
            Read the PostgreSQL UUIDv4 vs UUIDv7 guide
          </Link>
        </div>
      </section>
    </>
  );
}
