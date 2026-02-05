import { metadata as helloWorldMetadata } from "./hello-world/page";
import { metadata as bestPostgresCloudProviderMetadata } from "./best-postgresql-cloud-provider/page";
import { metadata as migrateMySQLToPostgreSQLMetadata } from "./migrate-mysql-to-postgresql/page";
import { metadata as switchFromSqlServerMetadata } from "./switch-from-sql-server-to-postgresql/page";
import { metadata as bestMacPostgreSQLGUIClientMetadata } from "./best-mac-postgresql-gui-client/page";
import { metadata as postgresqlMonitoringToolsMetadata } from "./postgresql-monitoring-tools/page";
import { metadata as bestPostgreSQLBackupSolutionMetadata } from "./best-postgresql-backup-solution/page";

export type BlogPostInfo = {
  slug: string;
  date: string;
  title: string;
  description: string;
};

function stripBlogSuffix(title: string): string {
  return title.replace(/ - PostgresGUI Blog$/, "");
}

export const posts: BlogPostInfo[] = [
  {
    slug: "hello-world",
    date: "2025-01-15",
    title: stripBlogSuffix(helloWorldMetadata.title as string),
    description: helloWorldMetadata.description as string,
  },
  {
    slug: "best-postgresql-cloud-provider",
    date: "2025-02-04",
    title: stripBlogSuffix(bestPostgresCloudProviderMetadata.title as string),
    description: bestPostgresCloudProviderMetadata.description as string,
  },
  {
    slug: "migrate-mysql-to-postgresql",
    date: "2026-02-04",
    title: stripBlogSuffix(migrateMySQLToPostgreSQLMetadata.title as string),
    description: migrateMySQLToPostgreSQLMetadata.description as string,
  },
  {
    slug: "switch-from-sql-server-to-postgresql",
    date: "2026-02-04",
    title: stripBlogSuffix(switchFromSqlServerMetadata.title as string),
    description: switchFromSqlServerMetadata.description as string,
  },
  {
    slug: "best-mac-postgresql-gui-client",
    date: "2026-02-04",
    title: stripBlogSuffix(bestMacPostgreSQLGUIClientMetadata.title as string),
    description: bestMacPostgreSQLGUIClientMetadata.description as string,
  },
  {
    slug: "postgresql-monitoring-tools",
    date: "2026-02-04",
    title: stripBlogSuffix(postgresqlMonitoringToolsMetadata.title as string),
    description: postgresqlMonitoringToolsMetadata.description as string,
  },
  {
    slug: "best-postgresql-backup-solution",
    date: "2026-02-04",
    title: stripBlogSuffix(bestPostgreSQLBackupSolutionMetadata.title as string),
    description: bestPostgreSQLBackupSolutionMetadata.description as string,
  },
].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
