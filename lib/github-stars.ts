/**
 * Server-side GitHub star count fetcher with ISR caching.
 *
 * Called from Server Components. Next.js fetch cache + `revalidate: 3600`
 * keeps it off the critical path (no client fetch, no CLS from a late
 * update) while staying fresh within an hour.
 */

const REPO = "postgresgui/postgresgui";
const API_URL = `https://api.github.com/repos/${REPO}`;
const FLOOR = 270; // Conservative floor shown if the API call fails.

export async function getGitHubStars(): Promise<number> {
  try {
    const res = await fetch(API_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FLOOR;
    const data = (await res.json()) as { stargazers_count?: number };
    if (typeof data.stargazers_count !== "number") return FLOOR;
    // Never display a number lower than the known floor — protects against
    // transient API weirdness degrading social proof mid-day.
    return Math.max(data.stargazers_count, FLOOR);
  } catch {
    return FLOOR;
  }
}

/**
 * Format a star count for display: "270", "1.2k", "12k".
 */
export function formatStarCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return k >= 10 ? `${Math.round(k)}k` : `${k.toFixed(1)}k`;
  }
  return `${count}`;
}
