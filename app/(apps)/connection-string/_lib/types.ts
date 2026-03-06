export type SSLMode =
  | "disable"
  | "allow"
  | "prefer"
  | "require"
  | "verify-ca"
  | "verify-full";

export type OutputFormat = "uri" | "keyvalue";

export interface ConnectionConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  sslMode: SSLMode;
  schema: string;
  applicationName: string;
  connectTimeout: string;
}

export interface ProviderPreset {
  id: string;
  name: string;
  description: string;
  hostPlaceholder: string;
  defaults: Partial<ConnectionConfig>;
}

export const SSL_MODES: SSLMode[] = [
  "disable",
  "allow",
  "prefer",
  "require",
  "verify-ca",
  "verify-full",
];

export const DEFAULT_CONFIG: ConnectionConfig = {
  host: "localhost",
  port: "5432",
  database: "",
  username: "",
  password: "",
  sslMode: "prefer",
  schema: "",
  applicationName: "",
  connectTimeout: "",
};
