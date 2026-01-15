export type Theme = "aqua" | "platinum";

export interface Column {
  name: string;
  type: "integer" | "decimal" | "varchar" | "timestamp";
}

export interface Table {
  name: string;
  columns: Column[];
}

export interface ResultRow {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface PlaygroundState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  query: string;
  setQuery: (query: string) => void;
  expandedTables: string[];
  toggleTable: (name: string) => void;
  selectedDb: string;
  setSelectedDb: (db: string) => void;
  isExecuting: boolean;
  handleRun: () => void;
}
