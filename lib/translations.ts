import { INSTALLED_SIZE, PRICE } from "@/lib/constants";

export type Locale = "en" | "uk" | "de" | "fr" | "ja";

export type Translations = {
  // Hero
  hero: {
    badge: string;
    learnSql: string;
    headline: string;
    subheadline: string;
    openSource: string;
    heroImageAlt: string;
    heroImageDarkAlt: string;
  };
  // Images
  images: {
    logoAlt: string;
    screenshotAlts: string[];
  };
  // Sections
  sections: {
    features: string;
    whyPostgresGUI: string;
    featuresTagline: string;
    screenshots: string;
    screenshotsHeadline: string;
    faq: string;
    faqHeadline: string;
  };
  // Highlights/Features
  highlights: {
    openSource: { title: string; description: string; linkText: string };
    native: { title: string; line1: string; line2: string };
    lightweight: { title: string; installer: string; installed: string };
    noSubscription: { title: string; description: string };
    noDataCollection: { title: string; description: string };
    minimalisticUI: { title: string; description: string };
  };
  // Screenshots
  screenshots: {
    items: Array<{ title: string; description: string }>;
    previous: string;
    next: string;
  };
  // FAQ
  faq: Array<{ question: string; answer: string }>;
  // CTA
  cta: {
    availableNow: string;
  };
  // Navigation
  nav: {
    features: string;
    screenshots: string;
    support: string;
    download: string;
  };
  // Footer
  footer: {
    tagline: string;
    product: string;
    features: string;
    screenshots: string;
    pricing: string;
    faq: string;
    support: string;
    supportLink: string;
    githubIssues: string;
    email: string;
    compare: string;
    tablePlusAlternative: string;
    legal: string;
    privacyPolicy: string;
    license: string;
    copyright: string;
  };
  // Download page
  download: {
    title: string;
    subtitle: string;
    downloadNow: string;
    systemRequirements: string;
    macOSVersion: string;
    appleSilicon: string;
    intelSupport: string;
    appSize: string;
    openSource: string;
    viewOnGitHub: string;
  };
  // TablePlus Alternative page
  tablePlusAlternative: {
    breadcrumb: string;
    headline: string;
    highlightWord: string; // The word "Alternative" in each language to highlight
    subheadline: string;
    viewSourceOnGitHub: string;
    commonFrustrations: string;
    whyDevelopersSearch: string;
    whyDevelopersSearchDescription: string;
    painPoints: {
      highCost: { title: string; description: string };
      tabLimit: { title: string; description: string };
      closedSource: { title: string; description: string };
      largerFootprint: { title: string; description: string };
    };
    theAlternative: string;
    builtDifferent: string;
    builtDifferentDescription: string;
    advantages: {
      openSource: { title: string; description: string; highlight: string };
      lightweight: { title: string; description: string; highlight: string };
      oneTimePurchase: { title: string; description: string; highlight: string };
      privacyFirst: { title: string; description: string; highlight: string };
    };
    sideBySide: string;
    comparisonTitle: string;
    comparisonDescription: string;
    sources: string;
    honestAssessment: string;
    whichToolIsRight: string;
    whichToolIsRightDescription: string;
    choosePostgresGUIIf: string;
    recommended: string;
    choosePostgresGUIReasons: string[];
    chooseTablePlusIf: string;
    chooseTablePlusReasons: string[];
    faq: string;
    commonQuestions: string;
    faqItems: Array<{ question: string; answer: string }>;
    comparison: {
      feature: string;
      price: string;
      updates: string;
      size: string;
      oneTime: string;
      perDevice: string;
      freeForever: string;
      yearlyRenewal: string;
    };
  };
};

