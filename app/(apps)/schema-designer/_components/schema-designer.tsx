"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type OnConnect,
  type NodeTypes,
  MarkerType,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Plus,
  Code,
  Trash2,
  Upload,
} from "lucide-react";
import type { Schema, Table } from "../_lib/types";
import { generateId } from "../_lib/utils";
import { saveSchema, loadSchema, clearSchema } from "../_lib/storage";
import { TableNode, type TableNodeData, type TableNodeType } from "./table-node";
import { SQLPanel } from "./sql-panel";
import { ImportPanel } from "./import-panel";
import { cn } from "@/lib/utils";

const INITIAL_SCHEMA: Schema = { tables: [] };

// Define node types
const nodeTypes: NodeTypes = {
  table: TableNode,
};

// Convert schema to React Flow nodes
function schemaToNodes(schema: Schema, onUpdate: (tableId: string, table: Table) => void, onDelete: (tableId: string) => void): TableNodeType[] {
  return schema.tables.map((table) => ({
    id: table.id,
    type: "table",
    position: table.position,
    data: {
      table,
      schema,
      onUpdate: (updatedTable: Table) => onUpdate(table.id, updatedTable),
      onDelete: () => onDelete(table.id),
    },
    dragHandle: ".drag-handle",
  }));
}

// Convert schema to React Flow edges (foreign key relationships)
function schemaToEdges(schema: Schema): Edge[] {
  const edges: Edge[] = [];

  for (const table of schema.tables) {
    for (const column of table.columns) {
      if (column.foreignKey) {
        const targetTable = schema.tables.find((t) => t.id === column.foreignKey?.tableId);
        const targetColumn = targetTable?.columns.find((c) => c.id === column.foreignKey?.columnId);

        if (targetTable && targetColumn) {
          edges.push({
            id: `${table.id}-${column.id}-${targetTable.id}-${targetColumn.id}`,
            source: table.id,
            target: targetTable.id,
            sourceHandle: `${table.id}-${column.id}`,
            targetHandle: `${targetTable.id}-${targetColumn.id}-target`,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#3b82f6",
            },
          });
        }
      }
    }
  }

  return edges;
}

