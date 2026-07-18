import {
  BLOG_IMAGE,
  type BlogPost,
  getBlogPostUrl,
  SITE_URL,
} from "@/lib/blog";

type BlogStructuredDataProps = {
  post: BlogPost;
};

export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const postUrl = getBlogPostUrl(post);
  const dateModified = post.dateModified ?? post.date;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      headline: post.title,
      description: post.description,
      image: BLOG_IMAGE,
      mainEntityOfPage: postUrl,
      datePublished: post.date,
      dateModified,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "PostgresGUI",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/postgresgui-elephant-app-icon.png`,
        },
      },
      about: post.pillar,
      articleSection: post.category,
      keywords: post.keywords.join(", "),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${postUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  ];

  if (post.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${postUrl}#faq`,
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
