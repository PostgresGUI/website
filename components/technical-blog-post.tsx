import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import type { GuideCodeBlock, GuideSection } from "@/components/seo-guide-page";
import type { BlogPost } from "@/lib/blog";

export function TechnicalBlogPost({
  post,
  intro,
  answer,
  codeBlocks = [],
  sections,
}: {
  post: BlogPost;
  intro: string;
  answer: string;
  codeBlocks?: GuideCodeBlock[];
  sections: GuideSection[];
}) {
  return (
    <>
      <BlogStructuredData post={post} />
      <main className="flex-1 px-6 py-12">
        <article className="prose mx-auto max-w-3xl dark:prose-invert">
          <header className="mb-8">
            <h1 className="font-display text-4xl leading-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              Ghazi · July 25, 2026
            </p>
          </header>

          <p className="lead">{intro}</p>
          <p className="border-l-4 border-[var(--postgres-blue)] pl-4 font-medium">
            {answer}
          </p>

          {codeBlocks.map((block) => (
            <section key={block.title}>
              <h2>{block.title}</h2>
              <pre>
                <code>{block.code}</code>
              </pre>
              {block.note ? <p>{block.note}</p> : null}
            </section>
          ))}

          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.code ? (
                <>
                  <h3>{section.code.title}</h3>
                  <pre>
                    <code>{section.code.code}</code>
                  </pre>
                  {section.code.note ? <p>{section.code.note}</p> : null}
                </>
              ) : null}
            </section>
          ))}

          <BlogPostFooter post={post} />
        </article>
      </main>
    </>
  );
}
