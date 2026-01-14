"use client";

import { cn } from "@/lib/utils";
import { SyntaxCard as SyntaxCardType } from "@/lib/learn/lessons/types";
import { Code2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SyntaxCardProps {
  card: SyntaxCardType;
  className?: string;
}

export function SyntaxCard({ card, className }: SyntaxCardProps) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${card.title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { color: #333; margin-bottom: 20px; }
            h2 { color: #555; margin-top: 24px; margin-bottom: 12px; font-size: 14px; font-weight: 600; }
            pre {
              background: #f5f5f5;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 12px;
              overflow-x: auto;
              font-size: 14px;
            }
            code { font-family: 'Monaco', 'Courier New', monospace; }
            ul { margin: 12px 0; padding-left: 20px; }
            li { margin: 8px 0; line-height: 1.5; }
          </style>
        </head>
        <body>
          <h1>${card.title}</h1>
          <h2>Syntax</h2>
          <pre><code>${card.syntax}</code></pre>
          ${
            card.examples.length > 0
              ? `
            <h2>Examples</h2>
            ${card.examples
              .map((example) => `<pre><code>${example}</code></pre>`)
              .join("")}
          `
              : ""
          }
          ${
            card.tips && card.tips.length > 0
              ? `
            <h2>Tips</h2>
            <ul>
              ${card.tips.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
          `
              : ""
          }
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--postgres-blue)]/10 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-[var(--postgres-blue)]" />
          </div>
          <h3 className="font-semibold text-sm">{card.title}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrint}
          className="h-8 px-2"
        >
          <Printer className="w-4 h-4" />
        </Button>
      </div>

      {/* Syntax */}
      <div className="p-4">
        <pre className="p-3 rounded-lg bg-muted/50 border border-border overflow-x-auto">
          <code className="text-sm font-mono text-foreground/90 whitespace-pre">
            {card.syntax}
          </code>
        </pre>
      </div>

      {/* Examples */}
      {card.examples.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Examples
          </p>
          <div className="space-y-2">
            {card.examples.map((example, i) => (
              <pre
                key={i}
                className="p-2 rounded-md bg-muted/30 border border-border overflow-x-auto"
              >
                <code className="text-xs font-mono text-foreground/80">
                  {example}
                </code>
              </pre>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {card.tips && card.tips.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Tips</p>
          <ul className="space-y-1">
            {card.tips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
              >
                <span className="text-[var(--postgres-blue)]">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
