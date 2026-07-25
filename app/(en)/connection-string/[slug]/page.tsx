import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoGuidePage } from "@/components/seo-guide-page";
import {
  connectionGuideSlugs,
  getConnectionGuide,
} from "@/lib/connection-guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return connectionGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getConnectionGuide(slug);
  if (!guide) return {};

  const canonical = `https://postgresgui.com/connection-string/${slug}`;
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

export default async function ConnectionGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getConnectionGuide(slug);
  if (!guide) notFound();

  return (
    <SeoGuidePage
      guide={guide}
      canonical={`https://postgresgui.com/connection-string/${slug}`}
      breadcrumb="Connection string guides"
    />
  );
}
