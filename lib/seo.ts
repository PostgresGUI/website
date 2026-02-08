import { Metadata } from "next";
import { Locale } from "./translations";
import { getHreflangAlternates, getDownloadHreflangAlternates } from "./locales";
import { PRICE_AMOUNT } from "./constants";

// TablePlus Alternative Page SEO
type TablePlusAlternativeSEO = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  canonical: string;
};

const tablePlusAlternativeSeoData: Record<Locale, TablePlusAlternativeSEO> = {
  en: {
    title: "TablePlus Alternative for Mac - PostgresGUI | Open Source PostgreSQL Client",
    description:
      "Looking for a TablePlus alternative? PostgresGUI is a lightweight, open source PostgreSQL client for Mac. Native Swift app, one-time purchase, no subscription, no data collection.",
    keywords: [
      "tableplus alternative",
      "tableplus alternative mac",
      "tableplus alternative free",
      "tableplus alternative open source",
      "best postgresql gui mac",
      "native postgresql client mac",
      "tableplus vs postgresgui",
      "lightweight database gui mac",
      "postgresql client mac",
      "postgres gui mac",
      "tableplus too expensive",
      "tableplus subscription alternative",
    ],
    ogLocale: "en_US",
    canonical: "https://postgresgui.com/alternatives/tableplus",
  },
  uk: {
    title: "TablePlus Alternative for Mac - PostgresGUI | Open Source PostgreSQL Client",
    description:
      "Looking for a TablePlus alternative? PostgresGUI is a lightweight, open source PostgreSQL client for Mac. Native Swift app, one-time purchase, no subscription, no data collection.",
    keywords: [
      "tableplus alternative",
      "tableplus alternative mac",
      "tableplus alternative free",
      "tableplus alternative open source",
      "best postgresql gui mac",
      "native postgresql client mac",
      "tableplus vs postgresgui",
      "lightweight database gui mac",
      "postgresql client mac",
      "postgres gui mac",
    ],
    ogLocale: "en_GB",
    canonical: "https://postgresgui.com/alternatives/tableplus", // Point to main page
  },
  de: {
    title: "TablePlus Alternative für Mac - PostgresGUI | Open Source PostgreSQL Client",
    description:
      "Suchen Sie eine TablePlus Alternative? PostgresGUI ist ein leichtgewichtiger, quelloffener PostgreSQL-Client für Mac. Native Swift-App, Einmalkauf, kein Abo, keine Datensammlung.",
    keywords: [
      "tableplus alternative",
      "tableplus alternative mac",
      "tableplus alternative kostenlos",
      "tableplus alternative open source",
      "beste postgresql gui mac",
      "nativer postgresql client mac",
      "tableplus vs postgresgui",
      "leichtgewichtige datenbank gui mac",
      "postgresql client mac",
      "postgres gui mac deutsch",
      "tableplus zu teuer",
    ],
    ogLocale: "de_DE",
    canonical: "https://postgresgui.com/de/alternatives/tableplus",
  },
  fr: {
    title: "Alternative à TablePlus pour Mac - PostgresGUI | Client PostgreSQL Open Source",
    description:
      "Vous cherchez une alternative à TablePlus ? PostgresGUI est un client PostgreSQL léger et open source pour Mac. App Swift native, achat unique, sans abonnement, sans collecte de données.",
    keywords: [
      "alternative tableplus",
      "alternative tableplus mac",
      "alternative tableplus gratuit",
      "alternative tableplus open source",
      "meilleure gui postgresql mac",
      "client postgresql natif mac",
      "tableplus vs postgresgui",
      "gui base de données légère mac",
      "client postgresql mac",
      "postgres gui mac français",
      "tableplus trop cher",
    ],
    ogLocale: "fr_FR",
    canonical: "https://postgresgui.com/fr/alternatives/tableplus",
  },
  ja: {
    title: "Mac向けTablePlus代替 - PostgresGUI | オープンソースPostgreSQLクライアント",
    description:
      "TablePlusの代替をお探しですか？PostgresGUIはMac向けの軽量でオープンソースのPostgreSQLクライアントです。ネイティブSwiftアプリ、買い切り、サブスクなし、データ収集なし。",
    keywords: [
      "tableplus 代替",
      "tableplus 代替 mac",
      "tableplus 代替 無料",
      "tableplus 代替 オープンソース",
      "最高の postgresql gui mac",
      "ネイティブ postgresql クライアント mac",
      "tableplus vs postgresgui",
      "軽量 データベース gui mac",
      "postgresql クライアント mac",
      "postgres gui mac 日本語",
      "tableplus 高い",
    ],
    ogLocale: "ja_JP",
    canonical: "https://postgresgui.com/ja/alternatives/tableplus",
  },
};

