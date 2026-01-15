"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import type { Theme } from "../_lib/types";

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themeOptions: { value: Theme; label: string; font: string }[] = [
  { value: "platinum", label: "System 7 (Platinum)", font: '"Geneva", system-ui' },
  { value: "aqua", label: "Mac OS X (Aqua)", font: "-apple-system, system-ui" },
];

export function SettingsDropdown({ theme, setTheme }: Props) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-lg shadow-lg transition-all ${
          theme === "platinum"
            ? "bg-[#dddddd] border-2 border-t-white border-l-white border-b-black border-r-black text-black hover:bg-[#cccccc]"
            : "bg-white/90 backdrop-blur border border-gray-300 text-gray-700 hover:bg-white"
        }`}
        style={{
          fontFamily:
            theme === "platinum" ? '"Geneva", system-ui' : "-apple-system, system-ui",
        }}
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>

      {showSettings && (
        <div
          className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden ${
            theme === "platinum"
              ? "bg-[#dddddd] border-2 border-black"
              : "bg-white/95 backdrop-blur border border-gray-200"
          }`}
        >
          <div
            className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wide ${
              theme === "platinum"
                ? "bg-[#cccccc] border-b border-[#888]"
                : "bg-gray-100 border-b text-gray-500"
            }`}
          >
            Theme
          </div>
          <div className="p-1">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setShowSettings(false);
                }}
                className={`w-full text-left px-3 py-2 text-[13px] rounded ${
                  theme === opt.value
                    ? opt.value === "platinum"
                      ? "bg-black text-white"
                      : "bg-[#3399ff] text-white"
                    : "hover:bg-gray-100"
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
