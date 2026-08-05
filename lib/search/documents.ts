import {
  beekeeperStudioData,
  datagripData,
  dbeaverData,
  pgadminData,
  posticoData,
} from "@/lib/alternatives-data";
import { blogPosts } from "@/lib/blog";
import {
  connectionGuideSlugs,
  getConnectionGuide,
} from "@/lib/connection-guides";
import { dataTypeGuideSlugs, getDataTypeGuide } from "@/lib/data-type-guides";
import { getWorkflowGuide, workflowGuideSlugs } from "@/lib/workflow-guides";
import type { SearchDocument } from "./types";

const productDocuments: SearchDocument[] = [
  {
    href: "/",
    title: "PostgresGUI for Mac",
    description:
      "A native, open-source PostgreSQL client for browsing data, running SQL, and inspecting schemas on macOS.",
    type: "product",
    keywords: ["postgres gui", "postgresql client mac", "database gui"],
    aliases: ["postgres app for mac", "postgres client", "postgresql gui"],
    priority: 30,
  },
  {
    href: "/download",
    title: "Download PostgresGUI for Mac",
    description:
      "Get PostgresGUI from the Mac App Store or build the open-source app locally.",
    type: "product",
    keywords: ["download postgresgui", "postgres gui download", "mac app"],
    aliases: ["install postgresgui", "get postgresgui"],
    priority: 30,
  },
  {
    href: "/postgresql-gui-mac",
    title: "PostgreSQL GUI for Mac",
    description:
      "See how a native PostgreSQL client handles connections, schemas, tables, and query work on macOS.",
    type: "product",
    keywords: [
      "postgresql gui mac",
      "postgres client mac",
      "mac database client",
    ],
    aliases: ["postgres gui for mac", "postgres app mac"],
    priority: 25,
  },
  {
    href: "/postgres-manager-mac",
    title: "Postgres Manager for Mac",
    description:
      "Manage PostgreSQL connections, browse tables, and run SQL from a focused native Mac application.",
    type: "product",
    keywords: ["postgres manager mac", "postgresql manager"],
  },
  {
    href: "/postgres-viewer-mac",
    title: "Postgres Viewer for Mac",
    description:
      "Browse PostgreSQL schemas, tables, rows, and query results from a native Mac app.",
    type: "product",
    keywords: ["postgres viewer mac", "postgres table viewer"],
  },
  {
    href: "/psql-gui",
    title: "A Visual GUI Alternative to psql",
    description:
      "Compare terminal-based psql workflows with a visual PostgreSQL client for Mac.",
    type: "product",
    keywords: ["psql gui", "postgres terminal alternative"],
  },
  {
    href: "/open-source-postgres-gui",
    title: "Open-Source Postgres GUI",
    description:
      "Review the source, build PostgresGUI yourself, and use a PostgreSQL client without telemetry.",
    type: "product",
    keywords: ["open source postgres gui", "open source postgresql client"],
  },
  {
    href: "/#pricing",
    title: "PostgresGUI Pricing",
    description:
      "See the one-time App Store price and the option to build PostgresGUI from source.",
    type: "product",
    keywords: ["postgresgui price", "postgresgui cost", "no subscription"],
    aliases: ["pricing"],
  },
];

const toolDocuments: SearchDocument[] = [
  {
    href: "/postgresql-tools",
    title: "Free PostgreSQL Tools",
    description:
      "Browse the online SQL editor, schema designer, data types, connection builder, cheatsheet, and UUID generator.",
    type: "tool",
    keywords: ["postgresql tools", "free postgres tools", "database tools"],
    priority: 20,
  },
  {
    href: "/sql-editor",
    title: "Online PostgreSQL SQL Editor",
    description:
      "Write SQL, create tables, insert sample data, and run queries directly in the browser.",
    type: "tool",
    keywords: ["online sql editor", "postgres query editor", "run sql online"],
    aliases: ["sql playground", "postgresql playground"],
    priority: 30,
  },
  {
    href: "/sql-compiler",
    title: "Online SQL Compiler",
    description:
      "Run PostgreSQL statements in the browser and inspect query output while learning SQL.",
    type: "tool",
    keywords: ["sql compiler", "compile sql online", "run postgresql online"],
    priority: 20,
  },
  {
    href: "/schema-designer",
    title: "PostgreSQL Schema Designer",
    description:
      "Design related database tables visually, import SQL, and export a PostgreSQL schema.",
    type: "tool",
    keywords: [
      "database schema designer",
      "postgres schema diagram",
      "database design",
    ],
    aliases: ["entity relationship diagram", "er diagram", "erd"],
    priority: 30,
  },
  {
    href: "/postgresql-er-diagram-from-sql",
    title: "PostgreSQL ER Diagram from SQL",
    description:
      "Turn PostgreSQL CREATE TABLE statements into a visual entity-relationship diagram.",
    type: "tool",
    keywords: [
      "postgresql er diagram",
      "sql to er diagram",
      "database diagram",
    ],
    aliases: ["entity relationship diagram", "erd"],
    priority: 25,
  },
  {
    href: "/connection-string",
    title: "PostgreSQL Connection String Builder",
    description:
      "Build or parse a PostgreSQL URL with host, port, credentials, SSL, and connection options.",
    type: "tool",
    keywords: ["postgres connection string", "postgresql url", "database url"],
    aliases: ["connection url", "database uri"],
    priority: 30,
  },
  {
    href: "/explain-checker",
    title: "Postgres EXPLAIN Checker",
    description:
      "Paste PostgreSQL EXPLAIN JSON and check for bad estimates, sequential scans, disk sorts, and temp I/O.",
    type: "tool",
    keywords: [
      "postgres explain checker",
      "postgresql explain analyzer",
      "explain analyze postgres",
      "postgres query plan",
    ],
    aliases: ["query plan checker", "explain plan analyzer"],
    priority: 30,
  },
  {
    href: "/migration-diff",
    title: "Postgres Migration Diff Generator",
    description:
      "Compare before and after PostgreSQL CREATE TABLE schemas and generate ALTER TABLE migration SQL.",
    type: "tool",
    keywords: [
      "postgres migration diff",
      "postgresql migration generator",
      "postgres schema diff",
      "postgres alter table generator",
    ],
    aliases: ["schema compare", "migration sql generator"],
    priority: 30,
  },
  {
    href: "/data-types",
    title: "PostgreSQL Data Type Picker",
    description:
      "Compare PostgreSQL column types, examples, storage notes, and common tradeoffs.",
    type: "tool",
    keywords: [
      "postgres data types",
      "postgresql column types",
      "choose data type",
    ],
    priority: 25,
  },
  {
    href: "/uuid-generator",
    title: "UUID Generator",
    description:
      "Generate UUID values for PostgreSQL test rows, fixtures, migrations, and application development.",
    type: "tool",
    keywords: ["uuid generator", "generate uuid", "postgres uuid"],
    aliases: ["uuid v4 generator", "uuid v7 generator"],
    priority: 30,
  },
  {
    href: "/sql-cheatsheet",
    title: "PostgreSQL SQL Cheatsheet",
    description:
      "Look up PostgreSQL SELECT, JOIN, JSONB, window-function, and schema examples.",
    type: "tool",
    keywords: ["postgresql cheatsheet", "sql cheat sheet", "postgres syntax"],
    priority: 25,
  },
];

