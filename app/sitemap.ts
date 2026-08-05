import { MetadataRoute } from "next";
import { posts as blogPosts } from "./(en)/blog/posts";
import { categories as dataTypeCategories } from "./(apps)/data-types/_lib/data";
import { connectionGuideSlugs } from "@/lib/connection-guides";
import { dataTypeGuideSlugs } from "@/lib/data-type-guides";
import { getBlogPost } from "@/lib/blog";
import { workflowGuideSlugs } from "@/lib/workflow-guides";

export const dynamic = "force-static";

const baseUrl = "https://postgresgui.com";

function entry(
  path: string,
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path}`,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedCanonicalPaths = ["", "/de", "/fr", "/ja"];

  return [
    entry("", "2026-07-28"),
    ...localizedCanonicalPaths
      .filter((path) => path !== "")
      .map((path) => entry(path)),
    entry("/download", "2026-07-30"),
    ...localizedCanonicalPaths
      .filter((path) => path !== "")
      .map((path) => entry(`${path}/download`)),
    entry("/alternatives/tableplus"),
    ...["/de", "/fr", "/ja"].map((path) =>
      entry(`${path}/alternatives/tableplus`),
    ),
    ...[
      "pgadmin",
      "postico",
      "dbeaver",
      "beekeeper-studio",
      "datagrip",
      "postico-vs-tableplus",
    ].map((slug) => entry(`/alternatives/${slug}`)),
    entry("/postgresql-gui-mac", "2026-07-28"),
    entry("/postgresql-tools", "2026-07-25"),
    entry("/postgres-viewer-mac", "2026-07-28"),
    entry("/psql-gui", "2026-07-28"),
    entry("/postgres-manager-mac", "2026-07-28"),
    entry("/sql-editor", "2026-07-25"),
    entry("/sql-compiler", "2026-07-25"),
    entry("/schema-designer", "2026-07-25"),
    entry("/postgresql-er-diagram-from-sql", "2026-07-25"),
    entry("/sql-cheatsheet", "2026-07-25"),
    entry("/uuid-generator", "2026-07-25"),
    entry("/connection-string", "2026-07-25"),
    entry("/explain-checker", "2026-08-04"),
    entry("/migration-diff", "2026-08-04"),
    entry("/data-types", "2026-07-25"),
    ...dataTypeCategories.map((category) =>
      entry(`/data-types/${category.id}`, "2026-07-25"),
    ),
    ...connectionGuideSlugs.map((slug) =>
      entry(`/connection-string/${slug}`, "2026-07-25"),
    ),
    ...dataTypeGuideSlugs.map((slug) =>
      entry(`/postgresql-data-types/${slug}`, "2026-07-25"),
    ),
    ...workflowGuideSlugs.map((slug) =>
      entry(`/postgresql-client-for/${slug}`, "2026-07-25"),
    ),
    entry("/open-source-postgres-gui", "2026-07-25"),
    entry("/privacy", "2026-01-09"),
    entry("/support", "2026-01-09"),
    entry("/blog", "2026-08-04"),
    ...blogPosts.map((post) => {
      const fullPost = getBlogPost(post.slug);
      return entry(
        `/blog/${post.slug}`,
        fullPost.dateModified ?? fullPost.date,
      );
    }),
  ];
}
