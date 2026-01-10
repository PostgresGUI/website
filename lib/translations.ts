import { INSTALLER_SIZE, INSTALLED_SIZE, PRICE } from "@/lib/constants";

export type Locale = "en" | "de" | "fr" | "ja";

export type Translations = {
  // Hero
  hero: {
    badge: string;
    learnSql: string;
    headline: string;
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
    legal: string;
    privacyPolicy: string;
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
};

const en: Translations = {
  hero: {
    badge: "New",
    learnSql: "Learn SQL",
    headline: "The Best PostgreSQL GUI for Mac",
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
    faqHeadline: "Questions & Answers",
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
      installer: `${INSTALLER_SIZE} installer`,
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
      { title: "Welcome Screen", description: "Get started quickly with a clean, minimal interface." },
      { title: "Create DB Connection", description: "Connect to your PostgreSQL server in one click." },
      { title: "Connect Via Connection String", description: "Connect to any server using a connection string." },
      { title: "Browse Databases", description: "See your database list and click to connect." },
      { title: "Run Queries", description: "Execute SQL queries and view results in a clean table." },
      { title: "Edit Rows", description: "Edit table rows directly with inline editing." },
      { title: "Filter & Search", description: "Filter and search through your query results." },
      { title: "Sort Columns", description: "Sort your data by any column with a single click." },
      { title: "Export CSV & View JSON", description: "View results as JSON and export to CSV." },
      { title: "Multiple Tabs", description: "Work with multiple queries in separate tabs." },
      { title: "Dark Mode", description: "Easy on the eyes with full dark mode support." },
      { title: "Saved Queries", description: "Organize your queries into folders for easy access." },
    ],
    previous: "Previous",
    next: "Next",
  },
  faq: [
    {
      question: "What macOS versions are supported?",
      answer: "PostgresGUI requires macOS 26.0 or later. It's optimized for Apple Silicon but also works on Intel Macs.",
    },
    {
      question: "Do I need a subscription?",
      answer: `No. PostgresGUI is a one-time purchase. Pay ${PRICE} once and use it forever. No monthly fees, no recurring charges, no hidden costs.`,
    },
    {
      question: "Do you collect my data?",
      answer: "No. PostgresGUI does not collect any telemetry, analytics, or usage data. All your database connections and queries stay completely local on your Mac.",
    },
    {
      question: "Does PostgresGUI support other databases besides PostgreSQL?",
      answer: "No. PostgresGUI is designed specifically for PostgreSQL only. It does not support MySQL, SQLite, MongoDB, or other database systems.",
    },
    {
      question: "How does PostgresGUI compare to TablePlus?",
      answer: "TablePlus is a powerful multi-database tool with advanced features like code review, plugin systems, inline editing, advanced filters, and support for 15+ database types. PostgresGUI prioritizes simplicity and a lightweight design over many features. It offers a cleaner interface and is open source.",
    },
  ],
  cta: {
    availableNow: "Available Now",
  },
  nav: {
    features: "Features",
    screenshots: "Screenshots",
    support: "Support",
  },
  footer: {
    tagline: "Lightweight PostgreSQL client for Mac",
    product: "Product",
    features: "Features",
    screenshots: "Screenshots",
    pricing: "Pricing",
    faq: "FAQ",
    support: "Support",
    supportLink: "Support",
    githubIssues: "GitHub Issues",
    email: "Email",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "Download PostgresGUI",
    subtitle: "The best PostgreSQL GUI for Mac",
    downloadNow: "Download on the App Store",
    systemRequirements: "System Requirements",
    macOSVersion: "macOS 26.0 or later",
    appleSilicon: "Optimized for Apple Silicon",
    intelSupport: "Also works on Intel Macs",
    appSize: `${INSTALLER_SIZE} size`,
    openSource: "Open Source",
    viewOnGitHub: "View source on GitHub",
  },
};

