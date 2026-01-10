import { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

export const dynamic = "force-static";

type BlogPostInfo = {
  slug: string;
  date: string;
};

const blogPosts: BlogPostInfo[] = [
  {
    slug: "hello-world",
    date: "2025-01-15",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://postgresgui.com";

  const blogRoutes = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Generate localized homepage routes
  const localizedHomepages = locales.map((locale) => ({
    url: `${baseUrl}${locale.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale.path === "" ? 1 : 0.9,
  }));

  // Generate localized download page routes
  const localizedDownloads = locales.map((locale) => ({
    url: `${baseUrl}${locale.path}/download`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    ...localizedHomepages,
    ...localizedDownloads,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogRoutes,
  ];
}
