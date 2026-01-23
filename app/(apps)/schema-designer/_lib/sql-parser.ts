import type { Schema, Table, Column, PostgresType, ForeignKey } from "./types";
import { POSTGRES_TYPES } from "./types";
import { generateId } from "./utils";

export interface ParsedColumn {
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isNotNull: boolean;
  isUnique: boolean;
  foreignKeyRef: { tableName: string; columnName: string } | null;
}

export interface ParsedTable {
  name: string;
  columns: ParsedColumn[];
}

export interface ParseError {
  line: number;
  message: string;
}

export interface ParseWarning {
  line: number;
  message: string;
}

export interface ParseResult {
  tables: ParsedTable[];
  errors: ParseError[];
  warnings: ParseWarning[];
}

// Type mapping from common SQL types to supported PostgresType
const TYPE_MAP: Record<string, PostgresType> = {
  // Integer types
  INT: "INTEGER",
  INT4: "INTEGER",
  INT8: "BIGINT",
  INT2: "SMALLINT",
  TINYINT: "SMALLINT",
  MEDIUMINT: "INTEGER",

  // Serial types
  SERIAL4: "SERIAL",
  BIGSERIAL: "BIGINT",
  SERIAL8: "BIGINT",
  SMALLSERIAL: "SMALLINT",

  // Float types
  FLOAT: "REAL",
  FLOAT4: "REAL",
  FLOAT8: "DOUBLE PRECISION",
  DOUBLE: "DOUBLE PRECISION",
  DECIMAL: "NUMERIC",

  // Boolean
  BOOL: "BOOLEAN",

  // Text types
  STRING: "TEXT",
  CLOB: "TEXT",
  CHARACTER: "CHAR",
  "CHARACTER VARYING": "VARCHAR",

  // Date/Time
  DATETIME: "TIMESTAMP",
  "TIMESTAMP WITHOUT TIME ZONE": "TIMESTAMP",
  "TIMESTAMP WITH TIME ZONE": "TIMESTAMPTZ",
  "TIME WITHOUT TIME ZONE": "TIME",
  "TIME WITH TIME ZONE": "TIME",

  // Binary
  BLOB: "BYTEA",
  BINARY: "BYTEA",
  VARBINARY: "BYTEA",
};

/**
 * Remove SQL comments from the input
 */
function removeComments(sql: string): string {
  // Remove single-line comments (-- ...)
  let result = sql.replace(/--[^\n]*/g, "");

  // Remove multi-line comments (/* ... */)
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");

  return result;
}

/**
 * Normalize type name to a supported PostgresType
 */
function normalizeType(rawType: string): { type: PostgresType; warning?: string } {
  // Remove parentheses and contents (e.g., VARCHAR(255) -> VARCHAR)
  const baseType = rawType.replace(/\([^)]*\)/g, "").trim().toUpperCase();

  // Check if it's already a supported type
  if (POSTGRES_TYPES.includes(baseType as PostgresType)) {
    return { type: baseType as PostgresType };
  }

  // Check type mapping
  if (TYPE_MAP[baseType]) {
    return { type: TYPE_MAP[baseType] };
  }

  // Special case for DOUBLE PRECISION (two words)
  if (baseType === "DOUBLE" || baseType.startsWith("DOUBLE ")) {
    return { type: "DOUBLE PRECISION" };
  }

  // Unknown type - default to TEXT with warning
  return {
    type: "TEXT",
    warning: `Unknown type "${rawType}" converted to TEXT`,
  };
}

/**
 * Parse a single column definition
 */
