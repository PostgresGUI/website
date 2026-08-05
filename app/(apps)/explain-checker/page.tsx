import type { Metadata } from "next";
import Link from "next/link";
import { ExplainChecker } from "./_components/explain-checker";

export const metadata: Metadata = {
  title: "Postgres EXPLAIN Analyzer - Free Query Plan Checker",
  description:
    "Paste PostgreSQL EXPLAIN JSON and check for bad estimates, sequential scans, disk sorts, temp I/O, and slow query clues. Free, private, no AI.",
  keywords: [
    "postgres explain analyzer",
    "postgresql explain analyzer",
    "postgres explain analyze tool",
    "postgres query plan analyzer",
    "postgres explain checker",
    "postgres query plan checker",
    "postgres explain plan analyzer",
    "postgres explain visualizer",
    "explain analyze postgres",
    "postgres performance tool",
    "postgres seq scan",
    "postgres disk sort",
    "postgres rows removed by filter",
  ],
  alternates: {
    canonical: "https://postgresgui.com/explain-checker",
  },
  openGraph: {
    title: "Postgres EXPLAIN Analyzer",
    description:
      "Paste PostgreSQL EXPLAIN JSON and spot common query plan issues. Free, private, no AI.",
    type: "website",
    url: "https://postgresgui.com/explain-checker",
    siteName: "PostgresGUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Postgres EXPLAIN Analyzer",
    description:
      "Paste PostgreSQL EXPLAIN JSON and spot common query plan issues. Free, private, no AI.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Postgres EXPLAIN Analyzer",
  description:
    "A browser-based PostgreSQL EXPLAIN JSON analyzer for common query plan issues. The tool runs locally in the browser without AI.",
  url: "https://postgresgui.com/explain-checker",
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
    "EXPLAIN JSON parsing, row estimate checks, sequential scan checks, disk sort checks, temp I/O checks, hash spill checks, rule-based findings, private browser execution, no AI",
};

const checks = [
  "Bad row estimates",
  "Sequential scans",
  "Rows removed by filter",
  "Disk sorts",
  "Temp I/O",
  "Hash spills",
];

export default function ExplainCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Postgres EXPLAIN Analyzer</h1>
      <ExplainChecker />
      <section className="bg-stone-50 pb-16 pt-4 dark:bg-stone-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 border-t border-stone-200/80 pt-10 dark:border-stone-800 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                Check PostgreSQL query plans
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                Use this free Postgres EXPLAIN analyzer to inspect JSON plans for
                common slow query clues. It is rule-based, runs in your browser,
                and does not use AI.
              </p>
              <div className="mt-5 rounded-lg bg-stone-900 p-4 text-sm text-stone-100 dark:bg-black">
                <code>
                  EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
                  <br />
                  SELECT ...;
                </code>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                What it checks
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone-600 dark:text-stone-400">
                {checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                <Link
                  href="/blog/explain-analyze-postgres"
                  className="text-[var(--postgres-blue)] hover:underline"
                >
                  Read EXPLAIN ANALYZE
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
