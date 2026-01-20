"use client";

import { useState } from "react";
import {
  Play,
  Table2,
  Loader2,
  RotateCcw,
  Plus,
  Search,
  Code2,
  FileCode2,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";

import type { ThemeProps } from "../../_lib/types";
import { formatValue, exportToCSV } from "../../_lib/utils";
import { useSavedQueries } from "../../_lib/hooks";
import { SQLEditor } from "../sql-editor";
import { QueryListItem } from "../query-list-item";
import { EditRowDialog } from "../edit-row-dialog";
import { DeleteRowDialog } from "../delete-row-dialog";
import { CreateTableDialog } from "../create-table-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./platinum.css";

type MobileTab = "tables" | "editor" | "queries";

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
  rowEditInfo,
  onEditRow,
  onDeleteRow,
  editingRow,
  deletingRow,
  onCloseEditDialog,
  onCloseDeleteDialog,
  onSaveEdit,
  onConfirmDelete,
  tableSchema,
  isCreateTableOpen,
  onOpenCreateTable,
  onCloseCreateTable,
  onCreateTable,
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
    <div
      className="h-screen flex flex-col"
      style={{ fontFamily: '"Chicago", "Geneva", system-ui, sans-serif' }}
    >
      {/* Desktop */}
      <div className="absolute inset-0 platinum-desktop" />

      {/* Window */}
      <div className="relative flex-1 flex items-center justify-center p-8 max-md:p-0">
        <div className="platinum-window w-full max-w-5xl h-[85vh] max-md:h-screen max-md:max-w-full flex flex-col relative">
          {/* Title Bar */}
          <div className="platinum-titlebar">
            <div className="platinum-close max-md:hidden" />
            <div className="flex-1 flex justify-center">
              <span className="text-[14px] font-bold bg-[#dddddd] px-2">
                SQL Editor
              </span>
            </div>
            <div className="w-[21px] max-md:hidden" />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-[#dddddd] relative">
            {/* Schema Explorer */}
            <aside className={`w-56 max-md:w-full max-md:absolute max-md:inset-0 max-md:z-10 border-r-2 border-[#888] max-md:border-0 bg-[#dddddd] flex flex-col ${mobileTab !== "tables" ? "max-md:hidden" : ""}`}>
              <div className="px-3 py-2 pb-0 flex items-center justify-between">
                <span className="text-[13px] font-bold">Tables</span>
                <button
                  onClick={onOpenCreateTable}
                  className="platinum-btn p-1"
                  title="Create new table"
                  aria-label="Create new table"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
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
                      onClick={() => {
                        onSelectTable(table.name);
                        setMobileTab("editor");
                      }}
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
            <main className={`flex-1 flex flex-col min-w-0 max-md:absolute max-md:inset-0 ${mobileTab !== "editor" ? "max-md:hidden" : ""}`}>
              {/* Results Panel */}
              <div className="flex-1 min-h-[150px] max-md:min-h-[40%] flex flex-col bg-[#dddddd]">
                {/* Header */}
                <div className="flex items-center justify-between px-2 pt-2 bg-[#cccccc] border-b border-[#888]">
                  <span className="platinum-tab platinum-tab-active">
                    Results
                  </span>
                  <button
                    onClick={() => results && exportToCSV(results.columns, results.rows)}
                    disabled={!results || results.rows.length === 0}
                    className="platinum-btn flex items-center gap-1 text-[11px] py-0.5 px-2 mb-1 disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Export to CSV"
                  >
                    <Download className="w-3 h-3" />
                    <span className="max-md:hidden">Export CSV</span>
                  </button>
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
                    <TooltipProvider delayDuration={300}>
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
                            <th className="px-4 py-2 text-left font-bold border-b border-[#888] w-[80px]">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.rows.map((row, index) => (
                            <tr
                              key={index}
                              className={`group ${index % 2 === 1 ? "bg-[#eeeeee]" : "bg-white"} hover:bg-[#ccc]`}
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
                              <td className="px-2 py-1.5">
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        onClick={() => rowEditInfo?.isEditable && onEditRow(row)}
                                        disabled={!rowEditInfo?.isEditable}
                                        className={`p-1 rounded ${rowEditInfo?.isEditable ? "hover:bg-[#bbb]" : "opacity-40 cursor-not-allowed"}`}
                                      >
                                        <Pencil className="w-3.5 h-3.5" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs">
                                      {rowEditInfo?.isEditable ? "Edit row" : rowEditInfo?.reason || "Cannot edit"}
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        onClick={() => rowEditInfo?.isEditable && onDeleteRow(row)}
                                        disabled={!rowEditInfo?.isEditable}
                                        className={`p-1 rounded ${rowEditInfo?.isEditable ? "hover:bg-[#bbb] hover:text-red-600" : "opacity-40 cursor-not-allowed"}`}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs">
                                      {rowEditInfo?.isEditable ? "Delete row" : rowEditInfo?.reason || "Cannot delete"}
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              {/* SQL Editor Row - 2 columns */}
              <div className="flex-1 min-h-[150px] max-md:min-h-[60%] border-t-2 border-[#888] flex">
                {/* Column 1 - Saved Queries - Desktop only */}
                <div className="w-56 max-md:hidden border-r-2 border-[#888] bg-[#dddddd] flex flex-col">
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
                          className="px-2 py-1.5 text-[14px] mb-0.5"
                          selectedClassName="bg-[#000] text-[#fff]"
                          hoverClassName="hover:bg-[#000] hover:text-[#fff]"
                          iconClassName="text-current"
                          selectedIconClassName="text-current"
                          textClassName="text-current"
                          selectedTextClassName="text-current"
                          inputClassName="w-full px-1 py-0.5 text-[13px] bg-white text-black border border-[#888] focus:outline-none"
                          actionClassName="text-current"
                          dialogClassName="bg-[#dddddd] border-[#888] border-2 rounded-none shadow-[2px_2px_0_#000]"
                          dialogCancelClassName="bg-[#dddddd] border-[#888] border-2 rounded-none text-black hover:bg-[#cccccc]"
                          dialogDeleteClassName="bg-[#dddddd] border-[#888] border-2 rounded-none text-red-600 hover:bg-[#cccccc]"
                        />
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
                      <span className="text-[13px] text-[#000] max-md:hidden">
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

          {/* Mobile Queries Panel */}
          <div className={`hidden max-md:flex absolute inset-0 top-[24px] z-20 flex-col bg-[#dddddd] ${mobileTab !== "queries" ? "max-md:hidden" : ""}`}>
            <div className="px-2 pt-2 pb-2 flex flex-col gap-2 border-b-2 border-[#888]">
              <span className="px-1 text-[13px] font-bold">Saved Queries</span>
              <div className="flex items-center gap-1">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#666]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 text-[13px] bg-white border border-[#888] focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleAddQuery}
                  className="platinum-btn p-1.5"
                  title="Add new query"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto platinum-scroll p-1">
              {filteredQueries.length === 0 ? (
                <div className="px-2 py-8 text-[13px] text-[#666] text-center">
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
                    className="px-2 py-2 text-[14px] mb-0.5"
                    selectedClassName="bg-[#000] text-[#fff]"
                    hoverClassName="hover:bg-[#000] hover:text-[#fff]"
                    iconClassName="text-current"
                    selectedIconClassName="text-current"
                    textClassName="text-current"
                    selectedTextClassName="text-current"
                    inputClassName="w-full px-1 py-1 text-[14px] bg-white text-black border border-[#888] focus:outline-none"
                    actionClassName="text-current"
                    dialogClassName="bg-[#dddddd] border-[#888] border-2 rounded-none shadow-[2px_2px_0_#000]"
                    dialogCancelClassName="bg-[#dddddd] border-[#888] border-2 rounded-none text-black hover:bg-[#cccccc]"
                    dialogDeleteClassName="bg-[#dddddd] border-[#888] border-2 rounded-none text-red-600 hover:bg-[#cccccc]"
                  />
                ))
              )}
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <nav className="platinum-mobile-tabs">
            <button
              onClick={() => setMobileTab("tables")}
              className={`platinum-mobile-tab ${mobileTab === "tables" ? "platinum-mobile-tab-active" : ""}`}
            >
              <Table2 />
              <span>Tables</span>
            </button>
            <button
              onClick={() => setMobileTab("queries")}
              className={`platinum-mobile-tab ${mobileTab === "queries" ? "platinum-mobile-tab-active" : ""}`}
            >
              <FileCode2 />
              <span>Queries</span>
            </button>
            <button
              onClick={() => setMobileTab("editor")}
              className={`platinum-mobile-tab ${mobileTab === "editor" ? "platinum-mobile-tab-active" : ""}`}
            >
              <Code2 />
              <span>Editor</span>
            </button>
          </nav>

          {/* Status Bar - Desktop only */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#dddddd] border-t-2 border-[#888] text-[13px] max-md:hidden">
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

          {/* Edit Row Dialog */}
          <EditRowDialog
            isOpen={!!editingRow}
            onClose={onCloseEditDialog}
            onSave={onSaveEdit}
            row={editingRow}
            columns={results?.columns || []}
            primaryKeyColumn={rowEditInfo?.primaryKeyColumn || null}
            schema={tableSchema}
            overlayClassName="bg-black/30"
            dialogClassName="bg-[#dddddd] border-2 border-[#888] shadow-[4px_4px_0_#000]"
            headerClassName="border-b-2 border-[#888] bg-[#cccccc]"
            titleClassName="text-[14px] font-bold"
            closeButtonClassName="p-1 hover:bg-[#bbb]"
            bodyClassName="bg-[#dddddd]"
            labelClassName="text-[13px] font-bold"
            inputClassName="px-2 py-1.5 text-[13px] bg-white border border-[#888] focus:outline-none"
            footerClassName="border-t-2 border-[#888] bg-[#cccccc]"
            cancelButtonClassName="platinum-btn px-4 py-1.5 text-[13px]"
            saveButtonClassName="platinum-btn px-4 py-1.5 text-[13px] flex items-center gap-2"
          />

          {/* Delete Row Dialog */}
          <DeleteRowDialog
            isOpen={!!deletingRow}
            onClose={onCloseDeleteDialog}
            onConfirm={onConfirmDelete}
            primaryKeyColumn={rowEditInfo?.primaryKeyColumn || null}
            primaryKeyValue={deletingRow?.[rowEditInfo?.primaryKeyColumn || ""] ?? null}
            overlayClassName="bg-black/30"
            dialogClassName="bg-[#dddddd] border-2 border-[#888] shadow-[4px_4px_0_#000]"
            headerClassName=""
            iconClassName="text-red-600"
            titleClassName="text-[14px] font-bold"
            descriptionClassName="text-[13px] text-[#444]"
            footerClassName="border-t-2 border-[#888] bg-[#cccccc]"
            cancelButtonClassName="platinum-btn px-4 py-1.5 text-[13px]"
            deleteButtonClassName="platinum-btn px-4 py-1.5 text-[13px] text-red-600 flex items-center gap-2"
          />

          {/* Create Table Dialog */}
          <CreateTableDialog
            isOpen={isCreateTableOpen}
            onClose={onCloseCreateTable}
            onCreateTable={onCreateTable}
            existingTables={schema.map((t) => t.name.toLowerCase())}
            theme="platinum"
          />
        </div>
      </div>
    </div>
  );
}
