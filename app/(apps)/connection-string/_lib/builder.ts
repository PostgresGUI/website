import type { ConnectionConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

export function buildURI(config: ConnectionConfig): string {
  const { host, port, database, username, password, sslMode, schema, applicationName, connectTimeout } = config;

  if (!host) return "";

  let uri = "postgresql://";

  if (username) {
    uri += encodeURIComponent(username);
    if (password) {
      uri += ":" + encodeURIComponent(password);
    }
    uri += "@";
  }

  uri += host;

  if (port && port !== "5432") {
    uri += ":" + port;
  }

  if (database) {
    uri += "/" + encodeURIComponent(database);
  }

  const params: string[] = [];

  if (sslMode && sslMode !== "prefer") {
    params.push("sslmode=" + sslMode);
  }

  if (schema) {
    params.push("options=-c%20search_path%3D" + encodeURIComponent(schema));
  }

  if (applicationName) {
    params.push("application_name=" + encodeURIComponent(applicationName));
  }

  if (connectTimeout) {
    params.push("connect_timeout=" + connectTimeout);
  }

  if (params.length > 0) {
    uri += "?" + params.join("&");
  }

  return uri;
}

export function buildKeyValue(config: ConnectionConfig): string {
  const { host, port, database, username, password, sslMode, schema, applicationName, connectTimeout } = config;

  if (!host) return "";

  const parts: string[] = [];

  parts.push(`host=${host}`);
  parts.push(`port=${port || "5432"}`);

  if (database) parts.push(`dbname=${database}`);
  if (username) parts.push(`user=${username}`);

  if (password) {
    if (/['\s\\]/.test(password)) {
      parts.push(`password='${password.replace(/'/g, "\\'")}'`);
    } else {
      parts.push(`password=${password}`);
    }
  }

  if (sslMode) parts.push(`sslmode=${sslMode}`);

  if (schema) {
    parts.push(`options='-c search_path=${schema}'`);
  }

  if (applicationName) parts.push(`application_name=${applicationName}`);
  if (connectTimeout) parts.push(`connect_timeout=${connectTimeout}`);

  return parts.join(" ");
}

export function parseConnectionString(input: string): ConnectionConfig | { error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { error: "Empty input" };

  if (trimmed.startsWith("postgresql://") || trimmed.startsWith("postgres://")) {
    return parseURI(trimmed);
  }

  if (trimmed.includes("=")) {
    return parseKeyValue(trimmed);
  }

  return { error: "Unrecognized format. Expected a URI (postgresql://...) or key-value (host=... port=...) string." };
}

function parseURI(uri: string): ConnectionConfig | { error: string } {
  try {
    const normalized = uri.replace(/^postgres(ql)?:\/\//, "https://");
    const url = new URL(normalized);

    const config: ConnectionConfig = {
      ...DEFAULT_CONFIG,
      host: url.hostname,
      port: url.port || "5432",
      database: url.pathname.slice(1) ? decodeURIComponent(url.pathname.slice(1)) : "",
      username: url.username ? decodeURIComponent(url.username) : "",
      password: url.password ? decodeURIComponent(url.password) : "",
    };

    const sslmode = url.searchParams.get("sslmode");
    if (sslmode) config.sslMode = sslmode as ConnectionConfig["sslMode"];

    const options = url.searchParams.get("options");
    if (options) {
      const searchPathMatch = options.match(/search_path[=\s]+(\S+)/);
      if (searchPathMatch) config.schema = searchPathMatch[1];
    }

    const appName = url.searchParams.get("application_name");
    if (appName) config.applicationName = appName;

    const timeout = url.searchParams.get("connect_timeout");
    if (timeout) config.connectTimeout = timeout;

    return config;
  } catch {
    return { error: "Invalid URI format. Check for missing or malformed components." };
  }
}

function parseKeyValue(input: string): ConnectionConfig | { error: string } {
  const config: ConnectionConfig = { ...DEFAULT_CONFIG };

  const regex = /(\w+)\s*=\s*(?:'((?:[^'\\]|\\.)*)'|(\S+))/g;
  let match;
  let foundAny = false;

  while ((match = regex.exec(input)) !== null) {
    foundAny = true;
    const key = match[1];
    const value = match[2] !== undefined ? match[2].replace(/\\'/g, "'") : match[3];

    switch (key) {
      case "host": config.host = value; break;
      case "port": config.port = value; break;
      case "dbname": config.database = value; break;
      case "user": config.username = value; break;
      case "password": config.password = value; break;
      case "sslmode": config.sslMode = value as ConnectionConfig["sslMode"]; break;
      case "application_name": config.applicationName = value; break;
      case "connect_timeout": config.connectTimeout = value; break;
      case "options": {
        const searchPathMatch = value.match(/search_path[=\s]+(\S+)/);
        if (searchPathMatch) config.schema = searchPathMatch[1];
        break;
      }
    }
  }

  if (!foundAny) {
    return { error: "No valid key=value pairs found." };
  }

  return config;
}
