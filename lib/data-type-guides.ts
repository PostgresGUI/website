import type { SeoGuide } from "@/components/seo-guide-page";

type TypeGuideSpec = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  answer: string;
  left: string;
  right: string;
  leftUse: string;
  rightUse: string;
  tradeoff: string;
  example: string;
  source: { label: string; href: string };
};

const specs: TypeGuideSpec[] = [
  {
    slug: "jsonb-vs-json",
    title: "PostgreSQL JSONB vs JSON",
    description:
      "Choose between jsonb and json in PostgreSQL based on indexing, write behavior, key order, and whether the original JSON text must be preserved.",
    keywords: ["postgres jsonb vs json", "postgresql json vs jsonb", "jsonb indexing"],
    answer:
      "Use jsonb for application data you will query. Use json only when preserving the original JSON text, including whitespace, key order, or duplicate keys, is part of the requirement.",
    left: "jsonb",
    right: "json",
    leftUse: "Queryable documents, containment filters, GIN indexes",
    rightUse: "Raw payload preservation and write-once pass-through data",
    tradeoff:
      "jsonb parses the input into a decomposed representation, so inserts do a little more work. In return, reads can use operators and indexes effectively. json stores the submitted text and reparses it during processing.",
    example: `create table events (
  id bigint generated always as identity primary key,
  payload jsonb not null
);

create index events_payload_gin on events using gin (payload);

select *
from events
where payload @> '{"type":"invoice.paid"}';`,
    source: {
      label: "PostgreSQL JSON types",
      href: "https://www.postgresql.org/docs/current/datatype-json.html",
    },
  },
  {
    slug: "timestamp-vs-timestamptz",
    title: "PostgreSQL TIMESTAMP vs TIMESTAMPTZ",
    description:
      "Understand what PostgreSQL stores for timestamp and timestamptz, how session time zones affect output, and which one belongs in created_at.",
    keywords: ["postgres timestamp vs timestamptz", "timestamp with time zone postgres", "postgres utc timestamp"],
    answer:
      "Use timestamptz for a real event such as created_at, paid_at, or a meeting start. Use timestamp for a wall-clock value whose time zone is intentionally unknown or supplied elsewhere.",
    left: "timestamptz",
    right: "timestamp",
    leftUse: "An instant that can be compared across time zones",
    rightUse: "A local date and time without an implied location",
    tradeoff:
      "timestamptz converts input to an absolute instant and displays it in the current session time zone. It does not retain the original zone name. timestamp stores the date and clock fields as given and ignores a zone in the input.",
    example: `create table appointments (
  starts_at timestamptz not null,
  venue_time_zone text not null
);

set timezone = 'America/New_York';
select starts_at from appointments;`,
    source: {
      label: "PostgreSQL date and time types",
      href: "https://www.postgresql.org/docs/current/datatype-datetime.html",
    },
  },
  {
    slug: "varchar-vs-text",
    title: "PostgreSQL VARCHAR vs TEXT",
    description:
      "Decide when varchar(n) expresses a real rule and why text is the simpler PostgreSQL default for most strings.",
    keywords: ["postgres varchar vs text", "postgresql text vs varchar", "varchar performance postgres"],
    answer:
      "Use text for most strings. Use varchar(n) only when rejecting values longer than n characters is a rule you want PostgreSQL to enforce.",
    left: "text",
    right: "varchar(n)",
    leftUse: "Names, descriptions, URLs, identifiers, and ordinary strings",
    rightUse: "Fields with a meaningful maximum character count",
    tradeoff:
      "PostgreSQL does not give varchar(n) a performance advantage over text. The meaningful difference is the length check. If the limit is a UI preference rather than a data invariant, keep it out of the database type.",
    example: `create table profiles (
  display_name text not null,
  country_code varchar(2) not null,
  bio text
);`,
    source: {
      label: "PostgreSQL character types",
      href: "https://www.postgresql.org/docs/current/datatype-character.html",
    },
  },
  {
    slug: "serial-vs-identity",
    title: "PostgreSQL SERIAL vs IDENTITY",
    description:
      "Compare serial with SQL-standard generated identity columns and choose a default for new PostgreSQL tables.",
    keywords: ["postgres serial vs identity", "generated always as identity postgres", "bigserial vs identity"],
    answer:
      "Use generated identity columns for new tables. serial still works, but it is shorthand that creates a sequence and default rather than a property of the column.",
    left: "generated ... as identity",
    right: "serial / bigserial",
    leftUse: "New schemas and explicit control over generated values",
    rightUse: "Existing schemas and compatibility with older migrations",
    tradeoff:
      "Identity columns are part of the SQL standard and express generation behavior in the column definition. GENERATED ALWAYS rejects manual values unless OVERRIDING SYSTEM VALUE is used; BY DEFAULT allows an explicit value.",
    example: `create table orders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);`,
    source: {
      label: "PostgreSQL identity columns",
      href: "https://www.postgresql.org/docs/current/ddl-identity-columns.html",
    },
  },
  {
    slug: "uuid-vs-bigint",
    title: "PostgreSQL UUID vs BIGINT Primary Keys",
    description:
      "Compare PostgreSQL uuid and bigint primary keys by storage, ordering, public exposure, distributed generation, and index behavior.",
    keywords: ["postgres uuid vs bigint", "postgresql uuid primary key", "uuid vs bigserial postgres"],
    answer:
      "Use bigint when compact indexes and simple database-generated IDs matter most. Use UUID when IDs must be generated outside one database or safely exposed without revealing a sequence. On PostgreSQL 18, UUIDv7 is the practical UUID default for new write-heavy tables.",
    left: "uuid",
    right: "bigint",
    leftUse: "Distributed creation, public IDs, offline records, data merges",
    rightUse: "Compact internal keys, simple sequences, maximum index locality",
    tradeoff:
      "A uuid is 16 bytes and a bigint is 8 bytes before index and foreign-key overhead. Random UUIDv4 values also scatter B-tree inserts. UUIDv7 keeps the UUID format while placing time information at the front, which improves insertion locality.",
    example: `-- PostgreSQL 18
create table public_events (
  id uuid primary key default uuidv7(),
  created_at timestamptz not null default now()
);

create table internal_jobs (
  id bigint generated always as identity primary key
);`,
    source: {
      label: "PostgreSQL UUID type",
      href: "https://www.postgresql.org/docs/current/datatype-uuid.html",
    },
  },
];

