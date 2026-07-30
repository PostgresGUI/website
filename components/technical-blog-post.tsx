import Image from "next/image";
import type { ReactNode } from "react";
import { BlogPostFooter } from "@/components/blog-post-footer";
import { BlogStructuredData } from "@/components/blog-structured-data";
import type { GuideCodeBlock } from "@/components/seo-guide-page";
import type { BlogPost } from "@/lib/blog";

type TechnicalSection = {
  title: string;
  paragraphs: ReactNode[];
  bullets?: ReactNode[];
  code?: GuideCodeBlock;
};

type ArticleScreenshot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function TechnicalBlogPost({
  post,
  intro,
  answer,
  codeBlocks = [],
  screenshot,
  sections,
}: {
  post: BlogPost;
  intro: ReactNode;
  answer: ReactNode;
  codeBlocks?: GuideCodeBlock[];
  screenshot?: ArticleScreenshot;
  sections: TechnicalSection[];
}) {
  const dateModified = post.dateModified ?? post.date;

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
              {post.author} · {formatDate(post.date)}
              {dateModified !== post.date
                ? ` · Updated ${formatDate(dateModified)}`
                : ""}
            </p>
          </header>

          <p className="lead">{intro}</p>
          <p className="border-l-4 border-[var(--postgres-blue)] pl-4 font-medium">
            {answer}
          </p>

          {screenshot ? (
            <figure>
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                sizes="(max-width: 768px) 100vw, 768px"
                className="rounded-md border border-border"
              />
              <figcaption>{screenshot.caption}</figcaption>
            </figure>
          ) : null}

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
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.title}-paragraph-${index}`}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.title}-bullet-${index}`}>{bullet}</li>
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
