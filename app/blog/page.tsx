import type { Metadata } from "next";
import Link from "next/link";
import {
  metadata as helloWorldMetadata,
  date as helloWorldDate,
} from "./hello-world/page";

export const metadata: Metadata = {
  title: "Blog - PostgresGUI",
  description:
    "Read the latest blog posts from PostgresGUI. Updates, insights, and stories about building a lightweight PostgreSQL client for Mac.",
  openGraph: {
    title: "Blog - PostgresGUI",
    description:
      "Read the latest blog posts from PostgresGUI. Updates, insights, and stories about building a lightweight PostgreSQL client for Mac.",
    type: "website",
    url: "https://postgresgui.com/blog",
    siteName: "PostgresGUI",
    locale: "en_US",
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "Blog - PostgresGUI",
    description:
      "Read the latest blog posts from PostgresGUI. Updates, insights, and stories about building a lightweight PostgreSQL client for Mac.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type BlogPostInfo = {
  slug: string;
  date: string;
  title: string;
  description: string;
};

const posts: BlogPostInfo[] = [
  {
    slug: "hello-world",
    date: helloWorldDate,
    title: helloWorldMetadata.title as string,
    description: helloWorldMetadata.description as string,
  },
].sort((a, b) => {
  // Sort by date, newest first
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Updates, insights, and stories from PostgresGUI
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
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
                  {formatDate(post.date)}
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
