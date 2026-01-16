"use client";

import {
  Play,
  ChevronRight,
  ChevronDown,
  Table2,
  Loader2,
} from "lucide-react";
import type { PlaygroundState } from "../../_lib/types";
import { schemaData, mockResults, databaseOptions } from "../../_lib/data";
import { getTypeIcon } from "../../_lib/utils";

import "./stone.css";

type Props = Omit<PlaygroundState, "theme" | "setTheme">;

export function StoneTheme({
  query,
  setQuery,
  expandedTables,
  toggleTable,
  selectedDb,
  setSelectedDb,
  isExecuting,
  handleRun,
}: Props) {
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

          {/* Toolbar */}
          <div className="stone-toolbar flex items-center px-4 py-3">
            <div className="flex items-center gap-3">
              <span
                className="text-[13px] font-medium text-stone-600"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              >
                Database
              </span>
              <select
                value={selectedDb}
                onChange={(e) => setSelectedDb(e.target.value)}
                className="stone-select"
              >
                {databaseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                {schemaData.map((table) => (
                  <div key={table.name} className="mb-1">
                    <button
                      onClick={() => toggleTable(table.name)}
                      className="stone-table-row w-full flex items-center gap-2 px-3 py-2 text-[13px]"
                      style={{
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                      }}
                    >
                      {expandedTables.includes(table.name) ? (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      )}
                      <Table2 className="w-4 h-4 text-stone-500" />
                      <span className="flex-1 text-left text-stone-700 font-medium">
                        {table.name}
                      </span>
                      <span className="stone-badge">
                        {table.columns.length}
                      </span>
                    </button>
                    {expandedTables.includes(table.name) && (
                      <div className="ml-5 mt-1 border-l border-stone-200 pl-3">
                        {table.columns.map((col) => (
                          <div
                            key={col.name}
                            className="stone-column-row flex items-center gap-2 px-3 py-1.5 text-[13px] text-stone-600 cursor-default"
                            style={{
                              fontFamily: '"DM Sans", system-ui, sans-serif',
                            }}
                          >
                            <span className="text-stone-400">
                              {getTypeIcon(col.type, "stone")}
                            </span>
                            <span className="flex-1 font-medium text-stone-700">
                              {col.name}
                            </span>
                            <span className="stone-badge-type">
                              {col.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* Results and Editor */}
            <main className="flex-1 flex flex-col min-w-0">
              {/* Results Panel */}
              <div className="flex-1 min-h-[180px] flex flex-col bg-white">
                {/* Header */}
                <div className="stone-results-header flex items-center px-1">
                  <button className="stone-tab stone-tab-active">Results</button>
                  <div className="flex-1" />
                  <span
                    className="text-[12px] font-medium text-stone-500 pr-4"
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                    }}
                  >
                    5 rows in 0.023s
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto stone-scroll m-3 stone-inset overflow-x-auto">
                  <table
                    className="stone-table w-full text-[13px] border-collapse"
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                    }}
                  >
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>created_at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResults.map((row) => (
                        <tr key={row.id}>
                          <td className="stone-data-number">{row.id}</td>
                          <td className="stone-data-string">{row.name}</td>
                          <td className="stone-data-string text-stone-500">
                            {row.email}
                          </td>
                          <td className="stone-data-date">{row.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SQL Editor */}
              <div className="flex-1 min-h-[180px] border-t border-stone-200 flex flex-col">
                {/* Editor Toolbar */}
                <div className="stone-editor-toolbar flex items-center px-4 py-2">
                  <button
                    onClick={handleRun}
                    disabled={isExecuting}
                    className="stone-btn-primary"
                  >
                    {isExecuting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span>{isExecuting ? "Running..." : "Run Query"}</span>
                  </button>
                </div>
                <div className="flex-1 stone-editor">
                  <div className="h-full flex">
                    <div className="stone-line-numbers py-3 px-3 text-right text-[13px] select-none leading-[22px]">
                      {query.split("\n").map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <div className="flex-1 relative">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        spellCheck={false}
                        className="stone-editor-textarea absolute inset-0 w-full h-full py-3 px-3 resize-none focus:outline-none leading-[22px]"
                      />
                    </div>
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
              <span className="stone-status-dot" />
              <span>Connected to sample_db</span>
            </div>
            <span className="stone-status-badge">PostgreSQL 16</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
