import { PGlite } from "@electric-sql/pglite";

export interface Table {
  name: string;
  columns: { name: string; type: string }[];
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  duration: number;
}

const SEED_SQL = `
-- Create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO users (name, email) VALUES
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com'),
  ('Charlie Brown', 'charlie@example.com'),
  ('Diana Prince', 'diana@example.com'),
  ('Eve Wilson', 'eve@example.com');

INSERT INTO products (name, price, stock) VALUES
  ('Laptop', 999.99, 50),
  ('Headphones', 149.99, 200),
  ('Keyboard', 79.99, 150),
  ('Mouse', 49.99, 300),
  ('Monitor', 399.99, 75);

INSERT INTO orders (user_id, total, status) VALUES
  (1, 1149.98, 'completed'),
  (2, 79.99, 'completed'),
  (1, 449.98, 'pending'),
  (3, 999.99, 'shipped'),
  (4, 199.98, 'completed');
`;

class PlaygroundDB {
  private static instance: PGlite | null = null;
  private static initializing: Promise<void> | null = null;

  static async init(): Promise<void> {
    if (this.instance) return;
    if (this.initializing) return this.initializing;

    this.initializing = (async () => {
      this.instance = new PGlite();
      await this.instance.exec(SEED_SQL);
    })();

    await this.initializing;
    this.initializing = null;
  }

  static async query(sql: string): Promise<QueryResult> {
    if (!this.instance) {
      await this.init();
    }

    const start = performance.now();
    const result = await this.instance!.query(sql);
    const duration = performance.now() - start;

    const columns = result.fields.map((f) => f.name);
    const rows = result.rows as Record<string, unknown>[];

    return {
      columns,
      rows,
      rowCount: rows.length,
      duration: Math.round(duration) / 1000,
    };
  }

  static async getSchema(): Promise<Table[]> {
    if (!this.instance) {
      await this.init();
    }

    const tablesResult = await this.instance!.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    const tables: Table[] = [];

    for (const row of tablesResult.rows as { table_name: string }[]) {
      const columnsResult = await this.instance!.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
      `, [row.table_name]);

      tables.push({
        name: row.table_name,
        columns: (columnsResult.rows as { column_name: string; data_type: string }[]).map((c) => ({
          name: c.column_name,
          type: c.data_type,
        })),
      });
    }

    return tables;
  }

  static async reset(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
    await this.init();
  }

  static async getPrimaryKey(tableName: string): Promise<string | null> {
    if (!this.instance) {
      await this.init();
    }

    const result = await this.instance!.query(`
      SELECT a.attname as column_name
      FROM pg_index i
      JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
      WHERE i.indrelid = $1::regclass
      AND i.indisprimary
    `, [tableName]);

    const rows = result.rows as { column_name: string }[];
    // Return first primary key column (for composite keys, we only use the first)
    return rows.length > 0 ? rows[0].column_name : null;
  }

  static async updateRow(
    tableName: string,
    primaryKeyColumn: string,
    primaryKeyValue: unknown,
    updates: Record<string, unknown>
  ): Promise<void> {
    if (!this.instance) {
      await this.init();
    }

    const setClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    for (const [column, value] of Object.entries(updates)) {
      // Skip the primary key column itself
      if (column === primaryKeyColumn) continue;
      setClauses.push(`"${column}" = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }

    if (setClauses.length === 0) {
      return; // Nothing to update
    }

    values.push(primaryKeyValue);
    const sql = `UPDATE "${tableName}" SET ${setClauses.join(', ')} WHERE "${primaryKeyColumn}" = $${paramIndex}`;

    await this.instance!.query(sql, values);
  }

  static async deleteRow(
    tableName: string,
    primaryKeyColumn: string,
    primaryKeyValue: unknown
  ): Promise<void> {
    if (!this.instance) {
      await this.init();
    }

    const sql = `DELETE FROM "${tableName}" WHERE "${primaryKeyColumn}" = $1`;
    await this.instance!.query(sql, [primaryKeyValue]);
  }
}

export default PlaygroundDB;
