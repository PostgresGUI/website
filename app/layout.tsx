import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        url: "/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgresGUI - Lightweight PostgreSQL Client for Mac",
    description:
      "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
    images: [
      {
        url: "/postgresgui-og-image.jpg",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
