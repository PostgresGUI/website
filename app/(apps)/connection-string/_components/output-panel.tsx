"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { OutputFormat } from "../_lib/types";

interface OutputPanelProps {
  uri: string;
  keyValue: string;
  outputFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
}

export function OutputPanel({ uri, keyValue, outputFormat, onFormatChange }: OutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const output = outputFormat === "uri" ? uri : keyValue;

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800/50 overflow-hidden">
      {/* Format tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-700">
        <button
          onClick={() => onFormatChange("uri")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            outputFormat === "uri"
              ? "bg-[var(--postgres-blue)]/10 text-[var(--postgres-blue)] border-b-2 border-[var(--postgres-blue)]"
              : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
          }`}
        >
          URI Format
        </button>
        <button
          onClick={() => onFormatChange("keyvalue")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            outputFormat === "keyvalue"
              ? "bg-[var(--postgres-blue)]/10 text-[var(--postgres-blue)] border-b-2 border-[var(--postgres-blue)]"
              : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
          }`}
        >
          Key-Value Format
        </button>
      </div>

      {/* Output */}
      <div className="p-4">
        <div className="relative">
          <pre className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-sm font-mono break-all whitespace-pre-wrap min-h-[80px] text-stone-800 dark:text-stone-200">
            {output || <span className="text-stone-400 dark:text-stone-500 italic">Fill in the form to generate a connection string...</span>}
          </pre>
          {output && (
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 p-1.5 transition-colors border rounded cursor-pointer ${
                copied
                  ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                  : "bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-500"
              }`}
              title={copied ? "Copied!" : "Copy"}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
