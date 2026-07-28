import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import { APP_STORE_LINK, GITHUB_REPOSITORY_LINK } from "@/lib/constants";
import { absoluteUrl, faqJsonLd } from "@/lib/seo-helpers";

const CANONICAL = "https://postgresgui.com/postgres-viewer-mac";
const OG_IMAGE = absoluteUrl("/seo/postgres-viewer-mac.png");

const faqItems = [
  {
    question: "What is a PostgreSQL viewer?",
    answer:
      "A PostgreSQL viewer is a database client that connects directly to Postgres so you can browse tables, inspect rows, run queries, and read results without writing every lookup by hand.",
  },
  {
    question: "Can I edit rows with PostgresGUI?",
    answer:
      "Yes. PostgresGUI is built for common PostgreSQL workflows including browsing data, editing rows, running SQL, viewing JSON, and exporting CSV.",
  },
  {
    question: "Is this different from pgAdmin?",
    answer:
      "Yes. pgAdmin is a broad PostgreSQL administration platform. PostgresGUI is a focused native Mac Postgres viewer and query client for day-to-day development.",
  },
];

export const metadata: Metadata = {
  title: "PostgreSQL Viewer for Mac - Tables, SQL, and JSON",
  description:
    "A PostgreSQL viewer for Mac. Connect to Postgres, browse tables, inspect SQL results, edit rows, view JSON, and export CSV in a native app.",
  keywords: [
    "postgres viewer",
    "postgresql viewer",
    "postgres viewer mac",
    "postgresql viewer mac",
    "mac sql database viewer",
    "mac database viewer",
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
    title: "PostgreSQL Viewer for Mac - Tables, SQL, and JSON",
    description:
      "A native Mac Postgres viewer for browsing tables, running SQL, inspecting query results, editing rows, and exporting data.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
        {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Postgres Viewer for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgreSQL Viewer for Mac - Tables, SQL, and JSON",
    description:
      "Connect to PostgreSQL, browse tables, inspect query results, edit rows, export CSV, and view JSON results on Mac.",
    images: [OG_IMAGE],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PostgresGUI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS",
    url: CANONICAL,
    description:
      "A native Mac PostgreSQL viewer for browsing tables, running SQL queries, inspecting results, and exporting data.",
    offers: {
      "@type": "Offer",
      price: "12.99",
      priceCurrency: "USD",
    },
  },
  faqJsonLd(faqItems),
];

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
              PostgreSQL viewer for Mac
            </p>
            <h1 className="max-w-3xl text-4xl font-display tracking-normal md:text-6xl">
              A clear view of your PostgreSQL data.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              PostgresGUI is a native PostgreSQL viewer for Mac. Connect to a
              local, cloud, or remote database, then browse tables, run SQL,
              edit rows, inspect JSON, and export results as CSV.
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
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              ["Table viewer", "Open schemas and tables, inspect rows, sort data, and check records without writing every lookup by hand."],
              ["Query result viewer", "Run SQL and keep wide results visible, then view JSON or export the result as CSV."],
              ["Mac SQL database viewer", "See PostgreSQL tables, views, and values without an ORM changing names or types."],
            ].map(([title, body]) => (
              <article key={title} className="border-l-2 border-border pl-5">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border/30 px-6 py-14">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Image
              src="/screenshots4/PostgresGUI - Run complex query and see query results.webp"
              alt="PostgresGUI showing a PostgreSQL query and its result table"
              width={1280}
              height={800}
              className="w-full rounded-md shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-display tracking-normal">
                See what PostgreSQL actually stored
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                PostgresGUI shows the schema and query result together, which
                makes it easier to catch a nullable column, a timestamp
                conversion, or a JSONB shape that looked different through the
                application layer.
              </p>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                <li>Move between schemas without rewriting connection settings.</li>
                <li>Sort and filter while keeping the original SQL available.</li>
                <li>Inspect JSON values and export a result to CSV.</li>
                <li>Edit rows when the connected role has permission.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-border/30 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-display tracking-normal">
              When a PostgreSQL viewer helps
            </h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>You want to inspect data without memorizing table names.</li>
              <li>You need to debug query results visually.</li>
              <li>You want a Mac-native UI for routine PostgreSQL work.</li>
              <li>You use psql for terminal work but want a clearer viewer for data exploration.</li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Looking for a graphical interface to use alongside psql? See the{" "}
              <Link href="/psql-gui">psql GUI guide</Link>. Need broader
              administration features? Compare{" "}
              <Link href="/postgres-manager-mac">
                Postgres managers for Mac
              </Link>
              .
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              For broader comparisons, read the{" "}
              <Link href="/blog/best-mac-postgresql-gui-client">
                best Mac PostgreSQL GUI client guide
              </Link>
              .
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Work mostly in an application framework? See the PostgreSQL
              client workflows for{" "}
              <Link href="/postgresql-client-for/rails">Rails</Link>,{" "}
              <Link href="/postgresql-client-for/django">Django</Link>,{" "}
              <Link href="/postgresql-client-for/node">Node.js</Link>, and{" "}
              <Link href="/postgresql-client-for/prisma">Prisma</Link>.
            </p>
          </div>
        </section>

        <section className="border-t border-border/30 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-display tracking-normal">
              Common questions
            </h2>
            <FAQ items={faqItems} className="mt-6" />
          </div>
        </section>
      </main>
    </>
  );
}
