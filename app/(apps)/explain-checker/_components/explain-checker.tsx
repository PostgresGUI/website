"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  CircleHelp,
  Copy,
  FileJson,
  Gauge,
  Info,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  analyzeExplainJson,
  explainSamples,
  type FindingSeverity,
} from "../_lib/analyzer";

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

function severityIcon(severity: FindingSeverity) {
  if (severity === "critical") {
    return <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />;
  }

  if (severity === "warning") {
    return <Gauge className="size-5 text-amber-600 dark:text-amber-400" />;
  }

  return <Info className="size-5 text-sky-600 dark:text-sky-400" />;
}

function severityClass(severity: FindingSeverity) {
  if (severity === "critical") {
    return "text-red-600 dark:text-red-400";
  }

  if (severity === "warning") {
    return "text-amber-600 dark:text-amber-400";
  }

  return "text-sky-600 dark:text-sky-400";
}

function formatMs(value: number | null) {
  if (value === null) return "-";
  if (value < 10) return `${value.toFixed(2)} ms`;
  return `${Math.round(value).toLocaleString()} ms`;
}

function formatNumber(value: number | null) {
  return value === null ? "-" : Math.round(value).toLocaleString();
}

export function ExplainChecker() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    if (!input.trim()) return null;

    try {
      return {
        state: "ready" as const,
        result: analyzeExplainJson(input),
      };
    } catch (error) {
      return {
        state: "error" as const,
        message:
          error instanceof Error ? error.message : "Could not read this plan.",
      };
    }
  }, [input]);

  const findingText =
    analysis?.state === "ready"
      ? analysis.result.findings
          .map(
            (finding) =>
              `${finding.title} - ${finding.location}: ${finding.detail}. ${finding.tip}`,
          )
          .join("\n")
      : "";

  const handleCopyFindings = async () => {
    if (!findingText) return;

    await navigator.clipboard.writeText(findingText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950 dark:bg-stone-950 dark:text-stone-50">
      <header className="bg-white shadow-[0_1px_0_rgba(28,25,23,0.08)] dark:bg-stone-950 dark:shadow-[0_1px_0_rgba(255,255,255,0.08)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <FileJson className="size-5 text-[var(--postgres-blue)]" />
            <span className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight">
              EXPLAIN Checker
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

      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <section className="min-h-[calc(100vh-7rem)] overflow-hidden rounded-lg bg-white shadow-[0_18px_55px_-48px_rgba(15,23,42,0.45)] dark:bg-stone-900">
          <div className="flex h-12 items-center justify-between bg-white px-3 dark:bg-stone-900">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Plan JSON</span>
              <IconTip label="Use EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)">
                <button
                  type="button"
                  className="grid size-8 place-items-center rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                  aria-label="Plan JSON help"
                >
                  <CircleHelp className="size-4" />
                </button>
              </IconTip>
            </div>
            <div className="flex items-center gap-1">
              <IconTip label="Load sample plan">
                <label className="relative">
                  <span className="sr-only">Load sample plan</span>
                  <select
                    defaultValue=""
                    onChange={(event) => {
                      const sample = explainSamples.find(
                        (item) => item.id === event.target.value,
                      );

                      if (sample) {
                        setInput(sample.json);
                        event.target.value = "";
                      }
                    }}
                    className="h-8 max-w-36 cursor-pointer rounded-md bg-stone-100 px-2 pr-7 text-xs font-medium text-stone-700 outline-none transition-colors hover:bg-stone-200/70 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 sm:max-w-none"
                    aria-label="Load sample plan"
                  >
                    <option value="" disabled>
                      Samples
                    </option>
                    {explainSamples.map((sample) => (
                      <option key={sample.id} value={sample.id}>
                        {sample.label}
                      </option>
                    ))}
                  </select>
                </label>
              </IconTip>
              <IconTip label="Reset">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setInput("")}
                  aria-label="Reset"
                >
                  <Trash2 className="size-4" />
                </Button>
              </IconTip>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            className="h-[calc(100vh-10rem)] min-h-[420px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-stone-900 outline-none placeholder:text-stone-400 dark:text-stone-100"
            placeholder='[{"Plan":{"Node Type":"Index Scan", ...}}]'
            aria-label="EXPLAIN JSON input"
          />
        </section>

        <aside className="space-y-5">
          <section>
            <div className="flex h-12 items-center justify-between border-b border-stone-200/80 px-1 dark:border-stone-800">
              <span className="text-sm font-semibold">Findings</span>
              <div className="flex items-center gap-1">
                <IconTip label="Copy findings">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={!findingText}
                    onClick={handleCopyFindings}
                    aria-label="Copy findings"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </IconTip>
                <IconTip label="Re-check">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setInput((value) => value.trim())}
                    aria-label="Re-check"
                  >
                    <RotateCcw className="size-4" />
                  </Button>
                </IconTip>
              </div>
            </div>

            <div>
              {!analysis ? (
                <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center text-stone-500 dark:text-stone-400">
                  <ShieldCheck className="size-8 text-stone-300 dark:text-stone-700" />
                  <p className="text-sm">Paste a JSON plan.</p>
                </div>
              ) : analysis.state === "error" ? (
                <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-lg bg-red-50/70 text-center text-red-600 dark:bg-red-950/20 dark:text-red-400">
                  <AlertTriangle className="size-8" />
                  <p className="text-sm font-medium">{analysis.message}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {analysis.result.findings.map((finding) => (
                    <article
                      key={`${finding.id}-${finding.location}-${finding.detail}`}
                      className="group rounded-md px-2 py-2 transition-colors hover:bg-stone-100/80 dark:hover:bg-stone-900"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`shrink-0 ${severityClass(finding.severity)}`}
                        >
                          {severityIcon(finding.severity)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0 text-sm leading-5">
                              <span className="font-semibold text-stone-950 dark:text-stone-50">
                                {finding.title}
                              </span>
                              <span className="mx-1.5 text-stone-300 dark:text-stone-700">
                                /
                              </span>
                              <span className="text-stone-500 dark:text-stone-400">
                                {finding.location}
                              </span>
                              <span className="mx-1.5 text-stone-300 dark:text-stone-700">
                                /
                              </span>
                              <span className="text-stone-800 dark:text-stone-200">
                                {finding.detail}
                              </span>
                            </div>
                            <IconTip label={finding.tip}>
                              <button
                                type="button"
                                className="grid size-7 shrink-0 place-items-center rounded-md text-stone-400 opacity-0 transition hover:bg-white hover:text-stone-700 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-80 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                                aria-label={`${finding.title} tip`}
                              >
                                <CircleHelp className="size-4" />
                              </button>
                            </IconTip>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            {analysis?.state === "ready" ? (
              <>
                <div className="rounded-md border border-stone-200/80 p-3 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Runtime
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {formatMs(analysis.result.summary.executionMs)}
                  </p>
                </div>
                <div className="rounded-md border border-stone-200/80 p-3 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Nodes
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {analysis.result.summary.nodeCount}
                  </p>
                </div>
                <div className="rounded-md border border-stone-200/80 p-3 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Cost
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {formatNumber(analysis.result.summary.totalCost)}
                  </p>
                </div>
                <div className="rounded-md border border-stone-200/80 p-3 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Rows
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {formatNumber(analysis.result.summary.planRows)}
                  </p>
                </div>
              </>
            ) : null}
          </section>
        </aside>
      </main>
    </div>
  );
}
