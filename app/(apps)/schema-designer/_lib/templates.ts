import type { Schema } from "./types";
import { generateId } from "./utils";

export interface SchemaTemplate {
  id: string;
  name: string;
  description: string;
  tableCount: number;
  icon: "todo" | "ecommerce" | "blog";
  available: boolean;
  getSchema: () => Schema;
}

function createTodoAppSchema(): Schema {
  const usersTableId = generateId();
  const listsTableId = generateId();
  const tasksTableId = generateId();

  const usersIdColumnId = generateId();
  const listsIdColumnId = generateId();
  const listsUserIdColumnId = generateId();
  const tasksIdColumnId = generateId();
  const tasksListIdColumnId = generateId();

  return {
    tables: [
      {
        id: usersTableId,
        name: "users",
        position: { x: 980, y: 100 },
        columns: [
          {
            id: usersIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "name",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "email",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: true,
            foreignKey: null,
          },
        ],
      },
      {
        id: listsTableId,
        name: "lists",
        position: { x: 540, y: 380 },
        columns: [
          {
            id: listsIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: listsUserIdColumnId,
            name: "user_id",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: {
              tableId: usersTableId,
              columnId: usersIdColumnId,
            },
          },
          {
            id: generateId(),
            name: "name",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
        ],
      },
      {
        id: tasksTableId,
        name: "tasks",
        position: { x: 80, y: 100 },
        columns: [
          {
            id: tasksIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: tasksListIdColumnId,
            name: "list_id",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: {
              tableId: listsTableId,
              columnId: listsIdColumnId,
            },
          },
          {
            id: generateId(),
            name: "title",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "completed",
            type: "BOOLEAN",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
        ],
      },
    ],
  };
}

function createEcommerceSchema(): Schema {
  const customersTableId = generateId();
  const productsTableId = generateId();
  const ordersTableId = generateId();

  const customersIdColumnId = generateId();
  const productsIdColumnId = generateId();
  const ordersIdColumnId = generateId();

  return {
    tables: [
      {
        id: customersTableId,
        name: "customers",
        position: { x: 840, y: 100 },
        columns: [
          {
            id: customersIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "name",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "email",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: true,
            foreignKey: null,
          },
        ],
      },
      {
        id: ordersTableId,
        name: "orders",
        position: { x: 170, y: 180 },
        columns: [
          {
            id: ordersIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "customer_id",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: {
              tableId: customersTableId,
              columnId: customersIdColumnId,
            },
          },
          {
            id: generateId(),
            name: "product_id",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: {
              tableId: productsTableId,
              columnId: productsIdColumnId,
            },
          },
          {
            id: generateId(),
            name: "quantity",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "created_at",
            type: "TIMESTAMP",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
        ],
      },
      {
        id: productsTableId,
        name: "products",
        position: { x: 840, y: 440 },
        columns: [
          {
            id: productsIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "name",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "price",
            type: "NUMERIC",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "description",
            type: "TEXT",
            isPrimaryKey: false,
            isNotNull: false,
            isUnique: false,
            foreignKey: null,
          },
        ],
      },
    ],
  };
}

function createBlogSchema(): Schema {
  const authorsTableId = generateId();
  const postsTableId = generateId();
  const commentsTableId = generateId();

  const authorsIdColumnId = generateId();
  const postsIdColumnId = generateId();
  const commentsIdColumnId = generateId();

  return {
    tables: [
      {
        id: authorsTableId,
        name: "authors",
        position: { x: 980, y: 100 },
        columns: [
          {
            id: authorsIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "name",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "email",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: true,
            foreignKey: null,
          },
        ],
      },
      {
        id: postsTableId,
        name: "posts",
        position: { x: 540, y: 380 },
        columns: [
          {
            id: postsIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "author_id",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: {
              tableId: authorsTableId,
              columnId: authorsIdColumnId,
            },
          },
          {
            id: generateId(),
            name: "title",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "content",
            type: "TEXT",
            isPrimaryKey: false,
            isNotNull: false,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "published_at",
            type: "TIMESTAMP",
            isPrimaryKey: false,
            isNotNull: false,
            isUnique: false,
            foreignKey: null,
          },
        ],
      },
      {
        id: commentsTableId,
        name: "comments",
        position: { x: 80, y: 100 },
        columns: [
          {
            id: commentsIdColumnId,
            name: "id",
            type: "SERIAL",
            isPrimaryKey: true,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "post_id",
            type: "INTEGER",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: {
              tableId: postsTableId,
              columnId: postsIdColumnId,
            },
          },
          {
            id: generateId(),
            name: "author_name",
            type: "VARCHAR",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
          {
            id: generateId(),
            name: "content",
            type: "TEXT",
            isPrimaryKey: false,
            isNotNull: true,
            isUnique: false,
            foreignKey: null,
          },
        ],
      },
    ],
  };
}

export const SCHEMA_TEMPLATES: SchemaTemplate[] = [
  {
    id: "todo-app",
    name: "Todo App",
    description: "users, lists, tasks",
    tableCount: 3,
    icon: "todo",
    available: true,
    getSchema: createTodoAppSchema,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "products, orders, customers",
    tableCount: 3,
    icon: "ecommerce",
    available: true,
    getSchema: createEcommerceSchema,
  },
  {
    id: "blog",
    name: "Blog",
    description: "posts, authors, comments",
    tableCount: 3,
    icon: "blog",
    available: true,
    getSchema: createBlogSchema,
  },
];

export function getTemplateById(id: string): SchemaTemplate | undefined {
  return SCHEMA_TEMPLATES.find((t) => t.id === id);
}
