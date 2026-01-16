"use client";

import { useState, useEffect, useCallback } from "react";
import type { Theme, TableSchema, QueryResults, QueryStats } from "../_lib/types";
import { THEME_STORAGE_KEY } from "../_lib/constants";
import { defaultQuery } from "../_lib/data";
import PlaygroundDB from "../_lib/db";
import { SettingsDropdown } from "./settings-dropdown";
import { PlatinumTheme } from "./themes/platinum-theme";
import { AquaTheme } from "./themes/aqua-theme";
import { StoneTheme } from "./themes/stone-theme";

export function Playground() {
  const [theme, setTheme] = useState<Theme>("stone");
  const [query, setQuery] = useState(defaultQuery);
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

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "aqua" || saved === "platinum" || saved === "stone") {
      setTheme(saved);
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

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await PlaygroundDB.init();
      await loadSchema();
      setIsLoading(false);
    };
    init();
  }, [loadSchema]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const handleSelectTable = async (tableName: string) => {
    setSelectedTable(tableName);
    setIsExecuting(true);
    setError(null);

    try {
      const result = await PlaygroundDB.query(`SELECT * FROM ${tableName} LIMIT 100`);
      setResults({ columns: result.columns, rows: result.rows });
      setStats({ rowCount: result.rowCount, duration: result.duration });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
      setResults(null);
      setStats(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRun = async () => {
    setIsExecuting(true);
    setError(null);

    try {
      const result = await PlaygroundDB.query(query);
      setResults({ columns: result.columns, rows: result.rows });
      setStats({ rowCount: result.rowCount, duration: result.duration });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
      setResults(null);
      setStats(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    setError(null);
    setResults(null);
    setStats(null);

    try {
      await PlaygroundDB.reset();
      await loadSchema();
      setQuery(defaultQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setIsResetting(false);
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
  };

  const ThemeComponent =
    theme === "platinum"
      ? PlatinumTheme
      : theme === "aqua"
        ? AquaTheme
        : StoneTheme;

  return (
    <>
      <SettingsDropdown theme={theme} setTheme={handleSetTheme} />
      <ThemeComponent {...sharedProps} />
    </>
  );
}
