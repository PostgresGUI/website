import type { SeoGuide } from "@/components/seo-guide-page";

type ConnectionGuideSpec = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  uri: string;
  env?: string;
  where: string;
  warning: string;
  test: string;
  source: { label: string; href: string };
};

const specs: ConnectionGuideSpec[] = [
  {
    slug: "supabase",
    name: "Supabase",
    title: "Supabase PostgreSQL Connection String",
    description:
      "Find the right Supabase Postgres URI for a desktop client, application runtime, or migration command, including direct and pooled connections.",
    keywords: ["supabase connection string", "supabase postgres url", "supabase database url"],
    uri: "postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres?sslmode=require",
    env: 'DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?sslmode=require"',
    where:
      "Open the project dashboard and choose Connect. Supabase shows direct, session-pooler, and transaction-pooler strings. A desktop GUI needs a session-capable connection; a serverless runtime often benefits from transaction pooling.",
    warning:
      "The direct endpoint is IPv6 by default on many projects. If your network is IPv4-only, use the shared pooler or the IPv4 add-on. Port 6543 is transaction mode and can conflict with features that depend on session state.",
    test: "psql \"$DATABASE_URL\" -c \"select version();\"",
    source: {
      label: "Supabase: Connect to your database",
      href: "https://supabase.com/docs/guides/database/connecting-to-postgres",
    },
  },
  {
    slug: "neon",
    name: "Neon",
    title: "Neon PostgreSQL Connection String",
    description:
      "Copy a Neon Postgres connection string, decide whether to use the pooled hostname, and test SSL before wiring it into an app.",
    keywords: ["neon connection string", "neon database url", "neon postgres connection"],
    uri: "postgresql://USER:PASSWORD@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require",
    env: 'DATABASE_URL="postgresql://USER:PASSWORD@ep-example-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"',
    where:
      "Use the Connect button on the Neon project dashboard, then choose a branch, database, and role. The generated string already includes the project hostname and SSL requirement.",
    warning:
      "Neon has direct and pooled hostnames. The pooled hostname contains -pooler and is a good default for runtimes that open many short connections. Keep a direct URL available for tools or migrations that need session behavior.",
    test: "psql \"$DATABASE_URL\" -c \"select current_database(), current_user;\"",
    source: {
      label: "Neon: Connect from any application",
      href: "https://neon.com/docs/connect/connect-from-any-app",
    },
  },
  {
    slug: "railway",
    name: "Railway",
    title: "Railway PostgreSQL Connection String",
    description:
      "Use Railway's generated DATABASE_URL inside a service or from your local Mac without mixing private and public hostnames.",
    keywords: ["railway postgres connection string", "railway database url", "railway postgresql"],
    uri: "postgresql://postgres:PASSWORD@HOST:PORT/railway",
    env: 'DATABASE_URL="${{Postgres.DATABASE_URL}}"',
    where:
      "Open the PostgreSQL service and look under Variables. Railway exposes a complete DATABASE_URL plus individual PGHOST, PGPORT, PGUSER, PGPASSWORD, and PGDATABASE values.",
    warning:
      "Railway services in the same project can use private networking. Your laptop cannot resolve that private hostname, so use the public TCP proxy values when connecting from PostgresGUI or psql.",
    test: "psql \"$DATABASE_URL\" -c \"select now();\"",
    source: {
      label: "Railway PostgreSQL guide",
      href: "https://docs.railway.com/guides/postgresql",
    },
  },
  {
    slug: "aws-rds",
    name: "Amazon RDS",
    title: "AWS RDS PostgreSQL Connection String",
    description:
      "Build an RDS for PostgreSQL URI from the instance endpoint, database name, user, and SSL settings.",
    keywords: ["aws rds postgres connection string", "rds postgresql url", "rds database url"],
    uri: "postgresql://DB_USER:PASSWORD@INSTANCE.abcdefg.REGION.rds.amazonaws.com:5432/DB_NAME?sslmode=require",
    where:
      "In the RDS console, open the database and copy the endpoint and port from Connectivity & security. The endpoint is a hostname, not a URL; add the PostgreSQL scheme, credentials, and database name.",
    warning:
      "A correct URI still fails if the security group does not allow your source IP or the instance is private. Do not make a production database publicly accessible just to fix a local connection; use a VPN, bastion, or SSH tunnel.",
    test: "psql \"$DATABASE_URL\" -c \"show ssl;\"",
    source: {
      label: "AWS: Connecting to a PostgreSQL DB instance",
      href: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToPostgreSQLInstance.html",
    },
  },
  {
    slug: "render",
    name: "Render",
    title: "Render PostgreSQL Connection String",
    description:
      "Choose the internal or external Render Postgres URL and connect from an app, psql, or a Mac database client.",
    keywords: ["render postgres connection string", "render database url", "render postgresql"],
    uri: "postgresql://USER:PASSWORD@HOST/DB_NAME?sslmode=require",
    where:
      "Open the Render Postgres dashboard and copy an Internal Database URL for Render services in the same region or an External Database URL for your local machine and outside services.",
    warning:
      "The internal hostname only resolves on Render's private network. External connections should use TLS and the external URL. Treat the copied URL as a secret because it includes the password.",
    test: "psql \"$DATABASE_URL\" -c \"select current_setting('server_version');\"",
    source: {
      label: "Render Postgres documentation",
      href: "https://render.com/docs/postgresql-creating-connecting",
    },
  },
  {
    slug: "prisma",
    name: "Prisma",
    title: "Prisma PostgreSQL Connection String",
    description:
      "Set DATABASE_URL for Prisma, keep pooled application traffic separate from direct migration traffic, and encode special characters correctly.",
    keywords: ["prisma postgresql connection string", "prisma database url", "prisma postgres url"],
    uri: "postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public&sslmode=require",
    env: 'DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"',
    where:
      "Put the URI in your environment and reference env(\"DATABASE_URL\") from the PostgreSQL datasource in schema.prisma. Current Prisma configuration can also place datasource URLs in prisma.config.ts.",
    warning:
      "Percent-encode reserved characters in the username and password. With a transaction pooler, migrations and introspection may need a separate direct URL because those commands expect a stable database session.",
    test: "npx prisma db pull",
    source: {
      label: "Prisma PostgreSQL connector",
      href: "https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql",
    },
  },
  {
    slug: "sqlalchemy",
    name: "SQLAlchemy",
    title: "SQLAlchemy PostgreSQL Connection String",
    description:
      "Create a SQLAlchemy 2 PostgreSQL URL for psycopg 3, pass it through an environment variable, and verify the driver.",
    keywords: ["sqlalchemy postgres connection string", "sqlalchemy postgresql url", "psycopg connection url"],
    uri: "postgresql+psycopg://USER:PASSWORD@HOST:5432/DB_NAME",
    env: 'DATABASE_URL="postgresql+psycopg://USER:PASSWORD@HOST:5432/DB_NAME"',
    where:
      "Use the postgresql+psycopg dialect for psycopg 3. Read the value from the environment and pass it to create_engine. The plain postgresql:// form leaves driver selection to SQLAlchemy.",
    warning:
      "A raw string breaks when credentials contain @, /, or :. Use SQLAlchemy's URL.create API when credentials come from separate settings, or percent-encode them in a URI.",
    test: "python -c \"from sqlalchemy import create_engine; import os; print(create_engine(os.environ['DATABASE_URL']).connect().exec_driver_sql('select 1').scalar())\"",
    source: {
      label: "SQLAlchemy PostgreSQL dialect",
      href: "https://docs.sqlalchemy.org/en/20/dialects/postgresql.html",
    },
  },
  {
    slug: "django",
    name: "Django",
    title: "Django PostgreSQL Connection Settings",
    description:
      "Translate a PostgreSQL URI into Django DATABASES settings and keep SSL options in the right place.",
    keywords: ["django postgres connection string", "django database url postgresql", "django postgres settings"],
    uri: "postgresql://USER:PASSWORD@HOST:5432/DB_NAME?sslmode=require",
    env: 'DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?sslmode=require"',
    where:
      "Django accepts explicit NAME, USER, PASSWORD, HOST, and PORT settings. Projects that prefer one DATABASE_URL commonly parse it with a small configuration package; the built-in setting is still a mapping.",
    warning:
      "Django's CONN_MAX_AGE controls persistent connections. Long-lived connections can exhaust a small hosted database, while a transaction pooler may require server-side cursors to be disabled.",
    test: "python manage.py dbshell",
    source: {
      label: "Django database settings",
      href: "https://docs.djangoproject.com/en/stable/ref/settings/#databases",
    },
  },
  {
    slug: "rails",
    name: "Ruby on Rails",
    title: "Rails PostgreSQL Connection String",
    description:
      "Configure Rails with DATABASE_URL, understand how it merges with database.yml, and test the connection before a deploy.",
    keywords: ["rails postgres connection string", "rails database url postgres", "ruby on rails postgresql"],
    uri: "postgresql://USER:PASSWORD@HOST:5432/DB_NAME?pool=5",
    env: 'DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"',
    where:
      "Rails reads DATABASE_URL automatically. A production database.yml can use url: <%= ENV.fetch(\"DATABASE_URL\") %> and set the pool from RAILS_MAX_THREADS.",
    warning:
      "If database.yml and DATABASE_URL both contain connection values, Rails merges them and the environment URL wins on duplicate keys. That can make a stale host in deployment settings hard to spot.",
    test: "bin/rails db:version",
    source: {
      label: "Rails: Configuring a database",
      href: "https://guides.rubyonrails.org/configuring.html#configuring-a-database",
    },
  },
  {
    slug: "jdbc",
    name: "JDBC",
    title: "PostgreSQL JDBC Connection String",
    description:
      "Build a PostgreSQL JDBC URL with SSL parameters and keep the username and password out of source code.",
    keywords: ["postgresql jdbc connection string", "jdbc postgres url", "postgres jdbc ssl"],
    uri: "jdbc:postgresql://HOST:5432/DB_NAME?sslmode=require",
    env: "JDBC_DATABASE_URL=jdbc:postgresql://HOST:5432/DB_NAME?sslmode=require",
    where:
      "A JDBC URL starts with jdbc:postgresql://, followed by the host, optional port, and database. Supply user and password as connection properties or through your framework's secret configuration.",
    warning:
      "JDBC URLs are not ordinary PostgreSQL URIs: the jdbc: prefix matters. For certificate verification, use verify-full and configure the root certificate instead of treating require as full identity verification.",
    test: "SELECT current_database(), current_user, ssl_is_used();",
    source: {
      label: "pgJDBC connection documentation",
      href: "https://jdbc.postgresql.org/documentation/use/",
    },
  },
  {
    slug: "psql",
    name: "psql",
    title: "psql PostgreSQL Connection String",
    description:
      "Connect with a PostgreSQL URI or individual psql flags, avoid leaking passwords into shell history, and test SSL.",
    keywords: ["psql connection string", "psql database url", "postgres command line connection"],
    uri: "postgresql://USER@HOST:5432/DB_NAME?sslmode=require",
    env: "PGPASSWORD='your-password' psql 'postgresql://USER@HOST:5432/DB_NAME?sslmode=require'",
    where:
      "psql accepts a URI after the command name or individual -h, -p, -U, and -d flags. The URI form is easiest to copy between a hosted database dashboard and a local terminal.",
    warning:
      "Putting the password directly in a command can save it in shell history and expose it to process inspection. Prefer a password file, a secret manager, or a short-lived PGPASSWORD value.",
    test: "psql \"$DATABASE_URL\" -c \"\\conninfo\"",
    source: {
      label: "PostgreSQL psql documentation",
      href: "https://www.postgresql.org/docs/current/app-psql.html",
    },
  },
];

