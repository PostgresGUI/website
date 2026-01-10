import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { getHreflangAlternates } from "@/lib/locales";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
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
  authors: [{ name: "PostgresGUI" }],
  alternates: {
    canonical: "https://postgresgui.com",
    languages: getHreflangAlternates(),
  },
  openGraph: {
    title: "PostgresGUI – Best PostgreSQL GUI for Mac",
    description:
      "The best PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
    type: "website",
    url: "https://postgresgui.com",
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI – Best PostgreSQL GUI for Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgresGUI – Best PostgreSQL GUI for Mac",
    description:
      "The best PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight (3.3 MB), fast queries, dark mode support. The postgres client Mac developers love.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI – Best PostgreSQL GUI for Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation />
        {children}
        <Footer />
        <CookieConsent gtmId="G-B50JK5C700" />
      </body>
    </html>
  );
}
