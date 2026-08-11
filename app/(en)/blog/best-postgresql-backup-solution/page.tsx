import Link from "next/link";
import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("best-postgresql-backup-solution");

export const metadata = getBlogPostMetadata(post.slug);

const tools = [
  {
    name: "pg_dump",
    chooseItFor: "Portable logical exports, small databases, and migrations",
    pitr: "No",
    storage: "File, pipe, or any destination you script",
    mainTradeoff: "Restore time grows with database size",
  },
  {
    name: "pg_basebackup",
    chooseItFor: "A physical base backup using PostgreSQL's own protocol",
    pitr: "With WAL",
    storage: "Local or mounted filesystem",
    mainTradeoff: "You operate retention, WAL handling, and restore workflow",
  },
  {
    name: "pgBackRest",
    chooseItFor: "Self-managed production clusters and fast parallel restores",
    pitr: "Yes",
    storage: "Filesystem and supported object-storage repositories",
    mainTradeoff: "Requires repository and PostgreSQL configuration",
  },
  {
    name: "Barman",
    chooseItFor: "Centralized backup management for multiple PostgreSQL servers",
    pitr: "Yes",
    storage: "Dedicated backup host or supported cloud storage",
    mainTradeoff: "Adds a backup service your team must operate",
  },
  {
    name: "WAL-G",
    chooseItFor: "Cloud-native backups sent directly to object storage",
    pitr: "Yes",
    storage: "S3-compatible, GCS, Azure, and other supported backends",
    mainTradeoff: "Configuration and restore automation are your responsibility",
  },
  {
    name: "Managed-service backups",
    chooseItFor: "RDS, Cloud SQL, Azure, Neon, Supabase, and similar services",
    pitr: "Plan-dependent",
    storage: "Provider-managed",
    mainTradeoff: "Retention, portability, and restore controls vary by provider",
  },
];