function parseColumnDef(
  columnDef: string,
  lineNumber: number
): { column: ParsedColumn; warnings: ParseWarning[] } | null {
  const warnings: ParseWarning[] = [];
  const def = columnDef.trim();

  if (!def) return null;

  // Extract column name (handles quoted identifiers)
  const nameMatch = def.match(/^(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s+(.+)$/i);
  if (!nameMatch) return null;

  const name = nameMatch[1] || nameMatch[2];
  const rest = nameMatch[3];

  // Extract type (first word or quoted identifier, possibly with parentheses)
  const typeMatch = rest.match(/^([A-Z][A-Z0-9_]*(?:\s+[A-Z]+)?(?:\([^)]*\))?)/i);
  if (!typeMatch) return null;

  const rawType = typeMatch[1];
  const { type, warning } = normalizeType(rawType);
  if (warning) {
    warnings.push({ line: lineNumber, message: warning });
  }

  const upperRest = rest.toUpperCase();

  // Check for PRIMARY KEY
  const isPrimaryKey = /\bPRIMARY\s+KEY\b/i.test(rest);

  // Check for NOT NULL
  const isNotNull = /\bNOT\s+NULL\b/i.test(rest) || isPrimaryKey;

  // Check for UNIQUE
  const isUnique = /\bUNIQUE\b/i.test(rest);

  // Check for inline REFERENCES (foreign key)
  let foreignKeyRef: { tableName: string; columnName: string } | null = null;
  const fkMatch = rest.match(/\bREFERENCES\s+(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*\(\s*(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*\)/i);
  if (fkMatch) {
    const tableName = fkMatch[1] || fkMatch[2];
    const columnName = fkMatch[3] || fkMatch[4];
    foreignKeyRef = { tableName, columnName };
  }

  return {
    column: {
      name,
      type: type,
      isPrimaryKey,
      isNotNull,
      isUnique,
      foreignKeyRef,
    },
    warnings,
  };
}

/**
 * Parse table-level constraints (FOREIGN KEY, PRIMARY KEY)
 */
function parseTableConstraints(
  body: string,
  columns: ParsedColumn[],
  lineNumber: number
): { updatedColumns: ParsedColumn[]; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const updatedColumns = [...columns];

  // Find FOREIGN KEY constraints
  const fkRegex = /\bFOREIGN\s+KEY\s*\(\s*(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*\)\s*REFERENCES\s+(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*\(\s*(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*\)/gi;
  let fkMatch;
  while ((fkMatch = fkRegex.exec(body)) !== null) {
    const columnName = fkMatch[1] || fkMatch[2];
    const tableName = fkMatch[3] || fkMatch[4];
    const refColumnName = fkMatch[5] || fkMatch[6];

    const column = updatedColumns.find(
      (c) => c.name.toLowerCase() === columnName.toLowerCase()
    );
    if (column) {
      column.foreignKeyRef = { tableName, columnName: refColumnName };
    }
  }

  // Find table-level PRIMARY KEY
  const pkMatch = body.match(/\bPRIMARY\s+KEY\s*\(\s*([^)]+)\s*\)/i);
  if (pkMatch) {
    const pkColumns = pkMatch[1].split(",").map((c) => {
      const match = c.trim().match(/^(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))$/);
      return match ? (match[1] || match[2]).toLowerCase() : c.trim().toLowerCase();
    });

    for (const pkCol of pkColumns) {
      const column = updatedColumns.find(
        (c) => c.name.toLowerCase() === pkCol
      );
      if (column) {
        column.isPrimaryKey = true;
        column.isNotNull = true;
      }
    }
  }

  return { updatedColumns, warnings };
}

/**
 * Split column definitions properly handling nested parentheses
 */
function splitColumnDefs(body: string): string[] {
  const results: string[] = [];
  let current = "";
  let depth = 0;

  for (const char of body) {
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (char === "," && depth === 0) {
      if (current.trim()) {
        results.push(current.trim());
      }
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    results.push(current.trim());
  }

  return results;
}

/**
 * Check if a column definition is a constraint (not a column)
 */
function isConstraint(def: string): boolean {
  const upper = def.trim().toUpperCase();
  return (
    upper.startsWith("CONSTRAINT ") ||
    upper.startsWith("PRIMARY KEY") ||
    upper.startsWith("FOREIGN KEY") ||
    upper.startsWith("UNIQUE") ||
    upper.startsWith("CHECK") ||
    upper.startsWith("EXCLUDE")
  );
}

/**
 * Parse CREATE TABLE statements from SQL
 */
export function parseSQL(sql: string): ParseResult {
  const errors: ParseError[] = [];
  const warnings: ParseWarning[] = [];
  const tables: ParsedTable[] = [];

  // Remove comments
  const cleanSQL = removeComments(sql);

  // Find CREATE TABLE statements
  const createTableRegex =
    /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_]*))\s*\(([^;]*)\)/gi;

  let match;
  let lineNumber = 1;

  while ((match = createTableRegex.exec(cleanSQL)) !== null) {
    // Calculate approximate line number
    const beforeMatch = cleanSQL.substring(0, match.index);
    lineNumber = (beforeMatch.match(/\n/g) || []).length + 1;

    const tableName = match[1] || match[2];
    const body = match[3];

    const columns: ParsedColumn[] = [];
    const columnDefs = splitColumnDefs(body);

    for (const def of columnDefs) {
      if (isConstraint(def)) {
        continue; // Skip constraints for now, process later
      }

      const result = parseColumnDef(def, lineNumber);
      if (result) {
        columns.push(result.column);
        warnings.push(...result.warnings);
      }
    }

    // Process table-level constraints
    const { updatedColumns, warnings: constraintWarnings } =
      parseTableConstraints(body, columns, lineNumber);
    warnings.push(...constraintWarnings);

    if (columns.length === 0) {
      errors.push({
        line: lineNumber,
        message: `Table "${tableName}" has no valid columns`,
      });
      continue;
    }

    tables.push({
      name: tableName,
      columns: updatedColumns,
    });
  }

  if (tables.length === 0 && cleanSQL.trim().length > 0) {
    // Check if it looks like SQL but couldn't be parsed
    if (/create\s+table/i.test(cleanSQL)) {
      errors.push({
        line: 1,
        message: "Could not parse CREATE TABLE statement. Check syntax.",
      });
    } else {
      errors.push({
        line: 1,
        message: "No CREATE TABLE statements found",
      });
    }
  }

  return { tables, errors, warnings };
}

/**
 * Convert parsed tables to Schema format with proper IDs and FK resolution
 */
export function convertToSchema(
  parsedTables: ParsedTable[],
  canvasOffset: { x: number; y: number },
  zoom: number,
  existingSchema?: Schema
): { schema: Schema; errors: ParseError[] } {
  const errors: ParseError[] = [];

  // Create ID maps for tables and columns
  const tableIdMap = new Map<string, string>(); // tableName -> tableId
  const columnIdMap = new Map<string, Map<string, string>>(); // tableName -> (columnName -> columnId)

  // First pass: assign IDs to all tables and columns
  const tables: Table[] = [];
  const GRID_COLS = 3;
  const GRID_SPACING_X = 380;
  const GRID_SPACING_Y = 300;

  // Determine starting position for new tables
  let existingTableCount = 0;
  if (existingSchema) {
    existingTableCount = existingSchema.tables.length;
    // Copy existing tables to ID maps
    for (const table of existingSchema.tables) {
      tableIdMap.set(table.name.toLowerCase(), table.id);
      const colMap = new Map<string, string>();
      for (const col of table.columns) {
        colMap.set(col.name.toLowerCase(), col.id);
      }
      columnIdMap.set(table.name.toLowerCase(), colMap);
    }
  }

  for (let i = 0; i < parsedTables.length; i++) {
    const parsed = parsedTables[i];
    const tableId = generateId();
    const tableNameLower = parsed.name.toLowerCase();

    // Skip if table already exists (for merge mode)
    if (tableIdMap.has(tableNameLower)) {
      continue;
    }

    tableIdMap.set(tableNameLower, tableId);

    const colMap = new Map<string, string>();
    const columns: Column[] = [];

    for (const parsedCol of parsed.columns) {
      const colId = generateId();
      colMap.set(parsedCol.name.toLowerCase(), colId);

      columns.push({
        id: colId,
        name: parsedCol.name,
        type: parsedCol.type as PostgresType,
        isPrimaryKey: parsedCol.isPrimaryKey,
        isNotNull: parsedCol.isNotNull,
        isUnique: parsedCol.isUnique,
        foreignKey: null, // Will be resolved in second pass
      });
    }

    columnIdMap.set(tableNameLower, colMap);

    // Calculate grid position
    const gridIndex = existingTableCount + i;
    const col = gridIndex % GRID_COLS;
    const row = Math.floor(gridIndex / GRID_COLS);

    tables.push({
      id: tableId,
      name: parsed.name,
      columns,
      position: {
        x: 50 + col * GRID_SPACING_X - canvasOffset.x / zoom,
        y: 50 + row * GRID_SPACING_Y - canvasOffset.y / zoom,
      },
    });
  }

  // Second pass: resolve foreign key references
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const parsedTable = parsedTables.find(
      (p) => p.name.toLowerCase() === table.name.toLowerCase()
    );

    if (!parsedTable) continue;

    for (let j = 0; j < table.columns.length; j++) {
      const parsedCol = parsedTable.columns[j];

      if (parsedCol.foreignKeyRef) {
        const refTableName = parsedCol.foreignKeyRef.tableName.toLowerCase();
        const refColName = parsedCol.foreignKeyRef.columnName.toLowerCase();

        const refTableId = tableIdMap.get(refTableName);
        const refColMap = columnIdMap.get(refTableName);
        const refColId = refColMap?.get(refColName);

        if (!refTableId) {
          errors.push({
            line: 0,
            message: `Foreign key reference to unknown table "${parsedCol.foreignKeyRef.tableName}" in column "${table.name}.${parsedCol.name}"`,
          });
        } else if (!refColId) {
          errors.push({
            line: 0,
            message: `Foreign key reference to unknown column "${parsedCol.foreignKeyRef.columnName}" in table "${parsedCol.foreignKeyRef.tableName}"`,
          });
        } else {
          table.columns[j].foreignKey = {
            tableId: refTableId,
            columnId: refColId,
          };
        }
      }
    }
  }

  // Merge with existing schema if provided
  let finalTables = tables;
  if (existingSchema) {
    finalTables = [...existingSchema.tables, ...tables];
  }

  return {
    schema: { tables: finalTables },
    errors,
  };
}
