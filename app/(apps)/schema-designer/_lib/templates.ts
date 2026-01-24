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
    available: false,
    getSchema: () => ({ tables: [] }),
  },
  {
    id: "blog",
    name: "Blog",
    description: "posts, authors, comments",
    tableCount: 3,
    icon: "blog",
    available: false,
    getSchema: () => ({ tables: [] }),
  },
];

export function getTemplateById(id: string): SchemaTemplate | undefined {
  return SCHEMA_TEMPLATES.find((t) => t.id === id);
}
