import { AppStoreBadge } from "@/components/app-store-badge";
import { getTranslations, Locale } from "@/lib/translations";

const APP_STORE_LINK = "https://apps.apple.com/us/app/postgresgui/id6756467181";

type FinalCTAV2Props = {
  locale?: Locale;
  appStoreLink?: string;
};

export function FinalCTAV2({ locale = "en", appStoreLink = APP_STORE_LINK }: FinalCTAV2Props) {
  const t = getTranslations(locale);

  return (
    <div className="text-center py-20 px-6 bg-stone-900 dark:bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8 tracking-tight text-white dark:text-gray-900">
          {t.cta.availableNow}
        </h2>
        <a
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block scale-150 transition-transform hover:scale-[1.55]"
        >
          <AppStoreBadge />
        </a>
      </div>
    </div>
  );
}
