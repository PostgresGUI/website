import { Lesson, QueryResult, ValidationResult } from '../types';

export const lesson1_3: Lesson = {
  id: '1-3',
  moduleId: '1',
  title: 'Basic Queries',
  shortTitle: 'SELECT',
  description: 'Learn how to retrieve data from tables',
  estimatedMinutes: 12,
  initialSchema: `
    CREATE TABLE customers (id INTEGER, name TEXT, email TEXT, state TEXT);
    INSERT INTO customers VALUES
      (1, 'Alice Johnson', 'alice@email.com', 'CA'),
      (2, 'Bob Smith', 'bob@email.com', 'TX'),
      (3, 'Carol White', 'carol@email.com', 'CA'),
      (4, 'David Brown', 'david@email.com', 'NY'),
      (5, 'Eve Davis', 'eve@email.com', 'TX');

    CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price REAL);
    INSERT INTO products VALUES
      (1, 'Laptop', 'Electronics', 999.99),
      (2, 'Headphones', 'Electronics', 149.99),
      (3, 'Coffee Mug', 'Home', 12.99),
      (4, 'Notebook', 'Office', 4.99),
      (5, 'Desk Lamp', 'Home', 34.99);
  `,
  phases: {
    context: {
      name: 'Sam',
      role: 'Senior Database Engineer',
      message: "The sales team needs a list of all our California customers for a regional promotion. Time to learn SELECT - the most important SQL command you'll use! It's how we ask the database questions and get data back.",
      timestamp: '5 mins ago'
    },
    concept: [
      {
        title: 'SELECT Basics',
        syntax: `SELECT column1, column2
FROM table_name;

-- Get all columns:
SELECT * FROM table_name;`,
        explanation: 'SELECT retrieves data from tables. List the columns you want, or use * for all columns. FROM specifies which table to query.'
      },
      {
        title: 'Filtering with WHERE',
        syntax: `SELECT column1, column2
FROM table_name
WHERE condition;

-- Example:
SELECT name, email
FROM customers
WHERE state = 'CA';`,
        explanation: 'WHERE filters rows based on conditions. Only rows matching the condition are returned. Use = for exact matches, and quote text values.'
      }
    ],
    guided: {
      prompt: 'Select all columns from the customers table',
      template: `SELECT * FROM customers;`,
      blanks: [
        { id: 'cols', placeholder: 'columns', answer: '*' },
        { id: 'table', placeholder: 'table', answer: 'customers' }
      ],
      expectedQuery: 'SELECT * FROM customers;',
      hints: [
        'Use * to select all columns',
        'The table name is "customers"'
      ]
    },
    challenges: [
      {
        id: '1-3-c1',
        title: 'Get Customer Emails',
        description: 'Select only the name and email columns from the customers table',
        difficulty: 'easy',
        xpReward: 50,
        coinReward: 10,
        hints: [
          'List the column names separated by commas',
          'SELECT column1, column2 FROM table',
          'SELECT name, email FROM customers;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('select') && q.includes('name') && q.includes('email') &&
              q.includes('from customers') && !q.includes('*')) {
            return { correct: true, message: 'Perfect! You selected specific columns.' };
          }
          return { correct: false, message: 'Select only name and email columns.' };
        }
      },
      {
        id: '1-3-c2',
        title: 'Find California Customers',
        description: 'Get all customers from California (state = \'CA\')',
        difficulty: 'easy',
        xpReward: 50,
        coinReward: 10,
        hints: [
          'Add WHERE state = \'CA\' after FROM customers',
          'Text values in conditions need single quotes',
          "SELECT * FROM customers WHERE state = 'CA';"
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('select') && q.includes('from customers') &&
              q.includes('where') && q.includes("state") && q.includes("ca")) {
            if (result.rowCount === 2) {
              return { correct: true, message: 'Found the California customers!' };
            }
          }
          return { correct: false, message: 'Filter for state = \'CA\'.' };
        }
      },
      {
        id: '1-3-c3',
        title: 'Electronics Under $500',
        description: 'Find all Electronics products that cost less than $500',
        difficulty: 'medium',
        xpReward: 75,
        coinReward: 15,
        hints: [
          'You need two conditions: category AND price',
          'Use AND to combine conditions: WHERE cond1 AND cond2',
          "SELECT * FROM products WHERE category = 'Electronics' AND price < 500;"
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('select') && q.includes('from products') &&
              q.includes('electronics') && (q.includes('< 500') || q.includes('<500'))) {
            return { correct: true, message: 'Great use of multiple conditions!' };
          }
          return { correct: false, message: 'Filter by category AND price.' };
        }
      }
    ],
    summary: {
      id: 'card-1-3',
      title: 'SELECT & WHERE',
      syntax: `SELECT column1, column2
FROM table_name
WHERE condition;

-- All columns:
SELECT * FROM table_name;`,
      examples: [
        'SELECT * FROM customers;',
        'SELECT name, email FROM customers;',
        "SELECT * FROM products WHERE price > 100;"
      ],
      tips: [
        'Use * to select all columns',
        'WHERE filters which rows are returned',
        'Text comparisons need single quotes'
      ]
    }
  }
};