const en: Translations = {
  hero: {
    badge: "New",
    learnSql: "Learn SQL",
    headline: "The Postgres Client You'll Love",
    subheadline: "Designed and built for Mac.",
    openSource: "Open Source",
    heroImageAlt: "PostgresGUI - Query editor with results",
    heroImageDarkAlt: "PostgresGUI - Query editor with results (Dark mode)",
  },
  images: {
    logoAlt: "PostgresGUI - PostgreSQL client for Mac",
    screenshotAlts: [
      "PostgresGUI Welcome Screen",
      "PostgresGUI Create Connection Dialog",
      "PostgresGUI Connection String Input",
      "PostgresGUI Database Browser",
      "PostgresGUI Query Results Table",
      "PostgresGUI Edit Row Dialog",
      "PostgresGUI Filter and Search",
      "PostgresGUI Sort Columns",
      "PostgresGUI JSON View and CSV Export",
      "PostgresGUI Multiple Query Tabs",
      "PostgresGUI Dark Mode Interface",
      "PostgresGUI Saved Queries Folders",
    ],
  },
  sections: {
    features: "Features",
    whyPostgresGUI: "Why PostgresGUI?",
    featuresTagline: "// Fast, native PostgreSQL without the bloat",
    screenshots: "Screenshots",
    screenshotsHeadline: "Crafted for Ease of Use",
    faq: "FAQ",
    faqHeadline: "Questions? Answers.",
  },
  highlights: {
    openSource: {
      title: "Open Source",
      description: "View code on",
      linkText: "GitHub",
    },
    native: {
      title: "Native",
      line1: "Written in Swift",
      line2: "No Electron",
    },
    lightweight: {
      title: "Lightweight",
      installer: `${INSTALLED_SIZE} installer`,
      installed: `${INSTALLED_SIZE} installed`,
    },
    noSubscription: {
      title: "No Subscription",
      description: "Buy once, use forever",
    },
    noDataCollection: {
      title: "No Data Collection",
      description: "All data stays local on your Mac",
    },
    minimalisticUI: {
      title: "Minimalistic UI",
      description: "No bloated features",
    },
  },
  screenshots: {
    items: [
      {
        title: "Welcome Screen",
        description: "Get started quickly with a clean, minimal interface.",
      },
      {
        title: "Create DB Connection",
        description: "Connect to your PostgreSQL server in one click.",
      },
      {
        title: "Connect Via Connection String",
        description: "Connect to any server using a connection string.",
      },
      {
        title: "Browse Databases",
        description: "See your database list and click to connect.",
      },
      {
        title: "Run Queries",
        description: "Execute SQL queries and view results in a clean table.",
      },
      {
        title: "Edit Rows",
        description: "Edit table rows directly with inline editing.",
      },
      {
        title: "Filter & Search",
        description: "Filter and search through your query results.",
      },
      {
        title: "Sort Columns",
        description: "Sort your data by any column with a single click.",
      },
      {
        title: "Export CSV & View JSON",
        description: "View results as JSON and export to CSV.",
      },
      {
        title: "Multiple Tabs",
        description: "Work with multiple queries in separate tabs.",
      },
      {
        title: "Dark Mode",
        description: "Easy on the eyes with full dark mode support.",
      },
      {
        title: "Saved Queries",
        description: "Organize your queries into folders for easy access.",
      },
    ],
    previous: "Previous",
    next: "Next",
  },
  faq: [
    {
      question: "What macOS versions are supported?",
      answer:
        "PostgresGUI requires macOS 26.0 or later. It's optimized for Apple Silicon but also works on Intel Macs.",
    },
    {
      question: "Do I need a subscription?",
      answer: `No. PostgresGUI is a one-time purchase. Pay ${PRICE} once and use it forever. No monthly fees, no recurring charges, no hidden costs.`,
    },
    {
      question: "Do you collect my data?",
      answer:
        "No. PostgresGUI does not collect any telemetry, analytics, or usage data. All your database connections and queries stay completely local on your Mac.",
    },
    {
      question: "Does PostgresGUI support other databases besides PostgreSQL?",
      answer:
        "No. PostgresGUI is designed specifically for PostgreSQL only. It does not support MySQL, SQLite, MongoDB, or other database systems.",
    },
    {
      question: "How does PostgresGUI compare to TablePlus?",
      answer:
        "TablePlus is a powerful multi-database tool with advanced features like code review, plugin systems, inline editing, advanced filters, and support for 15+ database types. PostgresGUI prioritizes simplicity and a lightweight design over many features. It offers a cleaner interface and is open source.",
    },
    {
      question: "Does PostgresGUI have automatic query history?",
      answer:
        "Not yet. What we do have is saved queries with folder organization and search, so you can keep your frequently-used queries organized and findable. The editor also auto-saves as you type.",
    },
    {
      question: "If it's open source, can I build it myself for free?",
      answer:
        "Yes. You can clone the repository from GitHub and build/package the app yourself at no cost. The source code is fully available.",
    },
  ],
  cta: {
    availableNow: "Available Now",
  },
  nav: {
    features: "Features",
    screenshots: "Screenshots",
    support: "Support",
    download: "Download",
  },
  footer: {
    tagline: "The best Postgres client for Mac",
    product: "Product",
    features: "Features",
    screenshots: "Screenshots",
    pricing: "Pricing",
    faq: "FAQ",
    support: "Support",
    supportLink: "Support",
    githubIssues: "GitHub Issues",
    email: "Email",
    compare: "Compare",
    tablePlusAlternative: "TablePlus",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    license: "License",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "Download PostgresGUI",
    subtitle: "Best looking PostgreSQL GUI for Mac",
    downloadNow: "Download on the App Store",
    systemRequirements: "System Requirements",
    macOSVersion: "macOS 26.0 or later",
    appleSilicon: "Optimized for Apple Silicon",
    intelSupport: "Also works on Intel Macs",
    appSize: `${INSTALLED_SIZE} size`,
    openSource: "Open Source",
    viewOnGitHub: "View source on GitHub",
  },
  tablePlusAlternative: {
    breadcrumb: "TablePlus Alternative",
    headline: "Looking for a TablePlus Alternative for Mac?",
    highlightWord: "Alternative",
    subheadline:
      "PostgresGUI is a lightweight, open source PostgreSQL client built natively for Mac. No subscription, no bloat, no data collection.",
    viewSourceOnGitHub: "View Source on GitHub",
    commonFrustrations: "Common Frustrations",
    whyDevelopersSearch: "Why developers search for TablePlus alternatives",
    whyDevelopersSearchDescription:
      "TablePlus is a capable tool, but it's not the right fit for everyone. Here's what drives developers to look for alternatives.",
    painPoints: {
      highCost: {
        title: "High Cost",
        description:
          "TablePlus costs $99 per device with a $59/year renewal for updates. That adds up fast across multiple machines.",
      },
      tabLimit: {
        title: "2 Tab Limit",
        description:
          "The free version is limited to 2 tabs and 2 windows, which can feel restrictive when working with multiple queries or databases.",
      },
      closedSource: {
        title: "Closed Source",
        description:
          "Some developers prefer open source tools where they can inspect the code, and have full transparency.",
      },
      largerFootprint: {
        title: "Larger Footprint",
        description:
          "At ~140MB installed, TablePlus is over 5x the size of PostgresGUI due to multi-database support.",
      },
    },
    theAlternative: "The Alternative",
    builtDifferent: "PostgresGUI: Built different",
    builtDifferentDescription:
      "A native Mac app that does one thing well: PostgreSQL. No multi-database complexity, no Electron overhead, no subscription.",
    advantages: {
      openSource: {
        title: "Open Source",
        description: "Full source code on GitHub for full transparency and trust.",
        highlight: "github.com/postgresgui",
      },
      lightweight: {
        title: "Lightweight",
        description: `Just ${INSTALLED_SIZE}. macOS Native. SwiftUI. No Electron.`,
        highlight: "10x smaller",
      },
      oneTimePurchase: {
        title: "One-Time Purchase",
        description: `Pay ${PRICE} once. Free updates forever. No subscription.`,
        highlight: "No renewal fees",
      },
      privacyFirst: {
        title: "Privacy First",
        description:
          "Zero telemetry, zero analytics. Your data never leaves your Mac.",
        highlight: "No data collection",
      },
    },
    sideBySide: "Side by Side",
    comparisonTitle: "PostgresGUI vs TablePlus",
    comparisonDescription:
      "A transparent comparison to help you make the right choice for your workflow.",
    sources: "Sources",
    honestAssessment: "Honest Assessment",
    whichToolIsRight: "Which tool is right for you?",
    whichToolIsRightDescription:
      "Different tools for different needs. Here's an honest look at when each option makes sense.",
    choosePostgresGUIIf: "Choose PostgresGUI if...",
    recommended: "Recommended",
    choosePostgresGUIReasons: [
      "You work primarily with PostgreSQL",
      "You use Mac as your main development machine",
      "You value open source software you can trust and audit",
      "You want a lightweight, fast tool without subscription fees",
      "You care about privacy and want zero data collection",
    ],
    chooseTablePlusIf: "Choose TablePlus if...",
    chooseTablePlusReasons: [
      "You need to work with MySQL, Redis, SQLite, MongoDB, or other databases",
      "You work primarily on Windows or Linux",
      "You need an iOS companion app for mobile access",
      "You require advanced features like ER diagrams or plugins",
    ],
    faq: "FAQ",
    commonQuestions: "Common Questions",
    faqItems: [
      {
        question: "Is PostgresGUI really free?",
        answer: `PostgresGUI is open source and the code is freely available on GitHub. The App Store version costs ${PRICE} as a one-time purchase to support development. There are no subscriptions, no renewal fees, and updates are free forever.`,
      },
      {
        question: "Can PostgresGUI connect to MySQL or other databases?",
        answer:
          "No. PostgresGUI is designed exclusively for PostgreSQL. This focus allows us to build a better, more lightweight tool without the complexity of supporting multiple database engines.",
      },
      {
        question: "Does PostgresGUI work on Windows or Linux?",
        answer:
          "PostgresGUI is a native Mac app built with Swift. It's designed exclusively for macOS. If you need cross-platform support, TablePlus or DBeaver might be better options for you.",
      },
      {
        question: "How does PostgresGUI stay so small?",
        answer: `PostgresGUI is built with native Swift and doesn't bundle a web browser engine like Electron apps do. It only includes what's needed for PostgreSQL, keeping the install size at just ${INSTALLED_SIZE}.`,
      },
    ],
    comparison: {
      feature: "Feature",
      price: "Price",
      updates: "Updates",
      size: "Size",
      oneTime: "one-time",
      perDevice: "/device",
      freeForever: "Free forever",
      yearlyRenewal: "$59/year renewal",
    },
  },
};

