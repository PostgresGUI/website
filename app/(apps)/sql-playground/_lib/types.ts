export type Theme = "aqua" | "platinum" | "stone";

export interface SavedQuery {
  id: string;
  name: string;
  query: string;
}

export interface TableSchema {
  name: string;
  columns: { name: string; type: string }[];
}

export interface QueryResults {
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface RowEditInfo {
  isEditable: boolean;
  tableName: string | null;
  primaryKeyColumn: string | null;
  reason?: string;
}

export interface QueryStats {
  rowCount: number;
  duration: number;
}

export interface ThemeProps {
  query: string;
  setQuery: (query: string) => void;
  isExecuting: boolean;
  handleRun: () => void;
  handleReset: () => void;
  schema: TableSchema[];
  results: QueryResults | null;
  error: string | null;
  stats: QueryStats | null;
  isLoading: boolean;
  isResetting: boolean;
  selectedTable: string | null;
  onSelectTable: (name: string) => void;
  rowEditInfo: RowEditInfo | null;
  onEditRow: (row: Record<string, unknown>) => void;
  onDeleteRow: (row: Record<string, unknown>) => void;
  editingRow: Record<string, unknown> | null;
  deletingRow: Record<string, unknown> | null;
  onCloseEditDialog: () => void;
  onCloseDeleteDialog: () => void;
  onSaveEdit: (updates: Record<string, unknown>) => Promise<void>;
  onConfirmDelete: () => Promise<void>;
  tableSchema: { name: string; type: string }[];
}

export interface PlaygroundState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  query: string;
  setQuery: (query: string) => void;
  expandedTables: string[];
  toggleTable: (name: string) => void;
  isExecuting: boolean;
  handleRun: () => void;
  handleReset: () => void;
  schema: TableSchema[];
  results: QueryResults | null;
  error: string | null;
  stats: QueryStats | null;
}
