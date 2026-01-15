import { Hash, Type, Calendar } from "lucide-react";
import type { Theme, Column } from "./types";

export function getTypeIcon(type: Column["type"], theme: Theme) {
  const size = theme === "platinum" ? "w-3.5 h-3.5" : "w-4 h-4";

  switch (type) {
    case "integer":
    case "decimal":
      return <Hash className={size} />;
    case "varchar":
      return <Type className={size} />;
    case "timestamp":
      return <Calendar className={size} />;
    default:
      return <Type className={size} />;
  }
}
