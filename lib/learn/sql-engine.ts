import { QueryResult, TableInfo, TableColumn } from './lessons/types';

// sql.js types
interface SqlJsStatic {
  Database: new (data?: ArrayLike<number>) => SqlJsDatabase;
}

interface SqlJsDatabase {
  exec(sql: string): Array<{ columns: string[]; values: unknown[][] }>;
  run(sql: string): void;
  close(): void;
  getRowsModified(): number;
}

let db: SqlJsDatabase | null = null;
let isInitializing = false;
let initPromise: Promise<SqlJsDatabase> | null = null;

export async function initializeDatabase(): Promise<SqlJsDatabase> {
  // Return existing database if available
  if (db) return db;

  // Return existing initialization promise if in progress
  if (isInitializing && initPromise) return initPromise;

  isInitializing = true;
  initPromise = (async () => {
    try {
      // Dynamic import to avoid SSR issues
      const initSqlJs = (await import('sql.js')).default;
      const SQL: SqlJsStatic = await initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });
      db = new SQL.Database();
      return db;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
}

export function getDatabase(): SqlJsDatabase | null {
  return db;
}

export function executeQuery(sql: string): QueryResult {
  if (!db) {
    return {
      success: false,
      error: 'Database not initialized'
    };
  }

  try {
    // Handle multiple statements
    const statements = sql.split(';').filter(s => s.trim());
    let lastResult: QueryResult = {
      success: true,
      columns: [],
      rows: [],
      rowCount: 0
    };

    for (const statement of statements) {
      if (!statement.trim()) continue;

      const results = db.exec(statement);

      if (results.length > 0) {
        lastResult = {
          success: true,
          columns: results[0].columns,
          rows: results[0].values,
          rowCount: results[0].values.length
        };
      } else {
        // For statements like CREATE, INSERT that don't return results
        lastResult = {
          success: true,
          columns: [],
          rows: [],
          rowCount: db.getRowsModified()
        };
      }
    }

    return lastResult;
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message
    };
  }
}

export function resetDatabase(): void {
  if (db) {
    db.close();
  }
  db = null;
  initPromise = null;
}

export function getSchema(): TableInfo[] {
  if (!db) return [];

  try {
    const tablesResult = db.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );

    if (tablesResult.length === 0) return [];

    const tables: TableInfo[] = [];

    for (const row of tablesResult[0].values) {
      const tableName = row[0] as string;

      // Get column info
      const columnsResult = db.exec(`PRAGMA table_info("${tableName}")`);
      const columns: TableColumn[] = columnsResult[0]?.values.map(col => ({
        name: col[1] as string,
        type: col[2] as string
      })) || [];

      // Get row count
      const countResult = db.exec(`SELECT COUNT(*) FROM "${tableName}"`);
      const rowCount = countResult[0]?.values[0]?.[0] as number || 0;

      tables.push({
        name: tableName,
        columns,
        rowCount
      });
    }

    return tables;
  } catch {
    return [];
  }
}

export function setupSchema(sql: string): QueryResult {
  return executeQuery(sql);
}
