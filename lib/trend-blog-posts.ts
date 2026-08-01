import type { BlogPost } from "@/lib/blog";

export const trendBlogPosts: BlogPost[] = [
  {
    slug: "postgres-mcp-server",
    title: "Postgres MCP Server: A Safe Read-Only Setup",
    description:
      "Connect Claude, Codex, or Cursor to PostgreSQL through an MCP server without giving an AI agent write access to production data.",
    keywords: [
      "postgres mcp server",
      "postgresql mcp server",
      "claude postgres mcp",
      "codex postgres mcp",
      "cursor postgres mcp",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "AI and PostgreSQL",
    pillar: "PostgreSQL Security",
    relatedSlugs: [
      "secure-postgresql-ai-agents",
      "find-slow-postgresql-queries-pg-stat-statements",
      "postgresql-oauth-authentication",
    ],
    faqs: [
      {
        question: "Should a Postgres MCP server have write access?",
        answer:
          "Start with a dedicated PostgreSQL role that only has CONNECT, schema USAGE, and SELECT privileges. Add write access only for a narrow, reviewed workflow on a disposable or isolated database.",
      },
      {
        question:
          "Is the old Model Context Protocol Postgres reference server still maintained?",
        answer:
          "No. The PostgreSQL reference server was moved to the archived MCP servers repository. Choose a maintained implementation and review its access controls before connecting it to a database.",
      },
    ],
    sources: [
      {
        title: "Model Context Protocol archived reference servers",
        url: "https://github.com/modelcontextprotocol/servers-archived",
      },
      {
        title: "Postgres MCP Pro",
        url: "https://github.com/crystaldba/postgres-mcp",
      },
      {
        title: "PostgreSQL role membership and privileges",
        url: "https://www.postgresql.org/docs/current/ddl-priv.html",
      },
    ],
  },
  {
    slug: "postgresql-19-features",
    title: "PostgreSQL 19: What’s New and How to Test the Beta",
    description:
      "A practical look at PostgreSQL 19 Beta 2, including safer Mac testing, compatibility checks, new SQL, monitoring, and performance changes.",
    keywords: [
      "postgresql 19 features",
      "postgres 19 beta",
      "postgresql 19 beta 2",
      "install postgresql 19 mac",
      "postgres 19 release",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL Releases",
    pillar: "PostgreSQL 19",
    relatedSlugs: [
      "postgresql-18-skip-scan",
      "postgresql-14-end-of-life-upgrade",
      "postgresql-oauth-authentication",
    ],
    faqs: [
      {
        question: "Is PostgreSQL 19 ready for production?",
        answer:
          "No. PostgreSQL 19 Beta 2 is a pre-release build intended for testing. The PostgreSQL project warns that beta versions may contain serious bugs and can change before the final release.",
      },
      {
        question: "When is PostgreSQL 19 expected to be released?",
        answer:
          "The PostgreSQL roadmap currently targets September 2026. The exact date can change as beta and release-candidate testing progresses.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL 19 beta information",
        url: "https://www.postgresql.org/developer/beta/",
      },
      {
        title: "PostgreSQL 19 draft release notes",
        url: "https://www.postgresql.org/docs/19/release-19.html",
      },
      {
        title: "PostgreSQL project roadmap",
        url: "https://www.postgresql.org/developer/roadmap/",
      },
    ],
  },
  {
    slug: "supabase-rls-examples",
    title: "Supabase RLS Examples for Users, Teams, and Admins",
    description:
      "Copy and test Supabase row-level security policies for user-owned rows, team membership, inserts, updates, and administrative access.",
    keywords: [
      "supabase rls examples",
      "supabase row level security",
      "supabase rls policy examples",
      "supabase team permissions",
      "postgres rls auth uid",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "Supabase",
    pillar: "PostgreSQL Security",
    relatedSlugs: [
      "connect-postgresgui-to-supabase",
      "postgresql-rls-performance",
      "secure-postgresql-ai-agents",
    ],
    faqs: [
      {
        question: "Does enabling RLS create policies automatically?",
        answer:
          "No. An RLS-enabled table uses default-deny behavior when no applicable policy exists. Create and test policies for each operation your application needs.",
      },
      {
        question: "Should the Supabase service role key be used in a browser?",
        answer:
          "No. The service role can bypass row-level security and belongs only in trusted server-side code or administrative tooling.",
      },
    ],
    sources: [
      {
        title: "Supabase row-level security guide",
        url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
      },
      {
        title: "PostgreSQL CREATE POLICY documentation",
        url: "https://www.postgresql.org/docs/current/sql-createpolicy.html",
      },
      {
        title: "PostgreSQL row security policies",
        url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html",
      },
    ],
  },
  {
    slug: "postgres-hybrid-search-pgvector",
    title: "Hybrid Search in PostgreSQL with Full Text and pgvector",
    description:
      "Build hybrid search in PostgreSQL by combining full-text ranking, pgvector similarity, filters, and reciprocal-rank fusion.",
    keywords: [
      "postgres hybrid search",
      "postgresql hybrid search",
      "pgvector hybrid search",
      "postgres full text vector search",
      "pgvector rrf",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "Vector Search",
    pillar: "PostgreSQL Search",
    relatedSlugs: [
      "pgvector-hnsw-vs-ivfflat",
      "postgresql-jsonb-query-examples",
      "find-slow-postgresql-queries-pg-stat-statements",
    ],
    faqs: [
      {
        question: "Why combine full-text search with vector search?",
        answer:
          "Full-text search is strong at exact terms, identifiers, and rare words. Vector search is useful for semantic similarity. Combining ranked candidates from both methods handles a broader set of queries.",
      },
      {
        question: "Do I need a separate vector database for hybrid search?",
        answer:
          "Not necessarily. PostgreSQL can keep relational filters, full-text indexes, vector data, and ranking logic in one database. Test recall, latency, and operating cost against your actual workload before choosing another service.",
      },
    ],
    sources: [
      {
        title: "pgvector documentation and examples",
        url: "https://github.com/pgvector/pgvector",
      },
      {
        title: "PostgreSQL full-text search documentation",
        url: "https://www.postgresql.org/docs/current/textsearch.html",
      },
      {
        title: "PostgreSQL websearch_to_tsquery documentation",
        url: "https://www.postgresql.org/docs/current/textsearch-controls.html",
      },
    ],
  },
  {
    slug: "find-slow-postgresql-queries-pg-stat-statements",
    title: "Find Slow PostgreSQL Queries with pg_stat_statements",
    description:
      "Use pg_stat_statements to find expensive PostgreSQL query patterns by total time, average time, calls, rows, and buffer activity.",
    keywords: [
      "postgres find slow queries",
      "pg stat statements slow queries",
      "postgresql query performance",
      "postgres slow query log",
      "pg_stat_statements examples",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "Query Performance",
    pillar: "PostgreSQL Performance",
    relatedSlugs: [
      "explain-analyze-postgres",
      "postgresql-monitoring-tools",
      "postgresql-18-skip-scan",
    ],
    faqs: [
      {
        question: "Does pg_stat_statements store every individual query?",
        answer:
          "It groups structurally equivalent statements into normalized entries and records aggregate statistics. Literal values are replaced, so one entry can represent many executions.",
      },
      {
        question: "Should I sort slow queries by total time or mean time?",
        answer:
          "Use both. Total execution time finds the largest cumulative cost, while mean execution time finds individually slow statements. Call count and business importance determine which deserves attention first.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL pg_stat_statements documentation",
        url: "https://www.postgresql.org/docs/current/pgstatstatements.html",
      },
      {
        title: "PostgreSQL monitoring statistics",
        url: "https://www.postgresql.org/docs/current/monitoring-stats.html",
      },
      {
        title: "PostgreSQL EXPLAIN documentation",
        url: "https://www.postgresql.org/docs/current/using-explain.html",
      },
    ],
  },
  {
    slug: "postgresql-connection-pooling",
    title: "PostgreSQL Connection Pooling: Direct, Session, or Transaction?",
    description:
      "Choose between direct PostgreSQL connections, session pooling, and transaction pooling without breaking prepared statements or session state.",
    keywords: [
      "postgres connection pooling",
      "postgresql connection pool",
      "pgbouncer session vs transaction",
      "supabase port 5432 6543",
      "postgres direct vs pooled connection",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL Connections",
    pillar: "PostgreSQL Connections",
    relatedSlugs: [
      "connect-postgresgui-to-supabase",
      "connect-postgresgui-to-neon",
      "postgres-mcp-server",
    ],
    faqs: [
      {
        question: "Should a desktop PostgreSQL client use transaction pooling?",
        answer:
          "Usually no. A desktop client benefits from stable session state. Prefer a direct connection or session pool unless the provider requires transaction pooling.",
      },
      {
        question: "Why can transaction pooling break session features?",
        answer:
          "Each transaction may run on a different server connection. Temporary tables, session-level settings, advisory locks, LISTEN, and some prepared-statement workflows can therefore behave differently or fail.",
      },
    ],
    sources: [
      {
        title: "PgBouncer feature documentation",
        url: "https://www.pgbouncer.org/features.html",
      },
      {
        title: "Supabase connection methods",
        url: "https://supabase.com/docs/guides/database/connecting-to-postgres",
      },
      {
        title: "Neon connection pooling",
        url: "https://neon.com/docs/connect/connection-pooling",
      },
    ],
  },
  {
    slug: "postgresql-18-skip-scan",
    title: "PostgreSQL 18 Skip Scan: Multicolumn Index Examples",
    description:
      "See when PostgreSQL 18 can use a multicolumn B-tree index without an equality condition on its leading column, and when another index is still better.",
    keywords: [
      "postgres skip scan",
      "postgresql 18 skip scan",
      "postgres multicolumn index",
      "postgres btree skip scan",
      "postgres index column order",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL 18",
    pillar: "PostgreSQL Performance",
    relatedSlugs: [
      "postgresql-19-features",
      "explain-analyze-postgres",
      "find-slow-postgresql-queries-pg-stat-statements",
    ],
    faqs: [
      {
        question: "Does PostgreSQL show a Skip Scan plan node?",
        answer:
          "No separate Skip Scan node is required. The plan can still appear as an Index Scan or Index Only Scan. Compare buffers, rows, and timing rather than relying on a node label.",
      },
      {
        question: "Does skip scan make index column order irrelevant?",
        answer:
          "No. A purpose-built index can still be much cheaper, especially when the leading column has many distinct values. Skip scan gives the planner another option; it does not remove the need to design indexes around important queries.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL 18 release notes",
        url: "https://www.postgresql.org/docs/18/release-18.html",
      },
      {
        title: "PostgreSQL multicolumn indexes",
        url: "https://www.postgresql.org/docs/18/indexes-multicolumn.html",
      },
      {
        title: "PostgreSQL EXPLAIN documentation",
        url: "https://www.postgresql.org/docs/18/using-explain.html",
      },
    ],
  },
  {
    slug: "pgvector-hnsw-vs-ivfflat",
    title: "pgvector HNSW vs IVFFlat: A Reproducible Comparison",
    description:
      "Compare pgvector HNSW and IVFFlat with a repeatable test for build time, query latency, recall, memory pressure, filtering, and ongoing writes.",
    keywords: [
      "pgvector hnsw vs ivfflat",
      "hnsw vs ivfflat",
      "pgvector index comparison",
      "pgvector benchmark",
      "pgvector hnsw settings",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "Vector Search",
    pillar: "PostgreSQL Search",
    relatedSlugs: [
      "postgres-hybrid-search-pgvector",
      "explain-analyze-postgres",
      "find-slow-postgresql-queries-pg-stat-statements",
    ],
    faqs: [
      {
        question: "Should I choose HNSW or IVFFlat for pgvector?",
        answer:
          "HNSW is often the easier default for changing datasets and strong query recall. IVFFlat can build faster and use less memory, but it needs representative data before index creation and more workload-specific tuning.",
      },
      {
        question: "Do small vector tables need an approximate index?",
        answer:
          "Often they do not. Exact search can be simpler and may be fast enough for a small table. Measure exact search first so you have a recall baseline before adding HNSW or IVFFlat.",
      },
    ],
    sources: [
      {
        title: "pgvector index documentation",
        url: "https://github.com/pgvector/pgvector#indexing",
      },
      {
        title: "Supabase HNSW index guide",
        url: "https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes",
      },
      {
        title: "Supabase IVFFlat index guide",
        url: "https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes",
      },
    ],
  },
  {
    slug: "postgresql-rls-performance",
    title: "PostgreSQL RLS Performance: Common Slowdowns and Fixes",
    description:
      "Diagnose slow PostgreSQL row-level security policies by checking indexes, function calls, joins, initialization plans, and policy scope.",
    keywords: [
      "postgres rls performance",
      "postgresql row level security performance",
      "supabase rls slow",
      "optimize rls policy",
      "auth uid select performance",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL Security",
    pillar: "PostgreSQL Performance",
    relatedSlugs: [
      "supabase-rls-examples",
      "explain-analyze-postgres",
      "find-slow-postgresql-queries-pg-stat-statements",
    ],
    faqs: [
      {
        question: "Does PostgreSQL RLS always make queries slow?",
        answer:
          "No. Simple policies on indexed columns can be inexpensive. Problems usually appear when a policy repeats functions or joins for many rows, lacks supporting indexes, or forces the planner into a poor plan.",
      },
      {
        question: "Can EXPLAIN ANALYZE show the cost of an RLS policy?",
        answer:
          "Yes, when the query is executed as a role to which the policy applies. Test with realistic roles and data, because table owners and roles with BYPASSRLS can see a different plan and result.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL row security policies",
        url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html",
      },
      {
        title: "Supabase RLS performance recommendations",
        url: "https://supabase.com/docs/guides/database/postgres/row-level-security#rls-performance-recommendations",
      },
      {
        title: "Supabase Security and Performance Advisor",
        url: "https://supabase.com/blog/security-performance-advisor",
      },
    ],
  },
  {
    slug: "postgresql-temporal-constraints",
    title: "PostgreSQL Temporal Constraints with WITHOUT OVERLAPS",
    description:
      "Use PostgreSQL 18 temporal keys and PERIOD foreign keys to prevent overlapping bookings and require complete time-range coverage.",
    keywords: [
      "postgres without overlaps",
      "postgresql temporal constraints",
      "postgres period foreign key",
      "postgres temporal primary key",
      "postgres prevent overlapping dates",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL 18",
    pillar: "PostgreSQL Data Modeling",
    relatedSlugs: [
      "postgresql-generated-columns",
      "database-schema-design-online",
      "postgres-column-types",
    ],
    faqs: [
      {
        question: "Which PostgreSQL version supports WITHOUT OVERLAPS?",
        answer:
          "PostgreSQL 18 supports WITHOUT OVERLAPS on the final range or multirange column of a UNIQUE or PRIMARY KEY constraint, along with PERIOD temporal foreign keys.",
      },
      {
        question: "Does WITHOUT OVERLAPS work with timestamp columns?",
        answer:
          "The constrained column must be a range or multirange type, such as tstzrange. Put the scalar key columns first and the range column last.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL 18 CREATE TABLE",
        url: "https://www.postgresql.org/docs/18/sql-createtable.html",
      },
      {
        title: "PostgreSQL range types",
        url: "https://www.postgresql.org/docs/18/rangetypes.html",
      },
      {
        title: "PostgreSQL 18 release notes",
        url: "https://www.postgresql.org/docs/18/release-18.html",
      },
    ],
  },
  {
    slug: "postgresql-14-end-of-life-upgrade",
    title: "PostgreSQL 14 End of Life: Plan an Upgrade to PostgreSQL 18",
    description:
      "Prepare for PostgreSQL 14 end of life with an inventory, extension checks, rehearsed pg_upgrade or dump-and-restore, validation, and rollback plan.",
    keywords: [
      "postgresql 14 end of life",
      "upgrade postgresql 14 to 18",
      "postgres 14 eol",
      "postgres major version upgrade",
      "pg_upgrade postgresql 18",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL Operations",
    pillar: "PostgreSQL Upgrades",
    relatedSlugs: [
      "postgresql-19-features",
      "best-postgresql-backup-solution",
      "download-postgresql-for-mac",
    ],
    faqs: [
      {
        question: "When does PostgreSQL 14 support end?",
        answer:
          "The PostgreSQL versioning policy lists November 12, 2026 as the final release date for PostgreSQL 14. After that, the community will not issue routine bug or security fixes for version 14.",
      },
      {
        question: "Can pg_upgrade jump directly from PostgreSQL 14 to 18?",
        answer:
          "pg_upgrade supports upgrades from PostgreSQL 9.2 and later to a current major version, subject to compatibility and extension requirements. Rehearse the exact 14-to-18 upgrade with copies of your real cluster first.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL versioning policy",
        url: "https://www.postgresql.org/support/versioning/",
      },
      {
        title: "PostgreSQL pg_upgrade documentation",
        url: "https://www.postgresql.org/docs/current/pgupgrade.html",
      },
      {
        title: "PostgreSQL backup and restore documentation",
        url: "https://www.postgresql.org/docs/current/backup.html",
      },
    ],
  },
  {
    slug: "postgresql-generated-columns",
    title: "Virtual vs Stored Generated Columns in PostgreSQL 18",
    description:
      "Choose between virtual and stored generated columns in PostgreSQL 18 by comparing storage, read cost, indexing, expressions, and replication.",
    keywords: [
      "postgres generated columns",
      "postgres virtual generated column",
      "postgres stored generated column",
      "postgresql 18 generated columns",
      "generated always as postgres",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL 18",
    pillar: "PostgreSQL Data Modeling",
    relatedSlugs: [
      "postgresql-temporal-constraints",
      "postgres-column-types",
      "database-schema-design-online",
    ],
    faqs: [
      {
        question: "What is the default generated-column type in PostgreSQL 18?",
        answer:
          "PostgreSQL 18 uses VIRTUAL when neither VIRTUAL nor STORED is specified. Earlier PostgreSQL releases only supported stored generated columns.",
      },
      {
        question: "Can a virtual generated column use my own function?",
        answer:
          "PostgreSQL 18 restricts virtual expressions to built-in immutable functions and types. Stored generated columns allow a broader set of immutable user-defined functions and types.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL generated columns",
        url: "https://www.postgresql.org/docs/18/ddl-generated-columns.html",
      },
      {
        title: "PostgreSQL 18 CREATE TABLE",
        url: "https://www.postgresql.org/docs/18/sql-createtable.html",
      },
      {
        title: "PostgreSQL 18 release notes",
        url: "https://www.postgresql.org/docs/18/release-18.html",
      },
    ],
  },
  {
    slug: "postgresql-oauth-authentication",
    title: "PostgreSQL OAuth Authentication: What Works in 18 and 19",
    description:
      "Understand PostgreSQL OAuth support across the server, libpq, psql, flow plugins, validators, and database GUI clients.",
    keywords: [
      "postgres oauth authentication",
      "postgresql oauth",
      "postgresql 18 oauth",
      "libpq oauth",
      "postgres oauthbearer",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "PostgreSQL Security",
    pillar: "PostgreSQL Authentication",
    relatedSlugs: [
      "postgresql-19-features",
      "postgres-mcp-server",
      "ssl-verify-full-for-rds-postgresql-on-mac",
    ],
    faqs: [
      {
        question:
          "Does PostgreSQL 18 replace passwords with OAuth automatically?",
        answer:
          "No. OAuth requires server-side validator configuration and a compatible client flow. Password, certificate, and other pg_hba.conf methods remain available.",
      },
      {
        question: "Does every PostgreSQL GUI support OAuth?",
        answer:
          "No. Client support depends on the libpq version or the driver and on whether the application exposes the required OAuth flow. Check the client documentation before changing authentication for users.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL 18 OAuth authorization and authentication",
        url: "https://www.postgresql.org/docs/18/auth-oauth.html",
      },
      {
        title: "PostgreSQL libpq OAuth support",
        url: "https://www.postgresql.org/docs/18/libpq-oauth.html",
      },
      {
        title: "PostgreSQL 19 draft release notes",
        url: "https://www.postgresql.org/docs/19/release-19.html",
      },
    ],
  },
  {
    slug: "secure-postgresql-ai-agents",
    title: "Secure PostgreSQL Access for AI Coding Agents",
    description:
      "Give AI coding agents useful PostgreSQL access with separate roles, read-only transactions, query limits, auditability, and disposable environments.",
    keywords: [
      "ai agent postgres security",
      "secure postgres ai agent",
      "read only postgres role ai",
      "postgres agent database access",
      "postgres llm security",
    ],
    date: "2026-07-31",
    author: "Ghazi",
    category: "AI and PostgreSQL",
    pillar: "PostgreSQL Security",
    relatedSlugs: [
      "postgres-mcp-server",
      "postgresql-rls-performance",
      "best-postgresql-backup-solution",
    ],
    faqs: [
      {
        question:
          "Is a read-only transaction enough to protect PostgreSQL from an AI agent?",
        answer:
          "It is one useful layer, but durable protection should also come from PostgreSQL privileges, separate credentials, query timeouts, restricted network access, and an environment that can be restored or discarded.",
      },
      {
        question: "Should an AI agent connect to the production database?",
        answer:
          "Prefer an isolated development branch, sanitized replica, or staging database. When production reads are necessary, use a narrowly privileged account and enforce limits outside the prompt as well as inside it.",
      },
    ],
    sources: [
      {
        title: "PostgreSQL database roles",
        url: "https://www.postgresql.org/docs/current/user-manag.html",
      },
      {
        title: "PostgreSQL client connection defaults",
        url: "https://www.postgresql.org/docs/current/runtime-config-client.html",
      },
      {
        title: "Postgres MCP Pro protected SQL execution",
        url: "https://github.com/crystaldba/postgres-mcp#protected-sql-execution",
      },
    ],
  },
];
