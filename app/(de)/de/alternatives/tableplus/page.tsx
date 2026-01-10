import { Metadata } from "next";
import { TablePlusAlternativePage } from "@/components/tableplus-alternative-page";
import { getTablePlusAlternativeMetadata } from "@/lib/seo";

export const metadata: Metadata = getTablePlusAlternativeMetadata("de");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostgresGUI",
  operatingSystem: "macOS",
  applicationCategory: "DeveloperApplication",
  description:
    "Ein leichtgewichtiger, quelloffener PostgreSQL-Client für Mac. Native Swift-App ohne Abogebühren.",
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

export default function TablePlusAlternativeDE() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TablePlusAlternativePage appStoreLink="https://apps.apple.com/de/app/postgresgui/id6756467181" locale="de" />
    </>
  );
}