const de: Translations = {
  hero: {
    badge: "Neu",
    learnSql: "SQL lernen",
    headline: "Die beste PostgreSQL GUI für Mac",
    openSource: "Open Source",
    heroImageAlt: "PostgresGUI - Abfrage-Editor mit Ergebnissen",
    heroImageDarkAlt: "PostgresGUI - Abfrage-Editor mit Ergebnissen (Dunkelmodus)",
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
    faqHeadline: "Fragen & Antworten",
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
      installer: `${INSTALLER_SIZE} Installer`,
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
      { title: "Willkommensbildschirm", description: "Starte schnell mit einer sauberen, minimalen Oberfläche." },
      { title: "DB-Verbindung erstellen", description: "Verbinde dich mit einem Klick zu deinem PostgreSQL-Server." },
      { title: "Per Connection-String verbinden", description: "Verbinde dich mit jedem Server per Connection-String." },
      { title: "Datenbanken durchsuchen", description: "Sieh deine Datenbankliste und klicke zum Verbinden." },
      { title: "Abfragen ausführen", description: "Führe SQL-Abfragen aus und sieh die Ergebnisse in einer übersichtlichen Tabelle." },
      { title: "Zeilen bearbeiten", description: "Bearbeite Tabellenzeilen direkt mit Inline-Bearbeitung." },
      { title: "Filtern & Suchen", description: "Filtere und durchsuche deine Abfrageergebnisse." },
      { title: "Spalten sortieren", description: "Sortiere deine Daten mit einem Klick nach jeder Spalte." },
      { title: "CSV exportieren & JSON anzeigen", description: "Ergebnisse als JSON anzeigen und als CSV exportieren." },
      { title: "Mehrere Tabs", description: "Arbeite mit mehreren Abfragen in separaten Tabs." },
      { title: "Dunkelmodus", description: "Augenschonend mit vollständiger Dunkelmodus-Unterstützung." },
      { title: "Gespeicherte Abfragen", description: "Organisiere deine Abfragen in Ordnern für einfachen Zugriff." },
    ],
    previous: "Zurück",
    next: "Weiter",
  },
  faq: [
    {
      question: "Welche macOS-Versionen werden unterstützt?",
      answer: "PostgresGUI erfordert macOS 26.0 oder neuer. Es ist für Apple Silicon optimiert, funktioniert aber auch auf Intel Macs.",
    },
    {
      question: "Brauche ich ein Abonnement?",
      answer: `Nein. PostgresGUI ist ein Einmalkauf. Zahle einmal ${PRICE} und nutze es für immer. Keine monatlichen Gebühren, keine wiederkehrenden Kosten, keine versteckten Kosten.`,
    },
    {
      question: "Sammelt ihr meine Daten?",
      answer: "Nein. PostgresGUI sammelt keine Telemetrie-, Analyse- oder Nutzungsdaten. Alle deine Datenbankverbindungen und Abfragen bleiben vollständig lokal auf deinem Mac.",
    },
    {
      question: "Unterstützt PostgresGUI andere Datenbanken außer PostgreSQL?",
      answer: "Nein. PostgresGUI ist speziell nur für PostgreSQL entwickelt. Es unterstützt weder MySQL, SQLite, MongoDB noch andere Datenbanksysteme.",
    },
    {
      question: "Wie schneidet PostgresGUI im Vergleich zu TablePlus ab?",
      answer: "TablePlus ist ein leistungsstarkes Multi-Datenbank-Tool mit erweiterten Funktionen wie Code-Review, Plugin-Systemen, Inline-Bearbeitung, erweiterten Filtern und Unterstützung für 15+ Datenbanktypen. PostgresGUI priorisiert Einfachheit und ein leichtgewichtiges Design gegenüber vielen Funktionen. Es bietet eine sauberere Oberfläche und ist Open Source.",
    },
  ],
  cta: {
    availableNow: "Jetzt verfügbar",
  },
  nav: {
    features: "Funktionen",
    screenshots: "Screenshots",
    support: "Support",
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
    legal: "Rechtliches",
    privacyPolicy: "Datenschutz",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "PostgresGUI herunterladen",
    subtitle: "Die beste PostgreSQL GUI für Mac",
    downloadNow: "Im App Store laden",
    systemRequirements: "Systemanforderungen",
    macOSVersion: "macOS 26.0 oder neuer",
    appleSilicon: "Optimiert für Apple Silicon",
    intelSupport: "Funktioniert auch auf Intel Macs",
    appSize: `${INSTALLER_SIZE} Größe`,
    openSource: "Open Source",
    viewOnGitHub: "Quellcode auf GitHub ansehen",
  },
};

