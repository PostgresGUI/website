import { Category, DataType } from "./types";

export const categories: Category[] = [
  {
    id: "text",
    name: "Text",
    color: "#3b82f6",
    tldr: "Use text unless you need length validation",
  },
  {
    id: "numeric",
    name: "Numeric",
    color: "#f59e0b",
    tldr: "Use integer for most things, numeric for money",
  },
  {
    id: "datetime",
    name: "Date / Time",
    color: "#8b5cf6",
    tldr: "Always use timestamptz, never bare timestamp",
  },
  {
    id: "json",
    name: "JSON",
    color: "#06b6d4",
    tldr: "Use jsonb \u2014 faster and indexable",
  },
  {
    id: "boolean",
    name: "Boolean",
    color: "#22c55e",
    tldr: "Just use boolean",
  },
  {
    id: "uuid",
    name: "UUID",
    color: "#ec4899",
    tldr: "Use uuid with gen_random_uuid()",
  },
  {
    id: "binary",
    name: "Binary",
    color: "#6b7280",
    tldr: "Use bytea; consider external storage for large files",
  },
  {
    id: "arrays",
    name: "Arrays",
    color: "#f97316",
    tldr: "Use for small fixed lists; prefer junction tables otherwise",
  },
  {
    id: "special",
    name: "Special",
    color: "#ef4444",
    tldr: "Prefer GENERATED ALWAYS AS IDENTITY over serial",
  },
];

