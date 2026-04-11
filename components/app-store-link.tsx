"use client";

import { ReactNode, useEffect } from "react";
import {
  captureAttribution,
  appendAppStoreAttribution,
  trackAppStoreClick,
} from "@/lib/attribution";

export const APP_STORE_LINK = "https://apps.apple.com/app/postgresgui/id6756467181";

type AppStoreLinkProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function AppStoreLink({
  href = APP_STORE_LINK,
  className,
  children,
  onClick,
}: AppStoreLinkProps) {
  // Capture UTM + click IDs from the landing URL exactly once per session.
  useEffect(() => {
    captureAttribution();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Decorate the outbound URL with Apple campaign tokens so installs
    // attribute correctly in App Store Connect.
    const decorated = appendAppStoreAttribution(href);
    trackAppStoreClick(decorated);

    if (decorated !== href) {
      // Navigate to the decorated URL instead of the raw one. Letting the
      // default anchor behavior run would send the user to the un-decorated
      // href, losing attribution.
      e.preventDefault();
      window.open(decorated, "_blank", "noopener,noreferrer");
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
