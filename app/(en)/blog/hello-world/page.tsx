import type { Metadata } from "next";

const date = "2025-01-15";

export const metadata: Metadata = {
  title: "Hello World - PostgresGUI Blog",
  description:
    "Welcome to the PostgresGUI blog! This is our first post introducing our blog and sharing updates about our lightweight PostgreSQL client for Mac.",
  keywords: ["PostgresGUI", "PostgreSQL", "blog", "database", "Mac", "macOS"],
  openGraph: {
    title: "Hello World - PostgresGUI Blog",
    description:
      "Welcome to the PostgresGUI blog! This is our first post introducing our blog and sharing updates about our lightweight PostgreSQL client for Mac.",
    type: "article",
    publishedTime: "2025-01-15T00:00:00Z",
    url: "https://postgresgui.com/blog/hello-world",
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Native PostgreSQL Client for Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "Hello World - PostgresGUI Blog",
    description:
      "Welcome to the PostgresGUI blog! This is our first post introducing our blog and sharing updates about our lightweight PostgreSQL client for Mac.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI - Native PostgreSQL Client for Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HelloWorldPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              Hello World
            </h1>
            <p className="text-muted-foreground text-lg">January 15, 2025</p>
          </header>

          <div className="space-y-6">
            <p>
              Welcome to the PostgresGUI blog! We're excited to share updates,
              insights, and stories about building a lightweight PostgreSQL
              client for Mac.
            </p>

            <p>
              This is our first blog post, and we're just getting started. Stay
              tuned.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
