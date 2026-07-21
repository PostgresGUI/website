import type { Metadata } from "next";
import type { AlternativeData, FaqItem } from "@/lib/alternatives-data";
import { PRICE_AMOUNT } from "@/lib/constants";

export const SITE_URL = "https://postgresgui.com";

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd({
  url,
  description,
  name = "PostgresGUI",
  operatingSystem = "macOS",
}: {
  url: string;
  description: string;
  name?: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem,
    applicationCategory: "DeveloperApplication",
    description,
    url,
    offers: {
      "@type": "Offer",
      price: PRICE_AMOUNT,
      priceCurrency: "USD",
    },
  };
}

export function getAlternativeMetadata(
  data: AlternativeData,
  canonical: string,
  imagePath: string
): Metadata {
  const imageUrl = absoluteUrl(imagePath);

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      type: "website",
      url: canonical,
      siteName: "PostgresGUI",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.seo.title,
        },
      ],
    },
    twitter: {
      site: "@postgresgui",
      creator: "@postgresgui",
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: [
        {
          url: imageUrl,
          alt: data.seo.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function alternativeJsonLd(data: AlternativeData, canonical: string) {
  return [
    softwareApplicationJsonLd({
      url: canonical,
      description: data.seo.description,
    }),
    faqJsonLd(data.faqItems),
  ];
}
