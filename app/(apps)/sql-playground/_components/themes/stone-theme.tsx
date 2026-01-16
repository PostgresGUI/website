"use client";

import { useState } from "react";
import {
  Play,
  Table2,
  Loader2,
  RotateCcw,
  AlertCircle,
  Plus,
  Search,
  Code2,
  FileCode2,
} from "lucide-react";

import type { ThemeProps } from "../../_lib/types";
import { formatValue } from "../../_lib/utils";
import { useSavedQueries } from "../../_lib/hooks";
import { SQLEditor } from "../sql-editor";
import { QueryListItem } from "../query-list-item";
import "./stone.css";

type MobileTab = "tables" | "editor" | "queries";

export function StoneTheme({
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
  onSelectTable,
}: ThemeProps) {
  const [mobileTab, setMobileTab] = useState<MobileTab>("editor");
  const {
    savedQueries,
    selectedQueryId,
    editingQueryId,
    setEditingQueryId,
    searchTerm,
    setSearchTerm,
    filteredQueries,
    handleAddQuery,
    handleSelectQuery,
    handleRenameQuery,
    handleDeleteQuery,
    handleDuplicateQuery,
  } = useSavedQueries({ query, setQuery });

  return (
    <div className="h-screen flex flex-col">
      <div className="absolute inset-0 stone-bg" />

      <div className="relative flex-1 flex items-center justify-center p-6 max-md:p-0">
        <div className="stone-window w-full max-w-6xl h-[85vh] max-md:h-screen max-md:max-w-full flex flex-col">
          {/* Header */}
          <header className="stone-header flex items-center justify-center px-4">
            <h1
              className="text-[15px] font-semibold text-stone-900"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}
            >
              SQL Playground
            </h1>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-white relative">
            {/* Schema Explorer - Desktop sidebar, Mobile full panel */}
            <aside className={`w-60 max-md:w-full max-md:absolute max-md:inset-0 max-md:z-10 stone-sidebar flex flex-col bg-stone-50 ${mobileTab !== "tables" ? "max-md:hidden" : ""}`}>
              <div className="stone-sidebar-header px-4 py-3 pb-0">
                <span
                  className="text-[12px] font-semibold text-stone-500 uppercase tracking-wider"
                  style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                  }}
                >
                  Tables
                </span>
              </div>
              <div className="flex-1 overflow-y-auto stone-scroll p-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
                  </div>
                ) : schema.length === 0 ? (
                  <div className="px-3 py-4 text-[13px] text-stone-500">
                    No tables found
                  </div>
                ) : (
                  schema.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => {
                        onSelectTable(table.name);
                        setMobileTab("editor");
                      }}
                      className={`stone-table-row w-full flex items-center gap-2 px-3 py-2 text-[13px] mb-1 ${
                        selectedTable === table.name
                          ? "bg-stone-200 ring-1 ring-stone-300"
                          : ""
                      }`}
                      style={{
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                      }}
                    >
                      <Table2 className={`w-4 h-4 ${selectedTable === table.name ? "text-stone-700" : "text-stone-500"}`} />
                      <span className={`flex-1 text-left font-medium ${selectedTable === table.name ? "text-stone-900" : "text-stone-700"}`}>
                        {table.name}
                      </span>
                      <span className="stone-badge">
                        {table.columns.length}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </aside>

            {/* Results and Editor */}
            <main className={`flex-1 flex flex-col min-w-0 max-md:absolute max-md:inset-0 ${mobileTab !== "editor" ? "max-md:hidden" : ""}`}>
              {/* Results Panel */}
              <div className="flex-1 min-h-[180px] max-md:min-h-[40%] flex flex-col bg-white">
                {/* Header */}
                <div className="stone-results-header flex items-center px-1">
                  <button className="stone-tab stone-tab-active">Results</button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto stone-scroll m-3 stone-inset">
                  {error ? (
                    <div className="flex items-start gap-3 p-4 text-red-600">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <div
                          className="font-medium text-[13px]"
                          style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                        >
                          Query Error
                        </div>
                        <pre className="mt-1 text-[12px] text-red-500 whitespace-pre-wrap font-mono">
                          {error}
                        </pre>
                      </div>
                    </div>
                  ) : !results ? (
                    <div
                      className="flex items-center justify-center h-full text-[13px] text-stone-400"
                      style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                    >
                      Run a query to see results
                    </div>
                  ) : results.rows.length === 0 ? (
                    <div
                      className="flex items-center justify-center h-full text-[13px] text-stone-400"
                      style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                    >
                      Query returned no rows
                    </div>
                  ) : (
                    <table
                      className="stone-table w-full text-[13px] border-collapse"
                      style={{
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                      }}
                    >
                      <thead>
                        <tr>
                          {results.columns.map((col) => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.rows.map((row, idx) => (
                          <tr key={idx}>
                            {results.columns.map((col) => (
                              <td key={col} className="stone-data-string">
                                {formatValue(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* SQL Editor Row - 2 columns on desktop */}
              <div className="flex-1 min-h-[180px] max-md:min-h-[60%] border-t border-stone-200 flex max-md:flex-col">
                {/* Column 1 - Saved Queries - Desktop only in this row */}
                <div className="w-60 max-md:hidden border-r border-stone-200 flex flex-col bg-stone-50/50">
                  {/* Header: Title + Search + Add */}
                  <div className="px-2 pt-3 pb-2 flex flex-col gap-2">
                    <span
                      className="px-2 text-[12px] font-semibold text-stone-500 uppercase tracking-wider"
                      style={{
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                      }}
                    >
                      Queries
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-[12px] bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
                          style={{
                            fontFamily: '"DM Sans", system-ui, sans-serif',
                          }}
                        />
                      </div>
                      <button
                        onClick={handleAddQuery}
                        className="p-1.5 bg-white border border-stone-200 rounded-md hover:bg-stone-100 transition-colors"
                        title="Add new query"
                      >
                        <Plus className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto stone-scroll px-2 pb-2">
                    {filteredQueries.length === 0 ? (
                      <div
                        className="px-3 py-4 text-[12px] text-stone-400 text-center"
                        style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                      >
                        {savedQueries.length === 0
                          ? "No saved queries"
                          : "No matches found"}
                      </div>
                    ) : (
                      filteredQueries.map((q) => (
                        <QueryListItem
                          key={q.id}
                          query={q}
                          isSelected={selectedQueryId === q.id}
                          isEditing={editingQueryId === q.id}
                          onSelect={() => {
                            handleSelectQuery(q);
                            setMobileTab("editor");
                          }}
                          onStartEditing={() => setEditingQueryId(q.id)}
                          onRename={(name) => handleRenameQuery(q.id, name)}
                          onDuplicate={() => handleDuplicateQuery(q)}
                          onDelete={() => handleDeleteQuery(q.id)}
                          className="stone-table-row px-3 py-1 text-[13px] mb-1"
                          selectedClassName="bg-stone-200 ring-1 ring-stone-300"
                          iconClassName="text-stone-500"
                          selectedIconClassName="text-stone-700"
                          textClassName="text-stone-700"
                          selectedTextClassName="text-stone-900"
                          inputClassName="w-full px-2 py-0.5 text-[13px] bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-400"
                          actionClassName="text-stone-500"
                          dialogClassName="bg-stone-50 border-stone-200"
                          dialogCancelClassName="bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                          dialogDeleteClassName="bg-red-600 hover:bg-red-700 text-white"
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Column 2 - Query Editor */}
                <div className="flex-1 flex flex-col">
                  {/* Editor Toolbar */}
                  <div className="stone-editor-toolbar flex items-center px-4 py-2 gap-3">
                    <button
                      onClick={handleRun}
                      disabled={isExecuting || isLoading}
                      className="stone-btn-primary"
                    >
                      {isExecuting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>{isExecuting ? "Running..." : "Run Query"}</span>
                    </button>
                    {stats && (
                      <span
                        className="text-[12px] font-medium text-stone-500 max-md:hidden"
                        style={{
                          fontFamily: '"DM Sans", system-ui, sans-serif',
                        }}
                      >
                        {stats.rowCount} rows in {stats.duration}s
                      </span>
                    )}
                  </div>
                  <div className="flex-1 stone-editor overflow-auto">
                    <SQLEditor
                      value={query}
                      onChange={setQuery}
                      onRun={handleRun}
                      className="min-h-full"
                      style={{
                        background: "transparent",
                        color: "#d4d4d4",
                      }}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Mobile Queries Panel */}
          <div className={`hidden max-md:flex absolute inset-0 top-[48px] z-20 flex-col bg-stone-50 ${mobileTab !== "queries" ? "max-md:hidden" : ""}`}>
            <div className="px-3 pt-3 pb-2 flex flex-col gap-2 border-b border-stone-200">
              <span
                className="px-1 text-[12px] font-semibold text-stone-500 uppercase tracking-wider"
                style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
              >
                Saved Queries
              </span>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-[13px] bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
                    style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                  />
                </div>
                <button
                  onClick={handleAddQuery}
                  className="p-2 bg-white border border-stone-200 rounded-md hover:bg-stone-100 transition-colors"
                  title="Add new query"
                >
                  <Plus className="w-4 h-4 text-stone-600" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto stone-scroll p-2">
              {filteredQueries.length === 0 ? (
                <div
                  className="px-3 py-8 text-[13px] text-stone-400 text-center"
                  style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                >
                  {savedQueries.length === 0 ? "No saved queries" : "No matches found"}
                </div>
              ) : (
                filteredQueries.map((q) => (
                  <QueryListItem
                    key={q.id}
                    query={q}
                    isSelected={selectedQueryId === q.id}
                    isEditing={editingQueryId === q.id}
                    onSelect={() => {
                      handleSelectQuery(q);
                      setMobileTab("editor");
                    }}
                    onStartEditing={() => setEditingQueryId(q.id)}
                    onRename={(name) => handleRenameQuery(q.id, name)}
                    onDuplicate={() => handleDuplicateQuery(q)}
                    onDelete={() => handleDeleteQuery(q.id)}
                    className="stone-table-row px-3 py-2 text-[14px] mb-1"
                    selectedClassName="bg-stone-200 ring-1 ring-stone-300"
                    iconClassName="text-stone-500"
                    selectedIconClassName="text-stone-700"
                    textClassName="text-stone-700"
                    selectedTextClassName="text-stone-900"
                    inputClassName="w-full px-2 py-1 text-[14px] bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-400"
                    actionClassName="text-stone-500"
                    dialogClassName="bg-stone-50 border-stone-200"
                    dialogCancelClassName="bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                    dialogDeleteClassName="bg-red-600 hover:bg-red-700 text-white"
                  />
                ))
              )}
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <nav className="stone-mobile-tabs" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
            <button
              onClick={() => setMobileTab("tables")}
              className={`stone-mobile-tab ${mobileTab === "tables" ? "stone-mobile-tab-active" : ""}`}
            >
              <Table2 />
              <span>Tables</span>
            </button>
            <button
              onClick={() => setMobileTab("queries")}
              className={`stone-mobile-tab ${mobileTab === "queries" ? "stone-mobile-tab-active" : ""}`}
            >
              <FileCode2 />
              <span>Queries</span>
            </button>
            <button
              onClick={() => setMobileTab("editor")}
              className={`stone-mobile-tab ${mobileTab === "editor" ? "stone-mobile-tab-active" : ""}`}
            >
              <Code2 />
              <span>Editor</span>
            </button>
          </nav>

          {/* Status Bar - Desktop only */}
          <footer
            className="stone-statusbar flex items-center justify-between px-4 text-[12px] text-stone-600 font-medium max-md:hidden"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            <div className="flex items-center gap-2">
              <span className={`stone-status-dot ${isLoading ? "opacity-50" : ""}`} />
              <span>{isLoading ? "Initializing..." : "Ready"}</span>
            </div>
            <button
              onClick={handleReset}
              disabled={isResetting || isLoading}
              className="stone-btn-reset flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors disabled:opacity-50"
            >
              {isResetting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RotateCcw className="w-3 h-3" />
              )}
              Reset
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
