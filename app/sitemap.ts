import { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { posts as blogPosts } from "./(en)/blog/posts";
import { categories as dataTypeCategories } from "./(apps)/data-types/_lib/data";

export const dynamic = "force-static";

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

  // Generate localized alternatives/tableplus routes
  const alternativesTablePlusLocales = ["", "/de", "/fr", "/ja"];
  const localizedTablePlusAlternatives = alternativesTablePlusLocales.map((path) => ({
    url: `${baseUrl}${path}/alternatives/tableplus`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const englishAlternatives = [
    "pgadmin",
    "postico",
    "dbeaver",
    "beekeeper-studio",
    "datagrip",
  ].map((slug) => ({
    url: `${baseUrl}/alternatives/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    ...localizedHomepages,
    ...localizedDownloads,
    ...localizedTablePlusAlternatives,
    ...englishAlternatives,
    {
      url: `${baseUrl}/postgresql-gui-mac`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/postgresql-tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/postgres-viewer-mac`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sql-editor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sql-compiler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schema-designer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sql-cheatsheet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uuid-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/connection-string`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/data-types`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...dataTypeCategories.map((cat) => ({
      url: `${baseUrl}/data-types/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/open-source-postgres-gui`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
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
