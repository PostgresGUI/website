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

const CANONICAL = "https://postgresgui.com/postgres-manager-mac";
const OG_IMAGE = absoluteUrl("/postgresgui-og-image.jpg");

const faqItems = [
  {
    question: "What is a Postgres manager?",
    answer:
      "A Postgres manager is a client used to connect to PostgreSQL and work with databases, schemas, tables, queries, and data. Full administration tools may also include backups, role management, monitoring, replication, and server maintenance.",
  },
  {
    question: "Can PostgresGUI manage PostgreSQL data?",
    answer:
      "Yes. PostgresGUI can browse schemas and tables, run SQL, edit rows, inspect JSON, and export results. The connected PostgreSQL role still controls what the app is allowed to read or change.",
  },
  {
    question: "Does PostgresGUI replace pgAdmin?",
    answer:
      "Not for every job. PostgresGUI is a focused client for daily query and data work. pgAdmin is the better fit for backups, restore, roles, server monitoring, maintenance, and broad object administration.",
  },
  {
    question: "Can it connect to cloud PostgreSQL?",
    answer:
      "Yes. Use a PostgreSQL connection string or the host, port, database, user, password, and SSL settings supplied by your cloud provider.",
  },
];

export const metadata: Metadata = {
  title: "Postgres Manager for Mac - Query, Browse, and Edit Data",
  description:
    "A focused Postgres manager for Mac. Connect to PostgreSQL, browse tables, run SQL, edit rows, inspect JSON, and export CSV. See when pgAdmin is the better tool.",
  keywords: [
    "postgres manager",
    "postgres manager mac",
    "postgres database manager",
    "postgresql manager mac",
    "postgres management gui",
    "postgres client mac",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "Postgres Manager for Mac - Query, Browse, and Edit Data",
    description:
      "Manage everyday PostgreSQL data work in a focused native Mac client, with clear limits for full DBA tasks.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Postgres manager for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Postgres Manager for Mac - Query, Browse, and Edit Data",
    description:
      "A native Mac client for everyday PostgreSQL querying and data work.",
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
      "A focused Postgres manager for Mac with PostgreSQL connections, table browsing, SQL queries, row editing, JSON viewing, and CSV export.",
  }),
  faqJsonLd(faqItems),
];

export default function PostgresManagerMacPage() {
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
              Postgres manager for Mac
            </p>
            <h1 className="max-w-4xl text-4xl font-display tracking-normal md:text-6xl">
              Manage the PostgreSQL work developers do every day.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Connect to a database, browse schemas, inspect rows, run SQL, edit
              data, and export results. PostgresGUI stays focused on this daily
              loop instead of trying to replace a full DBA suite.
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
                "Inspect",
                "Open schemas and tables, filter data, and check the actual PostgreSQL values.",
              ],
              [
                "Query",
                "Run SQL in separate tabs and keep the result next to the statement.",
              ],
              [
                "Change",
                "Edit rows directly when the connected PostgreSQL role has permission.",
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
              src="/screenshots4/PostgresGUI - Edit row.webp"
              alt="PostgresGUI editing a PostgreSQL row on Mac"
              width={1280}
              height={800}
              className="w-full rounded-md shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-display tracking-normal">
                Work with the database directly
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                An ORM is useful inside an application, but it can hide column
                names, database types, null values, and server-side defaults.
                A direct PostgreSQL client gives you the database view when
                debugging.
              </p>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                <li>Local, remote, and cloud PostgreSQL connections.</li>
                <li>SSL and SSH tunnel settings.</li>
                <li>Table, JSON, and SQL result views.</li>
                <li>CSV export for the current result.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-display tracking-normal">
              Pick the manager that matches the job
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-3 py-3 font-semibold">Tool</th>
                    <th className="px-3 py-3 font-semibold">Best for</th>
                    <th className="px-3 py-3 font-semibold">Not its main job</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    [
                      "PostgresGUI",
                      "Browsing, SQL, row editing, JSON, CSV, daily Mac development",
                      "Backups, roles, monitoring, replication administration",
                    ],
                    [
                      "pgAdmin",
                      "Full PostgreSQL object and server administration",
                      "A small native Mac workflow",
                    ],
                    [
                      "psql",
                      "Scripts, SSH sessions, exact commands, automation",
                      "Visual table and result browsing",
                    ],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-border/60">
                      {row.map((cell, index) => (
                        <td
                          key={cell}
                          className={`px-3 py-3 align-top ${index === 0 ? "font-medium text-foreground" : ""}`}
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
              Need deeper administration? Read the{" "}
              <Link href="/alternatives/pgadmin">
                PostgresGUI and pgAdmin comparison
              </Link>
              . Want a broader client comparison? See the{" "}
              <Link href="/blog/best-mac-postgresql-gui-client">
                best PostgreSQL clients for Mac
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
