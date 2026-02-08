import { Metadata } from "next";
import { TablePlusAlternativePage } from "@/components/tableplus-alternative-page";
import { getTablePlusAlternativeMetadata } from "@/lib/seo";
import { PRICE_AMOUNT } from "@/lib/constants";

export const metadata: Metadata = getTablePlusAlternativeMetadata();

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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "10",
  },
};

export default function TablePlusAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TablePlusAlternativePage appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181" locale="en" />
    </>
  );
}
