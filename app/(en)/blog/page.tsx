import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPostList } from "@/components/blog-post-list";
import { BlogSearch } from "@/components/blog-search";
import { getBlogPost, SITE_URL } from "@/lib/blog";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "PostgreSQL Guides and Tutorials | PostgresGUI",
  description:
    "Practical PostgreSQL guides for security, AI tools, connections, query tuning, vector search, data modeling, migrations, and Mac workflows.",
  openGraph: {
    title: "PostgreSQL Guides and Tutorials | PostgresGUI",
    description:
      "Practical PostgreSQL guides for security, AI tools, connections, query tuning, vector search, data modeling, migrations, and Mac workflows.",
    type: "website",
    url: "https://postgresgui.com/blog",
    siteName: "PostgresGUI",
    locale: "en_US",
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "PostgreSQL Guides and Tutorials | PostgresGUI",
    description:
      "Practical PostgreSQL guides for security, AI tools, connections, query tuning, vector search, data modeling, migrations, and Mac workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const connectionGuideSlugs = [
  "postgres-connection-refused-mac",
  "postgresql-sslmode-explained",
  "connect-postgresgui-to-postgres-app",
  "postgresql-connection-string-errors",
  "connect-postgresgui-to-supabase",
  "connect-postgresgui-to-neon",
  "ssh-tunnel-postgres",
  "ssl-verify-full-for-rds-postgresql-on-mac",
];

const orderedPosts = posts.map((post) => getBlogPost(post.slug));
const connectionGuideSlugSet = new Set(connectionGuideSlugs);
const connectionGuides = orderedPosts.filter((post) =>
  connectionGuideSlugSet.has(post.slug),
);
const latestPosts = orderedPosts.filter(
  (post) => !connectionGuideSlugSet.has(post.slug),
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "PostgresGUI Blog",
  description:
    "PostgreSQL guides, Mac database tooling comparisons, and PostgresGUI product updates.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "PostgresGUI",
    url: SITE_URL,
  },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
  })),
};

export default function BlogPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display mb-4 tracking-tight">
            PostgreSQL guides and tutorials
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Security, AI tools, connection setup, query tuning, vector search,
            data modeling, migrations, and practical Mac workflows.
          </p>
        </header>
        <Suspense
          fallback={
            <>
              <div
                className="mb-10 h-12 rounded-md bg-stone-100 dark:bg-stone-900"
                aria-hidden="true"
              />
              <BlogPostList
                connectionGuides={connectionGuides}
                latestPosts={latestPosts}
              />
            </>
          }
        >
          <BlogSearch
            posts={orderedPosts}
            connectionGuideSlugs={connectionGuideSlugs}
          />
        </Suspense>
      </div>
    </div>
  );
}
