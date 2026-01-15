import type { Table, ResultRow } from "./types";

export const schemaData: Table[] = [
  {
    name: "users",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "varchar" },
      { name: "email", type: "varchar" },
      { name: "created_at", type: "timestamp" },
    ],
  },
  {
    name: "products",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "varchar" },
      { name: "price", type: "decimal" },
      { name: "category_id", type: "integer" },
      { name: "created_at", type: "timestamp" },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "id", type: "integer" },
      { name: "user_id", type: "integer" },
      { name: "product_id", type: "integer" },
      { name: "quantity", type: "integer" },
      { name: "total", type: "decimal" },
      { name: "ordered_at", type: "timestamp" },
    ],
  },
  {
    name: "categories",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "varchar" },
      { name: "slug", type: "varchar" },
    ],
  },
];

export const mockResults: ResultRow[] = [
  { id: 8, name: "Sarah Chen", email: "sarah.chen@example.com", created_at: "2024-03-15" },
  { id: 7, name: "Marcus Johnson", email: "marcus.j@company.io", created_at: "2024-03-12" },
  { id: 6, name: "Emma Williams", email: "emma.w@startup.co", created_at: "2024-02-28" },
  { id: 5, name: "James Miller", email: "james.miller@dev.org", created_at: "2024-02-14" },
  { id: 4, name: "Aisha Patel", email: "aisha.p@tech.com", created_at: "2024-01-22" },
];

export const defaultQuery = `SELECT id, name, email, created_at
FROM users
WHERE created_at > '2024-01-01'
ORDER BY created_at DESC
LIMIT 5;`;

export const databaseOptions = [
  { value: "ecommerce", label: "Sample: E-commerce" },
  { value: "hr", label: "Sample: HR Database" },
  { value: "blog", label: "Sample: Blog" },
];
