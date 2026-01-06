'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useSQLEngineContext } from './LearnProviders';
import { ResultsTable } from './ResultsTable';
import { QueryResult } from '@/lib/learn/lessons/types';
import { Play, RotateCcw, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className={cn('space-y-4', className)}>
      {/* Query Input */}
      <div className={cn(
        'rounded-xl border bg-card overflow-hidden transition-all duration-300',
        isExecuting && 'border-[var(--postgres-blue)] shadow-lg shadow-[var(--postgres-blue)]/10',
        !isExecuting && 'border-border/50 shadow-swiftui'
      )}>
        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={readOnly}
            spellCheck={false}
            className={cn(
              'w-full h-32 p-4 font-mono text-sm bg-transparent resize-none focus:outline-none',
              'placeholder:text-muted-foreground/50',
              readOnly && 'cursor-default'
            )}
          />
          {/* Line numbers decoration */}
          <div className="absolute left-0 top-0 w-8 h-full bg-muted/30 border-r border-border/20 pointer-events-none" />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/50 font-mono">
              {typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}
            </kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/50 font-mono">
              Enter
            </kbd>
            <span className="ml-1">to run</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={!query && !result}
              className="h-8 px-3 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleExecute}
              disabled={!query.trim() || engineLoading || isExecuting}
              className="h-8 px-4 text-xs"
            >
              {isExecuting ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 mr-1.5" />
              )}
              {isExecuting ? 'Running...' : 'Run Query'}
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div key={resultKey} className="animate-phase-enter">
          {result.success ? (
            <div className="space-y-3">
              {/* Success header */}
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 font-medium">Query executed successfully</span>
                {result.rowCount !== undefined && (
                  <span className="text-muted-foreground">
                    · {result.rowCount} {result.rowCount === 1 ? 'row' : 'rows'}
                    {result.columns && result.columns.length > 0 ? ' returned' : ' affected'}
                  </span>
                )}
              </div>

              {/* Results table */}
              {result.columns && result.columns.length > 0 && result.rows && (
                <ResultsTable
                  columns={result.columns}
                  rows={result.rows}
                />
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive text-sm">Query Error</p>
                <p className="text-sm text-muted-foreground mt-1 font-mono">
                  {result.error}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
