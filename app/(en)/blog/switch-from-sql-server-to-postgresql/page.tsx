import type { Metadata } from "next";

const date = "2026-02-04";

export const metadata: Metadata = {
  title:
    "How to Switch from SQL Server to PostgreSQL",
  description:
    "A practical guide to migrating from Microsoft SQL Server to PostgreSQL. Covers key differences, syntax changes, data type mapping, migration tools, and common pitfalls.",
  keywords: [
    "SQL Server to PostgreSQL",
    "migrate SQL Server to Postgres",
    "SQL Server vs PostgreSQL",
    "SQL Server migration",
    "PostgreSQL migration guide",
    "switch from MSSQL to PostgreSQL",
    "T-SQL to PostgreSQL",
    "database migration",
    "PostgreSQL for SQL Server users",
    "SQL Server alternative",
  ],
  openGraph: {
    title:
      "How to Switch from SQL Server to PostgreSQL",
    description:
      "A practical guide to migrating from Microsoft SQL Server to PostgreSQL. Covers key differences, syntax changes, data type mapping, migration tools, and common pitfalls.",
    type: "article",
    publishedTime: `${date}T00:00:00Z`,
    url: "https://postgresgui.com/blog/switch-from-sql-server-to-postgresql",
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
    title:
      "How to Switch from SQL Server to PostgreSQL",
    description:
      "A practical guide to migrating from Microsoft SQL Server to PostgreSQL. Covers key differences, syntax changes, data type mapping, migration tools, and common pitfalls.",
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

export default function SwitchFromSqlServerToPostgreSQLPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              How to Switch from SQL Server to PostgreSQL
            </h1>
            <p className="text-muted-foreground text-lg">February 4, 2026 · Ghazi</p>
          </header>

          <div className="space-y-6">
            <p>
              This guide covers what you need to know to make the switch —
              from the practical differences between the two databases to the
              tools that make migration easier.
            </p>

            <h2>Why Teams Switch</h2>

            <p>
              SQL Server is a solid database, but it comes with trade-offs
              that push teams toward PostgreSQL:
            </p>

            <ul>
              <li>
                <strong>Licensing costs:</strong> SQL Server Enterprise can
                cost tens of thousands of dollars per core. PostgreSQL is free
                and open source under the PostgreSQL License.
              </li>
              <li>
                <strong>Platform flexibility:</strong> While SQL Server now
                runs on Linux, its tooling and ecosystem still lean heavily
                toward Windows. PostgreSQL runs natively on Linux, macOS, and
                Windows with equal support.
              </li>
              <li>
                <strong>Cloud portability:</strong> PostgreSQL is available on
                every major cloud provider as a managed service. You&apos;re
                not locked into Azure or a specific vendor&apos;s pricing.
              </li>
              <li>
                <strong>Extension ecosystem:</strong> PostgreSQL extensions
                like PostGIS, pgvector, TimescaleDB, and pg_trgm add
                capabilities that would require separate products or expensive
                add-ons in the SQL Server world.
              </li>
              <li>
                <strong>Community and pace of development:</strong> PostgreSQL
                ships major releases annually with substantial new features.
                The community is active, transparent, and not controlled by a
                single company.
              </li>
            </ul>

            <h2>Key Differences to Know</h2>

            <p>
              SQL Server and PostgreSQL are both relational databases, but
              they differ in meaningful ways. Understanding these differences
              upfront prevents surprises during migration.
            </p>

            <h3>Schemas and Databases</h3>

            <p>
              In SQL Server, a single instance can hold multiple databases,
              and cross-database queries are common. PostgreSQL also supports
              multiple databases per instance, but cross-database queries are
              not natively supported. The PostgreSQL equivalent of SQL
              Server&apos;s multi-database pattern is to use schemas within a
              single database. If your application queries across SQL Server
              databases, plan to consolidate into schemas.
            </p>

            <h3>Identity Columns and Sequences</h3>

            <p>
              SQL Server uses the <code>IDENTITY</code> property for
              auto-incrementing columns. PostgreSQL offers two approaches:
              the <code>SERIAL</code> pseudo-type (which creates a sequence
              behind the scenes) and the SQL-standard{" "}
              <code>GENERATED ALWAYS AS IDENTITY</code> syntax, which is
              preferred for new projects.
            </p>

            <pre>
              <code>{`-- SQL Server
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100)
);

-- PostgreSQL
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100)
);`}</code>
            </pre>

            <h3>String Types</h3>

            <p>
              SQL Server has <code>VARCHAR</code>, <code>NVARCHAR</code>,{" "}
              <code>CHAR</code>, and <code>NCHAR</code>. The{" "}
              <code>N</code>-prefixed types store Unicode. In PostgreSQL, all
              text types (<code>TEXT</code>, <code>VARCHAR</code>,{" "}
              <code>CHAR</code>) are Unicode by default. There is no need for
              a separate <code>NVARCHAR</code> equivalent.
              Use <code>TEXT</code> or <code>VARCHAR</code> — in PostgreSQL,
              they perform identically.
            </p>

            <h3>Date and Time</h3>

            <p>
              SQL Server&apos;s <code>DATETIME</code> maps
              to <code>TIMESTAMP</code> in PostgreSQL.{" "}
              <code>DATETIME2</code> also maps to <code>TIMESTAMP</code>.
              For time zone awareness, use{" "}
              <code>TIMESTAMPTZ</code> (short
              for <code>TIMESTAMP WITH TIME ZONE</code>), which is generally
              recommended as the default for any column storing points in
              time. SQL Server&apos;s <code>DATETIMEOFFSET</code> is the
              closest equivalent.
            </p>

            <h3>Boolean Type</h3>

            <p>
              SQL Server uses <code>BIT</code> for boolean values. PostgreSQL
              has a native <code>BOOLEAN</code> type that
              accepts <code>TRUE</code>, <code>FALSE</code>,
              and <code>NULL</code>.
            </p>

            <h2>T-SQL vs. PL/pgSQL</h2>

            <p>
              This is often the biggest part of a migration. SQL Server uses
              T-SQL (Transact-SQL), while PostgreSQL uses PL/pgSQL for stored
              procedures and functions. The languages are similar in concept
              but differ in syntax.
            </p>

            <h3>Variables and Assignment</h3>

            <pre>
              <code>{`-- T-SQL
DECLARE @count INT;
SET @count = 10;

-- PL/pgSQL
DECLARE
    count INT;
BEGIN
    count := 10;
END;`}</code>
            </pre>

            <h3>String Concatenation</h3>

            <p>
              T-SQL uses the <code>+</code> operator for string
              concatenation. PostgreSQL uses <code>||</code>.
            </p>

            <pre>
              <code>{`-- T-SQL
SELECT first_name + ' ' + last_name AS full_name FROM users;

-- PostgreSQL
SELECT first_name || ' ' || last_name AS full_name FROM users;`}</code>
            </pre>

            <h3>Top N Rows</h3>

            <pre>
              <code>{`-- T-SQL
SELECT TOP 10 * FROM orders ORDER BY created_at DESC;

-- PostgreSQL
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;`}</code>
            </pre>

            <h3>Conditional Logic</h3>

            <p>
              T-SQL&apos;s <code>ISNULL()</code> becomes{" "}
              <code>COALESCE()</code> in PostgreSQL (which is also
              SQL-standard and works in SQL Server too).{" "}
              <code>GETDATE()</code> becomes <code>NOW()</code> or{" "}
              <code>CURRENT_TIMESTAMP</code>.
            </p>

            <h3>Stored Procedures</h3>

            <p>
              PostgreSQL added <code>CREATE PROCEDURE</code> support in
              version 11. Before that, everything was a function. If your SQL
              Server codebase relies heavily on stored procedures, they will
              need to be rewritten in PL/pgSQL. The logic is usually
              transferable, but the syntax requires careful translation.
            </p>

            <h2>Data Type Mapping Reference</h2>

            <p>
              Here is a quick reference for the most common data type
              conversions:
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>SQL Server</th>
                    <th>PostgreSQL</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>INT</code></td>
                    <td><code>INT</code></td>
                    <td>Same</td>
                  </tr>
                  <tr>
                    <td><code>BIGINT</code></td>
                    <td><code>BIGINT</code></td>
                    <td>Same</td>
                  </tr>
                  <tr>
                    <td><code>SMALLINT</code></td>
                    <td><code>SMALLINT</code></td>
                    <td>Same</td>
                  </tr>
                  <tr>
                    <td><code>TINYINT</code></td>
                    <td><code>SMALLINT</code></td>
                    <td>No unsigned byte type in Postgres</td>
                  </tr>
                  <tr>
                    <td><code>BIT</code></td>
                    <td><code>BOOLEAN</code></td>
                    <td>Use TRUE/FALSE instead of 1/0</td>
                  </tr>
                  <tr>
                    <td><code>NVARCHAR(n)</code></td>
                    <td><code>VARCHAR(n)</code> or <code>TEXT</code></td>
                    <td>All Postgres text is Unicode</td>
                  </tr>
                  <tr>
                    <td><code>NTEXT</code></td>
                    <td><code>TEXT</code></td>
                    <td>NTEXT is deprecated in SQL Server too</td>
                  </tr>
                  <tr>
                    <td><code>DATETIME</code> / <code>DATETIME2</code></td>
                    <td><code>TIMESTAMP</code></td>
                    <td>Use TIMESTAMPTZ for time zone support</td>
                  </tr>
                  <tr>
                    <td><code>DATETIMEOFFSET</code></td>
                    <td><code>TIMESTAMPTZ</code></td>
                    <td>Both store time zone info</td>
                  </tr>
                  <tr>
                    <td><code>UNIQUEIDENTIFIER</code></td>
                    <td><code>UUID</code></td>
                    <td>Use gen_random_uuid() for defaults</td>
                  </tr>
                  <tr>
                    <td><code>VARBINARY(MAX)</code></td>
                    <td><code>BYTEA</code></td>
                    <td>Binary data storage</td>
                  </tr>
                  <tr>
                    <td><code>MONEY</code></td>
                    <td><code>NUMERIC(19,4)</code></td>
                    <td>Postgres has MONEY but NUMERIC is preferred</td>
                  </tr>
                  <tr>
                    <td><code>XML</code></td>
                    <td><code>XML</code></td>
                    <td>Same, though JSONB is often a better fit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Migration Tools</h2>

            <p>
              You don&apos;t have to do everything by hand. Several tools can
              automate large parts of the migration.
            </p>

            <h3>pgLoader</h3>

            <p>
              pgLoader is an open-source tool that can migrate data directly
              from SQL Server to PostgreSQL. It handles schema conversion,
              data type mapping, and data loading in a single step. It
              supports continuous migration for large datasets and can cast
              data types automatically.
            </p>

            <h3>AWS Database Migration Service (DMS)</h3>

            <p>
              If you&apos;re moving to a cloud-hosted PostgreSQL, AWS DMS can
              handle ongoing replication from SQL Server to PostgreSQL. This
              is useful for zero-downtime migrations where you run both
              databases in parallel during the transition.
            </p>

            <h3>ora2pg</h3>

            <p>
              While primarily designed for Oracle migrations, ora2pg also
              supports SQL Server as a source. It can export schemas, data,
              and even attempt to convert stored procedures.
            </p>

            <h3>Manual Migration with pg_dump and Scripts</h3>

            <p>
              For smaller databases, exporting SQL Server data as CSV or
              using <code>bcp</code> and then importing
              with <code>COPY</code> or <code>\\copy</code> in PostgreSQL is
              a straightforward approach. You write the PostgreSQL schema by
              hand and load the data in.
            </p>

            <h2>Common Pitfalls</h2>

            <p>
              These are the issues that catch most teams during migration:
            </p>

            <ul>
              <li>
                <strong>Case sensitivity:</strong> SQL Server identifiers are
                case-insensitive by default. PostgreSQL folds unquoted
                identifiers to lowercase. If your SQL Server schema
                uses <code>UserName</code>, PostgreSQL will treat
                it as <code>username</code> unless you double-quote it. The
                simplest approach is to use lowercase names everywhere.
              </li>
              <li>
                <strong>Empty strings vs. NULL:</strong> SQL Server treats
                empty strings and NULL as distinct values (as it should).
                PostgreSQL does too, but if your application logic assumes
                otherwise, verify your data handling.
              </li>
              <li>
                <strong>Transaction behavior:</strong> In SQL Server, DDL
                statements (like <code>CREATE TABLE</code>) can be wrapped in
                transactions and rolled back. PostgreSQL supports transactional
                DDL as well, which is actually an advantage — but the behavior
                of implicit transactions differs. PostgreSQL auto-commits each
                statement unless you explicitly <code>BEGIN</code> a
                transaction.
              </li>
              <li>
                <strong>Temp tables:</strong> SQL Server uses{" "}
                <code>#temp_table</code> syntax. PostgreSQL
                uses <code>CREATE TEMP TABLE</code>. Temp tables in
                PostgreSQL are dropped at the end of the session by default.
              </li>
              <li>
                <strong>Error handling:</strong> T-SQL&apos;s{" "}
                <code>TRY...CATCH</code> becomes{" "}
                <code>BEGIN...EXCEPTION...END</code> in PL/pgSQL. The
                patterns are similar but the syntax is different.
              </li>
              <li>
                <strong>Pagination:</strong> If your app
                uses <code>OFFSET...FETCH</code> from SQL Server 2012+, the
                PostgreSQL equivalent
                is <code>LIMIT...OFFSET</code>, which is simpler and has been
                available since the beginning.
              </li>
            </ul>

            <h2>Testing Your Migration</h2>

            <p>
              A migration is only as good as its testing. Before cutting over:
            </p>

            <ul>
              <li>
                Run your application&apos;s test suite against the PostgreSQL
                database. Fix any SQL that doesn&apos;t translate.
              </li>
              <li>
                Compare row counts and checksums between source and target
                for every table.
              </li>
              <li>
                Test stored procedures and functions individually with known
                inputs and expected outputs.
              </li>
              <li>
                Benchmark query performance. PostgreSQL&apos;s query planner
                is different from SQL Server&apos;s, and some queries may need
                new indexes or restructuring.
              </li>
              <li>
                Run the application in a staging environment connected to the
                new PostgreSQL database for a full integration test.
              </li>
            </ul>

            <h2>After the Switch</h2>

            <p>
              Once you&apos;re on PostgreSQL, you gain access to a rich
              ecosystem of tools, extensions, and managed hosting options.
              Extensions like pgvector for AI embeddings, PostGIS for
              geospatial data, and pg_stat_statements for query performance
              analysis are all available at no additional cost.
            </p>

            <p>
              You&apos;ll also want a good database client to work with your
              new PostgreSQL setup. PostgresGUI is a lightweight, native
              macOS client built specifically for PostgreSQL. It connects to
              any PostgreSQL instance — local, cloud-hosted, or running in
              Docker — and gives you a fast, focused interface for browsing
              tables, running queries, and managing your data.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
