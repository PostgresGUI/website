/**
 * Shared comparison table for competitor alternative pages. Renders a
 * `ComparisonRow[]` as a desktop table + mobile card list.
 */

import { Check, X } from "lucide-react";
import type {
  ComparisonCellValue,
  ComparisonRow,
} from "@/lib/alternatives-data";

function ComparisonCell({ value }: { value: ComparisonCellValue }) {
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
    case "text":
      return (
        <span
          className={
            value.highlight
              ? "font-medium text-foreground"
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
                ? "font-semibold text-foreground"
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

export type AlternativeComparisonProps = {
  competitor: string;
  rows: ComparisonRow[];
};

export function AlternativeComparison({
  competitor,
  rows,
}: AlternativeComparisonProps) {
  return (
    <div className="w-full">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">
            Comparison of PostgresGUI with {competitor}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="text-left p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50"
              >
                Feature
              </th>
              <th
                scope="col"
                className="p-4 text-center font-mono text-xs uppercase tracking-wider border-b border-border/50 bg-accent/30"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold">PostgresGUI</span>
                </div>
              </th>
              <th
                scope="col"
                className="p-4 text-center font-mono text-xs uppercase tracking-wider border-b border-border/50 text-muted-foreground"
              >
                {competitor}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.feature}
                className={`border-b border-border/30 ${
                  index % 2 === 0 ? "bg-transparent" : "bg-accent/20"
                }`}
              >
                <th
                  scope="row"
                  className="text-left p-4 font-medium text-sm"
                >
                  {row.feature}
                </th>
                <td className="p-4 text-center bg-accent/30">
                  <ComparisonCell value={row.postgresgui} />
                </td>
                <td className="p-4 text-center">
                  <ComparisonCell value={row.competitor} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3 p-3">
        {rows.map((row) => (
          <div
            key={row.feature}
            className="bg-card border border-border/50 rounded-xl p-4"
          >
            <div className="font-medium text-sm mb-3 text-foreground">
              {row.feature}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/30 rounded-lg p-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-foreground mb-2">
                  PostgresGUI
                </div>
                <ComparisonCell value={row.postgresgui} />
              </div>
              <div className="bg-accent/30 rounded-lg p-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  {competitor}
                </div>
                <ComparisonCell value={row.competitor} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
