"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { formatValue } from "../_lib/utils";

interface EditRowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Record<string, unknown>) => Promise<void>;
  row: Record<string, unknown> | null;
  columns: string[];
  primaryKeyColumn: string | null;
  schema: { name: string; type: string }[];
  // Theme customization
  overlayClassName?: string;
  dialogClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  bodyClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  footerClassName?: string;
  cancelButtonClassName?: string;
  saveButtonClassName?: string;
}

export function EditRowDialog({
  isOpen,
  onClose,
  onSave,
  row,
  columns,
  primaryKeyColumn,
  schema,
  overlayClassName = "",
  dialogClassName = "",
  headerClassName = "",
  titleClassName = "",
  closeButtonClassName = "",
  bodyClassName = "",
  labelClassName = "",
  inputClassName = "",
  footerClassName = "",
  cancelButtonClassName = "",
  saveButtonClassName = "",
}: EditRowDialogProps) {
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize edited values when row changes
  useEffect(() => {
    if (row && isOpen) {
      const initial: Record<string, string> = {};
      columns.forEach((col) => {
        const value = row[col];
        if (value === null) {
          initial[col] = "";
        } else if (value instanceof Date) {
          initial[col] = value.toISOString().slice(0, 19);
        } else {
          initial[col] = String(value);
        }
      });
      setEditedValues(initial);
      setError(null);
    }
  }, [row, columns, isOpen]);

  if (!isOpen || !row) return null;

  const getColumnType = (colName: string): string => {
    const col = schema.find((c) => c.name === colName);
    return col?.type || "text";
  };

  const parseValue = (value: string, type: string): unknown => {
    if (value === "" || value.toLowerCase() === "null") return null;

    const lowerType = type.toLowerCase();
    if (lowerType.includes("int") || lowerType === "serial") {
      const num = parseInt(value, 10);
      return isNaN(num) ? value : num;
    }
    if (lowerType.includes("numeric") || lowerType.includes("decimal") || lowerType.includes("float") || lowerType.includes("double") || lowerType === "real") {
      const num = parseFloat(value);
      return isNaN(num) ? value : num;
    }
    if (lowerType.includes("bool")) {
      return value.toLowerCase() === "true" || value === "1";
    }
    if (lowerType.includes("timestamp") || lowerType.includes("date")) {
      return value;
    }
    return value;
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const updates: Record<string, unknown> = {};
      columns.forEach((col) => {
        if (col !== primaryKeyColumn) {
          const type = getColumnType(col);
          updates[col] = parseValue(editedValues[col], type);
        }
      });

      await onSave(updates);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`relative max-w-md w-full mx-4 max-h-[80%] flex flex-col ${dialogClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 ${headerClassName}`}>
          <h2 className={titleClassName}>Edit Row</h2>
          <button
            onClick={onClose}
            className={closeButtonClassName}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className={`flex-1 overflow-y-auto px-4 py-2 ${bodyClassName}`}>
          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {columns.map((col) => {
              const isPrimaryKey = col === primaryKeyColumn;
              const type = getColumnType(col);

              return (
                <div key={col}>
                  <label className={`block mb-1 ${labelClassName}`}>
                    {col}
                    {isPrimaryKey && (
                      <span className="ml-1 text-xs opacity-60">(Primary Key)</span>
                    )}
                  </label>
                  <input
                    type={type.includes("int") || type.includes("numeric") || type.includes("decimal") ? "number" : "text"}
                    value={editedValues[col] || ""}
                    onChange={(e) =>
                      setEditedValues((prev) => ({ ...prev, [col]: e.target.value }))
                    }
                    disabled={isPrimaryKey}
                    placeholder={isPrimaryKey ? formatValue(row[col]) : "NULL"}
                    className={`w-full ${inputClassName} ${isPrimaryKey ? "opacity-60 cursor-not-allowed" : ""}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-2 px-4 py-3 ${footerClassName}`}>
          <button
            onClick={onClose}
            disabled={isSaving}
            className={cancelButtonClassName}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={saveButtonClassName}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
