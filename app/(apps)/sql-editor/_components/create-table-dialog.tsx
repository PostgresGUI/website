"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Loader2, Plus, Trash2, ChevronDown, ChevronRight, Key } from "lucide-react";

// Common PostgreSQL data types
const DATA_TYPES = [
  { group: "Numeric", types: ["SERIAL", "INTEGER", "BIGINT", "DECIMAL", "NUMERIC", "REAL"] },
  { group: "Text", types: ["VARCHAR", "TEXT", "CHAR"] },
  { group: "Date/Time", types: ["TIMESTAMP", "DATE", "TIME", "INTERVAL"] },
  { group: "Boolean", types: ["BOOLEAN"] },
  { group: "Other", types: ["UUID", "JSON", "JSONB"] },
];

const ALL_TYPES = DATA_TYPES.flatMap((g) => g.types);

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
  // Theme customization
  overlayClassName?: string;
  dialogClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  bodyClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  selectClassName?: string;
  footerClassName?: string;
  cancelButtonClassName?: string;
  createButtonClassName?: string;
  errorClassName?: string;
  sectionClassName?: string;
  columnRowClassName?: string;
  addButtonClassName?: string;
  removeButtonClassName?: string;
  previewClassName?: string;
  previewHeaderClassName?: string;
  previewCodeClassName?: string;
  checkboxClassName?: string;
  radioClassName?: string;
}

