/**
 * Attribution helpers for paid-ads traffic.
 *
 * Captures UTM parameters and platform click IDs (gclid/fbclid/msclkid/ttclid)
 * on first page load, persists them in sessionStorage, and exposes a helper
 * that appends Apple App Store campaign tokens (`ct`, `pt`, `mt`) to the
 * App Store URL so installs/sales surface in App Store Connect → App Analytics
 * → Sources per campaign.
 *
 * See:
 * - Apple campaign links: https://developer.apple.com/help/app-store-connect/view-app-analytics/campaigns/
 * - Google Ads gclid: https://support.google.com/google-ads/answer/2998031
 */

const STORAGE_KEY = "pg_attribution_v1";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
] as const;

type TrackedParam = (typeof TRACKED_PARAMS)[number];
type Attribution = Partial<Record<TrackedParam, string>>;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Read attribution params from the current URL. Safe to call on the server
 * (returns an empty object).
 */
function readAttributionFromUrl(): Attribution {
  if (!isBrowser()) return {};
  const params = new URLSearchParams(window.location.search);
  const result: Attribution = {};
  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

/**
 * Capture any tracked params from the URL into sessionStorage. Only overwrites
 * existing values if the new URL actually carries attribution — direct
 * navigations between pages don't clobber the original ad-click attribution.
 */
export function captureAttribution(): void {
  if (!isBrowser()) return;
  try {
    const fromUrl = readAttributionFromUrl();
    if (Object.keys(fromUrl).length === 0) return;
    const existing = getStoredAttribution();
    const merged = { ...existing, ...fromUrl };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage disabled (private mode, etc.) — fail silent.
  }
}

export function getStoredAttribution(): Attribution {
  if (!isBrowser()) return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Build an Apple App Store campaign token from attribution data.
 * `ct` (campaign token) is a free-form string ≤40 chars shown in App Store
 * Connect's Sources report. We encode source + campaign for at-a-glance
 * readability.
 */
function buildCampaignToken(attr: Attribution): string | null {
  // Prefer explicit UTM campaign, fall back to click-id platform hints.
  const source =
    attr.utm_source ||
    (attr.gclid ? "google" : attr.fbclid ? "meta" : attr.msclkid ? "bing" : attr.ttclid ? "tiktok" : null);
  const campaign = attr.utm_campaign || attr.utm_medium || null;
  if (!source && !campaign) return null;
  const parts = [source, campaign].filter(Boolean).join("-");
  // Apple truncates at 40 chars; be conservative.
  return parts.slice(0, 40);
}

/**
 * Append Apple campaign tokens (ct, pt, mt) to an App Store URL so installs
 * attribute correctly in App Store Connect.
 *
 * - `mt=12` tells Apple this is a Mac App Store link.
 * - `ct` carries our campaign token.
 * - `pt` is the provider token (static, per-developer). Configure once via
 *   NEXT_PUBLIC_APPLE_PROVIDER_TOKEN if you want provider-level attribution.
 */
export function appendAppStoreAttribution(href: string): string {
  if (!isBrowser()) return href;
  const attr = getStoredAttribution();
  const ct = buildCampaignToken(attr);
  if (!ct) return href;
  try {
    const url = new URL(href);
    url.searchParams.set("mt", "12");
    url.searchParams.set("ct", ct);
    const pt = process.env.NEXT_PUBLIC_APPLE_PROVIDER_TOKEN;
    if (pt) url.searchParams.set("pt", pt);
    return url.toString();
  } catch {
    return href;
  }
}

/**
 * Fire an outbound-click analytics event for the App Store CTA. Uses the
 * global gtag shim that @next/third-parties/google installs once GA4 is
 * loaded. No-ops when analytics haven't been granted consent.
 */
export function trackAppStoreClick(href: string, attribution?: Attribution): void {
  if (!isBrowser()) return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  const attr = attribution ?? getStoredAttribution();
  gtag("event", "app_store_click", {
    event_category: "outbound",
    event_label: href,
    transport_type: "beacon",
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    gclid: attr.gclid,
    fbclid: attr.fbclid,
    msclkid: attr.msclkid,
    ttclid: attr.ttclid,
  });
}
