/**
 * Social-proof section with quoted testimonials.
 *
 * Quotes are sourced from public GitHub issue comments and Reddit threads.
 * Keep attribution honest — link each quote back to its origin.
 */

import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  handle?: string;
  source: "github" | "reddit" | "twitter" | "hackernews" | "appstore";
  url?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "That's a work of art, amigo!! I love the saved query functionality — I'll be using this for a lot of analysis tasks.",
    name: "NeodymiumPhish",
    handle: "@NeodymiumPhish",
    source: "github",
    url: "https://github.com/PostgresGUI/postgresgui/issues/5#issuecomment-3764305015",
  },
  {
    quote:
      "Really liked this app. Love that it's open-source, but you can still support the dev by buying it on the App Store.",
    name: "possebom",
    handle: "u/possebom",
    source: "reddit",
    url: "https://www.reddit.com/r/macapps/comments/1qh2y42/comment/o0hzpdj/",
  },
  {
    quote:
      "I confirm! Fixed for me. Thanks for the quick & efficient bug fix. Long life to your app.",
    name: "odeckmyn",
    handle: "@odeckmyn",
    source: "github",
    url: "https://github.com/PostgresGUI/postgresgui/issues/20#issuecomment-3828896459",
  },
];

const SOURCE_LABEL: Record<Testimonial["source"], string> = {
  github: "GitHub",
  reddit: "Reddit",
  twitter: "Twitter / X",
  hackernews: "Hacker News",
  appstore: "App Store",
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 px-6 border-t border-border/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="mb-4">
            <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
              Loved by developers
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
            What people are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map((testimonial, index) => {
            const card = (
              <div className="group relative h-full p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 transition-swiftui hover:-translate-y-1">
                <Quote
                  className="w-6 h-6 text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] opacity-70 mb-4"
                  aria-hidden="true"
                />
                <blockquote className="text-base md:text-lg leading-relaxed mb-6 text-pretty">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {testimonial.name}
                    </div>
                    {testimonial.handle && (
                      <div className="text-xs text-muted-foreground truncate">
                        {testimonial.handle}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">
                    {SOURCE_LABEL[testimonial.source]}
                  </span>
                </div>
              </div>
            );

            if (testimonial.url) {
              return (
                <a
                  key={index}
                  href={testimonial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] rounded-2xl"
                >
                  {card}
                </a>
              );
            }
            return <div key={index}>{card}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
