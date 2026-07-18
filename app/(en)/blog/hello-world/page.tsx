import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("hello-world");

export const metadata = getBlogPostMetadata(post.slug);

export default function HelloWorldPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              Hello World
            </h1>
            <p className="text-muted-foreground text-lg">Ghazi</p>
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

          <BlogPostFooter post={post} />
          </article>
      </div>
    </div>
    </>
  );
}
