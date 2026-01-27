import Link from "next/link";
import { getTranslations, Locale } from "@/lib/translations";

type FooterProps = {
  locale?: Locale;
};

export function Footer({ locale = "en" }: FooterProps) {
  const t = getTranslations(locale);

  // Get locale prefix for links
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const homeUrl = localePrefix || "/";

  const navigateLinks = [
    { href: `${homeUrl}#features`, label: t.footer.features },
    { href: `${homeUrl}#screenshots`, label: t.footer.screenshots },
    { href: `${homeUrl}#pricing`, label: t.footer.pricing },
    { href: `${homeUrl}#faq`, label: t.footer.faq },
  ];

  const toolsLinks = [
    { href: "/sql-editor", label: "SQL Editor" },
    { href: "/sql-cheatsheet", label: "SQL Cheatsheet" },
    { href: "/schema-designer", label: "Schema Designer" },
  ];

  const resourceLinks = [
    { href: "/support", label: t.footer.supportLink },
    {
      href: "https://github.com/postgresgui/postgresgui/issues",
      label: t.footer.githubIssues,
      external: true,
    },
    { href: "mailto:fikri@mghazi.com", label: t.footer.email, external: true },
  ];

  const compareLinks = [
    { href: "/alternatives/tableplus", label: `vs ${t.footer.tablePlusAlternative}` },
  ];

  const legalLinks = [
    { href: "/privacy", label: t.footer.privacyPolicy },
    {
      href: "https://github.com/PostgresGUI/postgresgui/blob/main/LICENSE",
      label: t.footer.license,
      external: true,
    },
  ];

  return (
    <footer
      className="w-full border-t border-border/30
        bg-gradient-to-b from-gray-50/50 to-gray-100/50
        dark:from-stone-900 dark:to-stone-950/50
        py-16 md:py-20 px-6 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Content - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-2 mb-12">
          {/* Brand Hero Section - 5 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Brand Name */}
            <h3 className="font-display text-4xl md:text-5xl tracking-tighter text-gray-900 dark:text-white">
              PostgresGUI
            </h3>

            {/* Terminal-style Tagline */}
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
              <span className="text-[var(--postgres-blue)]">$</span>{" "}
              {t.footer.tagline}
              <span className="animate-terminal-cursor ml-0.5 inline-block w-2 h-4 bg-[var(--postgres-blue)] align-middle" />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Download Button */}
              <Link
                href={`${localePrefix}/download`}
                className="inline-flex items-center gap-2 px-5 py-2.5
                  bg-gradient-to-r from-[var(--postgres-blue)] to-[var(--postgres-blue-dark)]
                  hover:from-[var(--postgres-blue-light)] hover:to-[var(--postgres-blue)]
                  text-white text-sm font-medium rounded-lg
                  transition-all duration-300
                  shadow-md hover:shadow-lg hover:shadow-[var(--postgres-blue)]/25
                  focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:ring-offset-2
                  dark:focus:ring-offset-stone-900"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.nav.download}
              </Link>

              {/* GitHub Badge */}
              <a
                href="https://github.com/postgresgui/postgresgui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5
                  border border-border/50 dark:border-border/30
                  bg-white/50 dark:bg-stone-800/50
                  hover:bg-gray-50 dark:hover:bg-stone-800
                  text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:ring-offset-2
                  dark:focus:ring-offset-stone-900"
                aria-label="View PostgresGUI on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Link Columns - 7 cols */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-8">
              {/* Navigate Column */}
              <div className="animate-slide-in stagger-1">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-4">
                  {t.footer.product}
                </h4>
                <nav aria-label="Product navigation">
                  <ul className="space-y-3">
                    {navigateLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="nav-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Free Apps Column */}
              <div className="animate-slide-in stagger-2">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-4">
                  Free Apps
                </h4>
                <nav aria-label="Free apps navigation">
                  <ul className="space-y-3">
                    {toolsLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="nav-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Resources Column */}
              <div className="animate-slide-in stagger-3">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-4">
                  Resources
                </h4>
                <nav aria-label="Resources navigation">
                  <ul className="space-y-3">
                    {resourceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="nav-link inline-flex items-center"
                          {...(link.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                        >
                          {link.label}
                          {link.external && (
                            <svg className="w-3 h-3 ml-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Compare Column */}
              <div className="animate-slide-in stagger-4">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-4">
                  Compare
                </h4>
                <nav aria-label="Compare navigation">
                  <ul className="space-y-3">
                    {compareLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="nav-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Legal Column */}
              <div className="animate-slide-in stagger-5">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-4">
                  {t.footer.legal}
                </h4>
                <nav aria-label="Legal navigation">
                  <ul className="space-y-3">
                    {legalLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="nav-link inline-flex items-center"
                          {...(link.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                        >
                          {link.label}
                          {link.external && (
                            <svg className="w-3 h-3 ml-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Right side: Copyright */}
            <p className="text-sm text-gray-500 dark:text-gray-500">
              &copy; {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