export const dataTypeGuideSlugs = specs.map((spec) => spec.slug);

export function getDataTypeGuide(
  slug: string
): (SeoGuide & { keywords: string[]; slug: string }) | undefined {
  const spec = specs.find((item) => item.slug === slug);
  if (!spec) return undefined;

  return {
    slug: spec.slug,
    title: spec.title,
    eyebrow: "PostgreSQL type decision",
    description: spec.description,
    keywords: spec.keywords,
    answer: spec.answer,
    facts: [
      { label: spec.left, value: spec.leftUse },
      { label: spec.right, value: spec.rightUse },
    ],
    codeBlocks: [
      {
        title: "A concrete schema",
        code: spec.example,
      },
    ],
    sections: [
      {
        title: `When ${spec.left} is the better fit`,
        paragraphs: [spec.leftUse + "."],
      },
      {
        title: `When ${spec.right} is the better fit`,
        paragraphs: [spec.rightUse + "."],
      },
      {
        title: "The tradeoff that matters",
        paragraphs: [spec.tradeoff],
      },
      {
        title: "A migration note",
        paragraphs: [
          "Changing a column type in a live database can rewrite the table, rebuild indexes, or break application assumptions. Inspect dependent foreign keys and run the conversion against production-sized data before scheduling the migration.",
        ],
      },
    ],
    faqs: [
      {
        question: `Is ${spec.left} always better than ${spec.right}?`,
        answer:
          "No. The choice follows the meaning of the data and the queries you need to run. A blanket rule hides the one requirement that should decide the column.",
      },
      {
        question: "Can I change the type later?",
        answer:
          "Usually, but the migration may require an explicit USING expression and can lock or rewrite a large table. Test the exact ALTER TABLE statement on a recent copy first.",
      },
      {
        question: "Where can I try the schema?",
        answer:
          "Use the PostgresGUI SQL editor for syntax work or the schema designer to model the table and export PostgreSQL SQL.",
      },
    ],
    related: [
      {
        href: "/data-types",
        label: "PostgreSQL data type picker",
        description: "Browse type families and copy column definitions.",
      },
      {
        href: "/blog/postgres-column-types",
        label: "Postgres column types",
        description: "A wider guide to text, numeric, date, UUID, JSONB, and identity columns.",
      },
      {
        href: "/schema-designer",
        label: "Schema designer",
        description: "Sketch tables and relationships, then export SQL.",
      },
    ],
    sources: [spec.source],
  };
}
