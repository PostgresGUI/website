"use client";

import {
  Play,
  Table2,
  Loader2,
  RotateCcw,
  Plus,
  Search,
} from "lucide-react";

import type { ThemeProps } from "../../_lib/types";
import { formatValue } from "../../_lib/utils";
import { useSavedQueries } from "../../_lib/hooks";
import { SQLEditor } from "../sql-editor";
import { QueryListItem } from "../query-list-item";
import "./aqua.css";

export function AquaTheme({
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
      <div className="absolute inset-0 aqua-pinstripe" />

      <div className="relative flex-1 flex items-center justify-center p-6">
        <div className="aqua-window w-full max-w-6xl h-[90vh] flex flex-col">
          {/* Title Bar */}
          <header className="brushed-metal flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <button className="traffic-light traffic-close" />
              <button className="traffic-light traffic-minimize" />
              <button className="traffic-light traffic-maximize" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <h1
                className="text-[16px] font-semibold text-[#111]"
                style={{
                  fontFamily: '-apple-system, "Lucida Grande", system-ui',
                }}
              >
                SQL Playground
              </h1>
            </div>
            <div className="w-[62px]" />
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-[#ddd]">
            {/* Schema Explorer */}
            <aside className="w-60 border-r border-[#888] bg-gradient-to-b from-[#f0f0f0] to-[#ddd] flex flex-col">
              <div className="px-4 py-2 pb-0">
                <span
                  className="text-[13px] font-bold text-[#222] uppercase tracking-wide"
                  style={{
                    fontFamily: '-apple-system, "Lucida Grande", system-ui',
                  }}
                >
                  Tables
                </span>
              </div>
              <div className="flex-1 overflow-y-auto aqua-scroll p-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 text-[#333] animate-spin" />
                  </div>
                ) : schema.length === 0 ? (
                  <div className="px-3 py-4 text-[13px] text-[#666]">
                    No tables found
                  </div>
                ) : (
                  schema.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => onSelectTable(table.name)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded mb-1 transition-colors text-[14px] ${
                        selectedTable === table.name
                          ? "bg-[#b8d4f8] ring-1 ring-[#6aa8f0]"
                          : "hover:bg-[#d8e8f8]"
                      }`}
                      style={{
                        fontFamily: '-apple-system, "Lucida Grande", system-ui',
                      }}
                    >
                      <Table2 className={`w-4 h-4 ${selectedTable === table.name ? "text-[#0044aa]" : "text-[#0055cc]"}`} />
                      <span className={`flex-1 text-left font-medium ${selectedTable === table.name ? "text-[#000]" : "text-[#222]"}`}>
                        {table.name}
                      </span>
                      <span className="text-[12px] text-[#444] bg-[#c8c8c8] px-2 py-0.5 rounded font-medium">
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
              <div className="flex-1 min-h-[180px] flex flex-col aqua-pinstripe">
                {/* Header */}
                <div className="flex items-end px-3 pt-2 border-b border-[#888] bg-gradient-to-b from-[#c8c8c8] to-[#b0b0b0]">
                  <span className="aqua-tab aqua-tab-active">Results</span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto aqua-scroll bg-white m-2 aqua-inset rounded">
                  {error ? (
                    <div className="p-4 text-[14px] text-red-600">
                      <div className="font-bold">Error:</div>
                      <pre className="mt-1 whitespace-pre-wrap">{error}</pre>
                    </div>
                  ) : !results ? (
                    <div
                      className="flex items-center justify-center h-full text-[14px] text-[#666]"
                      style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}
                    >
                      Run a query to see results
                    </div>
                  ) : results.rows.length === 0 ? (
                    <div
                      className="flex items-center justify-center h-full text-[14px] text-[#666]"
                      style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}
                    >
                      Query returned no rows
                    </div>
                  ) : (
                    <table
                      className="w-full text-[14px] border-collapse"
                      style={{
                        fontFamily: '-apple-system, "Lucida Grande", system-ui',
                      }}
                    >
                      <thead>
                        <tr className="bg-gradient-to-b from-[#e0e0e0] to-[#ccc]">
                          {results.columns.map((col) => (
                            <th
                              key={col}
                              className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]"
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
                            className={`aqua-row border-b border-[#ddd] ${index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}`}
                          >
                            {results.columns.map((col) => (
                              <td
                                key={col}
                                className="px-4 py-2 text-[#000] border-r border-[#e8e8e8]"
                                style={{
                                  fontFamily: 'Monaco, "Courier New", monospace',
                                }}
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
              <div className="flex-1 min-h-[180px] border-t border-[#888] flex">
                {/* Column 1 - Saved Queries */}
                <div className="w-60 border-r border-[#888] bg-gradient-to-b from-[#f0f0f0] to-[#ddd] flex flex-col">
                  {/* Header: Title + Search + Add */}
                  <div className="px-2 pt-3 pb-2 flex flex-col gap-2">
                    <span
                      className="px-2 text-[13px] font-bold text-[#222] uppercase tracking-wide"
                      style={{
                        fontFamily: '-apple-system, "Lucida Grande", system-ui',
                      }}
                    >
                      Queries
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#666]" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-[12px] bg-white border border-[#999] rounded focus:outline-none focus:ring-1 focus:ring-[#6aa8f0] focus:border-[#6aa8f0]"
                          style={{
                            fontFamily: '-apple-system, "Lucida Grande", system-ui',
                          }}
                        />
                      </div>
                      <button
                        onClick={handleAddQuery}
                        className="p-1.5 bg-white border border-[#999] rounded hover:bg-[#e8e8e8] transition-colors"
                        title="Add new query"
                      >
                        <Plus className="w-4 h-4 text-[#444]" />
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto aqua-scroll px-2 pb-2">
                    {filteredQueries.length === 0 ? (
                      <div
                        className="px-3 py-4 text-[12px] text-[#666] text-center"
                        style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}
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
                          onSelect={() => handleSelectQuery(q)}
                          onStartEditing={() => setEditingQueryId(q.id)}
                          onRename={(name) => handleRenameQuery(q.id, name)}
                          onDuplicate={() => handleDuplicateQuery(q)}
                          onDelete={() => handleDeleteQuery(q.id)}
                          className="px-3 py-2 rounded mb-1 transition-colors text-[14px]"
                          selectedClassName="bg-[#b8d4f8] ring-1 ring-[#6aa8f0]"
                          hoverClassName="hover:bg-[#d8e8f8]"
                          iconClassName="text-[#0055cc]"
                          selectedIconClassName="text-[#0044aa]"
                          textClassName="text-[#222]"
                          selectedTextClassName="text-[#000]"
                          inputClassName="w-full px-2 py-0.5 text-[13px] bg-white border border-[#999] rounded focus:outline-none focus:ring-1 focus:ring-[#6aa8f0]"
                          actionClassName="text-[#666]"
                          dialogClassName="bg-gradient-to-b from-[#f0f0f0] to-[#ddd] border-[#888] rounded-lg shadow-xl"
                          dialogCancelClassName="aqua-btn-secondary"
                          dialogDeleteClassName="aqua-btn-danger"
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Column 2 - Query Editor */}
                <div className="flex-1 flex flex-col">
                  {/* Editor Toolbar */}
                  <div className="flex items-center px-3 py-2 gap-3 bg-gradient-to-b from-[#c8c8c8] to-[#b0b0b0] border-b border-[#888]">
                    <button
                      onClick={handleRun}
                      disabled={isExecuting || isLoading}
                      className="aqua-btn-primary"
                    >
                      {isExecuting ? (
                        <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                      ) : (
                        <Play className="w-4 h-4 relative z-10" />
                      )}
                      <span>{isExecuting ? "Running..." : "Run Query"}</span>
                    </button>
                    {stats && (
                      <span
                        className="text-[13px] font-medium text-[#333]"
                        style={{
                          fontFamily: '-apple-system, "Lucida Grande", system-ui',
                        }}
                      >
                        {stats.rowCount} rows • {stats.duration}s
                      </span>
                    )}
                  </div>
                  <div className="flex-1 bg-[#1e1e1e] overflow-auto">
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
            className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#ccc] to-[#aaa] border-t border-[#888] text-[13px] text-[#222] font-medium"
            style={{
              fontFamily: '-apple-system, "Lucida Grande", system-ui',
            }}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-[#2dd23b] border border-[#148a1e] ${isLoading ? "opacity-50" : ""}`} />
              <span>{isLoading ? "Initializing..." : "Ready"}</span>
            </div>
            <button
              onClick={handleReset}
              disabled={isResetting || isLoading}
              className="aqua-btn-secondary flex items-center gap-1 text-[12px] h-[26px] min-w-0 px-3"
            >
              {isResetting ? (
                <Loader2 className="w-3 h-3 animate-spin relative z-10" />
              ) : (
                <RotateCcw className="w-3 h-3 relative z-10" />
              )}
              <span>Reset</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
