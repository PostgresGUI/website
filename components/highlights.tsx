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

export function Highlights({ locale = "en" }: HighlightProps) {
  const t = getTranslations(locale);

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
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-500 dark:border-emerald-400",
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
      bgColor: "bg-sky-50 dark:bg-sky-950/30",
      borderColor: "border-sky-500 dark:border-sky-400",
      iconBg: "bg-sky-100 dark:bg-sky-900/50",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    {
      icon: RocketIcon,
      title: t.highlights.lightweight.title,
      description: (
        <>
          {t.highlights.lightweight.installer}
          <br /> {t.highlights.lightweight.installed}
        </>
      ),
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-500 dark:border-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: CreditCardOffIcon,
      title: t.highlights.noSubscription.title,
      description: t.highlights.noSubscription.description,
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-500 dark:border-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: CircleCheckIcon,
      title: t.highlights.noDataCollection.title,
      description: t.highlights.noDataCollection.description,
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
      borderColor: "border-cyan-500 dark:border-cyan-400",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: DocToRightIcon,
      title: t.highlights.minimalisticUI.title,
      description: t.highlights.minimalisticUI.description,
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      borderColor: "border-pink-500 dark:border-pink-400",
      iconBg: "bg-pink-100 dark:bg-pink-900/50",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {highlights.map((highlight, index) => (
        <div
          key={highlight.title}
          className={`group p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-stone-700 transition-swiftui hover:-translate-y-2 hover:scale-[1.02] bg-white dark:bg-stone-800 ${
            index === 0 ? "md:col-span-2 lg:col-span-1" : ""
          }`}
        >
          <div className="flex justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-base md:text-lg font-display tracking-tight">
                {highlight.title}
              </h3>
              <p className="leading-relaxed">{highlight.description}</p>
            </div>
            <div>
              <div className={`p-3 rounded-xl ${highlight.iconBg} shrink-0`}>
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
