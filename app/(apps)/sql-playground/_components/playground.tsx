"use client";

import { useState } from "react";
import type { Theme, ResultTab } from "../_lib/types";
import { defaultQuery } from "../_lib/data";
import { SettingsDropdown } from "./settings-dropdown";
import { PlatinumTheme } from "./themes/platinum-theme";
import { AquaTheme } from "./themes/aqua-theme";

export function Playground() {
  const [theme, setTheme] = useState<Theme>("platinum");
  const [query, setQuery] = useState(defaultQuery);
  const [activeTab, setActiveTab] = useState<ResultTab>("results");
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
      setActiveTab("results");
    }, 800);
  };

  const handleClear = () => {
    setQuery("");
  };

  const sharedProps = {
    query,
    setQuery,
    activeTab,
    setActiveTab,
    expandedTables,
    toggleTable,
    selectedDb,
    setSelectedDb,
    isExecuting,
    handleRun,
    handleClear,
  };

  const ThemeComponent = theme === "platinum" ? PlatinumTheme : AquaTheme;

  return (
    <>
      <SettingsDropdown theme={theme} setTheme={setTheme} />
      <ThemeComponent {...sharedProps} />
    </>
  );
}
