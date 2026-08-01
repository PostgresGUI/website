import Image from "next/image";
import Link from "next/link";
import { type BlogPost, getRelatedBlogPosts } from "@/lib/blog";

type BlogPostFooterProps = {
  post: BlogPost;
};

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostFooter({ post }: BlogPostFooterProps) {
  const relatedPosts = getRelatedBlogPosts(post);
  const dateModified = post.dateModified ?? post.date;

  return (
    <footer className="not-prose mt-12 space-y-8 border-t border-border pt-8">
      <section className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-semibold text-foreground">
          About the author
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {post.author} builds PostgresGUI, a native macOS PostgreSQL client
          focused on fast query work, simple browsing, and a clean Mac
          experience.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Published {formatDate(post.date)}
          {dateModified !== post.date
            ? ` · Updated ${formatDate(dateModified)}`
            : ""}
        </p>
      </section>

      {post.sources?.length ? (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Sources and further reading
          </h2>
          <ul className="mt-3 space-y-2">
            {post.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--postgres-blue)] hover:underline"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {post.faqs?.length ? (
        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-4">
            {post.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-semibold">{faq.question}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Related posts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.slug}
              href={`/blog/${relatedPost.slug}`}
              className="rounded-lg border border-border p-4 transition-colors hover:border-[var(--postgres-blue)] hover:bg-accent/40"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {relatedPost.category}
              </p>
              <h3 className="mt-2 text-sm font-semibold leading-5 text-foreground">
                {relatedPost.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {relatedPost.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900">
        <div className="grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold text-[var(--postgres-blue)]">
              PostgresGUI for Mac
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Keep the query and the result in one focused workspace
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Browse schemas, edit rows, run SQL, and save the queries you want
              to revisit. PostgresGUI is native, open source, and available
              without a subscription.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/download"
                className="inline-flex rounded-md bg-[var(--postgres-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--postgres-blue-dark)]"
              >
                Download PostgresGUI
              </Link>
              <Link
                href="/postgresql-gui-mac"
                className="inline-flex px-2 py-2 text-sm font-semibold text-[var(--postgres-blue)] hover:underline"
              >
                See the Mac client
              </Link>
            </div>
          </div>
          <div className="self-end px-5 pt-2 md:px-0 md:pt-6">
            <Image
              src="/screenshots4/PostgresGUI - Run complex query and see query results.webp"
              alt="PostgresGUI query editor showing PostgreSQL query results"
              width={2336}
              height={1456}
              sizes="(max-width: 768px) 100vw, 440px"
              className="h-auto w-full rounded-t-md shadow-[0_18px_45px_rgba(0,0,0,0.14)]"
            />
          </div>
        </div>
      </section>
    </footer>
  );
}
