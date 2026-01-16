"use client";

import {
  Play,
  Table2,
  Loader2,
  RotateCcw,
  Plus,
  Search,
  FileCode2,
} from "lucide-react";

import type { ThemeProps } from "../../_lib/types";
import { formatValue } from "../../_lib/utils";
import { useSavedQueries } from "../../_lib/hooks";
import "./platinum.css";

export function PlatinumTheme({
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
    <div
      className="h-screen flex flex-col"
      style={{ fontFamily: '"Chicago", "Geneva", system-ui, sans-serif' }}
    >
      {/* Desktop */}
      <div className="absolute inset-0 platinum-desktop" />

      {/* Window */}
      <div className="relative flex-1 flex items-center justify-center p-8">
        <div className="platinum-window w-full max-w-5xl h-[85vh] flex flex-col">
          {/* Title Bar */}
          <div className="platinum-titlebar">
            <div className="platinum-close" />
            <div className="flex-1 flex justify-center">
              <span className="text-[14px] font-bold bg-[#dddddd] px-2">
                SQL Playground
              </span>
            </div>
            <div className="w-[21px]" />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-[#dddddd]">
            {/* Schema Explorer */}
            <aside className="w-56 border-r-2 border-[#888] bg-[#dddddd] flex flex-col">
              <div className="px-3 py-2 border-b border-[#888] bg-[#cccccc]">
                <span className="text-[13px] font-bold">Tables</span>
              </div>
              <div className="flex-1 overflow-y-auto platinum-scroll p-1">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : schema.length === 0 ? (
                  <div className="px-2 py-4 text-[13px] text-[#666]">
                    No tables found
                  </div>
                ) : (
                  schema.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => onSelectTable(table.name)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-[14px] mb-0.5 ${
                        selectedTable === table.name
                          ? "bg-[#000] text-[#fff]"
                          : "hover:bg-[#000] hover:text-[#fff]"
                      }`}
                    >
                      <Table2 className="w-4 h-4" />
                      <span className="flex-1 text-left">{table.name}</span>
                      <span className={`text-[12px] ${selectedTable === table.name ? "text-[#ccc]" : "text-[#666]"}`}>
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
              <div className="flex-1 min-h-[150px] flex flex-col bg-[#dddddd]">
                {/* Header */}
                <div className="flex items-center px-2 pt-2 bg-[#cccccc] border-b border-[#888]">
                  <span className="platinum-tab platinum-tab-active">
                    Results
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto platinum-scroll bg-[#ffffff] m-2 platinum-inset">
                  {error ? (
                    <div className="p-4 text-[14px] text-red-600">
                      <div className="font-bold">Error:</div>
                      <pre className="mt-1 whitespace-pre-wrap">{error}</pre>
                    </div>
                  ) : !results ? (
                    <div className="flex items-center justify-center h-full text-[14px] text-[#666]">
                      Run a query to see results
                    </div>
                  ) : results.rows.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-[14px] text-[#666]">
                      Query returned no rows
                    </div>
                  ) : (
                    <table className="w-full text-[14px] border-collapse">
                      <thead>
                        <tr className="bg-[#dddddd]">
                          {results.columns.map((col) => (
                            <th
                              key={col}
                              className="px-4 py-2 text-left font-bold border-r border-b border-[#888]"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.rows.map((row, index) => (
                          <tr
                            key={index}
                            className={`${index % 2 === 1 ? "bg-[#eeeeee]" : "bg-white"} hover:bg-[#000] hover:text-[#fff]`}
                          >
                            {results.columns.map((col) => (
                              <td
                                key={col}
                                className="px-4 py-1.5 border-r border-[#ddd]"
                                style={{ fontFamily: "Monaco, monospace" }}
                              >
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
              <div className="flex-1 min-h-[150px] border-t-2 border-[#888] flex">
                {/* Column 1 - Saved Queries */}
                <div className="w-56 border-r-2 border-[#888] bg-[#dddddd] flex flex-col">
                  {/* Header: Title + Search + Add */}
                  <div className="px-2 pt-2 pb-2 flex flex-col gap-2">
                    <span className="px-1 text-[13px] font-bold">Queries</span>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#666]" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-7 pr-2 py-1 text-[12px] bg-white border border-[#888] focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={handleAddQuery}
                        className="platinum-btn p-1"
                        title="Add new query"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto platinum-scroll px-1 pb-1">
                    {filteredQueries.length === 0 ? (
                      <div className="px-2 py-4 text-[12px] text-[#666] text-center">
                        {savedQueries.length === 0
                          ? "No saved queries"
                          : "No matches found"}
                      </div>
                    ) : (
                      filteredQueries.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => handleSelectQuery(q)}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 text-[14px] mb-0.5 ${
                            selectedQueryId === q.id
                              ? "bg-[#000] text-[#fff]"
                              : "hover:bg-[#000] hover:text-[#fff]"
                          }`}
                        >
                          <FileCode2 className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1 text-left truncate">
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
                  <div className="flex items-center px-2 py-2 gap-3 bg-[#dddddd]">
                    <button
                      onClick={handleRun}
                      disabled={isExecuting || isLoading}
                      className="platinum-btn flex items-center gap-1"
                    >
                      {isExecuting ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                      {isExecuting ? "Running..." : "Run Query"}
                    </button>
                    {stats && (
                      <span className="text-[13px] text-[#000]">
                        {stats.rowCount} rows • {stats.duration}s
                      </span>
                    )}
                  </div>
                  <div className="flex-1 bg-[#1e1e1e] p-2">
                    <div className="h-full flex">
                      <div
                        className="py-2 px-2 text-right text-[14px] text-[#6e7681] select-none bg-[#252526] border-r border-[#3c3c3c]"
                        style={{ fontFamily: 'Monaco, "Courier New", monospace' }}
                      >
                        {query.split("\n").map((_, i) => (
                          <div key={i} className="leading-[20px]">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                            e.preventDefault();
                            handleRun();
                          }
                        }}
                        spellCheck={false}
                        className="flex-1 h-full py-2 px-2 bg-[#1e1e1e] text-[14px] leading-[20px] resize-none focus:outline-none text-[#d4d4d4]"
                        style={{ fontFamily: 'Monaco, "Courier New", monospace' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#dddddd] border-t-2 border-[#888] text-[13px]">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-[#00aa00] ${isLoading ? "opacity-50" : ""}`} />
              <span>{isLoading ? "Initializing..." : "Ready"}</span>
            </div>
            <button
              onClick={handleReset}
              disabled={isResetting || isLoading}
              className="platinum-btn flex items-center gap-1 text-[12px] py-1 px-2"
            >
              {isResetting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RotateCcw className="w-3 h-3" />
              )}
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
