import { Lesson, QueryResult, ValidationResult } from '../types';

export const lesson1_5: Lesson = {
  id: '1-5',
  moduleId: '1',
  title: 'Aggregating Data',
  shortTitle: 'COUNT, SUM, AVG',
  description: 'Learn how to summarize data with aggregate functions',
  estimatedMinutes: 15,
  initialSchema: `
    CREATE TABLE orders (id INTEGER, customer_id INTEGER, product TEXT, quantity INTEGER, total REAL, status TEXT);
    INSERT INTO orders VALUES
      (1, 1, 'Laptop', 1, 999.99, 'completed'),
      (2, 2, 'Headphones', 2, 299.98, 'completed'),
      (3, 1, 'Mouse', 1, 29.99, 'completed'),
      (4, 3, 'Keyboard', 1, 79.99, 'pending'),
      (5, 2, 'Monitor', 1, 299.99, 'completed'),
      (6, 4, 'Laptop', 1, 999.99, 'completed'),
      (7, 3, 'Headphones', 1, 149.99, 'cancelled'),
      (8, 5, 'Mouse', 3, 89.97, 'completed'),
      (9, 1, 'Webcam', 1, 59.99, 'pending'),
      (10, 4, 'Desk Lamp', 2, 69.98, 'completed');

    CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price REAL, stock INTEGER);
    INSERT INTO products VALUES
      (1, 'Laptop', 'Electronics', 999.99, 15),
      (2, 'Headphones', 'Electronics', 149.99, 50),
      (3, 'Coffee Mug', 'Home', 12.99, 200),
      (4, 'Notebook', 'Office', 4.99, 500),
      (5, 'Desk Lamp', 'Home', 34.99, 75),
      (6, 'Keyboard', 'Electronics', 79.99, 30);
  `,
  phases: {
    context: {
      name: 'Sam',
      role: 'Senior Database Engineer',
      message: "The CEO just pinged me - she needs summary numbers for the board meeting: total revenue, order counts, average order value. This is where aggregate functions shine. COUNT, SUM, AVG - these are SQL superpowers!",
      timestamp: 'Just now'
    },
    concept: [
      {
        title: 'Aggregate Functions',
        syntax: `COUNT(*)      -- Count rows
COUNT(column) -- Count non-null values
SUM(column)   -- Add up values
AVG(column)   -- Calculate average
MIN(column)   -- Smallest value
MAX(column)   -- Largest value`,
        explanation: 'Aggregate functions compute a single value from many rows. COUNT counts rows, SUM adds numbers, AVG finds the mean, MIN/MAX find extremes.'
      },
      {
        title: 'GROUP BY',
        syntax: `SELECT category, COUNT(*)
FROM products
GROUP BY category;

SELECT status, SUM(total)
FROM orders
GROUP BY status;`,
        explanation: 'GROUP BY splits rows into groups and applies aggregates to each group. Essential for "per category" or "per status" summaries.'
      }
    ],
    guided: {
      prompt: 'Count the total number of orders in the orders table',
      template: `SELECT _____(_____) FROM orders;`,
      blanks: [
        { id: 'func', placeholder: 'function', answer: 'COUNT' },
        { id: 'arg', placeholder: 'arg', answer: '*' }
      ],
      expectedQuery: 'SELECT COUNT(*) FROM orders;',
      hints: [
        'Use COUNT(*) to count all rows',
        'No WHERE clause needed - count everything'
      ]
    },
    challenges: [
      {
        id: '1-5-c1',
        title: 'Total Revenue',
        description: 'Calculate the total revenue from all orders (sum of the total column)',
        difficulty: 'easy',
        xpReward: 50,
        coinReward: 10,
        hints: [
          'Use SUM(total) to add up all order totals',
          'Query the orders table',
          'SELECT SUM(total) FROM orders;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('sum') && q.includes('total') && q.includes('from orders')) {
            return { correct: true, message: 'Revenue calculated!' };
          }
          return { correct: false, message: 'Use SUM(total) on the orders table.' };
        }
      },
      {
        id: '1-5-c2',
        title: 'Average Order Value',
        description: 'Find the average order total',
        difficulty: 'easy',
        xpReward: 50,
        coinReward: 10,
        hints: [
          'Use AVG(total) for the average',
          'SELECT AVG(column) FROM table',
          'SELECT AVG(total) FROM orders;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('avg') && q.includes('total') && q.includes('from orders')) {
            return { correct: true, message: 'Average calculated!' };
          }
          return { correct: false, message: 'Use AVG(total) on the orders table.' };
        }
      },
      {
        id: '1-5-c3',
        title: 'Orders by Status',
        description: 'Count how many orders are in each status (completed, pending, cancelled)',
        difficulty: 'medium',
        xpReward: 75,
        coinReward: 15,
        hints: [
          'SELECT status, COUNT(*) ... GROUP BY status',
          'GROUP BY splits results by unique status values',
          'SELECT status, COUNT(*) FROM orders GROUP BY status;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('count') && q.includes('group by') && q.includes('status')) {
            return { correct: true, message: 'Perfect grouping!' };
          }
          return { correct: false, message: 'Use GROUP BY status with COUNT(*).' };
        }
      },
      {
        id: '1-5-c4',
        title: 'Revenue by Product',
        description: 'Calculate total revenue for each product (product name and sum of totals)',
        difficulty: 'hard',
        xpReward: 100,
        coinReward: 20,
        hints: [
          'SELECT product, SUM(total) ... GROUP BY product',
          'Group by the product column',
          'SELECT product, SUM(total) FROM orders GROUP BY product;'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('product') && q.includes('sum') && q.includes('total') &&
              q.includes('group by') && q.includes('product')) {
            return { correct: true, message: 'Revenue breakdown complete!' };
          }
          return { correct: false, message: 'Group by product and SUM the totals.' };
        }
      }
    ],
    summary: {
      id: 'card-1-5',
      title: 'Aggregates & GROUP BY',
      syntax: `SELECT category, COUNT(*), AVG(price)
FROM products
GROUP BY category;

-- Common aggregates:
COUNT(*), SUM(col), AVG(col)
MIN(col), MAX(col)`,
      examples: [
        'SELECT COUNT(*) FROM orders;',
        'SELECT AVG(price) FROM products;',
        'SELECT category, SUM(stock) FROM products GROUP BY category;'
      ],
      tips: [
        'COUNT(*) counts all rows, COUNT(col) counts non-null values',
        'GROUP BY creates one row per unique value',
        'Non-aggregated columns must be in GROUP BY'
      ]
    }
  }
};
