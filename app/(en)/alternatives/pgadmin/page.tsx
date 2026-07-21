import { Metadata } from "next";
import { AlternativePage } from "@/components/alternative-page";
import { pgadminData } from "@/lib/alternatives-data";
import { alternativeJsonLd } from "@/lib/seo-helpers";

const CANONICAL = "https://postgresgui.com/alternatives/pgadmin";

export const metadata: Metadata = {
  title: pgadminData.seo.title,
  description: pgadminData.seo.description,
  keywords: pgadminData.seo.keywords,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: pgadminData.seo.title,
    description: pgadminData.seo.description,
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/seo/pgadmin-alternative.svg",
        width: 1200,
        height: 630,
        alt: pgadminData.seo.title,
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: pgadminData.seo.title,
    description: pgadminData.seo.description,
    images: [
      {
        url: "https://postgresgui.com/seo/pgadmin-alternative.svg",
        alt: pgadminData.seo.title,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = alternativeJsonLd(pgadminData, CANONICAL);

export default function PgAdminAlternative() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePage data={pgadminData} />
    </>
  );
}
