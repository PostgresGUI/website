import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("install-psql-mac");

export const metadata = getBlogPostMetadata(post.slug);

export default function InstallPsqlMacPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <article className="prose dark:prose-invert max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display mb-4">
                How to Install psql on Mac
              </h1>
              <p className="text-muted-foreground text-lg">Ghazi</p>
            </header>

            <div className="space-y-6">
              <p>
                If you are searching for <strong>install psql mac</strong> or{" "}
                <strong>psql install mac</strong>, you probably want the
                PostgreSQL command-line client without spending the afternoon
                figuring out which installer also includes a server, service, or
                GUI.
              </p>

              <p>
                <code>psql</code> is the official PostgreSQL terminal client. It
                lets you connect to a database, run SQL, inspect schemas, import
                data, and script database work. On macOS, the three common paths
                are Homebrew, Postgres.app, and the official PostgreSQL
                installer.
              </p>

              <h2>Option 1: Install psql with Homebrew</h2>
              <p>
                If you already use Homebrew, this is usually the fastest path.
                Install PostgreSQL client tools from the terminal:
              </p>

              <pre><code>{`brew install libpq
brew link --force libpq`}</code></pre>

              <p>
                Then confirm that <code>psql</code> is available:
              </p>

              <pre><code>{`psql --version`}</code></pre>

              <p>
                This is a good choice when you only need the client utilities
                and will connect to a PostgreSQL database running somewhere
                else, such as Docker, Neon, Supabase, RDS, Railway, or a remote
                server.
              </p>

              <h2>Option 2: Install Postgres.app</h2>
              <p>
                Postgres.app is a Mac-native PostgreSQL distribution. It gives
                you a local PostgreSQL server and includes command-line tools
                like <code>psql</code>. After installing it, add its binaries to
                your shell path so the terminal can find them.
              </p>

              <pre><code>{`export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"`}</code></pre>

              <p>
                Add that line to your shell profile if you want it to persist.
                For zsh, that is usually <code>~/.zshrc</code>.
              </p>

              <h2>Option 3: Use the PostgreSQL installer</h2>
              <p>
                The official PostgreSQL installer for macOS includes the server,
                pgAdmin, Stack Builder, and command-line tools. This is useful
                if you want the full packaged distribution and do not mind a
                heavier install.
              </p>

              <h2>How to connect with psql</h2>
              <p>
                Once installed, connect with a connection string:
              </p>

              <pre><code>{`psql "postgresql://user:password@localhost:5432/database"`}</code></pre>

              <p>
                Or connect with flags:
              </p>

              <pre><code>{`psql -h localhost -p 5432 -U user -d database`}</code></pre>

              <h2>Common psql install errors on Mac</h2>
              <h3>zsh: command not found: psql</h3>
              <p>
                This usually means <code>psql</code> is installed but not on
                your <code>PATH</code>, or it was not installed at all. Run{" "}
                <code>which psql</code> first. If Homebrew installed{" "}
                <code>libpq</code>, make sure the Homebrew binary directory is
                linked or added to your shell profile.
              </p>

              <h3>psql: could not connect to server</h3>
              <p>
                This is not an install problem. It means the client is working
                but cannot reach a PostgreSQL server at the host, port, user, or
                database you provided. Check whether your local server is
                running, whether Docker exposed port <code>5432</code>, or
                whether your cloud provider requires SSL.
              </p>

              <h3>Password authentication failed</h3>
              <p>
                The connection reached Postgres, but the username, password, or
                database permissions are wrong. Copy the connection string from
                your provider again, then test the same credentials in a GUI so
                you can separate credential issues from terminal syntax.
              </p>

              <h2>Useful psql commands after installation</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Command</th>
                      <th>What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>\l</code></td>
                      <td>List databases</td>
                    </tr>
                    <tr>
                      <td><code>\c database_name</code></td>
                      <td>Connect to another database</td>
                    </tr>
                    <tr>
                      <td><code>\dt</code></td>
                      <td>List tables in the current schema</td>
                    </tr>
                    <tr>
                      <td><code>\d table_name</code></td>
                      <td>Describe columns, indexes, and constraints</td>
                    </tr>
                    <tr>
                      <td><code>\q</code></td>
                      <td>Quit psql</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>When to add a GUI</h2>
              <p>
                <code>psql</code> is excellent for quick terminal work,
                scripting, and debugging. A GUI helps when you want to browse
                tables, inspect query results visually, edit rows, sort/filter
                data, or keep saved queries organized.
              </p>

              <p>
                PostgresGUI pairs well with <code>psql</code>: keep the terminal
                for automation and use a native Mac Postgres client when you
                want a cleaner view of your database.
              </p>
            </div>

            <BlogPostFooter post={post} />
          </article>
        </div>
      </div>
    </>
  );
}
