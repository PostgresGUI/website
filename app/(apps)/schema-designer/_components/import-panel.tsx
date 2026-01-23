"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { X, Upload, AlertCircle, AlertTriangle, Table2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SQLEditor } from "@/components/ui/sql-editor";
import type { Schema } from "../_lib/types";
import { parseSQL, convertToSchema, type ParseResult } from "../_lib/sql-parser";

type ImportMode = "replace" | "merge";

interface ImportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (schema: Schema, mode: ImportMode) => void;
  existingSchema: Schema;
  canvasOffset: { x: number; y: number };
  zoom: number;
}

export function ImportPanel({
  isOpen,
  onClose,
  onImport,
  existingSchema,
  canvasOffset,
  zoom,
}: ImportPanelProps) {
  const [sqlInput, setSqlInput] = useState("");
  const [importMode, setImportMode] = useState<ImportMode>("replace");
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [warningsExpanded, setWarningsExpanded] = useState(false);

  // Debounced parsing
  useEffect(() => {
    if (!sqlInput.trim()) {
      setParseResult(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = parseSQL(sqlInput);
      setParseResult(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [sqlInput]);

  // Convert parse result to schema
  const conversionResult = useMemo(() => {
    if (!parseResult || parseResult.tables.length === 0) {
      return null;
    }

    return convertToSchema(
      parseResult.tables,
      canvasOffset,
      zoom,
      importMode === "merge" ? existingSchema : undefined
    );
  }, [parseResult, canvasOffset, zoom, importMode, existingSchema]);

  // Combined errors and warnings
  const allErrors = useMemo(() => {
    const errors = [...(parseResult?.errors || [])];
    if (conversionResult?.errors) {
      errors.push(...conversionResult.errors);
    }
    return errors;
  }, [parseResult?.errors, conversionResult?.errors]);

  const allWarnings = parseResult?.warnings || [];

  // Can import?
  const canImport =
    parseResult &&
    parseResult.tables.length > 0 &&
    allErrors.length === 0;

  const handleImport = useCallback(() => {
    if (!conversionResult || !canImport) return;

    onImport(conversionResult.schema, importMode);
    setSqlInput("");
    setParseResult(null);
  }, [conversionResult, canImport, importMode, onImport]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Reset state when panel opens
  useEffect(() => {
    if (isOpen) {
      setSqlInput("");
      setParseResult(null);
      setImportMode("replace");
    }
  }, [isOpen]);

  const hasExistingTables = existingSchema.tables.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 dark:bg-black/40 z-40",
          "transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
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
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Import SQL
            </h2>
          </div>

          <button
            onClick={handleClose}
            className={cn(
              "p-1.5 rounded-md",
              "text-zinc-500 dark:text-zinc-400",
              "hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "hover:text-zinc-700 dark:hover:text-zinc-200",
              "transition-colors cursor-pointer"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SQL Input - Full middle section */}
        <div className="flex-1 overflow-auto bg-white dark:bg-zinc-900">
          <SQLEditor
            value={sqlInput}
            onChange={setSqlInput}
            placeholder={`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL
);`}
            className="min-h-full"
            padding={16}
            autoFocus
          />
        </div>

        {/* Status section - errors, warnings, preview, import mode */}
        {(allErrors.length > 0 || allWarnings.length > 0 || (parseResult && parseResult.tables.length > 0) || (hasExistingTables && sqlInput.trim())) && (
        <div className="space-y-3 p-4 border-t border-zinc-200 dark:border-zinc-700">
          {/* Import Mode (only show if tables exist) */}
          {hasExistingTables && sqlInput.trim() && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Mode:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setImportMode("replace")}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer",
                    importMode === "replace"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  Replace
                </button>
                <button
                  onClick={() => setImportMode("merge")}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer",
                    importMode === "merge"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  Merge
                </button>
              </div>
            </div>
          )}

          {/* Errors */}
          {allErrors.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Errors
                </span>
              </div>
              <ul className="space-y-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                {allErrors.map((error, i) => (
                  <li key={i}>
                    {error.line > 0 && (
                      <span className="font-mono text-zinc-400 dark:text-zinc-500">
                        Line {error.line}:{" "}
                      </span>
                    )}
                    {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview */}
          {parseResult && parseResult.tables.length > 0 && allErrors.length === 0 && (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Table2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Preview
                </span>
              </div>
              <ul className="space-y-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                {parseResult.tables.map((table, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{table.name}</span>
                    <span className="text-zinc-400 dark:text-zinc-500">
                      ({table.columns.length} column{table.columns.length !== 1 ? "s" : ""})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings - Collapsible */}
          {allWarnings.length > 0 && (
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setWarningsExpanded(!warningsExpanded)}
                className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>{allWarnings.length} warning{allWarnings.length !== 1 ? "s" : ""}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform",
                    warningsExpanded && "rotate-180"
                  )}
                />
              </button>
              {warningsExpanded && (
                <ul className="mt-1.5 space-y-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {allWarnings.map((warning, i) => (
                    <li key={i}>
                      {warning.line > 0 && (
                        <span className="font-mono text-zinc-400 dark:text-zinc-500">
                          Line {warning.line}:{" "}
                        </span>
                      )}
                      {warning.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        )}

        {/* Footer */}
        <div
          className={cn(
            "flex items-center justify-end gap-2 px-4 py-3",
            "border-t border-zinc-200 dark:border-zinc-700",
            "bg-zinc-50 dark:bg-zinc-800/50"
          )}
        >
          <button
            onClick={handleClose}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "bg-zinc-100 dark:bg-zinc-800",
              "text-zinc-700 dark:text-zinc-300",
              "hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "transition-colors cursor-pointer"
            )}
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!canImport}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "transition-colors",
              canImport
                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
            )}
          >
            Import
          </button>
        </div>
      </div>
    </>
  );
}
