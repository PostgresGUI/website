import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("psql-vs-postgresql-gui");
export const metadata = getBlogPostMetadata(post.slug);

export default function PsqlVsPostgreSQLGuiPage() {
  return (
    <TechnicalBlogPost
      post={post}
      intro="psql and a PostgreSQL GUI are two views of the same server. The productive choice is usually determined by the shape of the task, not by whether terminal or desktop software feels more serious."
      answer="Use psql for repeatable commands, scripts, remote shells, and exact text output. Use a GUI for table browsing, wide results, schema navigation, and exploratory SQL. Keep both available."
      codeBlocks={[
        {
          title: "The same check in psql",
          code: `psql "$DATABASE_URL" -c "
  select pid, usename, state, query
  from pg_stat_activity
  where datname = current_database();
"`,
        },
      ]}
      sections={[
        {
          title: "Where psql is plainly better",
          paragraphs: [
            "psql starts anywhere the PostgreSQL client tools are installed. It works over SSH, composes with shell scripts, and gives you meta-commands such as \\d, \\copy, \\watch, and \\x.",
            "It is also easier to make a check repeatable. A command in a runbook can be reviewed, pasted into a remote shell, and captured in logs without recreating clicks.",
          ],
          bullets: [
            "Deployment checks and CI jobs",
            "Remote servers with no desktop session",
            "Bulk import and export with \\copy",
            "Repeatable incident commands and scripts",
          ],
        },
        {
          title: "Where a GUI earns the screen space",
          paragraphs: [
            "A result with twenty columns is tedious in a terminal and ordinary in a grid. The same is true when you are following foreign keys across tables, comparing several queries, or looking for a schema object whose exact name you forgot.",
            "A focused GUI reduces navigation work. It should not hide the SQL or invent a proprietary database model; the useful part is keeping structure, query text, and results visible together.",
          ],
          bullets: [
            "Browsing and filtering table data",
            "Scanning wide or long result sets",
            "Moving among schemas, views, and functions",
            "Keeping several investigation queries open",
          ],
        },
        {
          title: "Query plans belong in both",
          paragraphs: [
            "psql is excellent for capturing EXPLAIN output as text. A GUI can make a large plan easier to inspect while you adjust the query. In either interface, EXPLAIN ANALYZE executes the statement, so do not add ANALYZE casually to a write query.",
          ],
          code: {
            title: "A useful read-only plan",
            code: `explain (analyze, buffers)
select *
from orders
where account_id = 42
order by created_at desc
limit 50;`,
          },
        },
        {
          title: "Production safety is an access-control problem",
          paragraphs: [
            "A terminal can run a disastrous UPDATE as quickly as a grid editor. A GUI can make a large result easier to notice, but it is not a substitute for a read-only role, network restrictions, backups, and a reviewed change process.",
            "For a manual write, start a transaction, run the WHERE clause as a SELECT, check the count, make the change, and inspect the returned rows before commit.",
          ],
          code: {
            title: "Make the affected rows visible",
            code: `begin;

update orders
set status = 'cancelled'
where id = 123
returning id, status, updated_at;

rollback; -- change to commit only after checking the row`,
          },
        },
        {
          title: "A practical Mac setup",
          paragraphs: [
            "Install psql for terminal and automation work. Keep PostgresGUI for browsing and exploratory query sessions. Both can read the same DATABASE_URL, and neither needs to own your migrations.",
            "If you administer replication, backups, and roles all day, use a full DBA tool as well. PostgresGUI is intentionally aimed at the developer loop: connect, inspect, query, edit, and move on.",
          ],
        },
      ]}
    />
  );
}
