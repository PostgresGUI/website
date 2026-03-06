export type CategoryId =
  | "text"
  | "numeric"
  | "datetime"
  | "json"
  | "boolean"
  | "uuid"
  | "binary"
  | "arrays"
  | "special";

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
  tldr: string;
}

export interface DataType {
  id: string;
  name: string;
  category: CategoryId;
  storage: string;
  range: string;
  whenToUse: string;
  performance: string;
  recommended: boolean;
  sqlExample: string;
  vsNotes: string;
}
