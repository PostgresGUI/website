import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { GoogleTagManager } from "@next/third-parties/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  title: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
  description:
    "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
  keywords: [
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
  openGraph: {
    title: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
    description:
      "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
    type: "website",
    url: "https://postgresgui.com",
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
    description:
      "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-B50JK5C700" />
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
