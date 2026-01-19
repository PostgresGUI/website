"use client";

import type { Theme } from "../_lib/types";
import type { ReactNode } from "react";

interface DesktopIconProps {
  imageSrc?: string;
  label: string;
  onClick: () => void;
  theme: Theme;
  children?: ReactNode;
  fileBgColor?: string;
  fileBorderColor?: string;
  fileFoldColor?: string;
}

export function DesktopIcon({
  imageSrc,
  label,
  onClick,
  theme,
  children,
  fileBgColor,
  fileBorderColor,
  fileFoldColor,
}: DesktopIconProps) {
  const containerColors = {
    stone: { bg: "#ffffff", border: "#d6d3d1", fold: "#e7e5e4" },
    platinum: { bg: "#dddddd", border: "#808080", fold: "#bbbbbb" },
    aqua: { bg: "#ffffff", border: "#d1d5db", fold: "#e5e7eb" },
  };

  const labelStyles = {
    stone: "text-stone-700 bg-stone-100/90 border border-stone-200",
    platinum: "text-black bg-[#dddddd] border border-[#808080]",
    aqua: "text-gray-700 bg-white/90 backdrop-blur border border-gray-300 rounded-md",
  };

  const fontStyles = {
    stone: '"DM Sans", system-ui, sans-serif',
    platinum: '"Geneva", system-ui',
    aqua: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
  };

  const defaultColors = containerColors[theme];
  const colors = {
    bg: fileBgColor || defaultColors.bg,
    border: fileBorderColor || defaultColors.border,
    fold: fileFoldColor || defaultColors.fold,
  };

  const width = 72;
  const height = 88;
  const foldSize = 14;

  return (
    <button
      onClick={onClick}
      className="desktop-icon group flex flex-col items-center gap-2 cursor-pointer select-none"
    >
      {/* File container with folded corner */}
      <div className="relative transition-transform group-hover:scale-105">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          className="drop-shadow-sm group-hover:drop-shadow-md transition-all"
        >
          {/* Main file shape with cut corner */}
          <path
            d={`M0 3
               Q0 0 3 0
               L${width - foldSize} 0
               L${width} ${foldSize}
               L${width} ${height - 3}
               Q${width} ${height} ${width - 3} ${height}
               L3 ${height}
               Q0 ${height} 0 ${height - 3}
               Z`}
            fill={colors.bg}
            stroke={colors.border}
            strokeWidth="1"
          />
          {/* Folded corner */}
          <path
            d={`M${width - foldSize} 0
               L${width - foldSize} ${foldSize}
               L${width} ${foldSize}`}
            fill={colors.fold}
            stroke={colors.border}
            strokeWidth="1"
          />
        </svg>
        {/* Content centered on file */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children ? (
            children
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={label}
              className="w-14 h-14 object-contain"
              draggable={false}
            />
          ) : null}
        </div>
      </div>
      {/* Label outside container */}
      <span
        className={`text-[11px] font-medium text-center leading-tight px-1.5 py-0.5 rounded ${labelStyles[theme]}`}
        style={{ fontFamily: fontStyles[theme] }}
      >
        {label}
      </span>
    </button>
  );
}