const blogDocuments: SearchDocument[] = blogPosts.map((post) => ({
  href: `/blog/${post.slug}`,
  title: post.title,
  description: post.description,
  type: "guide",
  keywords: post.keywords,
  section: post.category,
}));

const connectionDocuments: SearchDocument[] = connectionGuideSlugs.flatMap(
  (slug) => {
    const guide = getConnectionGuide(slug);
    return guide
      ? [
          {
            href: `/connection-string/${slug}`,
            title: guide.title,
            description: guide.description,
            type: "reference" as const,
            keywords: guide.keywords,
            section: "Connection guide",
          },
        ]
      : [];
  },
);

const dataTypeDocuments: SearchDocument[] = dataTypeGuideSlugs.flatMap(
  (slug) => {
    const guide = getDataTypeGuide(slug);
    return guide
      ? [
          {
            href: `/postgresql-data-types/${slug}`,
            title: guide.title,
            description: guide.description,
            type: "reference" as const,
            keywords: guide.keywords,
            section: "Data type guide",
          },
        ]
      : [];
  },
);

const workflowDocuments: SearchDocument[] = workflowGuideSlugs.flatMap(
  (slug) => {
    const guide = getWorkflowGuide(slug);
    return guide
      ? [
          {
            href: `/postgresql-client-for/${slug}`,
            title: guide.title,
            description: guide.description,
            type: "guide" as const,
            keywords: guide.keywords,
            section: "Framework workflow",
          },
        ]
      : [];
  },
);

const alternativeDocuments: SearchDocument[] = [
  pgadminData,
  posticoData,
  dbeaverData,
  beekeeperStudioData,
  datagripData,
].map((alternative) => ({
  href: `/alternatives/${alternative.slug}`,
  title: `${alternative.competitor} Alternative for Mac`,
  description: alternative.seo.description,
  type: "comparison",
  keywords: alternative.seo.keywords,
  aliases: [`PostgresGUI vs ${alternative.competitor}`],
  priority: 10,
}));

const additionalDocuments: SearchDocument[] = [
  {
    href: "/alternatives/tableplus",
    title: "TablePlus Alternative for Mac",
    description:
      "Compare PostgresGUI with TablePlus for native PostgreSQL work on macOS.",
    type: "comparison",
    keywords: ["tableplus alternative", "postgresgui vs tableplus"],
  },
  {
    href: "/alternatives/postico-vs-tableplus",
    title: "Postico vs TablePlus",
    description:
      "Compare two popular Mac database clients and see where a focused PostgreSQL client fits.",
    type: "comparison",
    keywords: ["postico vs tableplus", "mac postgres client comparison"],
  },
];

const allDocuments = [
  ...productDocuments,
  ...toolDocuments,
  ...blogDocuments,
  ...connectionDocuments,
  ...dataTypeDocuments,
  ...workflowDocuments,
  ...alternativeDocuments,
  ...additionalDocuments,
];

export const searchDocumentsIndex: SearchDocument[] = Array.from(
  new Map(allDocuments.map((document) => [document.href, document])).values(),
);

export const popularSearchDocuments = [
  "/download",
  "/sql-editor",
  "/connection-string",
  "/schema-designer",
  "/postgresql-tools",
  "/blog/postgres-mcp-server",
].flatMap((href) => {
  const document = searchDocumentsIndex.find((item) => item.href === href);
  return document ? [document] : [];
});
