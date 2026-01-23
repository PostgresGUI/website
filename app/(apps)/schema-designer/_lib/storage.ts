import type { Schema } from "./types";

const STORAGE_KEY = "schema-designer-data";

export function saveSchema(schema: Schema): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch (e) {
    console.error("Failed to save schema to localStorage:", e);
  }
}

export function loadSchema(): Schema | null {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Validate basic structure
    if (parsed && Array.isArray(parsed.tables)) {
      return parsed as Schema;
    }

    return null;
  } catch (e) {
    console.error("Failed to load schema from localStorage:", e);
    return null;
  }
}

export function clearSchema(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear schema from localStorage:", e);
  }
}