export function SchemaDesigner() {
  const [schema, setSchema] = useState<Schema>(INITIAL_SCHEMA);
  const [nodes, setNodes, onNodesChange] = useNodesState<TableNodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isSQLPanelOpen, setIsSQLPanelOpen] = useState(false);
  const [isImportPanelOpen, setIsImportPanelOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadSchema();
    if (saved) {
      setSchema(saved);
    }
    setIsLoaded(true);
  }, []);

  // Update table handler
  const updateTable = useCallback((tableId: string, updatedTable: Table) => {
    setSchema((prev) => {
      const newSchema = {
        ...prev,
        tables: prev.tables.map((t) => (t.id === tableId ? updatedTable : t)),
      };
      saveSchema(newSchema);
      return newSchema;
    });
  }, []);

  // Delete table handler
  const deleteTable = useCallback((tableId: string) => {
    setSchema((prev) => {
      // Remove foreign keys pointing to this table
      const updatedTables = prev.tables
        .filter((t) => t.id !== tableId)
        .map((table) => ({
          ...table,
          columns: table.columns.map((col) => ({
            ...col,
            foreignKey: col.foreignKey?.tableId === tableId ? null : col.foreignKey,
          })),
        }));
      const newSchema = { ...prev, tables: updatedTables };
      saveSchema(newSchema);
      return newSchema;
    });
  }, []);

  // Update nodes when schema changes
  useEffect(() => {
    if (!isLoaded) return;

    const newNodes = schemaToNodes(schema, updateTable, deleteTable);
    const newEdges = schemaToEdges(schema);

    setNodes(newNodes);
    setEdges(newEdges);
  }, [schema, isLoaded, updateTable, deleteTable, setNodes, setEdges]);

  // Handle node position changes
  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);

      // Update schema positions on drag end
      const dragEndChange = changes.find((c: any) => c.type === "position" && c.dragging === false);
      if (dragEndChange) {
        setSchema((prev) => {
          const newSchema = {
            ...prev,
            tables: prev.tables.map((table) => {
              const node = nodes.find((n) => n.id === table.id);
              if (node && node.position) {
                return { ...table, position: node.position };
              }
              return table;
            }),
          };
          saveSchema(newSchema);
          return newSchema;
        });
      }
    },
    [onNodesChange, nodes]
  );

  // Handle new connections (creating foreign keys)
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
        return;
      }

      // Parse source handle to get column id
      const sourceColumnId = connection.sourceHandle.replace(`${connection.source}-`, "");
      // Parse target handle to get column id (remove -target suffix)
      const targetColumnId = connection.targetHandle.replace(`${connection.target}-`, "").replace("-target", "");

      // Update schema with new foreign key
      setSchema((prev) => {
        const newSchema = {
          ...prev,
          tables: prev.tables.map((table) => {
            if (table.id === connection.source) {
              return {
                ...table,
                columns: table.columns.map((col) => {
                  if (col.id === sourceColumnId) {
                    return {
                      ...col,
                      foreignKey: {
                        tableId: connection.target!,
                        columnId: targetColumnId,
                      },
                    };
                  }
                  return col;
                }),
              };
            }
            return table;
          }),
        };
        saveSchema(newSchema);
        return newSchema;
      });
    },
    []
  );

  // Add new table
  const addTable = useCallback(() => {
    const newTable: Table = {
      id: generateId(),
      name: `table_${schema.tables.length + 1}`,
      columns: [
        {
          id: generateId(),
          name: "id",
          type: "SERIAL",
          isPrimaryKey: true,
          isNotNull: true,
          isUnique: false,
          foreignKey: null,
        },
      ],
      position: {
        x: 100 + (schema.tables.length % 3) * 420,
        y: 100 + Math.floor(schema.tables.length / 3) * 300,
      },
    };

    setSchema((prev) => {
      const newSchema = { ...prev, tables: [...prev.tables, newTable] };
      saveSchema(newSchema);
      return newSchema;
    });
  }, [schema.tables.length]);

  // Clear all tables
  const clearAll = useCallback(() => {
    if (confirm("Are you sure you want to clear all tables?")) {
      clearSchema();
      setSchema(INITIAL_SCHEMA);
    }
  }, []);

  // Import handler
  const handleImport = useCallback(
    (importedSchema: Schema, mode: "replace" | "merge") => {
      setSchema(importedSchema);
      saveSchema(importedSchema);
      setIsImportPanelOpen(false);
    },
    []
  );

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
        <div className="animate-pulse text-zinc-400 dark:text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Toolbar */}
      <header
        className={cn(
          "flex items-center justify-between px-4 py-2",
          "bg-white dark:bg-zinc-900",
          "border-b border-zinc-200 dark:border-zinc-800"
        )}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Schema Designer
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearAll}
            className={cn(
              "p-1.5 rounded-md transition-colors cursor-pointer",
              "text-zinc-400 dark:text-zinc-500",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "hover:text-zinc-600 dark:hover:text-zinc-400"
            )}
            title="Clear All"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsImportPanelOpen(true)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
              "bg-zinc-100 dark:bg-zinc-800",
              "text-zinc-700 dark:text-zinc-300",
              "hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "transition-colors cursor-pointer"
            )}
          >
            <Upload className="w-4 h-4" />
            Import
          </button>

          <button
            onClick={() => setIsSQLPanelOpen(true)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
              "bg-zinc-100 dark:bg-zinc-800",
              "text-zinc-700 dark:text-zinc-300",
              "hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "transition-colors cursor-pointer"
            )}
          >
            <Code className="w-4 h-4" />
            Export SQL
          </button>
        </div>
      </header>

      {/* Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
          connectionLineStyle={{ stroke: "#3b82f6", strokeWidth: 2 }}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#3b82f6",
            },
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          <Controls showInteractive={false} />
          <MiniMap
            nodeStrokeColor="#3b82f6"
            nodeColor="#e4e4e7"
            nodeBorderRadius={8}
          />
        </ReactFlow>

        {/* Empty State */}
        {schema.tables.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center pointer-events-auto">
              <div
                className={cn(
                  "w-16 h-16 mx-auto mb-4 rounded-2xl",
                  "bg-zinc-200 dark:bg-zinc-800",
                  "flex items-center justify-center"
                )}
              >
                <Plus className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
              </div>
              <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
                No tables yet
              </h2>
              <button
                onClick={addTable}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium",
                  "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
                  "text-white",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-200",
                  "cursor-pointer"
                )}
              >
                <Plus className="w-5 h-5" />
                Add Table
              </button>
            </div>
          </div>
        )}

        {/* Add Table Button - Bottom Center */}
        {schema.tables.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={addTable}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium",
                "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
                "text-white",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-200",
                "cursor-pointer"
              )}
            >
              <Plus className="w-5 h-5" />
              Add Table
            </button>
          </div>
        )}
      </div>

      {/* SQL Panel */}
      <SQLPanel
        schema={schema}
        isOpen={isSQLPanelOpen}
        onClose={() => setIsSQLPanelOpen(false)}
      />

      {/* Import Panel */}
      <ImportPanel
        isOpen={isImportPanelOpen}
        onClose={() => setIsImportPanelOpen(false)}
        onImport={handleImport}
        existingSchema={schema}
        canvasOffset={{ x: 0, y: 0 }}
        zoom={1}
      />
    </div>
  );
}
