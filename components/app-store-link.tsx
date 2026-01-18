"use client";

import { ReactNode } from "react";

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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof navigator !== "undefined" && navigator.platform?.includes("Mac")) {
      e.preventDefault();
      const macAppStoreUrl = href.replace("https://", "macappstore://");
      window.location.href = macAppStoreUrl;
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
