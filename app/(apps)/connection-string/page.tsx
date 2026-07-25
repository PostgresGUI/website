import { ConnectionBuilder } from "./_components/connection-builder";
import type { Metadata } from "next";
import Link from "next/link";
import { connectionGuideLinks } from "@/lib/connection-guides";

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
      <section className="border-t border-stone-200 bg-white px-6 py-14 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase text-stone-900 dark:text-stone-100">
            PostgreSQL connection guides
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-stone-600 dark:text-stone-400">
            A valid URI can still fail because a provider expects a pooled
            hostname, a private network, or a particular SSL mode. Pick the
            service or framework you are connecting and use its exact template.
          </p>
          <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {connectionGuideLinks.map((guide) => (
              <Link
                key={guide.slug}
                href={`/connection-string/${guide.slug}`}
                className="border-l-2 border-stone-300 pl-4 font-medium text-stone-800 transition-colors hover:border-[var(--postgres-blue)] hover:text-[var(--postgres-blue)] dark:border-stone-700 dark:text-stone-200"
              >
                {guide.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
