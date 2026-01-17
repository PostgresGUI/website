"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";
import type { Theme } from "../_lib/types";

interface FloatingWindowProps {
  title: string;
  src: string;
  displayUrl?: string;
  onClose: () => void;
  onFocus?: () => void;
  theme: Theme;
  originPoint?: { x: number; y: number } | null;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  zIndex?: number;
  isFocused?: boolean;
}

export function FloatingWindow({
  title,
  src,
  displayUrl,
  onClose,
  onFocus,
  theme,
  originPoint,
  initialPosition,
  initialSize = { width: 1000, height: 700 },
  zIndex = 100,
  isFocused = true,
}: FloatingWindowProps) {
  const finalPosition = initialPosition || {
    x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - initialSize.width / 2),
    y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - initialSize.height / 2),
  };

  const [position, setPosition] = useState(finalPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size });
  const [isAnimating, setIsAnimating] = useState(true);

  const windowRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // End animation after it completes
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  }, [isMaximized]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height));
        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        const newWidth = Math.max(400, e.clientX - position.x);
        const newHeight = Math.max(300, e.clientY - position.y);
        setSize({ width: newWidth, height: newHeight });
      }
    },
    [isDragging, isResizing, dragOffset, position, size]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
    } else {
      setPreMaximizeState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    setIsMaximized(!isMaximized);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  // Theme-specific inline styles for more control
  const getThemeStyles = () => {
    switch (theme) {
      case "platinum":
        return {
          window: { background: "#dddddd", border: "2px solid black", borderRadius: 0 },
          titleBar: { background: "#dddddd", borderBottom: "2px solid #808080" },
          titleText: { color: "black", fontFamily: '"Geneva", system-ui' },
          urlBar: { background: "#dddddd", borderBottom: "2px solid #808080" },
          urlInput: { background: "white", border: "2px inset #808080", borderRadius: 0 },
          urlText: { color: "black", fontFamily: '"Geneva", system-ui' },
          navBtnColor: "#808080",
        };
      case "aqua":
        return {
          window: { background: "white", borderRadius: "8px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)" },
          titleBar: { background: "linear-gradient(to bottom, #b8d4f0 0%, #6ba3d6 50%, #4a90c8 51%, #6ba3d6 100%)", borderBottom: "1px solid #4a7ba7" },
          titleText: { color: "#222", fontFamily: '-apple-system, BlinkMacSystemFont, "Lucida Grande", system-ui', textShadow: "0 1px 0 rgba(255,255,255,0.5)" },
          urlBar: { background: "#e8e8e8", borderBottom: "1px solid #c0c0c0" },
          urlInput: { background: "white", border: "1px solid #888", borderRadius: "4px", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)" },
          urlText: { color: "#333", fontFamily: '-apple-system, BlinkMacSystemFont, "Lucida Grande", system-ui' },
          navBtnColor: "#666666",
        };
      case "stone":
      default:
        return {
          window: { background: "white", borderRadius: "12px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)" },
          titleBar: { background: "#a8a29e", borderBottom: "1px solid #78716c" },
          titleText: { color: "#1c1917", fontFamily: '"DM Sans", system-ui, sans-serif' },
          urlBar: { background: "#d6d3d1", borderBottom: "1px solid #a8a29e" },
          urlInput: { background: "#e7e5e4", border: "1px solid #a8a29e", borderRadius: "8px" },
          urlText: { color: "#292524", fontFamily: '"DM Sans", system-ui, sans-serif' },
          navBtnColor: "#57534e",
        };
    }
  };

  const themeStyles = getThemeStyles();

  // Platinum theme uses box-style window controls
  const renderWindowControls = () => {
    if (theme === "platinum") {
      return (
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="w-4 h-4 border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dddddd] flex items-center justify-center"
          />
          <button
            onClick={handleMaximize}
            className="w-4 h-4 border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dddddd] flex items-center justify-center"
          />
        </div>
      );
    }

    // macOS-style traffic lights for stone and aqua
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors flex items-center justify-center group"
        >
          <X className="w-2 h-2 text-[#990000] opacity-0 group-hover:opacity-100" />
        </button>
        <button
          className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f5a623] transition-colors flex items-center justify-center group"
        >
          <Minus className="w-2 h-2 text-[#995700] opacity-0 group-hover:opacity-100" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#1aab29] transition-colors flex items-center justify-center group"
        >
          <Square className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100" />
        </button>
      </div>
    );
  };

  // Calculate animation origin as transform-origin percentage
  const getAnimationStyles = () => {
    if (!isAnimating || !originPoint) {
      return {};
    }

    // Calculate where the origin point is relative to the window (as percentage)
    const originXPercent = ((originPoint.x - position.x) / size.width) * 100;
    const originYPercent = ((originPoint.y - position.y) / size.height) * 100;

    return {
      "--origin-x": `${originXPercent}%`,
      "--origin-y": `${originYPercent}%`,
    } as React.CSSProperties;
  };

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col overflow-hidden ${isAnimating && originPoint ? "animate-genie-open" : ""}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        ...themeStyles.window,
        ...getAnimationStyles(),
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="flex items-center h-10 px-3 cursor-move select-none"
        style={themeStyles.titleBar}
        onMouseDown={handleMouseDown}
      >
        {renderWindowControls()}

        {/* Title */}
        <div className="flex-1 flex justify-center">
          <span
            className="text-[13px] font-medium"
            style={themeStyles.titleText}
          >
            {title}
          </span>
        </div>

        {/* Spacer for centering */}
        <div className="w-14" />
      </div>

      {/* URL bar */}
      <div
        className="flex items-center h-9 px-3 gap-3"
        style={themeStyles.urlBar}
      >
        <div className="flex items-center gap-1.5">
          <button
            className="p-1 rounded hover:opacity-70"
            style={{ color: (themeStyles as any).navBtnColor || "#9ca3af" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="p-1 rounded hover:opacity-70"
            style={{ color: (themeStyles as any).navBtnColor || "#9ca3af" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div
          className="flex-1 flex items-center h-6 px-3"
          style={themeStyles.urlInput}
        >
          <span
            className="text-[12px] truncate"
            style={themeStyles.urlText}
          >
            {displayUrl || src}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white">
        {/* Overlay to capture mouse events during drag/resize */}
        {(isDragging || isResizing) && (
          <div className="absolute inset-0 z-10" />
        )}
        {/* Overlay to capture clicks when window is not focused */}
        {!isFocused && (
          <div
            className="absolute inset-0 z-10 cursor-default"
            onMouseDown={onFocus}
          />
        )}
        <iframe
          ref={iframeRef}
          src={src}
          className="w-full h-full border-0"
          title={title}
        />
      </div>

      {/* Resize handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize flex items-end justify-end p-1"
          onMouseDown={handleResizeStart}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ opacity: 0.4 }}
          >
            {/* Diagonal grip lines */}
            <path
              d="M14 2L2 14M14 7L7 14M14 12L12 14"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