export default function BestPostgreSQLBackupSolutionPage() {
  return (
    <>
      <BlogStructuredData post={post} />
      <main className="flex-1 px-6 py-12">
        <article className="prose mx-auto max-w-4xl dark:prose-invert">
          <header className="mb-8 max-w-3xl">
            <h1 className="mb-4 font-display text-4xl md:text-5xl">
              Best PostgreSQL backup tools in 2026
            </h1>
            <p className="text-lg text-muted-foreground">
              Ghazi · Updated August 11, 2026
            </p>
          </header>

          <div className="max-w-3xl space-y-6">
            <p className="lead">
              Use <code>pg_dump</code> when you need a portable logical backup.
              For a self-managed production database that needs point-in-time
              recovery, start with pgBackRest. Choose Barman when one backup
              service manages several PostgreSQL servers, and WAL-G when object
              storage is the center of a cloud-native recovery workflow.
            </p>

            <p className="border-l-4 border-[var(--postgres-blue)] pl-4 font-medium">
              The best tool is the one that meets a written recovery point
              objective and recovery time objective in a restore drill. A
              successful backup job is not proof that the database is recoverable.
            </p>

            <h2>PostgreSQL backup tools compared</h2>
          </div>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/20">
                  <th className="px-3 py-3 font-semibold">Tool</th>
                  <th className="px-3 py-3 font-semibold">Choose it for</th>
                  <th className="px-3 py-3 font-semibold">PITR</th>
                  <th className="px-3 py-3 font-semibold">Backup destination</th>
                  <th className="px-3 py-3 font-semibold">Main tradeoff</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.name} className="border-b border-border/70 align-top">
                    <th className="px-3 py-4 font-semibold">{tool.name}</th>
                    <td className="px-3 py-4 text-muted-foreground">{tool.chooseItFor}</td>
                    <td className="px-3 py-4 text-muted-foreground">{tool.pitr}</td>
                    <td className="px-3 py-4 text-muted-foreground">{tool.storage}</td>
                    <td className="px-3 py-4 text-muted-foreground">{tool.mainTradeoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-3xl space-y-6">
            <h2>Choose from the restore backward</h2>
            <p>
              A backup decision begins with two numbers. The recovery point
              objective, or RPO, is the maximum acceptable data loss. The
              recovery time objective, or RTO, is the maximum acceptable time
              to return the service to operation. A nightly dump can lose most
              of a day&apos;s work. Base backups plus continuous WAL archiving
              can recover to a much narrower point, but the restore path is more
              involved.
            </p>

            <h2>Use pg_dump for portability</h2>
            <p>
              <code>pg_dump</code> creates a logical backup of one database.
              The custom and directory formats work with{" "}
              <code>pg_restore</code>, support selective restore, and can
              parallelize parts of the restore. <code>pg_dumpall</code> can
              capture cluster-wide objects such as roles, but it produces a
              plain SQL script.
            </p>
            <pre>
              <code>{"pg_dump --format=custom --file=app.dump \"$DATABASE_URL\"\ncreatedb restored_app\npg_restore --dbname=restored_app --jobs=4 app.dump"}</code>
            </pre>
            <p>
              A dump does not provide point-in-time recovery. It is still
              valuable as a portable copy that is independent of a cloud
              provider&apos;s snapshot format. For installation, version
              matching, compressed output, and common errors, use the{" "}
              <Link href="/blog/pg-dump-pg-restore-mac">
                pg_dump and pg_restore guide for Mac
              </Link>
              .
            </p>

            <h2>Use pg_basebackup as a physical foundation</h2>
            <p>
              <code>pg_basebackup</code> takes a physical base backup from a
              running PostgreSQL cluster through the replication protocol. It
              is useful for replicas and for teams building their own physical
              backup process. By itself it does not schedule jobs, enforce
              retention, monitor failures, or manage a complete archive.
            </p>
            <pre>
              <code>{"pg_basebackup \\\n  --host=db.internal \\\n  --username=replication_user \\\n  --pgdata=/backups/base-2026-08-11 \\\n  --format=plain \\\n  --wal-method=stream \\\n  --progress"}</code>
            </pre>

            <h2>Use pgBackRest for a self-managed production cluster</h2>
            <p>
              pgBackRest supports full, differential, and incremental backups,
              parallel backup and restore, repository retention, verification,
              and WAL archiving. It is a strong default when a team operates
              PostgreSQL itself and needs a documented PITR workflow. Its
              configuration belongs in infrastructure code, and the restore
              command should be exercised away from production.
            </p>
            <p>
              Read the{" "}
              <a href="https://pgbackrest.org/user-guide.html" target="_blank" rel="noopener noreferrer">
                pgBackRest user guide
              </a>{" "}
              for the exact stanza, repository, retention, archive, and restore
              settings supported by the installed version.
            </p>

            <h2>Use Barman for a fleet</h2>
            <p>
              Barman runs as a separate backup-management service and can
              coordinate backups and WAL archives for multiple PostgreSQL
              servers. That separation is useful when a database team wants one
              place for backup policy, status, and recovery operations. The
              tradeoff is another operational service with its own storage,
              permissions, monitoring, and upgrade path.
            </p>

            <h2>Use WAL-G around object storage</h2>
            <p>
              WAL-G is a command-line backup and WAL archival tool with support
              for several object-storage backends. It suits container and cloud
              environments where credentials, schedules, retention, and restore
              automation already live in deployment tooling. Keep the complete
              recovery procedure beside the configuration; a short backup
              command can hide a long restore dependency chain.
            </p>

            <h2>Managed backups still need an exit path</h2>
            <p>
              A managed provider can automate snapshots, WAL retention,
              failover, and point-in-time restore. Verify those controls for the
              exact plan and region. Test how long a restore takes, whether it
              creates a new instance, which credentials change, and how the
              application is redirected. The{" "}
              <Link href="/blog/best-postgresql-cloud-provider">
                managed PostgreSQL hosting comparison
              </Link>{" "}
              lists the operational questions to ask before choosing a service.
            </p>
            <p>
              Keep a periodic logical export when portability matters. Provider
              recovery protects availability inside that platform; a logical
              dump protects a different requirement: the ability to inspect or
              move the data with standard PostgreSQL tools.
            </p>

            <h2>A minimum viable production policy</h2>
            <ol>
              <li>Write down the RPO and RTO with the application owner.</li>
              <li>Choose physical backup and WAL retention that satisfy the RPO.</li>
              <li>Keep backup credentials separate from database credentials.</li>
              <li>Store a copy outside the database host and failure boundary.</li>
              <li>Encrypt the storage and restrict who can restore or delete it.</li>
              <li>Alert on missed backups, archive failures, and repository capacity.</li>
              <li>Run a scheduled restore into an isolated environment.</li>
              <li>Record restore duration and validate important tables and queries.</li>
            </ol>

            <h2>Restore drill checklist</h2>
            <ul>
              <li>Restore without access to the original database host.</li>
              <li>Use credentials available to the on-call engineer.</li>
              <li>Confirm the target PostgreSQL version and required extensions.</li>
              <li>Check row counts, recent transactions, and application migrations.</li>
              <li>Run representative read and write paths against the restored copy.</li>
              <li>Measure the full time through application reconnection.</li>
              <li>Delete the temporary restore and its exposed credentials afterward.</li>
            </ul>

            <p>
              After a restore, inspect locks, dead tuples, and query behavior
              before declaring the system healthy. The{" "}
              <Link href="/blog/postgresql-monitoring-tools">
                PostgreSQL monitoring guide
              </Link>{" "}
              covers the built-in views and external tools used for that check.
            </p>
          </div>

          <BlogPostFooter post={post} />
        </article>
      </main>
    </>
  );
}
