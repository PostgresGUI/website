"use client";

import {
  Play,
  Trash2,
  ChevronRight,
  ChevronDown,
  Table2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import type { PlaygroundState } from "../../_lib/types";
import { schemaData, mockResults, databaseOptions } from "../../_lib/data";
import { getTypeIcon } from "../../_lib/utils";

import "./aqua.css";

type Props = Omit<PlaygroundState, "theme" | "setTheme">;

export function AquaTheme({
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
}: Props) {
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

          {/* Toolbar */}
          <div className="brushed-metal flex items-center justify-between px-4 py-3 border-t border-white/40">
            <div className="flex items-center gap-4">
              <span
                className="text-[14px] font-medium text-[#222]"
                style={{
                  fontFamily: '-apple-system, "Lucida Grande", system-ui',
                }}
              >
                Database:
              </span>
              <select
                value={selectedDb}
                onChange={(e) => setSelectedDb(e.target.value)}
                className="aqua-select"
              >
                {databaseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleClear} className="aqua-btn-secondary">
                <Trash2 className="w-4 h-4 relative z-10" />
                <span>Clear</span>
              </button>
              <button
                onClick={handleRun}
                disabled={isExecuting}
                className="aqua-btn-primary"
              >
                {isExecuting ? (
                  <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                ) : (
                  <Play className="w-4 h-4 relative z-10" />
                )}
                <span>{isExecuting ? "Running..." : "Run Query"}</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-[#ddd]">
            {/* Schema Explorer */}
            <aside className="w-60 border-r border-[#888] bg-gradient-to-b from-[#f0f0f0] to-[#ddd] flex flex-col">
              <div className="px-4 py-2 border-b border-[#aaa] bg-gradient-to-b from-[#d0d0d0] to-[#bbb]">
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
                {schemaData.map((table) => (
                  <div key={table.name} className="mb-1">
                    <button
                      onClick={() => toggleTable(table.name)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-[#b8d4f8] transition-colors text-[14px]"
                      style={{
                        fontFamily: '-apple-system, "Lucida Grande", system-ui',
                      }}
                    >
                      {expandedTables.includes(table.name) ? (
                        <ChevronDown className="w-4 h-4 text-[#333]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#333]" />
                      )}
                      <Table2 className="w-4 h-4 text-[#0055cc]" />
                      <span className="flex-1 text-left text-[#000] font-medium">
                        {table.name}
                      </span>
                      <span className="text-[12px] text-[#444] bg-[#c8c8c8] px-2 py-0.5 rounded font-medium">
                        {table.columns.length}
                      </span>
                    </button>
                    {expandedTables.includes(table.name) && (
                      <div className="ml-5 mt-1 border-l-2 border-[#aaa] pl-3">
                        {table.columns.map((col) => (
                          <div
                            key={col.name}
                            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#b8d4f8] text-[13px] text-[#222] cursor-default"
                            style={{
                              fontFamily:
                                '-apple-system, "Lucida Grande", system-ui',
                            }}
                          >
                            <span className="text-[#0055cc]">
                              {getTypeIcon(col.type, "aqua")}
                            </span>
                            <span className="flex-1 font-medium">
                              {col.name}
                            </span>
                            <span className="text-[12px] text-[#555] italic">
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

            {/* Editor and Results */}
            <main className="flex-1 flex flex-col min-w-0">
              {/* SQL Editor */}
              <div className="flex-1 min-h-[180px] border-b border-[#888] bg-white">
                <div className="h-full flex">
                  <div
                    className="py-3 px-3 text-right text-[14px] text-[#666] select-none bg-[#e8e8e8] border-r border-[#bbb]"
                    style={{ fontFamily: 'Monaco, "Courier New", monospace' }}
                  >
                    {query.split("\n").map((_, i) => (
                      <div key={i} className="leading-[22px]">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      spellCheck={false}
                      className="absolute inset-0 w-full h-full py-3 px-3 bg-transparent text-[14px] leading-[22px] resize-none focus:outline-none text-[#000]"
                      style={{
                        fontFamily: 'Monaco, "Courier New", monospace',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="flex-1 min-h-[180px] flex flex-col aqua-pinstripe">
                {/* Tabs */}
                <div className="flex items-end px-3 pt-2 border-b border-[#888] bg-gradient-to-b from-[#c8c8c8] to-[#b0b0b0]">
                  <button
                    onClick={() => setActiveTab("results")}
                    className={`aqua-tab ${activeTab === "results" ? "aqua-tab-active" : ""}`}
                  >
                    Results
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`aqua-tab ${activeTab === "messages" ? "aqua-tab-active" : ""}`}
                  >
                    Messages
                  </button>
                  <div className="flex-1" />
                  <span
                    className="text-[13px] font-medium text-[#333] mb-2 mr-2"
                    style={{
                      fontFamily: '-apple-system, "Lucida Grande", system-ui',
                    }}
                  >
                    5 rows • 0.023s
                  </span>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-auto aqua-scroll bg-white m-2 aqua-inset rounded">
                  {activeTab === "results" ? (
                    <table
                      className="w-full text-[14px] border-collapse"
                      style={{
                        fontFamily: '-apple-system, "Lucida Grande", system-ui',
                      }}
                    >
                      <thead>
                        <tr className="bg-gradient-to-b from-[#e0e0e0] to-[#ccc]">
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]">
                            id
                          </th>
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]">
                            name
                          </th>
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]">
                            email
                          </th>
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-b-2 border-b-[#888]">
                            created_at
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockResults.map((row, index) => (
                          <tr
                            key={row.id}
                            className={`aqua-row border-b border-[#ddd] ${index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}`}
                          >
                            <td
                              className="px-4 py-2 text-[#007700] font-semibold border-r border-[#e8e8e8]"
                              style={{
                                fontFamily: 'Monaco, "Courier New", monospace',
                              }}
                            >
                              {row.id}
                            </td>
                            <td className="px-4 py-2 text-[#000] border-r border-[#e8e8e8]">
                              {row.name}
                            </td>
                            <td className="px-4 py-2 text-[#333] border-r border-[#e8e8e8]">
                              {row.email}
                            </td>
                            <td className="px-4 py-2 text-[#333]">
                              {row.created_at}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div
                      className="p-4"
                      style={{
                        fontFamily: '-apple-system, "Lucida Grande", system-ui',
                      }}
                    >
                      <div className="flex items-center gap-2 text-[#007700]">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">
                          Query executed successfully
                        </span>
                      </div>
                      <p className="mt-2 text-[14px] text-[#333]">
                        5 rows returned in 0.023 seconds
                      </p>
                    </div>
                  )}
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
              <span className="w-2 h-2 rounded-full bg-[#2dd23b] border border-[#148a1e]" />
              <span>Connected to sample_db</span>
            </div>
            <span className="px-2 py-1 rounded bg-[#bbb] border border-[#888] text-[12px] font-semibold">
              PostgreSQL 16
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}
