import type { Metadata } from "next";

export const SITE_URL = "https://postgresgui.com";
export const BLOG_IMAGE = `${SITE_URL}/postgresgui-og-image.jpg`;

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSource = {
  title: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  dateModified?: string;
  author: string;
  category: string;
  pillar: string;
  relatedSlugs: string[];
  faqs?: BlogFaq[];
  sources?: BlogSource[];
};

export type BlogPostInfo = Pick<
  BlogPost,
  "slug" | "date" | "title" | "description" | "author" | "category" | "pillar"
>;

export const blogPosts: BlogPost[] = [
  {
    slug: "install-psql-mac",
    title: "How to Install psql on Mac",
    description:
      "Install psql on Mac with Homebrew, Postgres.app, or the PostgreSQL installer. Learn what psql is, how to check your version, and when a GUI client helps.",
    keywords: [
      "install psql mac",
      "psql install mac",
      "mac install psql",
      "install postgres client on mac",
      "mac install postgres client",
      "psql mac",
      "download postgresql for mac",
    ],
    date: "2026-07-19",
    author: "Ghazi",
    category: "Tutorial",
    pillar: "PostgreSQL Learning",
    relatedSlugs: [
      "download-postgresql-for-mac",
      "best-mac-postgresql-gui-client",
      "postgres-column-types",
    ],
    faqs: [
      {
        question: "What is psql on Mac?",
        answer:
          "psql is the official PostgreSQL command-line client. On Mac, you can install it with Homebrew, Postgres.app, or the PostgreSQL installer.",
      },
      {
        question: "Do you need to install the full PostgreSQL server to get psql?",
        answer:
          "Not always. Homebrew can install PostgreSQL client tools, while Postgres.app and the PostgreSQL installer include both server and client utilities.",
      },
    ],
    sources: [
      { title: "PostgreSQL psql documentation", url: "https://www.postgresql.org/docs/current/app-psql.html" },
      { title: "PostgreSQL macOS downloads", url: "https://www.postgresql.org/download/macosx/" },
      { title: "Postgres.app documentation", url: "https://postgresapp.com/documentation/" },
    ],
  },
  {
    slug: "download-postgresql-for-mac",
    title: "Download PostgreSQL for Mac: Server, psql, and GUI Options",
    description:
      "A practical guide to downloading PostgreSQL for Mac, installing psql, choosing Postgres.app or Homebrew, and adding a native GUI client.",
    keywords: [
      "download postgresql for mac",
      "postgresql download mac",
      "install postgres client on mac",
      "mac install postgres client",
      "psql mac",
      "postgres client mac",
      "postgres gui mac",
    ],
    date: "2026-07-19",
    author: "Ghazi",
    category: "Tutorial",
    pillar: "PostgreSQL Learning",
    relatedSlugs: [
      "install-psql-mac",
      "best-mac-postgresql-gui-client",
      "only-postgres-gui-mac-no-subscription",
    ],
    faqs: [
      {
        question: "What is the easiest way to download PostgreSQL for Mac?",
        answer:
          "Postgres.app is a simple Mac-native option for local development. Homebrew is also popular if you prefer managing packages from the terminal.",
      },
      {
        question: "Is PostgresGUI a PostgreSQL server?",
        answer:
          "No. PostgresGUI is a client for connecting to PostgreSQL databases. You still need a local, cloud, Docker, or hosted PostgreSQL server.",
      },
    ],
    sources: [
      { title: "PostgreSQL macOS downloads", url: "https://www.postgresql.org/download/macosx/" },
      { title: "Postgres.app", url: "https://postgresapp.com/" },
      { title: "Homebrew PostgreSQL formula", url: "https://formulae.brew.sh/formula/postgresql@16" },
    ],
  },
  {
    slug: "postgres-column-types",
    title: "Postgres Column Types: A Practical Guide",
    description:
      "Choose the right Postgres column types for text, numbers, dates, JSON, UUIDs, arrays, booleans, and generated identity columns.",
    keywords: [
      "postgres column types",
      "postgres types",
      "postgres datatypes",
      "postgresql data types",
      "postgresql types",
      "postgres data types",
      "postgres text types",
      "postgres integer types",
    ],
    date: "2026-07-19",
    author: "Ghazi",
    category: "Reference",
    pillar: "PostgreSQL Learning",
    relatedSlugs: [
      "install-psql-mac",
      "best-postgresql-backup-solution",
      "migrate-mysql-to-postgresql",
    ],
    faqs: [
      {
        question: "What are the most common Postgres column types?",
        answer:
          "Common Postgres column types include text, integer, bigint, numeric, boolean, date, timestamptz, uuid, jsonb, arrays, and generated identity columns.",
      },
      {
        question: "Should you use text or varchar in Postgres?",
        answer:
          "Use text by default unless you need a specific length constraint. In PostgreSQL, text and varchar have similar performance characteristics.",
      },
    ],
    sources: [
      { title: "PostgreSQL data types documentation", url: "https://www.postgresql.org/docs/current/datatype.html" },
      { title: "PostgreSQL numeric types", url: "https://www.postgresql.org/docs/current/datatype-numeric.html" },
      { title: "PostgreSQL date/time types", url: "https://www.postgresql.org/docs/current/datatype-datetime.html" },
    ],
  },
  {
    slug: "best-sql-ide-for-postgresql",
    title: "Best SQL IDEs for PostgreSQL in 2026",
    description:
      "Compare the best SQL IDEs and PostgreSQL GUI tools, including PostgresGUI, DataGrip, DBeaver, TablePlus, pgAdmin, and VS Code extensions.",
    keywords: [
      "best sql ide",
      "postgresql gui tools",
      "postgres gui client",
      "best postgres gui",
      "best postgres client mac",
      "best postgres client for mac",
      "sql ide for postgresql",
      "postgresql ide",
    ],
    date: "2026-07-19",
    author: "Ghazi",
    category: "Tools",
    pillar: "PostgreSQL GUI",
    relatedSlugs: [
      "best-mac-postgresql-gui-client",
      "best-pgadmin-alternative-mac",
      "only-postgres-gui-mac-no-subscription",
    ],
    faqs: [
      {
        question: "What is the best SQL IDE for PostgreSQL?",
        answer:
          "The best SQL IDE depends on whether you want a full multi-database IDE, a lightweight PostgreSQL client, or a browser-based editor. PostgresGUI is focused on native Mac PostgreSQL workflows.",
      },
      {
        question: "Is a SQL IDE different from a PostgreSQL GUI?",
        answer:
          "A SQL IDE usually emphasizes query authoring and code intelligence. A PostgreSQL GUI also focuses on browsing schemas, viewing table data, editing rows, and managing connections.",
      },
    ],
    sources: [
      { title: "PostgresGUI source code", url: "https://github.com/postgresgui/postgresgui" },
      { title: "pgAdmin", url: "https://www.pgadmin.org/" },
      { title: "DBeaver", url: "https://dbeaver.io/" },
    ],
  },
  {
    slug: "database-schema-design-online",
    title: "Database Schema Design Online: How to Plan Tables Before You Build",
    description:
      "Design a database schema online, plan tables and relationships, generate SQL, and avoid common schema design mistakes before writing application code.",
    keywords: [
      "database schema design",
      "database schema online",
      "online database schema designer",
      "create database schema online",
      "database schema design online",
      "database schema design software",
      "sql schema design",
      "sql database design",
    ],
    date: "2026-07-19",
    author: "Ghazi",
    category: "Design",
    pillar: "PostgreSQL Tools",
    relatedSlugs: [
      "postgres-column-types",
      "migrate-mysql-to-postgresql",
      "best-sql-ide-for-postgresql",
    ],
    faqs: [
      {
        question: "Can you design a database schema online?",
        answer:
          "Yes. An online database schema designer lets you model tables, columns, primary keys, and relationships before exporting SQL.",
      },
      {
        question: "What should you decide before creating a database schema?",
        answer:
          "Decide your core entities, primary keys, relationships, required fields, data types, indexes, and which rules belong in constraints.",
      },
    ],
    sources: [
      { title: "PostgreSQL CREATE TABLE documentation", url: "https://www.postgresql.org/docs/current/sql-createtable.html" },
      { title: "PostgreSQL constraints documentation", url: "https://www.postgresql.org/docs/current/ddl-constraints.html" },
    ],
  },
  {
    slug: "hello-world",
    title: "Hello World",
    description:
      "Welcome to the PostgresGUI blog! This is our first post introducing our blog and sharing updates about our lightweight PostgreSQL client for Mac.",
    keywords: ["PostgresGUI", "PostgreSQL", "blog", "database", "Mac", "macOS"],
    date: "2025-01-15",
    author: "Ghazi",
    category: "Product",
    pillar: "PostgreSQL GUI",
    relatedSlugs: [
      "only-postgres-gui-mac-no-subscription",
      "best-mac-postgresql-gui-client",
      "best-pgadmin-alternative-mac",
    ],
  },
  {
    slug: "best-postgresql-cloud-provider",
    title: "Best PostgreSQL Cloud Providers in 2026",
    description:
      "Compare the best PostgreSQL cloud providers in 2026. From Neon and Supabase to AWS RDS, find the right managed PostgreSQL hosting for your project.",
    keywords: [
      "PostgreSQL cloud provider",
      "managed PostgreSQL",
      "cloud database",
      "PostgreSQL hosting",
      "Neon Postgres",
      "Supabase",
      "AWS RDS PostgreSQL",
      "Google Cloud SQL",
      "Azure PostgreSQL",
      "DigitalOcean PostgreSQL",
      "Railway Postgres",
      "Render Postgres",
    ],
    date: "2025-02-04",
    author: "Ghazi",
    category: "Hosting",
    pillar: "PostgreSQL Operations",
    relatedSlugs: [
      "postgresql-monitoring-tools",
      "best-postgresql-backup-solution",
      "migrate-mysql-to-postgresql",
    ],
    faqs: [
      {
        question: "What is a PostgreSQL cloud provider?",
        answer:
          "A PostgreSQL cloud provider runs and manages Postgres infrastructure for you, usually including backups, upgrades, monitoring, scaling, and connection security.",
      },
      {
        question: "Which managed Postgres provider is best for side projects?",
        answer:
          "Neon, Supabase, Render, Railway, and DigitalOcean are common side-project choices because they have simple setup flows and approachable entry pricing.",
      },
    ],
    sources: [
      { title: "PostgreSQL documentation", url: "https://www.postgresql.org/docs/current/" },
      { title: "Neon documentation", url: "https://neon.com/docs" },
      { title: "Supabase database documentation", url: "https://supabase.com/docs/guides/database" },
    ],
  },
  {
    slug: "migrate-mysql-to-postgresql",
    title: "How to Migrate from MySQL to PostgreSQL: A Practical Guide",
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
    date: "2026-02-04",
    author: "Ghazi",
    category: "Migration",
    pillar: "PostgreSQL Migration",
    relatedSlugs: [
      "switch-from-sql-server-to-postgresql",
      "best-postgresql-cloud-provider",
      "best-mac-postgresql-gui-client",
    ],
    faqs: [
      {
        question: "Can you migrate MySQL to PostgreSQL directly?",
        answer:
          "Yes. Tools like pgloader can move MySQL schemas and data into PostgreSQL, but most production migrations still need type mapping, SQL review, testing, and application changes.",
      },
      {
        question: "What is the hardest part of moving from MySQL to Postgres?",
        answer:
          "The hardest parts are usually SQL behavior differences, data type mapping, indexes, constraints, and application assumptions that were built around MySQL-specific behavior.",
      },
    ],
    sources: [
      { title: "PostgreSQL documentation", url: "https://www.postgresql.org/docs/current/" },
      { title: "pgloader project", url: "https://github.com/dimitri/pgloader" },
    ],
  },
  {
    slug: "switch-from-sql-server-to-postgresql",
    title: "How to Switch from SQL Server to PostgreSQL",
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
    date: "2026-02-04",
    author: "Ghazi",
    category: "Migration",
    pillar: "PostgreSQL Migration",
    relatedSlugs: [
      "migrate-mysql-to-postgresql",
      "best-postgresql-cloud-provider",
      "postgresql-monitoring-tools",
    ],
    faqs: [
      {
        question: "Can SQL Server applications move to PostgreSQL?",
        answer:
          "Yes, but the migration usually requires schema conversion, T-SQL changes, data type review, application testing, and a cutover plan.",
      },
      {
        question: "Is PostgreSQL a good SQL Server alternative?",
        answer:
          "PostgreSQL is a strong SQL Server alternative for many workloads, especially teams that want open source licensing, extensibility, and broad cloud support.",
      },
    ],
    sources: [
      { title: "PostgreSQL documentation", url: "https://www.postgresql.org/docs/current/" },
      { title: "Microsoft SQL Server documentation", url: "https://learn.microsoft.com/sql/sql-server/" },
    ],
  },
  {
    slug: "best-mac-postgresql-gui-client",
    title: "Best Mac PostgreSQL GUI Clients in 2026",
    description:
      "Compare the best PostgreSQL GUI clients for Mac in 2026. From lightweight native apps to full-featured IDEs, find the right Postgres client for your workflow.",
    keywords: [
      "PostgreSQL GUI Mac",
      "Postgres client Mac",
      "PostgreSQL Mac app",
      "OSX Postgres client",
      "macOS Postgres client",
      "best Postgres client for Mac",
      "best Mac Postgres client",
      "pgAdmin Mac",
      "TablePlus",
      "DBeaver Mac",
      "DataGrip PostgreSQL",
      "Postico",
      "PostgresGUI",
      "Beekeeper Studio",
      "best Postgres GUI",
      "database client macOS",
    ],
    date: "2026-02-04",
    author: "Ghazi",
    category: "Tools",
    pillar: "PostgreSQL GUI",
    relatedSlugs: [
      "best-pgadmin-alternative-mac",
      "only-postgres-gui-mac-no-subscription",
      "best-sql-ide-for-postgresql",
    ],
    faqs: [
      {
        question: "What is the best PostgreSQL GUI for Mac?",
        answer:
          "The best PostgreSQL GUI for Mac depends on your workflow. PostgresGUI is focused on native macOS Postgres work, while TablePlus, DataGrip, DBeaver, Postico, and pgAdmin suit different needs.",
      },
      {
        question: "Do you need a GUI to use PostgreSQL on Mac?",
        answer:
          "No. You can use psql or other command-line tools, but a GUI is useful for browsing tables, editing data, running saved queries, and inspecting results quickly.",
      },
    ],
    sources: [
      { title: "PostgresGUI source code", url: "https://github.com/postgresgui/postgresgui" },
      { title: "pgAdmin project", url: "https://www.pgadmin.org/" },
      { title: "DBeaver project", url: "https://dbeaver.io/" },
    ],
  },
  {
    slug: "postgresql-monitoring-tools",
    title: "Best PostgreSQL Monitoring Tools in 2026",
    description:
      "Compare the best PostgreSQL monitoring tools in 2026. From built-in statistics views and pg_stat_statements to Prometheus, Datadog, and pgwatch2, find the right monitoring stack for your Postgres database.",
    keywords: [
      "PostgreSQL monitoring",
      "PostgreSQL monitoring tools",
      "pg_stat_statements",
      "pgBadger",
      "pgwatch2",
      "Prometheus PostgreSQL",
      "Datadog PostgreSQL",
      "Percona PMM",
      "PostgreSQL performance",
      "database monitoring",
      "PostgreSQL observability",
      "postgres_exporter",
    ],
    date: "2026-02-04",
    author: "Ghazi",
    category: "Operations",
    pillar: "PostgreSQL Operations",
    relatedSlugs: [
      "best-postgresql-backup-solution",
      "best-postgresql-cloud-provider",
      "best-mac-postgresql-gui-client",
    ],
    faqs: [
      {
        question: "What should you monitor in PostgreSQL?",
        answer:
          "Start with slow queries, connections, replication lag, cache hit ratio, table bloat, vacuum activity, locks, disk usage, and backup health.",
      },
      {
        question: "Is pg_stat_statements enough for PostgreSQL monitoring?",
        answer:
          "pg_stat_statements is essential for query analysis, but production systems usually also need metrics, logs, dashboards, alerting, and backup monitoring.",
      },
    ],
    sources: [
      { title: "PostgreSQL monitoring documentation", url: "https://www.postgresql.org/docs/current/monitoring.html" },
      { title: "pg_stat_statements documentation", url: "https://www.postgresql.org/docs/current/pgstatstatements.html" },
      { title: "Prometheus postgres exporter", url: "https://github.com/prometheus-community/postgres_exporter" },
    ],
  },
  {
    slug: "best-postgresql-backup-solution",
    title: "Best PostgreSQL Backup Solutions in 2026: Tools, Strategies, and Best Practices",
    description:
      "Compare the best PostgreSQL backup solutions in 2026. From pg_dump and pgBackRest to Barman and WAL-G, find the right backup strategy for your database.",
    keywords: [
      "PostgreSQL backup",
      "pg_dump",
      "pgBackRest",
      "Barman",
      "WAL-G",
      "PostgreSQL point-in-time recovery",
      "database backup strategy",
      "PostgreSQL WAL archiving",
      "pg_basebackup",
      "PostgreSQL disaster recovery",
      "logical backup PostgreSQL",
      "continuous archiving PostgreSQL",
    ],
    date: "2026-02-04",
    author: "Ghazi",
    category: "Operations",
    pillar: "PostgreSQL Operations",
    relatedSlugs: [
      "postgresql-monitoring-tools",
      "best-postgresql-cloud-provider",
      "switch-from-sql-server-to-postgresql",
    ],
    faqs: [
      {
        question: "What is the best PostgreSQL backup strategy?",
        answer:
          "The best strategy usually combines regular logical backups, physical backups, WAL archiving, restore testing, and monitoring so you know backups are actually recoverable.",
      },
      {
        question: "Is pg_dump enough for PostgreSQL backups?",
        answer:
          "pg_dump is useful for portable logical backups, but larger or critical databases usually need physical backups, WAL archiving, and point-in-time recovery.",
      },
    ],
    sources: [
      { title: "PostgreSQL backup and restore documentation", url: "https://www.postgresql.org/docs/current/backup.html" },
      { title: "pgBackRest documentation", url: "https://pgbackrest.org/" },
      { title: "Barman documentation", url: "https://docs.pgbarman.org/" },
    ],
  },
  {
    slug: "best-pgadmin-alternative-mac",
    title: "Best pgAdmin Alternatives for Mac (That You'll Actually Enjoy Using)",
    description:
      "Tired of pgAdmin on Mac? Discover the best pgAdmin alternatives that are native, fast, and actually enjoyable to use. Compare PostgresGUI, Postico, TablePlus, DBeaver, and more.",
    keywords: [
      "pgAdmin alternative",
      "pgAdmin alternative Mac",
      "alternative to pgadmin",
      "pgadmin4 alternatives",
      "pgAdmin replacement",
      "pgAdmin vs",
      "PostgreSQL GUI Mac",
      "best pgAdmin alternative",
      "pgAdmin slow Mac",
      "native PostgreSQL client Mac",
      "PostgresGUI",
      "Postico",
      "TablePlus",
      "DBeaver",
      "Beekeeper Studio",
    ],
    date: "2026-02-26",
    author: "Ghazi",
    category: "Tools",
    pillar: "PostgreSQL GUI",
    relatedSlugs: [
      "best-mac-postgresql-gui-client",
      "only-postgres-gui-mac-no-subscription",
      "best-sql-ide-for-postgresql",
    ],
    faqs: [
      {
        question: "What is a good pgAdmin alternative for Mac?",
        answer:
          "PostgresGUI, Postico, TablePlus, DBeaver, and Beekeeper Studio are common pgAdmin alternatives on Mac, depending on whether you prioritize native feel, multi-database support, or advanced administration.",
      },
      {
        question: "Why do people look for pgAdmin alternatives?",
        answer:
          "Many developers want a more native desktop feel, faster startup, simpler workflows, or a focused PostgreSQL client instead of a browser-based administration tool.",
      },
    ],
    sources: [
      { title: "pgAdmin project", url: "https://www.pgadmin.org/" },
      { title: "PostgresGUI source code", url: "https://github.com/postgresgui/postgresgui" },
    ],
  },
  {
    slug: "only-postgres-gui-mac-no-subscription",
    title: "The Only Postgres GUI for Mac With No Subscription",
    description:
      "PostgresGUI is a native Mac Postgres client for $12.99 - one time. No subscription, no telemetry, fully open source. See how it compares to TablePlus, Postico, and DataGrip.",
    keywords: [
      "Postgres GUI Mac",
      "PostgreSQL client Mac",
      "no subscription database tool",
      "PostgresGUI",
      "free Postgres client Mac",
      "Postgres client Mac free",
      "TablePlus alternative",
      "Postico alternative",
      "DataGrip alternative",
      "native Mac database client",
      "open source Postgres GUI",
      "one time purchase database tool",
    ],
    date: "2026-03-03",
    author: "Ghazi",
    category: "Pricing",
    pillar: "PostgreSQL GUI",
    relatedSlugs: [
      "best-mac-postgresql-gui-client",
      "best-pgadmin-alternative-mac",
      "hello-world",
    ],
    faqs: [
      {
        question: "Is PostgresGUI a subscription?",
        answer:
          "No. PostgresGUI uses a one-time Mac App Store purchase model instead of a monthly or annual subscription.",
      },
      {
        question: "Is PostgresGUI open source?",
        answer:
          "Yes. PostgresGUI is open source, and the public repository is available on GitHub.",
      },
    ],
    sources: [
      { title: "PostgresGUI source code", url: "https://github.com/postgresgui/postgresgui" },
      { title: "PostgresGUI on the Mac App Store", url: "https://apps.apple.com/app/postgresgui/id6756467181" },
    ],
  },
];

export const posts: BlogPostInfo[] = blogPosts
  .map(({ slug, date, title, description, author, category, pillar }) => ({
    slug,
    date,
    title,
    description,
    author,
    category,
    pillar,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getBlogPost(slug: string): BlogPost {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    throw new Error(`Unknown blog post: ${slug}`);
  }

  return post;
}

export function getRelatedBlogPosts(post: BlogPost): BlogPostInfo[] {
  return post.relatedSlugs.map((slug) => getBlogPost(slug));
}

export function getBlogPostUrl(post: BlogPost | BlogPostInfo): string {
  return `${SITE_URL}/blog/${post.slug}`;
}

export function getBlogPostMetadata(slug: string): Metadata {
  const post = getBlogPost(slug);
  const url = getBlogPostUrl(post);
  const publishedTime = `${post.date}T00:00:00Z`;
  const modifiedTime = `${post.dateModified ?? post.date}T00:00:00Z`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime,
      modifiedTime,
      url,
      siteName: "PostgresGUI",
      locale: "en_US",
      images: [
        {
          url: BLOG_IMAGE,
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
      title: post.title,
      description: post.description,
      images: [
        {
          url: BLOG_IMAGE,
          alt: "PostgresGUI - Native PostgreSQL Client for Mac",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
