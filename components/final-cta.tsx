const GUMROAD_PRODUCT_LINK = "https://muizahg.gumroad.com/l/postgresgui";

export function FinalCTA() {
  return (
    <div className="text-center py-20 px-6 grid-bg">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 tracking-tight">
          Ready to try PostgresGUI?
        </h2>
        <p className="text-xl md:text-2xl mb-4">
          A lightweight PostgreSQL client for Mac.
        </p>
        <p className="text-base md:text-lg text-muted-foreground font-mono mb-10">
          $ echo "14.99" # One-time payment • No subscription
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GUMROAD_PRODUCT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto bg-gradient-to-r from-[var(--postgres-blue)] to-blue-500 hover:from-[var(--postgres-blue-dark)] hover:to-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-sm transition-swiftui shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="inline-flex items-center gap-2">
              Buy Now — $14.99
              <span className="group-hover:translate-x-1 transition-transform">↗</span>
            </span>
          </a>
          <a
            href="https://github.com/postgresgui/postgresgui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Or view the source code on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
