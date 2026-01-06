import { Lesson, QueryResult, ValidationResult } from '../types';

export const lesson1_4: Lesson = {
  id: '1-4',
  moduleId: '1',
  title: 'Sorting & Limiting',
  shortTitle: 'ORDER BY',
  description: 'Learn how to sort and limit query results',
  estimatedMinutes: 10,
  initialSchema: `
    CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price REAL, stock INTEGER);
    INSERT INTO products VALUES
      (1, 'Laptop', 'Electronics', 999.99, 15),
      (2, 'Headphones', 'Electronics', 149.99, 50),
      (3, 'Coffee Mug', 'Home', 12.99, 200),
      (4, 'Notebook', 'Office', 4.99, 500),
      (5, 'Desk Lamp', 'Home', 34.99, 75),
      (6, 'Keyboard', 'Electronics', 79.99, 30),
      (7, 'Mouse Pad', 'Office', 9.99, 150),
      (8, 'Monitor', 'Electronics', 299.99, 20),
      (9, 'Plant Pot', 'Home', 24.99, 100),
      (10, 'Stapler', 'Office', 7.99, 300);

    CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary REAL);
    INSERT INTO employees VALUES
      (1, 'Alice', 'Engineering', 95000),
      (2, 'Bob', 'Marketing', 72000),
      (3, 'Carol', 'Engineering', 105000),
      (4, 'David', 'Sales', 68000),
      (5, 'Eve', 'Engineering', 88000);
  `,
  phases: {
    context: {
      name: 'Sam',
      role: 'Senior Database Engineer',
      message: "Finance needs our top 5 most expensive products for the quarterly report. We need to sort by price and only show the first few results. ORDER BY and LIMIT are your friends here!",
      timestamp: '10 mins ago'
    },
    concept: [
      {
        title: 'ORDER BY',
        syntax: `SELECT * FROM table
ORDER BY column ASC;   -- Ascending (default)

SELECT * FROM table
ORDER BY column DESC;  -- Descending`,
        explanation: 'ORDER BY sorts your results. ASC (ascending) goes from smallest to largest or A to Z. DESC (descending) goes the opposite way. ASC is the default.'
      },
      {
        title: 'LIMIT and OFFSET',
        syntax: `SELECT * FROM table
ORDER BY column DESC
LIMIT 5;              -- First 5 rows

SELECT * FROM table
LIMIT 5 OFFSET 10;    -- Skip 10, get next 5`,
        explanation: 'LIMIT restricts how many rows you get back. OFFSET skips rows - useful for pagination. Always use ORDER BY with LIMIT for consistent results.'
      }
    ],
    guided: {
      prompt: 'Get all products sorted by price from highest to lowest',
      template: `SELECT * FROM products
ORDER BY _____ _____;`,
      blanks: [
        { id: 'col', placeholder: 'column', answer: 'price' },
        { id: 'dir', placeholder: 'direction', answer: 'DESC' }
      ],
      expectedQuery: 'SELECT * FROM products ORDER BY price DESC;',
      hints: [
        'Use DESC for descending (highest first)',
        'The column to sort by is "price"'
      ]
    },
    challenges: [
      {
        id: '1-4-c1',
        title: 'Top 3 Expensive Products',
        description: 'Get the 3 most expensive products (name and price only)',
        difficulty: 'easy',
        xpReward: 50,
        coinReward: 10,
        hints: [
          'ORDER BY price DESC, then LIMIT 3',
          'Select only name and price columns',
          'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('order by') && q.includes('price') && q.includes('desc') &&
              q.includes('limit 3') && result.rowCount === 3) {
            return { correct: true, message: 'Found the top 3!' };
          }
          return { correct: false, message: 'Sort by price DESC and limit to 3.' };
        }
      },
      {
        id: '1-4-c2',
        title: 'Cheapest Office Supplies',
        description: 'Find the 2 cheapest Office products',
        difficulty: 'medium',
        xpReward: 75,
        coinReward: 15,
        hints: [
          'Filter with WHERE category = \'Office\' first',
          'Then ORDER BY price ASC (cheapest first) and LIMIT 2',
          "SELECT * FROM products WHERE category = 'Office' ORDER BY price ASC LIMIT 2;"
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('office') && q.includes('order by') && q.includes('price') &&
              q.includes('limit 2')) {
            return { correct: true, message: 'Perfect filtering and sorting!' };
          }
          return { correct: false, message: 'Filter to Office, sort by price, limit to 2.' };
        }
      },
      {
        id: '1-4-c3',
        title: 'Top Earners',
        description: 'Get the top 3 highest-paid employees (show name, department, salary)',
        difficulty: 'medium',
        xpReward: 75,
        coinReward: 15,
        hints: [
          'Query the employees table',
          'ORDER BY salary DESC, LIMIT 3',
          'SELECT name, department, salary FROM employees ORDER BY salary DESC LIMIT 3;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('from employees') && q.includes('order by') &&
              q.includes('salary') && q.includes('desc') && q.includes('limit 3')) {
            return { correct: true, message: 'Found the top earners!' };
          }
          return { correct: false, message: 'Sort employees by salary DESC, limit 3.' };
        }
      }
    ],
    summary: {
      id: 'card-1-4',
      title: 'ORDER BY & LIMIT',
      syntax: `SELECT columns
FROM table
WHERE condition
ORDER BY column DESC
LIMIT n;`,
      examples: [
        'SELECT * FROM products ORDER BY price DESC;',
        'SELECT * FROM users ORDER BY name ASC LIMIT 10;',
        'SELECT * FROM posts ORDER BY date DESC LIMIT 5 OFFSET 10;'
      ],
      tips: [
        'ASC = ascending (smallest/A first)',
        'DESC = descending (largest/Z first)',
        'Always use ORDER BY with LIMIT for consistent results'
      ]
    }
  }
};
