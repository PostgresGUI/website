import { Metadata } from "next";
import { TablePlusAlternativePage } from "@/components/tableplus-alternative-page";
import { getTablePlusAlternativeMetadata } from "@/lib/seo";

export const metadata: Metadata = getTablePlusAlternativeMetadata("fr");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostgresGUI",
  operatingSystem: "macOS",
  applicationCategory: "DeveloperApplication",
  description:
    "Un client PostgreSQL léger et open source pour Mac. Application Swift native sans abonnement.",
  offers: {
    "@type": "Offer",
    price: "4.99",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "10",
  },
};

export default function TablePlusAlternativeFR() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TablePlusAlternativePage appStoreLink="https://apps.apple.com/fr/app/postgresgui/id6756467181" locale="fr" />
    </>
  );
}
