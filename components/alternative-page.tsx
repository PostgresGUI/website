/**
 * Shared landing page component for competitor "alternative" pages.
 *
 * Takes an `AlternativeData` object (see `lib/alternatives-data.ts`) and
 * renders the full marketing layout: hero, pain points, advantages,
 * comparison table, when-to-choose, FAQ. English-only by design — if a
 * page needs localization, migrate it to the TablePlus pattern instead.
 */

import Image from "next/image";
import { AppStoreBadge } from "@/components/app-store-badge";
import { AppStoreLink, APP_STORE_LINK } from "@/components/app-store-link";
import { AlternativeComparison } from "@/components/alternative-comparison";
import { FAQ } from "@/components/faq";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  DollarSign,
  ExternalLink,
  EyeOff,
  Feather,
  Gauge,
  Github,
  Layers,
  Lock,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AlternativeData, PainPoint, Advantage } from "@/lib/alternatives-data";

const ICON_MAP: Record<
  PainPoint["icon"] | Advantage["icon"],
  LucideIcon
> = {
  AlertTriangle,
  Code2,
  Cpu,
  DollarSign,
  EyeOff,
  Feather,
  Gauge,
  Layers,
  Lock,
  Server,
  Sparkles,
  Zap,
};

// Consistent color assignment for pain points and advantages by position.
const PAIN_COLORS = [
  { color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { color: "text-rose-500", bgColor: "bg-rose-500/10" },
  { color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
];

const ADVANTAGE_COLORS = [
  { color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { color: "text-violet-500", bgColor: "bg-violet-500/10" },
  { color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
];

export type AlternativePageProps = {
  data: AlternativeData;
  appStoreLink?: string;
};

export function AlternativePage({
  data,
  appStoreLink = APP_STORE_LINK,
}: AlternativePageProps) {
  // Split the headline so the competitor name and highlight word can be
  // colored. The existing TablePlus page does the same; we keep the logic
  // local so callers don't have to care.
  const headlineParts = (() => {
    const highlightClass =
      "text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]";
    const competitorParts = data.headline.split(
      new RegExp(`(${data.competitor})`, "i")
    );
    return competitorParts.flatMap((part, i) => {
      if (part.toLowerCase() === data.competitor.toLowerCase()) {
        return [
          <span key={`c-${i}`} className={highlightClass}>
            {part}
          </span>,
        ];
      }
      const subParts = part.split(
        new RegExp(`(${data.highlightWord})`, "i")
      );
      return subParts.map((sub, j) => {
        if (sub.toLowerCase() === data.highlightWord.toLowerCase()) {
          return (
            <span key={`h-${i}-${j}`} className={highlightClass}>
              {sub}
            </span>
          );
        }
        return <span key={`t-${i}-${j}`}>{sub}</span>;
      });
    });
  })();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[var(--postgres-blue)] to-blue-400 opacity-[0.07] blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto pt-20 pb-16 md:pt-28 md:pb-24 px-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6 animate-slide-in stagger-1 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
          >
            {headlineParts}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-in stagger-2">
            {data.subheadline}
          </p>
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
              View source on GitHub
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
              {data.painPointsLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {data.painPointsHeadline}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {data.painPointsDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {data.painPoints.map((point, index) => {
              const Icon = ICON_MAP[point.icon];
              const { color, bgColor } = PAIN_COLORS[index % PAIN_COLORS.length];
              const source = point.sourceNum
                ? data.sources.find((s) => s.num === point.sourceNum)
                : undefined;
              return (
                <div
                  key={point.title}
                  className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-border transition-all duration-300"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {point.description}
                    {source && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-1 text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] hover:underline"
                        title={`Source: ${source.title}`}
                      >
                        <sup className="text-[10px]">[{source.num}]</sup>
                      </a>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 md:py-24 px-6 border-y border-border/30 bg-white dark:bg-stone-950">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {data.advantagesLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {data.advantagesHeadline}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {data.advantagesDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-12">
            {data.advantages.map((advantage, index) => {
              const Icon = ICON_MAP[advantage.icon];
              const { color, bgColor } =
                ADVANTAGE_COLORS[index % ADVANTAGE_COLORS.length];
              return (
                <div
                  key={advantage.title}
                  className="group relative p-6 rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-border transition-all duration-300"
                >
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] bg-[var(--postgres-blue)]/10 rounded-full">
                      {advantage.highlight}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* App Screenshot — single <picture> so only the matching
              theme variant is fetched. */}
          <div className="relative rounded-xl overflow-hidden shadow-screenshot-elevated border border-stone-200/50 dark:border-stone-700/50">
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="/screenshots4/PostgresGUI - Dark mode.webp"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screenshots4/PostgresGUI - Run complex query and see query results.webp"
                alt="PostgresGUI - Native Mac PostgreSQL client"
                width={1176}
                height={750}
                className="w-full h-auto block"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 md:py-24 px-6 border-b border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {data.comparisonLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {data.comparisonHeadline}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {data.comparisonDescription}
            </p>
          </div>

          <div className="border-y overflow-hidden bg-card">
            <AlternativeComparison
              competitor={data.competitor}
              rows={data.comparison}
            />
          </div>

          {data.sources.length > 0 && (
            <div className="mt-8 p-4 rounded-xl bg-accent/30 border border-border/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    Sources
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Last updated: {data.lastUpdatedISO}
                </span>
              </div>
              <ul className="space-y-1.5">
                {data.sources.map((source) => (
                  <li key={source.num} className="text-sm">
                    <span className="text-muted-foreground">
                      [{source.num}]
                    </span>{" "}
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
          )}
        </div>
      </section>

      {/* When to Choose Section */}
      <section className="py-16 md:py-24 px-6 grid-bg">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-xs font-mono font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] uppercase tracking-wider">
              {data.whenToChooseLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              {data.whenToChooseHeadline}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {data.whenToChooseDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
                  <h3 className="font-semibold text-lg">Choose PostgresGUI if</h3>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    Recommended
                  </span>
                </div>
              </div>
              <ul className="space-y-3">
                {data.choosePostgresGuiReasons.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-pretty"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                  <span className="font-semibold text-sm text-muted-foreground">
                    {data.competitor.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Choose {data.competitor} if
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {data.chooseCompetitorReasons.map((item, index) => (
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
            <h2 className="text-3xl md:text-4xl font-display mt-3 tracking-tight">
              Common questions
            </h2>
          </div>
          <FAQ items={data.faqItems} />
        </div>
      </section>
    </>
  );
}
