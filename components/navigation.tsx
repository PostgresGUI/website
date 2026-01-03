"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "@/components/icons";

const GUMROAD_PRODUCT_LINK = "https://muizahg.gumroad.com/l/postgresgui";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#screenshots", label: "Screenshots" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white dark:bg-stone-900 border-b border-border/20 shadow-sm"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
          >
            <div className="relative">
              <Image
                src="/postgresgui-elephant.png"
                alt="PostgresGUI Home"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="absolute inset-0 bg-[var(--postgres-blue)] opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
            </div>
            <span className="text-lg font-display tracking-tight text-gray-900 dark:text-white">PostgresGUI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              // If link is a hash and we're not on home page, prepend "/" to navigate to home first
              const href = link.href.startsWith("#") && pathname !== "/" 
                ? `/${link.href}` 
                : link.href;
              
              return (
                <Link
                  key={link.href}
                  href={href}
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-colors relative group"
                  onClick={(e) => {
                    if (link.href.startsWith("#") && pathname === "/") {
                      // Only prevent default and scroll if we're already on home page
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
            <a
              href={GUMROAD_PRODUCT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--postgres-blue)] hover:bg-[var(--postgres-blue-dark)] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-swiftui shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Download
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-swiftui text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon width={20} height={20} className="text-gray-900 dark:text-white" />
            ) : (
              <MenuIcon width={20} height={20} className="text-gray-900 dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border/30 pt-4 bg-white dark:bg-stone-900">
            {navLinks.map((link) => {
              // If link is a hash and we're not on home page, prepend "/" to navigate to home first
              const href = link.href.startsWith("#") && pathname !== "/" 
                ? `/${link.href}` 
                : link.href;
              
              return (
                <Link
                  key={link.href}
                  href={href}
                  className="block font-semibold text-sm text-gray-900 dark:text-white hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-swiftui py-2 px-3 hover:bg-accent/50 rounded-lg"
                  onClick={(e) => {
                    if (link.href.startsWith("#") && pathname === "/") {
                      // Only prevent default and scroll if we're already on home page
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
              href={GUMROAD_PRODUCT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[var(--postgres-blue)] hover:bg-[var(--postgres-blue-dark)] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-swiftui text-center shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
