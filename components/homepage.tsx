import { AppStoreBadge } from "@/components/app-store-badge";
import { AppStoreLink, APP_STORE_LINK } from "@/components/app-store-link";
import Link from "next/link";
import { Highlights } from "@/components/highlights";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { NewFeatureBadge } from "@/components/new-feature-badge";
import { GitHubButton } from "@/components/github-button";
import { Testimonials } from "@/components/testimonials";
import { getTranslations, Locale } from "@/lib/translations";
import { Code2, Database, Feather, Palette, Wrench } from "lucide-react";

export type HomepageProps = {
  appStoreLink?: string;
  locale?: Locale;
};

export async function Homepage({
  appStoreLink = APP_STORE_LINK,
  locale = "en",
}: HomepageProps) {
  const t = getTranslations(locale);
  const trustItems = [
    { icon: Feather, label: t.hero.trustLine.lightweight },
    { icon: Code2, label: t.hero.trustLine.openSource },
    { icon: Palette, label: t.hero.trustLine.beautifulUI },
  ];
  const seoPathways =
    locale === "en"
      ? [
          {
            href: "/postgresql-gui-mac",
            title: "PostgreSQL GUI for Mac",
            body: "Compare Mac Postgres clients and see where PostgresGUI fits.",
            icon: Database,
          },
          {
            href: "/postgresql-tools",
            title: "Free PostgreSQL tools",
            body: "Use the SQL editor, schema designer, data types guide, UUID generator, and more.",
            icon: Wrench,
          },
          {
            href: "/alternatives/dbeaver",
            title: "DBeaver alternative",
            body: "Choose between a universal database workbench and a focused native Mac Postgres client.",
            icon: Code2,
          },
        ]
      : [];

  return (
    <>
      {/* SQL Editor Floating Badge */}
      <NewFeatureBadge />

      {/* Hero Section */}
      <div
        id="hero-section"
        className="product-stage relative flex-1 overflow-hidden"
      >
        <div className="relative z-10 px-6 pb-0 pt-20 text-center md:pt-28">
          {/* Main Tagline */}
          <h1
            className="mx-auto mb-5 max-w-3xl text-balance text-5xl font-semibold md:text-7xl lg:text-8xl animate-slide-in"
          >
            {t.hero.headline}
          </h1>
          <p className="mx-auto mb-5 max-w-2xl text-xl text-stone-500 dark:text-stone-400 md:text-2xl animate-slide-in stagger-2">
            {t.hero.subheadline}
          </p>

          {/* Trust sub-line */}
          <div
            className="mb-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-500 dark:text-stone-400 md:text-base animate-slide-in stagger-2"
            aria-label="Trust indicators"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                />
                <span>{label}</span>
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4 animate-slide-in stagger-3">
            <AppStoreLink
              href={appStoreLink}
              className="inline-block transition-transform duration-200 hover:scale-[1.02]"
            >
              <AppStoreBadge scale={1.5} />
            </AppStoreLink>
            <GitHubButton className="md:hidden" />
          </div>

          {/* Hero Screenshot — <picture> with prefers-color-scheme source so
              only the matching image is fetched (prevents dual LCP preload). */}
          <div className="mx-auto w-full max-w-6xl animate-slide-in stagger-2">
            <div className="relative">
              <picture>
                <source
                  media="(prefers-color-scheme: dark)"
                  srcSet="/screenshots4/PostgresGUI - Dark mode.webp"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/screenshots4/PostgresGUI - Run complex query and see query results.webp"
                  alt={t.hero.heroImageAlt}
                  width={1176}
                  height={750}
                  className="mb-12 block h-auto w-full rounded-[26px] border border-black/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.12)] dark:border-white/[0.08] dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="bg-[#f5f5f7] px-6 py-20 dark:bg-black md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.features}
              </span>
            </div>
            <h2 className="mb-4 max-w-4xl text-4xl font-display md:text-6xl lg:text-7xl">
              {t.sections.whyPostgresGUI}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t.sections.featuresTagline}
            </p>
          </div>
          <Highlights locale={locale} />
        </div>
      </section>

      {seoPathways.length > 0 && (
        <section className="apple-section-muted px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Explore
              </span>
              <h2 className="mt-3 text-4xl font-display md:text-5xl">
                Find the right Postgres workflow
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {seoPathways.map(({ href, title, body, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-[var(--postgres-blue)]"
                >
                  <Icon className="h-5 w-5 text-[var(--postgres-blue)]" />
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-[var(--postgres-blue)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <Testimonials />

      {/* Screenshots Section */}
      <section
        id="screenshots"
        className="apple-section-muted px-6 py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.screenshots}
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-display md:text-6xl lg:text-7xl">
              {t.sections.screenshotsHeadline}
            </h2>
          </div>
          <ScreenshotGallery locale={locale} />
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="apple-section px-6 py-20 md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.pricing}
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-display md:text-6xl lg:text-7xl">
              {t.sections.pricingHeadline}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t.sections.pricingSubheadline}
            </p>
          </div>
          <Pricing locale={locale} />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="apple-section-muted px-6 py-20 md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.faq}
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-display md:text-6xl lg:text-7xl">
              {t.sections.faqHeadline}
            </h2>
          </div>
          <FAQ locale={locale} />
        </div>
      </section>

    </>
  );
}
