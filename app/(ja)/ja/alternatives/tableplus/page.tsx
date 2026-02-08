import { Metadata } from "next";
import { TablePlusAlternativePage } from "@/components/tableplus-alternative-page";
import { getTablePlusAlternativeMetadata } from "@/lib/seo";
import { PRICE_AMOUNT } from "@/lib/constants";

export const metadata: Metadata = getTablePlusAlternativeMetadata("ja");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostgresGUI",
  operatingSystem: "macOS",
  applicationCategory: "DeveloperApplication",
  description:
    "Mac向けの軽量でオープンソースのPostgreSQLクライアント。ネイティブSwiftアプリ、サブスクリプション不要。",
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

export default function TablePlusAlternativeJA() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TablePlusAlternativePage appStoreLink="https://apps.apple.com/jp/app/postgresgui/id6756467181" locale="ja" />
    </>
  );
}