const de: Translations = {
  hero: {
    badge: "Neu",
    learnSql: "SQL lernen",
    headline: "Der Postgres-Client, den Sie lieben werden",
    subheadline: "Entwickelt und gebaut für Mac.",
    openSource: "Open Source",
    heroImageAlt: "PostgresGUI - Abfrage-Editor mit Ergebnissen",
    heroImageDarkAlt:
      "PostgresGUI - Abfrage-Editor mit Ergebnissen (Dunkelmodus)",
  },
  images: {
    logoAlt: "PostgresGUI - PostgreSQL-Client für Mac",
    screenshotAlts: [
      "PostgresGUI Willkommensbildschirm",
      "PostgresGUI Verbindung erstellen Dialog",
      "PostgresGUI Connection-String Eingabe",
      "PostgresGUI Datenbank-Browser",
      "PostgresGUI Abfrageergebnisse Tabelle",
      "PostgresGUI Zeile bearbeiten Dialog",
      "PostgresGUI Filtern und Suchen",
      "PostgresGUI Spalten sortieren",
      "PostgresGUI JSON-Ansicht und CSV-Export",
      "PostgresGUI Mehrere Abfrage-Tabs",
      "PostgresGUI Dunkelmodus Oberfläche",
      "PostgresGUI Gespeicherte Abfragen Ordner",
    ],
  },
  sections: {
    features: "Funktionen",
    whyPostgresGUI: "Warum PostgresGUI?",
    featuresTagline: "// Schnell, nativ, ohne Ballast",
    screenshots: "Screenshots",
    screenshotsHeadline: "Entwickelt für einfache Bedienung",
    faq: "FAQ",
    faqHeadline: "Fragen? Antworten.",
  },
  highlights: {
    openSource: {
      title: "Open Source",
      description: "Code ansehen auf",
      linkText: "GitHub",
    },
    native: {
      title: "Nativ",
      line1: "In Swift geschrieben",
      line2: "Kein Electron",
    },
    lightweight: {
      title: "Leichtgewichtig",
      installer: `${INSTALLED_SIZE} Installer`,
      installed: `${INSTALLED_SIZE} installiert`,
    },
    noSubscription: {
      title: "Kein Abo",
      description: "Einmal kaufen, für immer nutzen",
    },
    noDataCollection: {
      title: "Keine Datensammlung",
      description: "Alle Daten bleiben lokal auf deinem Mac",
    },
    minimalisticUI: {
      title: "Minimalistisches UI",
      description: "Keine aufgeblähten Funktionen",
    },
  },
  screenshots: {
    items: [
      {
        title: "Willkommensbildschirm",
        description: "Starte schnell mit einer sauberen, minimalen Oberfläche.",
      },
      {
        title: "DB-Verbindung erstellen",
        description:
          "Verbinde dich mit einem Klick zu deinem PostgreSQL-Server.",
      },
      {
        title: "Per Connection-String verbinden",
        description: "Verbinde dich mit jedem Server per Connection-String.",
      },
      {
        title: "Datenbanken durchsuchen",
        description: "Sieh deine Datenbankliste und klicke zum Verbinden.",
      },
      {
        title: "Abfragen ausführen",
        description:
          "Führe SQL-Abfragen aus und sieh die Ergebnisse in einer übersichtlichen Tabelle.",
      },
      {
        title: "Zeilen bearbeiten",
        description: "Bearbeite Tabellenzeilen direkt mit Inline-Bearbeitung.",
      },
      {
        title: "Filtern & Suchen",
        description: "Filtere und durchsuche deine Abfrageergebnisse.",
      },
      {
        title: "Spalten sortieren",
        description: "Sortiere deine Daten mit einem Klick nach jeder Spalte.",
      },
      {
        title: "CSV exportieren & JSON anzeigen",
        description: "Ergebnisse als JSON anzeigen und als CSV exportieren.",
      },
      {
        title: "Mehrere Tabs",
        description: "Arbeite mit mehreren Abfragen in separaten Tabs.",
      },
      {
        title: "Dunkelmodus",
        description:
          "Augenschonend mit vollständiger Dunkelmodus-Unterstützung.",
      },
      {
        title: "Gespeicherte Abfragen",
        description:
          "Organisiere deine Abfragen in Ordnern für einfachen Zugriff.",
      },
    ],
    previous: "Zurück",
    next: "Weiter",
  },
  faq: [
    {
      question: "Welche macOS-Versionen werden unterstützt?",
      answer:
        "PostgresGUI erfordert macOS 26.0 oder neuer. Es ist für Apple Silicon optimiert, funktioniert aber auch auf Intel Macs.",
    },
    {
      question: "Brauche ich ein Abonnement?",
      answer: `Nein. PostgresGUI ist ein Einmalkauf. Zahle einmal ${PRICE} und nutze es für immer. Keine monatlichen Gebühren, keine wiederkehrenden Kosten, keine versteckten Kosten.`,
    },
    {
      question: "Sammelt ihr meine Daten?",
      answer:
        "Nein. PostgresGUI sammelt keine Telemetrie-, Analyse- oder Nutzungsdaten. Alle deine Datenbankverbindungen und Abfragen bleiben vollständig lokal auf deinem Mac.",
    },
    {
      question: "Unterstützt PostgresGUI andere Datenbanken außer PostgreSQL?",
      answer:
        "Nein. PostgresGUI ist speziell nur für PostgreSQL entwickelt. Es unterstützt weder MySQL, SQLite, MongoDB noch andere Datenbanksysteme.",
    },
    {
      question: "Wie schneidet PostgresGUI im Vergleich zu TablePlus ab?",
      answer:
        "TablePlus ist ein leistungsstarkes Multi-Datenbank-Tool mit erweiterten Funktionen wie Code-Review, Plugin-Systemen, Inline-Bearbeitung, erweiterten Filtern und Unterstützung für 15+ Datenbanktypen. PostgresGUI priorisiert Einfachheit und ein leichtgewichtiges Design gegenüber vielen Funktionen. Es bietet eine sauberere Oberfläche und ist Open Source.",
    },
    {
      question: "Hat PostgresGUI eine automatische Abfrage-Historie?",
      answer:
        "Noch nicht. Was wir haben, sind gespeicherte Abfragen mit Ordnerorganisation und Suche, damit du deine häufig verwendeten Abfragen organisiert und auffindbar halten kannst. Der Editor speichert auch automatisch während du tippst.",
    },
    {
      question: "Wenn es Open Source ist, kann ich es selbst kostenlos erstellen?",
      answer:
        "Ja. Du kannst das Repository von GitHub klonen und die App selbst kostenlos erstellen/paketieren. Der Quellcode ist vollständig verfügbar.",
    },
  ],
  cta: {
    availableNow: "Jetzt verfügbar",
  },
  nav: {
    features: "Funktionen",
    screenshots: "Screenshots",
    support: "Support",
    download: "Download",
  },
  footer: {
    tagline: "Leichtgewichtiger PostgreSQL-Client für Mac",
    product: "Produkt",
    features: "Funktionen",
    screenshots: "Screenshots",
    pricing: "Preise",
    faq: "FAQ",
    support: "Support",
    supportLink: "Support",
    githubIssues: "GitHub Issues",
    email: "E-Mail",
    compare: "Vergleich",
    tablePlusAlternative: "TablePlus",
    legal: "Rechtliches",
    privacyPolicy: "Datenschutz",
    license: "Lizenz",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "PostgresGUI herunterladen",
    subtitle: "Die schönste PostgreSQL GUI für Mac",
    downloadNow: "Laden im App Store",
    systemRequirements: "Systemanforderungen",
    macOSVersion: "macOS 26.0 oder neuer",
    appleSilicon: "Optimiert für Apple Silicon",
    intelSupport: "Funktioniert auch auf Intel Macs",
    appSize: `${INSTALLED_SIZE} Größe`,
    openSource: "Open Source",
    viewOnGitHub: "Quellcode auf GitHub ansehen",
  },
  tablePlusAlternative: {
    breadcrumb: "TablePlus Alternative",
    headline: "Suchen Sie eine TablePlus Alternative für Mac?",
    highlightWord: "Alternative",
    subheadline:
      "PostgresGUI ist ein leichtgewichtiger, quelloffener PostgreSQL-Client, nativ für Mac entwickelt. Kein Abo, kein Ballast, keine Datensammlung.",
    viewSourceOnGitHub: "Quellcode auf GitHub ansehen",
    commonFrustrations: "Häufige Frustrationen",
    whyDevelopersSearch: "Warum Entwickler nach TablePlus Alternativen suchen",
    whyDevelopersSearchDescription:
      "TablePlus ist ein leistungsfähiges Tool, aber nicht für jeden geeignet. Hier sind die Gründe, warum Entwickler nach Alternativen suchen.",
    painPoints: {
      highCost: {
        title: "Hohe Kosten",
        description:
          "TablePlus kostet $99 pro Gerät mit einer jährlichen Verlängerung von $59 für Updates. Das summiert sich schnell bei mehreren Geräten.",
      },
      tabLimit: {
        title: "2-Tab-Limit",
        description:
          "Die kostenlose Version ist auf 2 Tabs und 2 Fenster beschränkt, was bei der Arbeit mit mehreren Abfragen oder Datenbanken einschränkend sein kann.",
      },
      closedSource: {
        title: "Closed Source",
        description:
          "Einige Entwickler bevorzugen Open-Source-Tools, bei denen sie den Code einsehen können und volle Transparenz haben.",
      },
      largerFootprint: {
        title: "Größerer Speicherbedarf",
        description:
          "Mit ~140MB installiert ist TablePlus mehr als 5x so groß wie PostgresGUI, bedingt durch Multi-Datenbank-Unterstützung.",
      },
    },
    theAlternative: "Die Alternative",
    builtDifferent: "PostgresGUI: Anders gebaut",
    builtDifferentDescription:
      "Eine native Mac-App, die eine Sache gut macht: PostgreSQL. Keine Multi-Datenbank-Komplexität, kein Electron-Overhead, kein Abo.",
    advantages: {
      openSource: {
        title: "Open Source",
        description: "Vollständiger Quellcode auf GitHub für volle Transparenz und Vertrauen.",
        highlight: "github.com/postgresgui",
      },
      lightweight: {
        title: "Leichtgewichtig",
        description: `Nur ${INSTALLED_SIZE}. macOS-nativ. SwiftUI. Kein Electron.`,
        highlight: "10x kleiner",
      },
      oneTimePurchase: {
        title: "Einmalkauf",
        description: `Zahle ${PRICE} einmal. Kostenlose Updates für immer. Kein Abo.`,
        highlight: "Keine Verlängerungsgebühren",
      },
      privacyFirst: {
        title: "Privatsphäre zuerst",
        description:
          "Keine Telemetrie, keine Analysen. Deine Daten verlassen niemals deinen Mac.",
        highlight: "Keine Datensammlung",
      },
    },
    sideBySide: "Seite an Seite",
    comparisonTitle: "PostgresGUI vs TablePlus",
    comparisonDescription:
      "Ein transparenter Vergleich, um dir bei der richtigen Wahl für deinen Workflow zu helfen.",
    sources: "Quellen",
    honestAssessment: "Ehrliche Bewertung",
    whichToolIsRight: "Welches Tool ist das richtige für dich?",
    whichToolIsRightDescription:
      "Verschiedene Tools für verschiedene Bedürfnisse. Hier ist ein ehrlicher Blick darauf, wann welche Option sinnvoll ist.",
    choosePostgresGUIIf: "Wähle PostgresGUI, wenn...",
    recommended: "Empfohlen",
    choosePostgresGUIReasons: [
      "Du hauptsächlich mit PostgreSQL arbeitest",
      "Du den Mac als Hauptentwicklungsmaschine nutzt",
      "Du Open-Source-Software schätzt, der du vertrauen und die du prüfen kannst",
      "Du ein leichtgewichtiges, schnelles Tool ohne Abogebühren möchtest",
      "Dir Privatsphäre wichtig ist und du keine Datensammlung möchtest",
    ],
    chooseTablePlusIf: "Wähle TablePlus, wenn...",
    chooseTablePlusReasons: [
      "Du mit MySQL, Redis, SQLite, MongoDB oder anderen Datenbanken arbeiten musst",
      "Du hauptsächlich auf Windows oder Linux arbeitest",
      "Du eine iOS-Begleit-App für mobilen Zugriff brauchst",
      "Du erweiterte Funktionen wie ER-Diagramme oder Plugins benötigst",
    ],
    faq: "FAQ",
    commonQuestions: "Häufige Fragen",
    faqItems: [
      {
        question: "Ist PostgresGUI wirklich kostenlos?",
        answer: `PostgresGUI ist Open Source und der Code ist auf GitHub frei verfügbar. Die App Store Version kostet ${PRICE} als Einmalkauf zur Unterstützung der Entwicklung. Es gibt keine Abos, keine Verlängerungsgebühren, und Updates sind für immer kostenlos.`,
      },
      {
        question: "Kann PostgresGUI sich mit MySQL oder anderen Datenbanken verbinden?",
        answer:
          "Nein. PostgresGUI ist ausschließlich für PostgreSQL konzipiert. Dieser Fokus ermöglicht es uns, ein besseres, leichtgewichtigeres Tool zu bauen, ohne die Komplexität mehrerer Datenbank-Engines.",
      },
      {
        question: "Funktioniert PostgresGUI auf Windows oder Linux?",
        answer:
          "PostgresGUI ist eine native Mac-App, gebaut mit Swift. Sie ist ausschließlich für macOS konzipiert. Wenn du plattformübergreifende Unterstützung brauchst, sind TablePlus oder DBeaver möglicherweise bessere Optionen.",
      },
      {
        question: "Wie bleibt PostgresGUI so klein?",
        answer: `PostgresGUI ist mit nativem Swift gebaut und enthält keine Web-Browser-Engine wie Electron-Apps. Es enthält nur das, was für PostgreSQL benötigt wird, und hält die Installationsgröße bei nur ${INSTALLED_SIZE}.`,
      },
    ],
    comparison: {
      feature: "Funktion",
      price: "Preis",
      updates: "Updates",
      size: "Größe",
      oneTime: "einmalig",
      perDevice: "/Gerät",
      freeForever: "Für immer kostenlos",
      yearlyRenewal: "$59/Jahr Verlängerung",
    },
  },
};

