import { CircleCheckIcon, GitHubIcon } from "@/components/icons";
import { AppStoreLink } from "@/components/app-store-link";
import { PRICE } from "@/lib/constants";
import { getTranslations, Locale } from "@/lib/translations";

type PricingProps = {
  locale?: Locale;
};

const GITHUB_LINK = "https://github.com/postgresgui/postgresgui";

export function Pricing({ locale = "en" }: PricingProps) {
  const t = getTranslations(locale);
  const p = t.pricing;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Two-card plan layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Card 1 — Free (build from source) */}
        <article className="relative flex flex-col rounded-lg border border-border bg-card p-8 md:p-10">
          <header className="mb-6">
            <h3 className="text-2xl font-display tracking-tight mb-2">
              {p.free.title}
            </h3>
            <p className="text-sm font-mono text-muted-foreground">
              {p.free.footnote}
            </p>
          </header>

          <div className="mb-8">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className="text-5xl md:text-6xl font-display tracking-tight tabular-nums"
                aria-label="Zero dollars"
              >
                $0
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                {p.free.priceLabel}
              </span>
            </div>
          </div>

          <ul className="space-y-3 mb-8 flex-1" role="list">
            {p.free.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300"
              >
                <CircleCheckIcon
                  width={20}
                  height={20}
                  className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 text-sm font-semibold text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-colors"
          >
            <GitHubIcon width={18} height={18} />
            {p.free.cta}
            <span className="text-xs opacity-70">↗</span>
          </a>
        </article>

        {/* Card 2 — App Store (recommended) */}
        <article className="relative flex flex-col rounded-lg border-2 border-[var(--postgres-blue)] bg-card p-8 md:p-10">
          {/* Recommended badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--postgres-blue)] text-white text-xs font-semibold shadow-md whitespace-nowrap">
              <span className="sr-only">Recommended option: </span>
              <span aria-hidden="true">★</span> {p.badge}
            </span>
          </div>

          <header className="mb-6">
            <h3 className="text-2xl font-display tracking-tight mb-2">
              {p.paid.title}
            </h3>
            <p className="text-sm font-mono text-muted-foreground">
              {p.paid.footnote}
            </p>
          </header>

          <div className="mb-8">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-5xl md:text-6xl font-display tracking-tight text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] tabular-nums">
                {PRICE}
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                {p.paid.priceLabel}
              </span>
            </div>
          </div>

          <ul className="space-y-3 mb-8 flex-1" role="list">
            {p.paid.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300"
              >
                <CircleCheckIcon
                  width={20}
                  height={20}
                  className="shrink-0 mt-0.5 text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <AppStoreLink className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--postgres-blue)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--postgres-blue-dark)]">
            {t.download.downloadNow} <span className="text-xs opacity-70">↗</span>
          </AppStoreLink>
        </article>
      </div>
    </div>
  );
}
