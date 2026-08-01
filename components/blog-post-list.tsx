import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

type BlogPostListProps = {
  connectionGuides: BlogPost[];
  latestPosts: BlogPost[];
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

export function BlogPostList({
  connectionGuides,
  latestPosts,
}: BlogPostListProps) {
  return (
    <>
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
              className="group block transition-opacity hover:opacity-80"
            >
              <h3 className="mb-2 text-2xl font-semibold transition-colors group-hover:text-[var(--postgres-blue)] dark:group-hover:text-[var(--postgres-blue-light)] md:text-3xl">
                {post.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {formatDate(post.date)} · {post.author} · {post.category}
              </p>
              <p className="leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
