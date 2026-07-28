import Link from "next/link";
import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("install-psql-mac");

export const metadata = getBlogPostMetadata(post.slug);

export default function InstallPsqlMacPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <article className="prose max-w-none dark:prose-invert">
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-display md:text-5xl">
                Install psql on Mac
              </h1>
              <p className="text-lg text-muted-foreground">
                Ghazi · Updated July 28, 2026
              </p>
            </header>

            <div className="space-y-6">
              <p>
                The shortest route is Homebrew: install <code>libpq</code>, add
                its binary directory to your <code>PATH</code>, and check the
                version. Use Postgres.app instead when you also want a local
                PostgreSQL server.
              </p>

              <pre>
                <code>{`brew install libpq
echo 'export PATH="$(brew --prefix libpq)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
psql --version`}</code>
              </pre>

              <h2>Choose an installation method</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Installs</th>
                      <th>Use it when</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Homebrew libpq</td>
                      <td>Client tools, including psql</td>
                      <td>Your database runs elsewhere</td>
                    </tr>
                    <tr>
                      <td>Postgres.app</td>
                      <td>Local server and client tools</td>
                      <td>You want PostgreSQL running locally</td>
                    </tr>
                    <tr>
                      <td>PostgreSQL installer</td>
                      <td>Server, pgAdmin, and command-line tools</td>
                      <td>You want the full packaged installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Option 1: Homebrew libpq</h2>
              <p>
                Homebrew&apos;s <code>libpq</code> formula installs the
                PostgreSQL client library and command-line tools without setting
                up a PostgreSQL server service.
              </p>
              <pre>
                <code>{`brew install libpq`}</code>
              </pre>
              <p>
                The formula is keg-only, so its binaries may not be on your
                shell path. Add the directory to zsh:
              </p>
              <pre>
                <code>{`echo 'export PATH="$(brew --prefix libpq)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc`}</code>
              </pre>
              <p>Confirm the command your shell will run:</p>
              <pre>
                <code>{`which psql
psql --version`}</code>
              </pre>

              <h2>Option 2: Postgres.app</h2>
              <p>
                Postgres.app runs a local PostgreSQL server and includes{" "}
                <code>psql</code>. Move the app to Applications, initialize a
                server, then add its command-line tools to macOS&apos;s system
                path:
              </p>
              <pre>
                <code>{`sudo mkdir -p /etc/paths.d
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`}</code>
              </pre>
              <p>
                Open a new Terminal window and run <code>psql --version</code>.
                The command above follows Postgres.app&apos;s current
                installation documentation.
              </p>

              <h2>Option 3: PostgreSQL installer</h2>
              <p>
                PostgreSQL.org links to a macOS installer distributed by EDB.
                It includes the server, pgAdmin, Stack Builder, and command-line
                tools. This is the largest option, but it keeps the server and
                administration tooling in one installer.
              </p>

              <h2>Connect with psql</h2>
              <p>Use a PostgreSQL connection string:</p>
              <pre>
                <code>{`psql "postgresql://user:password@localhost:5432/database"`}</code>
              </pre>
              <p>Or pass the connection fields separately:</p>
              <pre>
                <code>{`psql -h localhost -p 5432 -U user -d database`}</code>
              </pre>
              <p>
                Cloud providers often require SSL. Use the exact connection
                string supplied by the provider rather than rebuilding it from
                memory.
              </p>

              <h2>Fix common Mac errors</h2>
              <h3>
                <code>zsh: command not found: psql</code>
              </h3>
              <p>
                Check <code>brew --prefix libpq</code> and{" "}
                <code>echo $PATH</code>. If you just changed{" "}
                <code>~/.zshrc</code>, run <code>source ~/.zshrc</code> or open
                a new Terminal window.
              </p>

              <h3>
                <code>connection refused</code>
              </h3>
              <p>
                psql is installed, but no server answered at the host and port.
                Start the local server, publish the Docker port, or check the
                cloud connection settings.
              </p>

              <h3>
                <code>password authentication failed</code>
              </h3>
              <p>
                The server answered, but rejected the credentials. Check the
                user, password, database name, and provider SSL requirements.
              </p>

              <h2>Useful commands after installation</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Command</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>\l</code>
                      </td>
                      <td>List databases</td>
                    </tr>
                    <tr>
                      <td>
                        <code>\c database_name</code>
                      </td>
                      <td>Connect to another database</td>
                    </tr>
                    <tr>
                      <td>
                        <code>\dt</code>
                      </td>
                      <td>List tables</td>
                    </tr>
                    <tr>
                      <td>
                        <code>\d table_name</code>
                      </td>
                      <td>Describe a table</td>
                    </tr>
                    <tr>
                      <td>
                        <code>\q</code>
                      </td>
                      <td>Quit psql</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>When a GUI is easier</h2>
              <p>
                Keep psql for scripts, SSH sessions, and repeatable commands.
                Use a GUI when you need to scan a wide result, browse tables,
                edit one row, inspect JSON, or keep several queries open.
              </p>
              <p>
                See the <Link href="/psql-gui">psql GUI guide</Link> or read the
                full{" "}
                <Link href="/blog/psql-vs-postgresql-gui">
                  psql and PostgreSQL GUI comparison
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