export const dataTypes: DataType[] = [
  // ── Text ──
  {
    id: "text",
    name: "text",
    category: "text",
    storage: "variable",
    range: "unlimited",
    whenToUse: "General-purpose string storage. No length limit, no padding.",
    performance: "Same speed as varchar. No penalty for using text over varchar.",
    recommended: true,
    sqlExample: `CREATE TABLE posts (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  body text NOT NULL\n);`,
    vsNotes:
      "text vs varchar: identical performance. varchar(n) only adds a length check \u2014 use it when your domain requires a max length (e.g. country codes). Prefer text for everything else.",
  },
  {
    id: "varchar",
    name: "varchar(n)",
    category: "text",
    storage: "variable",
    range: "up to n characters",
    whenToUse: "When you need to enforce a maximum length at the DB level.",
    performance: "Same as text. The length check is negligible.",
    recommended: false,
    sqlExample: `CREATE TABLE users (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  username varchar(30) NOT NULL UNIQUE\n);`,
    vsNotes:
      "varchar(n) vs text: only difference is the length constraint. If your app validates length anyway, text is simpler. Use varchar(n) for columns like ISO codes or slugs where a hard limit matters.",
  },
  {
    id: "char",
    name: "char(n)",
    category: "text",
    storage: "fixed, n bytes",
    range: "exactly n characters (space-padded)",
    whenToUse: "Fixed-width codes like ISO country codes (char(2)).",
    performance: "Slightly wasteful due to space padding. Rarely a good choice.",
    recommended: false,
    sqlExample: `CREATE TABLE countries (\n  code char(2) PRIMARY KEY,\n  name text NOT NULL\n);`,
    vsNotes:
      "char(n) pads with spaces and compares ignoring trailing spaces. This causes subtle bugs. Use varchar(2) or text with a CHECK constraint instead in almost all cases.",
  },

  // ── Numeric ──
  {
    id: "smallint",
    name: "smallint",
    category: "numeric",
    storage: "2 bytes",
    range: "-32,768 to 32,767",
    whenToUse: "Enum-like values, small counters, ages. Saves space in wide tables.",
    performance: "Fastest integer type. Use when values always fit in 16 bits.",
    recommended: false,
    sqlExample: `CREATE TABLE products (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  rating smallint CHECK (rating BETWEEN 1 AND 5)\n);`,
    vsNotes:
      "smallint vs integer: saves 2 bytes per row. Only matters in tables with millions of rows and many small-int columns. Default to integer unless optimizing storage.",
  },
  {
    id: "integer",
    name: "integer",
    category: "numeric",
    storage: "4 bytes",
    range: "-2,147,483,648 to 2,147,483,647",
    whenToUse: "Default choice for whole numbers. Counts, quantities, foreign keys.",
    performance: "Native CPU word operations. Fastest for arithmetic.",
    recommended: true,
    sqlExample: `CREATE TABLE orders (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  quantity integer NOT NULL DEFAULT 1\n);`,
    vsNotes:
      "integer vs bigint: integer is fine for most columns. Use bigint for primary keys (future-proofing) and columns that could exceed 2 billion.",
  },
  {
    id: "bigint",
    name: "bigint",
    category: "numeric",
    storage: "8 bytes",
    range: "-9.2 \u00d7 10\u00b9\u2078 to 9.2 \u00d7 10\u00b9\u2078",
    whenToUse: "Primary keys, row counts, timestamps-as-integers, anything that may exceed 2B.",
    performance: "Slightly slower than integer on 32-bit systems. Negligible on 64-bit.",
    recommended: false,
    sqlExample: `CREATE TABLE events (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  created_at_ms bigint NOT NULL\n);`,
    vsNotes:
      "bigint vs integer: use bigint for PKs in any table that might grow large. The 4-byte savings from integer is rarely worth hitting the 2B ceiling.",
  },
  {
    id: "numeric",
    name: "numeric(p,s)",
    category: "numeric",
    storage: "variable",
    range: "up to 131,072 digits before decimal, 16,383 after",
    whenToUse: "Money, financial calculations, anywhere you need exact decimal precision.",
    performance: "Slower than float/integer. Exact arithmetic avoids rounding errors.",
    recommended: false,
    sqlExample: `CREATE TABLE invoices (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  amount numeric(12,2) NOT NULL\n);`,
    vsNotes:
      "numeric vs real/double: numeric is exact, floats are approximate. Never use float for money. numeric(12,2) gives 10 digits before decimal and 2 after.",
  },
  {
    id: "real",
    name: "real",
    category: "numeric",
    storage: "4 bytes",
    range: "6 decimal digits precision",
    whenToUse: "Scientific data, sensor readings, where approximate values are acceptable.",
    performance: "Fast hardware FPU operations. ~6 digits of precision.",
    recommended: false,
    sqlExample: `CREATE TABLE measurements (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  temperature real\n);`,
    vsNotes:
      "real vs double precision: real is 4 bytes with ~6 digits; double is 8 bytes with ~15 digits. Use double precision if you need more accuracy. Never use either for money.",
  },
  {
    id: "double-precision",
    name: "double precision",
    category: "numeric",
    storage: "8 bytes",
    range: "15 decimal digits precision",
    whenToUse: "Scientific computation, analytics, geo coordinates.",
    performance: "Hardware FPU. ~15 digits precision. Faster than numeric for large datasets.",
    recommended: false,
    sqlExample: `CREATE TABLE locations (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  latitude double precision,\n  longitude double precision\n);`,
    vsNotes:
      "double precision vs numeric: double is faster but approximate. For financial or exact calculations, always use numeric. For analytics and science, double is fine.",
  },

  // ── Date / Time ──
  {
    id: "timestamptz",
    name: "timestamptz",
    category: "datetime",
    storage: "8 bytes",
    range: "4713 BC to 294276 AD",
    whenToUse: "Default for any timestamp. Stores UTC internally, converts on display.",
    performance: "Same speed as timestamp. Zero overhead for timezone conversion.",
    recommended: true,
    sqlExample: `CREATE TABLE events (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  created_at timestamptz NOT NULL DEFAULT now()\n);`,
    vsNotes:
      "timestamptz vs timestamp: timestamptz stores in UTC and converts to session timezone on read. timestamp ignores timezones entirely \u2014 a common source of bugs. Always use timestamptz.",
  },
  {
    id: "timestamp",
    name: "timestamp",
    category: "datetime",
    storage: "8 bytes",
    range: "4713 BC to 294276 AD",
    whenToUse: "Only when timezone is truly irrelevant (e.g., abstract schedule templates).",
    performance: "Same as timestamptz.",
    recommended: false,
    sqlExample: `CREATE TABLE schedule_templates (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  start_time timestamp NOT NULL\n);`,
    vsNotes:
      "timestamp (without time zone) does not track timezone info. If your server moves or your app goes global, timestamps become ambiguous. Use timestamptz unless you have a specific reason not to.",
  },
  {
    id: "date",
    name: "date",
    category: "datetime",
    storage: "4 bytes",
    range: "4713 BC to 5874897 AD",
    whenToUse: "Birthdays, calendar dates, anything without a time component.",
    performance: "Half the size of timestamp. Efficient for date-only queries.",
    recommended: false,
    sqlExample: `CREATE TABLE employees (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  birth_date date\n);`,
    vsNotes:
      "date vs timestamptz: use date when you only care about the calendar day, not the time. Avoids timezone confusion for pure dates.",
  },
  {
    id: "time",
    name: "time",
    category: "datetime",
    storage: "8 bytes",
    range: "00:00:00 to 24:00:00",
    whenToUse: "Store opening hours, recurring daily times.",
    performance: "Rarely used alone. Consider timestamptz for most use cases.",
    recommended: false,
    sqlExample: `CREATE TABLE store_hours (\n  day_of_week smallint,\n  open_time time NOT NULL,\n  close_time time NOT NULL\n);`,
    vsNotes:
      "time vs timestamptz: time stores only the time-of-day without a date. Useful for schedules but tricky with DST. Pair with a date column or use timestamptz instead.",
  },
  {
    id: "interval",
    name: "interval",
    category: "datetime",
    storage: "16 bytes",
    range: "+/- 178,000,000 years",
    whenToUse: "Durations, time differences, subscription periods.",
    performance: "Large at 16 bytes. Great for date arithmetic.",
    recommended: false,
    sqlExample: `SELECT now() + interval '30 days' AS expires_at;\n\nCREATE TABLE subscriptions (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  duration interval NOT NULL DEFAULT '1 year'\n);`,
    vsNotes:
      "interval stores a duration, not a point in time. Useful for expressions like now() + interval '7 days'. For fixed durations, an integer column with days/seconds may be simpler.",
  },

  // ── JSON ──
  {
    id: "jsonb",
    name: "jsonb",
    category: "json",
    storage: "variable (binary)",
    range: "any valid JSON",
    whenToUse: "Flexible schema data, API responses, user preferences, feature flags.",
    performance: "Supports GIN indexes. Faster reads than json. Slightly slower writes.",
    recommended: true,
    sqlExample: `CREATE TABLE user_settings (\n  user_id bigint PRIMARY KEY,\n  preferences jsonb NOT NULL DEFAULT '{}'\n);\n\nCREATE INDEX ON user_settings USING gin (preferences);`,
    vsNotes:
      "jsonb vs json: jsonb stores binary, supports indexing and containment operators (@>, ?). json stores raw text, preserves key order and duplicates. Use jsonb in 99% of cases.",
  },
  {
    id: "json",
    name: "json",
    category: "json",
    storage: "variable (text)",
    range: "any valid JSON",
    whenToUse: "Only when you must preserve exact JSON formatting or key order.",
    performance: "No indexing support. Must reparse on every access. Slower reads.",
    recommended: false,
    sqlExample: `CREATE TABLE audit_log (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  raw_payload json NOT NULL\n);`,
    vsNotes:
      "json vs jsonb: json preserves whitespace and duplicate keys. Useful for audit logs where exact input preservation matters. For everything else, use jsonb.",
  },

  // ── Boolean ──
  {
    id: "boolean",
    name: "boolean",
    category: "boolean",
    storage: "1 byte",
    range: "true / false / null",
    whenToUse: "Flags, toggles, yes/no fields.",
    performance: "Extremely compact. Efficient in indexes and WHERE clauses.",
    recommended: true,
    sqlExample: `CREATE TABLE users (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  is_active boolean NOT NULL DEFAULT true\n);`,
    vsNotes:
      "boolean vs smallint/char(1): always use boolean for true/false values. It's self-documenting, works with IS TRUE/IS FALSE syntax, and is the most storage-efficient option.",
  },

  // ── UUID ──
  {
    id: "uuid",
    name: "uuid",
    category: "uuid",
    storage: "16 bytes",
    range: "128-bit UUID",
    whenToUse: "Primary keys in distributed systems, public-facing IDs, merge-safe keys.",
    performance: "Compact 16 bytes (vs 36-char text). Supports btree and hash indexes natively.",
    recommended: true,
    sqlExample: `CREATE TABLE accounts (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  name text NOT NULL\n);`,
    vsNotes:
      "uuid vs text: uuid type is 16 bytes vs 36+ bytes for text. It validates format on insert and is faster to compare. Use gen_random_uuid() (built-in since PG 13) for v4 UUIDs.",
  },

  // ── Binary ──
  {
    id: "bytea",
    name: "bytea",
    category: "binary",
    storage: "variable + 1-4 bytes overhead",
    range: "up to 1 GB",
    whenToUse: "Small binary data: hashes, encrypted tokens, thumbnails.",
    performance: "Stored inline in the row (TOASTed if > 2 KB). Fine for small blobs.",
    recommended: true,
    sqlExample: `CREATE TABLE files (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  sha256 bytea NOT NULL,\n  thumbnail bytea\n);`,
    vsNotes:
      "bytea vs large objects (lo): bytea is simpler and works with standard queries. Large objects support streaming but require special API. For files > 10 MB, consider external storage (S3).",
  },

  // ── Arrays ──
  {
    id: "array",
    name: "type[]",
    category: "arrays",
    storage: "variable",
    range: "up to 1 GB total",
    whenToUse: "Tags, labels, small fixed-size lists. Avoid for relationships.",
    performance: "Supports GIN indexes for containment queries. No foreign key support.",
    recommended: true,
    sqlExample: `CREATE TABLE articles (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  tags text[] NOT NULL DEFAULT '{}'\n);\n\nCREATE INDEX ON articles USING gin (tags);`,
    vsNotes:
      "Arrays vs junction tables: arrays are simpler for small, denormalized lists (tags, labels). For relationships with their own attributes or referential integrity, use a junction table.",
  },

  // ── Special ──
  {
    id: "identity",
    name: "GENERATED ALWAYS AS IDENTITY",
    category: "special",
    storage: "4 or 8 bytes (integer/bigint)",
    range: "depends on underlying type",
    whenToUse: "Auto-incrementing primary keys. SQL-standard replacement for serial.",
    performance: "Same as serial internally. Stricter \u2014 prevents manual ID insertion by default.",
    recommended: true,
    sqlExample: `CREATE TABLE orders (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  total numeric(10,2) NOT NULL\n);`,
    vsNotes:
      "identity vs serial: identity is SQL-standard, prevents accidental manual inserts, and works correctly with table inheritance. serial is PostgreSQL-specific and creates a separate sequence with looser ownership. Always prefer identity.",
  },
  {
    id: "serial",
    name: "serial / bigserial",
    category: "special",
    storage: "4 / 8 bytes",
    range: "1 to 2B / 1 to 9.2\u00d710\u00b9\u2078",
    whenToUse: "Legacy auto-increment. Use identity columns instead for new tables.",
    performance: "Same as integer/bigint. Creates an implicit sequence.",
    recommended: false,
    sqlExample: `-- Legacy pattern (avoid for new tables)\nCREATE TABLE legacy_orders (\n  id serial PRIMARY KEY,\n  description text\n);`,
    vsNotes:
      "serial vs identity: serial is a shorthand that creates a sequence + integer column. The sequence ownership is fragile (can get out of sync). Identity columns are the modern replacement.",
  },
  {
    id: "enum",
    name: "enum",
    category: "special",
    storage: "4 bytes",
    range: "user-defined labels",
    whenToUse: "Fixed status values (draft/published/archived). Hard to modify later.",
    performance: "Compact and fast. But ALTER TYPE ... ADD VALUE cannot run in a transaction (before PG 12).",
    recommended: false,
    sqlExample: `CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');\n\nCREATE TABLE posts (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  status post_status NOT NULL DEFAULT 'draft'\n);`,
    vsNotes:
      "enum vs text CHECK: enums are compact (4 bytes) and type-safe but painful to modify. A text column with a CHECK constraint or a lookup table is easier to evolve. Use enums for truly stable sets.",
  },
  {
    id: "cidr-inet",
    name: "inet / cidr",
    category: "special",
    storage: "7 or 19 bytes",
    range: "IPv4 and IPv6 addresses",
    whenToUse: "IP addresses, network ranges. Supports containment operators.",
    performance: "Compact storage with built-in network operators (<<, >>=, etc.).",
    recommended: false,
    sqlExample: `CREATE TABLE access_log (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  client_ip inet NOT NULL\n);\n\n-- Find all IPs in a subnet\nSELECT * FROM access_log WHERE client_ip << '192.168.1.0/24';`,
    vsNotes:
      "inet vs text: inet validates format, is more compact, and supports network operators. cidr is similar but rejects non-zero host bits. Use inet for addresses, cidr for network ranges.",
  },
  {
    id: "tsvector",
    name: "tsvector / tsquery",
    category: "special",
    storage: "variable",
    range: "tokenized text",
    whenToUse: "Full-text search without external tools. Supports ranking and stemming.",
    performance: "Fast with GIN indexes. Built-in alternative to Elasticsearch for simple search.",
    recommended: false,
    sqlExample: `CREATE TABLE articles (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL,\n  body text NOT NULL,\n  search_vector tsvector GENERATED ALWAYS AS (\n    to_tsvector('english', title || ' ' || body)\n  ) STORED\n);\n\nCREATE INDEX ON articles USING gin (search_vector);`,
    vsNotes:
      "tsvector vs LIKE/ILIKE: tsvector with GIN index is orders of magnitude faster for search. Supports stemming, ranking, and phrase matching. Use LIKE only for simple substring matches.",
  },
];