const fr: Translations = {
  hero: {
    badge: "Nouveau",
    learnSql: "Apprendre SQL",
    headline: "Le Client Postgres Que Vous Allez Adorer",
    subheadline: "Conçu et développé pour Mac.",
    openSource: "Open Source",
    heroImageAlt: "PostgresGUI - Éditeur de requêtes avec résultats",
    heroImageDarkAlt:
      "PostgresGUI - Éditeur de requêtes avec résultats (Mode sombre)",
  },
  images: {
    logoAlt: "PostgresGUI - Client PostgreSQL pour Mac",
    screenshotAlts: [
      "PostgresGUI Écran d'accueil",
      "PostgresGUI Dialogue de création de connexion",
      "PostgresGUI Saisie de chaîne de connexion",
      "PostgresGUI Navigateur de bases de données",
      "PostgresGUI Tableau des résultats de requête",
      "PostgresGUI Dialogue de modification de ligne",
      "PostgresGUI Filtrer et rechercher",
      "PostgresGUI Trier les colonnes",
      "PostgresGUI Vue JSON et export CSV",
      "PostgresGUI Onglets de requêtes multiples",
      "PostgresGUI Interface en mode sombre",
      "PostgresGUI Dossiers de requêtes sauvegardées",
    ],
  },
  sections: {
    features: "Fonctionnalités",
    whyPostgresGUI: "Pourquoi PostgresGUI ?",
    featuresTagline: "// Rapide, natif, sans superflu",
    screenshots: "Captures d'écran",
    screenshotsHeadline: "Conçu pour la simplicité",
    faq: "FAQ",
    faqHeadline: "Questions? Réponses.",
  },
  highlights: {
    openSource: {
      title: "Open Source",
      description: "Voir le code sur",
      linkText: "GitHub",
    },
    native: {
      title: "Natif",
      line1: "Écrit en Swift",
      line2: "Sans Electron",
    },
    lightweight: {
      title: "Léger",
      installer: `Installateur de ${INSTALLED_SIZE}`,
      installed: `${INSTALLED_SIZE} installé`,
    },
    noSubscription: {
      title: "Sans abonnement",
      description: "Achetez une fois, utilisez pour toujours",
    },
    noDataCollection: {
      title: "Aucune collecte de données",
      description: "Toutes les données restent sur votre Mac",
    },
    minimalisticUI: {
      title: "Interface minimaliste",
      description: "Pas de fonctionnalités superflues",
    },
  },
  screenshots: {
    items: [
      {
        title: "Écran d'accueil",
        description:
          "Démarrez rapidement avec une interface épurée et minimale.",
      },
      {
        title: "Créer une connexion",
        description: "Connectez-vous à votre serveur PostgreSQL en un clic.",
      },
      {
        title: "Connexion par chaîne",
        description:
          "Connectez-vous à n'importe quel serveur via une chaîne de connexion.",
      },
      {
        title: "Parcourir les bases",
        description:
          "Voyez votre liste de bases de données et cliquez pour vous connecter.",
      },
      {
        title: "Exécuter des requêtes",
        description:
          "Exécutez des requêtes SQL et visualisez les résultats dans un tableau clair.",
      },
      {
        title: "Modifier les lignes",
        description:
          "Modifiez les lignes de table directement avec l'édition en ligne.",
      },
      {
        title: "Filtrer & Rechercher",
        description: "Filtrez et recherchez dans vos résultats de requête.",
      },
      {
        title: "Trier les colonnes",
        description:
          "Triez vos données par n'importe quelle colonne en un clic.",
      },
      {
        title: "Exporter CSV & Voir JSON",
        description: "Affichez les résultats en JSON et exportez en CSV.",
      },
      {
        title: "Onglets multiples",
        description:
          "Travaillez avec plusieurs requêtes dans des onglets séparés.",
      },
      {
        title: "Mode sombre",
        description:
          "Agréable pour les yeux avec le support complet du mode sombre.",
      },
      {
        title: "Requêtes sauvegardées",
        description:
          "Organisez vos requêtes dans des dossiers pour un accès facile.",
      },
    ],
    previous: "Précédent",
    next: "Suivant",
  },
  faq: [
    {
      question: "Quelles versions de macOS sont supportées ?",
      answer:
        "PostgresGUI nécessite macOS 26.0 ou ultérieur. Il est optimisé pour Apple Silicon mais fonctionne aussi sur les Mac Intel.",
    },
    {
      question: "Ai-je besoin d'un abonnement ?",
      answer: `Non. PostgresGUI est un achat unique. Payez ${PRICE} une fois et utilisez-le pour toujours. Pas de frais mensuels, pas de charges récurrentes, pas de coûts cachés.`,
    },
    {
      question: "Collectez-vous mes données ?",
      answer:
        "Non. PostgresGUI ne collecte aucune télémétrie, analyse ou donnée d'utilisation. Toutes vos connexions et requêtes de base de données restent entièrement locales sur votre Mac.",
    },
    {
      question:
        "PostgresGUI supporte-t-il d'autres bases de données que PostgreSQL ?",
      answer:
        "Non. PostgresGUI est conçu spécifiquement pour PostgreSQL uniquement. Il ne supporte pas MySQL, SQLite, MongoDB ou d'autres systèmes de base de données.",
    },
    {
      question: "Comment PostgresGUI se compare-t-il à TablePlus ?",
      answer:
        "TablePlus est un outil multi-base de données puissant avec des fonctionnalités avancées comme la revue de code, les systèmes de plugins, l'édition en ligne, les filtres avancés et le support de plus de 15 types de bases de données. PostgresGUI privilégie la simplicité et un design léger plutôt que de nombreuses fonctionnalités. Il offre une interface plus épurée et est open source.",
    },
    {
      question: "PostgresGUI a-t-il un historique automatique des requêtes ?",
      answer:
        "Pas encore. Ce que nous avons, ce sont des requêtes sauvegardées avec une organisation en dossiers et une recherche, pour que vous puissiez garder vos requêtes fréquentes organisées et faciles à trouver. L'éditeur sauvegarde aussi automatiquement pendant que vous tapez.",
    },
    {
      question: "Si c'est open source, puis-je le compiler moi-même gratuitement ?",
      answer:
        "Oui. Vous pouvez cloner le dépôt depuis GitHub et compiler/empaqueter l'application vous-même sans frais. Le code source est entièrement disponible.",
    },
  ],
  cta: {
    availableNow: "Disponible maintenant",
  },
  nav: {
    features: "Fonctionnalités",
    screenshots: "Captures",
    support: "Support",
    download: "Télécharger",
  },
  footer: {
    tagline: "Client PostgreSQL léger pour Mac",
    product: "Produit",
    features: "Fonctionnalités",
    screenshots: "Captures",
    pricing: "Tarifs",
    faq: "FAQ",
    support: "Support",
    supportLink: "Support",
    githubIssues: "GitHub Issues",
    email: "E-mail",
    compare: "Comparer",
    tablePlusAlternative: "TablePlus",
    legal: "Mentions légales",
    privacyPolicy: "Politique de confidentialité",
    license: "Licence",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "Télécharger PostgresGUI",
    subtitle: "La plus belle GUI PostgreSQL pour Mac",
    downloadNow: "Télécharger dans l'App Store",
    systemRequirements: "Configuration requise",
    macOSVersion: "macOS 26.0 ou ultérieur",
    appleSilicon: "Optimisé pour Apple Silicon",
    intelSupport: "Fonctionne aussi sur Mac Intel",
    appSize: `${INSTALLED_SIZE} taille`,
    openSource: "Open Source",
    viewOnGitHub: "Voir le code source sur GitHub",
  },
  tablePlusAlternative: {
    breadcrumb: "Alternative à TablePlus",
    headline: "Vous cherchez une alternative à TablePlus pour Mac ?",
    highlightWord: "alternative",
    subheadline:
      "PostgresGUI est un client PostgreSQL léger et open source, construit nativement pour Mac. Sans abonnement, sans superflu, sans collecte de données.",
    viewSourceOnGitHub: "Voir le code source sur GitHub",
    commonFrustrations: "Frustrations courantes",
    whyDevelopersSearch: "Pourquoi les développeurs cherchent des alternatives à TablePlus",
    whyDevelopersSearchDescription:
      "TablePlus est un outil capable, mais il ne convient pas à tout le monde. Voici ce qui pousse les développeurs à chercher des alternatives.",
    painPoints: {
      highCost: {
        title: "Coût élevé",
        description:
          "TablePlus coûte $99 par appareil avec un renouvellement de $59/an pour les mises à jour. Cela s'accumule rapidement sur plusieurs machines.",
      },
      tabLimit: {
        title: "Limite de 2 onglets",
        description:
          "La version gratuite est limitée à 2 onglets et 2 fenêtres, ce qui peut être restrictif quand on travaille avec plusieurs requêtes ou bases de données.",
      },
      closedSource: {
        title: "Code fermé",
        description:
          "Certains développeurs préfèrent les outils open source où ils peuvent inspecter le code et avoir une transparence totale.",
      },
      largerFootprint: {
        title: "Empreinte plus importante",
        description:
          "Avec ~140Mo installé, TablePlus est plus de 5 fois la taille de PostgresGUI en raison du support multi-bases de données.",
      },
    },
    theAlternative: "L'alternative",
    builtDifferent: "PostgresGUI : Construit différemment",
    builtDifferentDescription:
      "Une application Mac native qui fait une chose bien : PostgreSQL. Pas de complexité multi-bases, pas de surcharge Electron, pas d'abonnement.",
    advantages: {
      openSource: {
        title: "Open Source",
        description: "Code source complet sur GitHub pour une transparence et une confiance totales.",
        highlight: "github.com/postgresgui",
      },
      lightweight: {
        title: "Léger",
        description: `Seulement ${INSTALLED_SIZE}. macOS natif. SwiftUI. Sans Electron.`,
        highlight: "10x plus petit",
      },
      oneTimePurchase: {
        title: "Achat unique",
        description: `Payez ${PRICE} une fois. Mises à jour gratuites pour toujours. Sans abonnement.`,
        highlight: "Pas de frais de renouvellement",
      },
      privacyFirst: {
        title: "Confidentialité d'abord",
        description:
          "Zéro télémétrie, zéro analyse. Vos données ne quittent jamais votre Mac.",
        highlight: "Aucune collecte de données",
      },
    },
    sideBySide: "Côte à côte",
    comparisonTitle: "PostgresGUI vs TablePlus",
    comparisonDescription:
      "Une comparaison transparente pour vous aider à faire le bon choix pour votre flux de travail.",
    sources: "Sources",
    honestAssessment: "Évaluation honnête",
    whichToolIsRight: "Quel outil vous convient ?",
    whichToolIsRightDescription:
      "Différents outils pour différents besoins. Voici un regard honnête sur quand chaque option a du sens.",
    choosePostgresGUIIf: "Choisissez PostgresGUI si...",
    recommended: "Recommandé",
    choosePostgresGUIReasons: [
      "Vous travaillez principalement avec PostgreSQL",
      "Vous utilisez Mac comme machine de développement principale",
      "Vous appréciez les logiciels open source que vous pouvez auditer",
      "Vous voulez un outil léger et rapide sans frais d'abonnement",
      "La confidentialité vous importe et vous ne voulez aucune collecte de données",
    ],
    chooseTablePlusIf: "Choisissez TablePlus si...",
    chooseTablePlusReasons: [
      "Vous devez travailler avec MySQL, Redis, SQLite, MongoDB ou d'autres bases de données",
      "Vous travaillez principalement sur Windows ou Linux",
      "Vous avez besoin d'une application iOS compagnon pour l'accès mobile",
      "Vous avez besoin de fonctionnalités avancées comme les diagrammes ER ou les plugins",
    ],
    faq: "FAQ",
    commonQuestions: "Questions fréquentes",
    faqItems: [
      {
        question: "PostgresGUI est-il vraiment gratuit ?",
        answer: `PostgresGUI est open source et le code est librement disponible sur GitHub. La version App Store coûte ${PRICE} en achat unique pour soutenir le développement. Il n'y a pas d'abonnements, pas de frais de renouvellement, et les mises à jour sont gratuites pour toujours.`,
      },
      {
        question: "PostgresGUI peut-il se connecter à MySQL ou d'autres bases de données ?",
        answer:
          "Non. PostgresGUI est conçu exclusivement pour PostgreSQL. Cette concentration nous permet de construire un outil meilleur et plus léger sans la complexité de supporter plusieurs moteurs de base de données.",
      },
      {
        question: "PostgresGUI fonctionne-t-il sur Windows ou Linux ?",
        answer:
          "PostgresGUI est une application Mac native construite avec Swift. Elle est conçue exclusivement pour macOS. Si vous avez besoin d'un support multiplateforme, TablePlus ou DBeaver pourraient être de meilleures options pour vous.",
      },
      {
        question: "Comment PostgresGUI reste-t-il si petit ?",
        answer: `PostgresGUI est construit avec Swift natif et n'inclut pas de moteur de navigateur web comme les applications Electron. Il inclut seulement ce qui est nécessaire pour PostgreSQL, gardant la taille d'installation à seulement ${INSTALLED_SIZE}.`,
      },
    ],
    comparison: {
      feature: "Fonctionnalité",
      price: "Prix",
      updates: "Mises à jour",
      size: "Taille",
      oneTime: "unique",
      perDevice: "/appareil",
      freeForever: "Gratuites pour toujours",
      yearlyRenewal: "$59/an renouvellement",
    },
  },
};

