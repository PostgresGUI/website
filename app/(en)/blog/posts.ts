import { metadata as helloWorldMetadata } from "./hello-world/page";
import { metadata as bestPostgresCloudProviderMetadata } from "./best-postgresql-cloud-provider/page";
import { metadata as migrateMySQLToPostgreSQLMetadata } from "./migrate-mysql-to-postgresql/page";
import { metadata as switchFromSqlServerMetadata } from "./switch-from-sql-server-to-postgresql/page";
import { metadata as bestMacPostgreSQLGUIClientMetadata } from "./best-mac-postgresql-gui-client/page";
import { metadata as postgresqlMonitoringToolsMetadata } from "./postgresql-monitoring-tools/page";
import { metadata as bestPostgreSQLBackupSolutionMetadata } from "./best-postgresql-backup-solution/page";
import { metadata as bestPgAdminAlternativeMacMetadata } from "./best-pgadmin-alternative-mac/page";

export type BlogPostInfo = {
  slug: string;
  date: string;
  title: string;
  description: string;
  author: string;
};

function stripBlogSuffix(title: string): string {
  return title.replace(/$/, "");
}

export const posts: BlogPostInfo[] = [
  {
    slug: "hello-world",
    date: "2025-01-15",
    title: stripBlogSuffix(helloWorldMetadata.title as string),
    description: helloWorldMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "best-postgresql-cloud-provider",
    date: "2025-02-04",
    title: stripBlogSuffix(bestPostgresCloudProviderMetadata.title as string),
    description: bestPostgresCloudProviderMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "migrate-mysql-to-postgresql",
    date: "2026-02-04",
    title: stripBlogSuffix(migrateMySQLToPostgreSQLMetadata.title as string),
    description: migrateMySQLToPostgreSQLMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "switch-from-sql-server-to-postgresql",
    date: "2026-02-04",
    title: stripBlogSuffix(switchFromSqlServerMetadata.title as string),
    description: switchFromSqlServerMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "best-mac-postgresql-gui-client",
    date: "2026-02-04",
    title: stripBlogSuffix(bestMacPostgreSQLGUIClientMetadata.title as string),
    description: bestMacPostgreSQLGUIClientMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "postgresql-monitoring-tools",
    date: "2026-02-04",
    title: stripBlogSuffix(postgresqlMonitoringToolsMetadata.title as string),
    description: postgresqlMonitoringToolsMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "best-postgresql-backup-solution",
    date: "2026-02-04",
    title: stripBlogSuffix(bestPostgreSQLBackupSolutionMetadata.title as string),
    description: bestPostgreSQLBackupSolutionMetadata.description as string,
    author: "Ghazi",
  },
  {
    slug: "best-pgadmin-alternative-mac",
    date: "2026-02-26",
    title: stripBlogSuffix(bestPgAdminAlternativeMacMetadata.title as string),
    description: bestPgAdminAlternativeMacMetadata.description as string,
    author: "Ghazi",
  },
].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
