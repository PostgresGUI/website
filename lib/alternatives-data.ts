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

// ---------------------------------------------------------------------------
// DBeaver
// ---------------------------------------------------------------------------

export const dbeaverData: AlternativeData = {
  competitor: "DBeaver",
  slug: "dbeaver",
  headline: "Looking for a DBeaver Alternative for Mac?",
  highlightWord: "DBeaver",
  subheadline:
    "DBeaver is a capable universal database tool. PostgresGUI is the calmer Mac-native choice when your daily work is PostgreSQL and you do not need one app for every database engine.",
  painPointsLabel: "Common tradeoffs",
  painPointsHeadline: "Why Postgres developers look beyond a universal tool",
  painPointsDescription:
    "DBeaver Community is free and open source, and it covers a huge range of databases. That breadth is useful, but it can feel like more tool than a Mac Postgres workflow needs.",
  painPoints: [
    {
      icon: "Layers",
      title: "Built for many databases",
      description:
        "DBeaver's strength is broad database coverage. If you only use PostgreSQL, the extra connection types, drivers, panels, and preferences can add daily noise.",
      sourceNum: 1,
    },
    {
      icon: "Gauge",
      title: "Heavier desktop experience",
      description:
        "DBeaver is a cross-platform desktop workbench with a plugin-oriented architecture. It is powerful, but it does not feel like a small native Mac utility.",
    },
    {
      icon: "EyeOff",
      title: "Less Mac-native by design",
      description:
        "Cross-platform consistency means DBeaver cannot fully lean into macOS conventions, App Store updates, or Swift-native interface behavior.",
    },
    {
      icon: "AlertTriangle",
      title: "Feature discovery takes time",
      description:
        "The tool is deep. New teammates often spend time learning workbench concepts before they get to the query and table workflows they needed.",
    },
  ],
  advantagesLabel: "The focused alternative",
  advantagesHeadline: "PostgresGUI keeps the Mac workflow narrow",
  advantagesDescription:
    "PostgresGUI trades universal database breadth for a smaller, native PostgreSQL client that opens quickly and keeps common Postgres tasks close at hand.",
  advantages: [
    {
      icon: "Cpu",
      title: "Native macOS app",
      description:
        "PostgresGUI is written for Mac instead of adapted to Mac. It uses native macOS patterns for a simpler desktop feel.",
      highlight: "Native",
    },
    {
      icon: "Feather",
      title: "Lightweight footprint",
      description:
        "The app stays focused on PostgreSQL browsing, querying, editing, and export flows instead of bundling a universal database workbench.",
      highlight: "Small",
    },
    {
      icon: "Code2",
      title: "Open source",
      description:
        "Like DBeaver Community, PostgresGUI is open source. You can inspect the code, build it yourself, and file issues publicly.",
      highlight: "Open",
    },
    {
      icon: "Sparkles",
      title: "Postgres-first UI",
      description:
        "Tables, query results, JSON viewing, CSV export, and connection setup are the center of the app rather than one workflow among many engines.",
      highlight: "Focused",
    },
  ],
  comparisonLabel: "Side by side",
  comparisonHeadline: "PostgresGUI vs DBeaver",
  comparisonDescription:
    "Choose based on whether you need a universal database workbench or a native Mac PostgreSQL client.",
  comparison: [
    {
      feature: "Primary focus",
      postgresgui: { type: "text", value: "PostgreSQL on Mac", highlight: true },
      competitor: { type: "text", value: "Universal database tool" },
    },
    {
      feature: "Platform approach",
      postgresgui: { type: "text", value: "Native macOS", highlight: true },
      competitor: { type: "text", value: "Cross-platform desktop" },
    },
    {
      feature: "Open source",
      postgresgui: { type: "check" },
      competitor: { type: "check" },
    },
    {
      feature: "Free path",
      postgresgui: { type: "text", value: "Build from source", highlight: true },
      competitor: { type: "text", value: "Community Edition" },
    },
    {
      feature: "Best for",
      postgresgui: { type: "text", value: "Focused Mac Postgres work", highlight: true },
      competitor: { type: "text", value: "Many database engines" },
    },
    {
      feature: "App Store install",
      postgresgui: { type: "check" },
      competitor: { type: "x" },
    },
  ],
  whenToChooseLabel: "Honest assessment",
  whenToChooseHeadline: "Which tool is right for you?",
  whenToChooseDescription:
    "DBeaver is excellent when breadth matters. PostgresGUI is better when a focused Mac Postgres client is enough.",
  choosePostgresGuiReasons: [
    "You mostly work with PostgreSQL on macOS.",
    "You want a smaller app with a Mac-native interface.",
    "You prefer table browsing and query workflows without universal workbench complexity.",
    "You want App Store distribution while keeping source access.",
  ],
  chooseCompetitorReasons: [
    "You manage many database engines from one desktop tool.",
    "You need advanced workbench features, plugins, or broad driver support.",
    "Your team uses Windows, Linux, and macOS and wants one shared tool.",
  ],
  faqItems: [
    {
      question: "Is PostgresGUI a DBeaver replacement?",
      answer:
        "It can replace DBeaver for common PostgreSQL work on Mac: connecting, browsing tables, running queries, editing rows, viewing JSON, and exporting CSV. It is not a universal multi-database workbench.",
    },
    {
      question: "Is DBeaver free?",
      answer:
        "DBeaver Community is positioned by DBeaver as a free, open-source database management tool. DBeaver also offers paid products for professional and team workflows.",
    },
    {
      question: "Why choose PostgresGUI over DBeaver on Mac?",
      answer:
        "Choose PostgresGUI when you want a native Mac app focused on PostgreSQL rather than a broader cross-platform workbench for many databases.",
    },
    {
      question: "Can PostgresGUI manage MySQL or SQLite?",
      answer:
        "No. PostgresGUI is PostgreSQL-focused. If you need MySQL, SQLite, Oracle, SQL Server, and Postgres in one app, DBeaver is a better match.",
    },
  ],
  sources: [
    {
      num: 1,
      title: "DBeaver Community official site",
      url: "https://dbeaver.io/",
    },
    {
      num: 2,
      title: "DBeaver Community download page",
      url: "https://dbeaver.io/download/",
    },
  ],
  seo: {
    title: "DBeaver Alternative for Mac — PostgresGUI | Native PostgreSQL Client",
    description:
      "Looking for a DBeaver alternative for Mac? PostgresGUI is a native, open-source PostgreSQL client for focused Mac Postgres workflows.",
    keywords: [
      "dbeaver alternative",
      "dbeaver alternative mac",
      "dbeaver alternative postgresql",
      "dbeaver vs postgresgui",
      "postgresql gui mac",
      "postgres client mac",
      "native postgresql client mac",
      "open source postgres gui",
    ],
  },
  lastUpdatedISO: "2026-07-20",
};

