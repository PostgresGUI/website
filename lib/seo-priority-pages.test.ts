import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBlogPost } from "@/lib/blog";

const root = process.cwd();

function read(path: string): string {
  return readFileSync(join(root, path), "utf8");
}

const priorityPagePaths = [
  "app/(en)/blog/best-mac-postgresql-gui-client/page.tsx",
  "app/(en)/blog/best-postgresql-backup-solution/page.tsx",
  "app/(en)/blog/best-postgresql-cloud-provider/page.tsx",
  "app/(apps)/sql-cheatsheet/page.tsx",
];

const establishedLinkSourcePaths = [
  ...priorityPagePaths,
  "app/(en)/blog/postgresql-monitoring-tools/page.tsx",
  "app/(en)/blog/explain-analyze-postgres/page.tsx",
  "app/(en)/blog/ssl-verify-full-for-rds-postgresql-on-mac/page.tsx",
  "app/(en)/blog/postgres-app-vs-postgresgui/page.tsx",
  "app/(en)/blog/migrate-mysql-to-postgresql/page.tsx",
];

const newGuideSlugs = [
  "postgres-connection-refused-mac",
  "postgresql-sslmode-explained",
  "postgresql-permission-denied-for-relation",
  "pg-dump-pg-restore-mac",
  "connect-postgresgui-to-postgres-app",
  "postgresql-locks-blocking-queries",
  "postgresql-index-types",
  "import-csv-postgresql",
  "postgresql-autovacuum-and-table-bloat",
  "postgresql-connection-string-errors",
];

describe("SEO priority pages", () => {
  it("uses focused titles and significant update dates", () => {
    expect(getBlogPost("best-mac-postgresql-gui-client")).toMatchObject({
      title: "Best PostgreSQL GUI Clients for Mac in 2026",
      dateModified: "2026-08-11",
    });
    expect(getBlogPost("best-postgresql-backup-solution")).toMatchObject({
      title: "Best PostgreSQL Backup Tools in 2026",
      dateModified: "2026-08-11",
    });
    expect(getBlogPost("best-postgresql-cloud-provider")).toMatchObject({
      title: "Best Managed PostgreSQL Hosting in 2026",
      dateModified: "2026-08-11",
    });
  });

  it("keeps one visible H1 on every priority page", () => {
    for (const path of priorityPagePaths) {
      const source = read(path);
      expect(source.match(/<h1\b/g), path).toHaveLength(1);
    }
  });

  it("links every new technical guide from established content", () => {
    const sources = establishedLinkSourcePaths.map(read).join("\n");

    for (const slug of newGuideSlugs) {
      expect(sources, slug).toContain('href="/blog/' + slug + '"');
    }
  });

  it("does not publish volatile price claims in the hosting comparison", () => {
    const cloudPage = read(
      "app/(en)/blog/best-postgresql-cloud-provider/page.tsx",
    );

    expect(cloudPage).not.toMatch(/\$\d/);
    expect(cloudPage).not.toContain("Paid plans start");
  });
});
