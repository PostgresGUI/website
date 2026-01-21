"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Theme, TableSchema, QueryResults, QueryStats, RowEditInfo } from "../_lib/types";
import type { DatabaseStats } from "../_lib/db";
import { THEME_STORAGE_KEY } from "../_lib/constants";
import { defaultQuery } from "../_lib/data";
import PlaygroundDB from "../_lib/db";
import { parseEditableQuery, resultIncludesPrimaryKey } from "../_lib/utils";
import { SettingsDropdown } from "./settings-dropdown";
import { PlatinumTheme } from "./themes/platinum-theme";
import { AquaTheme } from "./themes/aqua-theme";
import { StoneTheme } from "./themes/stone-theme";
import { DesktopIcon } from "./desktop-icon";
import { FloatingWindow } from "./floating-window";

export function Playground() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [query, setQuery] = useState(defaultQuery);
  const [isAppWindowOpen, setIsAppWindowOpen] = useState(false);
  const [isCheatsheetWindowOpen, setIsCheatsheetWindowOpen] = useState(false);
  const [iconOrigin, setIconOrigin] = useState<{ x: number; y: number } | null>(null);
  const [cheatsheetIconOrigin, setCheatsheetIconOrigin] = useState<{ x: number; y: number } | null>(null);
  const [topWindow, setTopWindow] = useState<"app" | "cheatsheet">("app");
  const iconRef = useRef<HTMLDivElement>(null);
  const cheatsheetIconRef = useRef<HTMLDivElement>(null);

  const handleOpenWindow = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setIconOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsAppWindowOpen(true);
    setTopWindow("app");
  };

  const handleOpenCheatsheet = () => {
    if (cheatsheetIconRef.current) {
      const rect = cheatsheetIconRef.current.getBoundingClientRect();
      setCheatsheetIconOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsCheatsheetWindowOpen(true);
    setTopWindow("cheatsheet");
  };
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [schema, setSchema] = useState<
    { name: string; columns: { name: string; type: string }[] }[]
  >([]);
  const [results, setResults] = useState<{
    columns: string[];
    rows: Record<string, unknown>[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    rowCount: number;
    duration: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowEditInfo, setRowEditInfo] = useState<RowEditInfo | null>(null);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const [deletingRow, setDeletingRow] = useState<Record<string, unknown> | null>(null);
  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);
  const [dbStats, setDbStats] = useState<DatabaseStats | null>(null);
  const lastQueryRef = useRef<string>("");

  // Load theme from localStorage (runs before first paint due to null initial state)
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "aqua" || saved === "platinum" || saved === "stone") {
      setTheme(saved);
    } else {
      setTheme("stone"); // Default theme
    }
  }, []);

  // Initialize database and load schema
  const loadSchema = useCallback(async () => {
    try {
      const tables = await PlaygroundDB.getSchema();
      setSchema(tables);
    } catch (err) {
      console.error("Failed to load schema:", err);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const stats = await PlaygroundDB.getStats();
      setDbStats(stats);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await PlaygroundDB.init();
      await loadSchema();
      await loadStats();
      setIsLoading(false);
    };
    init();
  }, [loadSchema, loadStats]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const handleSelectTable = async (tableName: string) => {
    setSelectedTable(tableName);
    setIsExecuting(true);
    setError(null);

    const tableQuery = `SELECT * FROM ${tableName} LIMIT 100`;
    lastQueryRef.current = tableQuery;

    try {
      const result = await PlaygroundDB.query(tableQuery);
      setResults({ columns: result.columns, rows: result.rows });
      setStats({ rowCount: result.rowCount, duration: result.duration });

      // Compute row edit info for table selection (always editable with *)
      const primaryKey = await PlaygroundDB.getPrimaryKey(tableName);
      if (primaryKey && result.columns.includes(primaryKey)) {
        setRowEditInfo({
          isEditable: true,
          tableName,
          primaryKeyColumn: primaryKey,
        });
      } else {
        setRowEditInfo({
          isEditable: false,
          tableName,
          primaryKeyColumn: primaryKey,
          reason: primaryKey ? "Primary key column not in results" : "Table has no primary key",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
      setResults(null);
      setStats(null);
      setRowEditInfo(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRun = async () => {
    setIsExecuting(true);
    setError(null);
    lastQueryRef.current = query;

    try {
      const result = await PlaygroundDB.query(query);
      setResults({ columns: result.columns, rows: result.rows });
      setStats({ rowCount: result.rowCount, duration: result.duration });

      // Compute row edit info
      const editableInfo = parseEditableQuery(query);
      if (editableInfo.isEditable && editableInfo.tableName) {
        const primaryKey = await PlaygroundDB.getPrimaryKey(editableInfo.tableName);
        if (primaryKey && resultIncludesPrimaryKey(result.columns, primaryKey)) {
          setRowEditInfo({
            isEditable: true,
            tableName: editableInfo.tableName,
            primaryKeyColumn: primaryKey,
          });
        } else {
          setRowEditInfo({
            isEditable: false,
            tableName: editableInfo.tableName,
            primaryKeyColumn: primaryKey,
            reason: primaryKey
              ? `Primary key column "${primaryKey}" not included in results`
              : "Table has no primary key",
          });
        }
      } else {
        setRowEditInfo({
          isEditable: false,
          tableName: editableInfo.tableName,
          primaryKeyColumn: null,
          reason: editableInfo.reason,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
      setResults(null);
      setStats(null);
      setRowEditInfo(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    setError(null);
    setResults(null);
    setStats(null);
    setRowEditInfo(null);

    try {
      await PlaygroundDB.reset();
      await loadSchema();
      await loadStats();
      setQuery(defaultQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setIsResetting(false);
    }
  };

  // Re-run the last query to refresh results after edit/delete
  const refreshResults = async () => {
    if (!lastQueryRef.current) return;

    try {
      const result = await PlaygroundDB.query(lastQueryRef.current);
      setResults({ columns: result.columns, rows: result.rows });
      setStats({ rowCount: result.rowCount, duration: result.duration });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refresh failed");
    }
  };

  const handleEditRow = (row: Record<string, unknown>) => {
    setEditingRow(row);
  };

  const handleDeleteRow = (row: Record<string, unknown>) => {
    setDeletingRow(row);
  };

  const handleSaveEdit = async (updates: Record<string, unknown>) => {
    if (!rowEditInfo?.tableName || !rowEditInfo?.primaryKeyColumn || !editingRow) {
      throw new Error("Cannot save: missing table or primary key info");
    }

    const pkValue = editingRow[rowEditInfo.primaryKeyColumn];
    await PlaygroundDB.updateRow(
      rowEditInfo.tableName,
      rowEditInfo.primaryKeyColumn,
      pkValue,
      updates
    );

    setEditingRow(null);
    await refreshResults();
  };

  const handleConfirmDelete = async () => {
    if (!rowEditInfo?.tableName || !rowEditInfo?.primaryKeyColumn || !deletingRow) {
      throw new Error("Cannot delete: missing table or primary key info");
    }

    const pkValue = deletingRow[rowEditInfo.primaryKeyColumn];
    await PlaygroundDB.deleteRow(
      rowEditInfo.tableName,
      rowEditInfo.primaryKeyColumn,
      pkValue
    );

    setDeletingRow(null);
    await refreshResults();
  };

  // Get schema columns for the current table (for edit dialog)
  const getTableSchema = () => {
    if (!rowEditInfo?.tableName) return [];
    const table = schema.find((t) => t.name === rowEditInfo.tableName);
    return table?.columns || [];
  };

  // Create table handler
  const handleCreateTable = async (sql: string) => {
    // Execute the CREATE TABLE query
    await PlaygroundDB.query(sql);

    // Refresh schema and stats
    await loadSchema();
    await loadStats();

    // Extract table name from SQL and select it
    const match = sql.match(/CREATE\s+TABLE\s+(\w+)/i);
    if (match) {
      const newTableName = match[1];
      // Select the new table to show it in the editor
      handleSelectTable(newTableName);
    }
  };

  const sharedProps = {
    query,
    setQuery,
    isExecuting,
    handleRun,
    handleReset,
    schema,
    results,
    error,
    stats,
    isLoading,
    isResetting,
    selectedTable,
    onSelectTable: handleSelectTable,
    rowEditInfo,
    onEditRow: handleEditRow,
    onDeleteRow: handleDeleteRow,
    editingRow,
    deletingRow,
    onCloseEditDialog: () => setEditingRow(null),
    onCloseDeleteDialog: () => setDeletingRow(null),
    onSaveEdit: handleSaveEdit,
    onConfirmDelete: handleConfirmDelete,
    tableSchema: getTableSchema(),
    isCreateTableOpen,
    onOpenCreateTable: () => setIsCreateTableOpen(true),
    onCloseCreateTable: () => setIsCreateTableOpen(false),
    onCreateTable: handleCreateTable,
    dbStats,
  };

  // Don't render until theme is loaded from localStorage to prevent flash
  if (!theme) {
    return null;
  }

  const ThemeComponent =
    theme === "platinum"
      ? PlatinumTheme
      : theme === "aqua"
        ? AquaTheme
        : StoneTheme;

  return (
    <>
      <SettingsDropdown theme={theme} setTheme={handleSetTheme} />

      {/* Desktop Icons - positioned below settings */}
      <div className="fixed top-20 right-4 z-40 flex flex-col items-center gap-6">
        <div ref={iconRef}>
          <DesktopIcon
            label="postgresgui.html"
            onClick={handleOpenWindow}
            theme={theme}
          >
            <img
              src="/postgresgui-elephant.png"
              alt="postgresgui.html"
              className="w-20 h-20 object-contain scale-[1.75]"
              draggable={false}
            />
          </DesktopIcon>
        </div>
        <div ref={cheatsheetIconRef}>
          <DesktopIcon
            label="sql-cheatsheet.html"
            onClick={handleOpenCheatsheet}
            theme={theme}
          >
            <div
              className="flex flex-col items-center justify-center leading-none text-center"
              style={{ fontFamily: 'var(--font-saira-stencil), sans-serif' }}
            >
              <span className="text-[18px] text-indigo-600 tracking-tight">CHEAT</span>
              <span className="text-[18px] text-indigo-600 tracking-tight">SHEET</span>
            </div>
          </DesktopIcon>
        </div>
      </div>

      {/* Floating Browser Window - PostgresGUI */}
      {isAppWindowOpen && (
        <FloatingWindow
          title="postgresgui.html"
          src="/"
          displayUrl="file:///~/Desktop/postgresgui.html"
          onClose={() => setIsAppWindowOpen(false)}
          onFocus={() => setTopWindow("app")}
          theme={theme}
          originPoint={iconOrigin}
          zIndex={topWindow === "app" ? 101 : 100}
          isFocused={topWindow === "app"}
        />
      )}

      {/* Floating Browser Window - SQL Cheatsheet */}
      {isCheatsheetWindowOpen && (
        <FloatingWindow
          title="sql-cheatsheet.html"
          src="/sql-cheatsheet"
          displayUrl="file:///~/Desktop/sql-cheatsheet.html"
          onClose={() => setIsCheatsheetWindowOpen(false)}
          onFocus={() => setTopWindow("cheatsheet")}
          theme={theme}
          originPoint={cheatsheetIconOrigin}
          initialSize={{ width: 560, height: 700 }}
          zIndex={topWindow === "cheatsheet" ? 101 : 100}
          isFocused={topWindow === "cheatsheet"}
        />
      )}

      <ThemeComponent {...sharedProps} />
    </>
  );
}
