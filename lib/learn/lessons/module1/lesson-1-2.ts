import { Lesson, QueryResult, ValidationResult } from '../types';

export const lesson1_2: Lesson = {
  id: '1-2',
  moduleId: '1',
  title: 'Inserting Data',
  shortTitle: 'INSERT INTO',
  description: 'Learn how to add data to your tables',
  estimatedMinutes: 10,
  initialSchema: `
    CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
    CREATE TABLE products (id INTEGER, name TEXT, price REAL);
  `,
  phases: {
    context: {
      name: 'Sam',
      role: 'Senior Database Engineer',
      message: "Now that you know how to create tables, let's fill them with data! The HR team just sent over a list of new hires. We need to add them to our employees table. I'll show you the INSERT statement.",
      timestamp: '2 mins ago'
    },
    concept: [
      {
        title: 'INSERT INTO Syntax',
        syntax: `INSERT INTO table_name (column1, column2)
VALUES (value1, value2);`,
        explanation: 'INSERT adds new rows to a table. List the columns you want to fill, then provide matching values. Text values need single quotes.'
      },
      {
        title: 'Multiple Rows',
        syntax: `INSERT INTO table_name (col1, col2)
VALUES
  (val1, val2),
  (val3, val4),
  (val5, val6);`,
        explanation: 'You can insert multiple rows at once by separating value sets with commas. This is more efficient than multiple INSERT statements.'
      }
    ],
    guided: {
      prompt: 'Insert an employee with id 1 and name "Alice" into the employees table',
      template: `INSERT INTO employees (id, name)
VALUES (1, 'Alice');`,
      blanks: [
        { id: 'table', placeholder: 'table', answer: 'employees' },
        { id: 'col1', placeholder: 'col1', answer: 'id' },
        { id: 'col2', placeholder: 'col2', answer: 'name' },
        { id: 'val1', placeholder: 'val1', answer: '1' },
        { id: 'val2', placeholder: 'val2', answer: "'Alice'" }
      ],
      expectedQuery: "INSERT INTO employees (id, name) VALUES (1, 'Alice');",
      hints: [
        'Text values like "Alice" need single quotes around them',
        'Numbers like 1 don\'t need quotes'
      ]
    },
    challenges: [
      {
        id: '1-2-c1',
        title: 'Add a Product',
        description: 'Insert a product with id 1, name "Laptop", and price 999.99 into the products table',
        difficulty: 'easy',
        xpReward: 50,
        coinReward: 10,
        hints: [
          'Use INSERT INTO products (id, name, price) VALUES ...',
          'Remember: text needs quotes, numbers don\'t',
          "INSERT INTO products (id, name, price) VALUES (1, 'Laptop', 999.99);"
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('insert into products') &&
              q.includes('laptop') && q.includes('999.99')) {
            return { correct: true, message: 'Product added successfully!' };
          }
          return { correct: false, message: 'Check your syntax and values.' };
        }
      },
      {
        id: '1-2-c2',
        title: 'Add Multiple Employees',
        description: 'Insert two employees at once: (2, "Bob", "Engineering") and (3, "Carol", "Marketing")',
        difficulty: 'medium',
        xpReward: 75,
        coinReward: 15,
        hints: [
          'You can insert multiple rows with VALUES (row1), (row2)',
          'Each row needs all three values: id, name, department',
          "INSERT INTO employees (id, name, department) VALUES (2, 'Bob', 'Engineering'), (3, 'Carol', 'Marketing');"
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, ' ');
          if (q.includes('insert into employees') &&
              q.includes('bob') && q.includes('carol')) {
            return { correct: true, message: 'Both employees added!' };
          }
          return { correct: false, message: 'Make sure to add both Bob and Carol.' };
        }
      },
      {
        id: '1-2-c3',
        title: 'Build a Product Catalog',
        description: 'Add 3 products to the products table with different names and prices of your choice',
        difficulty: 'medium',
        xpReward: 75,
        coinReward: 15,
        hints: [
          'Insert three rows with different product data',
          'Each product needs id, name, and price',
          'Use sequential ids like 2, 3, 4 (1 is taken)'
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase();
          // Count value groups
          const valueMatches = q.match(/\([^)]+\)/g);
          if (valueMatches && valueMatches.length >= 3 && q.includes('insert into products')) {
            return { correct: true, message: 'Product catalog created!' };
          }
          return { correct: false, message: 'Add at least 3 products.' };
        }
      }
    ],
    summary: {
      id: 'card-1-2',
      title: 'INSERT INTO',
      syntax: `INSERT INTO table (col1, col2)
VALUES (val1, val2);

-- Multiple rows:
INSERT INTO table (col1, col2)
VALUES (a, b), (c, d), (e, f);`,
      examples: [
        "INSERT INTO users (id, name) VALUES (1, 'Alice');",
        "INSERT INTO products (name, price) VALUES ('Phone', 699.99);"
      ],
      tips: [
        'Text values need single quotes',
        'Numbers don\'t need quotes',
        'Insert multiple rows with comma-separated values'
      ]
    }
  }
};
