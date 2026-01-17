"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { sqlCategories, type SQLCategory, type SQLExample } from "../_lib/data";
import { useCheatsheetContext } from "../layout";

// SQL syntax highlighting - newspaper style (dark text on light)
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
    "RETURNING", "COALESCE", "NULLIF", "INTERVAL",
  ];

  const functions = [
    "COUNT", "SUM", "AVG", "MIN", "MAX", "ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE",
    "LAG", "LEAD", "FIRST_VALUE", "LAST_VALUE", "CONCAT", "UPPER", "LOWER", "INITCAP",
    "TRIM", "LTRIM", "RTRIM", "SUBSTRING", "REPLACE", "SPLIT_PART", "LENGTH", "CHAR_LENGTH",
    "POSITION", "STRPOS", "NOW", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP",
    "EXTRACT", "DATE_TRUNC", "AGE", "TO_CHAR", "GENERATE_SERIES", "JSON_BUILD_OBJECT",
    "JSON_AGG", "JSONB_SET", "ARRAY_AGG", "STRING_AGG",
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

      const opMatch = remaining.match(/^(->|->>|#>|#>>|@>|<@|\|\||>=|<=|<>|!=|::)/);
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

// Copy button
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        p-1.5 transition-colors border rounded cursor-pointer
        ${copied
          ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
          : "bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-500"
        }
      `}
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

// Example item - compact newspaper style
function ExampleItem({ example }: { example: SQLExample }) {
  return (
    <div className="mb-5 last:mb-0">
      <h3 className="text-[13px] font-bold text-stone-800 dark:text-stone-100 leading-tight mb-1">
        {example.title}
      </h3>
      <p className="text-[11px] text-stone-600 dark:text-stone-400 mb-2 leading-snug">
        {example.description}
      </p>
      <div className="relative bg-stone-100 dark:bg-stone-950 p-2.5 rounded">
        <div className="absolute top-1.5 right-1.5">
          <CopyButton text={example.sql} />
        </div>
        <pre className="text-[11px] leading-snug font-mono text-stone-800 dark:text-stone-300 whitespace-pre-wrap break-words">
          <code>{highlightSQL(example.sql)}</code>
        </pre>
      </div>
    </div>
  );
}

// Category column - newspaper column style
function CategoryColumn({ category }: { category: SQLCategory }) {
  return (
    <div className="break-inside-avoid-column mb-6 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
      {/* Category header */}
      <div
        className="border-b-2 px-4 py-3 bg-stone-900"
        style={{ borderColor: category.color }}
      >
        <h2
          className="text-base font-black uppercase tracking-tight"
          style={{ color: category.color }}
        >
          {category.name}
        </h2>
        <p className="text-[11px] text-stone-300 mt-0.5">
          {category.description}
        </p>
      </div>

      {/* Examples */}
      <div className="p-4">
        {category.examples.map((example) => (
          <ExampleItem key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
}

// Main component
export function Cheatsheet() {
  const { sectionRefs } = useCheatsheetContext();

  return (
    <div className="columns-1 md:columns-2 xl:columns-3 gap-8">
      {sqlCategories.map((category) => (
        <div
          key={category.id}
          ref={(el) => {
            if (el) sectionRefs.current.set(category.id, el);
          }}
        >
          <CategoryColumn category={category} />
        </div>
      ))}
    </div>
  );
}
