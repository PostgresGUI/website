'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useSQLEngineContext } from './LearnProviders';
import { ResultsTable } from './ResultsTable';
import { QueryResult } from '@/lib/learn/lessons/types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface QueryConsoleProps {
  initialQuery?: string;
  placeholder?: string;
  onQueryResult?: (result: QueryResult, query: string) => void;
  className?: string;
  readOnly?: boolean;
}

export function QueryConsole({
  initialQuery = '',
  placeholder = 'Write your SQL query here...',
  onQueryResult,
  className,
  readOnly = false
}: QueryConsoleProps) {
  const { executeQuery, isLoading: engineLoading } = useSQLEngineContext();
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [resultKey, setResultKey] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update query when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleExecute = useCallback(() => {
    if (!query.trim() || engineLoading) return;

    setIsExecuting(true);

    // Small delay for visual feedback
    setTimeout(() => {
      const queryResult = executeQuery(query);
      setResult(queryResult);
      setResultKey(prev => prev + 1);
      setIsExecuting(false);
      onQueryResult?.(queryResult, query);
    }, 150);
  }, [query, executeQuery, onQueryResult, engineLoading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  }, [handleExecute]);

  const handleReset = useCallback(() => {
    setQuery('');
    setResult(null);
    textareaRef.current?.focus();
  }, []);

  return (
    <div className={cn('rounded-xl border border-border p-3 bg-card shadow-swiftui', className)}>
      <div className="space-y-3">
        {/* Results - clean table UI (always visible) */}
        <div key={resultKey} className="overflow-hidden">
          {!result ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Run a query to see results
            </div>
          ) : result.success ? (
            <div>
              <div className="flex items-center gap-2 text-sm px-4 py-3 border-b border-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Query executed successfully</span>
                {result.rowCount !== undefined && (
                  <span className="text-muted-foreground">
                    · {result.rowCount} {result.rowCount === 1 ? 'row' : 'rows'}
                    {result.columns && result.columns.length > 0 ? ' returned' : ' affected'}
                  </span>
                )}
              </div>
              {result.columns && result.columns.length > 0 && result.rows ? (
                <ResultsTable columns={result.columns} rows={result.rows} />
              ) : (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Query completed with no results to display
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-destructive/5">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive text-sm">Query Error</p>
                <p className="text-sm text-muted-foreground mt-1 font-mono">{result.error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Editor */}
        <div className="terminal-editor rounded-lg overflow-hidden border border-[#1a1a1a]">
        <div className="bg-[#0a0a0a] relative">
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)'
          }} />

          {/* Editor area */}
          <div className="relative z-0 p-4">
            <div className="flex items-start gap-2 font-mono text-sm">
              <span className="text-[#33ff33] shrink-0 select-none" style={{ textShadow: '0 0 5px rgba(51,255,51,0.5)' }}>
                postgres=#
              </span>
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your query here..."
                readOnly={readOnly}
                spellCheck={false}
                className={cn(
                  'flex-1 bg-transparent resize-none focus:outline-none min-h-[80px] text-[#33ff33] placeholder:text-[#33ff33]/30',
                  readOnly && 'cursor-default'
                )}
                style={{ textShadow: '0 0 5px rgba(51,255,51,0.5)' }}
              />
            </div>
          </div>

          {/* Terminal action bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#2a2a2a] bg-[#0f0f0f]">
            <span className="text-xs text-[#33ff33]/80 font-mono">
              {typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}+Enter to run
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                disabled={!query && !result}
                className="px-2 py-1 text-xs font-mono text-[#33ff33] hover:text-[#66ff66] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                [CLEAR]
              </button>
              <button
                onClick={handleExecute}
                disabled={!query.trim() || engineLoading || isExecuting}
                className="px-3 py-1 text-xs font-mono text-[#0a0a0a] bg-[#33ff33] hover:bg-[#66ff66] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded"
              >
                {isExecuting ? 'RUNNING...' : 'RUN QUERY'}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
