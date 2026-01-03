import Image from "next/image";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Highlights } from "@/components/highlights";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { ComparisonTable } from "@/components/comparison-table";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { FlowingData } from "@/components/hero-animations/flowing-data";
import { PRICE, INSTALLER_SIZE, INSTALLED_SIZE } from "@/lib/constants";

const COMING_SOON = true;

const GUMROAD_PRODUCT_LINK = "https://muizahg.gumroad.com/l/postgresgui";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        id="hero-section"
        className="flex-1 flex items-center justify-center grid-bg relative overflow-hidden"
      >
        {/* Flowing Data Streams Background */}
        <FlowingData />

        {/* Accent Element */}
        <div className="absolute w-[800px] h-[600px] bg-gradient-to-br from-[var(--postgres-blue)] to-blue-400 opacity-5 blur-3xl rounded-full"></div>

        <div className="text-center px-6 pt-12 pb-16 md:pb-24 relative z-10">
          {/* Logo Image */}
          <div className="flex justify-center mb-2 animate-slide-in">
            <div className="relative">
              <Image
                src="/postgresgui-elephant.png"
                alt="PostgresGUI - Lightweight PostgreSQL Client"
                width={240}
                height={240}
                className="object-contain md:w-[320px] md:h-[320px]"
                priority
              />
            </div>
          </div>

          {/* Product Name */}
          {/* <h1 className="text-6xl md:text-8xl lg:text-9xl font-display mb-6 md:mb-8 animate-slide-in stagger-1 tracking-tight">
            PostgresGUI
          </h1> */}

          {/* Main Tagline */}
          <h1 className="text-5xl lg:text-6xl mb-8 max-w-lg font-semibold mx-auto mb-4 md:mb-6 animate-slide-in stagger-2 leading-tight font-display">
            Native macOS PostgreSQL GUI
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-10 animate-slide-in stagger-4">
            {COMING_SOON ? (
              <>
                <a
                  href={GUMROAD_PRODUCT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-[280px] bg-gradient-to-r from-[var(--postgres-blue)] to-blue-500 hover:from-[var(--postgres-blue-dark)] hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-swiftui shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    Buy Now — {PRICE}
                    <span className="group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </span>
                </a>
                <a
                  href="https://github.com/postgresgui/postgresgui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-[280px] border border-border/50 hover:border-border bg-card/50 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-swiftui shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    Open Source
                    <span className="group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </span>
                </a>
              </>
            ) : (
              <a href="#" className="inline-block scale-150">
                <AppStoreBadge />
              </a>
            )}
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-mono">
            <div className="flex items-center gap-2 px-4 py-2 font-medium bg-white dark:bg-stone-900 border border-border/10 rounded-full text-gray-900 dark:text-white">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                ▪
              </span>
              <span>{INSTALLER_SIZE} installer</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 font-medium bg-white dark:bg-stone-900 border border-border/10 rounded-full text-gray-900 dark:text-white">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                ▪
              </span>
              <span>{INSTALLED_SIZE} installed</span>
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
        <FinalCTA />
      </section>
    </>
  );
}
