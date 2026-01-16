"use client";

import {
  Play,
  Table2,
  Loader2,
  RotateCcw,
  AlertCircle,
  Plus,
  Search,
  FileCode2,
} from "lucide-react";

import type { ThemeProps } from "../../_lib/types";
import { formatValue } from "../../_lib/utils";
import { useSavedQueries } from "../../_lib/hooks";
import { SQLEditor } from "../sql-editor";
import "./stone.css";

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
  const {
    savedQueries,
    selectedQueryId,
    searchTerm,
    setSearchTerm,
    filteredQueries,
    handleAddQuery,
    handleSelectQuery,
  } = useSavedQueries({ query, setQuery });

  return (
    <div className="h-screen flex flex-col">
      <div className="absolute inset-0 stone-bg" />

      <div className="relative flex-1 flex items-center justify-center p-6">
        <div className="stone-window w-full max-w-6xl h-[85vh] flex flex-col">
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
          <div className="flex-1 flex overflow-hidden bg-white">
            {/* Schema Explorer */}
            <aside className="w-60 stone-sidebar flex flex-col">
              <div className="stone-sidebar-header px-4 py-3">
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
                      onClick={() => onSelectTable(table.name)}
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
            <main className="flex-1 flex flex-col min-w-0">
              {/* Results Panel */}
              <div className="flex-1 min-h-[180px] flex flex-col bg-white">
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

              {/* SQL Editor Row - 2 columns */}
              <div className="flex-1 min-h-[180px] border-t border-stone-200 flex">
                {/* Column 1 - Saved Queries */}
                <div className="w-60 border-r border-stone-200 flex flex-col bg-stone-50/50">
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
                        <button
                          key={q.id}
                          onClick={() => handleSelectQuery(q)}
                          className={`stone-table-row w-full flex items-center gap-2 px-3 py-1 text-[13px] mb-1 ${
                            selectedQueryId === q.id
                              ? "bg-stone-200 ring-1 ring-stone-300"
                              : ""
                          }`}
                          style={{
                            fontFamily: '"DM Sans", system-ui, sans-serif',
                          }}
                        >
                          <FileCode2
                            className={`w-4 h-4 flex-shrink-0 ${
                              selectedQueryId === q.id
                                ? "text-stone-700"
                                : "text-stone-500"
                            }`}
                          />
                          <span
                            className={`flex-1 text-left font-medium truncate ${
                              selectedQueryId === q.id
                                ? "text-stone-900"
                                : "text-stone-700"
                            }`}
                          >
                            {q.name}
                          </span>
                        </button>
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
                        className="text-[12px] font-medium text-stone-500"
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

          {/* Status Bar */}
          <footer
            className="stone-statusbar flex items-center justify-between px-4 text-[12px] text-stone-600 font-medium"
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
