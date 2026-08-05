"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  Copy,
  FileDiff,
  Info,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  generateMigrationDiff,
  migrationSamples,
  type WarningLevel,
} from "../_lib/diff";

function IconTip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={8}>{label}</TooltipContent>
    </Tooltip>
  );
}

function warningIcon(level: WarningLevel) {
  if (level === "danger") {
    return <ShieldAlert className="size-5 text-red-600 dark:text-red-400" />;
  }

  if (level === "warning") {
    return <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />;
  }

  return <Info className="size-5 text-sky-600 dark:text-sky-400" />;
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-stone-200/80 p-3 dark:border-stone-800">
      <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

export function MigrationDiffTool() {
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [copied, setCopied] = useState(false);

  const diff = useMemo(() => generateMigrationDiff(before, after), [before, after]);
  const hasInput = before.trim() || after.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(diff.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const loadSample = () => {
    setBefore(migrationSamples.before);
    setAfter(migrationSamples.after);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950 dark:bg-stone-950 dark:text-stone-50">
      <header className="bg-white shadow-[0_1px_0_rgba(28,25,23,0.08)] dark:bg-stone-950 dark:shadow-[0_1px_0_rgba(255,255,255,0.08)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <FileDiff className="size-5 text-[var(--postgres-blue)]" />
            <span className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight">
              Migration Diff
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
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

      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)]">
        <section className="grid min-h-[calc(100vh-7rem)] gap-4 lg:grid-cols-2">
          <SchemaPane
            label="Before"
            value={before}
            onChange={setBefore}
            placeholder="CREATE TABLE users (...)"
          />
          <SchemaPane
            label="After"
            value={after}
            onChange={setAfter}
            placeholder="CREATE TABLE users (...)"
          />
        </section>

        <aside className="space-y-5">
          <section>
            <div className="flex h-12 items-center justify-between border-b border-stone-200/80 px-1 dark:border-stone-800">
              <span className="text-sm font-semibold">Migration SQL</span>
              <div className="flex items-center gap-1">
                <IconTip label="Load sample">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={loadSample}
                    aria-label="Load sample"
                  >
                    <Sparkles className="size-4" />
                  </Button>
                </IconTip>
                <IconTip label="Copy SQL">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleCopy}
                    aria-label="Copy SQL"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </IconTip>
                <IconTip label="Reset">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      setBefore("");
                      setAfter("");
                    }}
                    aria-label="Reset"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </IconTip>
                <IconTip label="Re-check">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      setBefore((value) => value.trim());
                      setAfter((value) => value.trim());
                    }}
                    aria-label="Re-check"
                  >
                    <RotateCcw className="size-4" />
                  </Button>
                </IconTip>
              </div>
            </div>

            {!hasInput ? (
              <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center text-stone-500 dark:text-stone-400">
                <FileDiff className="size-8 text-stone-300 dark:text-stone-700" />
                <p className="text-sm">Paste two schemas.</p>
              </div>
            ) : (
              <pre className="mt-3 max-h-[44vh] overflow-auto rounded-lg bg-stone-900 p-4 text-sm leading-6 text-stone-100 dark:bg-black">
                <code>{diff.sql}</code>
              </pre>
            )}
          </section>

          {hasInput ? (
            <>
              <section className="grid grid-cols-2 gap-3">
                <SummaryStat label="Changes" value={diff.summary.changes} />
                <SummaryStat label="Tables" value={diff.summary.tablesAdded + diff.summary.tablesDropped} />
                <SummaryStat label="Added" value={diff.summary.columnsAdded} />
                <SummaryStat label="Dropped" value={diff.summary.columnsDropped} />
              </section>

              <section>
                <div className="flex h-10 items-center border-b border-stone-200/80 px-1 dark:border-stone-800">
                  <span className="text-sm font-semibold">Warnings</span>
                </div>
                {diff.warnings.length === 0 ? (
                  <p className="px-1 py-4 text-sm text-stone-500 dark:text-stone-400">
                    No destructive changes detected.
                  </p>
                ) : (
                  <div className="mt-2 space-y-1">
                    {diff.warnings.map((warning, index) => (
                      <div
                        key={`${warning.title}-${index}`}
                        className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-stone-100/80 dark:hover:bg-stone-900"
                      >
                        <div className="shrink-0">{warningIcon(warning.level)}</div>
                        <p className="min-w-0">
                          <span className="font-semibold text-stone-950 dark:text-stone-50">
                            {warning.title}
                          </span>
                          <span className="mx-1.5 text-stone-300 dark:text-stone-700">
                            /
                          </span>
                          <span className="text-stone-600 dark:text-stone-400">
                            {warning.detail}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          ) : null}
        </aside>
      </main>
    </div>
  );
}

function SchemaPane({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-[0_18px_55px_-48px_rgba(15,23,42,0.45)] dark:bg-stone-900">
      <div className="flex h-12 items-center bg-white px-3 dark:bg-stone-900">
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        className="h-[calc(100vh-10rem)] min-h-[420px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-stone-900 outline-none placeholder:text-stone-400 dark:text-stone-100"
        placeholder={placeholder}
        aria-label={`${label} schema`}
      />
    </section>
  );
}
