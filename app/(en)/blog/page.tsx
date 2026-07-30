import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/blog";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "PostgreSQL Guides and Tutorials | PostgresGUI",
  description:
    "Practical PostgreSQL guides for connections, query tuning, data types, migrations, and Mac database workflows.",
  openGraph: {
    title: "PostgreSQL Guides and Tutorials | PostgresGUI",
    description:
      "Practical PostgreSQL guides for connections, query tuning, data types, migrations, and Mac database workflows.",
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
      "Practical PostgreSQL guides for connections, query tuning, data types, migrations, and Mac database workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const connectionGuideSlugs = new Set([
  "connect-postgresgui-to-supabase",
  "connect-postgresgui-to-neon",
  "ssh-tunnel-postgres",
  "ssl-verify-full-for-rds-postgresql-on-mac",
]);

const connectionGuides = posts.filter((post) =>
  connectionGuideSlugs.has(post.slug)
);
const latestPosts = posts.filter(
  (post) => !connectionGuideSlugs.has(post.slug)
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

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
            Connection setup, query tuning, data types, migrations, and
            practical Mac workflows.
          </p>
        </header>

        <section className="mb-14 border-y border-border/60 py-8">
          <h2 className="text-2xl font-semibold">Connection guides</h2>
          <p className="mt-2 text-muted-foreground">
            Connect a Mac client without guessing at hosts, poolers, tunnels, or
            TLS settings.
          </p>
          <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {connectionGuides.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border-l-2 border-border pl-4 transition-colors hover:border-[var(--postgres-blue)]"
              >
                <h3 className="font-semibold group-hover:text-[var(--postgres-blue)]">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <h2 className="mb-7 text-2xl font-semibold">Latest guides</h2>
        <div className="space-y-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-border pb-8 last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block hover:opacity-80 transition-opacity"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-[var(--postgres-blue)] dark:group-hover:text-[var(--postgres-blue-light)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {formatDate(post.date)} · {post.author} · {post.category}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
