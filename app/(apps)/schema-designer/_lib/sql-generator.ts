import type { Schema, Table, Column } from "./types";

export function generateSQL(schema: Schema): string {
  if (schema.tables.length === 0) {
    return "-- No tables defined yet";
  }

  const statements: string[] = [];

  // Sort tables: tables with no foreign keys first, then those that reference them
  const sortedTables = topologicalSort(schema.tables);

  for (const table of sortedTables) {
    statements.push(generateTableSQL(table, schema));
  }

  return statements.join("\n\n");
}

function topologicalSort(tables: Table[]): Table[] {
  const result: Table[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const tableMap = new Map(tables.map((t) => [t.id, t]));

  function visit(table: Table) {
    if (visited.has(table.id)) return;
    if (visiting.has(table.id)) {
      // Circular dependency - just add it
      return;
    }

    visiting.add(table.id);

    // Visit dependencies first
    for (const col of table.columns) {
      if (col.foreignKey) {
        const depTable = tableMap.get(col.foreignKey.tableId);
        if (depTable) {
          visit(depTable);
        }
      }
    }

    visiting.delete(table.id);
    visited.add(table.id);
    result.push(table);
  }

  for (const table of tables) {
    visit(table);
  }

  return result;
}

function generateTableSQL(table: Table, schema: Schema): string {
  const lines: string[] = [];
  const constraints: string[] = [];

  lines.push(`CREATE TABLE ${escapeIdentifier(table.name)} (`);

  const columnDefs: string[] = [];

  for (const column of table.columns) {
    let def = `  ${escapeIdentifier(column.name)} ${column.type}`;

    if (column.isPrimaryKey) {
      def += " PRIMARY KEY";
    }

    if (column.isNotNull && !column.isPrimaryKey) {
      def += " NOT NULL";
    }

    if (column.isUnique && !column.isPrimaryKey) {
      def += " UNIQUE";
    }

    columnDefs.push(def);

    // Add foreign key constraint
    if (column.foreignKey) {
      const refTable = schema.tables.find((t) => t.id === column.foreignKey!.tableId);
      const refColumn = refTable?.columns.find((c) => c.id === column.foreignKey!.columnId);

      if (refTable && refColumn) {
        constraints.push(
          `  CONSTRAINT fk_${table.name}_${column.name} FOREIGN KEY (${escapeIdentifier(column.name)}) REFERENCES ${escapeIdentifier(refTable.name)}(${escapeIdentifier(refColumn.name)})`
        );
      }
    }
  }

  lines.push([...columnDefs, ...constraints].join(",\n"));
  lines.push(");");

  return lines.join("\n");
}

function escapeIdentifier(name: string): string {
  // If name contains special characters or is a reserved word, quote it
  if (/^[a-z_][a-z0-9_]*$/i.test(name) && !isReservedWord(name)) {
    return name.toLowerCase();
  }
  return `"${name.replace(/"/g, '""')}"`;
}

const RESERVED_WORDS = new Set([
  "all",
  "analyse",
  "analyze",
  "and",
  "any",
  "array",
  "as",
  "asc",
  "asymmetric",
  "both",
  "case",
  "cast",
  "check",
  "collate",
  "column",
  "constraint",
  "create",
  "current_catalog",
  "current_date",
  "current_role",
  "current_time",
  "current_timestamp",
  "current_user",
  "default",
  "deferrable",
  "desc",
  "distinct",
  "do",
  "else",
  "end",
  "except",
  "false",
  "fetch",
  "for",
  "foreign",
  "from",
  "grant",
  "group",
  "having",
  "in",
  "initially",
  "intersect",
  "into",
  "lateral",
  "leading",
  "limit",
  "localtime",
  "localtimestamp",
  "not",
  "null",
  "offset",
  "on",
  "only",
  "or",
  "order",
  "placing",
  "primary",
  "references",
  "returning",
  "select",
  "session_user",
  "some",
  "symmetric",
  "table",
  "then",
  "to",
  "trailing",
  "true",
  "union",
  "unique",
  "user",
  "using",
  "variadic",
  "when",
  "where",
  "window",
  "with",
]);

function isReservedWord(word: string): boolean {
  return RESERVED_WORDS.has(word.toLowerCase());
}
