"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import type { ConnectionConfig, OutputFormat } from "../_lib/types";
import { DEFAULT_CONFIG, SSL_MODES } from "../_lib/types";
import { buildURI, buildKeyValue } from "../_lib/builder";
import { PROVIDER_PRESETS } from "../_lib/presets";
import { saveConfig, loadConfig } from "../_lib/storage";
import { ProviderPresets } from "./provider-presets";
import { OutputPanel } from "./output-panel";
import { ParseInput } from "./parse-input";

export function ConnectionBuilder() {
  const [config, setConfig] = useState<ConnectionConfig>(DEFAULT_CONFIG);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("uri");
  const [parseMode, setParseMode] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadConfig();
    if (saved) setConfig(saved);
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) saveConfig(config);
  }, [config, isLoaded]);

  const uri = useMemo(() => buildURI(config), [config]);
  const keyValue = useMemo(() => buildKeyValue(config), [config]);

  const updateField = (field: keyof ConnectionConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
    setActivePresetId(null);
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = PROVIDER_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setConfig((prev) => ({ ...prev, ...preset.defaults }));
    setActivePresetId(presetId);
  };

  const handleParsed = (parsed: ConnectionConfig) => {
    setConfig(parsed);
    setParseMode(false);
    setActivePresetId(null);
  };

  const activePreset = activePresetId
    ? PROVIDER_PRESETS.find((p) => p.id === activePresetId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/80 dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-3 hover:opacity-80 transition-opacity">
            <Image
              src="/postgresgui-elephant.png"
              alt="PostgresGUI"
              width={48}
              height={48}
              className="w-20 h-20 object-contain"
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-display tracking-tight text-stone-900 dark:text-white mb-2">
            Connection String Builder
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base">
            Build valid PostgreSQL connection URIs visually, or parse existing strings.
          </p>
        </div>

        {/* Provider Presets */}
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Provider Preset
          </label>
          <ProviderPresets activePresetId={activePresetId} onSelect={handlePresetSelect} />
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setParseMode(false)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              !parseMode
                ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            Build
          </button>
          <button
            onClick={() => setParseMode(true)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              parseMode
                ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            Parse
          </button>
        </div>

        {parseMode ? (
          <ParseInput onParsed={handleParsed} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Form */}
            <div className="space-y-4">
              {/* Host & Port */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    Host
                  </label>
                  <input
                    type="text"
                    value={config.host}
                    onChange={(e) => updateField("host", e.target.value)}
                    placeholder={activePreset?.hostPlaceholder || "localhost"}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    Port
                  </label>
                  <input
                    type="text"
                    value={config.port}
                    onChange={(e) => updateField("port", e.target.value)}
                    placeholder="5432"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Database */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                  Database
                </label>
                <input
                  type="text"
                  value={config.database}
                  onChange={(e) => updateField("database", e.target.value)}
                  placeholder="mydb"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                />
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    value={config.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    placeholder="postgres"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={config.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="password"
                      className="w-full px-3 py-2 pr-9 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* SSL Mode */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                  SSL Mode
                </label>
                <select
                  value={config.sslMode}
                  onChange={(e) => updateField("sslMode", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                >
                  {SSL_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Advanced: Schema, App Name, Timeout */}
              <details className="group">
                <summary className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 cursor-pointer hover:text-stone-700 dark:hover:text-stone-300 select-none">
                  Advanced Options
                  <span className="ml-1 text-[10px] group-open:rotate-90 inline-block transition-transform">&#9654;</span>
                </summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                      Schema (search_path)
                    </label>
                    <input
                      type="text"
                      value={config.schema}
                      onChange={(e) => updateField("schema", e.target.value)}
                      placeholder="public"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                      Application Name
                    </label>
                    <input
                      type="text"
                      value={config.applicationName}
                      onChange={(e) => updateField("applicationName", e.target.value)}
                      placeholder="my-app"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                      Connect Timeout (seconds)
                    </label>
                    <input
                      type="text"
                      value={config.connectTimeout}
                      onChange={(e) => updateField("connectTimeout", e.target.value)}
                      placeholder="30"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--postgres-blue)] focus:border-transparent"
                    />
                  </div>
                </div>
              </details>
            </div>

            {/* Output Panel (sticky on desktop) */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <OutputPanel
                uri={uri}
                keyValue={keyValue}
                outputFormat={outputFormat}
                onFormatChange={setOutputFormat}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
