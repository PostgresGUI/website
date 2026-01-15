import { Lesson, ValidationResult } from '../types';

export const lesson1_1: Lesson = {
  id: 'create-table',
  moduleId: '1',
  title: 'CREATE TABLE',
  shortTitle: 'CREATE TABLE',
  description: 'Learn how to create database tables with columns and data types like INTEGER, TEXT, and REAL',
  estimatedMinutes: 12,
  phases: {
    intro: {
      name: 'Sam',
      role: 'Senior Database Engineer',
      message: "Welcome to PostgresGUI Inc! For your first task, we need to set up a new database table to track our employees. I'll walk you through how to create tables in SQL. This is fundamental - everything in a database starts with tables!",
      timestamp: 'Just now'
    },
    learn: [
      {
        title: 'CREATE TABLE Syntax',
        syntax: `CREATE TABLE table_name (
  column1 datatype,
  column2 datatype,
  column3 datatype
);`,
        explanation: 'Tables are the foundation of any database. Each table has columns (fields) that define what data it can store. Every column needs a name and a data type.'
      },
      {
        title: 'Common Data Types',
        syntax: `INTEGER   -- Whole numbers (1, 42, -7)
TEXT      -- Text strings ("hello", "John Doe")
REAL      -- Decimal numbers (3.14, 99.99)`,
        explanation: 'Choose the right data type for each piece of information. INTEGER for counts and IDs, TEXT for names and descriptions, REAL for prices and measurements.'
      }
    ],
    practice: {
      prompt: 'Create a table called "employees" with columns for id (INTEGER) and name (TEXT)',
      template: `CREATE TABLE employees (
  id INTEGER,
  name TEXT
);`,
      blanks: [
        { id: 'table', placeholder: 'table_name', answer: 'employees' },
        { id: 'col1', placeholder: 'column1', answer: 'id' },
        { id: 'type1', placeholder: 'type', answer: 'INTEGER' },
        { id: 'col2', placeholder: 'column2', answer: 'name' },
        { id: 'type2', placeholder: 'type', answer: 'TEXT' }
      ],
      expectedQuery: 'CREATE TABLE employees (id INTEGER, name TEXT);',
      hints: [
        'The table name goes right after CREATE TABLE',
        'Column definitions go inside parentheses, separated by commas'
      ]
    },
    quiz: [
      {
        id: 'creating-tables-c1',
        title: 'Create a Products Table',
        description: 'Create a table called "products" with three columns: id (INTEGER), name (TEXT), and price (REAL)',
        difficulty: 'easy',
                hints: [
          'Start with CREATE TABLE followed by the table name',
          'Each column needs a name and type, separated by commas',
          'CREATE TABLE products (id INTEGER, name TEXT, price REAL);'
        ],
        validate: (_result, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('create table products') &&
              q.includes('id') && q.includes('integer') &&
              q.includes('name') && q.includes('text') &&
              q.includes('price') && q.includes('real')) {
            return { correct: true, message: 'Perfect! You created the products table.' };
          }
          return { correct: false, message: 'Check that you have all three columns with correct types.' };
        }
      },
      {
        id: 'creating-tables-c2',
        title: 'Create a Customers Table',
        description: 'Create a "customers" table with: id (INTEGER), email (TEXT), and age (INTEGER)',
        difficulty: 'easy',
                hints: [
          'Same pattern as before - CREATE TABLE table_name (...)',
          'age should be INTEGER since it\'s a whole number',
          'CREATE TABLE customers (id INTEGER, email TEXT, age INTEGER);'
        ],
        validate: (_result, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('create table customers') &&
              q.includes('id') && q.includes('email') && q.includes('age')) {
            return { correct: true, message: 'Excellent! Customers table created.' };
          }
          return { correct: false, message: 'Make sure you have id, email, and age columns.' };
        }
      },
      {
        id: 'creating-tables-c3',
        title: 'Design Your Own Table',
        description: 'Create a table called "orders" with at least 4 columns of your choice. Include at least 2 different data types.',
        difficulty: 'medium',
                hints: [
          'Think about what information an order might have: id, customer_id, total, date...',
          'Use INTEGER for IDs and counts, REAL for money, TEXT for descriptions',
          'Example: CREATE TABLE orders (id INTEGER, customer_id INTEGER, total REAL, status TEXT);'
        ],
        validate: (_result, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('create table orders')) {
            const hasMultipleTypes = (q.includes('integer') && q.includes('text')) ||
                                     (q.includes('integer') && q.includes('real')) ||
                                     (q.includes('text') && q.includes('real'));
            if (hasMultipleTypes) {
              return { correct: true, message: 'Great job designing your orders table!' };
            }
            return { correct: false, message: 'Include at least 2 different data types.' };
          }
          return { correct: false, message: 'Create a table named "orders".' };
        }
      }
    ],
    cheatsheet: {
      id: 'card-creating-tables',
      title: 'CREATE TABLE',
      syntax: `CREATE TABLE table_name (
  column1 datatype,
  column2 datatype
);`,
      examples: [
        'CREATE TABLE users (id INTEGER, name TEXT);',
        'CREATE TABLE products (id INTEGER, name TEXT, price REAL);'
      ],
      tips: [
        'Use lowercase for table and column names',
        'Choose descriptive names for columns',
        'Pick the right data type for your data'
      ]
    }
  }
};
