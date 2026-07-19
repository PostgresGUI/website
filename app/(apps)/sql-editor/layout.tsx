import type { Metadata } from "next";
import { JetBrains_Mono, Saira_Stencil_One } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const sairaStencilOne = Saira_Stencil_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-saira-stencil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Online SQL Compiler & SQL Query Editor",
  description:
    "Run SQL queries in a browser-based SQL compiler with a built-in PostgreSQL database. Use the free online SQL query editor to create tables, test joins, and practice Postgres.",
  keywords: [
    "sql editor",
    "online sql editor",
    "online sql compiler",
    "sql online compiler with database",
    "sql query editor online",
    "online postgresql editor",
    "postgresql online query editor",
    "postgresql online compiler",
    "sql editor online with database",
    "free sql editor",
    "sql online",
  ],
  alternates: {
    canonical: "https://postgresgui.com/sql-editor",
  },
  openGraph: {
    title: "Online SQL Compiler & SQL Query Editor",
    description:
      "Run SQL queries in a browser-based SQL compiler with a built-in PostgreSQL database.",
    type: "website",
    url: "https://postgresgui.com/sql-editor",
    images: [
      {
        url: "https://postgresgui.com/online-sql-editor.jpg",
        width: 1200,
        height: 630,
        alt: "SQL Editor - Run SQL queries in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online SQL Compiler & SQL Query Editor",
    description:
      "Run SQL queries in a browser-based SQL compiler with a built-in PostgreSQL database.",
    images: ["https://postgresgui.com/online-sql-editor.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Online SQL Compiler and SQL Query Editor",
  description:
    "Run SQL queries in a browser-based SQL compiler with a built-in PostgreSQL database.",
  url: "https://postgresgui.com/sql-editor",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jetbrainsMono.variable} ${sairaStencilOne.variable} h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
