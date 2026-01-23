import { SchemaDesigner } from "./_components/schema-designer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database Schema Designer",
  description:
    "Free online database schema designer. Design tables, import and export SQL.",
  keywords: [
    "schema designer",
    "database schema designer",
    "erd tool",
    "database diagram",
    "sql generator",
    "entity relationship diagram",
  ],
  alternates: {
    canonical: "https://postgresgui.com/schema-designer",
  },
  openGraph: {
    title: "Database Schema Designer",
    description:
      "Free online database schema designer. Design tables, import and export SQL.",
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
    title: "Database Schema Designer",
    description:
      "Free online database schema designer. Design tables, import and export SQL.",
    images: ["https://postgresgui.com/online-schema-designer.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Database Schema Designer",
  description:
    "Free online database schema designer. Design tables, import and export SQL.",
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
      <h1 className="sr-only">Database Schema Designer</h1>
      <SchemaDesigner />
    </>
  );
}
