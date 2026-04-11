import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Only Postgres GUI for Mac With No Subscription",
  description:
    "PostgresGUI is a native Mac Postgres client for $12.99 — one time. No subscription, no telemetry, fully open source. See how it compares to TablePlus, Postico, and DataGrip.",
  keywords: [
    "Postgres GUI Mac",
    "PostgreSQL client Mac",
    "no subscription database tool",
    "PostgresGUI",
    "TablePlus alternative",
    "Postico alternative",
    "DataGrip alternative",
    "native Mac database client",
    "open source Postgres GUI",
    "one time purchase database tool",
  ],
  openGraph: {
    title: "The Only Postgres GUI for Mac With No Subscription",
    description:
      "PostgresGUI is a native Mac Postgres client for $12.99 — one time. No subscription, no telemetry, fully open source. See how it compares to TablePlus, Postico, and DataGrip.",
    type: "article",
    publishedTime: "2026-03-03T00:00:00Z",
    url: "https://postgresgui.com/blog/only-postgres-gui-mac-no-subscription",
    siteName: "PostgresGUI",
    locale: "en_US",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PostgresGUI - Native PostgreSQL Client for Mac",
      },
    ],
  },
  twitter: {
    site: "@postgresgui",
    creator: "@postgresgui",
    card: "summary_large_image",
    title: "The Only Postgres GUI for Mac With No Subscription",
    description:
      "PostgresGUI is a native Mac Postgres client for $12.99 — one time. No subscription, no telemetry, fully open source. See how it compares to TablePlus, Postico, and DataGrip.",
    images: [
      {
        url: "https://postgresgui.com/postgresgui-og-image.jpg",
        alt: "PostgresGUI - Native PostgreSQL Client for Mac",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function ComparisonTable() {
  const tools = [
    { name: "PostgresGUI", price: "$12.99 once", subscription: "No", native: "Yes (Swift)", openSource: "Yes", dataCollection: "None", multiDb: "No" },
    { name: "TablePlus", price: "$99 + $59/yr updates", subscription: "No (renewal for updates)", native: "Yes", openSource: "No", dataCollection: "Some", multiDb: "Yes" },
    { name: "Postico", price: "$69 (3 devices)", subscription: "No", native: "Yes", openSource: "No", dataCollection: "Unknown", multiDb: "No" },
    { name: "DataGrip", price: "$10.90/mo", subscription: "Yes", native: "No (JVM)", openSource: "No", dataCollection: "Yes", multiDb: "Yes" },
  ];

  const rows = [
    { label: "Price", key: "price" as const },
    { label: "Subscription", key: "subscription" as const },
    { label: "Native Mac", key: "native" as const },
    { label: "Open source", key: "openSource" as const },
    { label: "Data collection", key: "dataCollection" as const },
    { label: "Multi-database", key: "multiDb" as const },
  ];

  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground"></th>
              {tools.map((tool) => (
                <th
                  key={tool.name}
                  className="px-4 py-3 text-left font-semibold text-foreground"
                >
                  {tool.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={i < rows.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-4 py-3 font-medium text-muted-foreground">
                  {row.label}
                </td>
                {tools.map((tool) => (
                  <td key={tool.name} className="px-4 py-3 text-foreground">
                    {tool[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function OnlyPostgresGUIMacNoSubscriptionPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              The Only Postgres GUI for Mac With No Subscription
            </h1>
            <p className="text-muted-foreground text-lg">Ghazi</p>
          </header>

          <div className="space-y-6">
            <h2>Answer: PostgresGUI</h2>

            <p>
              It&apos;s $12.99. One time. Yours forever.
            </p>

            <p>
              No monthly charge. No annual renewal email. No &ldquo;your
              subscription is about to expire&rdquo; notification. You pay once,
              it lives in your Applications folder, and that&apos;s the end of
              the financial relationship.
            </p>

            <p>
              It&apos;s a native Mac app, written in Swift. That matters more
              than it sounds. A lot of desktop tools — including some popular
              ones — are built on Electron, which is essentially a bundled
              browser running your app. It works, but it&apos;s heavy.
              PostgresGUI is 27MB. It opens fast, feels responsive, and
              doesn&apos;t warm up your laptop just by existing.
            </p>

            <p>
              It&apos;s also fully open source. You can look at the code on
              GitHub, build it yourself for free if you want. No telemetry. No
              analytics. No usage data going anywhere. Your database connections
              and query history stay on your machine.
            </p>

            <p>
              Feature-wise, it covers the essentials cleanly: connecting via
              standard credentials or a connection string, browsing databases and
              tables, running queries with a proper editor, editing rows,
              filtering and sorting, exporting to CSV, viewing JSON, saving
              queries for later, and multiple tabs. It has dark mode. It has the
              things you actually use.
            </p>

            <h2>How it stacks up against the alternatives</h2>

            <p>
              Here&apos;s an honest comparison, because pretending there are no
              tradeoffs would be annoying:
            </p>

            <ComparisonTable />

            <p>
              TablePlus is more powerful. DataGrip has better SQL intelligence
              and refactoring tools if you&apos;re doing serious database
              development work. If those things matter to you, they&apos;re worth
              considering.
            </p>

            <p>
              But if you&apos;re a solo developer or working on a small team, and
              your database is Postgres, PostgresGUI does everything you need for
              the price of a single month of the alternatives.
            </p>

            <h2>Who it&apos;s for</h2>

            <p>
              Solo developers. Freelancers. People who build side projects.
              Developers who just want a clean, fast Postgres client on their
              personal Mac without thinking about it every month.
            </p>

            <p>
              It&apos;s not the right call if you need to connect to multiple
              database types, or if you&apos;re on a team that needs shared
              configs and collaboration features. For that, TablePlus or DataGrip
              genuinely make more sense.
            </p>

            <p>
              But if you&apos;re tired of subscribing to things, and you just
              want a good Postgres client that you own — this is the one.
            </p>

            <p>
              <a
                href="https://apps.apple.com/app/postgresgui/id6756467181"
                className="font-semibold"
              >
                Download PostgresGUI — $12.99, no subscription
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
