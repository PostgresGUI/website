import { AlternativePage } from "@/components/alternative-page";
import { dbeaverData } from "@/lib/alternatives-data";
import {
  alternativeJsonLd,
  getAlternativeMetadata,
  SITE_URL,
} from "@/lib/seo-helpers";

const CANONICAL = `${SITE_URL}/alternatives/dbeaver`;

export const metadata = getAlternativeMetadata(
  dbeaverData,
  CANONICAL,
  "/seo/dbeaver-alternative.svg"
);

const jsonLd = alternativeJsonLd(dbeaverData, CANONICAL);

export default function DBeaverAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePage data={dbeaverData} />
    </>
  );
}
