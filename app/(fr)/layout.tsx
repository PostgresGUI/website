import type { Metadata } from "next";
import { RootLayout } from "@/components/root-layout";
import { getHreflangAlternates } from "@/lib/locales";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  title: "PostgresGUI - Le Meilleur Client Postgres Léger pour Mac",
  description:
    "La meilleure GUI PostgreSQL pour Mac. Open-source, application macOS native. Légère, requêtes rapides, support du mode sombre. Le client PostgreSQL que les développeurs Mac adorent.",
  keywords: [
    "postgresql gui mac",
    "meilleure postgres gui",
    "postgres client mac",
    "postgresql macos",
    "PostgreSQL",
    "Postgres",
    "SQL",
    "base de données",
    "client",
    "requête",
    "éditeur",
    "macOS",
    "Mac",
  ],
  authors: [{ name: "PostgresGUI" }],
  alternates: {
    canonical: "https://postgresgui.com/fr",
    languages: getHreflangAlternates(),
  },
  openGraph: {
    title: "PostgresGUI – Meilleure GUI PostgreSQL pour Mac",
    description:
      "La meilleure GUI PostgreSQL pour Mac. Open-source, application macOS native. Légère, requêtes rapides, support du mode sombre.",
    type: "website",
    url: "https://postgresgui.com/fr",
    siteName: "PostgresGUI",
    locale: "fr_FR",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI – Meilleure GUI PostgreSQL pour Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgresGUI – Meilleure GUI PostgreSQL pour Mac",
    description:
      "La meilleure GUI PostgreSQL pour Mac. Open-source, application macOS native. Légère, requêtes rapides, support du mode sombre.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI – Meilleure GUI PostgreSQL pour Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FrenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout lang="fr">{children}</RootLayout>;
}
