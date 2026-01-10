import Image from "next/image";
import Link from "next/link";
import { AppStoreBadge } from "@/components/app-store-badge";
import { TablePlusComparison } from "@/components/tableplus-comparison";
import { FinalCTAV2 } from "@/components/final-cta-v2";
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
import { PRICE, INSTALLER_SIZE } from "@/lib/constants";

const APP_STORE_LINK = "https://apps.apple.com/app/postgresgui/id6756467181";

const painPoints = [
  {
    icon: DollarSign,
    title: "High Cost",
    description:
      "TablePlus costs $99 per device with a $59/year renewal for updates. That adds up fast across multiple machines.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    sourceNum: 1,
  },
  {
    icon: Layers,
    title: "2 Tab Limit",
    description:
      "The free version is limited to 2 tabs and 2 windows, which can feel restrictive when working with multiple queries or databases.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    sourceNum: 1,
  },
  {
    icon: Lock,
    title: "Closed Source",
    description:
      "Some developers prefer open source tools where they can inspect the code, and have full transparency.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Gauge,
    title: "Larger Footprint",
    description:
      "At ~140MB installed, TablePlus is over 5x the size of PostgresGUI due to multi-database support.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    sourceNum: 2,
  },
];

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

const advantages = [
  {
    icon: Code2,
    title: "Open Source",
    description: "Full source code on GitHub for full transparency and trust.",
    highlight: "github.com/postgresgui",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Feather,
    title: "Lightweight",
    description: `Just ${INSTALLER_SIZE}. macOS Native. SwiftUI. No Electron.`,
    highlight: "10x smaller",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: DollarSign,
    title: "One-Time Purchase",
    description: `Pay ${PRICE} once. Free updates forever. No subscription.`,
    highlight: "No renewal fees",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Zero telemetry, zero analytics. Your data never leaves your Mac.",
    highlight: "No data collection",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const chooseTablePlus = [
  "You need to work with MySQL, Redis, SQLite, MongoDB, or other databases",
  "You work primarily on Windows or Linux",
  "You need an iOS companion app for mobile access",
  "You require advanced features like ER diagrams or plugins",
];

const choosePostgresGUI = [
  "You work primarily with PostgreSQL",
  "You use Mac as your main development machine",
  "You value open source software you can trust and audit",
  "You want a lightweight, fast tool without subscription fees",
  "You care about privacy and want zero data collection",
];

export type TablePlusAlternativePageProps = {
  appStoreLink?: string;
};

export function TablePlusAlternativePage({
  appStoreLink = APP_STORE_LINK,
}: TablePlusAlternativePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[var(--postgres-blue)] to-blue-400 opacity-[0.07] blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">TablePlus Alternative</span>
          </nav>

          {/* Main Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6 animate-slide-in stagger-1 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
          >
            Looking for a{" "}
            <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
              TablePlus Alternative
            </span>{" "}
            for Mac?
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-in stagger-2">
            PostgresGUI is a lightweight, open source PostgreSQL client built
            natively for Mac. No subscription, no bloat, no data collection.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-slide-in stagger-3">
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block scale-125 origin-left transition-transform hover:scale-[1.28]"
            >
              <AppStoreBadge />
            </a>
            <a
              href="https://github.com/postgresgui/postgresgui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              View Source on GitHub
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
              Common Frustrations
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              Why developers search for TablePlus alternatives
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              TablePlus is a capable tool, but it's not the right fit for
              everyone. Here's what drives developers to look for alternatives.
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
              The Alternative
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              PostgresGUI: Built different
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              A native Mac app that does one thing well: PostgreSQL. No
              multi-database complexity, no Electron overhead, no subscription.
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
              Side by Side
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              PostgresGUI vs TablePlus
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              A transparent comparison to help you make the right choice for
              your workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 overflow-hidden bg-card">
            <TablePlusComparison />
          </div>

          {/* Sources */}
          <div className="mt-8 p-4 rounded-xl bg-accent/30 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                Sources
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
              Honest Assessment
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 mb-4 tracking-tight">
              Which tool is right for you?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different tools for different needs. Here's an honest look at when
              each option makes sense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
                    Choose TablePlus if...
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {chooseTablePlus.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Choose PostgresGUI */}
            <div className="p-6 md:p-8 rounded-2xl border-2 border-[var(--postgres-blue)]/30 bg-[var(--postgres-blue)]/5 dark:bg-[var(--postgres-blue)]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--postgres-blue)] flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="PostgresGUI"
                    width={24}
                    height={24}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Choose PostgresGUI if...
                  </h3>
                  <span className="text-xs font-mono text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                    Recommended
                  </span>
                </div>
              </div>
              <ul className="space-y-3">
                {choosePostgresGUI.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
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
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-display mt-3 tracking-tight">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-2">
                Is PostgresGUI really free?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PostgresGUI is open source and the code is freely available on
                GitHub. The App Store version costs {PRICE} as a one-time
                purchase to support development. There are no subscriptions, no
                renewal fees, and updates are free forever.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-2">
                Can PostgresGUI connect to MySQL or other databases?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No. PostgresGUI is designed exclusively for PostgreSQL. This
                focus allows us to build a better, more lightweight tool without
                the complexity of supporting multiple database engines.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-2">
                Does PostgresGUI work on Windows or Linux?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PostgresGUI is a native Mac app built with Swift. It's designed
                exclusively for macOS. If you need cross-platform support,
                TablePlus or DBeaver might be better options for you.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-2">
                How does PostgresGUI stay so small?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PostgresGUI is built with native Swift and doesn't bundle a web
                browser engine like Electron apps do. It only includes what's
                needed for PostgreSQL, keeping the install size at just{" "}
                {INSTALLER_SIZE}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/30">
        <FinalCTAV2 locale="en" />
      </section>
    </>
  );
}
