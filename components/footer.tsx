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

  const productLinks = [
    { href: `${homeUrl}#features`, label: t.footer.features },
    { href: `${homeUrl}#screenshots`, label: t.footer.screenshots },
    { href: `${homeUrl}#pricing`, label: t.footer.pricing },
    { href: `${homeUrl}#faq`, label: t.footer.faq },
  ];

  const supportLinks = [
    { href: "/support", label: t.footer.supportLink },
    {
      href: "https://github.com/postgresgui/postgresgui/issues",
      label: t.footer.githubIssues,
      external: true,
    },
    { href: "mailto:fikri@mghazi.com", label: t.footer.email, external: true },
  ];

  const legalLinks = [{ href: "/privacy", label: t.footer.privacyPolicy }];

  const socialLinks = [
    {
      href: "https://github.com/postgresgui/postgresgui",
      label: "GitHub",
      icon: "github",
    },
  ];

  return (
    <footer
      className="w-full border-t border-border/50 bg-accent/30 backdrop-blur-sm py-12 px-6 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">PostgresGUI</h3>
            <p className="text-sm text-gray-600 dark:text-white">
              {t.footer.tagline}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{t.footer.product}</h4>
            <nav aria-label="Product navigation">
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{t.footer.support}</h4>
            <nav aria-label="Support navigation">
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.label}
                      {link.external && " ↗"}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{t.footer.legal}</h4>
            <nav aria-label="Legal navigation">
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label={`${link.label} profile`}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-600 dark:text-white">
              &copy; {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
