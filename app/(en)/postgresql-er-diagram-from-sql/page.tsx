import type { Metadata } from "next";
import { SeoGuidePage, type SeoGuide } from "@/components/seo-guide-page";

const canonical = "https://postgresgui.com/postgresql-er-diagram-from-sql";

export const metadata: Metadata = {
  title: "Create a PostgreSQL ER Diagram from SQL",
  description:
    "Paste PostgreSQL CREATE TABLE statements to generate an ER diagram, inspect foreign-key relationships, arrange tables, and export clean PostgreSQL SQL.",
  keywords: [
    "postgresql er diagram from sql",
    "create erd from sql",
    "postgres schema visualizer",
    "create table to er diagram",
    "postgresql database diagram",
  ],
  alternates: { canonical },
  openGraph: {
    title: "Create a PostgreSQL ER Diagram from SQL",
    description:
      "Turn PostgreSQL CREATE TABLE statements into a visual schema, then edit relationships and export SQL.",
    type: "website",
    url: canonical,
    siteName: "PostgresGUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a PostgreSQL ER Diagram from SQL",
    description:
      "Turn PostgreSQL CREATE TABLE statements into a visual schema, then edit relationships and export SQL.",
  },
};

const guide: SeoGuide = {
  title: "Create a PostgreSQL ER diagram from SQL",
  eyebrow: "Free browser-based schema tool",
  description:
    "Paste CREATE TABLE statements into the PostgresGUI schema designer. It parses tables, columns, primary keys, and foreign keys into a diagram you can rearrange and export.",
  answer:
    "Use the schema designer when you already have DDL and need a readable map of the relationships. The SQL stays in your browser; no database credentials are required.",
  facts: [
    { label: "Input", value: "PostgreSQL CREATE TABLE SQL" },
    { label: "Output", value: "Editable ER diagram and PostgreSQL SQL" },
    { label: "Cost", value: "Free" },
    { label: "Account", value: "Not required" },
  ],
  codeBlocks: [
    {
      title: "Paste SQL like this",
      code: `create table accounts (
  id bigint generated always as identity primary key,
  name text not null
);

create table invoices (
  id bigint generated always as identity primary key,
  account_id bigint not null references accounts(id),
  total numeric(12, 2) not null,
  issued_at timestamptz not null default now()
);`,
      note: "The foreign key becomes the relationship between invoices and accounts.",
    },
  ],
  sections: [
    {
      title: "From CREATE TABLE to a diagram",
      paragraphs: [
        "Open the schema designer, choose Import, and paste the DDL. Review parser warnings before replacing or merging with the current canvas. The preview lists the tables it found, so a missing table does not become a silent omission.",
        "After import, arrange the tables around the relationships you are trying to understand. A diagram is most useful when the layout reflects the domain instead of the order the tables happened to appear in a dump.",
      ],
    },
    {
      title: "What the visual check catches",
      paragraphs: [
        "The diagram makes missing foreign keys, one table with too many responsibilities, and awkward dependency chains easier to see. It also exposes naming inconsistencies that are easy to skim past in a long migration.",
      ],
      bullets: [
        "A *_id column with no foreign-key constraint",
        "Join tables that are missing a composite uniqueness rule",
        "Required relationships represented by nullable columns",
        "Tables whose names hide the direction of the relationship",
      ],
    },
    {
      title: "Edit the model, then export SQL",
      paragraphs: [
        "You can add or edit tables and columns on the canvas, then open PostgreSQL Export to copy or download the generated SQL. Treat that output as a starting point for a migration: review constraint names, indexes, extensions, data backfills, and deployment locking separately.",
      ],
    },
    {
      title: "What not to paste",
      paragraphs: [
        "Do not paste production credentials or data dumps. The importer needs schema DDL, not INSERT statements. Vendor-specific procedural code and every form of ALTER TABLE may not map to a visual model, so keep the original migration as the source of truth.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can the tool connect to my database automatically?",
      answer:
        "No. Paste schema SQL into the importer. This keeps database credentials out of the tool and makes the input explicit.",
    },
    {
      question: "Does it support foreign keys?",
      answer:
        "Yes. Foreign keys in the imported CREATE TABLE statements are represented as relationships between tables.",
    },
    {
      question: "Is the generated SQL a complete production migration?",
      answer:
        "It is valid schema output, but a production migration may also need backfills, concurrent index strategy, extension setup, permissions, and rollout steps.",
    },
  ],
  related: [
    {
      href: "/schema-designer",
      label: "Open the schema designer",
      description: "Import CREATE TABLE SQL and arrange the resulting diagram.",
    },
    {
      href: "/blog/database-schema-design-online",
      label: "Plan a database schema",
      description: "Work from entities and constraints before application code hardens the model.",
    },
    {
      href: "/data-types",
      label: "PostgreSQL data type picker",
      description: "Check column types while editing the schema.",
    },
  ],
  sources: [
    {
      label: "PostgreSQL CREATE TABLE",
      href: "https://www.postgresql.org/docs/current/sql-createtable.html",
    },
    {
      label: "PostgreSQL constraints",
      href: "https://www.postgresql.org/docs/current/ddl-constraints.html",
    },
  ],
};

export default function PostgreSQLErDiagramFromSqlPage() {
  return (
    <SeoGuidePage
      guide={guide}
      canonical={canonical}
      breadcrumb="Schema designer"
    />
  );
}
