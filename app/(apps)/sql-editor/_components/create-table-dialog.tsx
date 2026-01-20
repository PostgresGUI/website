"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, Loader2, Plus, Trash2, ChevronDown, ChevronRight, Minus, Square } from "lucide-react";
import type { Theme } from "../_lib/types";

// Common PostgreSQL data types
const DATA_TYPES = [
  { group: "Numeric", types: ["SERIAL", "INTEGER", "BIGINT", "DECIMAL", "NUMERIC", "REAL"] },
  { group: "Text", types: ["VARCHAR", "TEXT", "CHAR"] },
  { group: "Date/Time", types: ["TIMESTAMP", "DATE", "TIME", "INTERVAL"] },
  { group: "Boolean", types: ["BOOLEAN"] },
  { group: "Other", types: ["UUID", "JSON", "JSONB"] },
];

interface Column {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  nullable: boolean;
  defaultValue: string;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function createEmptyColumn(isPrimaryKey = false): Column {
  return {
    id: generateId(),
    name: isPrimaryKey ? "id" : "",
    type: isPrimaryKey ? "SERIAL" : "VARCHAR",
    isPrimaryKey,
    nullable: false,
    defaultValue: "",
  };
}

function generateSQL(tableName: string, columns: Column[]): string {
  if (!tableName.trim() || columns.length === 0) {
    return "";
  }

  const columnDefs = columns
    .filter((col) => col.name.trim())
    .map((col) => {
      let def = `  ${col.name} ${col.type}`;
      if (col.isPrimaryKey) {
        def += " PRIMARY KEY";
      } else if (!col.nullable) {
        def += " NOT NULL";
      }
      if (col.defaultValue.trim()) {
        def += ` DEFAULT ${col.defaultValue}`;
      }
      return def;
    });

  if (columnDefs.length === 0) {
    return "";
  }

  return `CREATE TABLE ${tableName} (\n${columnDefs.join(",\n")}\n);`;
}

interface CreateTableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTable: (sql: string) => Promise<void>;
  existingTables: string[];
  theme: Theme;
}

