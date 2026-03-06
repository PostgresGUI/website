import type { ConnectionConfig } from "./types";

const STORAGE_KEY = "connection-string-builder-data";

export function saveConfig(config: ConnectionConfig): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save config to localStorage:", e);
  }
}

export function loadConfig(): ConnectionConfig | null {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    if (parsed && typeof parsed.host === "string") {
      return parsed as ConnectionConfig;
    }

    return null;
  } catch (e) {
    console.error("Failed to load config from localStorage:", e);
    return null;
  }
}
