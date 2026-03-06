"use client";

import { useState, useCallback, useEffect } from "react";
import { RefreshCw, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  generateUuidV4,
  generateUuidV7,
  formatUuid,
} from "../_lib/uuid";

type UuidVersion = "v4" | "v7";

function generateUuid(version: UuidVersion): string {
  return version === "v4" ? generateUuidV4() : generateUuidV7();
}

function SegmentToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-stone-300 dark:border-stone-600 overflow-hidden">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            value === option.value
              ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900"
              : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function CopyFeedbackButton({
  text,
  label,
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 transition-colors border rounded cursor-pointer ${
        copied
          ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
          : "bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-500"
      } ${className ?? ""}`}
      title={copied ? "Copied!" : "Copy"}
    >
      {label ? (
        <span className="flex items-center gap-1.5 text-xs font-medium px-1">
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : label}
        </span>
      ) : copied ? (
        <Check className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );
}

function CopyAllButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" onClick={handleCopy}>
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy All"}
    </Button>
  );
}

export function UuidGenerator() {
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [primaryUuid, setPrimaryUuid] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPrimaryUuid(generateUuid("v4"));
  }, []);
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkUuids, setBulkUuids] = useState<string[]>([]);

  const fmt = useCallback(
    (uuid: string) => formatUuid(uuid, { uppercase, hyphens }),
    [uppercase, hyphens]
  );

  const regeneratePrimary = useCallback(
    (v?: UuidVersion) => {
      setPrimaryUuid(generateUuid(v ?? version));
      setCopied(false);
    },
    [version]
  );

  const handleCopyPrimary = async () => {
    await navigator.clipboard.writeText(fmt(primaryUuid));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVersionChange = (v: UuidVersion) => {
    setVersion(v);
    regeneratePrimary(v);
  };

  const handleUppercaseChange = (val: string) => {
    setUppercase(val === "upper");
    setPrimaryUuid(generateUuid(version));
    setCopied(false);
  };

  const handleHyphensChange = (val: string) => {
    setHyphens(val === "with");
    setPrimaryUuid(generateUuid(version));
    setCopied(false);
  };

  const handleBulkGenerate = () => {
    const uuids = Array.from({ length: bulkCount }, () => generateUuid(version));
    setBulkUuids(uuids);
  };

  const handleCopyAll = async () => {
    const text = bulkUuids.map((u) => fmt(u)).join("\n");
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-stone-900 dark:text-stone-100">
            UUID Generator
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <Image
              src="/postgresgui-icon.jpg"
              alt="PostgresGUI"
              width={24}
              height={24}
              className="rounded"
            />
            PostgresGUI
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl space-y-6">
          {/* Primary UUID display */}
          <div
            onClick={handleCopyPrimary}
            className={`relative w-full rounded-lg border-2 p-6 sm:p-8 cursor-pointer transition-all select-none ${
              copied
                ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800"
                : "bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500"
            }`}
          >
            <p className="font-mono text-lg sm:text-xl md:text-2xl text-center break-all leading-relaxed text-stone-900 dark:text-stone-100">
              {fmt(primaryUuid)}
            </p>
            <p
              className={`text-center text-xs mt-3 transition-colors ${
                copied
                  ? "text-emerald-600 dark:text-emerald-400 font-medium"
                  : "text-stone-400 dark:text-stone-500"
              }`}
            >
              {copied ? "Copied!" : "Click to copy"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                regeneratePrimary();
              }}
              className="absolute top-3 right-3 p-2 rounded-md bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-400 dark:hover:bg-stone-600 transition-colors cursor-pointer"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <SegmentToggle
              options={[
                { label: "v4 (Random)", value: "v4" },
                { label: "v7 (Time-ordered)", value: "v7" },
              ]}
              value={version}
              onChange={handleVersionChange}
            />
            <SegmentToggle
              options={[
                { label: "abc", value: "lower" },
                { label: "ABC", value: "upper" },
              ]}
              value={uppercase ? "upper" : "lower"}
              onChange={handleUppercaseChange}
            />
            <SegmentToggle
              options={[
                { label: "With Hyphens", value: "with" },
                { label: "No Hyphens", value: "without" },
              ]}
              value={hyphens ? "with" : "without"}
              onChange={handleHyphensChange}
            />
          </div>

          {/* Bulk generation */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-lg bg-white dark:bg-stone-950 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              {/* Input group: count + generate */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Bulk Generate
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={bulkCount}
                  onChange={(e) =>
                    setBulkCount(
                      Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                    )
                  }
                  className="w-20 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-2 py-1.5 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
                <Button variant="outline" onClick={handleBulkGenerate}>
                  Generate
                </Button>
              </div>

              {/* Export group: copy all + export JSON */}
              {bulkUuids.length > 0 && (
                <div className="flex items-center gap-2">
                  <CopyAllButton
                    text={bulkUuids.map((u) => fmt(u)).join("\n")}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const data = JSON.stringify(
                        bulkUuids.map((u) => fmt(u)),
                        null,
                        2
                      );
                      const blob = new Blob([data], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "uuids.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="w-3 h-3" />
                    Export JSON
                  </Button>
                </div>
              )}
            </div>

            {bulkUuids.length > 0 && (
              <div className="max-h-64 overflow-y-auto rounded-md border border-stone-200 dark:border-stone-800">
                {bulkUuids.map((uuid, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 border-b border-stone-100 dark:border-stone-800 last:border-b-0 hover:bg-stone-50 dark:hover:bg-stone-900"
                  >
                    <span className="font-mono text-xs sm:text-sm text-stone-800 dark:text-stone-200 break-all">
                      {fmt(uuid)}
                    </span>
                    <CopyFeedbackButton
                      text={fmt(uuid)}
                      className="ml-2 shrink-0"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
