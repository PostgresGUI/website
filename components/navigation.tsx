"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MenuIcon, XIcon } from "@/components/icons";

const GUMROAD_PRODUCT_LINK = "https://muizahg.gumroad.com/l/postgresgui";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#screenshots", label: "Screenshots" },
    { href: "#pricing", label: "Pricing" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-border"
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
              <div className="absolute inset-0 bg-[var(--postgres-blue)] opacity-0 group-hover:opacity-10 transition-opacity rounded-sharp"></div>
            </div>
            <span className="text-lg font-display tracking-tight">PostgresGUI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-mono uppercase tracking-wide hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-colors relative group"
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--postgres-blue)] dark:bg-[var(--postgres-blue-light)] group-hover:w-full transition-all"></span>
              </Link>
            ))}
            <a
              href={GUMROAD_PRODUCT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--postgres-blue)] hover:bg-[var(--postgres-blue-dark)] text-white px-5 py-2 rounded-sharp font-mono font-bold text-sm uppercase tracking-wide transition-all shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Buy
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-sharp hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon width={20} height={20} />
            ) : (
              <MenuIcon width={20} height={20} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t-2 border-border pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-mono text-sm uppercase tracking-wide hover:text-[var(--postgres-blue)] dark:hover:text-[var(--postgres-blue-light)] transition-colors py-2 px-3 hover:bg-accent rounded-sharp"
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GUMROAD_PRODUCT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[var(--postgres-blue)] hover:bg-[var(--postgres-blue-dark)] text-white px-6 py-3 rounded-sharp font-mono font-bold text-sm uppercase tracking-wide transition-all text-center shadow-brutal"
            >
              Buy Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
