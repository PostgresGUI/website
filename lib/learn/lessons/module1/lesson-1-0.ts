import { Lesson, ValidationResult } from "../types";

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
        "Hey, welcome aboard! Before we dive into building databases, let me give you a quick overview of what we'll be working with. SQL is the language we use to talk to databases, and PostgreSQL is one of the most powerful database systems out there. Let me explain why we chose it here at PostgresGUI Inc.",
      timestamp: "Just now",
      learningObjectives: [
        "Understand what SQL is and why it matters",
        "Learn why PostgreSQL is the database of choice",
        "Write your first SQL query using SELECT",
        "Display text, numbers, and do basic math",
      ],
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
        validate: (_result, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, " ").trim();
          // Check that the query uses SELECT and contains the number 42
          if (!q.startsWith("select")) {
            return { correct: false, message: "Start your query with SELECT" };
          }
          // Check if the query contains 42 (not in quotes)
          // Match SELECT 42 or SELECT 42; but not SELECT '42'
          if (/select\s+42\s*(;|$)/.test(q)) {
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
          "Use SELECT to display your new company's name: 'PostgresGUI' - remember single quotes around text!",
        difficulty: "easy",
        hints: [
          "Text in SQL must be wrapped in single quotes",
          "Type PostgresGUI inside single quotes",
          "SELECT 'PostgresGUI';",
        ],
        validate: (_result, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, " ").trim();
          if (!q.startsWith("select")) {
            return { correct: false, message: "Start your query with SELECT" };
          }
          // Check if the query contains 'postgresgui' (in quotes)
          if (q.includes("'postgresgui'")) {
            return {
              correct: true,
              message: "Great! You displayed text using SQL.",
            };
          }
          return {
            correct: false,
            message: "Display the company name: SELECT 'PostgresGUI';",
          };
        },
      },
      {
        id: "getting-started-c3",
        title: "Simple Math",
        description:
          "SQL can do math! Use SELECT to calculate 10 + 5. Example: SELECT 2 + 2;",
        difficulty: "easy",
        hints: [
          "SQL can evaluate mathematical expressions",
          "Just write the math after SELECT",
          "SELECT 10 + 5;",
        ],
        validate: (_result, query: string): ValidationResult => {
          const q = query.toLowerCase().replace(/\s+/g, "").trim();
          if (
            q.includes("select") &&
            (q.includes("10+5") || q.includes("5+10"))
          ) {
            return {
              correct: true,
              message: "SQL can be your calculator! The result is 15.",
            };
          }
          if (q.includes("select") && q.includes("15")) {
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
