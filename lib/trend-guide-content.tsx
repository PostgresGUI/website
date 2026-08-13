import Link from "next/link";
import type { ReactNode } from "react";
import type { GuideCodeBlock } from "@/components/seo-guide-page";
import { trendBlogPosts } from "@/lib/trend-blog-posts";

type TrendGuideSection = {
  title: string;
  paragraphs: ReactNode[];
  bullets?: ReactNode[];
  code?: GuideCodeBlock;
};

export type TrendGuideContent = {
  intro: ReactNode;
  answer: ReactNode;
  codeBlocks?: GuideCodeBlock[];
  sections: TrendGuideSection[];
};

const lines = (...value: string[]) => value.join("\n");

const trendGuideContent: Record<string, TrendGuideContent> = {
  "postgresql-autovacuum-and-table-bloat": {
    intro:
      "PostgreSQL updates create new row versions. Old versions remain until they are no longer visible to any transaction and VACUUM marks their space reusable. Autovacuum automates that cleanup and also runs ANALYZE for planner statistics.",
    answer:
      "Do not start with VACUUM FULL. Check table size, dead-row estimates, vacuum history, active long transactions, and current autovacuum progress. Tune the busiest tables when their change rate outpaces the default thresholds, then measure whether dead rows and table growth stabilize.",
    codeBlocks: [
      {
        title: "Find large tables with dead-row estimates",
        code: lines(
          "select",
          "  schemaname, relname,",
          "  n_live_tup, n_dead_tup,",
          "  last_autovacuum, autovacuum_count,",
          "  pg_size_pretty(pg_total_relation_size(relid)) as total_size",
          "from pg_stat_user_tables",
          "order by n_dead_tup desc",
          "limit 25;",
        ),
        note: "n_live_tup and n_dead_tup are estimates. Use them to identify candidates, then investigate the workload and physical size.",
      },
    ],
    sections: [
      {
        title: "Know what regular VACUUM changes",
        paragraphs: [
          "Regular VACUUM makes dead-row space available for reuse and updates visibility information. It normally does not shrink the table file back to the operating system. That is why a table can remain physically large after cleanup while future updates reuse its space.",
          "VACUUM FULL rewrites the table into a new file and takes an ACCESS EXCLUSIVE lock. It can reclaim filesystem space, but it needs temporary disk capacity and blocks normal access. Use it only when reclaiming that space justifies the operational cost.",
        ],
      },
      {
        title: "Understand the trigger calculation",
        paragraphs: [
          "Autovacuum uses a base threshold plus a fraction of the table size. On busy large tables, a percentage-based threshold can allow many dead rows to accumulate before vacuum starts. Current PostgreSQL also supports a maximum threshold that caps the calculated trigger.",
          "Changing global defaults can create unnecessary work across every table. Set per-table storage parameters for a table whose update pattern requires a different threshold, and record why the override exists.",
        ],
        code: {
          title: "Inspect and tune one busy table",
          code: lines(
            "select relname, reloptions",
            "from pg_class",
            "where oid = 'app.events'::regclass;",
            "",
            "alter table app.events set (",
            "  autovacuum_vacuum_scale_factor = 0.02,",
            "  autovacuum_vacuum_threshold = 1000,",
            "  autovacuum_analyze_scale_factor = 0.02",
            ");",
          ),
          note: "The sample values are not universal defaults. Estimate the table's row-change rate and observe the effect before applying them elsewhere.",
        },
      },
      {
        title: "Look for work autovacuum cannot finish",
        paragraphs: [
          "A long-running transaction can keep old row versions visible and prevent their removal. An idle in transaction session can cause the same problem even when it is not running a query. Replication slots and prepared transactions can also retain old data.",
          "Before increasing workers or making vacuum more aggressive, inspect old transaction start times and the blocker behind the oldest xmin. Ending a valid long transaction without coordination can be worse than waiting, so identify its owner first.",
        ],
        code: {
          title: "List old open transactions",
          code: lines(
            "select",
            "  pid, usename, application_name, state,",
            "  xact_start, now() - xact_start as transaction_age,",
            "  wait_event_type, wait_event, query",
            "from pg_stat_activity",
            "where xact_start is not null",
            "order by xact_start;",
          ),
        },
      },
      {
        title: "Watch vacuum progress",
        paragraphs: [
          "pg_stat_progress_vacuum shows the phase and block progress for running VACUUM operations, including autovacuum workers. VACUUM FULL appears in pg_stat_progress_cluster because it rewrites the table.",
        ],
        code: {
          title: "Inspect active VACUUM work",
          code: lines(
            "select",
            "  pid, datname, relid::regclass as table_name, phase,",
            "  heap_blks_scanned, heap_blks_total,",
            "  index_vacuum_count",
            "from pg_stat_progress_vacuum",
            "order by pid;",
          ),
        },
      },
      {
        title: "Measure bloat with the right level of confidence",
        paragraphs: [
          "Statistics views provide useful estimates but do not calculate exact reclaimable bytes. Extension-based checks such as pgstattuple can inspect a relation more closely, at additional cost and with required privileges. Sampling variants reduce the scan cost but remain estimates.",
          <>
            Track physical size, dead rows, vacuum frequency, write volume, and
            query latency together. Use the{" "}
            <Link href="/blog/postgresql-monitoring-tools">
              PostgreSQL monitoring guide
            </Link>{" "}
            to place maintenance signals beside locks, sessions, and slow
            queries instead of treating table size as an isolated alarm.
          </>,
        ],
      },
    ],
  },

  "postgresql-connection-string-errors": {
    intro:
      "A PostgreSQL connection URL compresses the user, password, host, port, database, and options into one line. That convenience also makes one unescaped character or copied pooler port look like an unrelated network or password failure.",
    answer:
      "Split the URL into fields, redact the password, and verify the scheme, encoded credentials, hostname, port, database path, and query parameters separately. Test the same values with psql, then rebuild the URL instead of editing a secret-filled string by eye.",
    codeBlocks: [
      {
        title: "Compare URI and keyword-value formats",
        code: lines(
          "postgresql://app_user:p%40ss%3Aword@db.example.com:5432/app?sslmode=require",
          "",
          "host=db.example.com port=5432 dbname=app \\",
          "user=app_user password='p@ss:word' sslmode=require",
        ),
        note: "The URI password is percent-encoded. Keyword-value strings use their own quoting rules and should not be pasted where a URI is required.",
      },
    ],
    sections: [
      {
        title: "Check the shape before the credentials",
        paragraphs: [
          "libpq accepts postgresql:// and postgres:// URIs. The database name follows the host and port as the path. Connection options follow ? and use & between parameters.",
          "A missing slash, doubled @, fragment marker, or copied quotation mark can change how the entire URL is parsed. Do not post the original URL in an issue or chat. Replace the password and any private host before sharing it.",
        ],
        code: {
          title: "Use the documented URI structure",
          code: lines(
            "postgresql://[user[:password]@][host][:port][/dbname][?name=value&...]",
          ),
        },
      },
      {
        title: "Percent-encode URI credentials",
        paragraphs: [
          "Characters such as @, :, /, ?, #, %, and spaces have structural meaning in a URI. Percent-encode them when they are data inside a user name, password, database name, or parameter value.",
          "Encode the individual value once, not the complete URL. Encoding the separators would destroy the structure. Encoding an already encoded percent sign produces a different password.",
        ],
        bullets: [
          "@ becomes %40",
          ": becomes %3A",
          "/ becomes %2F",
          "? becomes %3F",
          "# becomes %23",
          "% becomes %25",
          "space becomes %20",
        ],
      },
      {
        title: "Treat IPv6 and Unix sockets explicitly",
        paragraphs: [
          "Wrap a literal IPv6 address in square brackets in a PostgreSQL URI. A hostless connection can select a Unix-domain socket, which is different from TCP through localhost. When comparing two clients, state the host rather than assuming both chose the same transport.",
        ],
        code: {
          title: "Valid IPv6 and Unix-socket examples",
          code: lines(
            "postgresql://app_user@[2001:db8::1234]:5432/app",
            "",
            "postgresql:///app?host=/tmp",
          ),
        },
      },
      {
        title: "Verify provider pooler details",
        paragraphs: [
          "Managed providers can issue direct and pooled URLs with different hostnames, user formats, ports, and session behavior. A Supabase transaction pooler commonly differs from its session pooler. A Neon pooled hostname contains a pooler marker. Copy the intended connection type as a complete unit.",
          "An error after swapping only the port may not mean the port is closed. The pooler may expect another host or user string. Return to the provider's connection panel and compare every field.",
        ],
      },
      {
        title: "Map errors to the failing layer",
        paragraphs: [
          "Connection refused points to the listener and port. Timeout points to reachability. Host not found points to DNS or a malformed host. Password authentication failed means the server responded but rejected authentication. Database does not exist means the path or dbname is wrong. Certificate errors belong to SSL trust or hostname verification.",
          <>
            Use the local{" "}
            <Link href="/connection-string">
              PostgreSQL connection string builder
            </Link>{" "}
            to parse and rebuild a URL in the browser. For TLS parameters, read{" "}
            <Link href="/blog/postgresql-sslmode-explained">
              the sslmode guide
            </Link>
            . For a refused local connection, start with the{" "}
            <Link href="/blog/postgres-connection-refused-mac">
              Mac listener checklist
            </Link>
            .
          </>,
        ],
      },
      {
        title: "Test without leaking the password",
        paragraphs: [
          "Prefer an interactive prompt or a protected password file over placing credentials directly in shell history. Set a short connect_timeout while troubleshooting unreachable hosts, especially when a URL lists several hosts.",
        ],
        code: {
          title: "Test the reconstructed fields",
          code: lines(
            "psql \"host=db.example.com port=5432 dbname=app \\",
            "user=app_user sslmode=require connect_timeout=5\"",
          ),
          note: "psql prompts for a password when the server requests one and no password source supplies it.",
        },
      },
    ],
  },

  "postgresql-index-types": {
    intro:
      "PostgreSQL has several index access methods because equality, ranges, arrays, full-text terms, geometric operators, and physically ordered tables do not behave the same way. The query's operators determine which index type can help.",
    answer:
      "Start with B-tree for ordinary equality, range, and ordering queries. Use GIN for values with searchable components such as JSONB, arrays, and text-search vectors; GiST for supported ranges, geometry, and nearest-neighbor operators; and BRIN for very large tables whose values track physical row order. Verify every choice with EXPLAIN and representative data.",
    codeBlocks: [
      {
        title: "Create four indexes for four different query shapes",
        code: lines(
          "create index orders_created_at_idx",
          "  on orders (created_at);",
          "",
          "create index products_attributes_gin_idx",
          "  on products using gin (attributes);",
          "",
          "create index bookings_during_gist_idx",
          "  on bookings using gist (during);",
          "",
          "create index events_created_at_brin_idx",
          "  on events using brin (created_at);",
        ),
        note: "These are examples, not a recommendation to add all four. Each index must match real operators, data distribution, and workload.",
      },
    ],
    sections: [
      {
        title: "Use B-tree for the common case",
        paragraphs: [
          "B-tree is PostgreSQL's default index. It supports equality and ordered comparisons such as less than, greater than, BETWEEN, IN, IS NULL, and sorting. It can also support anchored prefix matching under compatible operator classes and collations.",
          "Column order matters in a multicolumn B-tree. Equality conditions on leading columns, followed by a range condition, are the conventional useful shape. PostgreSQL 18 can sometimes use skip scan when a leading value is missing, but that does not make column order irrelevant.",
        ],
        code: {
          title: "Match a multicolumn index to the query",
          code: lines(
            "create index orders_account_created_idx",
            "  on orders (account_id, created_at desc);",
            "",
            "select id, total",
            "from orders",
            "where account_id = 42",
            "  and created_at >= current_date - interval '30 days'",
            "order by created_at desc",
            "limit 50;",
          ),
        },
      },
      {
        title: "Use GIN for values with components",
        paragraphs: [
          "GIN is an inverted index. It stores entries for components inside a value, which makes it useful for arrays, JSONB containment, and full-text search. The supported operators come from the selected operator class.",
          "GIN can be expensive to update and can consume meaningful space. Index the JSONB or search operations you actually run, then compare write cost and index size as well as read latency.",
        ],
      },
      {
        title: "Use GiST for extensible search strategies",
        paragraphs: [
          "GiST is an index framework used by range types, geometric data, network-address extensions, exclusion constraints, and nearest-neighbor searches when the operator class supports them. It is not simply an alternative spelling of GIN.",
          "Choose between GIN and GiST from the operators and behavior of the data type. For example, a range-overlap query and a JSONB-containment query need different operator classes even though both values look composite.",
        ],
      },
      {
        title: "Use BRIN when physical order helps",
        paragraphs: [
          "BRIN stores summaries for ranges of table pages rather than an entry for every row. It stays small and can skip large parts of an append-heavy table when a value such as created_at is correlated with physical row order.",
          "BRIN is not a tiny B-tree. On a small table or randomly distributed identifier, its summaries may select too many pages to help. Test the correlation and the actual plan.",
        ],
      },
      {
        title: "Prove that the index improves the query",
        paragraphs: [
          "Load representative data and run EXPLAIN (ANALYZE, BUFFERS) before and after the index. Compare execution time, rows, loops, buffer reads, and the chosen scan. Run ANALYZE after a major data load so the planner has current statistics.",
          <>
            Keep indexes that improve important queries enough to justify their
            storage and write cost. The{" "}
            <Link href="/blog/explain-analyze-postgres">
              EXPLAIN ANALYZE walkthrough
            </Link>{" "}
            shows how to read the plan without treating an index scan as an
            automatic win.
          </>,
        ],
        code: {
          title: "Measure the intended query",
          code: lines(
            "analyze orders;",
            "",
            "explain (analyze, buffers)",
            "select id, total",
            "from orders",
            "where account_id = 42",
            "order by created_at desc",
            "limit 50;",
          ),
          note: "EXPLAIN ANALYZE executes the query. Use care with writes and expensive production statements.",
        },
      },
    ],
  },

  "import-csv-postgresql": {
    intro:
      "PostgreSQL has two similarly named CSV workflows. SQL COPY reads from the database server's filesystem. psql \\copy reads from the computer running psql and streams the data through the connection.",
    answer:
      "For a CSV stored on your Mac, create a staging table and use psql \\copy inside a controlled import workflow. State the delimiter, header, encoding, and null representation, then validate counts and rejected assumptions before moving rows into application tables.",
    codeBlocks: [
      {
        title: "Import a local CSV with psql \\copy",
        code: lines(
          "create table customer_import (",
          "  email text,",
          "  full_name text,",
          "  joined_on date,",
          "  lifetime_value numeric(12, 2)",
          ");",
          "",
          "\\copy customer_import (email, full_name, joined_on, lifetime_value) from '/Users/me/Downloads/customers.csv' with (format csv, header true, encoding 'UTF8')",
        ),
        note: "\\copy is a psql meta-command, so run it in psql rather than sending it as SQL through a generic query editor.",
      },
    ],
    sections: [
      {
        title: "Choose COPY or \\copy from the file location",
        paragraphs: [
          "COPY FROM '/path/file.csv' asks the PostgreSQL server process to read that path. On a hosted database, your Mac path does not exist on the server. Server-side file access also requires elevated privileges.",
          "psql \\copy uses COPY FROM STDIN and reads the file through the psql client. The database role still needs INSERT on the target table, but the file only needs to be readable by your local psql process.",
        ],
      },
      {
        title: "Import into a staging table first",
        paragraphs: [
          "A staging table keeps file parsing separate from application constraints and transformations. Start with types that faithfully accept the source, inspect the rows, and then insert cleaned values into the final table.",
          "Do not make every staging column text by habit when the source contract is reliable. Types such as date and numeric expose bad input early. Use text where normalization is genuinely required.",
        ],
      },
      {
        title: "Be explicit about NULL and empty strings",
        paragraphs: [
          "In PostgreSQL CSV format, an unquoted empty field represents NULL by default. A quoted empty field represents an empty string. If the source writes a marker such as NULL or N/A, state it with the NULL option only when that marker cannot be legitimate data.",
          "Dates, decimal separators, embedded newlines, quotes, byte-order marks, and inconsistent column counts are common failures. Inspect the source file as data, not just as a spreadsheet preview.",
        ],
        code: {
          title: "Import a source that uses NULL as its null marker",
          code: lines(
            "\\copy customer_import from '/Users/me/Downloads/customers.csv' with (format csv, header true, null 'NULL', encoding 'UTF8')",
          ),
        },
      },
      {
        title: "Validate before merging",
        paragraphs: [
          "Count the staged rows, test required fields, find duplicate keys, and inspect values that fail the destination rules. Keep these checks next to the import command so another run uses the same definition of valid data.",
        ],
        code: {
          title: "Run basic staging checks",
          code: lines(
            "select count(*) from customer_import;",
            "",
            "select * from customer_import",
            "where email is null or btrim(email) = '';",
            "",
            "select lower(email), count(*)",
            "from customer_import",
            "group by lower(email)",
            "having count(*) > 1;",
          ),
        },
      },
      {
        title: "Move valid rows in one reviewed statement",
        paragraphs: [
          "Insert from staging into the destination with explicit columns and transformations. Use a transaction when the final merge must be all-or-nothing. For a large load, consider lock duration, WAL volume, indexes, triggers, and available disk space before wrapping everything in one transaction.",
          <>
            After the import, browse the staging and destination tables in
            PostgresGUI and run spot checks on the same connection. The{" "}
            <Link href="/blog/postgres-column-types">
              PostgreSQL column type guide
            </Link>{" "}
            can help when source values do not map cleanly to the destination
            schema.
          </>,
        ],
        code: {
          title: "Normalize and merge valid rows",
          code: lines(
            "begin;",
            "",
            "insert into customers (email, full_name, joined_on, lifetime_value)",
            "select",
            "  lower(btrim(email)),",
            "  nullif(btrim(full_name), ''),",
            "  joined_on,",
            "  lifetime_value",
            "from customer_import",
            "where email is not null and btrim(email) <> '';",
            "",
            "commit;",
          ),
        },
      },
    ],
  },

  "connect-postgresgui-to-postgres-app": {
    intro:
      "Postgres.app runs PostgreSQL on your Mac. PostgresGUI is the client you use to inspect that server. With the default Postgres.app setup, the connection is local, uses port 5432, and starts with your macOS user name and a database of the same name.",
    answer:
      "Start the server in Postgres.app, then create a PostgresGUI connection with host localhost, port 5432, your macOS user name, the database shown by Postgres.app, and a blank password unless you configured one. Test the connection before saving it.",
    codeBlocks: [
      {
        title: "Confirm the default Postgres.app connection",
        code: lines(
          "/Applications/Postgres.app/Contents/Versions/latest/bin/pg_isready \\",
          "  -h localhost -p 5432",
          "",
          "/Applications/Postgres.app/Contents/Versions/latest/bin/psql \\",
          "  -h localhost -p 5432 -U \"$USER\" -d \"$USER\"",
        ),
        note: "If the Postgres.app window shows a different port or database, use those displayed values instead of the defaults.",
      },
    ],
    sections: [
      {
        title: "Understand which app does which job",
        paragraphs: [
          "Postgres.app installs and runs the database server and command-line tools. Closing every database client does not stop that server. PostgresGUI does not create or manage the server process; it opens a normal PostgreSQL client connection.",
          <>
            If you are choosing between the two apps, the answer is often both.
            The{" "}
            <Link href="/blog/postgres-app-vs-postgresgui">
              Postgres.app and PostgresGUI comparison
            </Link>{" "}
            explains the server-client distinction in more detail.
          </>,
        ],
      },
      {
        title: "Enter the connection fields",
        paragraphs: [
          "Open PostgresGUI, add a connection, and enter a useful name such as Local Postgres.app. Set host to localhost and port to the port shown next to the running Postgres.app server. Use your macOS account name for the default user and database.",
          "Leave the password blank only when the local Postgres.app configuration still uses its documented default. If you changed authentication or created another login, enter that role's actual password. Local default connections do not need an SSL mode.",
        ],
        bullets: [
          "Name: Local Postgres.app",
          "Host: localhost",
          "Port: 5432 by default",
          "Database: your macOS user name by default",
          "User: your macOS user name by default",
          "Password: blank in the default local configuration",
        ],
      },
      {
        title: "Create a separate practice database",
        paragraphs: [
          "Using a named practice database makes examples easier to recognize and avoids mixing tutorial tables into the default maintenance database. Create it with the Postgres.app binary or from a connected SQL editor.",
        ],
        code: {
          title: "Create and verify a practice database",
          code: lines(
            "/Applications/Postgres.app/Contents/Versions/latest/bin/createdb postgresgui_practice",
            "",
            "/Applications/Postgres.app/Contents/Versions/latest/bin/psql \\",
            "  -h localhost -d postgresgui_practice \\",
            "  -c \"select current_database(), current_user;\"",
          ),
        },
      },
      {
        title: "Fix the common local failures",
        paragraphs: [
          "Connection refused means the server is stopped or is not listening on the chosen port. Role does not exist usually means the user field does not match a PostgreSQL role. Database does not exist means the database field is wrong. Password authentication failed means this server is no longer using the blank-password default for that connection.",
          "If port 5432 is already occupied, Postgres.app may show a different port or fail to start. Its troubleshooting documentation recommends reading postgres-server.log inside the data directory for the exact startup failure.",
        ],
      },
      {
        title: "Browse the local database",
        paragraphs: [
          "After the test succeeds, save the connection and open the practice database. Create a small table, insert rows, and confirm they appear in the table browser. That proves the server, role, database, and client are all aligned.",
          <>
            For a listener or port problem, use the full{" "}
            <Link href="/blog/postgres-connection-refused-mac">
              connection refused checklist for Mac
            </Link>
            . Do not reset Postgres.app or delete its data directory as a first
            troubleshooting step.
          </>,
        ],
      },
    ],
  },

  "postgresql-locks-blocking-queries": {
    intro:
      "A blocked PostgreSQL query is waiting for another transaction to release a lock. The waiting statement is the symptom. The session holding the lock, often an old transaction left open by an application or migration, is the place to investigate.",
    answer:
      "Use pg_blocking_pids to connect each waiting session to its blockers, then inspect both sessions in pg_stat_activity. Ask the owner to commit or roll back when possible. Cancel a query before terminating its session, and terminate only after checking the transaction and application impact.",
    codeBlocks: [
      {
        title: "Show blocked sessions and their direct blockers",
        code: lines(
          "select",
          "  waiting.pid as waiting_pid,",
          "  waiting.usename as waiting_user,",
          "  waiting.query as waiting_query,",
          "  waiting.wait_event_type,",
          "  waiting.wait_event,",
          "  blocker.pid as blocker_pid,",
          "  blocker.usename as blocker_user,",
          "  blocker.state as blocker_state,",
          "  blocker.xact_start as blocker_xact_start,",
          "  blocker.query as blocker_query",
          "from pg_stat_activity waiting",
          "cross join lateral unnest(pg_blocking_pids(waiting.pid)) as b(pid)",
          "join pg_stat_activity blocker on blocker.pid = b.pid",
          "order by waiting.query_start;",
        ),
        note: "Run this with a role allowed to view the relevant activity. Query text for other users can be restricted.",
      },
    ],
    sections: [
      {
        title: "Confirm that the wait is a lock",
        paragraphs: [
          "pg_stat_activity shows one row per backend. A lock wait normally reports wait_event_type as Lock. Other wait types, such as Client, IO, or IPC, need a different investigation.",
          "pg_locks exposes outstanding lock records, but joining it correctly for every lock type is easy to get wrong. pg_blocking_pids is the direct starting point for finding the sessions that block a specific backend.",
        ],
      },
      {
        title: "Inspect the blocker before touching it",
        paragraphs: [
          "Record the blocker PID, user, application name, client address, state, transaction start, query start, and query text. An idle in transaction session is especially important: its last statement ended, but its open transaction can still hold locks.",
          "Check whether the blocker belongs to a migration, maintenance task, checkout flow, background worker, or another administrator. Killing a legitimate migration midway can leave an operational mess even though PostgreSQL rolls back its open transaction.",
        ],
        code: {
          title: "Inspect one blocker in context",
          code: lines(
            "select",
            "  pid, usename, application_name, client_addr,",
            "  state, xact_start, query_start, state_change,",
            "  wait_event_type, wait_event, query",
            "from pg_stat_activity",
            "where pid = 12345;",
          ),
          note: "Replace 12345 with the blocker PID returned by the first query.",
        },
      },
      {
        title: "Prefer a clean transaction end",
        paragraphs: [
          "The best resolution is for the owning application to commit or roll back. That releases locks through the normal transaction path and lets the application report its own outcome.",
          "If you control the waiting operation, canceling that operation may be safer than disrupting the blocker. The right choice depends on which transaction is valuable and whether either client can retry safely.",
        ],
      },
      {
        title: "Cancel before terminating",
        paragraphs: [
          "pg_cancel_backend asks PostgreSQL to cancel the current query while preserving the session. pg_terminate_backend ends the session. Termination rolls back an open transaction, which can itself take time before every lock is released.",
          "These signaling functions are permission-controlled. Only authorized operators should use them, and a normal role cannot terminate a superuser backend.",
        ],
        code: {
          title: "Escalate deliberately",
          code: lines(
            "-- First, ask the current statement to stop",
            "select pg_cancel_backend(12345);",
            "",
            "-- If the session itself must end",
            "select pg_terminate_backend(12345, 5000);",
          ),
          note: "Replace 12345 only after verifying the session. The optional timeout waits for termination confirmation on supported PostgreSQL versions.",
        },
      },
      {
        title: "Prevent the next lock pileup",
        paragraphs: [
          "Set application_name so sessions can be traced to a service. Keep transactions short, avoid user interaction inside an open transaction, and set idle_in_transaction_session_timeout where an abandoned transaction is worse than a disconnected client.",
          <>
            Slow statements can hold locks longer even when the lock choice is
            correct. Pair this workflow with{" "}
            <Link href="/blog/find-slow-postgresql-queries-pg-stat-statements">
              pg_stat_statements
            </Link>{" "}
            and the{" "}
            <Link href="/blog/explain-analyze-postgres">
              EXPLAIN ANALYZE guide
            </Link>{" "}
            after the immediate incident is stable.
          </>,
        ],
      },
    ],
  },

  "postgresql-permission-denied-for-relation": {
    intro:
      "PostgreSQL reports permission denied for relation when the current role lacks a required object privilege. The relation might be a table, view, sequence, or materialized view, and the missing schema permission may be reported separately.",
    answer:
      "Identify the current login, object owner, schema, and exact operation. Grant only the required schema and object privileges. If future objects must inherit access, set default privileges for the role that creates those objects rather than for the role receiving access.",
    codeBlocks: [
      {
        title: "Inspect identity, ownership, and effective privileges",
        code: lines(
          "select current_user, session_user;",
          "",
          "select",
          "  n.nspname as schema_name,",
          "  c.relname,",
          "  c.relkind,",
          "  pg_get_userbyid(c.relowner) as owner,",
          "  has_schema_privilege(current_user, n.oid, 'USAGE') as schema_usage,",
          "  has_table_privilege(current_user, c.oid, 'SELECT') as can_select,",
          "  has_table_privilege(current_user, c.oid, 'INSERT') as can_insert",
          "from pg_class c",
          "join pg_namespace n on n.oid = c.relnamespace",
          "where n.nspname = 'app' and c.relname = 'orders';",
        ),
        note: "Change app.orders to the object named in the error. relkind distinguishes tables, views, sequences, and other relation types.",
      },
    ],
    sections: [
      {
        title: "Grant access at the correct layers",
        paragraphs: [
          "USAGE on a schema lets a role resolve objects inside it. It does not grant access to the tables. Likewise, SELECT on a table does not grant schema USAGE. Both may be needed.",
          "INSERT into a table backed by a sequence can also require USAGE on that sequence. This commonly appears after a table grant seems to fix reads but inserts still fail.",
        ],
        code: {
          title: "Grant a read-write application role",
          code: lines(
            "grant usage on schema app to app_runtime;",
            "grant select, insert, update, delete",
            "  on all tables in schema app to app_runtime;",
            "grant usage, select",
            "  on all sequences in schema app to app_runtime;",
          ),
          note: "Run grants as the object owner or another authorized role. Remove write privileges the application does not need.",
        },
      },
      {
        title: "Do not solve it with superuser",
        paragraphs: [
          "Making an application login a superuser hides the privilege error by bypassing normal controls. It also gives that application the ability to read, alter, or destroy unrelated data and configuration.",
          "Use a group role when several logins need the same access. Grant privileges to the group, grant membership to each login, and test with SET ROLE or a direct connection as the runtime user.",
        ],
      },
      {
        title: "Set defaults for objects created later",
        paragraphs: [
          "ALTER DEFAULT PRIVILEGES affects objects created in the future by a particular owner. It does not repair existing tables, and running it as the receiving application role will not affect tables later created by a migration owner.",
        ],
        code: {
          title: "Grant future objects created by the migration role",
          code: lines(
            "alter default privileges for role app_migrator in schema app",
            "  grant select, insert, update, delete on tables to app_runtime;",
            "",
            "alter default privileges for role app_migrator in schema app",
            "  grant usage, select on sequences to app_runtime;",
          ),
          note: "Run the command as app_migrator or a role allowed to alter its default privileges.",
        },
      },
      {
        title: "Separate RLS from object privileges",
        paragraphs: [
          "Row-level security is checked after ordinary object privileges. A missing SELECT privilege produces a permission error. A valid SELECT with a restrictive RLS policy can return fewer rows or reject a write instead.",
          <>
            Test the exact application login in a separate connection. For a
            stricter production setup, use the role patterns in{" "}
            <Link href="/blog/secure-postgresql-ai-agents">
              secure PostgreSQL access for AI agents
            </Link>{" "}
            as a general least-privilege checklist.
          </>,
        ],
      },
    ],
  },

  "pg-dump-pg-restore-mac": {
    intro:
      "pg_dump makes a consistent logical export of one PostgreSQL database. The custom archive format is compressed, inspectable with pg_restore, and flexible enough for selective or parallel restores.",
    answer:
      "Use a pg_dump version at least as new as the server, create a custom-format archive, inspect its table of contents, and restore it into a separate empty database. Finish by checking errors, row counts, sequences, extensions, and an application query.",
    codeBlocks: [
      {
        title: "Create, inspect, and restore a custom-format backup",
        code: lines(
          "pg_dump --format=custom --file=app-2026-08-04.dump \\",
          "  \"postgresql://backup_user@db.example.com/app\"",
          "",
          "pg_restore --list app-2026-08-04.dump | less",
          "createdb app_restore_test",
          "pg_restore --exit-on-error --no-owner \\",
          "  --dbname=app_restore_test app-2026-08-04.dump",
        ),
        note: "Avoid putting a password directly in shell history. Use an appropriately protected password file, interactive prompt, or secret mechanism.",
      },
    ],
    sections: [
      {
        title: "Choose the archive format deliberately",
        paragraphs: [
          "A plain SQL dump can be reviewed in a text editor and restored with psql. A custom archive is restored with pg_restore and supports listing, filtering, reordering, and parallel restore. Directory format also supports parallel dump and restore, but it creates multiple files.",
          "For a normal application database, custom format is a useful default. Keep the command, PostgreSQL client version, source version, destination, and completion status with the backup record.",
        ],
      },
      {
        title: "Match pg_dump to the server",
        paragraphs: [
          "pg_dump can usually read older server versions, but it refuses to dump a server newer than its own major version. On a Mac with several PostgreSQL installations, verify which binary the shell resolves before starting a long backup.",
        ],
        code: {
          title: "Check client and server versions",
          code: lines(
            "which pg_dump",
            "pg_dump --version",
            "psql \"$DATABASE_URL\" -Atc \"show server_version\"",
          ),
          note: "Use a current pg_dump when migrating to a newer major release and read that release's documentation for compatibility details.",
        },
      },
      {
        title: "Handle roles and ownership",
        paragraphs: [
          "pg_dump exports one database, not every cluster-wide role and tablespace definition. Use pg_dumpall --globals-only when those objects are part of the recovery plan, and protect that output because it can contain role definitions.",
          "For a development restore under a different owner, --no-owner avoids ALTER OWNER commands. Production recovery may need the original roles created first. Do not add --no-acl automatically if grants are part of the behavior you need to recover.",
        ],
      },
      {
        title: "Inspect untrusted archives before restoring",
        paragraphs: [
          "PostgreSQL warns that restoring a dump executes code chosen by users with sufficient privileges in the source database. Treat an archive from an untrusted source like executable input.",
          "List the archive and render it to SQL for review when trust is uncertain. Restore into an isolated environment with limited credentials rather than into a valuable database.",
        ],
        code: {
          title: "Render an archive to SQL without executing it",
          code: lines(
            "pg_restore --file=review.sql app-2026-08-04.dump",
            "less review.sql",
          ),
        },
      },
      {
        title: "Verify recovery, not just archive creation",
        paragraphs: [
          "A zero exit status from pg_dump proves that the export command completed. It does not prove that the file is retained, decryptable, restorable within the recovery window, or complete enough for the application.",
          <>
            Restore into a clean database, review every pg_restore error, run
            representative counts and constraints, and open the result in a
            database client. Use the broader{" "}
            <Link href="/blog/best-postgresql-backup-solution">
              PostgreSQL backup comparison
            </Link>{" "}
            to decide where logical dumps fit beside managed snapshots and
            point-in-time recovery.
          </>,
        ],
        code: {
          title: "Run basic post-restore checks",
          code: lines(
            "select current_database(), current_user;",
            "select count(*) from app.orders;",
            "select pg_size_pretty(pg_database_size(current_database()));",
            "analyze;",
          ),
          note: "Replace the sample table with application-specific checks. ANALYZE helps the restored database rebuild useful planner statistics when needed.",
        },
      },
    ],
  },

  "postgres-connection-refused-mac": {
    intro:
      "A connection refused error is narrower than it looks. Your Mac reached the requested address, but no PostgreSQL server accepted the TCP connection on that port. Check the listener before changing passwords, SSL settings, or application code.",
    answer:
      "Confirm which PostgreSQL installation should be running, start it, find its actual port, and test that exact host and port with pg_isready and psql. Then copy the same values into PostgresGUI. If TCP still fails, inspect the server log instead of repeatedly changing credentials.",
    codeBlocks: [
      {
        title: "Check port 5432 and test the same TCP connection",
        code: lines(
          "lsof -nP -iTCP:5432 -sTCP:LISTEN",
          "pg_isready -h 127.0.0.1 -p 5432",
          "psql -h 127.0.0.1 -p 5432 -d postgres -U \"$USER\"",
        ),
        note: "An empty lsof result means nothing is listening on that TCP port. pg_isready can report whether a server responds without proving that your database name or password is correct.",
      },
    ],
    sections: [
      {
        title: "Read the error before applying a fix",
        paragraphs: [
          "Connection refused is not an authentication failure. A bad password usually reaches PostgreSQL and returns a FATAL authentication message. A missing database also reaches PostgreSQL and names the missing database. Refused means the TCP listener was not there at the requested address and port.",
          "A timeout is different again. It commonly points to a firewall, unreachable private address, failed IPv6 route, or cloud allowlist. Keep the original error text because it tells you which layer to inspect first.",
        ],
      },
      {
        title: "Find which PostgreSQL installation owns the port",
        paragraphs: [
          "A Mac can have Postgres.app, Homebrew PostgreSQL, Docker, and an old installer present at the same time. Only one process can normally bind the same address and port. Check the process reported by lsof, then use that installation's controls to start or stop the server.",
          "Do not delete postmaster.pid just because a page online suggests it. That file can describe a running server. Postgres.app recommends checking for PostgreSQL processes and reading its server log before treating a PID file as stale.",
        ],
        bullets: [
          "Postgres.app: open the app and confirm the intended server shows as running.",
          "Homebrew: run brew services list and inspect the named PostgreSQL service.",
          "Docker: run docker ps and confirm the container publishes a host port such as 5432:5432.",
          "Manual server: use the matching pg_ctl binary and data directory, not a pg_ctl from another PostgreSQL version.",
        ],
      },
      {
        title: "Force psql to use TCP",
        paragraphs: [
          "On macOS, psql without -h commonly uses a Unix-domain socket. A GUI connection to localhost uses TCP. This explains the confusing case where psql works but a desktop client receives connection refused.",
          "Test with -h 127.0.0.1 and the exact port from the server. If the socket connection works but TCP does not, inspect listen_addresses and the server log. Restart PostgreSQL after changing server configuration.",
        ],
        code: {
          title: "Compare socket and TCP behavior",
          code: lines(
            "# Local socket chosen by libpq",
            "psql -d postgres",
            "",
            "# Explicit TCP connection",
            "psql -h 127.0.0.1 -p 5432 -d postgres -U \"$USER\"",
          ),
          note: "Use localhost instead of 127.0.0.1 if certificate hostname verification or local configuration requires the host name.",
        },
      },
      {
        title: "Check the port and server log",
        paragraphs: [
          "If another process already owns 5432, PostgreSQL may start on a different configured port or fail to start. Read the startup log for cannot bind, data-directory, permission, recovery, and version mismatch messages.",
          "Postgres.app keeps postgres-server.log inside the selected data directory. For Homebrew or another package, use that service's log location. Fix the first startup error rather than the later connection symptom.",
        ],
      },
      {
        title: "Use the verified values in PostgresGUI",
        paragraphs: [
          <>
            Create a connection with the host, port, database, and user that
            worked in the explicit psql test. Local development servers often
            do not need SSL. Hosted databases usually do. Use the{" "}
            <Link href="/connection-string">connection string builder</Link> to
            inspect a provider URL without saving it on the server.
          </>,
          <>
            If Postgres.app is the server, continue with the dedicated{" "}
            <Link href="/blog/connect-postgresgui-to-postgres-app">
              Postgres.app connection guide
            </Link>
            . If the server responds but rejects SSL or the URL, troubleshoot
            those errors separately.
          </>,
        ],
      },
    ],
  },

  "postgresql-sslmode-explained": {
    intro:
      "PostgreSQL sslmode controls more than whether traffic is encrypted. The stronger modes also decide whether the client trusts the certificate authority and whether the certificate matches the host you meant to reach.",
    answer:
      "Use verify-full for a production connection when the provider supplies a trusted CA and a stable hostname. Use require when encryption is mandatory but certificate verification is not available. Do not treat require as proof that the server is the intended server.",
    codeBlocks: [
      {
        title: "Connect with certificate and hostname verification",
        code: lines(
          "psql \"host=db.example.com port=5432 dbname=app user=app_reader \\",
          "sslmode=verify-full sslrootcert=$HOME/.postgresql/root.crt\"",
        ),
        note: "Keep the original hostname from the provider. Replacing it with an IP address usually breaks verify-full unless that IP is present in the certificate.",
      },
    ],
    sections: [
      {
        title: "What each sslmode does",
        paragraphs: [
          "The six libpq modes form a policy, not a quality score. allow and prefer can fall back between encrypted and unencrypted TCP. require refuses an unencrypted connection. verify-ca adds certificate-chain validation. verify-full also checks that the requested hostname matches the certificate.",
        ],
        bullets: [
          "disable: use only an unencrypted TCP connection.",
          "allow: try unencrypted first, then TLS if the first attempt fails.",
          "prefer: try TLS first, then allow an unencrypted fallback. This is the libpq default.",
          "require: require TLS, without normal hostname verification.",
          "verify-ca: require TLS and a certificate issued by a trusted CA.",
          "verify-full: require TLS, trust the issuing CA, and match the server hostname.",
        ],
      },
      {
        title: "Encryption is not server identity",
        paragraphs: [
          "An encrypted connection prevents passive observers from reading traffic. It does not by itself prove who is at the other end. That is why verify-full checks both the certificate chain and host name.",
          "PostgreSQL retains a compatibility behavior where require can act like verify-ca when a root CA file is present. Do not build a security policy around that implicit switch. State verify-ca or verify-full when verification is intended.",
        ],
      },
      {
        title: "Check the negotiated connection",
        paragraphs: [
          "After connecting, pg_stat_ssl reports whether the current backend uses SSL, along with the protocol and cipher when your role can see them. This confirms encryption. It does not replace the client-side certificate and hostname checks performed during connection setup.",
        ],
        code: {
          title: "Inspect SSL for the current session",
          code: lines(
            "select ssl, version, cipher, bits",
            "from pg_stat_ssl",
            "where pid = pg_backend_pid();",
          ),
          note: "Run the query in the same connection you are verifying.",
        },
      },
      {
        title: "Diagnose common verification failures",
        paragraphs: [
          "Certificate verify failed usually means the CA file is missing, unreadable, expired, or not the CA that issued the server certificate. Hostname mismatch means the connection used a name or address absent from the certificate. Fix the trust material or hostname; do not silently downgrade production to require.",
          "sslmode is ignored for Unix-domain socket connections because those are not TCP connections. For local sockets, filesystem permissions control access to the socket while PostgreSQL authentication still controls the database session.",
        ],
      },
      {
        title: "Apply the mode to provider connections",
        paragraphs: [
          <>
            Start with the connection string issued by the provider. Supabase,
            Neon, RDS, and proxies can have different CA and pooler behavior.
            Preserve provider parameters unless their documentation tells you
            to change them. The{" "}
            <Link href="/blog/ssl-verify-full-for-rds-postgresql-on-mac">
              RDS verify-full guide
            </Link>{" "}
            covers the extra root-certificate setup for Amazon RDS.
          </>,
          <>
            Before pasting a URL into a client, review its parameters with the{" "}
            <Link href="/connection-string">
              PostgreSQL connection string builder
            </Link>
            . Remove credentials before sharing screenshots or support logs.
          </>,
        ],
      },
    ],
  },

  "postgres-mcp-server": {
    intro:
      "A Postgres MCP server lets an AI client inspect schemas and run SQL through the Model Context Protocol. The useful part is direct database context. The dangerous part is also direct database context, especially when the server starts with a privileged connection string.",
    answer:
      "Use a maintained MCP implementation with a dedicated PostgreSQL login. Grant that login only CONNECT, schema USAGE, and SELECT; set short timeouts and default read-only transactions; then verify the restrictions with destructive test statements before adding the server to an AI client.",
    codeBlocks: [
      {
        title: "Create a constrained database role",
        code: lines(
          "create role ai_reader",
          "  login",
          "  password 'replace-with-a-generated-secret';",
          "",
          "grant connect on database app_db to ai_reader;",
          "grant usage on schema public to ai_reader;",
          "grant select on all tables in schema public to ai_reader;",
          "",
          "alter default privileges in schema public",
          "  grant select on tables to ai_reader;",
          "",
          "alter role ai_reader set default_transaction_read_only = on;",
          "alter role ai_reader set statement_timeout = '10s';",
          "alter role ai_reader set idle_in_transaction_session_timeout = '30s';",
        ),
        note: "Run this as the database owner, change the database and schema names, and store the generated password in the MCP client's secret or environment configuration rather than in a prompt.",
      },
    ],
    sections: [
      {
        title: "Choose the server before copying a command",
        paragraphs: [
          "The original PostgreSQL reference server in the Model Context Protocol repository is archived. An old install command may still run, but archived software is a poor default for a component that receives database credentials.",
          "Check the implementation's current repository, release activity, dependency history, and documented access modes. Postgres MCP Pro is one maintained option and includes restricted execution, schema inspection, query-plan tools, and performance checks. Its safeguards do not replace database permissions.",
        ],
      },
      {
        title: "Enforce access in PostgreSQL",
        paragraphs: [
          "A system prompt that says only run SELECT is guidance, not an access-control boundary. PostgreSQL grants are the boundary. If the login cannot update a table, a mistaken tool call cannot talk its way around the missing privilege.",
          "Default read-only transactions add a useful second layer. Keep the underlying grants narrow anyway, because role settings can be changed by sufficiently privileged users and functions can introduce behavior that is not obvious from the outer query.",
        ],
        bullets: [
          "Use a separate login for each agent or integration so activity can be attributed and revoked.",
          "Grant access only to the database, schemas, tables, and views the workflow needs.",
          "Prefer curated views when raw tables contain secrets, personal data, or internal columns.",
          "Do not grant CREATE on application schemas or membership in owner roles.",
        ],
      },
      {
        title: "Test the restrictions without the AI client",
        paragraphs: [
          "Connect as the new role using psql or a database GUI. A normal SELECT should work. UPDATE, DELETE, CREATE TABLE, and attempts to disable read-only mode should fail. Also run a deliberately expensive query in a disposable database to confirm the statement timeout is active.",
          "This direct test separates PostgreSQL configuration from MCP configuration. If the role is wrong, fix it before placing the password in another tool.",
        ],
        code: {
          title: "Minimum permission test",
          code: lines(
            "select current_user, current_setting('transaction_read_only');",
            "select * from public.projects limit 1;",
            "",
            "-- These should fail for ai_reader:",
            "update public.projects set name = name;",
            "create table public.mcp_permission_test (id integer);",
          ),
          note: "Run the failure checks only against a role and database where you are authorized to test permissions.",
        },
      },
      {
        title: "Add the connection to the MCP client",
        paragraphs: [
          "Follow the selected server's current configuration format. Most local MCP clients start a command and pass the PostgreSQL URL through an environment variable. Avoid configurations that place credentials in a command argument, checked-in JSON file, issue, or chat transcript.",
          "Start with manual approval for tool calls. Inspect the schema list and run a small SELECT. Only enable automatic execution after you understand which tools the server exposes and which database the credentials reach.",
        ],
      },
      {
        title: "Keep production separate",
        paragraphs: [
          <>
            The safest target is a disposable branch, local copy, or sanitized
            read replica. For production reads, add network restrictions,
            auditing, result limits, and a tested revocation path. The broader
            checklist is in{" "}
            <Link href="/blog/secure-postgresql-ai-agents">
              secure PostgreSQL access for AI agents
            </Link>
            .
          </>,
          "An MCP server should make authorized inspection easier. It should not turn one leaked local configuration file into unrestricted database access.",
        ],
      },
    ],
  },

  "postgresql-19-features": {
    intro:
      "PostgreSQL 19 Beta 2 is feature-frozen, but it is still test software. The draft release notes are long and the overview is not final, so the useful approach is to test the changes that affect your schema, queries, extensions, and operating procedures.",
    answer:
      "Keep PostgreSQL 19 on a separate port and data directory. Restore a disposable copy of representative data, run application and extension tests, compare plans, and record compatibility problems. Do not point the beta at your PostgreSQL 18 production data directory.",
    codeBlocks: [
      {
        title: "Build an isolated PostgreSQL 19 beta on macOS",
        code: lines(
          "tar -xf postgresql-19beta2.tar.bz2",
          "cd postgresql-19beta2",
          "",
          './configure --prefix="$HOME/pg19"',
          'make -j"$(sysctl -n hw.ncpu)"',
          "make install",
          "",
          '"$HOME/pg19/bin/initdb" -D "$HOME/pg19-data"',
          '"$HOME/pg19/bin/pg_ctl" \\',
          '  -D "$HOME/pg19-data" \\',
          '  -l "$HOME/pg19-data/server.log" \\',
          '  -o "-p 5419" start',
        ),
        note: "Install Apple's command-line developer tools and any required build dependencies first. Use a throwaway data directory and stop the server with the matching pg_ctl binary.",
      },
    ],
    sections: [
      {
        title: "Treat the beta label as a contract",
        paragraphs: [
          "The PostgreSQL project says beta releases are not for production or active development data. Catalog formats, behavior, and features can change before release. A beta cluster should be easy to delete and rebuild.",
          "PostgreSQL 19 is currently planned for September 2026. Keep the version number out of long-lived infrastructure defaults until the release candidates settle and your extensions publish compatible builds.",
        ],
      },
      {
        title: "SQL changes developers will notice",
        paragraphs: [
          "The draft adds SQL property graph queries, GROUP BY ALL, IGNORE NULLS and RESPECT NULLS for several window functions, FOR PORTION OF for temporal updates and deletes, and a form of INSERT ON CONFLICT that can return the conflicting row.",
          "These are good candidates for small compatibility tests because they are visible at the query layer. Keep test SQL next to its expected output so later beta releases can be rerun without guesswork.",
        ],
        code: {
          title: "Try two PostgreSQL 19 query features",
          code: lines(
            "select department, status, count(*)",
            "from tickets",
            "group by all;",
            "",
            "select",
            "  happened_at,",
            "  last_value(value) ignore nulls over (",
            "    order by happened_at",
            "    rows between unbounded preceding and current row",
            "  ) as latest_value",
            "from readings;",
          ),
          note: "The exact feature set is still pre-release. Verify syntax against the documentation for the beta build you install.",
        },
      },
      {
        title: "Operations and performance changes deserve rehearsal",
        paragraphs: [
          "PostgreSQL 19 expands asynchronous I/O controls, adds parallel autovacuum workers, makes LZ4 the default TOAST compression method, enables log_lock_waits by default, and adds views for lock, recovery, and autovacuum statistics. JIT is disabled by default because its previous cost trigger was not reliable for every workload.",
          "None of those changes guarantees a faster application. Capture a PostgreSQL 18 baseline, restore the same data into 19, and compare the same query set, maintenance jobs, and bulk loads.",
        ],
      },
      {
        title: "Check compatibility before performance",
        paragraphs: [
          "The draft notes include changes to authentication warnings, RADIUS removal, standard-conforming strings, index operator classes for inet and cidr, lock sizing, extension APIs, and utility behavior. An extension that compiles on 18 is not automatically ready for 19.",
          "Inventory extensions, procedural languages, custom data types, foreign data wrappers, authentication methods, and backup tooling. Run pg_upgrade --check against a copy when the surrounding tools support the beta.",
        ],
      },
      {
        title: "Use a repeatable beta test",
        paragraphs: [
          "Restore a fresh database, run migrations, execute application tests, compare important EXPLAIN plans, validate backups, and review logs. Repeat that process for each beta or release candidate rather than carrying a beta data directory forward indefinitely.",
          <>
            Use a separate saved-query folder in your database client for
            version checks and plan comparisons. The{" "}
            <Link href="/blog/explain-analyze-postgres">
              EXPLAIN ANALYZE guide
            </Link>{" "}
            covers the plan fields worth comparing.
          </>,
        ],
      },
    ],
  },
  "supabase-rls-examples": {
    intro:
      "Supabase exposes PostgreSQL through browser-facing APIs, so row-level security is often the rule that separates one user's rows from another's. RLS is default-deny after it is enabled, but a policy can still be too broad, incomplete, or slow.",
    answer:
      "Write separate policies for SELECT, INSERT, UPDATE, and DELETE. Base ownership on auth.uid(), use membership tables for team access, add WITH CHECK for new row values, and test every policy with at least two users plus an unauthenticated request.",
    codeBlocks: [
      {
        title: "Example tables",
        code: lines(
          "create table public.projects (",
          "  id bigint generated always as identity primary key,",
          "  owner_id uuid not null references auth.users(id),",
          "  name text not null",
          ");",
          "",
          "create table public.project_members (",
          "  project_id bigint not null references public.projects(id) on delete cascade,",
          "  user_id uuid not null references auth.users(id) on delete cascade,",
          "  member_role text not null check (member_role in ('member', 'admin')),",
          "  primary key (project_id, user_id)",
          ");",
          "",
          "alter table public.projects enable row level security;",
          "alter table public.project_members enable row level security;",
        ),
      },
    ],
    sections: [
      {
        title: "Start with user-owned rows",
        paragraphs: [
          "A direct owner column is the simplest policy shape. The SELECT policy decides which existing rows are visible. The INSERT policy checks the proposed row, so a user cannot create a project for another owner.",
        ],
        code: {
          title: "Owner SELECT and INSERT policies",
          code: lines(
            'create policy "owners can read projects"',
            "on public.projects",
            "for select",
            "to authenticated",
            "using ((select auth.uid()) = owner_id);",
            "",
            'create policy "owners can create projects"',
            "on public.projects",
            "for insert",
            "to authenticated",
            "with check ((select auth.uid()) = owner_id);",
          ),
          note: "The SELECT wrapper lets PostgreSQL evaluate auth.uid() as an initialization plan instead of invoking it separately for every candidate row.",
        },
      },
      {
        title: "Add team membership with an EXISTS policy",
        paragraphs: [
          "Team access belongs in a membership table with a unique key on project_id and user_id. The policy can admit either the owner or a matching member. Indexes supporting those columns matter once the tables grow.",
        ],
        code: {
          title: "Owner-or-member read access",
          code: lines(
            'create policy "members can read projects"',
            "on public.projects",
            "for select",
            "to authenticated",
            "using (",
            "  owner_id = (select auth.uid())",
            "  or exists (",
            "    select 1",
            "    from public.project_members pm",
            "    where pm.project_id = projects.id",
            "      and pm.user_id = (select auth.uid())",
            "  )",
            ");",
          ),
        },
      },
      {
        title: "Protect both old and new values on UPDATE",
        paragraphs: [
          "USING controls which existing rows can be targeted. WITH CHECK controls whether the resulting row is allowed. Using both prevents an owner from updating a visible row and changing owner_id to another user.",
        ],
        code: {
          title: "Owner update policy",
          code: lines(
            'create policy "owners can update projects"',
            "on public.projects",
            "for update",
            "to authenticated",
            "using ((select auth.uid()) = owner_id)",
            "with check ((select auth.uid()) = owner_id);",
          ),
        },
      },
      {
        title: "Keep administrative access server-side",
        paragraphs: [
          "Do not solve administration by placing the service role key in a browser. It can bypass RLS. Put privileged operations behind trusted server code, verify the caller there, and keep the key outside generated client bundles and logs.",
          "For app-level administrators who should still pass through RLS, store a reviewed role claim or membership record and write a policy for that narrow capability. Avoid mutable user metadata that users can edit themselves.",
        ],
      },
      {
        title: "Test denial, not only success",
        paragraphs: [
          "Create two test users and seed one owned project for each. Confirm user A cannot read, update, or delete user B's project; cannot insert a row owned by B; and gains exactly the intended access after a membership row is added.",
          <>
            Inspect the underlying tables through the{" "}
            <Link href="/blog/connect-postgresgui-to-supabase">
              Supabase connection guide
            </Link>
            , but test browser-facing behavior with authenticated Supabase
            clients so the same JWT claims are present as in the application.
          </>,
        ],
      },
    ],
  },

  "postgres-hybrid-search-pgvector": {
    intro:
      "Keyword and vector search fail in different ways. Full-text search handles exact product names, codes, and rare terms. Embeddings can find conceptually similar text even when the words differ. Hybrid search retrieves candidates from both and combines their ranks.",
    answer:
      "Keep a tsvector column and a vector column on the same document row. Retrieve a limited candidate set from each index, apply the same tenant and visibility filters, combine ranks with reciprocal-rank fusion, and measure the final results against labeled queries.",
    codeBlocks: [
      {
        title: "Store text-search and vector data together",
        code: lines(
          "create extension if not exists vector;",
          "",
          "create table documents (",
          "  id bigint generated always as identity primary key,",
          "  tenant_id bigint not null,",
          "  title text not null,",
          "  body text not null,",
          "  search_text tsvector generated always as (",
          "    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||",
          "    setweight(to_tsvector('english', coalesce(body, '')), 'B')",
          "  ) stored,",
          "  embedding vector(1536)",
          ");",
          "",
          "create index documents_search_text_idx",
          "  on documents using gin (search_text);",
        ),
        note: "Match the vector dimension to the embedding model you actually use. Changing dimensions later requires a migration or a new column.",
      },
    ],
    sections: [
      {
        title: "Build the keyword candidate set",
        paragraphs: [
          "websearch_to_tsquery accepts familiar quoted phrases, minus terms, and plain words. ts_rank_cd produces a score you can sort before assigning a simple row number for fusion.",
        ],
        code: {
          title: "Rank full-text candidates",
          code: lines(
            "select",
            "  id,",
            "  row_number() over (",
            "    order by ts_rank_cd(search_text, websearch_to_tsquery('english', $1)) desc",
            "  ) as keyword_rank",
            "from documents",
            "where tenant_id = $2",
            "  and search_text @@ websearch_to_tsquery('english', $1)",
            "limit 50;",
          ),
        },
      },
      {
        title: "Build the semantic candidate set",
        paragraphs: [
          "Use the same tenant and authorization filter on the vector side. Ordering by cosine distance with the matching operator class lets pgvector use an HNSW or IVFFlat index when the planner considers it worthwhile.",
        ],
        code: {
          title: "Rank vector candidates",
          code: lines(
            "select",
            "  id,",
            "  row_number() over (order by embedding <=> $1::vector) as semantic_rank",
            "from documents",
            "where tenant_id = $2",
            "order by embedding <=> $1::vector",
            "limit 50;",
          ),
        },
      },
      {
        title: "Fuse ranks instead of raw scores",
        paragraphs: [
          "Text rank and vector distance are not on the same scale. Reciprocal-rank fusion avoids pretending they are. It rewards documents that rank near the top of either list and gives an extra lift to documents present in both.",
        ],
        code: {
          title: "Reciprocal-rank fusion",
          code: lines(
            "with keyword as (",
            "  -- keyword query, returning id and keyword_rank",
            "), semantic as (",
            "  -- vector query, returning id and semantic_rank",
            ")",
            "select",
            "  coalesce(keyword.id, semantic.id) as id,",
            "  coalesce(1.0 / (60 + keyword.keyword_rank), 0) +",
            "  coalesce(1.0 / (60 + semantic.semantic_rank), 0) as score",
            "from keyword",
            "full join semantic using (id)",
            "order by score desc",
            "limit 20;",
          ),
          note: "The constant 60 is a common starting point, not a universal optimum. Tune candidate counts and fusion against labeled queries.",
        },
      },
      {
        title: "Filter before results leave PostgreSQL",
        paragraphs: [
          "Tenant, status, language, and visibility rules should be inside both candidate queries. Filtering only after fusion can leak identifiers, waste candidate slots, and produce poor recall for users with narrow access.",
          "Filtered approximate vector search can return too few rows because the index retrieves neighbors before the filter removes them. pgvector iterative scans and higher search parameters can help, but partitioning or exact search may be better for very selective filters.",
        ],
      },
      {
        title: "Evaluate search with real questions",
        paragraphs: [
          "Build a small set of queries with expected relevant documents. Compare keyword-only, vector-only, and hybrid results. Record recall, latency, and failure cases such as identifiers, misspellings, and ambiguous natural-language questions.",
          <>
            Use the{" "}
            <Link href="/blog/pgvector-hnsw-vs-ivfflat">
              HNSW versus IVFFlat comparison
            </Link>{" "}
            before choosing an approximate index. The index is only one part of
            search quality; embedding choice and ranking evaluation matter just
            as much.
          </>,
        ],
      },
    ],
  },
  "find-slow-postgresql-queries-pg-stat-statements": {
    intro:
      "A slow-query log tells you which individual executions crossed a threshold. pg_stat_statements answers a different question: which normalized query patterns consumed the most database time across many executions.",
    answer:
      "Enable pg_stat_statements, capture a representative interval, and rank queries by total execution time first. Then compare mean time, calls, rows, and block activity before opening the original SQL with EXPLAIN ANALYZE.",
    codeBlocks: [
      {
        title: "Enable the extension on a self-managed server",
        code: lines(
          "# postgresql.conf",
          "shared_preload_libraries = 'pg_stat_statements'",
          "",
          "# Restart PostgreSQL, then run:",
          "create extension if not exists pg_stat_statements;",
        ),
        note: "shared_preload_libraries requires a server restart. Managed providers may preload or expose the extension through their own settings.",
      },
      {
        title: "Find the largest cumulative cost",
        code: lines(
          "select",
          "  queryid,",
          "  calls,",
          "  round(total_exec_time::numeric, 1) as total_ms,",
          "  round(mean_exec_time::numeric, 1) as mean_ms,",
          "  rows,",
          "  shared_blks_read,",
          "  shared_blks_hit,",
          "  query",
          "from pg_stat_statements",
          "where calls > 0",
          "order by total_exec_time desc",
          "limit 20;",
        ),
      },
    ],
    sections: [
      {
        title: "Start with total time, then change the question",
        paragraphs: [
          "A query that averages 8 milliseconds but runs ten million times can cost more than a report that takes three seconds once a day. Total execution time finds cumulative load. Mean execution time finds painful individual calls. Call count explains how those two measures interact.",
          "Do not optimize solely by rank. Tie each query to an application path, business importance, and acceptable latency before changing SQL or indexes.",
        ],
      },
      {
        title: "Use buffers as a clue",
        paragraphs: [
          "shared_blks_read counts blocks read into shared buffers. shared_blks_hit counts requests satisfied there. High reads can point to large scans or a working set that does not stay cached; high hits can still represent excessive CPU and repeated memory work.",
          "The counters are cumulative for the tracked entry. Divide by calls for a rough per-execution view, but remember that workloads and cache state change during the interval.",
        ],
        code: {
          title: "Compare work per call",
          code: lines(
            "select",
            "  queryid,",
            "  calls,",
            "  round((total_exec_time / calls)::numeric, 2) as ms_per_call,",
            "  round((shared_blks_read::numeric / calls), 2) as reads_per_call,",
            "  round((shared_blks_hit::numeric / calls), 2) as hits_per_call,",
            "  query",
            "from pg_stat_statements",
            "where calls >= 100",
            "order by reads_per_call desc",
            "limit 20;",
          ),
        },
      },
      {
        title: "Know when statistics started",
        paragraphs: [
          "Results are meaningful only with a known observation window. Server restarts, extension resets, entry eviction, deployments, and traffic changes can all alter the sample. Record the reset time with every exported report.",
          "Use pg_stat_statements_reset() only when you intentionally want a new baseline and have permission to discard the existing history. A weekly comparison is usually more useful than clearing the view whenever a query changes.",
        ],
      },
      {
        title: "Move from a query pattern to a plan",
        paragraphs: [
          "pg_stat_statements normalizes literal values, so copy the query and substitute representative parameters. Use EXPLAIN without ANALYZE first for writes. For reads, EXPLAIN (ANALYZE, BUFFERS) shows where estimates, loops, and block activity diverge.",
          <>
            Follow the{" "}
            <Link href="/blog/explain-analyze-postgres">
              EXPLAIN ANALYZE reading guide
            </Link>{" "}
            and save the before-and-after plans with the SQL change.
          </>,
        ],
      },
      {
        title: "Keep query text exposure in mind",
        paragraphs: [
          "The view contains normalized SQL text and can reveal table names and application behavior. PostgreSQL restricts some fields based on privileges, but database monitoring access should still be treated as sensitive.",
          "Use an administrative connection, avoid publishing raw query exports, and remove comments or identifiers that contain customer or operational information.",
        ],
      },
    ],
  },

  "postgresql-connection-pooling": {
    intro:
      "A PostgreSQL connection is a server process with authentication and session state. Poolers reduce the number of server connections, but the pooling mode determines which state survives between statements and transactions.",
    answer:
      "Use direct connections or session pooling for interactive database clients. Use transaction pooling for short application transactions only after checking prepared statements, temporary tables, LISTEN, advisory locks, and session-level settings.",
    codeBlocks: [
      {
        title: "Identify the session you actually reached",
        code: lines(
          "select",
          "  pg_backend_pid() as backend_pid,",
          "  current_database() as database_name,",
          "  current_user,",
          "  inet_server_addr() as server_address,",
          "  inet_server_port() as server_port;",
          "",
          "show application_name;",
          "show search_path;",
        ),
        note: "Run this in separate transactions. A changing backend PID can be expected with transaction pooling, while a stable direct or session-pooled connection keeps one backend for the client session.",
      },
    ],
    sections: [
      {
        title: "Direct connections preserve the full session",
        paragraphs: [
          "A direct client connects to a PostgreSQL backend and keeps it until disconnect. Temporary tables, prepared statements, SET values, LISTEN registrations, advisory locks, and transaction state all belong to that session.",
          "The cost is one backend per active connection. That is reasonable for a handful of developer tools, but a bursty application can exhaust max_connections or spend too much memory on idle sessions.",
        ],
      },
      {
        title: "Session pooling reuses connections between clients",
        paragraphs: [
          "A session pool gives one server connection to a client for the duration of its client session, then returns it to the pool. Most session behavior works normally while the client is attached.",
          "This mode fits tools that expect a stable session but still need a pool in front of the database. Capacity savings are smaller when many client sessions remain open and idle.",
        ],
      },
      {
        title: "Transaction pooling trades state for density",
        paragraphs: [
          "A transaction pool returns the server connection after each transaction. The next transaction may use another backend. That lets many clients share fewer PostgreSQL processes, which is useful for serverless functions and short web requests.",
          "Session-scoped behavior needs special care. Some poolers support protocol-level prepared statements, but SQL PREPARE, temporary objects, SET without SET LOCAL, LISTEN, and session advisory locks do not become transaction-scoped simply because a pooler is present.",
        ],
      },
      {
        title: "Read the provider URL instead of guessing",
        paragraphs: [
          "Supabase commonly exposes a direct endpoint, a session pooler on port 5432, and a transaction pooler on port 6543. Neon distinguishes pooled hostnames with -pooler. Provider behavior and connection strings can change, so copy the current URL from the project dashboard.",
          <>
            The{" "}
            <Link href="/blog/connect-postgresgui-to-supabase">
              Supabase guide
            </Link>{" "}
            and <Link href="/blog/connect-postgresgui-to-neon">Neon guide</Link>{" "}
            show the connection fields for an interactive Mac client.
          </>,
        ],
      },
      {
        title: "Match the pool to the workload",
        paragraphs: [
          "Inventory session features before changing an existing application. Run integration tests through the exact pool endpoint, with concurrent traffic and connection recycling. A health check that only runs SELECT 1 will not reveal broken session assumptions.",
          "For PostgresGUI, psql, migrations, and administrative work, choose a stable direct or session connection. For high-concurrency stateless request handlers, transaction pooling is often the better starting point.",
        ],
      },
    ],
  },
  "postgresql-18-skip-scan": {
    intro:
      "Before PostgreSQL 18, a multicolumn B-tree index was often unattractive when a query omitted an equality condition on the leading column. Skip scan lets the planner perform repeated searches for distinct leading values when that is cheaper than reading the whole table.",
    answer:
      "Skip scan helps most when the omitted leading column has few distinct values and the later-column condition is selective. It is a planner option, not a replacement for a purpose-built index. Measure the actual plan and buffers on representative data.",
    codeBlocks: [
      {
        title: "Create a table where skip scan can be useful",
        code: lines(
          "create table orders (",
          "  id bigint generated always as identity primary key,",
          "  region text not null,",
          "  created_at timestamptz not null,",
          "  total numeric(12, 2) not null",
          ");",
          "",
          "create index orders_region_created_at_idx",
          "  on orders (region, created_at);",
          "",
          "analyze orders;",
          "",
          "explain (analyze, buffers)",
          "select id, region, created_at, total",
          "from orders",
          "where created_at >= now() - interval '1 day'",
          "order by created_at desc;",
        ),
        note: "Populate enough representative rows and realistic region values before comparing plans. Tiny development tables usually favor a sequential scan.",
      },
    ],
    sections: [
      {
        title: "Why the leading column still matters",
        paragraphs: [
          "A B-tree on (region, created_at) is naturally efficient for a query with region = 'us-east' and a created_at range. The index can jump directly to one contiguous portion of the tree.",
          "Without a region condition, PostgreSQL 18 can sometimes search once for each region value and apply the created_at condition within each group. That is attractive when there are only a few regions and the date range returns a small fraction of rows.",
        ],
      },
      {
        title: "Do not look for a Skip Scan node",
        paragraphs: [
          "The plan can still be labeled Index Scan or Index Only Scan. Skip scan describes how PostgreSQL uses the B-tree internally. Use the chosen index, index conditions, actual rows, loops, execution time, and buffer counts to judge it.",
          "Compare with enable_indexscan disabled only as a diagnostic experiment, never as an application setting. Planner switches help you understand alternatives; they are not a durable tuning strategy.",
        ],
        code: {
          title: "Compare against a non-index plan in one transaction",
          code: lines(
            "begin;",
            "set local enable_indexscan = off;",
            "set local enable_indexonlyscan = off;",
            "",
            "explain (analyze, buffers)",
            "select id, region, created_at, total",
            "from orders",
            "where created_at >= now() - interval '1 day';",
            "",
            "rollback;",
          ),
        },
      },
      {
        title: "Know when another index is better",
        paragraphs: [
          "If region has thousands of distinct values, repeated probes can cost more than a sequential scan. If the created_at query is central to the application, an index beginning with created_at is more direct and easier to reason about.",
          "Every additional index increases storage and write work. Compare query frequency and latency improvement with insert, update, vacuum, and cache costs before keeping both indexes.",
        ],
      },
      {
        title: "Statistics decide whether the option is visible",
        paragraphs: [
          "The planner needs a credible estimate of distinct leading values and result selectivity. Run ANALYZE after loading representative data. Raise a column's statistics target only when the default sample does not describe important skew well enough.",
          "Extended statistics can help with correlated columns, but they do not make every multicolumn index shape correct. Keep the query, data distribution, and index order in the same investigation.",
        ],
      },
      {
        title: "Save the before-and-after plans",
        paragraphs: [
          <>
            Capture PostgreSQL 17 and 18 plans for the same restored dataset, or
            compare the candidate indexes on PostgreSQL 18. The{" "}
            <Link href="/blog/explain-analyze-postgres">
              EXPLAIN ANALYZE guide
            </Link>{" "}
            explains how to read row estimates, loops, and buffers without
            treating every sequential scan as a failure.
          </>,
        ],
      },
    ],
  },

  "pgvector-hnsw-vs-ivfflat": {
    intro:
      "HNSW and IVFFlat are approximate-nearest-neighbor indexes with different build, memory, update, and recall behavior. A benchmark copied from another machine cannot tell you which one fits your vectors, filters, hardware, and latency target.",
    answer:
      "Measure exact search first, then build each approximate index separately on the same loaded dataset. Use identical query vectors and filters, record recall against exact top-k results, and compare build time, index size, latency percentiles, and write behavior.",
    codeBlocks: [
      {
        title: "Create the two candidate index definitions",
        code: lines(
          "-- Test one index at a time.",
          "create index documents_embedding_hnsw_idx",
          "  on documents using hnsw (embedding vector_cosine_ops)",
          "  with (m = 16, ef_construction = 64);",
          "",
          "create index documents_embedding_ivfflat_idx",
          "  on documents using ivfflat (embedding vector_cosine_ops)",
          "  with (lists = 100);",
        ),
        note: "Do not leave both indexes present during the comparison. PostgreSQL may choose either, and both consume storage and write work.",
      },
    ],
    sections: [
      {
        title: "Establish exact-search ground truth",
        paragraphs: [
          "Run the chosen query vectors without an approximate index and save the exact top-k document IDs. This is the reference used to calculate recall. If exact search already meets the latency target, an approximate index may add complexity without useful benefit.",
          "Use real query vectors rather than randomly generated vectors alone. Production queries can cluster differently from stored documents and expose failures that a synthetic uniform sample misses.",
        ],
        code: {
          title: "Exact cosine-distance search",
          code: lines(
            "select id, embedding <=> $1::vector as distance",
            "from documents",
            "where tenant_id = $2",
            "order by embedding <=> $1::vector",
            "limit 20;",
          ),
          note: "Run this before creating an HNSW or IVFFlat index, or in a controlled session where approximate index scans are disabled.",
        },
      },
      {
        title: "Build after loading representative data",
        paragraphs: [
          "HNSW can be created without a training step and handles ongoing inserts well, but construction can use substantial time and memory. IVFFlat should be built after the table contains representative data because it partitions the existing vectors into lists.",
          "Record elapsed build time, peak memory pressure, and pg_relation_size for each index. A fast query index that makes deployment or recovery impractical is not automatically the better choice.",
        ],
      },
      {
        title: "Tune the query-side controls",
        paragraphs: [
          "HNSW recall and latency are influenced by hnsw.ef_search. IVFFlat uses ivfflat.probes. Higher values inspect more candidates and usually improve recall at a latency cost. Set them locally inside a transaction so pooled connections do not inherit accidental session state.",
        ],
        code: {
          title: "Test search parameters locally",
          code: lines(
            "begin;",
            "set local hnsw.ef_search = 100;",
            "-- Or, for the IVFFlat run:",
            "-- set local ivfflat.probes = 10;",
            "",
            "select id",
            "from documents",
            "order by embedding <=> $1::vector",
            "limit 20;",
            "rollback;",
          ),
        },
      },
      {
        title: "Include filters and writes in the test",
        paragraphs: [
          "A global nearest-neighbor query can look excellent while a tenant or category filter returns too few relevant rows. Repeat the benchmark with the same filters used by the application and watch the plan with EXPLAIN ANALYZE.",
          "Insert and update a realistic batch after index creation. HNSW generally tolerates changing data more naturally. IVFFlat centroids can become less representative as the dataset drifts, so recall should be monitored over time.",
        ],
      },
      {
        title: "Choose from recorded tradeoffs",
        paragraphs: [
          "HNSW is often the practical default when query recall matters and the dataset changes. IVFFlat remains useful when build time or memory is constrained and the data is large and relatively stable. Small tables may need neither.",
          <>
            If the application also searches text, test the index inside the{" "}
            <Link href="/blog/postgres-hybrid-search-pgvector">
              hybrid-search pipeline
            </Link>{" "}
            rather than optimizing vector latency in isolation.
          </>,
        ],
      },
    ],
  },
  "postgresql-rls-performance": {
    intro:
      "Row-level security adds policy expressions to queries before rows are returned or changed. A simple indexed equality can be cheap. Repeated functions, unindexed membership checks, and complex joins can make the same policy expensive on a large table.",
    answer:
      "Measure the query as a role subject to RLS. Index columns used by the policy, wrap stable request values in scalar subqueries when appropriate, keep membership lookups selective, and compare EXPLAIN ANALYZE plans before and after each change.",
    codeBlocks: [
      {
        title: "Add the index the ownership policy expects",
        code: lines(
          "create index projects_owner_id_idx",
          "  on public.projects (owner_id);",
          "",
          'create policy "owners read projects"',
          "on public.projects",
          "for select",
          "to authenticated",
          "using (owner_id = (select auth.uid()));",
        ),
        note: "The useful index depends on the policy and query together. A policy index does not replace indexes needed for ORDER BY, joins, or additional filters.",
      },
    ],
    sections: [
      {
        title: "Test as the affected role",
        paragraphs: [
          "Table owners normally bypass RLS, as can roles with BYPASSRLS. An administrative EXPLAIN may therefore omit the policy that makes the application query slow. Reproduce the application role, claims, parameters, and result size.",
          "Use a staging database or a read-only transaction when running EXPLAIN ANALYZE. The command executes the query, including writes when the statement is an INSERT, UPDATE, DELETE, or MERGE.",
        ],
      },
      {
        title: "Avoid repeated request-function work",
        paragraphs: [
          "In Supabase policies, wrapping auth.uid() in SELECT can allow PostgreSQL to evaluate it as an initialization plan once per statement. Without that shape, the function may be invoked for every candidate row.",
          "This is appropriate for a value that remains stable for the statement. It is not a blanket rule for arbitrary functions, especially volatile functions whose result is meant to change per row.",
        ],
        code: {
          title: "Prefer one statement-level identity value",
          code: lines(
            "-- Repeated for candidate rows:",
            "using (auth.uid() = owner_id);",
            "",
            "-- Available as an initialization plan:",
            "using ((select auth.uid()) = owner_id);",
          ),
        },
      },
      {
        title: "Keep membership checks narrow",
        paragraphs: [
          "A team policy commonly checks project_members for project_id and user_id. A composite primary key or index supporting that pair avoids scanning membership rows for every project.",
          "If a policy joins several tables, consider whether a carefully reviewed security-definer function can perform a small indexed lookup. Pin its search_path, qualify object names, revoke unnecessary EXECUTE privileges, and keep the function's responsibility narrow.",
        ],
      },
      {
        title: "Separate policy filtering from application filtering",
        paragraphs: [
          "The application should still filter by tenant or owner when it knows the value. RLS remains the security boundary, while the explicit predicate gives the planner more context and reduces candidate rows earlier.",
          "Do not remove RLS because the application query has a WHERE clause. Application bugs and direct API access are exactly why the database policy exists.",
        ],
      },
      {
        title: "Read the complete plan",
        paragraphs: [
          "Look for row-estimate errors, scans repeated under nested loops, filters that remove most rows late, and membership subplans executed many times. Compare actual rows multiplied by loops, not only the top-level execution time.",
          <>
            Use the{" "}
            <Link href="/blog/explain-analyze-postgres">
              EXPLAIN ANALYZE guide
            </Link>{" "}
            for plan reading and the{" "}
            <Link href="/blog/supabase-rls-examples">
              Supabase RLS examples
            </Link>{" "}
            for complete policy shapes.
          </>,
        ],
      },
    ],
  },

  "postgresql-temporal-constraints": {
    intro:
      "Applications often model availability with a start timestamp, an end timestamp, and code that checks for collisions. Concurrent transactions can both pass that check. PostgreSQL 18 can express non-overlapping ranges as a database constraint.",
    answer:
      "Store the time span in a range type and put it last in a UNIQUE or PRIMARY KEY constraint with WITHOUT OVERLAPS. Use a PERIOD foreign key when a referencing row must be covered for its complete duration by rows in the parent table.",
    codeBlocks: [
      {
        title: "Prevent overlapping room bookings",
        code: lines(
          "create extension if not exists btree_gist;",
          "",
          "create table room_bookings (",
          "  booking_id bigint generated always as identity,",
          "  room_id bigint not null,",
          "  reserved_at tstzrange not null,",
          "  guest_name text not null,",
          "  primary key (room_id, reserved_at without overlaps),",
          "  unique (booking_id)",
          ");",
        ),
        note: "The scalar room_id needs GiST equality support from btree_gist. Empty ranges are not allowed in a WITHOUT OVERLAPS key.",
      },
    ],
    sections: [
      {
        title: "Choose range boundaries deliberately",
        paragraphs: [
          "A half-open range such as [start, end) includes the start and excludes the end. That lets one booking end at 11:00 and the next begin at 11:00 without overlap. Closed ranges would make those two bookings collide.",
          "Use tstzrange when the instants represent real-world times across time zones. Use daterange for whole-day periods and tsrange only when a timestamp without time zone is genuinely the domain value.",
        ],
        code: {
          title: "Insert adjacent, non-overlapping bookings",
          code: lines(
            "insert into room_bookings (room_id, reserved_at, guest_name)",
            "values",
            "  (7, tstzrange('2026-08-01 10:00Z', '2026-08-01 11:00Z', '[)'), 'Ada'),",
            "  (7, tstzrange('2026-08-01 11:00Z', '2026-08-01 12:00Z', '[)'), 'Linus');",
          ),
        },
      },
      {
        title: "Let the constraint reject races",
        paragraphs: [
          "WITHOUT OVERLAPS is enforced by a GiST-backed constraint. Two concurrent inserts cannot both create overlapping ranges for the same scalar key and commit successfully.",
          "Keep a friendly preflight check in the application if it improves the form, but treat the database error as a normal concurrency outcome and translate it into a useful message.",
        ],
        code: {
          title: "This conflicting booking fails",
          code: lines(
            "insert into room_bookings (room_id, reserved_at, guest_name)",
            "values (",
            "  7,",
            "  tstzrange('2026-08-01 10:30Z', '2026-08-01 11:30Z', '[)'),",
            "  'Grace'",
            ");",
          ),
        },
      },
      {
        title: "Use PERIOD for complete time coverage",
        paragraphs: [
          "A temporal foreign key compares ordinary key columns for equality and requires the parent's combined PERIOD ranges to cover the child's entire range. The referenced key must end with a range column declared WITHOUT OVERLAPS.",
          "This is useful for assignments that must fall inside an employee's active contract periods or prices that must be covered by a product's valid catalog periods. Temporal foreign keys have restrictions on referential actions, so check the PostgreSQL 18 CREATE TABLE documentation before choosing cascades.",
        ],
        code: {
          title: "Temporal foreign-key shape",
          code: lines(
            "foreign key (employee_id, period active_at)",
            "  references employee_contracts",
            "  (employee_id, period active_at)",
          ),
        },
      },
      {
        title: "Migrate existing start and end columns carefully",
        paragraphs: [
          "Add a range column, backfill it with the intended boundary convention, reject invalid or empty periods, and query for existing overlaps before adding the constraint. Existing dirty data will prevent the key from being created.",
          "Keep the old columns only if another interface still requires them. Two independent representations of the same time span can drift unless one is generated from the other.",
        ],
      },
      {
        title: "Model the rule where every writer sees it",
        paragraphs: [
          <>
            A schema constraint protects migrations, background jobs,
            scripts,\n+ APIs, and manual edits. Use the{" "}
            <Link href="/schema-designer">PostgreSQL schema designer</Link> to
            sketch the tables, then keep the final temporal constraint in\n+
            version-controlled SQL migrations.\n+{" "}
          </>,
        ],
      },
    ],
  },
  "postgresql-14-end-of-life-upgrade": {
    intro:
      "PostgreSQL 14 reaches its final community release on November 12, 2026. The database will not stop running that day, but routine bug and security fixes from the PostgreSQL project will end.",
    answer:
      "Inventory the cluster now, choose pg_upgrade or dump-and-restore, verify every extension on PostgreSQL 18, rehearse with a copy of production data, and define validation and rollback before scheduling the cutover.",
    codeBlocks: [
      {
        title: "Capture a basic upgrade inventory",
        code: lines(
          "select version();",
          "",
          "select extname, extversion",
          "from pg_extension",
          "order by extname;",
          "",
          "select datname, pg_size_pretty(pg_database_size(datname))",
          "from pg_database",
          "where datallowconn",
          "order by pg_database_size(datname) desc;",
          "",
          "select rolname, rolcanlogin, rolsuper, rolreplication",
          "from pg_roles",
          "order by rolname;",
        ),
        note: "Also inventory operating-system packages, collations, tablespaces, replication slots, publications, subscriptions, backup jobs, and client drivers.",
      },
    ],
    sections: [
      {
        title: "Choose the migration mechanism",
        paragraphs: [
          "pg_upgrade reuses or links the existing data files and is usually the fastest path for a large self-managed cluster. It requires old and new server binaries plus compatible extension libraries on the same machine.",
          "Dump-and-restore rewrites the logical database into a fresh cluster. It is slower and needs more temporary storage, but it can clean up physical layout and is easier to move across machines or operating systems. Logical replication can reduce cutover time at the cost of a more involved migration.",
        ],
      },
      {
        title: "Resolve extension and collation risks first",
        paragraphs: [
          "List every extension and confirm that a PostgreSQL 18 build exists for the destination platform. An extension installed with CREATE EXTENSION may still depend on operating-system packages that pg_dump cannot carry.",
          "Check locale and collation versions on the destination. Changes in libc or ICU can require REINDEX so indexes use the same ordering rules as the new environment.",
        ],
      },
      {
        title: "Rehearse with production-shaped data",
        paragraphs: [
          "A schema-only test misses the time required to copy or link files, rebuild extension objects, analyze tables, and warm important caches. Use a recent backup or storage snapshot and record every command, duration, warning, and manual correction.",
          "Run pg_upgrade --check before the rehearsal and again before cutover. For dump-and-restore, test the exact pg_dump and pg_restore flags, parallelism, object ownership, and role creation order.",
        ],
        code: {
          title: "Run the compatibility check before pg_upgrade",
          code: lines(
            "/path/to/postgresql-18/bin/pg_upgrade \\",
            "  --check \\",
            "  --old-bindir=/path/to/postgresql-14/bin \\",
            "  --new-bindir=/path/to/postgresql-18/bin \\",
            "  --old-datadir=/path/to/pg14-data \\",
            "  --new-datadir=/path/to/pg18-data",
          ),
          note: "Use paths and service controls appropriate to your installation. Read the generated log files rather than treating a zero exit code as the whole validation.",
        },
      },
      {
        title: "Define cutover and rollback together",
        paragraphs: [
          "Specify when writes stop, how final changes are captured, how clients move to the new port or endpoint, and who decides to roll back. A rollback plan must account for writes accepted by PostgreSQL 18 after cutover; the old PostgreSQL 14 cluster will not contain them automatically.",
          "Keep a verified backup independent of the old data directory. If pg_upgrade uses --link, starting the new cluster changes linked files and removes the old cluster as a clean rollback target.",
        ],
      },
      {
        title: "Validate behavior, not only row counts",
        paragraphs: [
          "Compare database sizes, important table counts, constraints, sequences, extension versions, permissions, scheduled jobs, replication, and application smoke tests. Run ANALYZE and compare plans for latency-sensitive queries.",
          <>
            Review the{" "}
            <Link href="/blog/best-postgresql-backup-solution">
              PostgreSQL backup guide
            </Link>{" "}
            before the rehearsal. A major upgrade is not the moment to discover
            that the restore procedure was never tested.
          </>,
        ],
      },
    ],
  },

  "postgresql-generated-columns": {
    intro:
      "A generated column derives its value from other columns in the same row. PostgreSQL 18 adds virtual generated columns and makes VIRTUAL the default when the table definition does not specify VIRTUAL or STORED.",
    answer:
      "Use VIRTUAL when the expression is cheap and avoiding stored data matters. Use STORED when reads or indexes should not repeatedly compute the expression, when logical replication needs the generated value, or when the expression relies on permitted user-defined immutable functions or types.",
    codeBlocks: [
      {
        title: "Compare virtual and stored definitions",
        code: lines(
          "create table order_lines (",
          "  id bigint generated always as identity primary key,",
          "  quantity integer not null check (quantity > 0),",
          "  unit_price numeric(12, 2) not null,",
          "  discount numeric(12, 2) not null default 0,",
          "  subtotal numeric(12, 2) generated always as (",
          "    quantity * unit_price",
          "  ) virtual,",
          "  total numeric(12, 2) generated always as (",
          "    quantity * unit_price - discount",
          "  ) stored",
          ");",
        ),
      },
    ],
    sections: [
      {
        title: "Virtual values are computed on read",
        paragraphs: [
          "A virtual generated column occupies no per-row storage for its value. PostgreSQL computes it when the column is read. That fits simple arithmetic, normalization, and presentation values that are not expensive to calculate.",
          "PostgreSQL 18 restricts virtual expressions to built-in immutable functions and types. The expression cannot use user-defined functions or types, even indirectly through an operator or cast.",
        ],
      },
      {
        title: "Stored values move work to writes",
        paragraphs: [
          "A stored generated column is calculated during INSERT or UPDATE and written with the row. Reads avoid recalculation, but writes and storage pay the cost. Stored expressions can use immutable user-defined functions and types that virtual columns cannot.",
          "A generated column cannot be written directly and cannot refer to another generated column. It can only use the current row, so cross-table totals and time-dependent values need another design.",
        ],
      },
      {
        title: "Indexes change the tradeoff",
        paragraphs: [
          "An index stores its own key values, so indexing an expression or generated value moves work into index maintenance. Compare a generated column plus index with a direct expression index; the simpler schema depends on whether queries also need to select the derived value.",
          "Use EXPLAIN to verify that the query expression matches the indexed definition. Small differences in casts or functions can prevent the intended index from matching.",
        ],
        code: {
          title: "Index the derived total",
          code: lines(
            "create index order_lines_total_idx",
            "  on order_lines (total);",
            "",
            "explain",
            "select id, total",
            "from order_lines",
            "where total >= 1000;",
          ),
        },
      },
      {
        title: "Check replication and privileges",
        paragraphs: [
          "PostgreSQL 18 can logically replicate stored generated columns. Virtual values are computed at the subscriber when read and are not published as stored column values.",
          "Generated columns have separate column privileges. A role can be allowed to read the derived value without receiving permission to select every underlying column, but expression functions still execute with their own security rules.",
        ],
      },
      {
        title: "Migrate without changing meaning",
        paragraphs: [
          "When replacing a trigger-maintained column, compare old and generated values for every row before dropping the trigger. Confirm rounding, null handling, collation, and casts. Numeric expressions deserve explicit types when financial behavior matters.",
          <>
            Sketch the revised table in the{" "}
            <Link href="/schema-designer">schema designer</Link> and keep the
            final GENERATED expression in a migration. Generated columns are a
            schema contract, not a substitute for documenting the business rule
            they encode.
          </>,
        ],
      },
    ],
  },
  "postgresql-oauth-authentication": {
    intro:
      "PostgreSQL 18 adds OAuth bearer-token authentication to the server and libpq, but it does not provide an authorization server. A deployment still needs an OAuth provider, a server-side validator module, identity mapping, and compatible clients.",
    answer:
      "Treat PostgreSQL OAuth as an authentication integration, not a switch. Validate the issuer and scopes, load a trusted validator, map external identities to narrow database roles, test psql with a compatible libpq build, and keep password or certificate access available during rollout.",
    codeBlocks: [
      {
        title: "The pg_hba.conf rule names the OAuth contract",
        code: lines(
          "hostssl app_db all 10.0.0.0/8 oauth \\",
          '  issuer="https://login.example.com/tenant" \\',
          '  scope="postgres.connect" \\',
          "  validator=my_validator \\",
          "  map=oauth_users",
        ),
        note: "This is a configuration shape, not a drop-in provider recipe. The validator library, issuer, discovery document, scopes, certificates, and identity mapping must agree exactly.",
      },
    ],
    sections: [
      {
        title: "Separate the four moving parts",
        paragraphs: [
          "The authorization server issues bearer tokens. libpq or another driver acts as the OAuth client. PostgreSQL is the resource server. A validator module checks the token and provides the authenticated identity.",
          "PostgreSQL does not become an OpenID Connect login application by itself. Provider-specific discovery, client registration, token claims, and user experience still need implementation and testing.",
        ],
      },
      {
        title: "Match the issuer exactly",
        paragraphs: [
          "PostgreSQL sends the configured issuer and scope to the client. libpq requires the server issuer, discovery document issuer, and oauth_issuer client setting to match exactly, including case and formatting.",
          "Use HTTPS, verify the discovery endpoint, and do not accept arbitrary issuers supplied by a connecting client. Issuer confusion can turn a token from the wrong tenant or provider into an authentication path.",
        ],
      },
      {
        title: "Map identities to database roles deliberately",
        paragraphs: [
          "Without a map, the identity returned by the validator must match the requested PostgreSQL role. pg_ident.conf can map external identities to database roles when naming conventions differ.",
          "Avoid mapping every authenticated identity to an owner or superuser role. OAuth proves an identity according to the validator; PostgreSQL privileges still decide what that role can do.",
        ],
        code: {
          title: "Example identity map",
          code: lines(
            "# pg_ident.conf",
            "oauth_users  alice@example.com  app_reader",
            "oauth_users  dba@example.com    app_operator",
          ),
          note: "Use real provider identities and roles designed for the required duties. Reload configuration and test both allowed and denied mappings.",
        },
      },
      {
        title: "Client support is not automatic",
        paragraphs: [
          "psql can use OAuth when linked against a libpq build with OAuth client support. Other tools may use libpq, a different driver, or a custom connection stack. The PostgreSQL server cannot make an older client understand an OAuth challenge.",
          "Check the application's documented driver and flow support before changing pg_hba.conf. PostgresGUI currently supports password and TLS connection workflows; do not assume OAuth support until the app explicitly exposes it.",
        ],
      },
      {
        title: "PostgreSQL 19 continues the client API work",
        paragraphs: [
          "The PostgreSQL 19 draft adds a newer OAuth flow hook with issuer and error details. That matters to client and plugin developers, but PostgreSQL 19 is still beta and the final interface can change.",
          "Roll out OAuth beside an existing method, monitor failed logins, document revocation behavior, and test what happens when the provider is unavailable. Authentication that depends on an external service needs an operational fallback plan.",
        ],
      },
    ],
  },

  "secure-postgresql-ai-agents": {
    intro:
      "AI coding agents can inspect schemas, generate migrations, run tests, and diagnose query plans. They can also execute the wrong statement quickly and repeatedly. Safety has to come from the environment and database, not from asking the model to be careful.",
    answer:
      "Give each agent separate credentials to a disposable or sanitized database. Enforce least privilege, read-only defaults, statement and lock timeouts, result limits, network boundaries, audit labels, and a restore path outside the agent's control.",
    codeBlocks: [
      {
        title: "A conservative role for diagnostic reads",
        code: lines(
          "create role agent_diagnostics login password 'generated-secret';",
          "",
          "grant connect on database app_db to agent_diagnostics;",
          "grant usage on schema public to agent_diagnostics;",
          "grant select on all tables in schema public to agent_diagnostics;",
          "",
          "alter role agent_diagnostics set default_transaction_read_only = on;",
          "alter role agent_diagnostics set statement_timeout = '15s';",
          "alter role agent_diagnostics set lock_timeout = '2s';",
          "alter role agent_diagnostics set idle_in_transaction_session_timeout = '30s';",
          "alter role agent_diagnostics set application_name = 'ai-agent-diagnostics';",
        ),
        note: "A readable application_name makes sessions easier to identify in pg_stat_activity and logs. Use a distinct value and credential per integration.",
      },
    ],
    sections: [
      {
        title: "Prefer a database you can throw away",
        paragraphs: [
          "A local restore, database branch, or sanitized staging copy lets the agent inspect realistic schema and data distribution without reaching live customer records. Reset the environment from a known snapshot after migrations or experiments.",
          "Remove or transform secrets and personal data before copying production. A read-only role still reads whatever its SELECT privileges expose, and model transcripts or tool logs can retain returned values.",
        ],
      },
      {
        title: "Make write access task-specific",
        paragraphs: [
          "Schema changes and data fixes need writes, but they do not need permanent owner access. Create a short-lived credential for one environment, limit its schema privileges, require review for tool calls, and revoke it when the task ends.",
          "Keep backup deletion, credential management, network policy, and production deployment outside the same agent role. Recovery is not a safety net if the actor that made the mistake can also erase it.",
        ],
      },
      {
        title: "Bound time, locks, and result size",
        paragraphs: [
          "statement_timeout stops runaway execution, lock_timeout avoids waiting indefinitely behind production work, and idle_in_transaction_session_timeout closes forgotten transactions. Set limits on the role so they apply even when the client omits them.",
          "The MCP or agent tool should also cap returned rows and truncate oversized values. Database timeouts protect the server; result limits protect the client context and reduce accidental data exposure.",
        ],
        code: {
          title: "Check the active guardrails",
          code: lines(
            "select",
            "  current_user,",
            "  current_setting('transaction_read_only') as read_only,",
            "  current_setting('statement_timeout') as statement_timeout,",
            "  current_setting('lock_timeout') as lock_timeout,",
            "  current_setting('application_name') as application_name;",
          ),
        },
      },
      {
        title: "Audit the database identity, not the prose",
        paragraphs: [
          "Database logs and pg_stat_activity can attribute activity to a login and application_name. They cannot reliably tell whether a human typed the SQL, an agent proposed it, or an MCP server transformed it. Preserve tool-call records alongside database logs when auditability matters.",
          "Rotate credentials and terminate sessions when an integration is removed. Search configuration repositories and secret managers for stale connection strings rather than assuming uninstalling the client revoked access.",
        ],
      },
      {
        title: "Test the failure path",
        paragraphs: [
          "Before granting useful access, ask the integration to perform operations that should be denied: update a row, create a table, read a restricted schema, hold a lock, and run past the timeout. Verify the database blocks each one.",
          <>
            Follow the{" "}
            <Link href="/blog/postgres-mcp-server">
              Postgres MCP server setup
            </Link>{" "}
            for the client-facing workflow. Keep a normal database client
            available for reviewing generated SQL and inspecting the same schema
            without routing every question through an agent.
          </>,
        ],
      },
    ],
  },

  "postgresql-numeric-vs-double-precision": {
    intro:
      "PostgreSQL NUMERIC stores exact decimal values. DOUBLE PRECISION stores an eight-byte, approximate binary floating-point value with about 15 decimal digits of precision. REAL is the four-byte approximate alternative with about six decimal digits of precision.",
    answer:
      "Use NUMERIC for money, rates, and rules where a decimal result must be exact. Use DOUBLE PRECISION for measurements and scientific values where a tiny representation error is acceptable. Do not choose FLOAT by habit: in PostgreSQL, bare FLOAT means DOUBLE PRECISION.",
    codeBlocks: [
      {
        title: "See exact and approximate arithmetic side by side",
        code: lines(
          "select",
          "  0.1::numeric + 0.2::numeric as exact_sum,",
          "  0.1::double precision + 0.2::double precision as approximate_sum,",
          "  (0.1::double precision + 0.2::double precision) = 0.3::double precision",
          "    as floats_are_equal;",
        ),
        note: "The exact sum is 0.3. The floating-point equality can be false because these decimal fractions do not have exact binary representations.",
      },
    ],
    sections: [
      {
        title: "Choose by what an error means",
        paragraphs: [
          "A price of 19.99, a tax rate, and an account balance usually have decimal business rules. Store them as NUMERIC with an intentional scale, such as NUMERIC(12,2) for an amount that may have ten digits before the decimal point and two after it.",
          "A latitude, sensor reading, model score, or physical measurement already has limited accuracy. DOUBLE PRECISION usually fits that model better. It offers a wide exponent range and fixed eight-byte storage, but calculations can produce a nearby value instead of the decimal value you typed.",
        ],
      },
      {
        title: "Set precision and scale deliberately",
        paragraphs: [
          "NUMERIC(precision, scale) constrains stored values. Precision is the total count of significant digits and scale is the number of fractional digits. PostgreSQL rounds to the declared scale, then rejects a value when the digits before the decimal point exceed the remaining capacity.",
          "Unconstrained NUMERIC accepts values of different scales up to PostgreSQL's implementation limits. That flexibility is useful for calculations, but a business column normally benefits from a declared scale or a separate CHECK constraint that states the domain rule.",
        ],
        code: {
          title: "Constrain a decimal amount",
          code: lines(
            "create table invoices (",
            "  id bigint generated always as identity primary key,",
            "  subtotal numeric(12,2) not null check (subtotal >= 0),",
            "  tax_rate numeric(7,6) not null check (tax_rate between 0 and 1)",
            ");",
            "",
            "insert into invoices (subtotal, tax_rate)",
            "values (149.95, 0.082500);",
          ),
        },
      },
      {
        title: "Avoid exact equality for floating-point results",
        paragraphs: [
          "Two DOUBLE PRECISION calculations that should mean the same thing can differ in their last bits. Compare within a tolerance chosen from the domain rather than using equality on a computed result. The tolerance must have a real unit; a universal epsilon is not a substitute for understanding the data.",
        ],
        code: {
          title: "Compare approximate values with a domain tolerance",
          code: lines(
            "select abs(measured_value - expected_value) <= 0.000001 as close_enough",
            "from experiment_results;",
          ),
          note: "This tolerance is only an example. Choose one that matches the measurement resolution and the decisions made from it.",
        },
      },
      {
        title: "Know what FLOAT means in PostgreSQL",
        paragraphs: [
          "REAL and DOUBLE PRECISION are PostgreSQL's direct floating-point types. The SQL spelling FLOAT(p) uses p as minimum binary precision: FLOAT(1) through FLOAT(24) selects REAL, and FLOAT(25) through FLOAT(53) selects DOUBLE PRECISION. FLOAT without p selects DOUBLE PRECISION.",
          "Use the explicit REAL or DOUBLE PRECISION name in schemas when you want the type to be obvious during review. A cast can make literal and expression behavior clear when exact and approximate values meet in one calculation.",
        ],
        code: {
          title: "Inspect the selected PostgreSQL types",
          code: lines(
            "select",
            "  pg_typeof(1.25::float) as bare_float,",
            "  pg_typeof(1.25::float(24)) as float_24,",
            "  pg_typeof(1.25::float(53)) as float_53;",
          ),
        },
      },
      {
        title: "Test rounding and special values",
        paragraphs: [
          "NUMERIC and floating-point types can differ when a value lands exactly on a rounding tie. PostgreSQL NUMERIC rounds ties away from zero, while floating-point rounding depends on the platform and commonly rounds to the nearest even number.",
          <>
            PostgreSQL also supports Infinity, -Infinity, and NaN for floating
            types and unconstrained NUMERIC. Test how your driver serializes
            them before allowing those values in an application column. For
            other schema decisions, use the{" "}
            <Link href="/data-types/numeric">numeric type reference</Link> and
            the <Link href="/sql-cheatsheet">PostgreSQL SQL cheatsheet</Link>.
          </>,
        ],
      },
    ],
  },

  "postgresql-bigint-vs-integer": {
    intro:
      "PostgreSQL INTEGER is a signed four-byte value from -2,147,483,648 to 2,147,483,647. BIGINT is a signed eight-byte value from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. SMALLINT uses two bytes and ranges from -32,768 to 32,767.",
    answer:
      "Use INTEGER for bounded counts and tables that cannot approach 2.1 billion positive IDs. Use BIGINT when imported identifiers, sustained insert volume, or long retention can cross that limit. Pick the range from a growth estimate, not from the current row count alone.",
    codeBlocks: [
      {
        title: "Check integer ranges and sequence headroom",
        code: lines(
          "select",
          "  pg_typeof(id) as id_type,",
          "  max(id) as largest_id,",
          "  2147483647::bigint - max(id)::bigint as integer_ids_remaining",
          "from events",
          "group by pg_typeof(id);",
        ),
        note: "This arithmetic is useful only for an INTEGER ID. Also inspect the sequence value because rolled-back or deleted inserts can consume IDs without increasing max(id).",
      },
    ],
    sections: [
      {
        title: "Start with range and growth",
        paragraphs: [
          "INTEGER allows roughly 2.1 billion positive values when an identity sequence starts at 1. At one million generated IDs per day, that theoretical space lasts a little under six years. At ten thousand per day it lasts centuries. Failed transactions, deleted rows, sequence caching, and manual jumps still consume or skip values.",
          "BIGINT removes that practical ceiling for most applications. Its cost is four additional bytes in every table row that stores the value and in each index entry or foreign-key column that includes it. The total difference matters most on large tables with several indexes and referencing tables.",
        ],
      },
      {
        title: "Use identity columns for generated IDs",
        paragraphs: [
          "INTEGER and BIGINT describe storage and range. Identity describes how PostgreSQL generates a value. Keep those decisions separate: an identity column can use either integer type, and a plain BIGINT does not generate values by itself.",
          <>
            Prefer SQL-standard identity columns for new schemas. The existing{" "}
            <Link href="/postgresql-data-types/serial-vs-identity">
              SERIAL vs identity guide
            </Link>{" "}
            explains ownership, defaults, and migration from older serial
            columns.
          </>,
        ],
        code: {
          title: "Create integer and bigint identity columns",
          code: lines(
            "create table projects (",
            "  id integer generated always as identity primary key,",
            "  name text not null",
            ");",
            "",
            "create table audit_events (",
            "  id bigint generated always as identity primary key,",
            "  project_id integer not null references projects (id),",
            "  payload jsonb not null",
            ");",
          ),
        },
      },
      {
        title: "Monitor the sequence, not just the table",
        paragraphs: [
          "A sequence advances independently of committed rows. INSERT attempts that fail or roll back can leave gaps, and deleting old rows does not return their values. Compare the sequence's current position with the underlying type limit when forecasting exhaustion.",
        ],
        code: {
          title: "Find the sequence and read its current state",
          code: lines(
            "select pg_get_serial_sequence('public.events', 'id') as sequence_name;",
            "",
            "select last_value, is_called",
            "from public.events_id_seq;",
          ),
          note: "pg_get_serial_sequence also works for an identity column despite its historical name. Sequence access requires the appropriate privilege.",
        },
      },
      {
        title: "Plan an INTEGER to BIGINT migration early",
        paragraphs: [
          "PostgreSQL does not widen an overflowing INTEGER automatically. ALTER COLUMN TYPE must account for the main table, its indexes, foreign keys, referencing columns, locks, disk space, replication, and the PostgreSQL version in use. Test the exact operation against a production-sized copy.",
          "For a large busy table, teams often use a staged migration: add BIGINT columns, keep them synchronized, backfill in batches, build replacement indexes, update foreign keys, and switch columns during a short controlled lock. The right process depends on table size and write rate; do not wait until the sequence has only days of headroom.",
        ],
      },
      {
        title: "Map unsigned MySQL integers carefully",
        paragraphs: [
          "PostgreSQL integer types are signed. A MySQL INT UNSIGNED can hold values up to 4,294,967,295, which does not fit in a PostgreSQL INTEGER. BIGINT preserves that range. MySQL BIGINT UNSIGNED can exceed PostgreSQL BIGINT and may require NUMERIC(20), a constraint, or a redesigned identifier strategy.",
          <>
            Audit the actual maximum values before converting a schema. The{" "}
            <Link href="/blog/migrate-mysql-to-postgresql">
              MySQL to PostgreSQL migration guide
            </Link>{" "}
            covers type mapping, pgloader, validation, and cutover checks.
          </>,
        ],
      },
    ],
  },
};

export const trendGuideSlugs = trendBlogPosts.map((post) => post.slug);

export function getTrendGuide(slug: string): TrendGuideContent | undefined {
  return trendGuideContent[slug];
}
