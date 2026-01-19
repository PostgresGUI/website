export function formatValue(value: unknown): string {
  if (value === null) return "NULL";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export interface EditableQueryInfo {
  isEditable: boolean;
  tableName: string | null;
  reason?: string;
}

/**
 * Parse a SQL query to determine if it's a simple single-table SELECT
 * that can support row editing/deletion.
 *
 * Editable queries must:
 * - Be a SELECT statement
 * - Query from a single table (no JOINs)
 * - Not have subqueries, CTEs, UNIONs, etc.
 * - Not be an aggregation query
 */
export function parseEditableQuery(sql: string): EditableQueryInfo {
  const normalized = sql.trim().toLowerCase();

  // Must be a SELECT statement
  if (!normalized.startsWith('select')) {
    return { isEditable: false, tableName: null, reason: 'Not a SELECT query' };
  }

  // Check for aggregations
  const aggregateFunctions = /\b(count|sum|avg|min|max|group_concat|array_agg|string_agg)\s*\(/i;
  if (aggregateFunctions.test(sql)) {
    return { isEditable: false, tableName: null, reason: 'Contains aggregate functions' };
  }

  // Check for GROUP BY
  if (/\bgroup\s+by\b/i.test(sql)) {
    return { isEditable: false, tableName: null, reason: 'Contains GROUP BY' };
  }

  // Check for UNION, INTERSECT, EXCEPT
  if (/\b(union|intersect|except)\b/i.test(sql)) {
    return { isEditable: false, tableName: null, reason: 'Contains UNION/INTERSECT/EXCEPT' };
  }

  // Check for CTEs (WITH clause)
  if (/^\s*with\b/i.test(sql)) {
    return { isEditable: false, tableName: null, reason: 'Contains CTE (WITH clause)' };
  }

  // Check for JOINs
  if (/\b(inner|left|right|full|cross|natural)?\s*join\b/i.test(sql)) {
    return { isEditable: false, tableName: null, reason: 'Contains JOIN' };
  }

  // Check for subqueries (SELECT within parentheses after FROM)
  if (/from\s*\([^)]*select/i.test(sql)) {
    return { isEditable: false, tableName: null, reason: 'Contains subquery' };
  }

  // Extract table name from simple SELECT ... FROM table pattern
  // Match: FROM tablename or FROM "tablename" or FROM schema.tablename
  const fromMatch = sql.match(/\bfrom\s+["']?(\w+)["']?(?:\s|$|;|where|order|limit|offset)/i);

  if (!fromMatch) {
    return { isEditable: false, tableName: null, reason: 'Could not identify table' };
  }

  const tableName = fromMatch[1];

  // Check for multiple tables in FROM (comma-separated)
  const fromClause = sql.match(/\bfrom\s+(.+?)(?:\bwhere\b|\border\b|\blimit\b|\boffset\b|;|$)/i);
  if (fromClause && fromClause[1].includes(',')) {
    return { isEditable: false, tableName: null, reason: 'Multiple tables in FROM clause' };
  }

  return { isEditable: true, tableName };
}

/**
 * Check if the query result columns include the primary key column
 */
export function resultIncludesPrimaryKey(
  columns: string[],
  primaryKeyColumn: string | null
): boolean {
  if (!primaryKeyColumn) return false;
  return columns.some(col => col.toLowerCase() === primaryKeyColumn.toLowerCase());
}

export function exportToCSV(columns: string[], rows: Record<string, unknown>[]): void {
  // Escape CSV value (handle quotes and commas)
  const escapeCSV = (value: unknown): string => {
    const str = formatValue(value);
    if (str.includes('"') || str.includes(',') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Build CSV content
  const header = columns.map(escapeCSV).join(',');
  const body = rows.map(row =>
    columns.map(col => escapeCSV(row[col])).join(',')
  ).join('\n');
  const csv = `${header}\n${body}`;

  // Download the file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `query-results-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
