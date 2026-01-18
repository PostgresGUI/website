import Link from "next/link";
import { AppStoreBadge } from "@/components/app-store-badge";
import { AppStoreLink, APP_STORE_LINK } from "@/components/app-store-link";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { getTranslations, Locale } from "@/lib/translations";
import { Download, HardDrive, Github } from "lucide-react";

export type DownloadPageProps = {
  appStoreLink?: string;
  locale?: Locale;
};

export function DownloadPage({
  appStoreLink = APP_STORE_LINK,
  locale = "en",
}: DownloadPageProps) {
  const t = getTranslations(locale);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-stone-50 to-white dark:from-stone-900 dark:to-stone-950">
        <div className="text-center px-6 py-20 md:py-32 max-w-3xl mx-auto">
          {/* Title */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
          >
            {t.download.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12">
            {t.download.subtitle}
          </p>

          {/* App Store Button */}
          <AppStoreLink
            href={appStoreLink}
            className="inline-block transition-transform hover:scale-105 mb-16"
          >
            <AppStoreBadge scale={1.5} />
          </AppStoreLink>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {/* App Size */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <Download className="w-6 h-6 text-[var(--postgres-blue)]" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t.download.appSize}
              </span>
            </div>

            {/* Open Source */}
            <Link
              href="https://github.com/postgresgui/postgresgui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-[var(--postgres-blue)] transition-colors"
            >
              <Github className="w-6 h-6 text-[var(--postgres-blue)]" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t.download.openSource}
              </span>
            </Link>

            {/* macOS Version */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <HardDrive className="w-6 h-6 text-[var(--postgres-blue)]" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t.download.macOSVersion}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <section className="py-16 md:py-24 px-6 bg-stone-200 dark:bg-stone-900">
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

    </div>
  );
}
