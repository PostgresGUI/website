import type { Metadata } from "next";
import { RootLayout } from "@/components/root-layout";
import { getHreflangAlternates } from "@/lib/locales";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  title: "Postgres Client for Mac | PostgresGUI",
  description:
    "A native Postgres client for Mac. Browse PostgreSQL tables, run SQL, edit rows, and export results in a focused open-source macOS app.",
  keywords: [
    "postgresql gui mac",
    "best postgres gui",
    "postgres client mac",
    "postgresql macos",
    "PostgreSQL",
    "Postgres",
    "SQL",
    "database",
    "client",
    "query",
    "editor",
    "browser",
    "macOS",
    "Mac",
    "developer",
    "admin",
  ],
  authors: [{ name: "PostgresGUI" }],
  alternates: {
    canonical: "https://postgresgui.com",
    languages: getHreflangAlternates(),
  },
  openGraph: {
    title: "Postgres Client for Mac | PostgresGUI",
    description:
      "Browse PostgreSQL tables, run SQL, edit rows, and export results in a focused native Postgres client for Mac.",
    type: "website",
    url: "https://postgresgui.com",
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Native Postgres client for Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "Postgres Client for Mac | PostgresGUI",
    description:
      "Browse PostgreSQL tables, run SQL, edit rows, and export results in a focused native Postgres client for Mac.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI - Native Postgres client for Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout lang="en">{children}</RootLayout>;
}
