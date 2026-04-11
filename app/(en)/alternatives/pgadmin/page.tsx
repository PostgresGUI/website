import { Metadata } from "next";
import { AlternativePage } from "@/components/alternative-page";
import { pgadminData } from "@/lib/alternatives-data";
import { PRICE_AMOUNT } from "@/lib/constants";

const CANONICAL = "https://postgresgui.com/alternatives/pgadmin";

export const metadata: Metadata = {
  title: pgadminData.seo.title,
  description: pgadminData.seo.description,
  keywords: pgadminData.seo.keywords,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: pgadminData.seo.title,
    description: pgadminData.seo.description,
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: pgadminData.seo.title,
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: pgadminData.seo.title,
    description: pgadminData.seo.description,
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: pgadminData.seo.title,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostgresGUI",
  operatingSystem: "macOS",
  applicationCategory: "DeveloperApplication",
  description:
    "A lightweight, open source PostgreSQL client for Mac. Native Swift app with no subscription fees.",
  offers: {
    "@type": "Offer",
    price: PRICE_AMOUNT,
    priceCurrency: "USD",
  },
};

export default function PgAdminAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePage data={pgadminData} />
    </>
  );
}
