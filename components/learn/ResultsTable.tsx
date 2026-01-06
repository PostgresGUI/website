'use client';

import { cn } from '@/lib/utils';

interface ResultsTableProps {
  columns: string[];
  rows: unknown[][];
  className?: string;
  maxRows?: number;
}

export function ResultsTable({
  columns,
  rows,
  className,
  maxRows = 10
}: ResultsTableProps) {
  const displayRows = rows.slice(0, maxRows);
  const hasMore = rows.length > maxRows;

  const getRowDelayClass = (index: number) => {
    const delays = [
      'row-delay-1', 'row-delay-2', 'row-delay-3', 'row-delay-4', 'row-delay-5',
      'row-delay-6', 'row-delay-7', 'row-delay-8', 'row-delay-9', 'row-delay-10'
    ];
    return delays[Math.min(index, delays.length - 1)];
  };

  const formatValue = (value: unknown): string => {
    if (value === null) return 'NULL';
    if (value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  return (
    <div className={cn(
      'rounded-xl border border-border/50 bg-card overflow-hidden shadow-swiftui',
      className
    )}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left font-mono font-semibold text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {displayRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'animate-row hover:bg-muted/30 transition-colors',
                  getRowDelayClass(rowIndex)
                )}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      'px-4 py-2.5 font-mono text-sm',
                      cell === null && 'text-muted-foreground italic'
                    )}
                  >
                    {formatValue(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with more indicator */}
      {hasMore && (
        <div className="px-4 py-2 border-t border-border/30 bg-muted/20 text-xs text-muted-foreground text-center">
          Showing {maxRows} of {rows.length} rows
        </div>
      )}
    </div>
  );
}
