import { AlternativePage } from "@/components/alternative-page";
import { beekeeperStudioData } from "@/lib/alternatives-data";
import {
  alternativeJsonLd,
  getAlternativeMetadata,
  SITE_URL,
} from "@/lib/seo-helpers";

const CANONICAL = `${SITE_URL}/alternatives/beekeeper-studio`;

export const metadata = getAlternativeMetadata(
  beekeeperStudioData,
  CANONICAL,
  "/seo/beekeeper-studio-alternative.svg"
);

const jsonLd = alternativeJsonLd(beekeeperStudioData, CANONICAL);

export default function BeekeeperStudioAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePage data={beekeeperStudioData} />
    </>
  );
}