const ja: Translations = {
  hero: {
    badge: "新着",
    learnSql: "SQLを学ぶ",
    headline: "きっと好きになるPostgresクライアント",
    subheadline: "Mac専用に設計・開発。",
    openSource: "オープンソース",
    heroImageAlt: "PostgresGUI - クエリエディタと結果",
    heroImageDarkAlt: "PostgresGUI - クエリエディタと結果（ダークモード）",
  },
  images: {
    logoAlt: "PostgresGUI - Mac用PostgreSQLクライアント",
    screenshotAlts: [
      "PostgresGUI ウェルカム画面",
      "PostgresGUI 接続作成ダイアログ",
      "PostgresGUI 接続文字列入力",
      "PostgresGUI データベースブラウザ",
      "PostgresGUI クエリ結果テーブル",
      "PostgresGUI 行編集ダイアログ",
      "PostgresGUI フィルタと検索",
      "PostgresGUI 列のソート",
      "PostgresGUI JSONビューとCSVエクスポート",
      "PostgresGUI 複数クエリタブ",
      "PostgresGUI ダークモードインターフェース",
      "PostgresGUI 保存済みクエリフォルダ",
    ],
  },
  sections: {
    features: "機能",
    whyPostgresGUI: "なぜPostgresGUI？",
    featuresTagline: "// 高速、ネイティブ、無駄のないPostgreSQL",
    screenshots: "スクリーンショット",
    screenshotsHeadline: "使いやすさを追求",
    faq: "よくある質問",
    faqHeadline: "質問？回答。",
  },
  highlights: {
    openSource: {
      title: "オープンソース",
      description: "コードを見る",
      linkText: "GitHub",
    },
    native: {
      title: "ネイティブ",
      line1: "Swiftで開発",
      line2: "Electron不使用",
    },
    lightweight: {
      title: "軽量",
      installer: `${INSTALLED_SIZE}のインストーラ`,
      installed: `${INSTALLED_SIZE}インストール後`,
    },
    noSubscription: {
      title: "サブスク不要",
      description: "一度買えば永久に使える",
    },
    noDataCollection: {
      title: "データ収集なし",
      description: "すべてのデータはMacにローカル保存",
    },
    minimalisticUI: {
      title: "ミニマルなUI",
      description: "余計な機能なし",
    },
  },
  screenshots: {
    items: [
      {
        title: "ウェルカム画面",
        description: "クリーンでミニマルなインターフェースですぐに開始。",
      },
      {
        title: "DB接続を作成",
        description: "ワンクリックでPostgreSQLサーバーに接続。",
      },
      {
        title: "接続文字列で接続",
        description: "接続文字列を使用して任意のサーバーに接続。",
      },
      {
        title: "データベースを閲覧",
        description: "データベース一覧を表示してクリックで接続。",
      },
      {
        title: "クエリを実行",
        description: "SQLクエリを実行し、きれいなテーブルで結果を表示。",
      },
      {
        title: "行を編集",
        description: "インライン編集でテーブルの行を直接編集。",
      },
      {
        title: "フィルタ＆検索",
        description: "クエリ結果をフィルタリングして検索。",
      },
      {
        title: "列をソート",
        description: "ワンクリックで任意の列でデータをソート。",
      },
      {
        title: "CSVエクスポート＆JSON表示",
        description: "結果をJSONで表示し、CSVにエクスポート。",
      },
      { title: "複数タブ", description: "別々のタブで複数のクエリを操作。" },
      {
        title: "ダークモード",
        description: "完全なダークモードサポートで目に優しい。",
      },
      {
        title: "保存済みクエリ",
        description: "クエリをフォルダに整理して簡単にアクセス。",
      },
    ],
    previous: "前へ",
    next: "次へ",
  },
  faq: [
    {
      question: "対応しているmacOSのバージョンは？",
      answer:
        "PostgresGUIはmacOS 26.0以降が必要です。Apple Silicon向けに最適化されていますが、Intel Macでも動作します。",
    },
    {
      question: "サブスクリプションは必要ですか？",
      answer: `いいえ。PostgresGUIは買い切り型です。${PRICE}を一度支払えば永久に使えます。月額料金、継続課金、隠れたコストは一切ありません。`,
    },
    {
      question: "データを収集していますか？",
      answer:
        "いいえ。PostgresGUIはテレメトリ、アナリティクス、使用状況データを一切収集しません。データベース接続やクエリはすべてMac上にローカル保存されます。",
    },
    {
      question: "PostgreSQL以外のデータベースに対応していますか？",
      answer:
        "いいえ。PostgresGUIはPostgreSQL専用に設計されています。MySQL、SQLite、MongoDBなど他のデータベースシステムには対応していません。",
    },
    {
      question: "TablePlusと比べてどうですか？",
      answer:
        "TablePlusはコードレビュー、プラグインシステム、インライン編集、高度なフィルタ、15種類以上のデータベースサポートなど、高度な機能を備えた強力なマルチデータベースツールです。PostgresGUIは多機能よりもシンプルさと軽量設計を優先しています。よりクリーンなインターフェースを提供し、オープンソースです。",
    },
    {
      question: "PostgresGUIには自動クエリ履歴がありますか？",
      answer:
        "まだありません。現在あるのは、フォルダ整理と検索機能付きの保存済みクエリです。よく使うクエリを整理して見つけやすく保管できます。また、エディタは入力中に自動保存します。",
    },
    {
      question: "オープンソースなら、自分で無料でビルドできますか？",
      answer:
        "はい。GitHubからリポジトリをクローンして、自分でアプリを無料でビルド/パッケージ化できます。ソースコードは完全に公開されています。",
    },
  ],
  cta: {
    availableNow: "今すぐ入手可能",
  },
  nav: {
    features: "機能",
    screenshots: "スクリーンショット",
    support: "サポート",
    download: "ダウンロード",
  },
  footer: {
    tagline: "Mac用軽量PostgreSQLクライアント",
    product: "製品",
    features: "機能",
    screenshots: "スクリーンショット",
    pricing: "価格",
    faq: "よくある質問",
    support: "サポート",
    supportLink: "サポート",
    githubIssues: "GitHub Issues",
    email: "メール",
    compare: "比較",
    tablePlusAlternative: "TablePlus",
    legal: "法的情報",
    privacyPolicy: "プライバシーポリシー",
    license: "ライセンス",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "PostgresGUIをダウンロード",
    subtitle: "Mac向け最も美しいPostgreSQL GUI",
    downloadNow: "App Storeからダウンロード",
    systemRequirements: "システム要件",
    macOSVersion: "macOS 26.0以降",
    appleSilicon: "Apple Silicon向けに最適化",
    intelSupport: "Intel Macでも動作",
    appSize: `${INSTALLED_SIZE} サイズ`,
    openSource: "オープンソース",
    viewOnGitHub: "GitHubでソースを見る",
  },
  tablePlusAlternative: {
    breadcrumb: "TablePlusの代替",
    headline: "Mac向けTablePlusの代替をお探しですか？",
    highlightWord: "代替",
    subheadline:
      "PostgresGUIは、Mac向けにネイティブで構築された軽量でオープンソースのPostgreSQLクライアントです。サブスク不要、無駄なし、データ収集なし。",
    viewSourceOnGitHub: "GitHubでソースを見る",
    commonFrustrations: "よくある不満",
    whyDevelopersSearch: "なぜ開発者はTablePlusの代替を探すのか",
    whyDevelopersSearchDescription:
      "TablePlusは優れたツールですが、すべての人に最適というわけではありません。開発者が代替を探す理由をご紹介します。",
    painPoints: {
      highCost: {
        title: "高コスト",
        description:
          "TablePlusはデバイスあたり$99で、アップデートには年間$59の更新料がかかります。複数のマシンでは急速に費用が増加します。",
      },
      tabLimit: {
        title: "2タブ制限",
        description:
          "無料版は2タブと2ウィンドウに制限されており、複数のクエリやデータベースを扱う場合は制約を感じることがあります。",
      },
      closedSource: {
        title: "クローズドソース",
        description:
          "コードを検査でき、完全な透明性を持つオープンソースツールを好む開発者もいます。",
      },
      largerFootprint: {
        title: "大きなファイルサイズ",
        description:
          "TablePlusはインストール後約140MBで、マルチデータベースサポートのためPostgresGUIの5倍以上のサイズです。",
      },
    },
    theAlternative: "代替ソリューション",
    builtDifferent: "PostgresGUI：異なるアプローチ",
    builtDifferentDescription:
      "PostgreSQLという一つのことを上手くこなすネイティブMacアプリ。マルチデータベースの複雑さなし、Electronのオーバーヘッドなし、サブスクなし。",
    advantages: {
      openSource: {
        title: "オープンソース",
        description: "完全な透明性と信頼のために、GitHubで完全なソースコードを公開。",
        highlight: "github.com/postgresgui",
      },
      lightweight: {
        title: "軽量",
        description: `わずか${INSTALLED_SIZE}。macOSネイティブ。SwiftUI。Electron不使用。`,
        highlight: "10倍小さい",
      },
      oneTimePurchase: {
        title: "買い切り",
        description: `${PRICE}を一度だけ。アップデートは永久無料。サブスクなし。`,
        highlight: "更新料なし",
      },
      privacyFirst: {
        title: "プライバシー優先",
        description:
          "テレメトリゼロ、アナリティクスゼロ。データがMacから出ることはありません。",
        highlight: "データ収集なし",
      },
    },
    sideBySide: "並べて比較",
    comparisonTitle: "PostgresGUI vs TablePlus",
    comparisonDescription:
      "ワークフローに最適な選択をするための透明な比較。",
    sources: "出典",
    honestAssessment: "正直な評価",
    whichToolIsRight: "どちらのツールが適していますか？",
    whichToolIsRightDescription:
      "異なるニーズには異なるツール。それぞれのオプションがいつ意味を持つか、正直に見ていきます。",
    choosePostgresGUIIf: "PostgresGUIを選ぶべき場合...",
    recommended: "推奨",
    choosePostgresGUIReasons: [
      "主にPostgreSQLで作業している",
      "Macをメインの開発マシンとして使用している",
      "信頼でき、監査可能なオープンソースソフトウェアを重視している",
      "サブスク料金なしの軽量で高速なツールが欲しい",
      "プライバシーを重視し、データ収集ゼロを望んでいる",
    ],
    chooseTablePlusIf: "TablePlusを選ぶべき場合...",
    chooseTablePlusReasons: [
      "MySQL、Redis、SQLite、MongoDB、その他のデータベースで作業する必要がある",
      "主にWindowsまたはLinuxで作業している",
      "モバイルアクセス用のiOSコンパニオンアプリが必要",
      "ERダイアグラムやプラグインなどの高度な機能が必要",
    ],
    faq: "FAQ",
    commonQuestions: "よくある質問",
    faqItems: [
      {
        question: "PostgresGUIは本当に無料ですか？",
        answer: `PostgresGUIはオープンソースで、コードはGitHubで自由に利用できます。App Store版は開発をサポートするために${PRICE}の買い切りです。サブスクリプションなし、更新料なし、アップデートは永久無料です。`,
      },
      {
        question: "PostgresGUIはMySQLや他のデータベースに接続できますか？",
        answer:
          "いいえ。PostgresGUIはPostgreSQL専用に設計されています。この集中により、複数のデータベースエンジンをサポートする複雑さなしに、より良く、より軽量なツールを構築できます。",
      },
      {
        question: "PostgresGUIはWindowsやLinuxで動作しますか？",
        answer:
          "PostgresGUIはSwiftで構築されたネイティブMacアプリです。macOS専用に設計されています。クロスプラットフォームサポートが必要な場合は、TablePlusやDBeaverがより良い選択肢かもしれません。",
      },
      {
        question: "PostgresGUIはなぜこんなに小さいのですか？",
        answer: `PostgresGUIはネイティブSwiftで構築され、Electronアプリのようにウェブブラウザエンジンをバンドルしていません。PostgreSQLに必要なものだけを含んでおり、インストールサイズをわずか${INSTALLED_SIZE}に抑えています。`,
      },
    ],
    comparison: {
      feature: "機能",
      price: "価格",
      updates: "アップデート",
      size: "サイズ",
      oneTime: "買い切り",
      perDevice: "/デバイス",
      freeForever: "永久無料",
      yearlyRenewal: "$59/年 更新料",
    },
  },
};

// UK uses the same translations as EN
const uk: Translations = en;

const translations: Record<Locale, Translations> = { en, uk, de, fr, ja };

export function getTranslations(locale: Locale = "en"): Translations {
  return translations[locale] || translations.en;
}

export function isValidLocale(locale: string): locale is Locale {
  return ["en", "uk", "de", "fr", "ja"].includes(locale);
}
