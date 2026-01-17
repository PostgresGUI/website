"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
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
