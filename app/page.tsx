import Image from "next/image";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Highlights } from "@/components/highlights";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { ComparisonTable } from "@/components/comparison-table";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";

const COMING_SOON = true;

const GUMROAD_PRODUCT_LINK = "https://muizahg.gumroad.com/l/postgresgui";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center grid-bg relative overflow-hidden">
        {/* Accent Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--postgres-blue)] opacity-5 blur-3xl"></div>

        <div className="text-center px-6 pt-12 pb-16 md:pb-24 relative z-10">
          {/* Logo Image */}
          <div className="flex justify-center mb-4 animate-slide-in">
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
          <h1 className="text-2xl md:text-4xl lg:text-5xl max-w-2xl font-semibold mx-auto mb-4 md:mb-6 animate-slide-in stagger-2 leading-tight">
            Lightweight + Native PostgreSQL GUI for your Mac
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-10 animate-slide-in stagger-4">
            {COMING_SOON ? (
              <>
                <a
                  href={GUMROAD_PRODUCT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto bg-[var(--postgres-blue)] hover:bg-[var(--postgres-blue-dark)] text-white px-8 py-4 rounded-sharp font-bold text-lg transition-all shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-mono uppercase tracking-wide"
                >
                  <span className="inline-flex items-center gap-2">
                    Buy Now — $14.99
                    <span className="group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </span>
                </a>
                <a
                  href="https://github.com/postgresgui/postgresgui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto border-2 border-border hover:border-foreground px-8 py-4 rounded-sharp font-bold text-lg transition-all font-mono uppercase tracking-wide"
                >
                  <span className="inline-flex items-center gap-2">
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
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 font-medium bg-white dark:bg-black rounded-sharp">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                ▪
              </span>
              <span>14.6 MB installer</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 font-medium bg-white dark:bg-black rounded-sharp">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                ▪
              </span>
              <span>25.8 MB installed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 md:py-24 px-6 border-t-2 border-border"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="inline-block mb-4 px-3 py-1 bg-accent rounded-sharp">
              <span className="text-xs font-mono uppercase tracking-wide text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Features
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              Why PostgresGUI?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              // The PostgreSQL client that respects your Mac
            </p>
          </div>
          <Highlights />
        </div>
      </section>

      {/* Screenshots Section */}
      <section
        id="screenshots"
        className="py-16 md:py-24 px-6 border-t-2 border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="inline-block mb-4 px-3 py-1 bg-accent rounded-sharp">
              <span className="text-xs font-mono uppercase tracking-wide text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Interface
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              See PostgresGUI in Action
            </h2>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section
        id="pricing"
        className="py-16 md:py-24 px-6 border-t-2 border-border grid-bg"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="inline-block mb-4 px-3 py-1 bg-accent rounded-sharp">
              <span className="text-xs font-mono uppercase tracking-wide text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
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
          <div className="mt-8">
            <a
              href={GUMROAD_PRODUCT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block bg-[var(--postgres-blue)] hover:bg-[var(--postgres-blue-dark)] text-white px-8 py-3 rounded-sharp font-mono font-bold text-sm uppercase tracking-wide transition-all shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <span className="inline-flex items-center gap-2">
                Buy PostgresGUI — $14.99
                <span className="group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6 border-t-2 border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="inline-block mb-4 px-3 py-1 bg-accent rounded-sharp">
              <span className="text-xs font-mono uppercase tracking-wide text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-4 tracking-tight">
              Trusted by developers
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-16 md:py-24 px-6 border-t-2 border-border grid-bg"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="inline-block mb-4 px-3 py-1 bg-accent rounded-sharp">
              <span className="text-xs font-mono uppercase tracking-wide text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
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
      <section className="border-t-2 border-border">
        <FinalCTA />
      </section>
    </>
  );
}