// ---------------------------------------------------------------------------
// Beekeeper Studio
// ---------------------------------------------------------------------------

export const beekeeperStudioData: AlternativeData = {
  competitor: "Beekeeper Studio",
  slug: "beekeeper-studio",
  headline: "Looking for a Beekeeper Studio Alternative for Mac?",
  highlightWord: "Beekeeper Studio",
  subheadline:
    "Beekeeper Studio is a polished cross-platform SQL client. PostgresGUI is the native Mac alternative for developers who want a smaller PostgreSQL-only workflow.",
  painPointsLabel: "Common tradeoffs",
  painPointsHeadline: "Why Postgres-only Mac users compare alternatives",
  painPointsDescription:
    "Beekeeper Studio is modern and approachable, with support for many databases. The question is whether you need cross-platform breadth or a native Mac Postgres client.",
  painPoints: [
    {
      icon: "Layers",
      title: "Multi-database scope",
      description:
        "Beekeeper Studio supports MySQL, PostgreSQL, SQLite, SQL Server, and more. That is great for mixed stacks, but broader than a dedicated Postgres app.",
      sourceNum: 1,
    },
    {
      icon: "DollarSign",
      title: "Paid tiers for advanced needs",
      description:
        "Beekeeper Studio has a free Community Edition and paid Indie, Professional, and Business plans. Teams should check the current pricing before standardizing.",
      sourceNum: 2,
    },
    {
      icon: "EyeOff",
      title: "Cross-platform interface",
      description:
        "Cross-platform consistency is useful, but it usually means fewer platform-specific macOS details than a native Swift app can provide.",
    },
    {
      icon: "AlertTriangle",
      title: "Not Postgres-only",
      description:
        "When PostgreSQL is your only database, multi-engine navigation and messaging can feel less direct than a tool designed around Postgres workflows.",
    },
  ],
  advantagesLabel: "The native Mac path",
  advantagesHeadline: "A smaller Postgres client for macOS",
  advantagesDescription:
    "PostgresGUI keeps the scope tight: connect to Postgres, browse tables, run queries, edit rows, view JSON, and export data in a native Mac app.",
  advantages: [
    {
      icon: "Cpu",
      title: "Swift-native macOS app",
      description:
        "PostgresGUI is built specifically for Mac, so it can lean into platform conventions rather than matching every operating system.",
      highlight: "Mac-first",
    },
    {
      icon: "Feather",
      title: "Focused PostgreSQL workflow",
      description:
        "No engine switcher, no multi-database positioning, no broad SQL client baggage when your work is Postgres.",
      highlight: "Focused",
    },
    {
      icon: "DollarSign",
      title: "No subscription",
      description:
        "The signed Mac App Store version is a one-time purchase, and the source can be built directly from GitHub.",
      highlight: "Own it",
    },
    {
      icon: "Code2",
      title: "Open source",
      description:
        "PostgresGUI is transparent and contributor-friendly, with public source and issue tracking.",
      highlight: "Open",
    },
  ],
  comparisonLabel: "Side by side",
  comparisonHeadline: "PostgresGUI vs Beekeeper Studio",
  comparisonDescription:
    "Both are approachable database clients. The important difference is cross-platform breadth versus native Mac Postgres focus.",
  comparison: [
    {
      feature: "Primary focus",
      postgresgui: { type: "text", value: "PostgreSQL on Mac", highlight: true },
      competitor: { type: "text", value: "SQL client for many engines" },
    },
    {
      feature: "Platforms",
      postgresgui: { type: "text", value: "macOS", highlight: true },
      competitor: { type: "text", value: "Mac, Windows, Linux" },
    },
    {
      feature: "Open source",
      postgresgui: { type: "check" },
      competitor: { type: "check" },
    },
    {
      feature: "Pricing model",
      postgresgui: { type: "price", value: "$12.99", note: "one-time App Store", highlight: true },
      competitor: { type: "text", value: "Free + paid tiers" },
    },
    {
      feature: "Best for",
      postgresgui: { type: "text", value: "Native Mac Postgres work", highlight: true },
      competitor: { type: "text", value: "Mixed-database workflows" },
    },
    {
      feature: "App Store install",
      postgresgui: { type: "check" },
      competitor: { type: "x" },
    },
  ],
  whenToChooseLabel: "Honest assessment",
  whenToChooseHeadline: "Which tool is right for you?",
  whenToChooseDescription:
    "Beekeeper Studio is a strong choice for mixed stacks. PostgresGUI is a better fit when your database work is Postgres on Mac.",
  choosePostgresGuiReasons: [
    "You work on macOS and want a native desktop app.",
    "You only need PostgreSQL and prefer fewer cross-database concepts.",
    "You want a one-time App Store purchase instead of per-user paid tiers.",
    "You want a focused table browser, SQL editor, JSON viewer, and CSV export flow.",
  ],
  chooseCompetitorReasons: [
    "You need one SQL client across Mac, Windows, and Linux.",
    "You work with MySQL, SQLite, SQL Server, and PostgreSQL side by side.",
    "You prefer Beekeeper Studio's community edition or paid team features.",
  ],
  faqItems: [
    {
      question: "Is PostgresGUI a Beekeeper Studio alternative?",
      answer:
        "Yes, for Mac users whose work is primarily PostgreSQL. PostgresGUI is not a replacement if you rely on Beekeeper Studio for many database engines.",
    },
    {
      question: "Is Beekeeper Studio open source?",
      answer:
        "Beekeeper Studio describes itself as open source and offers a free Community Edition, with paid plans for additional professional and business features.",
    },
    {
      question: "Why choose PostgresGUI instead?",
      answer:
        "Choose PostgresGUI when native macOS feel, Postgres-only focus, no telemetry, and a one-time App Store purchase matter more than cross-platform database breadth.",
    },
    {
      question: "Does PostgresGUI have a free version?",
      answer:
        "The source code can be built for free from GitHub. The signed Mac App Store build is paid once and supports continued development.",
    },
  ],
  sources: [
    {
      num: 1,
      title: "Beekeeper Studio official site",
      url: "https://www.beekeeperstudio.io/",
    },
    {
      num: 2,
      title: "Beekeeper Studio pricing",
      url: "https://www.beekeeperstudio.io/pricing/",
    },
  ],
  seo: {
    title: "Beekeeper Studio Alternative for Mac — PostgresGUI",
    description:
      "Looking for a Beekeeper Studio alternative for Mac? PostgresGUI is a native, open-source PostgreSQL client with no subscription.",
    keywords: [
      "beekeeper studio alternative",
      "beekeeper studio alternative mac",
      "beekeeper studio vs postgresgui",
      "postgresql gui mac",
      "postgres client mac",
      "open source postgres gui",
      "native postgresql client mac",
    ],
  },
  lastUpdatedISO: "2026-07-20",
};

