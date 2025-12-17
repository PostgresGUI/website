export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg">
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
              className="p-4 font-mono text-xs uppercase tracking-wide bg-[var(--postgres-blue)] bg-opacity-10"
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
            <td className="p-4 text-center bg-[var(--postgres-blue)] bg-opacity-10">
              <span className="font-bold text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                $14.99
              </span>
              <div className="text-xs text-muted-foreground font-mono">
                one-time
              </div>
            </td>
            <td className="p-4 text-center">
              $99/yr
              <div className="text-xs text-gray-600 dark:text-gray-400">
                subscription
              </div>
            </td>
            <td className="p-4 text-center">
              Free
              <div className="text-xs text-gray-600 dark:text-gray-400">
                open source
              </div>
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Platform
            </th>
            <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-green-600 dark:text-green-400 font-semibold">
                Native Mac
              </span>
            </td>
            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
              Electron
            </td>
            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
              Electron
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Install Size
            </th>
            <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-green-600 dark:text-green-400 font-semibold">
                14.6 MB
              </span>
            </td>
            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
              150+ MB
            </td>
            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
              250+ MB
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Open Source
            </th>
            <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-red-500 dark:text-red-400 text-2xl">
                ✗
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Dark Mode
            </th>
            <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              Query Editor
            </th>
            <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
          </tr>
          <tr className="border-b border-border/30">
            <th scope="row" className="text-left p-4 font-medium">
              No Telemetry
            </th>
            <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✓
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="text-red-500 dark:text-red-400 text-2xl">
                ✗
              </span>
            </td>
            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
              ?
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
