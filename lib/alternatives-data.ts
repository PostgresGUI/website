/**
 * Data model for competitor "alternative" landing pages.
 *
 * The existing TablePlus page uses its own bespoke component + localized
 * translations. For faster iteration on new competitor pages we use this
 * shared data format instead, with the English-only `AlternativePage`
 * component. When a page is ready for full localization, migrate it to the
 * TablePlus pattern.
 */

export type ComparisonCellValue =
  | { type: "check" }
  | { type: "x" }
  | { type: "text"; value: string; highlight?: boolean }
  | { type: "price"; value: string; note?: string; highlight?: boolean };

export type ComparisonRow = {
  feature: string;
  postgresgui: ComparisonCellValue;
  competitor: ComparisonCellValue;
};

export type PainPoint = {
  // Lucide icon name — resolved in the component.
  icon: "DollarSign" | "Layers" | "Gauge" | "Lock" | "Zap" | "EyeOff" | "AlertTriangle" | "Server";
  title: string;
  description: string;
  sourceNum?: number;
};

export type Advantage = {
  icon: "Code2" | "Feather" | "DollarSign" | "Lock" | "Zap" | "Cpu" | "Layers" | "Sparkles";
  title: string;
  description: string;
  highlight: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Source = {
  num: number;
  title: string;
  url: string;
};

export type AlternativeData = {
  /** Competitor display name, e.g. "pgAdmin". */
  competitor: string;
  /** Kebab-case slug, e.g. "pgadmin". */
  slug: string;
  /** Hero H1, e.g. "Looking for a pgAdmin Alternative for Mac?". */
  headline: string;
  /** The word in the H1 to highlight with brand color. */
  highlightWord: string;
  /** Hero sub-headline. */
  subheadline: string;
  /** Section label above the pain-points grid. */
  painPointsLabel: string;
  painPointsHeadline: string;
  painPointsDescription: string;
  painPoints: PainPoint[];
  /** Section label above the advantages grid. */
  advantagesLabel: string;
  advantagesHeadline: string;
  advantagesDescription: string;
  advantages: Advantage[];
  /** Section label above the comparison table. */
  comparisonLabel: string;
  comparisonHeadline: string;
  comparisonDescription: string;
  comparison: ComparisonRow[];
  /** Honest "when to choose us / them" section. */
  whenToChooseLabel: string;
  whenToChooseHeadline: string;
  whenToChooseDescription: string;
  choosePostgresGuiReasons: string[];
  chooseCompetitorReasons: string[];
  /** FAQ items — keep 4-6 focused on the competitor comparison. */
  faqItems: FaqItem[];
  /** Sources cited in the pain-points. Use `sourceNum` on each pain point
   *  to reference them. */
  sources: Source[];
  /** Structured-data + metadata fields. */
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  /** ISO date for the "last updated" footer under the comparison. */
  lastUpdatedISO: string;
};

// ---------------------------------------------------------------------------
// pgAdmin
// ---------------------------------------------------------------------------

export const pgadminData: AlternativeData = {
  competitor: "pgAdmin",
  slug: "pgadmin",
  headline: "Looking for a pgAdmin Alternative for Mac?",
  highlightWord: "pgAdmin",
  subheadline:
    "pgAdmin is powerful but feels like a web app shoehorned into a Mac window. PostgresGUI is a native Swift app built from the ground up for macOS — faster startup, lower memory, cleaner UI.",
  painPointsLabel: "Common frustrations",
  painPointsHeadline: "Why Mac developers look for an alternative",
  painPointsDescription:
    "pgAdmin is the default and the most widely used PostgreSQL client, but on Mac it carries baggage from its web-first architecture. Here's what developers run into.",
  painPoints: [
    {
      icon: "Server",
      title: "Runs a local web server",
      description:
        "pgAdmin 4 spawns a Python/Flask server in the background and renders the UI in an embedded browser. Startup is slow and the process tree looks nothing like a native app.",
      sourceNum: 1,
    },
    {
      icon: "Zap",
      title: "Heavy memory + disk footprint",
      description:
        "A full pgAdmin install weighs several hundred megabytes, and the running process routinely consumes hundreds of MB of RAM before you open a single query tab.",
      sourceNum: 1,
    },
    {
      icon: "EyeOff",
      title: "Non-native UI on macOS",
      description:
        "Because the UI is served by a local web server and rendered in a webview, it doesn't match system font smoothing, dark-mode transitions, or native keyboard shortcuts.",
    },
    {
      icon: "Layers",
      title: "Setup friction on a fresh Mac",
      description:
        "Installing pgAdmin on macOS often involves pkg installers, Python dependencies, or Homebrew formulas. New team members lose time before their first query runs.",
    },
  ],
  advantagesLabel: "The alternative",
  advantagesHeadline: "Built for Mac, not ported to it",
  advantagesDescription:
    "PostgresGUI is written in Swift and SwiftUI, distributed through the Mac App Store, and starts instantly. You get a focused Postgres client without the operational baggage.",
  advantages: [
    {
      icon: "Cpu",
      title: "Native Swift, no web server",
      description:
        "PostgresGUI is a native macOS binary. No embedded Python, no local HTTP server, no webview — just Swift talking to Postgres over libpq.",
      highlight: "Native",
    },
    {
      icon: "Feather",
      title: "Tiny install, instant startup",
      description:
        "A few megabytes installed and it launches in the time it takes pgAdmin to print its splash screen. Lower memory pressure, fewer spinning beachballs.",
      highlight: "Lightweight",
    },
    {
      icon: "Sparkles",
      title: "Mac-first UX",
      description:
        "System fonts, native dark mode, standard Mac shortcuts, and a focused query-and-browse layout. It gets out of the way.",
      highlight: "Focused",
    },
    {
      icon: "Code2",
      title: "Open source",
      description:
        "Audit the code, build it yourself, or contribute back. No telemetry, no phone-home.",
      highlight: "Transparent",
    },
  ],
  comparisonLabel: "Side by side",
  comparisonHeadline: "PostgresGUI vs pgAdmin",
  comparisonDescription:
    "A quick comparison on the dimensions that matter most for day-to-day Mac development.",
  comparison: [
    {
      feature: "Architecture",
      postgresgui: { type: "text", value: "Native Swift / SwiftUI", highlight: true },
      competitor: { type: "text", value: "Python + Flask + webview" },
    },
    {
      feature: "Install size",
      postgresgui: { type: "text", value: "~3.3 MB", highlight: true },
      competitor: { type: "text", value: "Several hundred MB" },
    },
    {
      feature: "Cold startup",
      postgresgui: { type: "text", value: "Instant", highlight: true },
      competitor: { type: "text", value: "Several seconds" },
    },
    {
      feature: "Open source",
      postgresgui: { type: "check" },
      competitor: { type: "check" },
    },
    {
      feature: "Price",
      postgresgui: { type: "price", value: "$", note: "one-time", highlight: true },
      competitor: { type: "price", value: "Free" },
    },
    {
      feature: "Telemetry",
      postgresgui: { type: "text", value: "None", highlight: true },
      competitor: { type: "text", value: "Opt-out usage reporting" },
    },
  ],
  whenToChooseLabel: "Honest assessment",
  whenToChooseHeadline: "Which tool is right for you?",
  whenToChooseDescription:
    "Both tools are good at what they do. Pick the one that matches how you actually work.",
  choosePostgresGuiReasons: [
    "You work on a Mac and want a native app that feels like one.",
    "You care about cold-startup time and memory footprint.",
    "You want to run queries and browse data without extra ceremony.",
    "You want open source without a Python stack to maintain.",
  ],
  chooseCompetitorReasons: [
    "You need a full DBA toolkit with backup/restore wizards, replication dashboards, and grant management.",
    "You run on Linux or Windows and want a consistent experience across platforms.",
    "You work with multiple Postgres versions and need the deepest feature coverage of server-side tooling.",
  ],
  faqItems: [
    {
      question: "Can PostgresGUI replace pgAdmin entirely?",
      answer:
        "For most day-to-day Mac development — connecting, running queries, editing rows, exporting data — yes. For heavy server administration (complex role management, backup wizards, replication monitoring) pgAdmin still has the deeper toolkit.",
    },
    {
      question: "Is PostgresGUI also open source?",
      answer:
        "Yes. The source is on GitHub and you can build and run it yourself at no cost. The Mac App Store price pays for signed, notarized builds and automatic updates.",
    },
    {
      question: "Does it phone home or collect telemetry?",
      answer:
        "No. PostgresGUI ships with zero telemetry. All connections and queries stay local on your Mac.",
    },
    {
      question: "Does it support SSH tunnels like pgAdmin?",
      answer:
        "Yes. SSH tunneling is built into the connection dialog — host, port, username, and key or password.",
    },
    {
      question: "What macOS versions are supported?",
      answer:
        "PostgresGUI targets recent macOS releases and is optimized for Apple Silicon. See the App Store listing for the current minimum version.",
    },
  ],
  sources: [
    {
      num: 1,
      title: "pgAdmin 4 downloads (macOS)",
      url: "https://www.pgadmin.org/download/pgadmin-4-macos/",
    },
  ],
  seo: {
    title: "pgAdmin Alternative for Mac — PostgresGUI | Native PostgreSQL Client",
    description:
      "Looking for a pgAdmin alternative on Mac? PostgresGUI is a native Swift PostgreSQL client. Instant startup, tiny footprint, open source, no local web server.",
    keywords: [
      "pgadmin alternative",
      "pgadmin alternative mac",
      "pgadmin alternative macos",
      "pgadmin mac",
      "pgadmin vs postgresgui",
      "native postgresql client mac",
      "postgresql gui mac",
      "postgres client mac",
      "pgadmin slow mac",
      "pgadmin heavy mac",
    ],
  },
  lastUpdatedISO: "2026-04-10",
};

// ---------------------------------------------------------------------------
// Postico
// ---------------------------------------------------------------------------

export const posticoData: AlternativeData = {
  competitor: "Postico",
  slug: "postico",
  headline: "Looking for a Postico Alternative for Mac?",
  highlightWord: "Postico",
  subheadline:
    "Postico is a beloved native Mac Postgres client — and PostgresGUI shares the same philosophy. Here's an honest comparison so you can pick the one that fits your workflow.",
  painPointsLabel: "Things to consider",
  painPointsHeadline: "Why developers shop around",
  painPointsDescription:
    "Postico is a great app with a long history. PostgresGUI is newer and takes a few different bets. Here are the points most commonly raised when developers evaluate alternatives.",
  painPoints: [
    {
      icon: "Lock",
      title: "Closed source",
      description:
        "Postico is proprietary. You can't audit the code, build it yourself, or contribute fixes upstream.",
    },
    {
      icon: "DollarSign",
      title: "Paid license model",
      description:
        "Postico requires a paid license for its full feature set. Prices and tiers change over time — check the latest on their site.",
      sourceNum: 1,
    },
    {
      icon: "AlertTriangle",
      title: "No public roadmap",
      description:
        "Postico's release cadence and priorities are set privately. PostgresGUI's roadmap and issue tracker are on GitHub.",
    },
    {
      icon: "Layers",
      title: "Feature parity evolving",
      description:
        "Both apps are moving targets — what's missing in one today may ship next month. Always check current feature lists before switching.",
    },
  ],
  advantagesLabel: "What PostgresGUI brings",
  advantagesHeadline: "A fully open, Mac-native alternative",
  advantagesDescription:
    "If you're choosing between two native Mac Postgres clients, here's where PostgresGUI leans in.",
  advantages: [
    {
      icon: "Code2",
      title: "Open source end to end",
      description:
        "The full source is on GitHub. Read it, build it, fork it, or send a PR. Nothing is hidden.",
      highlight: "Open",
    },
    {
      icon: "Feather",
      title: "Tiny footprint",
      description:
        "Installs in a few megabytes and stays out of the way of everything else running on your Mac.",
      highlight: "Lightweight",
    },
    {
      icon: "DollarSign",
      title: "One-time purchase",
      description:
        "Pay once on the Mac App Store, use it forever. No subscription, no device cap to manage manually.",
      highlight: "Own it",
    },
    {
      icon: "Lock",
      title: "No telemetry",
      description:
        "PostgresGUI collects nothing. Your queries and connection strings stay on your machine.",
      highlight: "Private",
    },
  ],
  comparisonLabel: "Side by side",
  comparisonHeadline: "PostgresGUI vs Postico",
  comparisonDescription:
    "Both are native Mac apps, so the differences come down to licensing, pricing, and philosophy.",
  comparison: [
    {
      feature: "Platform",
      postgresgui: { type: "text", value: "macOS (native Swift)", highlight: true },
      competitor: { type: "text", value: "macOS (native)" },
    },
    {
      feature: "Open source",
      postgresgui: { type: "check" },
      competitor: { type: "x" },
    },
    {
      feature: "Pricing model",
      postgresgui: { type: "price", value: "$", note: "one-time", highlight: true },
      competitor: { type: "text", value: "Paid license (check vendor)" },
    },
    {
      feature: "Telemetry",
      postgresgui: { type: "text", value: "None", highlight: true },
      competitor: { type: "text", value: "Per vendor policy" },
    },
    {
      feature: "Distribution",
      postgresgui: { type: "text", value: "Mac App Store", highlight: true },
      competitor: { type: "text", value: "Direct + Mac App Store" },
    },
    {
      feature: "Public roadmap",
      postgresgui: { type: "check" },
      competitor: { type: "x" },
    },
  ],
  whenToChooseLabel: "Honest assessment",
  whenToChooseHeadline: "Which tool is right for you?",
  whenToChooseDescription:
    "Both are solid native Mac Postgres clients. The choice is mostly about how much you care about open source and pricing.",
  choosePostgresGuiReasons: [
    "You value open source and want to audit or contribute to the code.",
    "You prefer a simple one-time Mac App Store purchase over a license file.",
    "You want a public roadmap and an open issue tracker.",
    "You want to ship fixes upstream when you find something broken.",
  ],
  chooseCompetitorReasons: [
    "You've used Postico for years and are happy with its specific workflow.",
    "You rely on a particular Postico feature that PostgresGUI hasn't built yet.",
    "You prefer a vendor with a long commercial track record.",
  ],
  faqItems: [
    {
      question: "Is PostgresGUI a drop-in replacement for Postico?",
      answer:
        "For core tasks (connect, browse, query, edit rows, export) the two apps overlap heavily. Feature sets evolve; check current release notes if a specific feature is critical to you.",
    },
    {
      question: "Why would I switch if Postico works fine for me?",
      answer:
        "If Postico is working for you, stay. The main reasons to switch are: you want open source, you want to stop renewing a license, or you want a public roadmap you can influence.",
    },
    {
      question: "Does PostgresGUI support SSH tunnels?",
      answer:
        "Yes. SSH tunneling is built into the connection dialog.",
    },
    {
      question: "Can I import my Postico connections?",
      answer:
        "Not automatically today. Connection import is on the roadmap — file an issue on GitHub if you want it prioritized.",
    },
  ],
  sources: [
    {
      num: 1,
      title: "Postico (official site)",
      url: "https://eggerapps.at/postico2/",
    },
  ],
  seo: {
    title: "Postico Alternative for Mac — PostgresGUI | Open Source PostgreSQL Client",
    description:
      "Looking for a Postico alternative? PostgresGUI is a native, open-source Mac PostgreSQL client. One-time purchase, no telemetry, public roadmap.",
    keywords: [
      "postico alternative",
      "postico alternative mac",
      "postico alternative open source",
      "postico vs postgresgui",
      "native postgresql client mac",
      "postgresql gui mac",
      "postgres client mac",
      "open source postico",
    ],
  },
  lastUpdatedISO: "2026-04-10",
};
