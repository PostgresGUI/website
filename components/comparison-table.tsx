import { Check, X } from "lucide-react";
import { PRICE } from "@/lib/constants";

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-card border-t border-border/50 overflow-hidden shadow-lg">
        <caption className="sr-only">
          Comparison of PostgresGUI with alternative PostgreSQL clients
        </caption>
        <thead>
          <tr className="border-b border-border/30 bg-accent/50">
            <th
              scope="col"
              className="text-left p-4 font-mono text-xs uppercase tracking-wide"
            >
              Feature
            </th>
            <th
              scope="col"
              className="p-4 font-mono text-xs uppercase tracking-wide bg-stone-200 dark:bg-stone-800/20"
            >
              PostgresGUI
            </th>
            <th scope="col" className="p-4 font-mono text-xs uppercase tracking-wide">
              TablePlus
            </th>
            <th scope="col" className="p-4 font-mono text-xs uppercase tracking-wide">
              PgAdmin
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <th scope="row" className="text-left p-4 font-mono text-sm">
              Price
            </th>
            <td className="p-4 text-center bg-stone-200 dark:bg-stone-800/20">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] font-medium">
                {PRICE}
              </span>
            </td>
            <td className="p-4 text-center font-medium">
              $99/yr
            </td>
            <td className="p-4 text-center font-medium">
              Free
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Payment Model
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] font-medium">
                One-Time
              </span>
            </td>
            <td className="p-4 text-center text-red-500 dark:text-red-400 font-medium">
              Subscription
            </td>
            <td className="p-4 text-center text-muted-foreground font-medium">
              Open Source
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Platform
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] font-medium">
                Native Mac
              </span>
            </td>
            <td className="p-4 text-center text-muted-foreground font-medium">
              Electron
            </td>
            <td className="p-4 text-center text-muted-foreground font-medium">
              Electron
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Install Size
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] font-medium">
                14.6 MB
              </span>
            </td>
            <td className="p-4 text-center text-muted-foreground font-medium">
              150+ MB
            </td>
            <td className="p-4 text-center text-muted-foreground font-medium">
              250+ MB
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Open Source
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <X className="w-5 h-5 text-red-500 dark:text-red-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Dark Mode
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Query Editor
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              No Telemetry
            </th>
            <td className="p-4 text-center bg-stone-100 dark:bg-stone-800/10">
              <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            </td>
            <td className="p-4 text-center">
              <X className="w-5 h-5 text-red-500 dark:text-red-400 mx-auto" />
            </td>
            <td className="p-4 text-center text-muted-foreground font-medium">
              ?
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