// ---------------------------------------------------------------------------
// DataGrip
// ---------------------------------------------------------------------------

export const datagripData: AlternativeData = {
  competitor: "DataGrip",
  slug: "datagrip",
  headline: "Looking for a DataGrip Alternative for PostgreSQL?",
  highlightWord: "DataGrip",
  subheadline:
    "DataGrip is a powerful database IDE. PostgresGUI is a lighter native Mac PostgreSQL client for teams that want to browse data and run queries without opening a full IDE.",
  painPointsLabel: "Common tradeoffs",
  painPointsHeadline: "Why some Postgres users want less IDE",
  painPointsDescription:
    "DataGrip is excellent when SQL intelligence, refactoring, many databases, and IDE-style workflows matter. It can be more than you need for quick Mac Postgres work.",
  painPoints: [
    {
      icon: "Layers",
      title: "Full IDE scope",
      description:
        "DataGrip is positioned by JetBrains as a powerful cross-platform IDE for relational and NoSQL databases. That depth is useful, but not every query workflow needs it.",
      sourceNum: 1,
    },
    {
      icon: "DollarSign",
      title: "Commercial licensing for work",
      description:
        "JetBrains lists DataGrip as free for non-commercial use with paid plans for commercial use. Teams should verify current licensing for their use case.",
      sourceNum: 2,
    },
    {
      icon: "Gauge",
      title: "Project and indexing overhead",
      description:
        "IDE-style tools tend to shine in larger environments, but for inspecting a table or running a quick query, that power can feel heavy.",
    },
    {
      icon: "EyeOff",
      title: "Not a native Mac utility",
      description:
        "DataGrip is cross-platform. PostgresGUI is built specifically as a Mac app for PostgreSQL work.",
    },
  ],
  advantagesLabel: "The lightweight alternative",
  advantagesHeadline: "PostgresGUI is for quick, focused Postgres work",
  advantagesDescription:
    "Use DataGrip when you need an IDE. Use PostgresGUI when you want a native Mac Postgres client that opens fast and keeps the interface simple.",
  advantages: [
    {
      icon: "Feather",
      title: "Lighter daily workflow",
      description:
        "Open the app, connect, browse, query, edit, and export. No project model required for routine Postgres work.",
      highlight: "Fast",
    },
    {
      icon: "Cpu",
      title: "Native macOS feel",
      description:
        "PostgresGUI is designed for Mac users who want a desktop client that feels at home on macOS.",
      highlight: "Native",
    },
    {
      icon: "DollarSign",
      title: "One-time purchase",
      description:
        "A small App Store purchase covers the signed build, with source available on GitHub if you prefer to build it yourself.",
      highlight: "Simple",
    },
    {
      icon: "Lock",
      title: "No telemetry",
      description:
        "PostgresGUI does not collect usage data or send your database activity anywhere.",
      highlight: "Private",
    },
  ],
  comparisonLabel: "Side by side",
  comparisonHeadline: "PostgresGUI vs DataGrip",
  comparisonDescription:
    "This is a comparison between a focused Mac PostgreSQL client and a full database IDE.",
  comparison: [
    {
      feature: "Product type",
      postgresgui: { type: "text", value: "Native Mac Postgres client", highlight: true },
      competitor: { type: "text", value: "Cross-platform database IDE" },
    },
    {
      feature: "Database scope",
      postgresgui: { type: "text", value: "PostgreSQL", highlight: true },
      competitor: { type: "text", value: "Relational + NoSQL databases" },
    },
    {
      feature: "Best for",
      postgresgui: { type: "text", value: "Browse, query, edit, export", highlight: true },
      competitor: { type: "text", value: "SQL intelligence and IDE workflows" },
    },
    {
      feature: "Pricing model",
      postgresgui: { type: "price", value: "$12.99", note: "one-time App Store", highlight: true },
      competitor: { type: "text", value: "Free non-commercial + paid plans" },
    },
    {
      feature: "Open source",
      postgresgui: { type: "check" },
      competitor: { type: "x" },
    },
    {
      feature: "Telemetry",
      postgresgui: { type: "text", value: "None", highlight: true },
      competitor: { type: "text", value: "See JetBrains settings" },
    },
  ],
  whenToChooseLabel: "Honest assessment",
  whenToChooseHeadline: "Which tool is right for you?",
  whenToChooseDescription:
    "DataGrip is the stronger IDE. PostgresGUI is the simpler native Mac Postgres client.",
  choosePostgresGuiReasons: [
    "You do not need a full SQL IDE for routine PostgreSQL work.",
    "You want native macOS feel and a small focused app.",
    "You prefer open source and no telemetry.",
    "You want a simple one-time App Store purchase for signed builds.",
  ],
  chooseCompetitorReasons: [
    "You want advanced SQL completion, refactoring, inspections, and JetBrains IDE integrations.",
    "You work with several relational and NoSQL databases.",
    "Your team already standardizes on JetBrains tools.",
  ],
  faqItems: [
    {
      question: "Is PostgresGUI a DataGrip replacement?",
      answer:
        "It replaces DataGrip for common PostgreSQL browsing, query, edit, and export workflows on Mac. It does not try to replace DataGrip's full IDE feature set.",
    },
    {
      question: "Is DataGrip free?",
      answer:
        "JetBrains describes DataGrip as free for non-commercial use and offers paid commercial plans. Always check JetBrains for current licensing details.",
    },
    {
      question: "Why choose PostgresGUI over DataGrip?",
      answer:
        "Choose PostgresGUI when you want a native, lightweight Mac app for PostgreSQL instead of a full cross-platform database IDE.",
    },
    {
      question: "Can PostgresGUI work with NoSQL databases?",
      answer:
        "No. PostgresGUI focuses on PostgreSQL. DataGrip is a better fit if you need relational and NoSQL database support in one IDE.",
    },
  ],
  sources: [
    {
      num: 1,
      title: "JetBrains DataGrip product page",
      url: "https://www.jetbrains.com/datagrip/",
    },
    {
      num: 2,
      title: "JetBrains DataGrip buy page",
      url: "https://www.jetbrains.com/datagrip/buy/",
    },
  ],
  seo: {
    title: "DataGrip Alternative for PostgreSQL — PostgresGUI",
    description:
      "Looking for a DataGrip alternative for PostgreSQL on Mac? PostgresGUI is a lightweight native Mac Postgres client with no telemetry.",
    keywords: [
      "datagrip alternative",
      "datagrip alternative mac",
      "datagrip alternative postgresql",
      "datagrip vs postgresgui",
      "postgresql gui mac",
      "postgres client mac",
      "best sql ide postgres",
      "native postgresql client mac",
    ],
  },
  lastUpdatedISO: "2026-07-20",
};
