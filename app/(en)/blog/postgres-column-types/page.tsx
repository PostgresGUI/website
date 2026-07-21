import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("postgres-column-types");

export const metadata = getBlogPostMetadata(post.slug);

export default function PostgresColumnTypesPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <div className="flex-1 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <article className="prose dark:prose-invert max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display mb-4">
                Postgres Column Types: A Practical Guide
              </h1>
              <p className="text-muted-foreground text-lg">Ghazi</p>
            </header>

            <div className="space-y-6">
              <p>
                Postgres column types shape how your database stores, validates,
                indexes, and returns data. Choosing well at the start makes your
                schema easier to query and harder to misuse.
              </p>

              <h2>Text columns</h2>
              <p>
                Use <code>text</code> for most strings. Use{" "}
                <code>varchar(n)</code> when the length limit is a real business
                rule, not just a habit copied from another database.
              </p>

              <h2>Integer and numeric columns</h2>
              <ul>
                <li>
                  <code>integer</code>: good default for ordinary whole numbers.
                </li>
                <li>
                  <code>bigint</code>: use for large counters, identifiers, or
                  values that may grow beyond integer range.
                </li>
                <li>
                  <code>numeric</code>: use for money-like values when exact
                  decimal precision matters.
                </li>
              </ul>

              <h2>Dates and timestamps</h2>
              <p>
                Use <code>date</code> when you only need a calendar day. Use{" "}
                <code>timestamptz</code> for real moments in time, such as
                created-at and updated-at values. Avoid plain{" "}
                <code>timestamp</code> unless you intentionally do not want time
                zone handling.
              </p>

              <h2>UUIDs and identity columns</h2>
              <p>
                <code>uuid</code> works well for public identifiers and
                distributed systems. For simple internal primary keys, generated
                identity columns are usually cleaner than older{" "}
                <code>serial</code> patterns.
              </p>

              <h2>JSONB</h2>
              <p>
                Use <code>jsonb</code> for flexible structured data that does
                not deserve its own relational tables yet. Keep core fields as
                normal columns when you filter, join, validate, or index them
                regularly.
              </p>

              <h2>Enums, checks, and lookup tables</h2>
              <p>
                Postgres gives you several ways to model a small set of allowed
                values. Use an enum when the list is stable and belongs in the
                database type system. Use a <code>CHECK</code> constraint when
                you want a lightweight rule on a text column. Use a lookup table
                when the values need labels, ordering, permissions, or frequent
                edits.
              </p>

              <pre><code>{`create table orders (
  id generated always as identity primary key,
  status text not null check (status in ('draft', 'paid', 'shipped')),
  total numeric(12, 2) not null,
  created_at timestamptz not null default now()
);`}</code></pre>

              <h2>Arrays and booleans</h2>
              <p>
                Arrays are useful for small lists attached to one row, but a
                join table is better when the list needs relationships or rich
                querying. Booleans are best for clear true/false states; avoid
                turning multi-state workflows into several boolean columns.
              </p>

              <h2>Quick decision table</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Need</th>
                      <th>Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Long text or names</td>
                      <td><code>text</code></td>
                    </tr>
                    <tr>
                      <td>Exact money/decimal values</td>
                      <td><code>numeric</code></td>
                    </tr>
                    <tr>
                      <td>Created/updated time</td>
                      <td><code>timestamptz</code></td>
                    </tr>
                    <tr>
                      <td>Public identifier</td>
                      <td><code>uuid</code></td>
                    </tr>
                    <tr>
                      <td>Flexible metadata</td>
                      <td><code>jsonb</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Rules of thumb</h2>
              <ul>
                <li>Prefer <code>text</code> until a length limit is a real product rule.</li>
                <li>Use <code>timestamptz</code> for events that happened at a specific moment.</li>
                <li>Use <code>numeric</code> for exact decimal math and <code>double precision</code> for approximate scientific values.</li>
                <li>Keep frequently queried JSON fields as normal typed columns.</li>
                <li>Prefer generated identity columns over older <code>serial</code> defaults for new schemas.</li>
              </ul>
            </div>

            <BlogPostFooter post={post} />
          </article>
        </div>
      </div>
    </>
  );
}
