import type { Metadata } from "next";
import { RootLayout } from "@/components/root-layout";
import { getHreflangAlternates } from "@/lib/locales";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  title: "PostgresGUI - Mac向け最高の軽量Postgresクライアント",
  description:
    "Mac用最高のPostgreSQL GUI。オープンソース、ネイティブmacOSアプリ。軽量、高速クエリ、ダークモード対応。Mac開発者に愛されるPostgreSQLクライアント。",
  keywords: [
    "postgresql gui mac",
    "postgres クライアント mac",
    "postgresql macos",
    "PostgreSQL",
    "Postgres",
    "SQL",
    "データベース",
    "クライアント",
    "クエリ",
    "エディタ",
    "macOS",
    "Mac",
  ],
  authors: [{ name: "PostgresGUI" }],
  alternates: {
    canonical: "https://postgresgui.com/ja",
    languages: getHreflangAlternates(),
  },
  openGraph: {
    title: "PostgresGUI - Mac向け最高のPostgreSQL GUI",
    description:
      "Mac用最高のPostgreSQL GUI。オープンソース、ネイティブmacOSアプリ。軽量、高速クエリ、ダークモード対応。",
    type: "website",
    url: "https://postgresgui.com/ja",
    siteName: "PostgresGUI",
    locale: "ja_JP",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Mac向け最高のPostgreSQL GUI",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgresGUI - Mac向け最高のPostgreSQL GUI",
    description:
      "Mac用最高のPostgreSQL GUI。オープンソース、ネイティブmacOSアプリ。軽量、高速クエリ、ダークモード対応。",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI - Mac向け最高のPostgreSQL GUI",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JapaneseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout lang="ja">{children}</RootLayout>;
}
