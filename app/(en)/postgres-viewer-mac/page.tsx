import type { Metadata } from "next";
import Link from "next/link";
import { APP_STORE_LINK, GITHUB_REPOSITORY_LINK } from "@/lib/constants";

const CANONICAL = "https://postgresgui.com/postgres-viewer-mac";

export const metadata: Metadata = {
  title: "Postgres Viewer for Mac - Browse Tables and Query Results",
  description:
    "Postgres viewer for Mac. Use PostgresGUI to connect to PostgreSQL, browse tables, inspect query results, edit rows, export CSV, and view JSON results.",
  keywords: [
    "postgres viewer",
    "postgres viewer mac",
    "postgres database gui",
    "ui for postgres",
    "postgres table viewer",
    "postgres query viewer",
    "postgres gui client",
    "postgresql gui mac",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "Postgres Viewer for Mac - Browse Tables and Query Results",
    description:
      "A native Mac Postgres viewer for browsing tables, running SQL, inspecting query results, editing rows, and exporting data.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Postgres Viewer for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Postgres Viewer for Mac - Browse Tables and Query Results",
    description:
      "Connect to PostgreSQL, browse tables, inspect query results, edit rows, export CSV, and view JSON results on Mac.",
    images: ["https://postgresgui.com/postgresgui-og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostgresGUI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS",
  url: CANONICAL,
  description:
    "A native Mac Postgres viewer for browsing PostgreSQL tables, running SQL queries, inspecting query results, and exporting data.",
  offers: {
    "@type": "Offer",
    price: "12.99",
    priceCurrency: "USD",
  },
};

export default function PostgresViewerMacPage() {
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
              Postgres viewer for Mac
            </p>
            <h1 className="max-w-3xl text-4xl font-display tracking-tight md:text-6xl">
              Browse PostgreSQL tables and query results in a native Mac app.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              PostgresGUI is a focused Postgres viewer for Mac. Connect to a
              local, cloud, or remote PostgreSQL database, browse tables, run
              SQL, inspect query results, edit rows, view JSON, and export CSV.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={APP_STORE_LINK}
                className="rounded-md bg-[var(--postgres-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--postgres-blue-dark)]"
              >
                Download PostgresGUI
              </a>
              <a
                href={GITHUB_REPOSITORY_LINK}
                className="rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-accent"
              >
                View source
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              ["Table viewer", "Open schemas and tables, inspect rows, sort data, and check records without writing every query by hand."],
              ["Query result viewer", "Run SQL and read results in a clear desktop interface with JSON and CSV workflows."],
              ["Postgres-only focus", "Use a client designed around PostgreSQL rather than a general database workbench."],
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
              When a Postgres viewer helps
            </h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>You want to inspect data without memorizing table names.</li>
              <li>You need to debug query results visually.</li>
              <li>You want a Mac-native UI for routine PostgreSQL work.</li>
              <li>You use psql for terminal work but want a clearer viewer for data exploration.</li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              For broader comparisons, read the{" "}
              <Link href="/blog/best-mac-postgresql-gui-client">
                best Mac PostgreSQL GUI client guide
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
