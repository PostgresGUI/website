"use client";

import { PROVIDER_PRESETS } from "../_lib/presets";

interface ProviderPresetsProps {
  activePresetId: string | null;
  onSelect: (presetId: string) => void;
}

export function ProviderPresets({ activePresetId, onSelect }: ProviderPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROVIDER_PRESETS.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onSelect(preset.id)}
          title={preset.description}
          className={`
            px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 cursor-pointer
            ${
              activePresetId === preset.id
                ? "bg-[var(--postgres-blue)] text-white border-[var(--postgres-blue)] shadow-sm"
                : "bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-[var(--postgres-blue)] hover:text-[var(--postgres-blue)]"
            }
          `}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}
