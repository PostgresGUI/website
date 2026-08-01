import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";
import { getTrendGuide, trendGuideSlugs } from "@/lib/trend-guide-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return trendGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTrendGuide(slug);

  return guide ? getBlogPostMetadata(slug) : {};
}

export default async function TrendBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const guide = getTrendGuide(slug);

  if (!guide) notFound();

  return <TechnicalBlogPost post={getBlogPost(slug)} {...guide} />;
}
