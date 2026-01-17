"use client";

import { useEffect } from "react";

// Override parent layout's overflow-hidden
export function ScrollEnabler() {
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";
    document.body.style.position = "static";

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.overflowY = "";
      document.body.style.height = "";
      document.body.style.position = "";
    };
  }, []);

  return null;
}
