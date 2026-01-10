import { Metadata } from "next";
import { Locale } from "./translations";
import { getHreflangAlternates, getDownloadHreflangAlternates } from "./locales";

type LocaleSEO = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  canonical: string;
};

const seoData: Record<Locale, LocaleSEO> = {
  en: {
    title: "PostgresGUI – Best PostgreSQL GUI for Mac | Open Source",
    description:
      "The best PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
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
    ogLocale: "en_US",
    canonical: "https://postgresgui.com",
  },
  de: {
    title: "PostgresGUI – Beste PostgreSQL GUI für Mac | Open Source",
    description:
      "Die beste PostgreSQL GUI für Mac. Open-Source, native macOS-App. Leichtgewichtig (3,3 MB), schnelle Abfragen, Dunkelmodus. Der PostgreSQL-Client, den Mac-Entwickler lieben.",
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
      "Browser",
      "macOS",
      "Mac",
      "Entwickler",
      "Admin",
      "postgresql gui deutsch",
    ],
    ogLocale: "de_DE",
    canonical: "https://postgresgui.com/de",
  },
  fr: {
    title: "PostgresGUI – Meilleure GUI PostgreSQL pour Mac | Open Source",
    description:
      "La meilleure GUI PostgreSQL pour Mac. Application macOS native open-source. Légère (3,3 Mo), requêtes rapides, mode sombre. Le client postgres que les développeurs Mac adorent.",
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
      "navigateur",
      "macOS",
      "Mac",
      "développeur",
      "admin",
      "postgresql gui français",
    ],
    ogLocale: "fr_FR",
    canonical: "https://postgresgui.com/fr",
  },
};

export function getLocaleMetadata(locale: Locale): Metadata {
  const seo = seoData[locale] || seoData.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
      languages: getHreflangAlternates(),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: seo.canonical,
      siteName: "PostgresGUI",
      locale: seo.ogLocale,
      images: [
        {
          url: "https://postgresgui.com/postgresgui-og-image.jpg",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      site: "@postgresgui",
      creator: "@postgresgui",
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: "https://postgresgui.com/postgresgui-og-image.jpg",
          alt: seo.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Download page SEO data
const downloadSeoData: Record<Locale, LocaleSEO> = {
  en: {
    title: "Download PostgresGUI - PostgreSQL GUI for Mac | Free Download",
    description:
      "Download PostgresGUI for Mac. Lightweight, open-source PostgreSQL client. Native macOS app with dark mode support. Get it free on the App Store.",
    keywords: [
      "download postgresql gui mac",
      "postgresql client download",
      "postgresgui download",
      "postgres gui mac download",
      "postgresql mac app download",
      "postgresql gui free download",
      "postgres client mac free",
      "database gui mac download",
    ],
    ogLocale: "en_US",
    canonical: "https://postgresgui.com/download",
  },
  de: {
    title: "PostgresGUI herunterladen - PostgreSQL GUI für Mac | Kostenlos",
    description:
      "PostgresGUI für Mac herunterladen. Leichtgewichtiger, Open-Source PostgreSQL-Client. Native macOS-App mit Dunkelmodus. Kostenlos im App Store.",
    keywords: [
      "postgresql gui mac herunterladen",
      "postgres client download mac",
      "postgresgui kostenlos herunterladen",
      "postgresql gui download deutsch",
      "postgres mac app herunterladen",
      "datenbank gui mac download",
    ],
    ogLocale: "de_DE",
    canonical: "https://postgresgui.com/de/download",
  },
  fr: {
    title: "Télécharger PostgresGUI - GUI PostgreSQL pour Mac | Gratuit",
    description:
      "Télécharger PostgresGUI pour Mac. Client PostgreSQL léger et open-source. Application macOS native avec mode sombre. Gratuit sur l'App Store.",
    keywords: [
      "telecharger postgresql gui mac",
      "postgresql client mac telecharger",
      "postgresgui telechargement gratuit",
      "postgresql gui download francais",
      "postgres mac app telecharger",
      "base de donnees gui mac",
    ],
    ogLocale: "fr_FR",
    canonical: "https://postgresgui.com/fr/download",
  },
};

export function getDownloadPageMetadata(locale: Locale): Metadata {
  const seo = downloadSeoData[locale] || downloadSeoData.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
      languages: getDownloadHreflangAlternates(),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: seo.canonical,
      siteName: "PostgresGUI",
      locale: seo.ogLocale,
      images: [
        {
          url: "https://postgresgui.com/postgresgui-og-image.jpg",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      site: "@postgresgui",
      creator: "@postgresgui",
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: "https://postgresgui.com/postgresgui-og-image.jpg",
          alt: seo.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
