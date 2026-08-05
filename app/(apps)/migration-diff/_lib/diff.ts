export type WarningLevel = "danger" | "warning" | "info";

export type MigrationWarning = {
  level: WarningLevel;
  title: string;
  detail: string;
};

type Column = {
  name: string;
  key: string;
  type: string;
  defaultValue: string | null;
  notNull: boolean;
  primaryKey: boolean;
  unique: boolean;
};

type Table = {
  name: string;
  key: string;
  columns: Column[];
};

export type MigrationDiff = {
  sql: string;
  warnings: MigrationWarning[];
  summary: {
    tablesAdded: number;
    tablesDropped: number;
    columnsAdded: number;
    columnsDropped: number;
    changes: number;
  };
};

function stripComments(sql: string): string {
  return sql.replace(/--[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
}

function normalizeIdentifier(identifier: string): string {
  return identifier.replace(/^"|"$/g, "").toLowerCase();
}

function quoteIdentifier(identifier: string): string {
  const cleaned = identifier.replace(/^"|"$/g, "");
  if (/^[a-z_][a-z0-9_]*$/.test(cleaned) && cleaned === cleaned.toLowerCase()) {
    return cleaned;
  }
  return `"${cleaned.replace(/"/g, '""')}"`;
}

function quoteTableName(name: string): string {
  return name
    .split(".")
    .map((part) => quoteIdentifier(part.trim()))
    .join(".");
}

function splitTopLevel(input: string, separator: string): string[] {
  const parts: string[] = [];
  let current = "";
  let depth = 0;
  let quote: "'" | '"' | null = null;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const next = input[i + 1];

    if (quote) {
      current += char;
      if (char === quote) {
        if (next === quote) {
          current += next;
          i++;
        } else {
          quote = null;
        }
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }

    if (char === "(") depth++;
    if (char === ")") depth--;

    if (char === separator && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

function findMatchingParen(sql: string, openIndex: number): number {
  let depth = 0;
  let quote: "'" | '"' | null = null;

  for (let i = openIndex; i < sql.length; i++) {
    const char = sql[i];
    const next = sql[i + 1];

    if (quote) {
      if (char === quote) {
        if (next === quote) {
          i++;
        } else {
          quote = null;
        }
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "(") depth++;
    if (char === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function parseCreateTables(sql: string): Table[] {
  const clean = stripComments(sql);
  const tables: Table[] = [];
  const createRegex =
    /create\s+table\s+(?:if\s+not\s+exists\s+)?((?:"[^"]+"|[a-zA-Z_][a-zA-Z0-9_]*)(?:\s*\.\s*(?:"[^"]+"|[a-zA-Z_][a-zA-Z0-9_]*))?)\s*\(/gi;

  let match: RegExpExecArray | null;
  while ((match = createRegex.exec(clean)) !== null) {
    const tableName = match[1].replace(/\s*\.\s*/g, ".");
    const openIndex = clean.indexOf("(", match.index);
    const closeIndex = findMatchingParen(clean, openIndex);
    if (openIndex === -1 || closeIndex === -1) continue;

    const body = clean.slice(openIndex + 1, closeIndex);
    const columns = splitTopLevel(body, ",")
      .map(parseColumn)
      .filter((column): column is Column => Boolean(column));

    tables.push({
      name: tableName,
      key: tableName
        .split(".")
        .map((part) => normalizeIdentifier(part.trim()))
        .join("."),
      columns,
    });

    createRegex.lastIndex = closeIndex + 1;
  }

  return tables;
}

function parseColumn(definition: string): Column | null {
  const trimmed = definition.trim();
  if (
    /^(constraint|primary\s+key|foreign\s+key|unique|check|exclude)\b/i.test(
      trimmed,
    )
  ) {
    return null;
  }

  const nameMatch = trimmed.match(
    /^("[^"]+"|[a-zA-Z_][a-zA-Z0-9_]*)\s+([\s\S]+)$/,
  );
  if (!nameMatch) return null;

  const name = nameMatch[1];
  const rest = nameMatch[2].trim();
  const constraintMatch = rest.search(
    /\s(default|not\s+null|null|primary\s+key|unique|references|check|constraint|collate|generated)\b/i,
  );
  const rawType =
    constraintMatch === -1 ? rest : rest.slice(0, constraintMatch).trim();
  const constraints =
    constraintMatch === -1 ? "" : rest.slice(constraintMatch).trim();

  return {
    name,
    key: normalizeIdentifier(name),
    type: normalizeWhitespace(rawType),
    defaultValue: extractDefault(constraints),
    notNull: /\bnot\s+null\b/i.test(constraints) || /\bprimary\s+key\b/i.test(constraints),
    primaryKey: /\bprimary\s+key\b/i.test(constraints),
    unique: /\bunique\b/i.test(constraints),
  };
}

function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeCompare(value: string | null): string {
  return normalizeWhitespace(value ?? "").toLowerCase();
}

function extractDefault(constraints: string): string | null {
  const match = constraints.match(/\bdefault\b\s+([\s\S]+)$/i);
  if (!match) return null;

  const value = match[1];
  const nextConstraint = value.search(
    /\s(not\s+null|null|primary\s+key|unique|references|check|constraint|collate|generated)\b/i,
  );

  return normalizeWhitespace(
    nextConstraint === -1 ? value : value.slice(0, nextConstraint),
  );
}

function columnDefinition(column: Column): string {
  const parts = [quoteIdentifier(column.name), column.type];
  if (column.defaultValue) parts.push(`DEFAULT ${column.defaultValue}`);
  if (column.notNull) parts.push("NOT NULL");
  if (column.unique) parts.push("UNIQUE");
  return parts.join(" ");
}

function createTableStatement(table: Table): string {
  const columns = table.columns
    .map((column) => `  ${columnDefinition(column)}`)
    .join(",\n");
  return `CREATE TABLE ${quoteTableName(table.name)} (\n${columns}\n);`;
}

function mapByKey<T extends { key: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.key, item]));
}

function warn(
  warnings: MigrationWarning[],
  level: WarningLevel,
  title: string,
  detail: string,
) {
  warnings.push({ level, title, detail });
}

export function generateMigrationDiff(beforeSql: string, afterSql: string): MigrationDiff {
  const beforeTables = parseCreateTables(beforeSql);
  const afterTables = parseCreateTables(afterSql);
  const beforeMap = mapByKey(beforeTables);
  const afterMap = mapByKey(afterTables);
  const statements: string[] = [];
  const warnings: MigrationWarning[] = [];
  const summary = {
    tablesAdded: 0,
    tablesDropped: 0,
    columnsAdded: 0,
    columnsDropped: 0,
    changes: 0,
  };

  for (const afterTable of afterTables) {
    const beforeTable = beforeMap.get(afterTable.key);
    if (!beforeTable) {
      statements.push(createTableStatement(afterTable));
      summary.tablesAdded++;
      summary.changes++;
    }
  }

  for (const beforeTable of beforeTables) {
    const afterTable = afterMap.get(beforeTable.key);
    if (!afterTable) {
      statements.push(`DROP TABLE ${quoteTableName(beforeTable.name)};`);
      summary.tablesDropped++;
      summary.changes++;
      warn(
        warnings,
        "danger",
        "Drops table",
        `${quoteTableName(beforeTable.name)} and its data will be removed.`,
      );
    }
  }

  for (const afterTable of afterTables) {
    const beforeTable = beforeMap.get(afterTable.key);
    if (!beforeTable) continue;

    const beforeColumns = mapByKey(beforeTable.columns);
    const afterColumns = mapByKey(afterTable.columns);
    const tableName = quoteTableName(afterTable.name);

    for (const afterColumn of afterTable.columns) {
      const beforeColumn = beforeColumns.get(afterColumn.key);
      if (!beforeColumn) {
        statements.push(
          `ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition(afterColumn)};`,
        );
        summary.columnsAdded++;
        summary.changes++;
        if (afterColumn.notNull && !afterColumn.defaultValue) {
          warn(
            warnings,
            "warning",
            "Adds required column",
            `${tableName}.${quoteIdentifier(afterColumn.name)} may fail on existing rows without a default.`,
          );
        }
      }
    }

    for (const beforeColumn of beforeTable.columns) {
      const afterColumn = afterColumns.get(beforeColumn.key);
      if (!afterColumn) {
        statements.push(
          `ALTER TABLE ${tableName} DROP COLUMN ${quoteIdentifier(beforeColumn.name)};`,
        );
        summary.columnsDropped++;
        summary.changes++;
        warn(
          warnings,
          "danger",
          "Drops column",
          `${tableName}.${quoteIdentifier(beforeColumn.name)} and its data will be removed.`,
        );
      }
    }

    for (const afterColumn of afterTable.columns) {
      const beforeColumn = beforeColumns.get(afterColumn.key);
      if (!beforeColumn) continue;

      const columnName = quoteIdentifier(afterColumn.name);

      if (normalizeCompare(beforeColumn.type) !== normalizeCompare(afterColumn.type)) {
        statements.push(
          `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${afterColumn.type} USING ${columnName}::${afterColumn.type};`,
        );
        summary.changes++;
        warn(
          warnings,
          "warning",
          "Changes type",
          `${tableName}.${columnName} changes from ${beforeColumn.type} to ${afterColumn.type}.`,
        );
      }

      if (
        normalizeCompare(beforeColumn.defaultValue) !==
        normalizeCompare(afterColumn.defaultValue)
      ) {
        statements.push(
          afterColumn.defaultValue
            ? `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} SET DEFAULT ${afterColumn.defaultValue};`
            : `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} DROP DEFAULT;`,
        );
        summary.changes++;
      }

      if (beforeColumn.notNull !== afterColumn.notNull) {
        statements.push(
          `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} ${
            afterColumn.notNull ? "SET" : "DROP"
          } NOT NULL;`,
        );
        summary.changes++;
        if (afterColumn.notNull) {
          warn(
            warnings,
            "warning",
            "Requires backfill",
            `${tableName}.${columnName} must have no NULL values before SET NOT NULL.`,
          );
        }
      }
    }
  }

  if (beforeTables.length === 0 && beforeSql.trim()) {
    warn(warnings, "warning", "Before schema not parsed", "Use CREATE TABLE statements.");
  }

  if (afterTables.length === 0 && afterSql.trim()) {
    warn(warnings, "warning", "After schema not parsed", "Use CREATE TABLE statements.");
  }

  return {
    sql:
      statements.length > 0
        ? statements.join("\n\n")
        : "-- No schema changes detected.",
    warnings,
    summary,
  };
}

export const migrationSamples = {
  before: `CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  body text,
  published_at timestamptz
);`,
  after: `CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  display_name text NOT NULL DEFAULT 'New user',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title varchar(180) NOT NULL,
  body text,
  status text NOT NULL DEFAULT 'draft'
);

CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE
);`,
};
