import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("postgresql-jsonb-query-examples");
export const metadata = getBlogPostMetadata(post.slug);

export default function PostgreSQLJsonbQueryExamplesPage() {
  return (
    <TechnicalBlogPost
      post={post}
      intro="JSONB is useful when one row owns a flexible document and you still need PostgreSQL to inspect it. The operators are compact, but they are easier to remember when every example uses the same table."
      answer="Start with -> for JSON, ->> for text, @> for containment, and ? for key existence. Add a GIN index only for the operators your real queries use."
      codeBlocks={[
        {
          title: "Example table",
          code: `create table products (
  id bigint generated always as identity primary key,
  attributes jsonb not null default '{}'::jsonb
);

insert into products (attributes) values
  ('{"name":"Desk lamp","color":"green","price":49,"tags":["home","lighting"]}'),
  ('{"name":"Travel mug","color":"black","price":28,"tags":["kitchen"]}');`,
        },
      ]}
      sections={[
        {
          title: "Extract a value",
          paragraphs: [
            "The single-arrow operator returns JSONB. The double-arrow operator returns text, which is usually what you want for display or a text comparison. Cast text before numeric or date comparisons.",
          ],
          code: {
            title: "Read and cast",
            code: `select
  attributes->>'name' as name,
  (attributes->>'price')::numeric as price
from products
where (attributes->>'price')::numeric < 40;`,
          },
        },
        {
          title: "Match part of a document",
          paragraphs: [
            "Containment asks whether the left JSONB value contains the structure on the right. It is often clearer than extracting several keys and can use a GIN index.",
          ],
          code: {
            title: "Containment with @>",
            code: `select *
from products
where attributes @> '{"color":"green"}';`,
          },
        },
        {
          title: "Check keys and array contents",
          paragraphs: [
            "The ? operator checks whether a top-level object key exists. On an array, it checks for a matching string element. Keep the level of the document in mind; nested keys need an extraction step or jsonpath.",
          ],
          code: {
            title: "Existence checks",
            code: `select * from products
where attributes ? 'price';

select * from products
where attributes->'tags' ? 'lighting';`,
          },
        },
        {
          title: "Update one path without replacing the document",
          paragraphs: [
            "jsonb_set returns a new document with one path changed. The final true argument allows PostgreSQL to create the key when it is missing.",
          ],
          code: {
            title: "Change one value",
            code: `update products
set attributes = jsonb_set(
  attributes,
  '{price}',
  to_jsonb(45),
  true
)
where id = 1;`,
          },
        },
        {
          title: "Index the query you actually run",
          paragraphs: [
            "The default GIN operator class supports containment, key existence, and jsonpath matches. A jsonb_path_ops index is smaller and specialized for containment and jsonpath, but it does not support the ? family of key operators.",
            "Expression indexes are often better when one extracted value behaves like a normal column. If price drives filtering and sorting on every screen, making it a numeric column may be clearer than maintaining a cast expression.",
          ],
          code: {
            title: "Two index shapes",
            code: `create index products_attributes_gin
  on products using gin (attributes);

create index products_price_idx
  on products (((attributes->>'price')::numeric));`,
          },
        },
        {
          title: "Use JSONB at the edge of a relational model",
          paragraphs: [
            "JSONB works well for provider payloads, optional product attributes, event metadata, and settings that vary by type. It is a poor hiding place for required fields, foreign keys, money, and status values that need constraints.",
            "The useful question is not whether PostgreSQL can query the document. It can. Ask whether the database should know and enforce the shape of that data.",
          ],
        },
      ]}
    />
  );
}
