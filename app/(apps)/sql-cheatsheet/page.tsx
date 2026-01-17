import { Metadata } from "next";
import { getCategories, type SQLCategory, type SQLExample } from "./_lib/data";
import { defaultDatabase } from "./_lib/databases";
import { CopyButton } from "./_components/copy-button";

export const metadata: Metadata = {
  title: "SQL Cheatsheet",
  description: "SQL cheatsheet with copy-paste examples.",
  keywords: [
    "sql cheatsheet",
    "postgresql cheatsheet",
    "sql reference",
    "sql examples",
    "postgresql examples",
    "sql syntax",
    "sql queries",
    "select statement",
    "join syntax",
    "window functions",
    "cte examples",
  ],
  openGraph: {
    title: "SQL Cheatsheet",
    description: "SQL cheatsheet with copy-paste examples.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Cheatsheet",
    description: "SQL cheatsheet with copy-paste examples.",
  },
  alternates: {
    canonical: "/sql-cheatsheet",
  },
};

// SQL syntax highlighting - server-side rendering
function highlightSQL(sql: string): React.ReactNode[] {
  const keywords = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "ILIKE",
    "IS", "NULL", "AS", "DISTINCT", "ORDER", "BY", "ASC", "DESC", "LIMIT", "OFFSET",
    "GROUP", "HAVING", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "CROSS",
    "ON", "USING", "UNION", "ALL", "EXCEPT", "INTERSECT", "WITH", "RECURSIVE",
    "CASE", "WHEN", "THEN", "ELSE", "END", "CAST", "OVER", "PARTITION", "ROWS",
    "RANGE", "UNBOUNDED", "PRECEDING", "FOLLOWING", "CURRENT", "ROW", "FILTER",
    "NULLS", "FIRST", "LAST", "FETCH", "ONLY", "LATERAL", "EXISTS", "ANY", "SOME",
    "TRUE", "FALSE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE",
    "TABLE", "INDEX", "VIEW", "DROP", "ALTER", "ADD", "COLUMN", "CONSTRAINT",
    "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "UNIQUE", "CHECK", "DEFAULT",
    "RETURNING", "COALESCE", "NULLIF", "INTERVAL", "CASCADE", "RESTRICT", "IF",
    "TRUNCATE", "RESTART", "IDENTITY", "CONFLICT", "DO", "NOTHING", "EXCLUDED",
    "NATURAL", "SERIAL", "BOOLEAN", "INTEGER", "TEXT", "VARCHAR", "NUMERIC",
    "DECIMAL", "TIMESTAMP", "DATE", "TIME", "JSONB", "JSON", "ARRAY",
  ];

  const functions = [
    "COUNT", "SUM", "AVG", "MIN", "MAX", "ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE",
    "LAG", "LEAD", "FIRST_VALUE", "LAST_VALUE", "CONCAT", "UPPER", "LOWER", "INITCAP",
    "TRIM", "LTRIM", "RTRIM", "SUBSTRING", "REPLACE", "SPLIT_PART", "LENGTH", "CHAR_LENGTH",
    "POSITION", "STRPOS", "NOW", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP",
    "EXTRACT", "DATE_TRUNC", "AGE", "TO_CHAR", "GENERATE_SERIES", "JSON_BUILD_OBJECT",
    "JSON_AGG", "JSONB_SET", "ARRAY_AGG", "STRING_AGG", "ROUND", "CEIL", "FLOOR",
    "TRUNC", "ABS", "POWER", "SQRT", "MOD", "DIV", "SIGN", "RANDOM", "ARRAY_LENGTH",
    "ARRAY_CAT", "ARRAY_APPEND", "ARRAY_REMOVE", "ARRAY_POSITION", "CARDINALITY",
    "UNNEST", "ROW_TO_JSON",
  ];

  const lines = sql.split("\n");
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIdx = 0;

    const commentMatch = remaining.match(/^(\s*)(--.*)/);
    if (commentMatch) {
      parts.push(
        <span key={partIdx++}>{commentMatch[1]}</span>,
        <span key={partIdx++} className="text-stone-500 dark:text-stone-500 italic">{commentMatch[2]}</span>
      );
      remaining = "";
    }

    while (remaining.length > 0) {
      const stringMatch = remaining.match(/^'[^']*'/);
      if (stringMatch) {
        parts.push(
          <span key={partIdx++} className="text-rose-700 dark:text-rose-400">{stringMatch[0]}</span>
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      const numberMatch = remaining.match(/^\b\d+(\.\d+)?\b/);
      if (numberMatch) {
        parts.push(
          <span key={partIdx++} className="text-indigo-700 dark:text-indigo-400">{numberMatch[0]}</span>
        );
        remaining = remaining.slice(numberMatch[0].length);
        continue;
      }

      let matchedKeyword = false;
      for (const kw of keywords) {
        const regex = new RegExp(`^\\b${kw}\\b`, "i");
        const match = remaining.match(regex);
        if (match) {
          parts.push(
            <span key={partIdx++} className="font-bold text-stone-900 dark:text-stone-100">{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matchedKeyword = true;
          break;
        }
      }
      if (matchedKeyword) continue;

      let matchedFunction = false;
      for (const fn of functions) {
        const regex = new RegExp(`^\\b${fn}\\b`, "i");
        const match = remaining.match(regex);
        if (match) {
          parts.push(
            <span key={partIdx++} className="text-blue-700 dark:text-blue-400">{match[0]}</span>
          );
          remaining = remaining.slice(match[0].length);
          matchedFunction = true;
          break;
        }
      }
      if (matchedFunction) continue;

      const opMatch = remaining.match(/^(->|->>|#>|#>>|@>|<@|\|\||>=|<=|<>|!=|::|\&\&)/);
      if (opMatch) {
        parts.push(
          <span key={partIdx++} className="text-amber-800 dark:text-amber-400">{opMatch[0]}</span>
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    }

    return (
      <div key={lineIdx} className="min-h-[1.3em]">
        {parts.length > 0 ? parts : "\u00A0"}
      </div>
    );
  });
}

// Example item component
function ExampleItem({ example }: { example: SQLExample }) {
  return (
    <div className="mb-4 sm:mb-5 last:mb-0">
      <h3 className="text-[12px] sm:text-[13px] font-bold text-stone-800 dark:text-stone-100 leading-tight mb-1">
        {example.title}
      </h3>
      <p className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400 mb-2 leading-snug">
        {example.description}
      </p>
      <div className="relative bg-stone-100 dark:bg-stone-950 p-2.5 rounded overflow-hidden">
        <div className="absolute top-1.5 right-1.5 z-10">
          <CopyButton text={example.sql} />
        </div>
        <pre className="text-[10px] sm:text-[11px] leading-snug font-mono text-stone-800 dark:text-stone-300 whitespace-pre-wrap break-words overflow-x-auto pr-8">
          <code>{highlightSQL(example.sql)}</code>
        </pre>
      </div>
    </div>
  );
}

// Category column component
function CategoryColumn({ category }: { category: SQLCategory }) {
  return (
    <div className="break-inside-avoid-column mb-4 sm:mb-6 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-sm overflow-hidden">
      {/* Category header */}
      <div
        className="border-b-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-stone-900"
        style={{ borderColor: category.color }}
      >
        <h2
          className="text-sm sm:text-base font-black uppercase tracking-tight"
          style={{ color: category.color }}
        >
          {category.name}
        </h2>
        <p className="text-[10px] sm:text-[11px] text-stone-300 mt-0.5">
          {category.description}
        </p>
      </div>

      {/* Examples */}
      <div className="p-3 sm:p-4">
        {category.examples.map((example) => (
          <ExampleItem key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
}

export default function SQLCheatsheetPage() {
  const categories = getCategories(defaultDatabase.id);

  return (
    <div className="columns-1 md:columns-2 xl:columns-3 gap-4 sm:gap-6 lg:gap-8">
      {categories.map((category) => (
        <div key={category.id} id={category.id}>
          <CategoryColumn category={category} />
        </div>
      ))}
    </div>
  );
}
