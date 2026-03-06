"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { DataType } from "../_lib/types";

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
      className={`px-3 py-1.5 transition-colors border rounded-md cursor-pointer ${
        copied
          ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
          : "bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-500"
      }`}
      title={copied ? "Copied!" : "Copy SQL"}
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        {copied ? (
          <Check className="w-3.5 h-3.5" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

export function TypeDetail({
  type,
  categoryColor,
}: {
  type: DataType;
  categoryColor: string;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono font-bold text-2xl text-stone-900 dark:text-stone-100">
            {type.name}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400">
            {type.storage}
          </span>
          {type.recommended && (
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Recommended
            </span>
          )}
        </div>
        <p className="text-base text-stone-600 dark:text-stone-400 mt-3 leading-relaxed max-w-2xl">
          {type.whenToUse}
        </p>
      </div>

      <hr
        className="border-t-2"
        style={{ borderColor: categoryColor + "33" }}
      />

      {/* Range */}
      {type.range && (
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 dark:text-stone-500">
            Range
          </span>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-1">
            {type.range}
          </p>
        </div>
      )}

      {/* Performance */}
      <div>
        <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 dark:text-stone-500">
          Performance
        </span>
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-1">
          {type.performance}
        </p>
      </div>

      {/* Comparison */}
      <div>
        <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 dark:text-stone-500">
          Comparison
        </span>
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
          {type.vsNotes}
        </p>
      </div>

      {/* SQL Example */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 dark:text-stone-500">
            SQL Example
          </span>
          <CopyButton text={type.sqlExample} />
        </div>
        <pre className="text-sm font-mono bg-stone-50 dark:bg-stone-900 rounded-lg p-4 sm:p-5 overflow-x-auto text-stone-700 dark:text-stone-300 leading-relaxed">
          {type.sqlExample}
        </pre>
      </div>
    </div>
  );
}
