import Image from "next/image";
import { AppStoreBadge } from "@/components/app-store-badge";
import { AppStoreLink, APP_STORE_LINK } from "@/components/app-store-link";
import { TablePlusComparison } from "@/components/tableplus-comparison";
import { FAQ } from "@/components/faq";
import {
  DollarSign,
  Layers,
  Gauge,
  Lock,
  Code2,
  Feather,
  ArrowRight,
  Github,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { getTranslations, Locale } from "@/lib/translations";

const sources = [
  {
    num: 1,
    title: "TablePlus Pricing",
    url: "https://tableplus.com/pricing",
  },
  {
    num: 2,
    title: "TablePlus on App Store",
    url: "https://apps.apple.com/us/app/tableplus-database-client/id1465448609",
  },
];

export type TablePlusAlternativePageProps = {
  appStoreLink?: string;
  locale?: Locale;
};

export function TablePlusAlternativePage({
  appStoreLink = APP_STORE_LINK,
  locale = "en",
}: TablePlusAlternativePageProps) {
  const t = getTranslations(locale).tablePlusAlternative;

  const painPoints = [
    {
      icon: DollarSign,
      title: t.painPoints.highCost.title,
      description: t.painPoints.highCost.description,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      sourceNum: 1,
    },
    {
      icon: Layers,
      title: t.painPoints.tabLimit.title,
      description: t.painPoints.tabLimit.description,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      sourceNum: 1,
    },
    {
      icon: Lock,
      title: t.painPoints.closedSource.title,
      description: t.painPoints.closedSource.description,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Gauge,
      title: t.painPoints.largerFootprint.title,
      description: t.painPoints.largerFootprint.description,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      sourceNum: 2,
    },
  ];

  const advantages = [
    {
      icon: Code2,
      title: t.advantages.openSource.title,
      description: t.advantages.openSource.description,
      highlight: t.advantages.openSource.highlight,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Feather,
      title: t.advantages.lightweight.title,
      description: t.advantages.lightweight.description,
      highlight: t.advantages.lightweight.highlight,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: DollarSign,
      title: t.advantages.oneTimePurchase.title,
      description: t.advantages.oneTimePurchase.description,
      highlight: t.advantages.oneTimePurchase.highlight,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: Lock,
      title: t.advantages.privacyFirst.title,
      description: t.advantages.privacyFirst.description,
      highlight: t.advantages.privacyFirst.highlight,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[var(--postgres-blue)] to-blue-400 opacity-[0.07] blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto pt-20 pb-16 md:pt-28 md:pb-24">
          {/* Main Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6 animate-slide-in stagger-1 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
          >
            {(() => {
              // Split by both TablePlus and the highlight word (Alternative/代替/etc)
              const highlightClass = "text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]";
              const parts = t.headline.split(/(TablePlus)/);
              return parts.map((part, i) => {
                if (part === "TablePlus") {
                  return <span key={i} className={highlightClass}>{part}</span>;
                }
                // Further split this part by the highlight word
                const subParts = part.split(new RegExp(`(${t.highlightWord})`, 'i'));
                return subParts.map((subPart, j) => {
                  if (subPart.toLowerCase() === t.highlightWord.toLowerCase()) {
                    return <span key={`${i}-${j}`} className={highlightClass}>{subPart}</span>;
                  }
                  return <span key={`${i}-${j}`}>{subPart}</span>;
                });
              });
            })()}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-in stagger-2">
            {t.subheadline}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 animate-slide-in">
            <AppStoreLink
              href={appStoreLink}
              className="inline-block transition-transform hover:scale-105 [&_svg]:w-[150px] [&_svg]:h-auto"
            >
              <AppStoreBadge />
            </AppStoreLink>
            <a
              href="https://github.com/postgresgui/postgresgui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              {t.viewSourceOnGitHub}
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24 px-6 border-t border-border/30 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {t.commonFrustrations}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {t.whyDevelopersSearch}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {t.whyDevelopersSearchDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {painPoints.map((point, index) => (
              <div
                key={point.title}
                className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-border transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${point.bgColor} flex items-center justify-center mb-4`}
                >
                  <point.icon className={`w-5 h-5 ${point.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                  {point.sourceNum && (
                    <a
                      href={sources.find((s) => s.num === point.sourceNum)?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-1 text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] hover:underline"
                      title={`Source: ${
                        sources.find((s) => s.num === point.sourceNum)?.title
                      }`}
                    >
                      <sup className="text-[10px]">[{point.sourceNum}]</sup>
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 px-6 border-y border-border/30 bg-white dark:bg-stone-950">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {t.theAlternative}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {t.builtDifferent}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {t.builtDifferentDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="group relative p-6 rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-border transition-all duration-300"
              >
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] bg-[var(--postgres-blue)]/10 rounded-full">
                    {advantage.highlight}
                  </span>
                </div>

                <div
                  className={`w-10 h-10 rounded-xl ${advantage.bgColor} flex items-center justify-center mb-4`}
                >
                  <advantage.icon className={`w-5 h-5 ${advantage.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>

          {/* App Screenshot */}
          <div className="relative rounded-xl overflow-hidden shadow-screenshot-elevated border border-stone-200/50 dark:border-stone-700/50">
            <Image
              src="/screenshots2/PostgresGUI - Run complex query and see query results.png"
              alt="PostgresGUI - A native Mac PostgreSQL client"
              width={1176}
              height={750}
              className="w-full h-auto dark:hidden"
            />
            <Image
              src="/screenshots2/PostgresGUI - Dark mode.png"
              alt="PostgresGUI - Dark mode interface"
              width={1176}
              height={750}
              className="w-full h-auto hidden dark:block"
            />
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 md:py-24 px-6 border-b border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {t.sideBySide}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {t.comparisonTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {t.comparisonDescription}
            </p>
          </div>

          <div className="border-y overflow-hidden bg-card">
            <TablePlusComparison locale={locale} />
          </div>

          {/* Sources */}
          <div className="mt-8 p-4 rounded-xl bg-accent/30 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                {t.sources}
              </span>
            </div>
            <ul className="space-y-1.5">
              {sources.map((source) => (
                <li key={source.num} className="text-sm">
                  <span className="text-muted-foreground">[{source.num}]</span>{" "}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] hover:underline"
                  >
                    {source.title}
                  </a>
                  <span className="text-muted-foreground text-xs ml-2 hidden sm:inline">
                    ({new URL(source.url).hostname})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* When to Choose Section */}
      <section className="py-16 md:py-24 px-6 grid-bg">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {t.honestAssessment}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {t.whichToolIsRight}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.whichToolIsRightDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Choose PostgresGUI */}
            <div className="p-6 md:p-8 rounded-2xl bg-emerald-50/10 border border-emerald-500/30 dark:bg-emerald-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl flex items-center justify-center">
                  <Image
                    src="/postgresgui-elephant.png"
                    alt="PostgresGUI"
                    width={60}
                    height={60}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t.choosePostgresGUIIf}
                  </h3>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    {t.recommended}
                  </span>
                </div>
              </div>
              <ul className="space-y-3">
                {t.choosePostgresGUIReasons.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-pretty"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Choose TablePlus */}
            <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                  <span className="font-semibold text-sm text-muted-foreground">
                    TP
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t.chooseTablePlusIf}
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {t.chooseTablePlusReasons.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {t.faq}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 tracking-tight">
              {t.commonQuestions}
            </h2>
          </div>

          <FAQ items={t.faqItems} />
        </div>
      </section>

    </>
  );
}
