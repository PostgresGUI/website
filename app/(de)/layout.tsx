import type { Metadata } from "next";
import { RootLayout } from "@/components/root-layout";
import { getHreflangAlternates } from "@/lib/locales";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  title: "PostgresGUI – Beste PostgreSQL GUI für Mac | Open Source",
  description:
    "Die beste PostgreSQL GUI für Mac. Open-Source, native macOS-App. Leichtgewichtig, schnelle Abfragen, Dunkelmodus-Unterstützung. Der PostgreSQL-Client, den Mac-Entwickler lieben.",
  keywords: [
    "postgresql gui mac",
    "beste postgres gui",
    "postgres client mac",
    "postgresql macos",
    "PostgreSQL",
    "Postgres",
    "SQL",
    "Datenbank",
    "Client",
    "Abfrage",
    "Editor",
    "macOS",
    "Mac",
  ],
  authors: [{ name: "PostgresGUI" }],
  alternates: {
    canonical: "https://postgresgui.com/de",
    languages: getHreflangAlternates(),
  },
  openGraph: {
    title: "PostgresGUI – Beste PostgreSQL GUI für Mac",
    description:
      "Die beste PostgreSQL GUI für Mac. Open-Source, native macOS-App. Leichtgewichtig, schnelle Abfragen, Dunkelmodus-Unterstützung.",
    type: "website",
    url: "https://postgresgui.com/de",
    siteName: "PostgresGUI",
    locale: "de_DE",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI – Beste PostgreSQL GUI für Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgresGUI – Beste PostgreSQL GUI für Mac",
    description:
      "Die beste PostgreSQL GUI für Mac. Open-Source, native macOS-App. Leichtgewichtig, schnelle Abfragen, Dunkelmodus-Unterstützung.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI – Beste PostgreSQL GUI für Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GermanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout lang="de">{children}</RootLayout>;
}
