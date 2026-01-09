import { Lesson, QueryResult, ValidationResult } from "../types";

export const lesson1_0: Lesson = {
  id: "getting-started",
  moduleId: "1",
  title: "Introduction to SQL",
  shortTitle: "Introduction",
  description:
    "Learn what SQL is, what PostgreSQL is, and why it became so popular",
  estimatedMinutes: 8,
  phases: {
    context: {
      name: "Sam",
      role: "Senior Database Engineer",
      message:
        "Hey, welcome aboard! Before we dive into building databases, let me give you a quick overview of what we'll be working with. SQL is the language we use to talk to databases, and PostgreSQL is one of the most powerful database systems out there. Let me explain why we chose it here at NorthLoop.",
      timestamp: "Just now",
    },
    concept: [
      {
        title: "What is SQL?",
        syntax: `SQL = Structured Query Language

-- Used to:
-- • Store data (INSERT)
-- • Retrieve data (SELECT)
-- • Update data (UPDATE)
-- • Delete data (DELETE)`,
        explanation:
          'SQL (pronounced "sequel" or "S-Q-L") is a language designed specifically for managing data in databases. Think of it as the universal language that lets you communicate with almost any database system. It was created in the 1970s and is still the standard today.',
      },
      {
        title: "What is PostgreSQL?",
        syntax: `PostgreSQL (postgres)
├── Open source & free
├── Extremely reliable
├── Feature-rich
└── Used by: Apple, Instagram,
    Spotify, Netflix, and more`,
        explanation:
          'PostgreSQL (often called "Postgres") is an open-source relational database system. It stores data in tables with rows and columns, similar to a spreadsheet but much more powerful. It has been in development since 1986, making it battle-tested and trusted by companies worldwide.',
      },
      {
        title: "Why PostgreSQL?",
        syntax: `Why developers love PostgreSQL:

✓ 100% free and open source
✓ Handles millions of records
✓ ACID compliant (data safety)
✓ Great community & docs
✓ Works everywhere`,
        explanation:
          "PostgreSQL became popular because it combines enterprise-grade features with zero licensing costs. It is known for data integrity, extensibility, and standards compliance. From startups to Fortune 500 companies, PostgreSQL scales with your needs.",
      },
    ],
    guided: {
      prompt:
        "Let's run your first SQL query! Type SELECT followed by a greeting message in single quotes",
      template: `SELECT 'Hello, PostgreSQL!';`,
      blanks: [
        {
          id: "select",
          placeholder: "keyword",
          answer: "SELECT",
          acceptedAnswers: ["SELECT", "select"],
        },
      ],
      expectedQuery: "SELECT 'Hello, PostgreSQL!';",
      hints: [
        "SELECT is the SQL keyword used to retrieve or display data",
        "Just type SELECT before the quoted text",
      ],
    },
    challenges: [
      {
        id: "getting-started-c1",
        title: "Your First Query",
        description: "Write a SELECT statement to display the number 42",
        difficulty: "easy",
        hints: [
          "Use SELECT followed by the number you want to display",
          "No quotes needed for numbers - just: SELECT 42;",
          "SELECT 42;",
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, " ").trim();
          // Check that the query uses SELECT and returns the number 42
          if (!q.startsWith("select")) {
            return { correct: false, message: "Start your query with SELECT" };
          }
          if (!result.success) {
            return {
              correct: false,
              message: "Your query has an error. Try: SELECT 42;",
            };
          }
          // Check the actual result value is 42
          // Ensure we have a result row
          if (
            !result.rows ||
            result.rows.length === 0 ||
            !result.rows[0] ||
            result.rows[0].length === 0
          ) {
            return {
              correct: false,
              message: "Your query should return a result. Try: SELECT 42;",
            };
          }

          const value = result.rows[0][0];

          // Check if value is exactly 42 (number) or '42' (string)
          // Use strict equality to avoid type coercion issues
          const isNumber42 = typeof value === "number" && value === 42;
          const isString42 = typeof value === "string" && value === "42";
          const isCorrect = isNumber42 || isString42;

          if (isCorrect) {
            return {
              correct: true,
              message: "You just ran your first SQL query!",
            };
          }
          return {
            correct: false,
            message: "Try: SELECT followed by the number 42",
          };
        },
      },
      {
        id: "getting-started-c2",
        title: "Display Text",
        description:
          "Use SELECT to display your name (or any text) - remember to use single quotes around text!",
        difficulty: "easy",
        hints: [
          "Text in SQL must be wrapped in single quotes",
          "Example format: SELECT 'your text here';",
          "SELECT 'Ada';",
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().trim();
          if (q.startsWith("select") && q.includes("'") && result.success) {
            return {
              correct: true,
              message: "Great! You displayed text using SQL.",
            };
          }
          return {
            correct: false,
            message:
              "Use SELECT with text in single quotes, like: SELECT 'Hello';",
          };
        },
      },
      {
        id: "getting-started-c3",
        title: "Simple Math",
        description: "SQL can do math! Use SELECT to calculate 10 + 5",
        difficulty: "easy",
        hints: [
          "SQL can evaluate mathematical expressions",
          "Just write the math after SELECT",
          "SELECT 10 + 5;",
        ],
        validate: (result: QueryResult, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, "").trim();
          if (
            q.includes("select") &&
            (q.includes("10+5") || q.includes("5+10")) &&
            result.success
          ) {
            return {
              correct: true,
              message: "SQL can be your calculator! The result is 15.",
            };
          }
          if (q.includes("select") && q.includes("15") && result.success) {
            return {
              correct: true,
              message:
                "Correct result! Though try writing it as 10 + 5 to see SQL do the math.",
            };
          }
          return { correct: false, message: "Try: SELECT 10 + 5;" };
        },
      },
    ],
    summary: {
      id: "card-getting-started",
      title: "SQL & PostgreSQL Basics",
      syntax: `-- SQL: The language for databases
-- PostgreSQL: A powerful, free database

SELECT value;        -- Display a value
SELECT 'text';       -- Display text
SELECT 1 + 1;        -- Do math`,
      examples: ["SELECT 'Hello, World!';", "SELECT 42;", "SELECT 100 * 2;"],
      tips: [
        "SQL is case-insensitive, but UPPERCASE for keywords is common",
        "Always end statements with a semicolon (;)",
        "Use single quotes for text, no quotes for numbers",
      ],
    },
  },
};
