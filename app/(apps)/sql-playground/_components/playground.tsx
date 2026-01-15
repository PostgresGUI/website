"use client";

import { useState, useEffect } from "react";
import type { Theme } from "../_lib/types";
import { defaultQuery } from "../_lib/data";
import { SettingsDropdown } from "./settings-dropdown";
import { PlatinumTheme } from "./themes/platinum-theme";
import { AquaTheme } from "./themes/aqua-theme";

const THEME_STORAGE_KEY = "sql-playground-theme";

export function Playground() {
  const [theme, setTheme] = useState<Theme>("platinum");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "aqua" || saved === "platinum") {
      setTheme(saved);
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };
  const [query, setQuery] = useState(defaultQuery);
  const [expandedTables, setExpandedTables] = useState<string[]>(["users"]);
  const [selectedDb, setSelectedDb] = useState("ecommerce");
  const [isExecuting, setIsExecuting] = useState(false);

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) =>
      prev.includes(tableName)
        ? prev.filter((t) => t !== tableName)
        : [...prev, tableName]
    );
  };

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 800);
  };

  const sharedProps = {
    query,
    setQuery,
    expandedTables,
    toggleTable,
    selectedDb,
    setSelectedDb,
    isExecuting,
    handleRun,
  };

  const ThemeComponent = theme === "platinum" ? PlatinumTheme : AquaTheme;

  return (
    <>
      <SettingsDropdown theme={theme} setTheme={handleSetTheme} />
      <ThemeComponent {...sharedProps} />
    </>
  );
}
