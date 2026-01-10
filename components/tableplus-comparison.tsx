"use client";

import { Check, X, Minus } from "lucide-react";
import { PRICE, INSTALLER_SIZE } from "@/lib/constants";

type ComparisonValue =
  | { type: "check" }
  | { type: "x" }
  | { type: "neutral" }
  | { type: "text"; value: string; highlight?: boolean }
  | { type: "price"; value: string; note?: string; highlight?: boolean };

type ComparisonRow = {
  feature: string;
  description?: string;
  postgresgui: ComparisonValue;
  tableplus: ComparisonValue;
};

const comparisonData: ComparisonRow[] = [
  {
    feature: "Price",
    postgresgui: { type: "price", value: PRICE, note: "one-time", highlight: true },
    tableplus: { type: "price", value: "$99", note: "/device" },
  },
  {
    feature: "Updates",
    postgresgui: { type: "text", value: "Free forever", highlight: true },
    tableplus: { type: "text", value: "$59/year renewal" },
  },
  {
    feature: "Free Version Limits",
    postgresgui: { type: "text", value: "Open source, full features", highlight: true },
    tableplus: { type: "text", value: "2 tabs, 2 windows" },
  },
  {
    feature: "App Size",
    postgresgui: { type: "text", value: INSTALLER_SIZE, highlight: true },
    tableplus: { type: "text", value: "~140 MB" },
  },
  {
    feature: "Technology",
    postgresgui: { type: "text", value: "Native Swift", highlight: true },
    tableplus: { type: "text", value: "Multi-platform" },
  },
  {
    feature: "Open Source",
    postgresgui: { type: "check" },
    tableplus: { type: "x" },
  },
  {
    feature: "Data Collection",
    postgresgui: { type: "text", value: "None", highlight: true },
    tableplus: { type: "text", value: "Unknown" },
  },
  {
    feature: "Databases Supported",
    postgresgui: { type: "text", value: "PostgreSQL" },
    tableplus: { type: "text", value: "15+ types" },
  },
  {
    feature: "Platforms",
    postgresgui: { type: "text", value: "Mac" },
    tableplus: { type: "text", value: "Mac, Windows, Linux, iOS" },
  },
  {
    feature: "Dark Mode",
    postgresgui: { type: "check" },
    tableplus: { type: "check" },
  },
  {
    feature: "Query Editor",
    postgresgui: { type: "check" },
    tableplus: { type: "check" },
  },
  {
    feature: "Inline Editing",
    postgresgui: { type: "check" },
    tableplus: { type: "check" },
  },
];

function ComparisonCell({ value }: { value: ComparisonValue }) {
  switch (value.type) {
    case "check":
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      );
    case "x":
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center">
            <X className="w-4 h-4 text-red-500 dark:text-red-400" />
          </div>
        </div>
      );
    case "neutral":
      return (
        <div className="flex items-center justify-center">
          <Minus className="w-4 h-4 text-muted-foreground" />
        </div>
      );
    case "text":
      return (
        <span
          className={
            value.highlight
              ? "font-medium text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]"
              : "text-muted-foreground"
          }
        >
          {value.value}
        </span>
      );
    case "price":
      return (
        <div className="flex flex-col items-center">
          <span
            className={
              value.highlight
                ? "font-semibold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]"
                : "font-medium"
            }
          >
            {value.value}
          </span>
          {value.note && (
            <span className="text-xs text-muted-foreground">{value.note}</span>
          )}
        </div>
      );
  }
}

export function TablePlusComparison() {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">
            Comparison of PostgresGUI with TablePlus
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-left p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50">
                Feature
              </th>
              <th
                scope="col"
                className="p-4 text-center font-mono text-xs uppercase tracking-wider border-b border-border/50 bg-[var(--postgres-blue)]/5 dark:bg-[var(--postgres-blue)]/10"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] font-semibold">
                    PostgresGUI
                  </span>
                </div>
              </th>
              <th scope="col" className="p-4 text-center font-mono text-xs uppercase tracking-wider border-b border-border/50 text-muted-foreground">
                TablePlus
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr
                key={row.feature}
                className={`border-b border-border/30 ${
                  index % 2 === 0 ? "bg-transparent" : "bg-accent/20"
                }`}
              >
                <th scope="row" className="text-left p-4 font-medium text-sm">
                  {row.feature}
                </th>
                <td className="p-4 text-center bg-[var(--postgres-blue)]/5 dark:bg-[var(--postgres-blue)]/10">
                  <ComparisonCell value={row.postgresgui} />
                </td>
                <td className="p-4 text-center">
                  <ComparisonCell value={row.tableplus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {comparisonData.map((row) => (
          <div
            key={row.feature}
            className="bg-card border border-border/50 rounded-xl p-4"
          >
            <div className="font-medium text-sm mb-3 text-foreground">
              {row.feature}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--postgres-blue)]/5 dark:bg-[var(--postgres-blue)]/10 rounded-lg p-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] mb-2">
                  PostgresGUI
                </div>
                <ComparisonCell value={row.postgresgui} />
              </div>
              <div className="bg-accent/30 rounded-lg p-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  TablePlus
                </div>
                <ComparisonCell value={row.tableplus} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
