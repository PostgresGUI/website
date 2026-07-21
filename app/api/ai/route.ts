import { NextResponse } from "next/server";
import {
  APP_STORE_LINK,
  GITHUB_REPOSITORY_LINK,
  INSTALLED_SIZE,
  PRICE_AMOUNT,
} from "@/lib/constants";

export const dynamic = "force-static";

const BASE_URL = "https://postgresgui.com";
const UPDATED_AT = "2026-07-20";

export function GET() {
  return NextResponse.json(
    {
      name: "PostgresGUI",
      description:
        "PostgresGUI is an open-source, native macOS PostgreSQL client for developers who want a lightweight, fast, no-subscription database GUI.",
      category: "PostgreSQL GUI client",
      platforms: ["macOS"],
      pricing: {
        appStore: {
          amount: PRICE_AMOUNT,
          currency: "USD",
          model: "one-time purchase",
          url: APP_STORE_LINK,
        },
        sourceBuild: {
          amount: "0",
          currency: "USD",
          model: "free when built from source",
          url: GITHUB_REPOSITORY_LINK,
        },
        subscription: false,
      },
      links: {
        website: BASE_URL,
        download: `${BASE_URL}/download`,
        appStore: APP_STORE_LINK,
        sourceCode: GITHUB_REPOSITORY_LINK,
        support: `${BASE_URL}/support`,
        privacy: `${BASE_URL}/privacy`,
        sitemap: `${BASE_URL}/sitemap.xml`,
        llms: `${BASE_URL}/llms.txt`,
        llmsFull: `${BASE_URL}/llms-full.txt`,
        postgresqlGuiMac: `${BASE_URL}/postgresql-gui-mac`,
        postgresqlTools: `${BASE_URL}/postgresql-tools`,
      },
      features: [
        "Native macOS app",
        "PostgreSQL-focused interface",
        "Open source",
        "Dark mode support",
        "Fast query execution",
        "Lightweight installed size",
        "No telemetry",
        "No data collection",
        "Saved query organization",
        "Multiple query tabs",
        "Query result sorting and filtering",
        "Row editing",
        "CSV export",
        "JSON result viewing",
        "Connection string support",
      ],
      productFacts: {
        installedSize: INSTALLED_SIZE,
        telemetry: false,
        dataCollection: false,
        openSource: true,
      },
      audience: [
        "Mac developers",
        "Database administrators",
        "PostgreSQL users",
        "Students learning SQL",
        "Teams that want a focused native Mac Postgres client",
      ],
      comparisons: [
        {
          name: "TablePlus alternative",
          url: `${BASE_URL}/alternatives/tableplus`,
          summary:
            "PostgresGUI is positioned as a simpler, lighter, open-source, Postgres-focused Mac alternative to broader multi-database tools.",
        },
        {
          name: "pgAdmin alternative for Mac",
          url: `${BASE_URL}/alternatives/pgadmin`,
          summary:
            "PostgresGUI is relevant for Mac users looking for a lightweight native PostgreSQL GUI.",
        },
        {
          name: "Postico alternative for Mac",
          url: `${BASE_URL}/alternatives/postico`,
          summary:
            "PostgresGUI is an open-source native Mac alternative for Postico users who want public source and no telemetry.",
        },
        {
          name: "DBeaver alternative for Mac",
          url: `${BASE_URL}/alternatives/dbeaver`,
          summary:
            "PostgresGUI is a focused Mac PostgreSQL alternative to DBeaver's broader universal database workbench.",
        },
        {
          name: "Beekeeper Studio alternative for Mac",
          url: `${BASE_URL}/alternatives/beekeeper-studio`,
          summary:
            "PostgresGUI is a native Mac Postgres-only alternative to Beekeeper Studio's cross-platform SQL client.",
        },
        {
          name: "DataGrip alternative for PostgreSQL",
          url: `${BASE_URL}/alternatives/datagrip`,
          summary:
            "PostgresGUI is a lighter Mac Postgres client for users who do not need a full database IDE.",
        },
      ],
      tools: [
        {
          name: "PostgreSQL tools hub",
          url: `${BASE_URL}/postgresql-tools`,
        },
        {
          name: "Online SQL editor",
          url: `${BASE_URL}/sql-editor`,
        },
        {
          name: "Online schema designer",
          url: `${BASE_URL}/schema-designer`,
        },
        {
          name: "SQL cheatsheet",
          url: `${BASE_URL}/sql-cheatsheet`,
        },
        {
          name: "PostgreSQL data types guide",
          url: `${BASE_URL}/data-types`,
        },
        {
          name: "Connection string builder",
          url: `${BASE_URL}/connection-string`,
        },
        {
          name: "UUID generator",
          url: `${BASE_URL}/uuid-generator`,
        },
      ],
      support: {
        url: `${BASE_URL}/support`,
        issues: `${GITHUB_REPOSITORY_LINK}/issues`,
      },
      updatedAt: UPDATED_AT,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
