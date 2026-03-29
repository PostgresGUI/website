"use client";

import { useEffect, useState } from "react";
import { GitHubIcon } from "@/components/icons";

const GITHUB_LINK = "https://github.com/postgresgui/postgresgui";
const GITHUB_API = "https://api.github.com/repos/postgresgui/postgresgui";

export function GitHubButton({ className }: { className?: string }) {
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(GITHUB_API)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <a
      href={GITHUB_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        minWidth: 220,
        paddingLeft: 20,
        paddingRight: 20,
        background: "linear-gradient(to bottom, #ffffff 0%, #f3f3f3 100%)",
        borderRadius: 12,
        border: "1px solid #d4d4d4",
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.9), inset 0 -1px 2px 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.08), 0 3px 6px -1px rgba(0,0,0,0.06)",
      }}
      className={`inline-flex items-center justify-center gap-1.5 text-gray-800 text-sm font-semibold no-underline transition-all duration-150 hover:brightness-[0.97] active:brightness-[0.95] active:shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.08)] ${className ?? ""}`}
    >
      <GitHubIcon width={18} height={18} />
      <span>Open Source</span>
      {starCount !== null && (
        <>
          <span className="mx-0.5 text-gray-300">|</span>
          <span className="text-xs">⭐</span>
          <span className="text-xs font-bold tabular-nums text-gray-700">
            {starCount >= 1000
              ? `${(starCount / 1000).toFixed(1)}k`
              : starCount}
          </span>
        </>
      )}
    </a>
  );
}
