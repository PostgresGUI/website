import Link from "next/link";

export function Footer() {
  const productLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#screenshots", label: "Screenshots" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];

  const supportLinks = [
    { href: "/support", label: "Support" },
    {
      href: "https://github.com/postgresgui/postgresgui/issues",
      label: "GitHub Issues",
      external: true,
    },
    { href: "mailto:fikri@mghazi.com", label: "Email", external: true },
  ];

  const legalLinks = [{ href: "/privacy", label: "Privacy Policy" }];

  const socialLinks = [
    {
      href: "https://github.com/postgresgui/postgresgui",
      label: "GitHub",
      icon: "github",
    },
  ];

  return (
    <footer
      className="w-full border-t border-gray-200 dark:border-stone-700 bg-gray-50 dark:bg-stone-900/50 py-12 px-6 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-2">PostgresGUI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lightweight PostgreSQL client for Mac
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <nav aria-label="Product navigation">
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
            <h4 className="font-semibold mb-3">Support</h4>
            <nav aria-label="Support navigation">
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
            <h4 className="font-semibold mb-3">Legal</h4>
            <nav aria-label="Legal navigation">
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
        <div className="pt-8 border-t border-gray-200 dark:border-stone-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  aria-label={`${link.label} profile`}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; 2025 PostgresGUI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
