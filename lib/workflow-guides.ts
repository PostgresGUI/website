import type { SeoGuide } from "@/components/seo-guide-page";

type WorkflowSpec = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  answer: string;
  inspect: string[];
  commands: string;
  connectionHref: string;
  connectionLabel: string;
  source: { label: string; href: string };
};

const specs: WorkflowSpec[] = [
  {
    slug: "rails",
    name: "Rails",
    title: "Best PostgreSQL Client for Rails on Mac",
    description:
      "A practical Rails and PostgreSQL workflow on Mac: migrations in the terminal, data inspection in a GUI, and safe checks when schema.rb is not enough.",
    keywords: ["postgres client for rails", "rails postgresql gui", "rails database client mac"],
    answer:
      "Keep Rails migrations and schema ownership in the app. Use a PostgreSQL client for the jobs Rails console makes awkward: scanning a result set, checking indexes, reading an execution plan, and comparing what production actually contains.",
    inspect: [
      "Confirm that a migration created the expected index and constraint.",
      "Filter a table without loading Active Record objects.",
      "Run EXPLAIN (ANALYZE, BUFFERS) on the SQL behind a slow scope.",
      "Check database defaults that schema.rb may not make obvious.",
    ],
    commands: `bin/rails db:migrate
bin/rails db:version
bin/rails dbconsole`,
    connectionHref: "/connection-string/rails",
    connectionLabel: "Rails PostgreSQL connection guide",
    source: {
      label: "Rails Active Record migrations",
      href: "https://guides.rubyonrails.org/active_record_migrations.html",
    },
  },
  {
    slug: "django",
    name: "Django",
    title: "Best PostgreSQL Client for Django on Mac",
    description:
      "Use Django migrations and a Mac PostgreSQL client together without bypassing the ORM or turning production data checks into application code.",
    keywords: ["postgres client for django", "django postgresql gui", "django database browser mac"],
    answer:
      "Let Django migrations define the schema. Use a GUI to inspect generated constraints, browse rows at full database speed, and run query plans for ORM queries after reading their SQL.",
    inspect: [
      "Verify the indexes created by Meta.indexes and field options.",
      "Inspect the SQL from QuerySet.explain() in a full query editor.",
      "Check migration state against django_migrations.",
      "Review JSONB and array values without printing large QuerySets.",
    ],
    commands: `python manage.py makemigrations --check
python manage.py migrate
python manage.py dbshell`,
    connectionHref: "/connection-string/django",
    connectionLabel: "Django PostgreSQL connection guide",
    source: {
      label: "Django migrations",
      href: "https://docs.djangoproject.com/en/stable/topics/migrations/",
    },
  },
  {
    slug: "node",
    name: "Node.js",
    title: "Best PostgreSQL Client for Node.js on Mac",
    description:
      "A clean Node.js and PostgreSQL workflow for checking pool behavior, inspecting query results, and debugging the database beneath an ORM or query builder.",
    keywords: ["postgres client for node js", "node postgres gui", "postgresql client mac node"],
    answer:
      "Use your Node driver, ORM, or query builder for application access. Keep a separate desktop client for inspecting the database directly, especially when the bug could be in connection pooling, transaction boundaries, or generated SQL.",
    inspect: [
      "Compare generated SQL with the rows PostgreSQL actually returns.",
      "Check active sessions in pg_stat_activity while reproducing pool pressure.",
      "Run the migration SQL inside a transaction before shipping it.",
      "Inspect column defaults and nullability after a schema deploy.",
    ],
    commands: `psql "$DATABASE_URL" -c "select version();"
psql "$DATABASE_URL" -c "select count(*) from pg_stat_activity;"`,
    connectionHref: "/connection-string",
    connectionLabel: "PostgreSQL connection string builder",
    source: {
      label: "node-postgres features",
      href: "https://node-postgres.com/features/connecting",
    },
  },
  {
    slug: "prisma",
    name: "Prisma",
    title: "Best PostgreSQL Client for Prisma on Mac",
    description:
      "Use Prisma Studio and a PostgreSQL GUI for different jobs: model-level edits in one, SQL, indexes, plans, and server state in the other.",
    keywords: ["postgres client for prisma", "prisma postgres gui", "prisma database client mac"],
    answer:
      "Prisma Studio is useful when you want to work through the Prisma model. A PostgreSQL client is the better second window for raw SQL, views, partial indexes, extensions, execution plans, and database objects Prisma does not model.",
    inspect: [
      "Check the SQL emitted by a slow Prisma query.",
      "Inspect partial or expression indexes after a migration.",
      "Compare pooled application traffic with a direct migration connection.",
      "Browse views and extension-owned objects outside the Prisma model.",
    ],
    commands: `npx prisma validate
npx prisma migrate status
npx prisma db pull`,
    connectionHref: "/connection-string/prisma",
    connectionLabel: "Prisma PostgreSQL connection guide",
    source: {
      label: "Prisma PostgreSQL connector",
      href: "https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql",
    },
  },
];

