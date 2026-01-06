import { AppStoreBadge } from "@/components/app-store-badge";

const APP_STORE_LINK = "https://apps.apple.com/us/app/postgresgui/id6756467181";

export function FinalCTAV2() {
  return (
    <div className="text-center py-20 px-6 bg-stone-900 dark:bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8 tracking-tight text-white dark:text-gray-900">
          Available Now
        </h2>
        <a
          href={APP_STORE_LINK}
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