export function CreateTableDialog({
  isOpen,
  onClose,
  onCreateTable,
  existingTables,
  theme,
}: CreateTableDialogProps) {
  const initialSize = { width: 700, height: 500 };
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ position: { x: 0, y: 0 }, size: initialSize });

  const windowRef = useRef<HTMLDivElement>(null);

  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState<Column[]>([createEmptyColumn(true)]);
  const [showPreview, setShowPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Center window when opening
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const x = Math.max(50, window.innerWidth / 2 - initialSize.width / 2);
      const y = Math.max(50, window.innerHeight / 2 - initialSize.height / 2);
      setPosition({ x, y });
      setSize(initialSize);
      setIsMaximized(false);
    }
  }, [isOpen]);

  // Reset form state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTableName("");
      setColumns([createEmptyColumn(true)]);
      setShowPreview(false);
      setError(null);
    }
  }, [isOpen]);

  const generatedSQL = generateSQL(tableName, columns);

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, [isMaximized]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height));
        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        const newWidth = Math.max(500, e.clientX - position.x);
        const newHeight = Math.max(400, e.clientY - position.y);
        setSize({ width: newWidth, height: newHeight });
      }
    },
    [isDragging, isResizing, dragOffset, position, size]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
    } else {
      setPreMaximizeState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    setIsMaximized(!isMaximized);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const validate = useCallback((): string | null => {
    if (!tableName.trim()) {
      return "Table name is required";
    }

    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
      return "Table name must start with a letter or underscore and contain only letters, numbers, and underscores";
    }

    if (existingTables.includes(tableName.toLowerCase())) {
      return `Table "${tableName}" already exists`;
    }

    const validColumns = columns.filter((col) => col.name.trim());
    if (validColumns.length === 0) {
      return "At least one column is required";
    }

    const columnNames = new Set<string>();
    for (const col of validColumns) {
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(col.name)) {
        return `Column "${col.name}" has an invalid name`;
      }
      if (columnNames.has(col.name.toLowerCase())) {
        return `Duplicate column name: "${col.name}"`;
      }
      columnNames.add(col.name.toLowerCase());
    }

    return null;
  }, [tableName, columns, existingTables]);

  const handleCreate = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      await onCreateTable(generatedSQL);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create table");
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddColumn = () => {
    setColumns([...columns, createEmptyColumn()]);
  };

  const handleRemoveColumn = (id: string) => {
    if (columns.length <= 1) return;
    setColumns(columns.filter((col) => col.id !== id));
  };

  const handleColumnChange = (id: string, field: keyof Column, value: string | boolean) => {
    setColumns(
      columns.map((col) => {
        if (col.id !== id) {
          if (field === "isPrimaryKey" && value === true) {
            return { ...col, isPrimaryKey: false };
          }
          return col;
        }
        return { ...col, [field]: value };
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case "platinum":
        return {
          window: { background: "#dddddd", border: "2px solid black", borderRadius: 0 },
          titleBar: { background: "#dddddd", borderBottom: "2px solid #808080" },
          titleText: { color: "black", fontFamily: '"Geneva", system-ui' },
          content: { background: "#dddddd" },
          input: "px-2 py-1.5 text-[13px] bg-white border border-[#888] focus:outline-none",
          select: "px-2 py-1.5 text-[13px] bg-white border border-[#888] focus:outline-none",
          label: "text-[13px] font-bold text-black",
          button: "px-4 py-1.5 text-[13px] bg-[#dddddd] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white",
          buttonPrimary: "px-4 py-1.5 text-[13px] bg-[#dddddd] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white",
          error: "text-red-600 bg-[#ffdddd] border border-red-400 p-2 text-[13px]",
          preview: "p-3 text-[12px] bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto font-mono",
        };
      case "aqua":
        return {
          window: { background: "white", borderRadius: "8px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)" },
          titleBar: { background: "linear-gradient(to bottom, #b8d4f0 0%, #6ba3d6 50%, #4a90c8 51%, #6ba3d6 100%)", borderBottom: "1px solid #4a7ba7" },
          titleText: { color: "#222", fontFamily: '-apple-system, BlinkMacSystemFont, "Lucida Grande", system-ui', textShadow: "0 1px 0 rgba(255,255,255,0.5)" },
          content: { background: "linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%)" },
          input: "px-3 py-1.5 text-[13px] bg-white border border-[#999] rounded focus:outline-none focus:ring-1 focus:ring-[#6aa8f0] focus:border-[#6aa8f0]",
          select: "px-3 py-1.5 text-[13px] bg-white border border-[#999] rounded focus:outline-none focus:ring-1 focus:ring-[#6aa8f0] focus:border-[#6aa8f0]",
          label: "text-[13px] font-semibold text-[#222]",
          button: "px-4 py-1.5 text-[13px] bg-gradient-to-b from-[#fafafa] to-[#e0e0e0] border border-[#999] rounded shadow-sm hover:from-[#ffffff] hover:to-[#ebebeb]",
          buttonPrimary: "px-4 py-1.5 text-[13px] text-white bg-gradient-to-b from-[#6cb3f5] to-[#2d8cf0] border border-[#1a6ed8] rounded shadow-sm hover:from-[#7fc1ff] hover:to-[#3d9cf5]",
          error: "text-red-600 bg-red-50 border border-red-200 rounded p-2 text-[13px]",
          preview: "p-3 text-[12px] bg-[#1e1e1e] text-[#d4d4d4] rounded overflow-x-auto font-mono",
        };
      case "stone":
      default:
        return {
          window: { background: "white", borderRadius: "12px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)" },
          titleBar: { background: "#a8a29e", borderBottom: "1px solid #78716c" },
          titleText: { color: "#1c1917", fontFamily: '"DM Sans", system-ui, sans-serif' },
          content: { background: "#fafaf9" },
          input: "px-3 py-1.5 text-[13px] bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400",
          select: "px-3 py-1.5 text-[13px] bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400",
          label: "text-[13px] font-medium text-stone-700",
          button: "px-4 py-1.5 text-[13px] bg-white border border-stone-300 rounded-md text-stone-700 hover:bg-stone-100",
          buttonPrimary: "px-4 py-1.5 text-[13px] bg-stone-800 text-white rounded-md hover:bg-stone-700 disabled:opacity-50",
          error: "text-red-600 bg-red-50 border border-red-200 rounded-md p-2 text-[13px]",
          preview: "p-3 text-[12px] bg-stone-900 text-stone-100 rounded-md overflow-x-auto font-mono",
        };
    }
  };

  const styles = getThemeStyles();

  const renderWindowControls = () => {
    if (theme === "platinum") {
      return (
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="w-4 h-4 border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dddddd] flex items-center justify-center"
          />
          <button
            onClick={handleMaximize}
            className="w-4 h-4 border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dddddd] flex items-center justify-center"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors flex items-center justify-center group"
        >
          <X className="w-2 h-2 text-[#990000] opacity-0 group-hover:opacity-100" />
        </button>
        <button
          className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f5a623] transition-colors flex items-center justify-center group"
        >
          <Minus className="w-2 h-2 text-[#995700] opacity-0 group-hover:opacity-100" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#1aab29] transition-colors flex items-center justify-center group"
        >
          <Square className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100" />
        </button>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Window */}
      <div
        ref={windowRef}
        className="fixed flex flex-col overflow-hidden"
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          zIndex: 51,
          ...styles.window,
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center h-10 px-3 cursor-move select-none shrink-0"
          style={styles.titleBar}
          onMouseDown={handleMouseDown}
        >
          {renderWindowControls()}
          <div className="flex-1 flex justify-center">
            <span className="text-[13px] font-medium" style={styles.titleText}>
              Create Table
            </span>
          </div>
          <div className="w-14" />
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto p-4"
          style={styles.content}
        >
          {/* Error */}
          {error && (
            <div className={`mb-4 ${styles.error}`} role="alert">
              {error}
            </div>
          )}

          {/* Table Name */}
          <div className="mb-4">
            <label htmlFor="table-name" className={`block mb-1.5 ${styles.label}`}>
              Table Name
            </label>
            <input
              id="table-name"
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="my_table"
              className={`w-full ${styles.input}`}
              autoFocus
            />
          </div>

          {/* Columns */}
          <div className="mb-4">
            <div className={`mb-3 ${styles.label}`}>Columns</div>

            {/* Mobile: Card Layout */}
            <div className="sm:hidden space-y-2">
              {columns.map((col, index) => (
                <div key={col.id} className="space-y-2 p-3 bg-white/50 rounded-lg border border-black/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium opacity-60">Column {index + 1}</span>
                    <button
                      onClick={() => handleRemoveColumn(col.id)}
                      disabled={columns.length <= 1}
                      className={`p-1 opacity-60 hover:opacity-100 ${columns.length <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => handleColumnChange(col.id, "name", e.target.value)}
                    placeholder="column_name"
                    className={`w-full ${styles.input}`}
                  />
                  <select
                    value={col.type}
                    onChange={(e) => handleColumnChange(col.id, "type", e.target.value)}
                    className={`w-full ${styles.select}`}
                  >
                    {DATA_TYPES.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.types.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        checked={col.isPrimaryKey}
                        onChange={() => handleColumnChange(col.id, "isPrimaryKey", true)}
                      />
                      Primary Key
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={col.nullable}
                        onChange={(e) => handleColumnChange(col.id, "nullable", e.target.checked)}
                        disabled={col.isPrimaryKey}
                      />
                      Nullable
                    </label>
                  </div>
                  <input
                    type="text"
                    value={col.defaultValue}
                    onChange={(e) => handleColumnChange(col.id, "defaultValue", e.target.value)}
                    placeholder="Default value"
                    className={`w-full ${styles.input}`}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden sm:block">
              <div
                className="grid gap-x-3 gap-y-2 items-center"
                style={{ gridTemplateColumns: "1fr 130px 40px 50px 110px 32px" }}
              >
                {/* Header Row */}
                <div className="text-[11px] font-medium opacity-50 uppercase tracking-wide">Name</div>
                <div className="text-[11px] font-medium opacity-50 uppercase tracking-wide">Type</div>
                <div className="text-[11px] font-medium opacity-50 uppercase tracking-wide text-center">PK</div>
                <div className="text-[11px] font-medium opacity-50 uppercase tracking-wide text-center">Null</div>
                <div className="text-[11px] font-medium opacity-50 uppercase tracking-wide">Default</div>
                <div></div>

                {/* Data Rows */}
                {columns.map((col, index) => (
                  <React.Fragment key={col.id}>
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => handleColumnChange(col.id, "name", e.target.value)}
                      placeholder="column_name"
                      className={styles.input}
                    />
                    <select
                      value={col.type}
                      onChange={(e) => handleColumnChange(col.id, "type", e.target.value)}
                      className={styles.select}
                    >
                      {DATA_TYPES.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.types.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        checked={col.isPrimaryKey}
                        onChange={() => handleColumnChange(col.id, "isPrimaryKey", true)}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={col.nullable}
                        onChange={(e) => handleColumnChange(col.id, "nullable", e.target.checked)}
                        disabled={col.isPrimaryKey}
                        className={`w-4 h-4 ${col.isPrimaryKey ? "opacity-30 cursor-not-allowed" : ""}`}
                      />
                    </div>
                    <input
                      type="text"
                      value={col.defaultValue}
                      onChange={(e) => handleColumnChange(col.id, "defaultValue", e.target.value)}
                      placeholder="DEFAULT"
                      className={styles.input}
                    />
                    <button
                      onClick={() => handleRemoveColumn(col.id)}
                      disabled={columns.length <= 1}
                      className={`flex justify-center p-1 opacity-60 hover:opacity-100 ${columns.length <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Add Column Button */}
            <button
              onClick={handleAddColumn}
              className={`mt-3 flex items-center gap-1.5 text-[13px] opacity-70 hover:opacity-100`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Column</span>
            </button>
          </div>

          {/* SQL Preview */}
          <div className="mb-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-[13px] font-medium opacity-70 hover:opacity-100"
            >
              {showPreview ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span>SQL Preview</span>
            </button>
            {showPreview && (
              <pre className={`mt-2 ${styles.preview}`}>
                {generatedSQL || "-- Enter table name and columns to see preview"}
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-2 px-4 py-3 border-t shrink-0"
          style={{
            borderColor: theme === "platinum" ? "#808080" : theme === "aqua" ? "#c0c0c0" : "#e7e5e4",
            background: theme === "platinum" ? "#cccccc" : theme === "aqua" ? "#e8e8e8" : "#f5f5f4"
          }}
        >
          <button onClick={onClose} disabled={isCreating} className={styles.button}>
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isCreating || !generatedSQL}
            className={`${styles.buttonPrimary} flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Table"
            )}
          </button>
        </div>

        {/* Resize handle */}
        {!isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize flex items-end justify-end p-1"
            onMouseDown={handleResizeStart}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
              <path d="M14 2L2 14M14 7L7 14M14 12L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