export function CreateTableDialog({
  isOpen,
  onClose,
  onCreateTable,
  existingTables,
  overlayClassName = "",
  dialogClassName = "",
  headerClassName = "",
  titleClassName = "",
  closeButtonClassName = "",
  bodyClassName = "",
  labelClassName = "",
  inputClassName = "",
  selectClassName = "",
  footerClassName = "",
  cancelButtonClassName = "",
  createButtonClassName = "",
  errorClassName = "",
  sectionClassName = "",
  columnRowClassName = "",
  addButtonClassName = "",
  removeButtonClassName = "",
  previewClassName = "",
  previewHeaderClassName = "",
  previewCodeClassName = "",
  checkboxClassName = "",
  radioClassName = "",
}: CreateTableDialogProps) {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState<Column[]>([createEmptyColumn(true)]);
  const [showPreview, setShowPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTableName("");
      setColumns([createEmptyColumn(true)]);
      setShowPreview(false);
      setError(null);
    }
  }, [isOpen]);

  const generatedSQL = generateSQL(tableName, columns);

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
          // If setting a new primary key, unset others
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

  if (!isOpen) return null;

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-table-title"
    >
      <div
        className={`relative w-full max-w-xl mx-4 max-h-[85%] flex flex-col ${dialogClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 ${headerClassName}`}>
          <h2 id="create-table-title" className={titleClassName}>
            Create Table
          </h2>
          <button
            onClick={onClose}
            className={closeButtonClassName}
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className={`flex-1 overflow-y-auto px-4 py-3 ${bodyClassName}`}>
          {/* Error */}
          {error && (
            <div className={`mb-4 p-3 flex items-start gap-2 ${errorClassName}`} role="alert">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Table Name */}
          <div className={`mb-4 ${sectionClassName}`}>
            <label htmlFor="table-name" className={`block mb-1.5 ${labelClassName}`}>
              Table Name
            </label>
            <input
              id="table-name"
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="my_table"
              className={`w-full ${inputClassName}`}
              autoFocus
            />
          </div>

          {/* Columns */}
          <div className={sectionClassName}>
            <div className={`mb-2 ${labelClassName}`}>Columns</div>

            {/* Column Header - Desktop */}
            <div className="hidden sm:grid sm:grid-cols-[1fr_120px_40px_50px_100px_32px] gap-2 mb-2 px-1 text-[11px] font-medium text-stone-500 uppercase tracking-wide">
              <span>Name</span>
              <span>Type</span>
              <span className="text-center">PK</span>
              <span className="text-center">Null</span>
              <span>Default</span>
              <span></span>
            </div>

            {/* Column Rows */}
            <div className="space-y-2">
              {columns.map((col, index) => (
                <div
                  key={col.id}
                  className={`${columnRowClassName} sm:grid sm:grid-cols-[1fr_120px_40px_50px_100px_32px] sm:gap-2 sm:items-center`}
                >
                  {/* Mobile: Card Layout */}
                  <div className="sm:hidden space-y-2 p-3 bg-stone-100 rounded-lg mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-500">Column {index + 1}</span>
                      <button
                        onClick={() => handleRemoveColumn(col.id)}
                        disabled={columns.length <= 1}
                        className={`p-1 ${removeButtonClassName} ${columns.length <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                        aria-label={`Remove column ${col.name || index + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => handleColumnChange(col.id, "name", e.target.value)}
                      placeholder="column_name"
                      className={`w-full ${inputClassName}`}
                      aria-label="Column name"
                    />
                    <select
                      value={col.type}
                      onChange={(e) => handleColumnChange(col.id, "type", e.target.value)}
                      className={`w-full ${selectClassName}`}
                      aria-label="Column type"
                    >
                      {DATA_TYPES.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.types.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="primaryKey"
                          checked={col.isPrimaryKey}
                          onChange={() => handleColumnChange(col.id, "isPrimaryKey", true)}
                          className={radioClassName}
                        />
                        Primary Key
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={col.nullable}
                          onChange={(e) => handleColumnChange(col.id, "nullable", e.target.checked)}
                          disabled={col.isPrimaryKey}
                          className={checkboxClassName}
                        />
                        Nullable
                      </label>
                    </div>
                    <input
                      type="text"
                      value={col.defaultValue}
                      onChange={(e) => handleColumnChange(col.id, "defaultValue", e.target.value)}
                      placeholder="Default value"
                      className={`w-full ${inputClassName}`}
                      aria-label="Default value"
                    />
                  </div>

                  {/* Desktop: Row Layout */}
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => handleColumnChange(col.id, "name", e.target.value)}
                    placeholder="column_name"
                    className={`hidden sm:block ${inputClassName}`}
                    aria-label="Column name"
                  />
                  <select
                    value={col.type}
                    onChange={(e) => handleColumnChange(col.id, "type", e.target.value)}
                    className={`hidden sm:block ${selectClassName}`}
                    aria-label="Column type"
                  >
                    {DATA_TYPES.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.types.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="hidden sm:flex justify-center">
                    <input
                      type="radio"
                      name="primaryKey"
                      checked={col.isPrimaryKey}
                      onChange={() => handleColumnChange(col.id, "isPrimaryKey", true)}
                      className={radioClassName}
                      aria-label={`Set ${col.name || "this column"} as primary key`}
                    />
                  </div>
                  <div className="hidden sm:flex justify-center">
                    <input
                      type="checkbox"
                      checked={col.nullable}
                      onChange={(e) => handleColumnChange(col.id, "nullable", e.target.checked)}
                      disabled={col.isPrimaryKey}
                      className={`${checkboxClassName} ${col.isPrimaryKey ? "opacity-30 cursor-not-allowed" : ""}`}
                      aria-label={`Make ${col.name || "this column"} nullable`}
                    />
                  </div>
                  <input
                    type="text"
                    value={col.defaultValue}
                    onChange={(e) => handleColumnChange(col.id, "defaultValue", e.target.value)}
                    placeholder="DEFAULT"
                    className={`hidden sm:block ${inputClassName}`}
                    aria-label="Default value"
                  />
                  <button
                    onClick={() => handleRemoveColumn(col.id)}
                    disabled={columns.length <= 1}
                    className={`hidden sm:flex justify-center ${removeButtonClassName} ${columns.length <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                    aria-label={`Remove column ${col.name || index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Column Button */}
            <button
              onClick={handleAddColumn}
              className={`mt-3 flex items-center gap-1.5 ${addButtonClassName}`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Column</span>
            </button>
          </div>

          {/* SQL Preview */}
          <div className={`mt-4 ${previewClassName}`}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-1.5 ${previewHeaderClassName}`}
            >
              {showPreview ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span>SQL Preview</span>
            </button>
            {showPreview && (
              <pre className={`mt-2 ${previewCodeClassName}`}>
                {generatedSQL || "-- Enter table name and columns to see preview"}
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-2 px-4 py-3 ${footerClassName}`}>
          <button onClick={onClose} disabled={isCreating} className={cancelButtonClassName}>
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isCreating || !generatedSQL}
            className={createButtonClassName}
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
      </div>
    </div>
  );
}