export const connectionGuideSlugs = specs.map((spec) => spec.slug);
export const connectionGuideLinks = specs.map(({ slug, name }) => ({
  slug,
  name,
}));

export function getConnectionGuide(
  slug: string
): (SeoGuide & { keywords: string[]; slug: string }) | undefined {
  const spec = specs.find((item) => item.slug === slug);
  if (!spec) return undefined;

  return {
    slug: spec.slug,
    title: spec.title,
    eyebrow: `${spec.name} connection guide`,
    description: spec.description,
    keywords: spec.keywords,
    answer: `Use the connection value generated by ${spec.name}, keep it in an environment variable, and test it before changing application code. The URI shape below is a template, not a credential to paste unchanged.`,
    facts: [
      { label: "URI scheme", value: spec.slug === "jdbc" ? "jdbc:postgresql://" : "postgresql://" },
      { label: "Default PostgreSQL port", value: "5432" },
      { label: "Credential handling", value: "Environment variable or secret manager" },
      { label: "First test", value: spec.test },
    ],
    codeBlocks: [
      {
        title: "Connection string template",
        code: spec.uri,
        note: "Replace every uppercase placeholder. Percent-encode reserved characters in URI usernames and passwords.",
      },
      ...(spec.env
        ? [
            {
              title: "Environment variable",
              code: spec.env,
            },
          ]
        : []),
    ],
    sections: [
      {
        title: `Where to get the ${spec.name} values`,
        paragraphs: [spec.where],
      },
      {
        title: "The failure mode worth checking first",
        paragraphs: [spec.warning],
      },
      {
        title: "Test the connection",
        paragraphs: [
          "Run a cheap read-only command before migrations or application startup. That separates network, TLS, and authentication errors from framework configuration problems.",
        ],
        code: {
          title: "Connection check",
          code: spec.test,
        },
      },
      {
        title: "Open it in PostgresGUI",
        paragraphs: [
          "Paste the PostgreSQL URI into PostgresGUI or enter the same host, port, database, user, password, and SSL mode as separate fields. A desktop connection is useful for checking the visible schemas and role permissions before debugging the application layer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should the connection string be committed to Git?",
        answer:
          "No. Commit an example with placeholders and load the real value from an environment variable or secret manager.",
      },
      {
        question: "Why does a password with @ or # break the URI?",
        answer:
          "Those characters have meaning inside a URL. Percent-encode the username and password, or use a structured connection API instead of assembling a URL by hand.",
      },
      {
        question: "Do I need sslmode=require?",
        answer:
          "Most hosted PostgreSQL services require TLS. For strict certificate and hostname verification, use sslmode=verify-full with the provider's trusted root certificate when the client supports it.",
      },
    ],
    related: [
      {
        href: "/connection-string",
        label: "Connection string builder",
        description: "Build or parse a PostgreSQL URI without sending credentials to a server.",
      },
      {
        href: "/postgresql-tools",
        label: "PostgreSQL tools",
        description: "Open the SQL editor, schema designer, UUID generator, and reference tools.",
      },
      {
        href: "/postgresql-gui-mac",
        label: "PostgreSQL GUI for Mac",
        description:
          "Connect to local and hosted PostgreSQL databases from a native Mac app.",
      },
    ],
    sources: [
      spec.source,
      {
        label: "PostgreSQL connection URI format",
        href: "https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS",
      },
    ],
  };
}
