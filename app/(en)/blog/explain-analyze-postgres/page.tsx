import Link from "next/link";
import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("explain-analyze-postgres");
export const metadata = getBlogPostMetadata(post.slug);

export default function ExplainAnalyzePostgresPage() {
  return (
    <TechnicalBlogPost
      post={post}
      intro={
        <>
          PostgreSQL's execution plan is a tree of operations. Plain{" "}
          <code>EXPLAIN</code> shows the planner's estimates.{" "}
          <code>EXPLAIN ANALYZE</code> runs the statement and adds actual row
          counts and timing, which lets you see where the estimates or work
          diverge from reality.
        </>
      }
      answer={
        <>
          Start with <code>EXPLAIN (ANALYZE, BUFFERS)</code>. Read from the
          deepest indented nodes upward. Compare estimated rows with actual rows
          multiplied by loops, then inspect the scan or join that consumes the
          most time or buffers.
        </>
      }
      screenshot={{
        src: "/screenshots4/PostgresGUI - Run complex query and see query results.webp",
        alt: "PostgresGUI query editor with a PostgreSQL query and results",
        caption:
          "Run EXPLAIN in the same editor as the original query so the SQL, plan, and next revision stay together.",
        width: 2336,
        height: 1456,
      }}
      codeBlocks={[
        {
          title: "A useful starting command",
          code: `explain (analyze, buffers)
select id, created_at, total
from orders
where account_id = 42
order by created_at desc
limit 50;`,
          note:
            "ANALYZE executes the statement. Start with a read-only SELECT on production.",
        },
      ]}
      sections={[
        {
          title: "Read the plan as a tree",
          paragraphs: [
            "The most indented node runs first. Its rows feed the parent above it. Follow that flow upward instead of reading the output as a flat list.",
            "The top node reports the total result, but the cause of a slow plan is often a deeper scan, sort, or join repeated many times.",
          ],
        },
        {
          title: "Compare estimated and actual rows",
          paragraphs: [
            "Each node shows an estimated rows value and an actual rows value. When loops is greater than one, actual rows is the average per loop, so consider actual rows multiplied by loops.",
            "A large mismatch can cause PostgreSQL to choose the wrong join type or scan. Refreshing statistics may help, but skew, correlated columns, and expressions can require a different index, query, or statistics definition.",
          ],
          code: {
            title: "Refresh statistics for one table",
            code: "analyze orders;",
            note:
              "Do this because the statistics are stale, not as a ritual after every slow query.",
          },
        },
        {
          title: "Treat scan names as descriptions, not verdicts",
          paragraphs: [
            "A sequential scan is reasonable when the table is small or the query needs much of it. An index scan is useful when it can avoid reading most rows. A bitmap scan combines index matches before visiting heap pages.",
            <>
              If the plan points to an indexing problem, choose the index method
              from the operator and data shape rather than adding another
              default B-tree. The{" "}
              <Link href="/blog/postgresql-index-types">
                PostgreSQL index types guide
              </Link>{" "}
              compares B-tree, GIN, GiST, BRIN, and hash indexes.
            </>,
          ],
          bullets: [
            "Seq Scan: reads table pages in sequence.",
            "Index Scan: follows an index and fetches matching table rows.",
            "Index Only Scan: can answer from the index when visibility information allows it.",
            "Bitmap Heap Scan: batches heap-page visits from one or more bitmap index scans.",
          ],
        },
        {
          title: "Use buffers to separate CPU from reads",
          paragraphs: [
            "Shared hit means PostgreSQL found pages in shared buffers. Shared read means pages had to be read into the buffer cache. These are block counts, not distinct business rows.",
            "A node with modest execution time on a warm cache but many reads can behave differently after a restart or under memory pressure. Compare representative runs and avoid tuning from one lucky cache state.",
          ],
        },
        {
          title: "Check joins, sorts, and repeated work",
          paragraphs: [
            "Nested loops are efficient when the outer side is small and the inner lookup is cheap. They become expensive when a badly estimated outer result repeats an inner scan thousands of times.",
            "A sort that spills to disk or a hash node that batches can indicate that the operation exceeded available working memory. Do not raise work_mem globally from one plan; it applies per operation and can multiply across concurrent queries.",
          ],
        },
        {
          title: "Be careful with writes",
          paragraphs: [
            "EXPLAIN ANALYZE executes INSERT, UPDATE, DELETE, and MERGE statements. Use plain EXPLAIN first. If you need actual measurements in a controlled environment, wrap the write in a transaction and roll it back.",
          ],
          code: {
            title: "Measure a write without keeping it",
            code: `begin;

explain (analyze, buffers)
update orders
set status = 'archived'
where created_at < date '2025-01-01';

rollback;`,
            note:
              "Triggers and other external side effects may not be reversible. Use a staging copy when that risk exists.",
          },
        },
        {
          title: "Keep the diagnosis close to the query",
          paragraphs: [
            <>
              Save the original SQL, plan, row counts, and the change that
              improved it. PostgresGUI provides a native query workspace for
              this loop; see the{" "}
              <Link href="/postgresql-gui-mac">
                PostgreSQL GUI for Mac page
              </Link>{" "}
              or compare it with the terminal in the{" "}
              <Link href="/blog/psql-vs-postgresql-gui">
                psql versus GUI guide
              </Link>
              .
            </>,
            "The goal is not to eliminate every sequential scan or lower every cost number. The goal is to reduce measured work for a representative query without making writes, memory use, or another important query worse.",
          ],
        },
      ]}
    />
  );
}
