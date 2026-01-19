import type { Metadata } from "next";
import { JetBrains_Mono, Saira_Stencil_One } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const sairaStencilOne = Saira_Stencil_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-saira-stencil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SQL Editor",
  description: "Run SQL queries in your browser.",
  keywords: [
    "sql editor",
    "online sql editor",
    "online sql compiler",
    "sql query editor online",
    "free sql editor",
    "sql online",
  ],
  alternates: {
    canonical: "https://postgresgui.com/sql-editor",
  },
  openGraph: {
    title: "SQL Editor",
    description: "Run SQL queries in your browser.",
    type: "website",
    url: "https://postgresgui.com/sql-editor",
    images: [
      {
        url: "https://postgresgui.com/online-sql-editor.jpg",
        width: 1200,
        height: 630,
        alt: "SQL Editor - Run SQL queries in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Editor",
    description: "Run SQL queries in your browser.",
    images: ["https://postgresgui.com/online-sql-editor.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SQL Editor",
  description: "Run SQL queries in your browser.",
  url: "https://postgresgui.com/sql-editor",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jetbrainsMono.variable} ${sairaStencilOne.variable} h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
