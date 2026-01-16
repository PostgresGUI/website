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
