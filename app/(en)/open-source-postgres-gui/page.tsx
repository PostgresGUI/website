import type { Metadata } from "next";
import Link from "next/link";
import { APP_STORE_LINK, GITHUB_REPOSITORY_LINK } from "@/lib/constants";

const CANONICAL = "https://postgresgui.com/open-source-postgres-gui";

export const metadata: Metadata = {
  title: "Open Source Postgres GUI for Mac - PostgresGUI",
  description:
    "PostgresGUI is an open source Postgres GUI for Mac. Build it from source for free or support signed Mac App Store builds with a one-time purchase.",
  keywords: [
    "open source postgres gui",
    "free postgres client mac",
    "postgres client mac free",
    "mac postgres client free",
    "postgresql client mac free",
    "open source postgresql client mac",
    "postgres gui mac",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "Open Source Postgres GUI for Mac - PostgresGUI",
    description:
      "A native Mac Postgres GUI that is open source, focused, lightweight, and available without a subscription.",
    type: "website",
    url: CANONICAL,
    siteName: "PostgresGUI",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open source Postgres GUI for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Postgres GUI for Mac - PostgresGUI",
    description:
      "Build PostgresGUI from source for free or support signed Mac App Store builds with a one-time purchase.",
    images: ["https://postgresgui.com/postgresgui-og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostgresGUI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS",
  url: CANONICAL,
  codeRepository: GITHUB_REPOSITORY_LINK,
  description:
    "An open source PostgreSQL GUI client for Mac with a focused native interface and no subscription.",
  offers: {
    "@type": "Offer",
    price: "12.99",
    priceCurrency: "USD",
  },
};

export default function OpenSourcePostgresGuiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <section className="border-b border-border/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold text-[var(--postgres-blue)]">
              Open source Postgres GUI
            </p>
            <h1 className="max-w-3xl text-4xl font-display tracking-tight md:text-6xl">
              A native Mac PostgreSQL client you can inspect, build, and use.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              PostgresGUI is an open source Postgres GUI for Mac. Build it from
              source for free, or use the signed Mac App Store version to support
              ongoing development with a one-time purchase.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={GITHUB_REPOSITORY_LINK}
                className="rounded-md bg-[var(--postgres-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--postgres-blue-dark)]"
              >
                View on GitHub
              </a>
              <a
                href={APP_STORE_LINK}
                className="rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-accent"
              >
                Download signed build
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              ["Transparent source", "Read the code, build it yourself, fork it, or contribute improvements."],
              ["No subscription", "Use a one-time App Store purchase for signed builds and automatic updates."],
              ["Postgres-focused", "Skip broad multi-database complexity when your daily work is PostgreSQL."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-border p-5">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border/30 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-display tracking-tight">
              Free source, paid signed builds
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              If you want a free Postgres client for Mac and are comfortable
              building from source, the repository is public. If you want a
              notarized app with normal Mac App Store installation and updates,
              the paid version keeps the project sustainable.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              See also:{" "}
              <Link href="/blog/only-postgres-gui-mac-no-subscription">
                why PostgresGUI has no subscription
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
