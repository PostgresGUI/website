'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSQLEngineContext } from './LearnProviders';
import { ChevronDown, ChevronRight, Table2, Key, Hash, Type, ToggleLeft } from 'lucide-react';

interface SchemaExplorerProps {
  className?: string;
}

export function SchemaExplorer({ className }: SchemaExplorerProps) {
  const { schema } = useSQLEngineContext();
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => {
      const next = new Set(prev);
      if (next.has(tableName)) {
        next.delete(tableName);
      } else {
        next.add(tableName);
      }
      return next;
    });
  };

  const getTypeIcon = (type: string) => {
    const t = type.toUpperCase();
    if (t.includes('INT')) return <Hash className="w-3 h-3" />;
    if (t.includes('TEXT') || t.includes('VARCHAR') || t.includes('CHAR')) return <Type className="w-3 h-3" />;
    if (t.includes('BOOL')) return <ToggleLeft className="w-3 h-3" />;
    return <Type className="w-3 h-3" />;
  };

  // Don't render anything if there are no tables
  if (schema.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      'rounded-xl border border-border bg-card overflow-hidden shadow-swiftui',
      className
    )}>
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Table2 className="w-4 h-4 text-[var(--postgres-blue)]" />
          Schema Explorer
        </h3>
      </div>

      <div className="p-2 max-h-64 overflow-y-auto scrollbar-hide">
        {schema.map((table) => {
          const isExpanded = expandedTables.has(table.name);

          return (
            <div key={table.name} className="animate-row">
              {/* Table row */}
              <button
                onClick={() => toggleTable(table.name)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                <Table2 className="w-3.5 h-3.5 text-[var(--postgres-blue)]" />
                <span className="font-mono text-sm font-medium flex-1">{table.name}</span>
                <span className="text-xs text-muted-foreground">
                  {table.rowCount} {table.rowCount === 1 ? 'row' : 'rows'}
                </span>
              </button>

              {/* Columns */}
              {isExpanded && (
                <div className="ml-5 pl-3 border-l border-border my-1 space-y-0.5">
                  {table.columns.map((col) => (
                    <div
                      key={col.name}
                      className="flex items-center gap-2 px-2 py-1 rounded-md text-xs"
                    >
                      <span className="text-muted-foreground">
                        {getTypeIcon(col.type)}
                      </span>
                      <span className="font-mono">{col.name}</span>
                      <span className="text-muted-foreground uppercase text-[10px]">
                        {col.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
