import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import { APP_STORE_LINK, GITHUB_REPOSITORY_LINK } from "@/lib/constants";
import {
  absoluteUrl,
  faqJsonLd,
  softwareApplicationJsonLd,
  SITE_URL,
} from "@/lib/seo-helpers";

const CANONICAL = `${SITE_URL}/postgresql-gui-mac`;
const OG_IMAGE = absoluteUrl("/seo/postgresql-gui-mac.svg");

const faqItems = [
  {
    question: "What is the best PostgreSQL GUI for Mac?",
    answer:
      "The best PostgreSQL GUI for Mac depends on your workflow. PostgresGUI is a strong fit when you want a native macOS app focused on PostgreSQL, with table browsing, SQL queries, row editing, CSV export, JSON viewing, and no subscription.",
  },
  {
    question: "Is PostgresGUI open source?",
    answer:
      "Yes. PostgresGUI source code is public on GitHub. You can build it yourself for free or use the signed Mac App Store version as a one-time purchase.",
  },
  {
    question: "Is PostgresGUI a pgAdmin alternative?",
    answer:
      "Yes, for day-to-day Mac PostgreSQL work such as connecting, browsing tables, running queries, editing rows, and exporting data. pgAdmin remains deeper for advanced server administration.",
  },
  {
    question: "Does PostgresGUI support databases besides PostgreSQL?",
    answer:
      "No. PostgresGUI is intentionally PostgreSQL-focused. If you need one client for many database engines, a broader tool like DBeaver, Beekeeper Studio, DataGrip, or TablePlus may fit better.",
  },
];

export const metadata: Metadata = {
  title: "PostgreSQL GUI for Mac - Native Postgres Client | PostgresGUI",
  description:
    "PostgreSQL GUI for Mac. PostgresGUI is a native, open-source Postgres client for browsing tables, running SQL, editing rows, exporting CSV, and viewing JSON.",
  keywords: [
    "postgresql gui mac",
    "postgres gui mac",
    "postgres client mac",
    "best postgres gui",
    "best postgresql gui mac",
    "native postgresql client mac",
    "open source postgres gui",
    "postgres viewer mac",
    "pgadmin alternative mac",
    "tableplus alternative mac",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "PostgreSQL GUI for Mac - Native Postgres Client",
    description:
      "A native, open-source Mac PostgreSQL GUI for browsing tables, running SQL, editing rows, exporting CSV, and viewing JSON.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PostgreSQL GUI for Mac - PostgresGUI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgreSQL GUI for Mac - Native Postgres Client",
    description:
      "A native, open-source Mac PostgreSQL GUI for browsing tables, running SQL, editing rows, exporting CSV, and viewing JSON.",
    images: [OG_IMAGE],
  },
};

const jsonLd = [
  softwareApplicationJsonLd({
    url: CANONICAL,
    description:
      "A native, open-source PostgreSQL GUI for Mac with table browsing, SQL querying, row editing, CSV export, and JSON viewing.",
  }),
  faqJsonLd(faqItems),
];

export default function PostgreSQLGuiMacPage() {
  const featureGroups = [
    {
      title: "For browsing data",
      body: "Open schemas and tables, inspect rows, sort and filter results, edit records, and export CSV without turning every lookup into a hand-written query.",
    },
    {
      title: "For writing SQL",
      body: "Use a focused query editor with result tables, saved queries, multiple tabs, and clear feedback when you are working through production bugs or local development.",
    },
    {
      title: "For Mac teams",
      body: "Use a native macOS PostgreSQL client that feels like a Mac app, supports dark mode, ships through the App Store, and stays open source.",
    },
  ];

  const comparisons = [
    ["pgAdmin", "/alternatives/pgadmin", "Best when you need full server administration."],
    ["TablePlus", "/alternatives/tableplus", "Best when you need one polished app for many databases."],
    ["Postico", "/alternatives/postico", "Best when you want a mature native Mac PostgreSQL client."],
    ["DBeaver", "/alternatives/dbeaver", "Best when you need a free universal database workbench."],
    ["Beekeeper Studio", "/alternatives/beekeeper-studio", "Best when you want a cross-platform SQL client."],
    ["DataGrip", "/alternatives/datagrip", "Best when you want full IDE-level SQL intelligence."],
  ];

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
              PostgreSQL GUI for Mac
            </p>
            <h1 className="max-w-4xl text-4xl font-display tracking-tight md:text-6xl">
              The native Mac Postgres client for everyday database work.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              PostgresGUI is a PostgreSQL GUI for Mac built for developers who
              want a focused, open-source client: connect to Postgres, browse
              tables, run SQL, edit rows, export CSV, and inspect JSON without
              the weight of a universal database workbench.
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
            {featureGroups.map((feature) => (
              <article key={feature.title} className="rounded-lg border border-border p-5">
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/30 bg-stone-100 px-6 py-14 dark:bg-stone-900">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-display tracking-tight">
              How to choose a Postgres GUI on Mac
            </h2>
            <div className="mt-8 overflow-hidden border-y border-border bg-card">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left">Tool</th>
                    <th className="p-4 text-left">Best fit</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(([tool, href, fit]) => (
                    <tr key={tool} className="border-b border-border/40 last:border-b-0">
                      <td className="p-4 font-medium">
                        <Link href={href} className="text-[var(--postgres-blue)] hover:underline">
                          {tool}
                        </Link>
                      </td>
                      <td className="p-4 text-muted-foreground">{fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-display tracking-tight">
              Common questions
            </h2>
            <FAQ items={faqItems} className="mt-6" />
          </div>
        </section>
      </main>
    </>
  );
}
