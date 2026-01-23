export interface Column {
  id: string;
  name: string;
  type: PostgresType;
  isPrimaryKey: boolean;
  isNotNull: boolean;
  isUnique: boolean;
  foreignKey: ForeignKey | null;
}

export interface ForeignKey {
  tableId: string;
  columnId: string;
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
  position: { x: number; y: number };
}

export interface Schema {
  tables: Table[];
}

export type PostgresType =
  | "SERIAL"
  | "INTEGER"
  | "BIGINT"
  | "SMALLINT"
  | "TEXT"
  | "VARCHAR"
  | "CHAR"
  | "BOOLEAN"
  | "DATE"
  | "TIMESTAMP"
  | "TIMESTAMPTZ"
  | "TIME"
  | "UUID"
  | "JSON"
  | "JSONB"
  | "NUMERIC"
  | "REAL"
  | "DOUBLE PRECISION"
  | "BYTEA";

export const POSTGRES_TYPES: PostgresType[] = [
  "SERIAL",
  "INTEGER",
  "BIGINT",
  "SMALLINT",
  "TEXT",
  "VARCHAR",
  "CHAR",
  "BOOLEAN",
  "DATE",
  "TIMESTAMP",
  "TIMESTAMPTZ",
  "TIME",
  "UUID",
  "JSON",
  "JSONB",
  "NUMERIC",
  "REAL",
  "DOUBLE PRECISION",
  "BYTEA",
];

export const TYPE_CATEGORIES: Record<string, PostgresType[]> = {
  Numeric: ["SERIAL", "INTEGER", "BIGINT", "SMALLINT", "NUMERIC", "REAL", "DOUBLE PRECISION"],
  Text: ["TEXT", "VARCHAR", "CHAR"],
  "Date/Time": ["DATE", "TIMESTAMP", "TIMESTAMPTZ", "TIME"],
  Other: ["BOOLEAN", "UUID", "JSON", "JSONB", "BYTEA"],
};
