"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon, GitHubIcon } from "@/components/icons";
import { getTranslations, Locale } from "@/lib/translations";
import { AppStoreLink } from "@/components/app-store-link";

const GITHUB_LINK = "https://github.com/postgresgui/postgresgui";
const GITHUB_API = "https://api.github.com/repos/postgresgui/postgresgui";

type NavigationProps = {
  locale?: Locale;
};

export function Navigation({ locale = "en" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);
  const pathname = usePathname();
  const t = getTranslations(locale);

  // Get locale prefix for links
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const homeUrl = localePrefix || "/";

  useEffect(() => {
    fetch(GITHUB_API)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#screenshots", label: t.nav.screenshots },
    { href: "/support", label: t.nav.support },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-border/20"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-1">
            <Link
              href={homeUrl}
              className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity group"
            >
              <div className="relative">
                <Image
                  src="/postgresgui-elephant.png"
                  alt={t.images.logoAlt}
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-[var(--postgres-blue)] opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
              </div>
              <span className="text-lg font-display tracking-tight text-gray-900 dark:text-white">
                PostgresGUI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center gap-6 flex-1">
            {navLinks.map((link) => {
              // Check if we're on the home page for this locale
              const isOnHomePage = pathname === homeUrl || pathname === `${localePrefix}/`;

              // If link is a hash and we're not on home page, prepend locale home URL
              const href = link.href.startsWith("#")
                ? isOnHomePage
                  ? link.href
                  : `${homeUrl}${link.href}`
                : link.href;

              return (
                <Link
                  key={link.href}
                  href={href}
                  className="text-sm text-gray-900 dark:text-white hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-colors relative group"
                  onClick={(e) => {
                    if (link.href.startsWith("#") && isOnHomePage) {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--postgres-blue)] dark:bg-[var(--postgres-blue-light)] group-hover:w-full transition-all"></span>
                </Link>
              );
            })}
          </div>

          {/* GitHub & Download - Right */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-2">
            <a
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-stone-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              aria-label="View on GitHub"
            >
              {starCount !== null && (
                <>
                  <span className="text-xs font-semibold tabular-nums">
                    ⭐{" "}
                    {starCount >= 1000
                      ? `${(starCount / 1000).toFixed(1)}k`
                      : starCount}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                </>
              )}
              <GitHubIcon width={18} height={18} />
              <span className="text-xs font-semibold">Open Source</span> <span className="text-xs opacity-70">↗</span>
            </a>
            <AppStoreLink
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-all bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_4px_0_rgba(0,0,0,0.4),0_4px_8px_-2px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_0_rgba(0,0,0,0.4),0_6px_12px_-2px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-800 dark:hover:from-gray-500 dark:hover:to-gray-700 active:from-gray-800 active:to-gray-900 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] border border-gray-800 dark:border-gray-700"
            >
              {t.nav.download} <span className="text-xs opacity-70">↗</span>
            </AppStoreLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-swiftui text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon
                width={20}
                height={20}
                className="text-gray-900 dark:text-white"
              />
            ) : (
              <MenuIcon
                width={20}
                height={20}
                className="text-gray-900 dark:text-white"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border/30 pt-4 bg-white dark:bg-stone-900">
            {navLinks.map((link) => {
              const isOnHomePage = pathname === homeUrl || pathname === `${localePrefix}/`;
              const href = link.href.startsWith("#")
                ? isOnHomePage
                  ? link.href
                  : `${homeUrl}${link.href}`
                : link.href;

              return (
                <Link
                  key={link.href}
                  href={href}
                  className="block font-semibold text-sm text-gray-900 dark:text-white hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-swiftui py-2 px-3 hover:bg-accent/50 rounded-lg"
                  onClick={(e) => {
                    if (link.href.startsWith("#") && isOnHomePage) {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-swiftui py-2 px-3 hover:bg-accent/50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {starCount !== null && (
                <>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tabular-nums">
                    ⭐{" "}
                    {starCount >= 1000
                      ? `${(starCount / 1000).toFixed(1)}k`
                      : starCount}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                </>
              )}
              <GitHubIcon width={18} height={18} />
              Open Source <span className="text-xs opacity-70">↗</span>
            </a>
            <AppStoreLink
              className="block font-semibold text-sm text-white py-2 px-3 rounded-lg text-center transition-all bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_4px_0_rgba(0,0,0,0.4),0_4px_8px_-2px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_0_rgba(0,0,0,0.4),0_6px_12px_-2px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-800 dark:hover:from-gray-500 dark:hover:to-gray-700 border border-gray-800 dark:border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.download} <span className="text-xs opacity-70">↗</span>
            </AppStoreLink>
          </div>
        )}
      </div>
    </nav>
  );
}
