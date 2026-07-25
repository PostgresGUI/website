import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("postgresql-uuid-v4-vs-v7");
export const metadata = getBlogPostMetadata(post.slug);

export default function PostgreSQLUuidV4VsV7Page() {
  return (
    <TechnicalBlogPost
      post={post}
      intro="UUIDv4 and UUIDv7 fit in the same PostgreSQL uuid column and are both 128-bit identifiers. The difference that affects a database is where new values land in a B-tree index."
      answer="For a new UUID primary key on PostgreSQL 18, start with UUIDv7. Keep UUIDv4 when unpredictable ordering matters or when your existing system already generates it reliably."
      codeBlocks={[
        {
          title: "PostgreSQL 18: create both versions",
          code: `select uuidv4();
select uuidv7();

create table events (
  id uuid primary key default uuidv7(),
  payload jsonb not null,
  created_at timestamptz not null default now()
);`,
          note: "PostgreSQL 18 added built-in UUIDv7 generation. Older releases can store UUIDv7 values but need an application or extension to generate them.",
        },
      ]}
      sections={[
        {
          title: "What changes inside the index",
          paragraphs: [
            "UUIDv4 is random. Consecutive inserts tend to touch different B-tree pages, which can cause more page splits and poorer cache locality as the index grows.",
            "UUIDv7 starts with a millisecond Unix timestamp and follows it with random bits. New values are roughly ordered by creation time, so inserts cluster near the active end of the index. It is not a promise that every ID sorts perfectly across machines, but it is a much friendlier write pattern than UUIDv4.",
          ],
        },
        {
          title: "What does not change",
          paragraphs: [
            "The PostgreSQL column remains uuid. Existing foreign keys, drivers, and UUID-aware APIs do not need a new type. Both versions occupy 16 bytes in the value itself.",
            "A UUID is still larger than a bigint, and that size is repeated in primary indexes, foreign-key columns, and their indexes. If IDs never leave one database and compact indexes matter most, bigint remains a sensible choice.",
          ],
        },
        {
          title: "The privacy tradeoff",
          paragraphs: [
            "A UUIDv7 value reveals an approximate creation time. That can be handy while debugging, and PostgreSQL 18 can extract the timestamp with uuid_extract_timestamp(). It also means the value should not be presented as opaque evidence that hides when a record was created.",
            "Neither UUID version is an authorization token. An unguessable ID can reduce casual enumeration, but access control must still decide whether the caller may read the row.",
          ],
          code: {
            title: "Read the embedded time",
            code: `select
  id,
  uuid_extract_timestamp(id)
from events
order by id desc
limit 10;`,
          },
        },
        {
          title: "Do not rewrite stable primary keys for fashion",
          paragraphs: [
            "A table already using UUIDv4 does not become incorrect when UUIDv7 arrives. Replacing primary keys means updating every referencing foreign key, cache key, URL, event, and external integration that carries the old value.",
            "The low-risk move is to use UUIDv7 for new tables, or change only the default for future rows after confirming mixed versions are acceptable. PostgreSQL's uuid type can store both.",
          ],
        },
        {
          title: "Generate test values",
          paragraphs: [
            "The PostgresGUI UUID generator creates v4 and v7 values in the browser, including bulk output for fixtures. Use database-side generation for real table defaults so every writer follows the same rule.",
          ],
          code: {
            title: "Open the generator",
            code: "https://postgresgui.com/uuid-generator",
          },
        },
      ]}
    />
  );
}
