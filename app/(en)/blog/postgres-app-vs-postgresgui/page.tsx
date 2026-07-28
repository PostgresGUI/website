import Link from "next/link";
import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("postgres-app-vs-postgresgui");

export const metadata = getBlogPostMetadata(post.slug);

export default function PostgresAppVsPostgresGuiPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <article className="prose max-w-none dark:prose-invert">
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-display md:text-5xl">
                Postgres.app vs PostgresGUI: server or client?
              </h1>
              <p className="text-lg text-muted-foreground">
                Ghazi · July 28, 2026
              </p>
            </header>

            <div className="space-y-6">
              <p>
                The names are close, but the apps do different jobs.
                Postgres.app runs a PostgreSQL server on your Mac. PostgresGUI
                connects to a PostgreSQL server so you can browse tables, run
                SQL, edit rows, and inspect results.
              </p>

              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>App</th>
                      <th>Main job</th>
                      <th>Use it when</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Postgres.app</td>
                      <td>Run PostgreSQL locally on macOS</td>
                      <td>You need a local database server</td>
                    </tr>
                    <tr>
                      <td>PostgresGUI</td>
                      <td>Connect to and work with PostgreSQL</td>
                      <td>You need a visual database client</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>What Postgres.app installs</h2>
              <p>
                Postgres.app packages PostgreSQL as a normal Mac application.
                Start the app and initialize a server, and PostgreSQL runs
                locally. It also includes command-line tools such as{" "}
                <code>psql</code>, <code>createdb</code>, and{" "}
                <code>pg_dump</code>.
              </p>
              <p>
                Choose it when your application needs a local PostgreSQL server
                and you do not want to manage a Homebrew service or a manual
                installer.
              </p>

              <h2>What PostgresGUI does</h2>
              <p>
                PostgresGUI is a database client. It does not install or run the
                PostgreSQL server. It connects to a server that already exists:
                Postgres.app, Docker, a Homebrew installation, a remote machine,
                or a cloud provider.
              </p>
              <ul>
                <li>Browse schemas, tables, and rows.</li>
                <li>Run SQL and inspect the result in a grid.</li>
                <li>Edit rows when your database role allows it.</li>
                <li>View JSON and export results as CSV.</li>
                <li>Connect through SSL or an SSH tunnel.</li>
              </ul>

              <h2>Using both together</h2>
              <p>
                This is the common local setup:
              </p>
              <ol>
                <li>Install Postgres.app and initialize the local server.</li>
                <li>Open PostgresGUI and add a new connection.</li>
                <li>
                  Connect to <code>localhost</code> on port <code>5432</code>{" "}
                  using the database and role created by Postgres.app.
                </li>
                <li>Browse tables or run SQL in PostgresGUI.</li>
              </ol>
              <p>
                Postgres.app&apos;s exact default database and authentication
                settings depend on the server you initialized. Use the values
                shown in Postgres.app rather than guessing.
              </p>

              <h2>What if the database is already in the cloud?</h2>
              <p>
                You do not need a local server just to connect to Supabase,
                Neon, Railway, Render, RDS, or another hosted PostgreSQL
                database. Copy the provider&apos;s PostgreSQL connection string
                into PostgresGUI.
              </p>
              <p>
                Keep Postgres.app only if you also want a local database for
                development or testing.
              </p>

              <h2>Which one should you download?</h2>
              <ul>
                <li>
                  Download <strong>Postgres.app</strong> when you need to run
                  PostgreSQL locally.
                </li>
                <li>
                  Download <strong>PostgresGUI</strong> when you need to inspect
                  and query a PostgreSQL database.
                </li>
                <li>
                  Download both when you want a local server and a native visual
                  client.
                </li>
              </ul>

              <p>
                Need the terminal client instead? See{" "}
                <Link href="/blog/install-psql-mac">
                  how to install psql on Mac
                </Link>
                . Comparing visual clients? Read the{" "}
                <Link href="/blog/best-mac-postgresql-gui-client">
                  PostgreSQL client guide
                </Link>
                .
              </p>
            </div>

            <BlogPostFooter post={post} />
          </article>
        </div>
      </div>
    </>
  );
}