const fr: Translations = {
  hero: {
    badge: "Nouveau",
    learnSql: "Apprendre SQL",
    headline: "La meilleure GUI PostgreSQL pour Mac",
    openSource: "Open Source",
    heroImageAlt: "PostgresGUI - Éditeur de requêtes avec résultats",
    heroImageDarkAlt: "PostgresGUI - Éditeur de requêtes avec résultats (Mode sombre)",
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
    faqHeadline: "Questions & Réponses",
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
      installer: `Installateur de ${INSTALLER_SIZE}`,
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
      { title: "Écran d'accueil", description: "Démarrez rapidement avec une interface épurée et minimale." },
      { title: "Créer une connexion", description: "Connectez-vous à votre serveur PostgreSQL en un clic." },
      { title: "Connexion par chaîne", description: "Connectez-vous à n'importe quel serveur via une chaîne de connexion." },
      { title: "Parcourir les bases", description: "Voyez votre liste de bases de données et cliquez pour vous connecter." },
      { title: "Exécuter des requêtes", description: "Exécutez des requêtes SQL et visualisez les résultats dans un tableau clair." },
      { title: "Modifier les lignes", description: "Modifiez les lignes de table directement avec l'édition en ligne." },
      { title: "Filtrer & Rechercher", description: "Filtrez et recherchez dans vos résultats de requête." },
      { title: "Trier les colonnes", description: "Triez vos données par n'importe quelle colonne en un clic." },
      { title: "Exporter CSV & Voir JSON", description: "Affichez les résultats en JSON et exportez en CSV." },
      { title: "Onglets multiples", description: "Travaillez avec plusieurs requêtes dans des onglets séparés." },
      { title: "Mode sombre", description: "Agréable pour les yeux avec le support complet du mode sombre." },
      { title: "Requêtes sauvegardées", description: "Organisez vos requêtes dans des dossiers pour un accès facile." },
    ],
    previous: "Précédent",
    next: "Suivant",
  },
  faq: [
    {
      question: "Quelles versions de macOS sont supportées ?",
      answer: "PostgresGUI nécessite macOS 26.0 ou ultérieur. Il est optimisé pour Apple Silicon mais fonctionne aussi sur les Mac Intel.",
    },
    {
      question: "Ai-je besoin d'un abonnement ?",
      answer: `Non. PostgresGUI est un achat unique. Payez ${PRICE} une fois et utilisez-le pour toujours. Pas de frais mensuels, pas de charges récurrentes, pas de coûts cachés.`,
    },
    {
      question: "Collectez-vous mes données ?",
      answer: "Non. PostgresGUI ne collecte aucune télémétrie, analyse ou donnée d'utilisation. Toutes vos connexions et requêtes de base de données restent entièrement locales sur votre Mac.",
    },
    {
      question: "PostgresGUI supporte-t-il d'autres bases de données que PostgreSQL ?",
      answer: "Non. PostgresGUI est conçu spécifiquement pour PostgreSQL uniquement. Il ne supporte pas MySQL, SQLite, MongoDB ou d'autres systèmes de base de données.",
    },
    {
      question: "Comment PostgresGUI se compare-t-il à TablePlus ?",
      answer: "TablePlus est un outil multi-base de données puissant avec des fonctionnalités avancées comme la revue de code, les systèmes de plugins, l'édition en ligne, les filtres avancés et le support de plus de 15 types de bases de données. PostgresGUI privilégie la simplicité et un design léger plutôt que de nombreuses fonctionnalités. Il offre une interface plus épurée et est open source.",
    },
  ],
  cta: {
    availableNow: "Disponible maintenant",
  },
  nav: {
    features: "Fonctionnalités",
    screenshots: "Captures",
    support: "Support",
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
    legal: "Mentions légales",
    privacyPolicy: "Politique de confidentialité",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "Télécharger PostgresGUI",
    subtitle: "La meilleure GUI PostgreSQL pour Mac",
    downloadNow: "Télécharger sur l'App Store",
    systemRequirements: "Configuration requise",
    macOSVersion: "macOS 26.0 ou ultérieur",
    appleSilicon: "Optimisé pour Apple Silicon",
    intelSupport: "Fonctionne aussi sur Mac Intel",
    appSize: `${INSTALLER_SIZE} taille`,
    openSource: "Open Source",
    viewOnGitHub: "Voir le code source sur GitHub",
  },
};

