import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import {
  absoluteUrl,
  faqJsonLd,
  SITE_URL,
} from "@/lib/seo-helpers";

const CANONICAL = `${SITE_URL}/postgresql-tools`;
const OG_IMAGE = absoluteUrl("/seo/postgresql-tools.svg");

const faqItems = [
  {
    question: "Are the PostgreSQL tools free?",
    answer:
      "The browser-based tools on PostgresGUI.com are free to use. The Mac app has public source code and a paid signed App Store build.",
  },
  {
    question: "Do I need to install PostgreSQL to use the SQL editor?",
    answer:
      "No. The online SQL editor runs in the browser for practice and examples. Use the Mac app when you want to connect to your real PostgreSQL databases.",
  },
  {
    question: "Which tool should I use to design a PostgreSQL schema?",
    answer:
      "Use the schema designer to sketch tables and relationships, then export SQL. Use the data types guide when you need help choosing column types.",
  },
];

export const metadata: Metadata = {
  title: "Free PostgreSQL Tools - SQL Editor, Schema Designer, Data Types",
  description:
    "Free PostgreSQL tools from PostgresGUI: online SQL editor, database schema designer, data types guide, connection string builder, UUID generator, and Mac client.",
  keywords: [
    "postgresql tools",
    "free postgres tools",
    "postgres tools online",
    "postgresql online tools",
    "online sql editor",
    "database schema designer",
    "postgres data types",
    "postgres connection string",
    "uuid generator",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "Free PostgreSQL Tools",
    description:
      "SQL editor, schema designer, data types guide, connection string builder, UUID generator, and Mac PostgreSQL client.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Free PostgreSQL Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PostgreSQL Tools",
    description:
      "SQL editor, schema designer, data types guide, connection string builder, UUID generator, and Mac PostgreSQL client.",
    images: [OG_IMAGE],
  },
};

const jsonLd = faqJsonLd(faqItems);

export default function PostgreSQLToolsPage() {
  const tools = [
    {
      title: "Online SQL editor",
      href: "/sql-editor",
      body: "Write SQL, create tables, insert sample data, and run queries in your browser.",
      image: "/tool-screenshots/sql-editor-clean.png",
      imageAlt: "Online SQL editor with tables, query editor, and results panel",
    },
    {
      title: "Online SQL compiler",
      href: "/sql-compiler",
      body: "A search-friendly guide to the browser SQL runner and how to use it for practice.",
      image: "/tool-screenshots/sql-compiler-clean.png",
      imageAlt: "Online SQL compiler page with PostgreSQL query examples",
    },
    {
      title: "Schema designer",
      href: "/schema-designer",
      body: "Design database tables visually, then import or export SQL.",
      image: "/tool-screenshots/schema-designer-clean.png",
      imageAlt: "Schema designer canvas with related PostgreSQL tables",
    },
    {
      title: "PostgreSQL data types",
      href: "/data-types",
      body: "Compare column types, storage notes, SQL examples, and common tradeoffs.",
      image: "/tool-screenshots/data-types-clean.png",
      imageAlt: "PostgreSQL data type picker with column type categories",
    },
    {
      title: "Connection string builder",
      href: "/connection-string",
      body: "Build and understand PostgreSQL connection strings without memorizing every field.",
      image: "/tool-screenshots/connection-string-clean.png",
      imageAlt: "PostgreSQL connection string builder form and output panel",
    },
    {
      title: "UUID generator",
      href: "/uuid-generator",
      body: "Generate UUIDs for test rows, fixtures, migrations, and app development.",
      image: "/tool-screenshots/uuid-generator-clean.png",
      imageAlt: "UUID generator for PostgreSQL with generated identifiers",
    },
    {
      title: "Postgres viewer for Mac",
      href: "/postgres-viewer-mac",
      body: "Browse real PostgreSQL tables and query results in the native Mac app.",
      image: "/tool-screenshots/postgres-viewer-mac-clean.png",
      imageAlt: "Postgres viewer for Mac landing page",
    },
    {
      title: "PostgreSQL GUI for Mac",
      href: "/postgresql-gui-mac",
      body: "The pillar guide for choosing a native Mac PostgreSQL client.",
      image: "/tool-screenshots/postgresql-gui-mac-clean.png",
      imageAlt: "PostgreSQL GUI for Mac guide page",
    },
  ];

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
              Free PostgreSQL tools
            </p>
            <h1 className="max-w-4xl text-4xl font-display tracking-tight md:text-6xl">
              Practical Postgres tools for learning, designing, and querying.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Use PostgresGUI&apos;s free PostgreSQL tools to practice SQL,
              design schemas, pick column types, build connection strings,
              generate UUIDs, and move into a native Mac Postgres client when
              you are ready to work with real databases.
            </p>
          </div>
        </section>

        <section className="bg-stone-50/80 px-6 py-16 dark:bg-stone-950/40">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group overflow-hidden rounded-lg bg-white shadow-[0_18px_55px_-38px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-42px_rgba(15,23,42,0.7)] dark:bg-stone-900"
              >
                <div className="relative aspect-[16/10] bg-stone-100 dark:bg-stone-800">
                  <Image
                    src={tool.image}
                    alt={tool.imageAlt}
                    fill
                    sizes="(min-width: 768px) 480px, calc(100vw - 48px)"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="min-h-[150px] p-6">
                  <h2 className="text-xl font-semibold group-hover:text-[var(--postgres-blue)]">
                    {tool.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {tool.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
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
