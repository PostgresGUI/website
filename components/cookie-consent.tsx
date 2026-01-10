"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_KEY = "cookie-consent";
type ConsentState = "pending" | "accepted" | "declined";

// EU/EEA timezones that require GDPR consent
const EU_TIMEZONES = [
  "Europe/", // All European timezones
  "Atlantic/Azores", // Portugal
  "Atlantic/Canary", // Spain
  "Atlantic/Faroe", // Denmark
  "Atlantic/Madeira", // Portugal
];

function isEUVisitor(): boolean {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return EU_TIMEZONES.some((tz) => timezone.startsWith(tz));
  } catch {
    // If we can't detect, assume EU to be safe
    return true;
  }
}

type CookieConsentProps = {
  gtmId: string;
};

export function CookieConsent({ gtmId }: CookieConsentProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEU, setIsEU] = useState<boolean | null>(null);

  useEffect(() => {
    const euVisitor = isEUVisitor();
    setIsEU(euVisitor);

    // Non-EU visitors: auto-accept and load GTM without banner
    if (!euVisitor) {
      setConsent("accepted");
      setIsVisible(false);
      return;
    }

    // EU visitors: check for stored consent
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null;
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
      setIsVisible(false);
    } else {
      setConsent("pending");
      // Delay showing banner for smoother page load
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);


  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem(CONSENT_KEY, "accepted");
      setConsent("accepted");
      setIsVisible(false);
    }, 300);
  };

  const handleDecline = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem(CONSENT_KEY, "declined");
      setConsent("declined");
      setIsVisible(false);
    }, 300);
  };

  // Show GA when consent is accepted (or non-EU auto-accepted)
  const showAnalytics = consent === "accepted";

  if (!isVisible || consent !== "pending") {
    return showAnalytics ? <GoogleAnalytics gaId={gtmId} /> : null;
  }

  return (
    <>
      {showAnalytics && <GoogleAnalytics gaId={gtmId} />}
      <style>{`
        @keyframes cookie-slide-up {
          from {
            opacity: 0;
            transform: translateY(100%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes cookie-slide-down {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(100%) scale(0.95);
          }
        }
      `}</style>
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-[100]
          p-4 sm:p-6
          ${
            isClosing
              ? "animate-[cookie-slide-down_0.3s_ease-in_forwards]"
              : "animate-[cookie-slide-up_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          }
        `}
        role="dialog"
        aria-label="Cookie consent"
        aria-describedby="cookie-description"
      >
        <div
          className="
            max-w-2xl mx-auto
            bg-white/95 dark:bg-stone-900/95
            backdrop-blur-xl
            border border-gray-200/80 dark:border-white/10
            rounded-2xl
            shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.02)]
            dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]
            overflow-hidden
          "
        >
          {/* Subtle top accent line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--postgres-blue)] to-transparent opacity-60" />

          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
              {/* Icon */}
              <div className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-xl bg-[var(--postgres-blue)]/10 dark:bg-[var(--postgres-blue)]/20">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[var(--postgres-blue)]"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5 tracking-tight">
                  Privacy on this website
                </h3>
                <p
                  id="cookie-description"
                  className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400"
                >
                  We use analytics to understand how visitors use this site.
                  Your data is never sold.{" "}
                  <a
                    href="/privacy"
                    className="text-[var(--postgres-blue)] hover:underline underline-offset-2"
                  >
                    Privacy policy
                  </a>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 sm:shrink-0">
                <button
                  onClick={handleDecline}
                  className="
                    flex-1 sm:flex-none
                    px-4 py-2
                    text-[13px] font-medium
                    text-gray-600 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-white
                    hover:bg-gray-100 dark:hover:bg-white/5
                    rounded-lg
                    transition-all duration-200
                  "
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="
                    flex-1 sm:flex-none
                    px-5 py-2
                    text-[13px] font-semibold
                    text-white
                    bg-[var(--postgres-blue)]
                    hover:bg-[var(--postgres-blue-dark)]
                    rounded-lg
                    shadow-sm
                    hover:shadow-md
                    transition-all duration-200
                    hover:scale-[1.02]
                    active:scale-[0.98]
                  "
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

