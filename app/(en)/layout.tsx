import type { Metadata } from "next";
import { RootLayout } from "@/components/root-layout";
import { getHreflangAlternates } from "@/lib/locales";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  title: "PostgresGUI - The Postgres Client Built for Mac",
  description:
    "Best looking PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
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
    title: "PostgresGUI - The Postgres Client Built for Mac",
    description:
      "Best looking PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
    type: "website",
    url: "https://postgresgui.com",
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - The Postgres Client Built for Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgresGUI - The Postgres Client Built for Mac",
    description:
      "Best looking PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI - The Postgres Client Built for Mac",
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
