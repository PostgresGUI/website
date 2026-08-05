import type { Metadata } from "next";
import Link from "next/link";
import { MigrationDiffTool } from "./_components/migration-diff-tool";

export const metadata: Metadata = {
  title: "Postgres Migration Diff Generator - Free ALTER TABLE Tool",
  description:
    "Paste before and after PostgreSQL CREATE TABLE schemas to generate ALTER TABLE migration SQL with warnings for destructive changes. Free, private, no AI.",
  keywords: [
    "postgres migration diff",
    "postgresql migration generator",
    "postgres schema diff",
    "postgres alter table generator",
    "postgresql schema compare",
    "database migration generator",
    "sql migration diff",
  ],
  alternates: {
    canonical: "https://postgresgui.com/migration-diff",
  },
  openGraph: {
    title: "Postgres Migration Diff Generator",
    description:
      "Generate ALTER TABLE migration SQL from before and after PostgreSQL schemas. Free, private, no AI.",
    type: "website",
    url: "https://postgresgui.com/migration-diff",
    siteName: "PostgresGUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Postgres Migration Diff Generator",
    description:
      "Generate ALTER TABLE migration SQL from before and after PostgreSQL schemas. Free, private, no AI.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Postgres Migration Diff Generator",
  description:
    "A browser-based PostgreSQL schema diff tool that generates ALTER TABLE migration SQL and flags destructive changes.",
  url: "https://postgresgui.com/migration-diff",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "PostgresGUI",
    url: "https://postgresgui.com",
  },
  featureList:
    "PostgreSQL schema diff, ALTER TABLE generation, CREATE TABLE generation, destructive change warnings, browser execution, no AI",
};

export default function MigrationDiffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Postgres Migration Diff Generator</h1>
      <MigrationDiffTool />
      <section className="bg-stone-50 pb-16 pt-4 dark:bg-stone-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 border-t border-stone-200/80 pt-10 dark:border-stone-800 lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                Generate PostgreSQL migration SQL
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                Paste two CREATE TABLE schemas and generate a conservative
                Postgres migration. The tool runs in your browser, does not use
                AI, and highlights destructive changes before you copy SQL.
              </p>
              <div className="mt-5 rounded-lg bg-stone-900 p-4 text-sm text-stone-100 dark:bg-black">
                <code>
                  ALTER TABLE users ADD COLUMN display_name text;
                  <br />
                  ALTER TABLE posts DROP COLUMN published_at;
                </code>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                What it flags
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone-600 dark:text-stone-400">
                <li>Dropped tables</li>
                <li>Dropped columns</li>
                <li>Type changes</li>
                <li>Required columns</li>
                <li>SET NOT NULL</li>
                <li>Default changes</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                <Link
                  href="/schema-designer"
                  className="text-[var(--postgres-blue)] hover:underline"
                >
                  Schema designer
                </Link>
                <Link
                  href="/postgresql-tools"
                  className="text-[var(--postgres-blue)] hover:underline"
                >
                  PostgreSQL tools
                </Link>
                <Link
                  href="/download"
                  className="text-[var(--postgres-blue)] hover:underline"
                >
                  Mac app
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
