import type { Metadata } from "next";

const date = "2026-02-04";

export const metadata: Metadata = {
  title:
    "How to Migrate from MySQL to PostgreSQL: A Practical Guide - PostgresGUI Blog",
  description:
    "Step-by-step guide to migrating your database from MySQL to PostgreSQL. Covers schema conversion, data type mapping, SQL syntax differences, and the best migration tools.",
  keywords: [
    "MySQL to PostgreSQL",
    "migrate MySQL to Postgres",
    "MySQL migration",
    "PostgreSQL migration",
    "database migration",
    "pgloader",
    "schema conversion",
    "MySQL vs PostgreSQL",
    "switch to PostgreSQL",
    "data migration",
  ],
  openGraph: {
    title:
      "How to Migrate from MySQL to PostgreSQL: A Practical Guide - PostgresGUI Blog",
    description:
      "Step-by-step guide to migrating your database from MySQL to PostgreSQL. Covers schema conversion, data type mapping, SQL syntax differences, and the best migration tools.",
    type: "article",
    publishedTime: "2026-02-04T00:00:00Z",
    url: "https://postgresgui.com/blog/migrate-mysql-to-postgresql",
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
      "How to Migrate from MySQL to PostgreSQL: A Practical Guide - PostgresGUI Blog",
    description:
      "Step-by-step guide to migrating your database from MySQL to PostgreSQL. Covers schema conversion, data type mapping, SQL syntax differences, and the best migration tools.",
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

export default function MigrateMySQLToPostgreSQLPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              How to Migrate from MySQL to PostgreSQL
            </h1>
            <p className="text-muted-foreground text-lg">February 4, 2026</p>
          </header>

          <div className="space-y-6">
            <p>
              This guide walks through the key differences you&apos;ll
              encounter, how to map data types, convert your schema and queries,
              and which tools can automate most of the heavy lifting.
            </p>

            <h2>Why Migrate to PostgreSQL?</h2>

            <p>
              Before diving into the how, it helps to understand why so many
              teams are making this move:
            </p>

            <ul>
              <li>
                <strong>Standards compliance:</strong> PostgreSQL follows the SQL
                standard more closely than MySQL, which means fewer surprises and
                more portable SQL.
              </li>
              <li>
                <strong>Advanced data types:</strong> Native support for JSON,
                arrays, hstore, ranges, and custom types gives you more modeling
                flexibility.
              </li>
              <li>
                <strong>Extensibility:</strong> Extensions like PostGIS
                (geospatial), pg_trgm (fuzzy search), and TimescaleDB (time
                series) let you extend Postgres for specialized workloads.
              </li>
              <li>
                <strong>Concurrency:</strong> PostgreSQL uses MVCC (Multi-Version
                Concurrency Control) for all storage engines, giving you
                consistent read performance under write-heavy workloads.
              </li>
              <li>
                <strong>Ecosystem growth:</strong> Tools like Neon, Supabase, and
                a wide range of managed cloud providers have made PostgreSQL the
                default choice for new projects.
              </li>
            </ul>

            <h2>Step 1: Audit Your MySQL Database</h2>

            <p>
              Start by understanding what you&apos;re working with. Run a few
              queries to inventory your schema:
            </p>

            <pre>
              <code>{`-- List all tables and their engines
SELECT table_name, engine, table_rows
FROM information_schema.tables
WHERE table_schema = 'your_database';

-- Check column types you'll need to map
SELECT table_name, column_name, data_type, column_type
FROM information_schema.columns
WHERE table_schema = 'your_database'
ORDER BY table_name, ordinal_position;`}</code>
            </pre>

            <p>
              Pay attention to MySQL-specific features you rely on: storage
              engines (InnoDB vs MyISAM), auto_increment columns, enum types,
              and any use of MySQL-specific SQL syntax.
            </p>

            <h2>Step 2: Map Data Types</h2>

            <p>
              Most MySQL types have direct PostgreSQL equivalents, but some
              require attention. Here are the key mappings:
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>MySQL Type</th>
                    <th>PostgreSQL Type</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>INT AUTO_INCREMENT</code>
                    </td>
                    <td>
                      <code>SERIAL</code> or <code>INT GENERATED ALWAYS AS IDENTITY</code>
                    </td>
                    <td>IDENTITY is the modern approach</td>
                  </tr>
                  <tr>
                    <td>
                      <code>BIGINT AUTO_INCREMENT</code>
                    </td>
                    <td>
                      <code>BIGSERIAL</code> or <code>BIGINT GENERATED ALWAYS AS IDENTITY</code>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <code>TINYINT(1)</code>
                    </td>
                    <td>
                      <code>BOOLEAN</code>
                    </td>
                    <td>MySQL uses TINYINT(1) as boolean</td>
                  </tr>
                  <tr>
                    <td>
                      <code>TINYINT</code>
                    </td>
                    <td>
                      <code>SMALLINT</code>
                    </td>
                    <td>No TINYINT in Postgres</td>
                  </tr>
                  <tr>
                    <td>
                      <code>DOUBLE</code>
                    </td>
                    <td>
                      <code>DOUBLE PRECISION</code>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <code>FLOAT</code>
                    </td>
                    <td>
                      <code>REAL</code>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <code>DATETIME</code>
                    </td>
                    <td>
                      <code>TIMESTAMP</code>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <code>BLOB / LONGBLOB</code>
                    </td>
                    <td>
                      <code>BYTEA</code>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <code>TEXT / LONGTEXT</code>
                    </td>
                    <td>
                      <code>TEXT</code>
                    </td>
                    <td>Postgres TEXT has no length limit</td>
                  </tr>
                  <tr>
                    <td>
                      <code>ENUM(&apos;a&apos;, &apos;b&apos;)</code>
                    </td>
                    <td>Custom <code>ENUM</code> type or <code>CHECK</code> constraint</td>
                    <td>Postgres enums are standalone types</td>
                  </tr>
                  <tr>
                    <td>
                      <code>SET</code>
                    </td>
                    <td>
                      <code>TEXT[]</code> or junction table
                    </td>
                    <td>No SET type in Postgres</td>
                  </tr>
                  <tr>
                    <td>
                      <code>JSON</code>
                    </td>
                    <td>
                      <code>JSONB</code>
                    </td>
                    <td>JSONB is faster for queries</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Step 3: Convert Your Schema</h2>

            <p>
              Beyond data types, several DDL patterns differ between MySQL and
              PostgreSQL. Here are the most common changes:
            </p>

            <h3>Auto-increment Columns</h3>

            <p>MySQL:</p>
            <pre>
              <code>{`CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  PRIMARY KEY (id)
);`}</code>
            </pre>

            <p>PostgreSQL:</p>
            <pre>
              <code>{`CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100)
);`}</code>
            </pre>

            <h3>Enum Types</h3>

            <p>
              MySQL defines enums inline in the column definition. PostgreSQL
              requires you to create the enum type first:
            </p>

            <p>MySQL:</p>
            <pre>
              <code>{`CREATE TABLE orders (
  status ENUM('pending', 'shipped', 'delivered') DEFAULT 'pending'
);`}</code>
            </pre>

            <p>PostgreSQL:</p>
            <pre>
              <code>{`CREATE TYPE order_status AS ENUM ('pending', 'shipped', 'delivered');

CREATE TABLE orders (
  status order_status DEFAULT 'pending'
);`}</code>
            </pre>

            <h3>String Quoting</h3>

            <p>
              MySQL uses backticks for identifier quoting. PostgreSQL uses double
              quotes. In practice, the best approach is to avoid quoting
              altogether by using lowercase, snake_case identifiers.
            </p>

            <pre>
              <code>{`-- MySQL
SELECT \`user\`.\`first-name\` FROM \`user\`;

-- PostgreSQL
SELECT "user"."first-name" FROM "user";

-- Better: avoid reserved words and special characters
SELECT first_name FROM users;`}</code>
            </pre>

            <h2>Step 4: Update Your SQL Queries</h2>

            <p>
              Most standard SQL works in both databases, but there are
              MySQL-specific patterns you&apos;ll need to update:
            </p>

            <h3>LIMIT with OFFSET</h3>
            <p>
              Both databases support <code>LIMIT ... OFFSET ...</code>, so this
              usually works as-is. However, MySQL&apos;s{" "}
              <code>LIMIT offset, count</code> shorthand is not valid in
              PostgreSQL:
            </p>

            <pre>
              <code>{`-- MySQL shorthand (not valid in PostgreSQL)
SELECT * FROM users LIMIT 10, 20;

-- Standard SQL (works in both)
SELECT * FROM users LIMIT 20 OFFSET 10;`}</code>
            </pre>

            <h3>String Concatenation</h3>
            <pre>
              <code>{`-- MySQL
SELECT CONCAT(first_name, ' ', last_name) FROM users;

-- PostgreSQL (both work)
SELECT CONCAT(first_name, ' ', last_name) FROM users;
SELECT first_name || ' ' || last_name FROM users;`}</code>
            </pre>

            <h3>Date Functions</h3>
            <pre>
              <code>{`-- MySQL
SELECT NOW(), CURDATE(), DATE_FORMAT(created_at, '%Y-%m-%d');

-- PostgreSQL
SELECT NOW(), CURRENT_DATE, TO_CHAR(created_at, 'YYYY-MM-DD');`}</code>
            </pre>

            <h3>IFNULL vs COALESCE</h3>
            <pre>
              <code>{`-- MySQL
SELECT IFNULL(nickname, 'Anonymous') FROM users;

-- PostgreSQL (COALESCE is standard SQL and works in both)
SELECT COALESCE(nickname, 'Anonymous') FROM users;`}</code>
            </pre>

            <h3>GROUP BY Behavior</h3>
            <p>
              MySQL (depending on the sql_mode) allows selecting columns not in
              the GROUP BY clause. PostgreSQL strictly enforces that every
              selected column must be in the GROUP BY or wrapped in an aggregate
              function:
            </p>

            <pre>
              <code>{`-- This may work in MySQL but will fail in PostgreSQL
SELECT user_id, name, COUNT(*)
FROM orders
GROUP BY user_id;

-- Correct for PostgreSQL
SELECT user_id, MAX(name) AS name, COUNT(*)
FROM orders
GROUP BY user_id;`}</code>
            </pre>

            <h3>UPSERT Syntax</h3>
            <pre>
              <code>{`-- MySQL
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@example.com')
ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email);

-- PostgreSQL
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@example.com')
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name, email = EXCLUDED.email;`}</code>
            </pre>

            <h2>Step 5: Choose a Migration Tool</h2>

            <p>
              You don&apos;t have to do everything by hand. Several tools can
              automate schema conversion and data transfer:
            </p>

            <h3>pgloader</h3>

            <p>
              pgloader is the most popular open-source tool for migrating to
              PostgreSQL. It reads directly from a live MySQL database and loads
              data into PostgreSQL, handling type conversions automatically.
            </p>

            <pre>
              <code>{`pgloader mysql://user:pass@mysql-host/mydb \\
         postgresql://user:pass@pg-host/mydb`}</code>
            </pre>

            <p>
              For more control, use a pgloader command file:
            </p>

            <pre>
              <code>{`LOAD DATABASE
  FROM mysql://user:pass@mysql-host/mydb
  INTO postgresql://user:pass@pg-host/mydb

WITH include drop, create tables, create indexes, reset sequences

SET maintenance_work_mem to '512MB',
    work_mem to '48MB'

CAST type tinyint to boolean using tinyint-to-boolean;`}</code>
            </pre>

            <h3>pg_dump and mysql2pgsql</h3>

            <p>
              If you prefer a two-step process, you can dump your MySQL database
              and convert the dump file. Tools like{" "}
              <code>mysql2pgsql</code> (Ruby gem) or <code>pgloader</code>{" "}
              can process MySQL dump files. However, loading directly from a
              live MySQL connection with pgloader is usually simpler and more
              reliable.
            </p>

            <h3>AWS DMS (Database Migration Service)</h3>

            <p>
              If you&apos;re on AWS, DMS can replicate data from MySQL to
              PostgreSQL with minimal downtime. It supports both full-load
              migration and ongoing change data capture (CDC) for near-zero
              downtime migrations.
            </p>

            <h2>Step 6: Validate the Migration</h2>

            <p>
              After moving your data, verify that everything transferred
              correctly:
            </p>

            <ul>
              <li>
                <strong>Row counts:</strong> Compare row counts for every table
                between MySQL and PostgreSQL.
              </li>
              <li>
                <strong>Spot checks:</strong> Query specific records and compare
                values, paying attention to dates, nulls, and special
                characters.
              </li>
              <li>
                <strong>Sequences:</strong> Make sure auto-increment sequences
                are set to the correct next value. pgloader handles this, but
                verify with:{" "}
                <code>SELECT last_value FROM tablename_id_seq;</code>
              </li>
              <li>
                <strong>Indexes and constraints:</strong> Verify that primary
                keys, unique constraints, foreign keys, and indexes were all
                created correctly.
              </li>
              <li>
                <strong>Application testing:</strong> Run your application&apos;s
                test suite against the new PostgreSQL database. This is the best
                way to catch query compatibility issues.
              </li>
            </ul>

            <h2>Common Pitfalls</h2>

            <p>
              Watch out for these issues that frequently trip people up during
              migration:
            </p>

            <ul>
              <li>
                <strong>Case sensitivity:</strong> MySQL is case-insensitive for
                string comparisons by default. PostgreSQL is case-sensitive. If
                your app relies on case-insensitive matching, use{" "}
                <code>ILIKE</code> instead of <code>LIKE</code>, or use the{" "}
                <code>citext</code> extension.
              </li>
              <li>
                <strong>Zero dates:</strong> MySQL allows{" "}
                <code>&apos;0000-00-00&apos;</code> as a date value. PostgreSQL
                does not. You&apos;ll need to convert these to{" "}
                <code>NULL</code> or a valid date.
              </li>
              <li>
                <strong>Unsigned integers:</strong> PostgreSQL does not support
                unsigned integer types. A MySQL{" "}
                <code>INT UNSIGNED</code> should become a{" "}
                <code>BIGINT</code> in PostgreSQL if you need the full range.
              </li>
              <li>
                <strong>Character encoding:</strong> Make sure your PostgreSQL
                database is created with{" "}
                <code>UTF8</code> encoding. MySQL databases sometimes use{" "}
                <code>latin1</code> or mixed encodings that need to be converted
                during migration.
              </li>
              <li>
                <strong>Stored procedures:</strong> MySQL stored procedures and
                functions use a different syntax than PostgreSQL&apos;s PL/pgSQL.
                These need to be manually rewritten.
              </li>
            </ul>

            <h2>After the Migration</h2>

            <p>
              Once your data is in PostgreSQL, take advantage of features that
              weren&apos;t available in MySQL:
            </p>

            <ul>
              <li>
                Use <code>JSONB</code> columns with indexing for flexible
                semi-structured data.
              </li>
              <li>
                Add <code>CHECK</code> constraints for data validation at the
                database level.
              </li>
              <li>
                Use <code>EXPLAIN ANALYZE</code> to understand and optimize
                query performance.
              </li>
              <li>
                Explore extensions like <code>pg_trgm</code> for full-text and
                fuzzy search, or <code>PostGIS</code> for geospatial queries.
              </li>
              <li>
                Use CTEs (Common Table Expressions) and window functions for
                complex queries that would have required subqueries or
                application-level logic in MySQL.
              </li>
            </ul>

            <p>
              With your database now running on PostgreSQL, you&apos;ll want a
              good client to explore your data and run queries. PostgresGUI is a
              lightweight, native PostgreSQL client for Mac that connects to any
              Postgres instance. It&apos;s a fast, simple way to browse your
              tables and verify everything looks right after migration.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
