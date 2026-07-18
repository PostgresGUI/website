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
      "postgresql-monitoring-tools",
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
      "postgresql-monitoring-tools",
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
