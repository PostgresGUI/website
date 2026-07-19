import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("download-postgresql-for-mac");

export const metadata = getBlogPostMetadata(post.slug);

export default function DownloadPostgreSQLForMacPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <article className="prose dark:prose-invert max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display mb-4">
                Download PostgreSQL for Mac: Server, psql, and GUI Options
              </h1>
              <p className="text-muted-foreground text-lg">Ghazi</p>
            </header>

            <div className="space-y-6">
              <p>
                Searching for <strong>download PostgreSQL for Mac</strong> can
                mean a few different things. You might need the PostgreSQL
                server, just the <code>psql</code> client, a local development
                setup, or a visual client for a database you already have.
              </p>

              <h2>Pick the install path that matches your goal</h2>
              <ul>
                <li>
                  <strong>You want a local PostgreSQL server:</strong> use
                  Postgres.app or the official PostgreSQL installer.
                </li>
                <li>
                  <strong>You only need terminal tools:</strong> install{" "}
                  <code>libpq</code> or PostgreSQL client tools with Homebrew.
                </li>
                <li>
                  <strong>You already have a cloud database:</strong> install a
                  client like <code>psql</code> or PostgresGUI and connect with
                  your provider&apos;s connection string.
                </li>
                <li>
                  <strong>You want a visual database client:</strong> use a
                  native app such as PostgresGUI for browsing tables, running
                  SQL, and inspecting query results.
                </li>
              </ul>

              <h2>Postgres.app</h2>
              <p>
                Postgres.app is the simple Mac-native route for local
                development. It bundles PostgreSQL in an app-style package and
                includes the command-line tools. It is a good first choice for
                developers who want a local server without managing background
                services manually.
              </p>

              <h2>Homebrew</h2>
              <p>
                Homebrew is a good fit if you prefer the terminal and want your
                packages managed consistently. If your goal is to install the
                Postgres client on Mac, Homebrew can give you the command-line
                pieces without turning the setup into a full desktop workflow.
              </p>

              <pre><code>{`brew install libpq
brew link --force libpq
psql --version`}</code></pre>

              <h2>Official PostgreSQL installer</h2>
              <p>
                The official installer is useful when you want the packaged
                PostgreSQL distribution, including server components and bundled
                tools. It is heavier than Homebrew or Postgres.app, but it is
                familiar and well documented.
              </p>

              <h2>PostgresGUI</h2>
              <p>
                PostgresGUI is not a PostgreSQL server. It is a native Mac
                PostgreSQL client. Use it after you have a database running
                locally, in Docker, or in the cloud. It helps with visual table
                browsing, SQL query execution, JSON result viewing, CSV export,
                and row editing.
              </p>

              <h2>Recommended setup</h2>
              <p>
                For most Mac developers, the practical stack is: Postgres.app or
                Homebrew for the server/client tools, <code>psql</code> for
                quick terminal work, and PostgresGUI for day-to-day visual
                database exploration.
              </p>
            </div>

            <BlogPostFooter post={post} />
          </article>
        </div>
      </div>
    </>
  );
}
