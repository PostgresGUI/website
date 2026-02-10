import { PRICE_AMOUNT } from "@/lib/constants";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PostgresGUI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS",
    offers: {
      "@type": "Offer",
      price: PRICE_AMOUNT,
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
    description:
      "Best looking PostgreSQL GUI for Mac. Open-source, native macOS app. Lightweight, fast queries, dark mode support.",
    downloadUrl: "https://apps.apple.com/app/postgresgui/id6756467181",
    softwareVersion: "1.0",
    author: {
      "@type": "Organization",
      name: "PostgresGUI",
      url: "https://postgresgui.com",
    },
    screenshot: "https://postgresgui.com/screenshots4/PostgresGUI - Run complex query and see query results.webp",
    featureList: [
      "Native macOS app",
      "Dark mode support",
      "Fast query execution",
      "Open source",
      "Lightweight (3.3 MB)",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
