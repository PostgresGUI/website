"use client";

import { useState, useCallback } from "react";
import { X, Copy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Schema } from "../_lib/types";
import { generateSQL } from "../_lib/sql-generator";

interface SQLPanelProps {
  schema: Schema;
  isOpen: boolean;
  onClose: () => void;
}

export function SQLPanel({ schema, isOpen, onClose }: SQLPanelProps) {
  const [copied, setCopied] = useState(false);

  const sql = generateSQL(schema);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }, [sql]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([sql], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.sql";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sql]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 dark:bg-black/40 z-40",
          "transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50",
          "w-full max-w-lg",
          "bg-white dark:bg-zinc-900",
          "border-l border-zinc-200 dark:border-zinc-700",
          "shadow-2xl dark:shadow-black/50",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3",
            "border-b border-zinc-200 dark:border-zinc-700",
            "bg-zinc-50 dark:bg-zinc-800/50"
          )}
        >
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              PostgreSQL Export
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {schema.tables.length} table{schema.tables.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium",
                "transition-all duration-200 cursor-pointer",
                copied
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium",
                "bg-zinc-100 dark:bg-zinc-800",
                "text-zinc-700 dark:text-zinc-300",
                "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                "transition-colors cursor-pointer"
              )}
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>

            <button
              onClick={onClose}
              className={cn(
                "p-1.5 rounded-md ml-1",
                "text-zinc-500 dark:text-zinc-400",
                "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                "hover:text-zinc-700 dark:hover:text-zinc-200",
                "transition-colors cursor-pointer"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SQL Content */}
        <div className="flex-1 overflow-auto p-4">
          <pre
            className={cn(
              "text-xs font-mono leading-relaxed",
              "text-zinc-800 dark:text-zinc-200",
              "whitespace-pre-wrap break-words"
            )}
          >
            <code>
              <SQLHighlight sql={sql} />
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}

function SQLHighlight({ sql }: { sql: string }) {
  // Simple SQL syntax highlighting
  const keywords = [
    "CREATE",
    "TABLE",
    "PRIMARY",
    "KEY",
    "NOT",
    "NULL",
    "UNIQUE",
    "FOREIGN",
    "REFERENCES",
    "CONSTRAINT",
  ];

  const types = [
    "SERIAL",
    "INTEGER",
    "BIGINT",
    "SMALLINT",
    "TEXT",
    "VARCHAR",
    "CHAR",
    "BOOLEAN",
    "DATE",
    "TIMESTAMP",
    "TIMESTAMPTZ",
    "TIME",
    "UUID",
    "JSON",
    "JSONB",
    "NUMERIC",
    "REAL",
    "DOUBLE",
    "PRECISION",
    "BYTEA",
  ];

  const lines = sql.split("\n");

  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="min-h-[1.4em]">
          {line.split(/(\s+|[(),;])/).map((token, j) => {
            if (keywords.includes(token.toUpperCase())) {
              return (
                <span
                  key={j}
                  className="text-blue-600 dark:text-blue-400 font-semibold"
                >
                  {token}
                </span>
              );
            }
            if (types.includes(token.toUpperCase())) {
              return (
                <span key={j} className="text-amber-600 dark:text-amber-400">
                  {token}
                </span>
              );
            }
            if (token.startsWith("--")) {
              return (
                <span key={j} className="text-zinc-400 dark:text-zinc-500 italic">
                  {token}
                </span>
              );
            }
            return <span key={j}>{token}</span>;
          })}
        </div>
      ))}
    </>
  );
}
