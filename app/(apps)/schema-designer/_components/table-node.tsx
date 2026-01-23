"use client";

import { memo, useState, useRef, useEffect, useCallback } from "react";
import { Handle, Position, type NodeProps, type Node as FlowNode } from "@xyflow/react";
import {
  GripVertical,
  Plus,
  Trash2,
  MoreHorizontal,
  Key,
  Link2,
  ChevronDown,
  Pencil,
} from "lucide-react";
import type { Table, Column, Schema, PostgresType } from "../_lib/types";
import { TYPE_CATEGORIES } from "../_lib/types";
import { generateId } from "../_lib/utils";
import { cn } from "@/lib/utils";

export interface TableNodeData extends Record<string, unknown> {
  table: Table;
  schema: Schema;
  onUpdate: (table: Table) => void;
  onDelete: () => void;
}

export type TableNodeType = FlowNode<TableNodeData, "table">;

function TableNodeComponent({ data, selected }: NodeProps<TableNodeType>) {
  const { table, schema, onUpdate, onDelete } = data;
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addColumn = useCallback(() => {
    const newColumn: Column = {
      id: generateId(),
      name: `column_${table.columns.length + 1}`,
      type: "TEXT",
      isPrimaryKey: false,
      isNotNull: false,
      isUnique: false,
      foreignKey: null,
    };
    onUpdate({ ...table, columns: [...table.columns, newColumn] });
  }, [table, onUpdate]);

  const updateColumn = useCallback(
    (columnId: string, updates: Partial<Column>) => {
      const updatedColumns = table.columns.map((col) =>
        col.id === columnId ? { ...col, ...updates } : col
      );
      onUpdate({ ...table, columns: updatedColumns });
    },
    [table, onUpdate]
  );

  const deleteColumn = useCallback(
    (columnId: string) => {
      onUpdate({
        ...table,
        columns: table.columns.filter((col) => col.id !== columnId),
      });
    },
    [table, onUpdate]
  );

  return (
    <div
      className={cn(
        "w-[380px] rounded-2xl",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-700",
        "shadow-lg dark:shadow-2xl dark:shadow-black/30",
        "transition-[box-shadow,ring-color,border-color] duration-200",
        selected && "ring-2 ring-blue-500 dark:ring-blue-400"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "drag-handle flex items-center gap-3 px-4 py-3.5",
          "bg-zinc-50 dark:bg-zinc-800/80",
          "border-b border-zinc-200 dark:border-zinc-700",
          "cursor-grab active:cursor-grabbing",
          "rounded-t-2xl"
        )}
      >
        <GripVertical className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 drag-handle" />

        <div className="relative flex-1 min-w-0 group/title">
          {isEditing ? (
            <input
              ref={nameInputRef}
              autoFocus
              type="text"
              value={table.name}
              onChange={(e) => onUpdate({ ...table, name: e.target.value })}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  setIsEditing(false);
                }
              }}
              className={cn(
                "nodrag w-full px-2 py-1 text-base font-semibold tracking-tight rounded-lg",
                "text-zinc-800 dark:text-zinc-100",
                "bg-white dark:bg-zinc-900 border border-blue-500 ring-2 ring-blue-500/20",
                "focus:outline-none",
                "transition-all"
              )}
            />
          ) : (
            <div className="flex items-center gap-2 px-2 py-1 border border-transparent rounded-lg">
              <span className="text-base font-semibold tracking-tight truncate text-zinc-800 dark:text-zinc-100">
                {table.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className={cn(
                  "nodrag p-1 rounded-md shrink-0",
                  "opacity-0 group-hover/title:opacity-100",
                  "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                  "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                  "transition-all cursor-pointer"
                )}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={cn(
              "nodrag p-1.5 rounded-lg",
              "text-zinc-400 dark:text-zinc-500",
              "hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "hover:text-zinc-600 dark:hover:text-zinc-300",
              "transition-colors cursor-pointer"
            )}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <div
              className={cn(
                "absolute right-0 top-full mt-1 z-50",
                "p-1 rounded-lg",
                "bg-white dark:bg-zinc-800",
                "border border-zinc-200 dark:border-zinc-700",
                "shadow-xl dark:shadow-2xl dark:shadow-black/40"
              )}
            >
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className={cn(
                  "px-2.5 py-1.5 text-xs rounded-md",
                  "flex items-center gap-1.5",
                  "text-red-600 dark:text-red-400",
                  "hover:bg-red-50 dark:hover:bg-red-900/20",
                  "transition-colors cursor-pointer"
                )}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="py-1">
        {table.columns.map((column, index) => (
          <ColumnRow
            key={column.id}
            column={column}
            schema={schema}
            tableId={table.id}
            columnIndex={index}
            onUpdate={(updates) => updateColumn(column.id, updates)}
            onDelete={() => deleteColumn(column.id)}
          />
        ))}
      </div>

      {/* Add Column Button */}
      <button
        onClick={addColumn}
        className={cn(
          "w-full px-4 py-3 text-sm",
          "flex items-center justify-center gap-2",
          "text-zinc-400 dark:text-zinc-500",
          "hover:text-blue-600 dark:hover:text-blue-400",
          "hover:bg-blue-50 dark:hover:bg-blue-900/10",
          "border-t border-zinc-100 dark:border-zinc-800",
          "transition-colors cursor-pointer",
          "rounded-b-2xl"
        )}
      >
        <Plus className="w-4 h-4" />
        Add Column
      </button>
    </div>
  );
}

