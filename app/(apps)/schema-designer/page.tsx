import { SchemaDesigner } from "./_components/schema-designer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Database Schema Designer",
  description:
    "Free online database schema designer for PostgreSQL. Create database schema diagrams online, design tables visually, then import or export SQL.",
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
  ],
  alternates: {
    canonical: "https://postgresgui.com/schema-designer",
  },
  openGraph: {
    title: "Online Database Schema Designer",
    description:
      "Create database schema diagrams online, design tables visually, then import or export SQL.",
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
      "Create database schema diagrams online, design tables visually, then import or export SQL.",
    images: ["https://postgresgui.com/online-schema-designer.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Online Database Schema Designer",
  description:
    "Free online database schema designer for PostgreSQL. Create database schema diagrams online, design tables visually, then import or export SQL.",
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
    </>
  );
}
