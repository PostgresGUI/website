import { QueryResult, TableInfo } from './lessons/types';

// Simple SQL syntax validation without actually executing queries
// This is used for the learn-sql tutorial where we validate user input
// based on query structure rather than actual database execution

let initialized = false;

export async function initializeDatabase(): Promise<void> {
  initialized = true;
  return Promise.resolve();
}

export function getDatabase(): boolean {
  return initialized;
}

// Basic SQL syntax validation
function isValidSQLSyntax(sql: string): { valid: boolean; error?: string } {
  const q = sql.trim().toLowerCase();

  if (!q) {
    return { valid: false, error: 'Empty query' };
  }

  // Check for basic SQL keywords
  const startsWithKeyword = /^(select|insert|update|delete|create|drop|alter|with)\b/.test(q);
  if (!startsWithKeyword) {
    return { valid: false, error: 'Query must start with a SQL keyword (SELECT, INSERT, CREATE, etc.)' };
  }

  // Check for balanced parentheses
  let parenCount = 0;
  for (const char of sql) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (parenCount < 0) {
      return { valid: false, error: 'Unbalanced parentheses' };
    }
  }
  if (parenCount !== 0) {
    return { valid: false, error: 'Unbalanced parentheses' };
  }

  // Check for balanced quotes
  const singleQuotes = (sql.match(/'/g) || []).length;
  if (singleQuotes % 2 !== 0) {
    return { valid: false, error: 'Unbalanced single quotes' };
  }

  return { valid: true };
}

export function executeQuery(sql: string): QueryResult {
  if (!initialized) {
    return {
      success: false,
      error: 'Database not initialized'
    };
  }

  const validation = isValidSQLSyntax(sql);

  if (!validation.valid) {
    return {
      success: false,
      error: validation.error
    };
  }

  // Return a successful mock result
  // The actual validation logic is in each lesson's validate function
  return {
    success: true,
    columns: [],
    rows: [],
    rowCount: 0
  };
}

export function resetDatabase(): void {
  // No-op - nothing to reset without a real database
}

export function getSchema(): TableInfo[] {
  // No schema to return without a real database
  return [];
}

export function setupSchema(_sql: string): QueryResult {
  // No-op - just return success
  return {
    success: true,
    columns: [],
    rows: [],
    rowCount: 0
  };
}