export const workflowGuideSlugs = specs.map((spec) => spec.slug);

export function getWorkflowGuide(
  slug: string
): (SeoGuide & { keywords: string[]; slug: string }) | undefined {
  const spec = specs.find((item) => item.slug === slug);
  if (!spec) return undefined;

  return {
    slug: spec.slug,
    title: spec.title,
    eyebrow: `${spec.name} database workflow`,
    description: spec.description,
    keywords: spec.keywords,
    answer: spec.answer,
    facts: [
      { label: "Schema changes", value: `${spec.name} migrations` },
      { label: "Direct inspection", value: "PostgreSQL GUI or psql" },
      { label: "Connection secret", value: "DATABASE_URL" },
      { label: "Mac client", value: "PostgresGUI" },
    ],
    codeBlocks: [
      {
        title: "Keep these checks close",
        code: spec.commands,
      },
    ],
    sections: [
      {
        title: `What a PostgreSQL client adds to ${spec.name}`,
        paragraphs: [
          `The client should show you PostgreSQL as it is, not another interpretation of the ${spec.name} model. That makes it useful when an application-level check and a database-level check disagree.`,
        ],
        bullets: spec.inspect,
      },
      {
        title: "A routine that avoids schema drift",
        paragraphs: [
          `Create and apply schema changes through ${spec.name}. Reconnect the GUI after the migration, inspect the resulting table, constraint, or index, and save any diagnostic SQL with the issue that prompted it. Do not make an untracked production schema edit just because the GUI makes it easy.`,
        ],
      },
      {
        title: "Production data deserves a slower hand",
        paragraphs: [
          "Use a read-only database role for ordinary investigation. Start updates with a SELECT using the same WHERE clause, check the row count, and wrap manual changes in a transaction. A good client makes the result visible; it cannot decide whether the change is safe for your application.",
        ],
        code: {
          title: "Preview before an update",
          code: `begin;

select id, status
from orders
where status = 'stuck';

-- Run the update only after the result is the set you intended.
rollback;`,
        },
      },
      {
        title: "Why PostgresGUI fits this workflow",
        paragraphs: [
          "PostgresGUI is a native Mac app focused on PostgreSQL. It opens quickly for the common loop: connect, inspect a table, run SQL, and close the window. Choose a broader DBA suite when you need replication dashboards, backup wizards, or cross-database administration.",
        ],
      },
    ],
    faqs: [
      {
        question: `Does PostgresGUI replace ${spec.name} migrations?`,
        answer:
          "No. Keep migrations in the application repository so schema changes are reviewed, repeatable, and deployed with the code that expects them.",
      },
      {
        question: "Should developers connect to production from a GUI?",
        answer:
          "Only with the access controls your team permits. A read-only role, short-lived credentials, a VPN or tunnel, and audited access reduce the risk of an accidental write.",
      },
      {
        question: "When is psql enough?",
        answer:
          "psql is excellent for repeatable commands, scripts, and remote shells. A GUI helps when you need to scan wide results, move between related tables, or keep several diagnostic queries visible.",
      },
    ],
    related: [
      {
        href: spec.connectionHref,
        label: spec.connectionLabel,
        description: "Set the URI, SSL mode, and credentials without guessing at the format.",
      },
      {
        href: "/blog/psql-vs-postgresql-gui",
        label: "psql vs PostgreSQL GUI",
        description: "Choose by task instead of treating one interface as the universal answer.",
      },
      {
        href: "/download",
        label: "Download PostgresGUI",
        description: "A native, PostgreSQL-only client for macOS.",
      },
    ],
    sources: [
      spec.source,
      {
        label: "PostgreSQL EXPLAIN",
        href: "https://www.postgresql.org/docs/current/using-explain.html",
      },
    ],
  };
}
