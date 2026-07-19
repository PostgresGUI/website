import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("database-schema-design-online");

export const metadata = getBlogPostMetadata(post.slug);

export default function DatabaseSchemaDesignOnlinePage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <article className="prose dark:prose-invert max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display mb-4">
                Database Schema Design Online: How to Plan Tables Before You Build
              </h1>
              <p className="text-muted-foreground text-lg">Ghazi</p>
            </header>

            <div className="space-y-6">
              <p>
                Online database schema design is useful before you write
                migrations, ship a feature, or let your application code harden
                around a messy data model. A schema designer helps you think in
                tables, columns, keys, and relationships first.
              </p>

              <h2>Start with entities</h2>
              <p>
                List the real things your product stores: users, teams,
                projects, invoices, posts, subscriptions, events, or anything
                else your application treats as a durable object.
              </p>

              <h2>Choose primary keys</h2>
              <p>
                Most PostgreSQL apps use generated identity columns or UUIDs.
                Use identity columns for simple internal tables. Use UUIDs when
                identifiers need to be public, generated across systems, or hard
                to guess.
              </p>

              <h2>Model relationships</h2>
              <ul>
                <li>
                  One-to-many relationships usually become a foreign key on the
                  child table.
                </li>
                <li>
                  Many-to-many relationships usually need a join table.
                </li>
                <li>
                  Optional relationships should be intentional, not accidental
                  nullable columns everywhere.
                </li>
              </ul>

              <h2>Pick Postgres column types</h2>
              <p>
                Use clear column types while designing: <code>text</code> for
                strings, <code>timestamptz</code> for real moments in time,{" "}
                <code>numeric</code> for exact decimals, <code>jsonb</code> for
                flexible metadata, and <code>uuid</code> for public IDs.
              </p>

              <h2>Add constraints early</h2>
              <p>
                Constraints document your assumptions where they matter most:
                inside the database. Add <code>NOT NULL</code>, unique
                constraints, foreign keys, and checks before application code
                grows around invalid states.
              </p>

              <h2>Generate SQL</h2>
              <p>
                A good online database schema designer should let you export SQL
                so the diagram can become an actual migration. PostgresGUI&apos;s
                schema designer lets you model tables and generate SQL directly
                in the browser.
              </p>
            </div>

            <BlogPostFooter post={post} />
          </article>
        </div>
      </div>
    </>
  );
}
