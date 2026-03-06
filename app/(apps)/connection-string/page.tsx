import { ConnectionBuilder } from "./_components/connection-builder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PostgreSQL Connection String Builder - Free Online Tool",
  description:
    "Free online PostgreSQL connection string builder. Generate valid connection URIs, parse existing strings, and use cloud provider presets for Supabase, Neon, Railway, AWS RDS, and more.",
  keywords: [
    "postgresql connection string",
    "postgres connection uri",
    "connection string builder",
    "postgresql uri generator",
    "database connection string",
    "postgres connection string format",
    "supabase connection string",
    "neon connection string",
    "railway postgres connection",
    "aws rds connection string",
    "postgres connection uri builder",
    "postgresql connection url",
    "parse postgres connection string",
    "postgres ssl connection",
  ],
  alternates: {
    canonical: "https://postgresgui.com/connection-string",
  },
  openGraph: {
    title: "PostgreSQL Connection String Builder - Free Online Tool",
    description:
      "Generate valid PostgreSQL connection URIs visually. Parse existing strings, use cloud provider presets for Supabase, Neon, Railway, AWS RDS, and more.",
    type: "website",
    url: "https://postgresgui.com/connection-string",
    siteName: "PostgresGUI",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-elephant-app-icon.png",
        width: 512,
        height: 512,
        alt: "PostgreSQL Connection String Builder by PostgresGUI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgreSQL Connection String Builder - Free Online Tool",
    description:
      "Generate valid PostgreSQL connection URIs visually. Parse existing strings, use cloud provider presets for Supabase, Neon, Railway, and more.",
    images: ["https://postgresgui.com/postgresgui-elephant-app-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PostgreSQL Connection String Builder",
  description:
    "Free online PostgreSQL connection string builder. Generate valid connection URIs, parse existing strings, and use cloud provider presets.",
  url: "https://postgresgui.com/connection-string",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "PostgresGUI",
    url: "https://postgresgui.com",
  },
  featureList:
    "Connection URI builder, Key-value format builder, Connection string parser, Cloud provider presets (Supabase, Neon, Railway, AWS RDS, DigitalOcean, Render), SSL mode configuration, Special character encoding",
};

export default function ConnectionStringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">PostgreSQL Connection String Builder</h1>
      <ConnectionBuilder />
    </>
  );
}