const ja: Translations = {
  hero: {
    badge: "新着",
    learnSql: "SQLを学ぶ",
    headline: "Mac向け最高のPostgreSQL GUI",
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
    faqHeadline: "質問と回答",
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
      installer: `${INSTALLER_SIZE}のインストーラ`,
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
      { title: "ウェルカム画面", description: "クリーンでミニマルなインターフェースですぐに開始。" },
      { title: "DB接続を作成", description: "ワンクリックでPostgreSQLサーバーに接続。" },
      { title: "接続文字列で接続", description: "接続文字列を使用して任意のサーバーに接続。" },
      { title: "データベースを閲覧", description: "データベース一覧を表示してクリックで接続。" },
      { title: "クエリを実行", description: "SQLクエリを実行し、きれいなテーブルで結果を表示。" },
      { title: "行を編集", description: "インライン編集でテーブルの行を直接編集。" },
      { title: "フィルタ＆検索", description: "クエリ結果をフィルタリングして検索。" },
      { title: "列をソート", description: "ワンクリックで任意の列でデータをソート。" },
      { title: "CSVエクスポート＆JSON表示", description: "結果をJSONで表示し、CSVにエクスポート。" },
      { title: "複数タブ", description: "別々のタブで複数のクエリを操作。" },
      { title: "ダークモード", description: "完全なダークモードサポートで目に優しい。" },
      { title: "保存済みクエリ", description: "クエリをフォルダに整理して簡単にアクセス。" },
    ],
    previous: "前へ",
    next: "次へ",
  },
  faq: [
    {
      question: "対応しているmacOSのバージョンは？",
      answer: "PostgresGUIはmacOS 26.0以降が必要です。Apple Silicon向けに最適化されていますが、Intel Macでも動作します。",
    },
    {
      question: "サブスクリプションは必要ですか？",
      answer: `いいえ。PostgresGUIは買い切り型です。${PRICE}を一度支払えば永久に使えます。月額料金、継続課金、隠れたコストは一切ありません。`,
    },
    {
      question: "データを収集していますか？",
      answer: "いいえ。PostgresGUIはテレメトリ、アナリティクス、使用状況データを一切収集しません。データベース接続やクエリはすべてMac上にローカル保存されます。",
    },
    {
      question: "PostgreSQL以外のデータベースに対応していますか？",
      answer: "いいえ。PostgresGUIはPostgreSQL専用に設計されています。MySQL、SQLite、MongoDBなど他のデータベースシステムには対応していません。",
    },
    {
      question: "TablePlusと比べてどうですか？",
      answer: "TablePlusはコードレビュー、プラグインシステム、インライン編集、高度なフィルタ、15種類以上のデータベースサポートなど、高度な機能を備えた強力なマルチデータベースツールです。PostgresGUIは多機能よりもシンプルさと軽量設計を優先しています。よりクリーンなインターフェースを提供し、オープンソースです。",
    },
  ],
  cta: {
    availableNow: "今すぐ入手可能",
  },
  nav: {
    features: "機能",
    screenshots: "スクリーンショット",
    support: "サポート",
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
    legal: "法的情報",
    privacyPolicy: "プライバシーポリシー",
    copyright: "2025 PostgresGUI",
  },
  download: {
    title: "PostgresGUIをダウンロード",
    subtitle: "Mac向け最高のPostgreSQL GUI",
    downloadNow: "App Storeでダウンロード",
    systemRequirements: "システム要件",
    macOSVersion: "macOS 26.0以降",
    appleSilicon: "Apple Silicon向けに最適化",
    intelSupport: "Intel Macでも動作",
    appSize: `${INSTALLER_SIZE} サイズ`,
    openSource: "オープンソース",
    viewOnGitHub: "GitHubでソースを見る",
  },
};

const translations: Record<Locale, Translations> = { en, de, fr, ja };

export function getTranslations(locale: Locale = "en"): Translations {
  return translations[locale] || translations.en;
}

export function isValidLocale(locale: string): locale is Locale {
  return ["en", "de", "fr", "ja"].includes(locale);
}