export function getTablePlusAlternativeMetadata(locale: Locale = "en"): Metadata {
  const seo = tablePlusAlternativeSeoData[locale] || tablePlusAlternativeSeoData.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    other: {
      "og:price:amount": PRICE_AMOUNT,
      "og:price:currency": "USD",
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

type LocaleSEO = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  canonical: string;
};

const seoData: Record<Locale, LocaleSEO> = {
  en: {
    title: "PostgresGUI - The Postgres Client Built for Mac",
    description:
      "PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight, fast, dark mode support.",
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
  uk: {
    title: "PostgresGUI - The Postgres Client Built for Mac",
    description:
      "Best looking PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
    keywords: [
      "postgresql client",
      "database gui",
      "postgres mac",
      "sql editor",
      "db tool",
      "swift native",
      "lightweight database",
      "postgresql gui mac",
      "best postgres gui",
      "postgres client mac",
      "postgresql macos",
      "macOS",
      "Mac",
    ],
    ogLocale: "en_GB",
    canonical: "https://postgresgui.com", // Point to main page to avoid duplicate content
  },
  de: {
    title: "PostgresGUI – Beste PostgreSQL GUI für Mac | Open Source",
    description:
      "Die beste PostgreSQL GUI für Mac. Open-Source, native macOS-App. Leichtgewichtig (3,3 MB), schnelle Abfragen, Dunkelmodus. Der PostgreSQL-Client, den Mac-Entwickler lieben.",
    keywords: [
      "postgresql client",
      "datenbank",
      "sql editor",
      "postgres mac",
      "datenbank verwaltung",
      "open source",
      "postgresql gui mac",
      "beste postgres gui",
      "postgres client mac",
      "postgresql macos",
      "PostgreSQL",
      "Postgres",
      "SQL",
      "macOS",
      "Mac",
      "Entwickler",
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
      "client postgresql",
      "base de donnees",
      "editeur sql",
      "postgres mac",
      "gestionnaire bdd",
      "postgresql gui mac",
      "meilleure postgres gui",
      "postgres client mac",
      "postgresql macos",
      "PostgreSQL",
      "Postgres",
      "SQL",
      "macOS",
      "Mac",
      "développeur",
      "postgresql gui français",
    ],
    ogLocale: "fr_FR",
    canonical: "https://postgresgui.com/fr",
  },
  ja: {
    title: "PostgresGUI - Mac向け最高のPostgreSQL GUI | オープンソース",
    description:
      "Mac用最高のPostgreSQL GUI。オープンソース、ネイティブmacOSアプリ。軽量、高速クエリ、ダークモード対応。Mac開発者に愛されるPostgreSQLクライアント。",
    keywords: [
      "PostgreSQL クライアント",
      "データベース",
      "SQL エディタ",
      "Mac データベース",
      "postgresql gui mac",
      "postgres クライアント mac",
      "postgresql macos",
      "PostgreSQL",
      "Postgres",
      "SQL",
      "クエリ",
      "macOS",
      "Mac",
      "postgresql gui 日本語",
    ],
    ogLocale: "ja_JP",
    canonical: "https://postgresgui.com/ja",
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
  uk: {
    title: "Download PostgresGUI - PostgreSQL GUI for Mac | Free Download",
    description:
      "Download PostgresGUI for Mac. Lightweight, open-source PostgreSQL client. Native macOS app with dark mode support. Get it free on the App Store.",
    keywords: [
      "download postgresql client",
      "database gui download",
      "postgres mac download",
      "sql editor download",
      "db tool mac",
      "swift native app",
      "lightweight database tool",
      "postgresgui download",
    ],
    ogLocale: "en_GB",
    canonical: "https://postgresgui.com/download", // Point to main download page
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
  ja: {
    title: "PostgresGUIをダウンロード - Mac用PostgreSQL GUI | 無料ダウンロード",
    description:
      "Mac用PostgresGUIをダウンロード。軽量でオープンソースのPostgreSQLクライアント。ダークモード対応のネイティブmacOSアプリ。App Storeで無料入手。",
    keywords: [
      "postgresql gui mac ダウンロード",
      "postgresql クライアント ダウンロード",
      "postgresgui ダウンロード",
      "postgres gui mac 無料",
      "postgresql mac アプリ",
      "データベース gui mac",
    ],
    ogLocale: "ja_JP",
    canonical: "https://postgresgui.com/ja/download",
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
