import { Metadata } from "next";
import { AlternativePage } from "@/components/alternative-page";
import { posticoData } from "@/lib/alternatives-data";
import { PRICE_AMOUNT } from "@/lib/constants";

const CANONICAL = "https://postgresgui.com/alternatives/postico";

export const metadata: Metadata = {
  title: posticoData.seo.title,
  description: posticoData.seo.description,
  keywords: posticoData.seo.keywords,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: posticoData.seo.title,
    description: posticoData.seo.description,
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: posticoData.seo.title,
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: posticoData.seo.title,
    description: posticoData.seo.description,
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: posticoData.seo.title,
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

export default function PosticoAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePage data={posticoData} />
    </>
  );
}
