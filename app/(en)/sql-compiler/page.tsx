import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://postgresgui.com/sql-compiler";

export const metadata: Metadata = {
  title: "Online SQL Compiler - Run SQL Queries in Your Browser",
  description:
    "Use a free online SQL compiler and query editor to write SQL, run queries, manage sample tables, and practice database workflows in your browser.",
  keywords: [
    "online sql compiler",
    "sql online compiler with database",
    "sql query editor online",
    "sql editor online with database",
    "postgresql online compiler",
    "online postgresql editor",
    "postgresql online query editor",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "Online SQL Compiler - Run SQL Queries in Your Browser",
    description:
      "Write SQL, run queries, and work with sample tables in a browser-based SQL compiler and query editor.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: "https://postgresgui.com/online-sql-editor.jpg",
        width: 1200,
        height: 630,
        alt: "Online SQL Compiler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online SQL Compiler - Run SQL Queries in Your Browser",
    description:
      "Write SQL, run queries, and work with sample tables in a browser-based SQL compiler and query editor.",
    images: ["https://postgresgui.com/online-sql-editor.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Online SQL Compiler",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: CANONICAL,
  description:
    "A free online SQL compiler and query editor for writing SQL, running queries, and practicing database workflows in a browser.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function SqlCompilerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <section className="border-b border-border/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold text-[var(--postgres-blue)]">
              Online SQL compiler
            </p>
            <h1 className="max-w-3xl text-4xl font-display tracking-tight md:text-6xl">
              Run SQL queries online with a browser-based editor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Use PostgresGUI&apos;s online SQL editor as a free SQL compiler:
              write queries, create sample tables, insert rows, and inspect
              results without installing a local database.
            </p>
            <div className="mt-8">
              <Link
                href="/sql-editor"
                className="rounded-md bg-[var(--postgres-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--postgres-blue-dark)]"
              >
                Open the SQL editor
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              ["Practice SQL", "Run SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, and aggregation examples in the browser."],
              ["Use sample data", "Create tables and test queries without touching a production database."],
              ["Move to PostgresGUI", "When you are ready for real PostgreSQL databases on Mac, use the native desktop client."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-border p-5">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border/30 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-display tracking-tight">
              SQL compiler or SQL editor?
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              People often search for an online SQL compiler when they want an
              online query editor with a database behind it. SQL is interpreted
              by a database engine rather than compiled like a traditional app,
              but the workflow is the same: write a query, run it, and inspect
              the result.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
