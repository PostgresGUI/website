import { Metadata } from "next";
import { UuidGenerator } from "./_components/uuid-generator";

export const metadata: Metadata = {
  title: "Free UUID Generator — v4 & v7 | PostgresGUI",
  description:
    "Generate UUID v4 (random) and v7 (time-ordered) values instantly. One-click copy, bulk generation up to 100, and JSON export. Free online tool for PostgreSQL primary keys, test data, and configuration.",
  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "uuid v7 generator",
    "postgresql uuid",
    "random uuid online",
    "time-ordered uuid",
    "guid generator",
    "unique identifier generator",
    "postgres primary key uuid",
    "bulk uuid generator",
    "uuid generator online free",
  ],
  openGraph: {
    title: "Free UUID Generator — v4 & v7",
    description:
      "Generate UUID v4 and v7 values instantly. One-click copy, bulk generation, and JSON export. Free online tool by PostgresGUI.",
    type: "website",
    url: "https://postgresgui.com/uuid-generator",
    siteName: "PostgresGUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UUID Generator — v4 & v7 | PostgresGUI",
    description:
      "Generate UUID v4 and v7 values instantly. One-click copy, bulk generation, and JSON export.",
  },
  alternates: {
    canonical: "https://postgresgui.com/uuid-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator",
  description:
    "Generate UUID v4 (random) and v7 (time-ordered) values instantly. One-click copy, bulk generation up to 100, and JSON export. Free online tool for PostgreSQL.",
  url: "https://postgresgui.com/uuid-generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "PostgresGUI",
    url: "https://postgresgui.com",
  },
  featureList:
    "UUID v4 generation, UUID v7 generation, one-click copy, bulk generation, JSON export, uppercase/lowercase, with/without hyphens",
};

export default function UuidGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">UUID Generator — Generate v4 and v7 UUIDs</h1>
      <UuidGenerator />
    </>
  );
}
