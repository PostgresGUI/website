export type Theme = "aqua" | "platinum" | "stone";

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
  schema: { name: string; columns: { name: string; type: string }[] }[];
  results: { columns: string[]; rows: Record<string, unknown>[] } | null;
  error: string | null;
  stats: { rowCount: number; duration: number } | null;
}
