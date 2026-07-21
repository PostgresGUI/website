import { AlternativePage } from "@/components/alternative-page";
import { datagripData } from "@/lib/alternatives-data";
import {
  alternativeJsonLd,
  getAlternativeMetadata,
  SITE_URL,
} from "@/lib/seo-helpers";

const CANONICAL = `${SITE_URL}/alternatives/datagrip`;

export const metadata = getAlternativeMetadata(
  datagripData,
  CANONICAL,
  "/seo/datagrip-alternative.svg"
);

const jsonLd = alternativeJsonLd(datagripData, CANONICAL);

export default function DataGripAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePage data={datagripData} />
    </>
  );
}
