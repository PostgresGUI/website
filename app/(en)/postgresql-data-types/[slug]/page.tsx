import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoGuidePage } from "@/components/seo-guide-page";
import {
  dataTypeGuideSlugs,
  getDataTypeGuide,
} from "@/lib/data-type-guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dataTypeGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDataTypeGuide(slug);
  if (!guide) return {};
  const canonical = `https://postgresgui.com/postgresql-data-types/${slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: canonical,
      siteName: "PostgresGUI",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function DataTypeGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getDataTypeGuide(slug);
  if (!guide) notFound();

  return (
    <SeoGuidePage
      guide={guide}
      canonical={`https://postgresgui.com/postgresql-data-types/${slug}`}
      breadcrumb="PostgreSQL data types"
    />
  );
}
