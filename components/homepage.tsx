import Image from "next/image";
import { AppStoreBadge } from "@/components/app-store-badge";
import { AppStoreLink, APP_STORE_LINK } from "@/components/app-store-link";
import { Highlights } from "@/components/highlights";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { FAQ } from "@/components/faq";
import { FlowingData } from "@/components/hero-animations/flowing-data";
import { NewFeatureBadge } from "@/components/new-feature-badge";
import { getTranslations, Locale } from "@/lib/translations";

export type HomepageProps = {
  appStoreLink?: string;
  locale?: Locale;
};

export function Homepage({
  appStoreLink = APP_STORE_LINK,
  locale = "en",
}: HomepageProps) {
  const t = getTranslations(locale);

  return (
    <>
      {/* SQL Editor Floating Badge */}
      <NewFeatureBadge />

      {/* Hero Section */}
      <div
        id="hero-section"
        className="flex-1 flex items-center justify-center grid-bg hero-gradient relative overflow-hidden"
      >
        {/* Flowing Data Streams Background */}
        <FlowingData />

        {/* Accent Element */}
        <div className="absolute w-[800px] h-[600px] bg-gradient-to-br from-[var(--postgres-blue)] to-blue-400 opacity-5 blur-3xl rounded-full"></div>

        <div className="text-center px-6 pt-16 pb-16 md:pt-24 md:pb-24 relative z-10">
          {/* Main Tagline */}
          <h1
            className="text-5xl md:text-7xl max-w-xl mx-auto mb-4 animate-slide-in stagger-1 leading-tight text-pretty"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
          >
            {t.hero.headline}
          </h1>
          <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 md:mb-12 animate-slide-in stagger-2">
            {t.hero.subheadline}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center justify-center gap-8 mb-8 md:mb-10 animate-slide-in stagger-3">
            <AppStoreLink
              href={appStoreLink}
              className="inline-block transition-transform hover:scale-105"
            >
              <AppStoreBadge scale={1.5} />
            </AppStoreLink>
          </div>

          {/* Hero Screenshot */}
          <div className="w-full max-w-5xl mx-auto mb-10 md:mb-12 animate-slide-in stagger-2">
            <div className="relative rounded-[12px] md:rounded-xl overflow-hidden shadow-screenshot-elevated border border-stone-200/50 dark:border-stone-700/50">
              <Image
                src="/screenshots3/PostgresGUI - Run complex query and see query results.png"
                alt={t.hero.heroImageAlt}
                width={1176}
                height={750}
                className="w-full h-auto block dark:hidden"
                priority
                fetchPriority="high"
              />
              <Image
                src="/screenshots3/PostgresGUI - Dark mode.png"
                alt={t.hero.heroImageDarkAlt}
                width={1176}
                height={750}
                className="w-full h-auto hidden dark:block"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 md:py-24 px-6 border-t border-border/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.features}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              {t.sections.whyPostgresGUI}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              {t.sections.featuresTagline}
            </p>
          </div>
          <Highlights locale={locale} />
        </div>
      </section>

      {/* Screenshots Section */}
      <section
        id="screenshots"
        className="py-16 md:py-24 px-6 border-t border-border/20 bg-stone-200 dark:bg-stone-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.screenshots}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              {t.sections.screenshotsHeadline}
            </h2>
          </div>
          <ScreenshotGallery locale={locale} />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-16 md:py-24 px-6 border-t border-border/20 grid-bg"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                {t.sections.faq}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              {t.sections.faqHeadline}
            </h2>
          </div>
          <FAQ locale={locale} />
        </div>
      </section>

    </>
  );
}
