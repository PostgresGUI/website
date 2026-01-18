import { AppStoreBadge } from "@/components/app-store-badge";
import { AppStoreLink, APP_STORE_LINK } from "@/components/app-store-link";
import { getTranslations, Locale } from "@/lib/translations";

type FinalCTAV2Props = {
  locale?: Locale;
  appStoreLink?: string;
};

export function FinalCTAV2({
  locale = "en",
  appStoreLink = APP_STORE_LINK,
}: FinalCTAV2Props) {
  const t = getTranslations(locale);

  return (
    <div className="text-center py-20 px-6 bg-stone-900 dark:bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8 tracking-tight text-white dark:text-gray-900">
          {t.cta.availableNow}
        </h2>
        <AppStoreLink
          href={appStoreLink}
          className="inline-block transition-transform hover:scale-105"
        >
          <AppStoreBadge scale={1.5} />
        </AppStoreLink>
      </div>
    </div>
  );
}
