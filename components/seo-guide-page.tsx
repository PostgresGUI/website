import Link from "next/link";

export type GuideCodeBlock = {
  title: string;
  code: string;
  note?: string;
};

export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  code?: GuideCodeBlock;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideLink = {
  href: string;
  label: string;
  description: string;
};

export type SeoGuide = {
  title: string;
  eyebrow: string;
  description: string;
  answer: string;
  facts?: Array<{ label: string; value: string }>;
  codeBlocks?: GuideCodeBlock[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  related: GuideLink[];
  sources: Array<{ label: string; href: string }>;
};

export function guideJsonLd(
  guide: SeoGuide,
  canonical: string,
  breadcrumb: string
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: canonical,
        datePublished: "2026-07-25",
        dateModified: "2026-07-25",
        author: {
          "@type": "Person",
          name: "Ghazi",
        },
        publisher: {
          "@type": "Organization",
          name: "PostgresGUI",
          url: "https://postgresgui.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://postgresgui.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumb,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: canonical,
          },
        ],
      },
    ],
  };
}

export function SeoGuidePage({
  guide,
  canonical,
  breadcrumb,
}: {
  guide: SeoGuide;
  canonical: string;
  breadcrumb: string;
}) {
  return (
    <main className="flex-1 px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(guideJsonLd(guide, canonical, breadcrumb)),
        }}
      />
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-border/50 pb-8">
          <p className="text-sm font-semibold text-[var(--postgres-blue)]">
            {guide.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {guide.description}
          </p>
          <p className="mt-6 border-l-4 border-[var(--postgres-blue)] pl-4 text-base font-medium leading-7">
            {guide.answer}
          </p>
        </header>

        {guide.facts?.length ? (
          <dl className="grid gap-x-8 gap-y-5 border-b border-border/50 py-8 sm:grid-cols-2">
            {guide.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="prose max-w-none py-8 dark:prose-invert">
          {guide.codeBlocks?.map((block) => (
            <section key={block.title}>
              <h2>{block.title}</h2>
              <pre>
                <code>{block.code}</code>
              </pre>
              {block.note ? <p>{block.note}</p> : null}
            </section>
          ))}

          {guide.sections.map((section) => (
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
        </div>

        <section className="border-t border-border/50 py-8" id="faq">
          <h2 className="text-2xl font-semibold">Questions that come up</h2>
          <div className="mt-6 space-y-6">
            {guide.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border/50 py-8">
          <h2 className="text-2xl font-semibold">Keep going</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {guide.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group border-l-2 border-border pl-4 transition-colors hover:border-[var(--postgres-blue)]"
              >
                <span className="font-semibold group-hover:text-[var(--postgres-blue)]">
                  {link.label}
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-border/50 pt-8 text-sm text-muted-foreground">
          <p>Written by Ghazi, who builds PostgresGUI. Updated July 25, 2026.</p>
          <p className="mt-4 font-medium text-foreground">Primary sources</p>
          <ul className="mt-2 space-y-2">
            {guide.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--postgres-blue)] hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </main>
  );
}
