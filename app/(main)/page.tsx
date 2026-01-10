import Image from "next/image";
import Link from "next/link";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Highlights } from "@/components/highlights";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { ComparisonTable } from "@/components/comparison-table";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
// import { FinalCTA } from "@/components/final-cta";
import { FinalCTAV2 } from "@/components/final-cta-v2";
import { FlowingData } from "@/components/hero-animations/flowing-data";
import { INSTALLER_SIZE, INSTALLED_SIZE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const APP_STORE_LINK = "https://apps.apple.com/us/app/postgresgui/id6756467181";

export default function Home() {
  return (
    <>
      {/* Learn SQL Floating Button */}
      <Link
        href="/learn-sql"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-md border border-stone-200/50 dark:border-stone-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <span className="px-2 py-0.5 rounded-full bg-[var(--postgres-blue)]/15 text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] text-xs font-medium">
          New
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Learn SQL
        </span>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--postgres-blue)] group-hover:translate-x-0.5 transition-all" />
      </Link>

      {/* Hero Section */}
      <div
        id="hero-section"
        className="flex-1 flex items-center justify-center grid-bg hero-gradient relative overflow-hidden"
      >
        {/* Flowing Data Streams Background */}
        <FlowingData />

        {/* Accent Element */}
        <div className="absolute w-[800px] h-[600px] bg-gradient-to-br from-[var(--postgres-blue)] to-blue-400 opacity-5 blur-3xl rounded-full"></div>

        <div className="text-center px-6 pt-16 pb-16 md:pt-24 md:pb-24 relative z-10">
          {/* Main Tagline */}
          <h1
            className="text-5xl lg:text-6xl max-w-lg mx-auto mb-10 md:mb-12 animate-slide-in stagger-1 leading-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
          >
            The Best PostgreSQL GUI for Mac
          </h1>

          {/* CTA Button */}
          <div className="flex flex-col items-center justify-center gap-8 mb-8 md:mb-10 animate-slide-in stagger-3">
            <a
              href={APP_STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block scale-150 transition-transform hover:scale-[1.55]"
            >
              <AppStoreBadge />
            </a>
            <a
              href="https://github.com/postgresgui/postgresgui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] text-sm font-medium hover:underline"
            >
              Open Source ↗
            </a>
          </div>

          {/* Hero Screenshot */}
          <div className="w-full max-w-4xl mx-auto mb-10 md:mb-12 animate-slide-in stagger-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-stone-200/50 dark:border-stone-700/50">
              <Image
                src="/screenshots2/PostgresGUI - Run complex query and see query results.png"
                alt="PostgresGUI - Query editor with results"
                width={1176}
                height={750}
                className="w-full h-auto dark:hidden"
                priority
              />
              <Image
                src="/screenshots2/PostgresGUI - Dark mode.png"
                alt="PostgresGUI - Query editor with results (Dark mode)"
                width={1176}
                height={750}
                className="w-full h-auto hidden dark:block"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 md:py-24 px-6 border-t border-border/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Features
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              Why PostgresGUI?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              // Fast, native PostgreSQL without the bloat
            </p>
          </div>
          <Highlights />
        </div>
      </section>

      {/* Screenshots Section */}
      <section
        id="screenshots"
        className="py-16 md:py-24 px-6 border-t border-border/20 bg-stone-200 dark:bg-stone-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Screenshots
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              Crafted for Ease of Use
            </h2>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      {/* Comparison Table Section */}
      {/* <section
        id="pricing"
        className="py-16 md:py-24 px-6 border-t border-border/20 grid-bg"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Comparison
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              PostgresGUI vs. Alternatives
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              // See how we compare to other PostgreSQL clients
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              Trusted by developers
            </h2>
          </div>
          <Testimonials />
        </div>
      </section> */}

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-16 md:py-24 px-6 border-t border-border/20 grid-bg"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              Questions & Answers
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="border-t border-border/20">
        {/* <FinalCTA /> */}
        <FinalCTAV2 />
      </section>
    </>
  );
}
