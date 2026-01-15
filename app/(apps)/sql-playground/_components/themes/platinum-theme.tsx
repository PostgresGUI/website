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

import "./platinum.css";

type Props = Omit<PlaygroundState, "theme" | "setTheme">;

export function PlatinumTheme({
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

          {/* Toolbar */}
          <div className="flex items-center px-4 py-3 bg-[#dddddd] border-b-2 border-[#888]">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium">Database:</span>
              <select
                value={selectedDb}
                onChange={(e) => setSelectedDb(e.target.value)}
                className="platinum-inset text-[14px] px-3 py-1.5"
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
          <div className="flex-1 flex overflow-hidden bg-[#dddddd]">
            {/* Schema Explorer */}
            <aside className="w-56 border-r-2 border-[#888] bg-[#dddddd] flex flex-col">
              <div className="px-3 py-2 border-b border-[#888] bg-[#cccccc]">
                <span className="text-[13px] font-bold">Tables</span>
              </div>
              <div className="flex-1 overflow-y-auto platinum-scroll p-1">
                {schemaData.map((table) => (
                  <div key={table.name}>
                    <button
                      onClick={() => toggleTable(table.name)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-[14px] hover:bg-[#000] hover:text-[#fff]"
                    >
                      {expandedTables.includes(table.name) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <Table2 className="w-4 h-4" />
                      <span className="flex-1 text-left">{table.name}</span>
                    </button>

                    {expandedTables.includes(table.name) && (
                      <div className="ml-5 border-l border-[#888]">
                        {table.columns.map((col) => (
                          <div
                            key={col.name}
                            className="flex items-center gap-2 px-2 py-1 text-[13px] hover:bg-[#000] hover:text-[#fff] cursor-default"
                          >
                            {getTypeIcon(col.type, "platinum")}
                            <span className="flex-1">{col.name}</span>
                            <span className="text-[12px] text-[#666]">
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
              <div className="flex-1 min-h-[150px] flex flex-col bg-[#dddddd]">
                {/* Header */}
                <div className="flex items-center px-2 pt-2 bg-[#cccccc] border-b border-[#888]">
                  <span className="platinum-tab platinum-tab-active">
                    Results
                  </span>
                  <div className="flex-1" />
                  <span className="text-[13px] text-[#000]">
                    5 rows • 0.023s
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto platinum-scroll bg-[#ffffff] m-2 platinum-inset">
                  <table className="w-full text-[14px] border-collapse">
                    <thead>
                      <tr className="bg-[#dddddd]">
                        <th className="px-4 py-2 text-left font-bold border-r border-b border-[#888]">
                          id
                        </th>
                        <th className="px-4 py-2 text-left font-bold border-r border-b border-[#888]">
                          name
                        </th>
                        <th className="px-4 py-2 text-left font-bold border-r border-b border-[#888]">
                          email
                        </th>
                        <th className="px-4 py-2 text-left font-bold border-b border-[#888]">
                          created_at
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResults.map((row, index) => (
                        <tr
                          key={row.id}
                          className={`${index % 2 === 1 ? "bg-[#eeeeee]" : "bg-white"} hover:bg-[#000] hover:text-[#fff]`}
                        >
                          <td
                            className="px-4 py-1.5 border-r border-[#ddd]"
                            style={{ fontFamily: "Monaco, monospace" }}
                          >
                            {row.id}
                          </td>
                          <td className="px-4 py-1.5 border-r border-[#ddd]">
                            {row.name}
                          </td>
                          <td className="px-4 py-1.5 border-r border-[#ddd]">
                            {row.email}
                          </td>
                          <td className="px-4 py-1.5">{row.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SQL Editor */}
              <div className="flex-1 min-h-[150px] border-t-2 border-[#888] flex flex-col">
                {/* Editor Toolbar */}
                <div className="flex items-center px-2 py-2 bg-[#dddddd]">
                  <button
                    onClick={handleRun}
                    disabled={isExecuting}
                    className="platinum-btn flex items-center gap-1"
                  >
                    {isExecuting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    {isExecuting ? "Running..." : "Run Query"}
                  </button>
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
                      spellCheck={false}
                      className="flex-1 h-full py-2 px-2 bg-[#1e1e1e] text-[14px] leading-[20px] resize-none focus:outline-none text-[#d4d4d4]"
                      style={{ fontFamily: 'Monaco, "Courier New", monospace' }}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#dddddd] border-t-2 border-[#888] text-[13px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00aa00]" />
              <span>Connected to sample_db</span>
            </div>
            <span>PostgreSQL 16</span>
          </div>
        </div>
      </div>
    </div>
  );
}
