"use client";

import { useState } from "react";
import type { ConnectionConfig } from "../_lib/types";
import { parseConnectionString } from "../_lib/builder";

interface ParseInputProps {
  onParsed: (config: ConnectionConfig) => void;
}

export function ParseInput({ onParsed }: ParseInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    setError(null);
    const result = parseConnectionString(input);
    if ("error" in result) {
      setError(result.error);
    } else {
      onParsed(result);
      setInput("");
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        placeholder="Paste a connection string here...&#10;&#10;Examples:&#10;postgresql://user:pass@host:5432/db?sslmode=require&#10;host=localhost port=5432 dbname=mydb user=postgres"
        className="w-full h-32 px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-mono placeholder:text-stone-400 dark:placeholder:text-stone-500 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        onClick={handleParse}
        disabled={!input.trim()}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--postgres-blue)] text-white hover:bg-[var(--postgres-blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        Parse &amp; Fill Form
      </button>
    </div>
  );
}
