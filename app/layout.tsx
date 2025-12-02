import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostgresMac - Lightweight PostgreSQL Client for Mac",
  description: "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
  keywords: ["PostgreSQL", "Postgres", "SQL", "database", "client", "query", "editor", "browser", "macOS", "Mac", "developer", "admin"],
  authors: [{ name: "PostgresMac" }],
  openGraph: {
    title: "PostgresMac - Lightweight PostgreSQL Client for Mac",
    description: "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
    type: "website",
    siteName: "PostgresMac",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostgresMac - Lightweight PostgreSQL Client for Mac",
    description: "A lightweight PostgreSQL client for macOS. Manage connections, browse databases, execute SQL queries with syntax highlighting, and view results—all in a native SwiftUI interface.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
