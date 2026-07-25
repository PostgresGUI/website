import {
  RocketIcon,
  SearchCheckIcon,
  CircleCheckIcon,
  LaptopIcon,
  CreditCardOffIcon,
  DocToRightIcon,
} from "@/components/icons";
import { getTranslations, Locale } from "@/lib/translations";

type HighlightProps = {
  locale?: Locale;
};

export function Highlights(props: HighlightProps) {
  const t = getTranslations(props.locale ?? "en");

  const highlights = [
    {
      icon: SearchCheckIcon,
      title: t.highlights.openSource.title,
      description: (
        <>
          {t.highlights.openSource.description}{" "}
          <a
            href="https://github.com/postgresgui/postgresgui"
            target="_blank"
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            {t.highlights.openSource.linkText} ↗
          </a>
        </>
      ),
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: LaptopIcon,
      title: t.highlights.native.title,
      description: (
        <>
          {t.highlights.native.line1}
          <br />
          {t.highlights.native.line2}
        </>
      ),
      iconBg: "bg-sky-100 dark:bg-sky-900/50",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    {
      icon: RocketIcon,
      title: t.highlights.lightweight.title,
      description: t.highlights.lightweight.installed,
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: CreditCardOffIcon,
      title: t.highlights.noSubscription.title,
      description: t.highlights.noSubscription.description,
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: CircleCheckIcon,
      title: t.highlights.noDataCollection.title,
      description: t.highlights.noDataCollection.description,
      iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: DocToRightIcon,
      title: t.highlights.minimalisticUI.title,
      description: t.highlights.minimalisticUI.description,
      iconBg: "bg-pink-100 dark:bg-pink-900/50",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {highlights.map((highlight) => (
        <div
          key={highlight.title}
          className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-black/25 hover:bg-black/[0.025] dark:hover:border-white/25 dark:hover:bg-white/[0.04] md:p-8"
        >
          <div className="flex justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-display tracking-tight">
                {highlight.title}
              </h3>
              <p className="leading-relaxed">{highlight.description}</p>
            </div>
            <div>
              <div className={`shrink-0 rounded-lg p-3 ${highlight.iconBg}`}>
                <highlight.icon
                  height={24}
                  width={24}
                  className={highlight.iconColor}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
