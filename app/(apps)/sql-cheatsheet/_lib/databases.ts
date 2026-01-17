// Database configurations for the SQL cheatsheet
// Easily extendable to support multiple databases

export interface Database {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export const databases: Database[] = [
  {
    id: "postgresql",
    name: "PostgreSQL",
    shortName: "PostgreSQL",
    color: "#336791",
  },
  // Future databases can be added here:
  // {
  //   id: "mysql",
  //   name: "MySQL",
  //   shortName: "MySQL",
  //   color: "#4479A1",
  // },
  // {
  //   id: "sqlite",
  //   name: "SQLite",
  //   shortName: "SQLite",
  //   color: "#003B57",
  // },
];

export const defaultDatabase = databases[0];

export function getDatabase(id: string): Database | undefined {
  return databases.find((db) => db.id === id);
}
