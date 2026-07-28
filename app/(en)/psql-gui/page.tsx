import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import { APP_STORE_LINK, GITHUB_REPOSITORY_LINK } from "@/lib/constants";
import {
  absoluteUrl,
  faqJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo-helpers";

const CANONICAL = "https://postgresgui.com/psql-gui";
const OG_IMAGE = absoluteUrl("/postgresgui-og-image.jpg");

const faqItems = [
  {
    question: "Does psql have a GUI?",
    answer:
      "psql is PostgreSQL's command-line client, so it does not include a graphical interface. You can keep psql for terminal work and use a PostgreSQL GUI such as PostgresGUI for visual table browsing and query results.",
  },
  {
    question: "Can PostgresGUI connect to the same databases as psql?",
    answer:
      "Yes. Both can connect to local, remote, and cloud PostgreSQL databases. PostgresGUI accepts a PostgreSQL connection string or individual host, port, database, user, password, and SSL settings.",
  },
  {
    question: "Should I replace psql with a GUI?",
    answer:
      "Usually not. psql is better for scripts, remote shells, and repeatable commands. A GUI is better for browsing tables, scanning wide results, editing a row, and keeping several queries open.",
  },
  {
    question: "Is PostgresGUI available outside macOS?",
    answer:
      "No. PostgresGUI is a native Mac app. Use psql, pgAdmin, DBeaver, or another cross-platform client when you need Windows or Linux support.",
  },
];

export const metadata: Metadata = {
  title: "psql GUI for Mac - A Visual PostgreSQL Client",
  description:
    "Looking for a psql GUI? Use PostgresGUI on Mac to browse PostgreSQL tables, run SQL, edit rows, view JSON, and export results while keeping psql for terminal work.",
  keywords: [
    "psql gui",
    "psql graphical interface",
    "gui for psql",
    "psql alternative mac",
    "postgresql graphical client",
    "postgres client mac",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "psql GUI for Mac - A Visual PostgreSQL Client",
    description:
      "Keep psql for scripts. Use PostgresGUI when you want a visual table browser, SQL editor, and readable query results on Mac.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PostgresGUI showing SQL and PostgreSQL query results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "psql GUI for Mac - A Visual PostgreSQL Client",
    description:
      "Browse tables and query results visually while keeping psql for terminal work.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = [
  softwareApplicationJsonLd({
    url: CANONICAL,
    description:
      "A native psql GUI companion for Mac that connects to PostgreSQL databases and provides table browsing, SQL queries, row editing, JSON viewing, and CSV export.",
  }),
  faqJsonLd(faqItems),
];

export default function PsqlGuiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold text-[var(--postgres-blue)]">
              psql GUI for Mac
            </p>
            <h1 className="max-w-4xl text-4xl font-display tracking-normal md:text-6xl">
              Keep psql for the terminal. Use a GUI when you need to see the
              data.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              PostgresGUI connects to the same PostgreSQL databases as psql.
              Browse tables, run SQL, inspect wide results, edit rows, view
              JSON, and export CSV in a native Mac app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={APP_STORE_LINK}
                className="rounded-md bg-[var(--postgres-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--postgres-blue-dark)]"
              >
                Download for Mac
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

        <section className="bg-muted/40 px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              [
                "Use psql for",
                "Scripts, SSH sessions, repeatable commands, migrations, and exact text output.",
              ],
              [
                "Use a GUI for",
                "Table browsing, wide results, row editing, JSON inspection, and exploratory SQL.",
              ],
              [
                "Keep both for",
                "A practical PostgreSQL setup that covers automation and visual investigation.",
              ],
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

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Image
              src="/screenshots4/PostgresGUI - Run complex query and see query results.webp"
              alt="A psql GUI alternative showing PostgreSQL SQL and query results"
              width={1280}
              height={800}
              className="w-full rounded-md shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-display tracking-normal">
                The result stays next to the query
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Terminal output is efficient until a result has many columns,
                long JSON values, or enough rows to lose the context. A grid
                keeps column names, values, and the SQL visible together.
              </p>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                <li>Open several queries in tabs.</li>
                <li>Browse schemas and tables from the sidebar.</li>
                <li>Switch between table and JSON results.</li>
                <li>Export the current result as CSV.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-display tracking-normal">
              psql and PostgresGUI handle different parts of the job
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-3 py-3 font-semibold">Task</th>
                    <th className="px-3 py-3 font-semibold">psql</th>
                    <th className="px-3 py-3 font-semibold">PostgresGUI</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Run SQL", "Yes", "Yes"],
                    ["Use in scripts and CI", "Yes", "No"],
                    ["Browse tables visually", "Text commands", "Yes"],
                    ["Edit a row directly", "Write SQL", "Yes"],
                    ["Inspect wide results", "Terminal output", "Scrollable grid"],
                    ["Connect over SSH", "Through your shell", "Built-in tunnel settings"],
                    ["Export data", "\\copy", "CSV export"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-border/60">
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={`px-3 py-3 ${index === 0 ? "font-medium text-foreground" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Need psql itself first? Follow the{" "}
              <Link href="/blog/install-psql-mac">Mac installation guide</Link>.
              For a task-by-task comparison, read{" "}
              <Link href="/blog/psql-vs-postgresql-gui">
                psql vs PostgreSQL GUI
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
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
