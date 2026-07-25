import { SchemaDesigner } from "./_components/schema-designer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Online Database Schema Designer",
  description:
    "Free PostgreSQL schema designer. Paste CREATE TABLE SQL to make an ER diagram, edit tables and foreign keys visually, then export PostgreSQL SQL.",
  keywords: [
    "schema designer",
    "database schema designer",
    "online database schema designer",
    "database schema design",
    "database schema online",
    "create database schema online",
    "database schema design software",
    "sql schema design",
    "erd tool",
    "database diagram",
    "sql generator",
    "entity relationship diagram",
    "postgresql er diagram from sql",
    "create erd from sql",
    "create table to er diagram",
  ],
  alternates: {
    canonical: "https://postgresgui.com/schema-designer",
  },
  openGraph: {
    title: "Online Database Schema Designer",
    description:
      "Paste CREATE TABLE SQL to make an ER diagram, edit tables and foreign keys visually, then export PostgreSQL SQL.",
    type: "website",
    url: "https://postgresgui.com/schema-designer",
    images: [
      {
        url: "https://postgresgui.com/online-schema-designer.jpg",
        width: 1200,
        height: 630,
        alt: "Database Schema Designer - Design tables visually",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Database Schema Designer",
    description:
      "Paste CREATE TABLE SQL to make an ER diagram, edit tables and foreign keys visually, then export PostgreSQL SQL.",
    images: ["https://postgresgui.com/online-schema-designer.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Online Database Schema Designer",
  description:
    "Free PostgreSQL schema designer. Paste CREATE TABLE SQL to make an ER diagram, edit tables and foreign keys visually, then export PostgreSQL SQL.",
  url: "https://postgresgui.com/schema-designer",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function SchemaDesignerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Online Database Schema Designer</h1>
      <SchemaDesigner />
      <section className="border-t border-border/50 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-display">
            Turn CREATE TABLE SQL into an ER diagram
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Choose Import, paste your PostgreSQL DDL, and review the tables the
            parser found. Primary keys and foreign keys become visible on the
            canvas. Rearrange the diagram, edit the model, then use Export SQL
            when you are ready to take the schema back to a migration.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            The importer works from schema SQL, so it does not need a database
            password or a live production connection.
          </p>
          <Link
            href="/postgresql-er-diagram-from-sql"
            className="mt-6 inline-flex font-semibold text-[var(--postgres-blue)] hover:underline"
          >
            See the SQL-to-ER-diagram workflow
          </Link>
        </div>
      </section>
    </>
  );
}
