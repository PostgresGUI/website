"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import type { Theme } from "../_lib/types";

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themeOptions: { value: Theme; label: string; font: string }[] = [
  { value: "stone", label: "Modern (Default)", font: '"DM Sans", system-ui' },
  { value: "platinum", label: "System 7 (Platinum)", font: '"Geneva", system-ui' },
  { value: "aqua", label: "Mac OS X (Aqua)", font: "-apple-system, system-ui" },
];

export function SettingsDropdown({ theme, setTheme }: Props) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center gap-2 px-3 py-2 text-[13px] font-medium shadow-lg transition-all ${
          theme === "platinum"
            ? "bg-[#dddddd] border-2 border-t-white border-l-white border-b-black border-r-black text-black hover:bg-[#cccccc]"
            : theme === "stone"
              ? "bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 rounded-lg"
              : "bg-white/90 backdrop-blur border border-gray-300 text-gray-700 hover:bg-white rounded"
        }`}
        style={{
          fontFamily:
            theme === "platinum"
              ? '"Geneva", system-ui'
              : theme === "stone"
                ? '"DM Sans", system-ui'
                : "-apple-system, system-ui",
        }}
      >
        <Settings className="w-4 h-4" />
        Theme
      </button>

      {showSettings && (
        <div
          className={`absolute top-full right-0 mt-2 w-48 shadow-xl overflow-hidden ${
            theme === "platinum"
              ? "bg-[#dddddd] border-2 border-black"
              : theme === "stone"
                ? "bg-white border border-stone-300 rounded-lg"
                : "bg-white/95 backdrop-blur border border-gray-200 rounded"
          }`}
        >
          <div className="p-2 flex flex-col gap-1">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setShowSettings(false);
                }}
                className={`w-full text-left px-3 py-2 text-[13px] ${
                  theme === opt.value
                    ? opt.value === "platinum"
                      ? "bg-black text-white"
                      : opt.value === "stone"
                        ? "bg-stone-200 text-stone-900 font-medium rounded-md"
                        : "bg-[#3399ff] text-white rounded"
                    : theme === "stone"
                      ? "hover:bg-stone-100 text-stone-700 rounded-md"
                      : "hover:bg-gray-100 rounded"
                }`}
                style={{ fontFamily: opt.font }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