interface ColumnRowProps {
  column: Column;
  schema: Schema;
  tableId: string;
  columnIndex: number;
  onUpdate: (updates: Partial<Column>) => void;
  onDelete: () => void;
}

function ColumnRow({
  column,
  schema,
  tableId,
  columnIndex,
  onUpdate,
  onDelete,
}: ColumnRowProps) {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setShowTypeDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFKReference = () => {
    if (!column.foreignKey) return null;
    const refTable = schema.tables.find((t) => t.id === column.foreignKey?.tableId);
    const refColumn = refTable?.columns.find((c) => c.id === column.foreignKey?.columnId);
    if (refTable && refColumn) {
      return { table: refTable.name, column: refColumn.name };
    }
    return null;
  };

  const fkRefData = getFKReference();
  const handleId = `${tableId}-${column.id}`;

  return (
    <div
      className={cn(
        "group relative flex items-center gap-2.5 px-4 py-2.5",
        "transition-all duration-150",
        "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      )}
    >
      {/* Left icon - PK/FK indicator */}
      <div
        className={cn(
          "w-6 h-6 flex items-center justify-center shrink-0 rounded",
          column.isPrimaryKey && "text-amber-500 dark:text-amber-400",
          column.foreignKey && !column.isPrimaryKey && "text-blue-500 dark:text-blue-400",
          !column.isPrimaryKey && !column.foreignKey && "text-zinc-300 dark:text-zinc-600"
        )}
      >
        {column.isPrimaryKey ? (
          <Key className="w-4 h-4" />
        ) : column.foreignKey ? (
          <Link2 className="w-4 h-4" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-current" />
        )}
      </div>

      {/* Column Name */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <input
          type="text"
          value={column.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className={cn(
            "w-full px-1.5 py-0.5 text-sm font-mono rounded-md",
            "text-zinc-700 dark:text-zinc-200",
            "bg-transparent border border-transparent",
            "hover:border-zinc-300 dark:hover:border-zinc-600",
            "focus:bg-white dark:focus:bg-zinc-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",
            "transition-all"
          )}
        />
        {fkRefData && (
          <span className="text-xs text-blue-500 dark:text-blue-400 truncate px-1.5">
            → {fkRefData.table}.{fkRefData.column}
          </span>
        )}
      </div>

      {/* Type Selector */}
      <div className="relative" ref={typeRef}>
        <button
          onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          className={cn(
            "px-2 py-1 text-xs font-mono rounded-md",
            "bg-zinc-100 dark:bg-zinc-800",
            "text-zinc-500 dark:text-zinc-400",
            "hover:bg-zinc-200 dark:hover:bg-zinc-700",
            "transition-colors cursor-pointer"
          )}
        >
          {column.type}
        </button>

        {showTypeDropdown && (
          <div
            className={cn(
              "absolute right-0 top-full mt-1 z-50",
              "w-44 max-h-64 overflow-auto py-1 rounded-lg",
              "bg-white dark:bg-zinc-800",
              "border border-zinc-200 dark:border-zinc-700",
              "shadow-xl dark:shadow-2xl dark:shadow-black/40"
            )}
          >
            {Object.entries(TYPE_CATEGORIES).map(([category, types]) => (
              <div key={category}>
                <div className="px-2 py-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {category}
                </div>
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onUpdate({ type });
                      setShowTypeDropdown(false);
                    }}
                    className={cn(
                      "w-full px-2 py-1 text-left text-xs font-mono",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
                      "transition-colors cursor-pointer",
                      column.type === type
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-zinc-700 dark:text-zinc-300"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Constraint Toggles */}
      <div className="flex items-center gap-1">
        <ConstraintButton
          label="PK"
          title="Primary Key"
          isActive={column.isPrimaryKey}
          onClick={() => onUpdate({ isPrimaryKey: !column.isPrimaryKey })}
          activeColor="amber"
        />
        <ConstraintButton
          label="NN"
          title="Not Null"
          isActive={column.isNotNull}
          onClick={() => onUpdate({ isNotNull: !column.isNotNull })}
          activeColor="emerald"
        />
        <ConstraintButton
          label="UQ"
          title="Unique"
          isActive={column.isUnique}
          onClick={() => onUpdate({ isUnique: !column.isUnique })}
          activeColor="violet"
        />
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className={cn(
          "p-1 rounded-md opacity-0 group-hover:opacity-100",
          "text-zinc-400 dark:text-zinc-500",
          "hover:text-red-500 dark:hover:text-red-400",
          "hover:bg-red-50 dark:hover:bg-red-900/20",
          "transition-all cursor-pointer"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* React Flow Handle - Source (right side) */}
      <Handle
        type="source"
        position={Position.Right}
        id={handleId}
        className={cn(
          "!w-4 !h-4 !rounded-full !border-2",
          "!bg-blue-500 !border-blue-300 dark:!border-blue-600",
          "hover:!bg-blue-600 hover:!scale-125",
          "transition-all duration-150",
          column.foreignKey && "!opacity-100",
          !column.foreignKey && "!opacity-0 group-hover:!opacity-100"
        )}
        style={{
          right: -8,
          top: "50%",
        }}
      />

      {/* React Flow Handle - Target (left side) */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${handleId}-target`}
        className={cn(
          "!w-4 !h-4 !rounded-full !border-2",
          "!bg-emerald-500 !border-emerald-300 dark:!border-emerald-600",
          "hover:!bg-emerald-600 hover:!scale-125",
          "transition-all duration-150",
          "!opacity-0 group-hover:!opacity-100"
        )}
        style={{
          left: -8,
          top: "50%",
        }}
      />
    </div>
  );
}

interface ConstraintButtonProps {
  label: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
  activeColor: "amber" | "emerald" | "violet";
}

function ConstraintButton({
  label,
  title,
  isActive,
  onClick,
  activeColor,
}: ConstraintButtonProps) {
  const colorClasses = {
    amber: isActive
      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700"
      : "",
    emerald: isActive
      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
      : "",
    violet: isActive
      ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-700"
      : "",
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "px-1.5 py-1 text-[10px] font-semibold rounded-md border",
        "transition-all cursor-pointer",
        isActive
          ? colorClasses[activeColor]
          : "border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      )}
    >
      {label}
    </button>
  );
}

export const TableNode = memo(TableNodeComponent);
