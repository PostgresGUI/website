"use client";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  padding?: number;
  autoFocus?: boolean;
}

export function SQLEditor({
  value,
  onChange,
  onRun,
  placeholder = "Write your SQL query here...",
  className = "",
  style,
  padding = 12,
  autoFocus = false,
}: SQLEditorProps) {
  return (
    <Editor
      value={value}
      onValueChange={onChange}
      highlight={(code) => highlight(code, languages.sql, "sql")}
      onKeyDown={(e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
          e.preventDefault();
          onRun?.();
        }
      }}
      placeholder={placeholder}
      padding={padding}
      className={className}
      autoFocus={autoFocus}
      style={{
        fontFamily: 'Monaco, "Courier New", monospace',
        fontSize: 14,
        lineHeight: "22px",
        ...style,
      }}
    />
  );
}
