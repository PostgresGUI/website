import type { ProviderPreset } from "./types";

export const PROVIDER_PRESETS: ProviderPreset[] = [
  {
    id: "local",
    name: "Local",
    description: "Local PostgreSQL server",
    hostPlaceholder: "localhost",
    defaults: {
      host: "localhost",
      port: "5432",
      sslMode: "prefer",
    },
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Supabase hosted PostgreSQL",
    hostPlaceholder: "db.<project-ref>.supabase.co",
    defaults: {
      port: "5432",
      sslMode: "require",
      database: "postgres",
    },
  },
  {
    id: "neon",
    name: "Neon",
    description: "Neon serverless PostgreSQL",
    hostPlaceholder: "ep-<name>-<id>.us-east-2.aws.neon.tech",
    defaults: {
      port: "5432",
      sslMode: "require",
    },
  },
  {
    id: "railway",
    name: "Railway",
    description: "Railway hosted PostgreSQL",
    hostPlaceholder: "<container>.railway.internal",
    defaults: {
      port: "5432",
      sslMode: "require",
      database: "railway",
      username: "postgres",
    },
  },
  {
    id: "render",
    name: "Render",
    description: "Render managed PostgreSQL",
    hostPlaceholder: "dpg-<id>.oregon-postgres.render.com",
    defaults: {
      port: "5432",
      sslMode: "require",
    },
  },
  {
    id: "aws-rds",
    name: "AWS RDS",
    description: "Amazon RDS for PostgreSQL",
    hostPlaceholder: "<instance>.<region>.rds.amazonaws.com",
    defaults: {
      port: "5432",
      sslMode: "verify-full",
    },
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    description: "DigitalOcean Managed Database",
    hostPlaceholder: "db-<cluster>.db.ondigitalocean.com",
    defaults: {
      port: "25060",
      sslMode: "require",
      database: "defaultdb",
      username: "doadmin",
    },
  },
];
