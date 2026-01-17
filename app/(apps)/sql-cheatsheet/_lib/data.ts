// SQL Cheatsheet Data - Multi-database support
// Each database has its own set of categories and examples

export interface SQLExample {
  id: string;
  title: string;
  description: string;
  sql: string;
  tags: string[];
}

export interface SQLCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  examples: SQLExample[];
}

// Data organized by database ID
export type CheatsheetData = Record<string, SQLCategory[]>;

// PostgreSQL data
const postgresqlCategories: SQLCategory[] = [
  {
    id: "select",
    name: "SELECT",
    icon: "search",
    description: "Retrieve data from tables",
    color: "#3b82f6", // blue
    examples: [
      {
        id: "select-all",
        title: "Select All Columns",
        description: "Retrieve all columns from a table",
        sql: `SELECT * FROM users;`,
        tags: ["basic", "all", "columns"],
      },
      {
        id: "select-specific",
        title: "Select Specific Columns",
        description: "Retrieve only the columns you need",
        sql: `SELECT name, email, created_at
FROM users;`,
        tags: ["basic", "columns", "specific"],
      },
      {
        id: "select-distinct",
        title: "Select Distinct Values",
        description: "Remove duplicate rows from results",
        sql: `SELECT DISTINCT country
FROM users;`,
        tags: ["distinct", "unique", "duplicates"],
      },
      {
        id: "select-alias",
        title: "Column Aliases",
        description: "Rename columns in output using AS",
        sql: `SELECT
  first_name AS "First Name",
  last_name AS "Last Name",
  email AS "Email Address"
FROM users;`,
        tags: ["alias", "as", "rename"],
      },
      {
        id: "select-concat",
        title: "Concatenate Columns",
        description: "Combine multiple columns into one",
        sql: `SELECT
  first_name || ' ' || last_name AS full_name,
  email
FROM users;`,
        tags: ["concat", "combine", "string"],
      },
      {
        id: "select-case",
        title: "CASE Expression",
        description: "Conditional logic in SELECT",
        sql: `SELECT
  name,
  price,
  CASE
    WHEN price < 10 THEN 'Budget'
    WHEN price < 50 THEN 'Standard'
    ELSE 'Premium'
  END AS price_tier
FROM products;`,
        tags: ["case", "when", "conditional", "if"],
      },
      {
        id: "select-coalesce",
        title: "Handle NULL Values",
        description: "Return first non-null value",
        sql: `SELECT
  name,
  COALESCE(nickname, name) AS display_name,
  COALESCE(phone, 'No phone') AS phone
FROM users;`,
        tags: ["null", "coalesce", "default"],
      },
      {
        id: "select-nullif",
        title: "NULLIF Function",
        description: "Return NULL if two values are equal",
        sql: `SELECT
  name,
  NULLIF(status, 'inactive') AS active_status
FROM users;`,
        tags: ["null", "nullif", "compare"],
      },
    ],
  },
  {
    id: "where",
    name: "WHERE",
    icon: "filter",
    description: "Filter rows with conditions",
    color: "#10b981", // emerald
    examples: [
      {
        id: "where-equal",
        title: "Equal Comparison",
        description: "Filter rows matching exact value",
        sql: `SELECT * FROM users
WHERE status = 'active';`,
        tags: ["equal", "exact", "match"],
      },
      {
        id: "where-comparison",
        title: "Comparison Operators",
        description: "Use >, <, >=, <=, <> for comparisons",
        sql: `SELECT * FROM products
WHERE price >= 100
  AND price <= 500;`,
        tags: ["greater", "less", "comparison", "range"],
      },
      {
        id: "where-between",
        title: "BETWEEN Range",
        description: "Filter values within a range (inclusive)",
        sql: `SELECT * FROM orders
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';`,
        tags: ["between", "range", "date"],
      },
      {
        id: "where-in",
        title: "IN List",
        description: "Match any value in a list",
        sql: `SELECT * FROM users
WHERE country IN ('USA', 'Canada', 'UK');`,
        tags: ["in", "list", "multiple"],
      },
      {
        id: "where-like",
        title: "LIKE Pattern Matching",
        description: "Match patterns with wildcards",
        sql: `-- % matches any sequence
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- _ matches single character
SELECT * FROM products WHERE sku LIKE 'ABC-___';`,
        tags: ["like", "pattern", "wildcard", "search"],
      },
      {
        id: "where-ilike",
        title: "ILIKE (Case Insensitive)",
        description: "Pattern matching ignoring case",
        sql: `SELECT * FROM users
WHERE name ILIKE '%john%';`,
        tags: ["ilike", "case", "insensitive"],
      },
      {
        id: "where-null",
        title: "NULL Checks",
        description: "Check for NULL or NOT NULL",
        sql: `-- Find rows with NULL
SELECT * FROM users WHERE phone IS NULL;

-- Find rows without NULL
SELECT * FROM users WHERE phone IS NOT NULL;`,
        tags: ["null", "is null", "empty"],
      },
      {
        id: "where-and-or",
        title: "AND / OR Logic",
        description: "Combine multiple conditions",
        sql: `SELECT * FROM users
WHERE (status = 'active' OR status = 'pending')
  AND created_at > '2024-01-01';`,
        tags: ["and", "or", "logic", "combine"],
      },
      {
        id: "where-not",
        title: "NOT Operator",
        description: "Negate conditions",
        sql: `SELECT * FROM users
WHERE NOT (status = 'deleted' OR status = 'banned');`,
        tags: ["not", "negate", "exclude"],
      },
      {
        id: "where-exists",
        title: "EXISTS Subquery",
        description: "Check if subquery returns rows",
        sql: `SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
);`,
        tags: ["exists", "subquery", "related"],
      },
      {
        id: "where-any",
        title: "ANY / SOME Operator",
        description: "Compare against any subquery value",
        sql: `-- Equal to any value
SELECT * FROM products
WHERE price = ANY(SELECT price FROM featured_products);

-- Greater than any (same as > MIN)
SELECT * FROM products
WHERE price > ANY(SELECT price FROM budget_products);`,
        tags: ["any", "some", "subquery"],
      },
      {
        id: "where-all",
        title: "ALL Operator",
        description: "Compare against all subquery values",
        sql: `-- Greater than all values
SELECT * FROM products
WHERE price > ALL(SELECT price FROM budget_products);

-- Not equal to all (exclude all matches)
SELECT * FROM users
WHERE id <> ALL(SELECT user_id FROM banned_users);`,
        tags: ["all", "subquery", "compare"],
      },
    ],
  },
  {
    id: "order-limit",
    name: "ORDER & LIMIT",
    icon: "arrow-up-down",
    description: "Sort and paginate results",
    color: "#f59e0b", // amber
    examples: [
      {
        id: "order-asc",
        title: "Sort Ascending",
        description: "Sort results A-Z, smallest to largest",
        sql: `SELECT * FROM users
ORDER BY created_at ASC;`,
        tags: ["order", "sort", "ascending", "asc"],
      },
      {
        id: "order-desc",
        title: "Sort Descending",
        description: "Sort results Z-A, largest to smallest",
        sql: `SELECT * FROM products
ORDER BY price DESC;`,
        tags: ["order", "sort", "descending", "desc"],
      },
      {
        id: "order-multiple",
        title: "Multi-Column Sort",
        description: "Sort by multiple columns",
        sql: `SELECT * FROM users
ORDER BY country ASC, created_at DESC;`,
        tags: ["order", "multiple", "columns"],
      },
      {
        id: "order-nulls",
        title: "NULL Ordering",
        description: "Control where NULLs appear",
        sql: `SELECT * FROM users
ORDER BY phone NULLS LAST;

-- Or put NULLs first
SELECT * FROM users
ORDER BY phone NULLS FIRST;`,
        tags: ["order", "null", "nulls first", "nulls last"],
      },
      {
        id: "limit-basic",
        title: "LIMIT Results",
        description: "Return only first N rows",
        sql: `SELECT * FROM products
ORDER BY created_at DESC
LIMIT 10;`,
        tags: ["limit", "top", "first"],
      },
      {
        id: "limit-offset",
        title: "OFFSET for Pagination",
        description: "Skip rows for pagination",
        sql: `-- Page 1 (rows 1-10)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0;

-- Page 2 (rows 11-20)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;

-- Page 3 (rows 21-30)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 20;`,
        tags: ["offset", "pagination", "skip", "page"],
      },
      {
        id: "fetch-first",
        title: "FETCH FIRST (SQL Standard)",
        description: "Standard SQL alternative to LIMIT",
        sql: `SELECT * FROM products
ORDER BY price DESC
FETCH FIRST 5 ROWS ONLY;`,
        tags: ["fetch", "first", "standard"],
      },
    ],
  },
  {
    id: "aggregate",
    name: "Aggregates",
    icon: "calculator",
    description: "COUNT, SUM, AVG, MIN, MAX",
    color: "#8b5cf6", // purple
    examples: [
      {
        id: "count-all",
        title: "COUNT All Rows",
        description: "Count total number of rows",
        sql: `SELECT COUNT(*) AS total_users
FROM users;`,
        tags: ["count", "total", "rows"],
      },
      {
        id: "count-distinct",
        title: "COUNT Distinct",
        description: "Count unique values",
        sql: `SELECT COUNT(DISTINCT country) AS countries
FROM users;`,
        tags: ["count", "distinct", "unique"],
      },
      {
        id: "sum",
        title: "SUM Values",
        description: "Calculate total of numeric column",
        sql: `SELECT SUM(amount) AS total_revenue
FROM orders
WHERE status = 'completed';`,
        tags: ["sum", "total", "add"],
      },
      {
        id: "avg",
        title: "AVG Average",
        description: "Calculate average of numeric column",
        sql: `SELECT AVG(price) AS average_price
FROM products;`,
        tags: ["avg", "average", "mean"],
      },
      {
        id: "min-max",
        title: "MIN and MAX",
        description: "Find smallest and largest values",
        sql: `SELECT
  MIN(price) AS cheapest,
  MAX(price) AS most_expensive
FROM products;`,
        tags: ["min", "max", "smallest", "largest"],
      },
      {
        id: "aggregate-filter",
        title: "Aggregate with FILTER",
        description: "Apply conditions to aggregates",
        sql: `SELECT
  COUNT(*) AS total_orders,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending
FROM orders;`,
        tags: ["filter", "conditional", "aggregate"],
      },
    ],
  },
  {
    id: "group-by",
    name: "GROUP BY",
    icon: "layers",
    description: "Group rows and aggregate",
    color: "#ec4899", // pink
    examples: [
      {
        id: "group-basic",
        title: "Basic Grouping",
        description: "Group rows by column value",
        sql: `SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country;`,
        tags: ["group", "basic", "count"],
      },
      {
        id: "group-multiple",
        title: "Group by Multiple Columns",
        description: "Create groups from column combinations",
        sql: `SELECT
  country,
  status,
  COUNT(*) AS user_count
FROM users
GROUP BY country, status;`,
        tags: ["group", "multiple", "columns"],
      },
      {
        id: "group-having",
        title: "HAVING Filter",
        description: "Filter groups after aggregation",
        sql: `SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 100;`,
        tags: ["having", "filter", "aggregate"],
      },
      {
        id: "group-rollup",
        title: "ROLLUP Subtotals",
        description: "Generate subtotals and grand total",
        sql: `SELECT
  country,
  city,
  COUNT(*) AS user_count
FROM users
GROUP BY ROLLUP(country, city);`,
        tags: ["rollup", "subtotal", "total"],
      },
      {
        id: "group-cube",
        title: "CUBE All Combinations",
        description: "Generate all grouping combinations",
        sql: `SELECT
  country,
  status,
  COUNT(*) AS user_count
FROM users
GROUP BY CUBE(country, status);`,
        tags: ["cube", "combinations", "all"],
      },
    ],
  },
  {
    id: "joins",
    name: "JOINs",
    icon: "git-merge",
    description: "Combine data from multiple tables",
    color: "#06b6d4", // cyan
    examples: [
      {
        id: "inner-join",
        title: "INNER JOIN",
        description: "Return matching rows from both tables",
        sql: `SELECT
  users.name,
  orders.id AS order_id,
  orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
        tags: ["inner", "join", "match"],
      },
      {
        id: "left-join",
        title: "LEFT JOIN",
        description: "All rows from left, matching from right",
        sql: `SELECT
  users.name,
  orders.id AS order_id
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
        tags: ["left", "join", "all"],
      },
      {
        id: "right-join",
        title: "RIGHT JOIN",
        description: "Matching from left, all from right",
        sql: `SELECT
  users.name,
  orders.id AS order_id
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;`,
        tags: ["right", "join"],
      },
      {
        id: "full-join",
        title: "FULL OUTER JOIN",
        description: "All rows from both tables",
        sql: `SELECT
  users.name,
  orders.id AS order_id
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;`,
        tags: ["full", "outer", "join", "all"],
      },
      {
        id: "cross-join",
        title: "CROSS JOIN",
        description: "Cartesian product of all rows",
        sql: `SELECT
  colors.name AS color,
  sizes.name AS size
FROM colors
CROSS JOIN sizes;`,
        tags: ["cross", "join", "cartesian", "product"],
      },
      {
        id: "self-join",
        title: "Self JOIN",
        description: "Join table to itself",
        sql: `SELECT
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`,
        tags: ["self", "join", "same", "table"],
      },
      {
        id: "multi-join",
        title: "Multiple JOINs",
        description: "Join more than two tables",
        sql: `SELECT
  users.name,
  orders.id AS order_id,
  products.name AS product
FROM users
INNER JOIN orders ON users.id = orders.user_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id;`,
        tags: ["multiple", "join", "three"],
      },
      {
        id: "join-using",
        title: "JOIN with USING",
        description: "Shorthand when column names match",
        sql: `SELECT users.name, orders.total
FROM users
INNER JOIN orders USING (user_id);`,
        tags: ["using", "join", "shorthand"],
      },
      {
        id: "natural-join",
        title: "NATURAL JOIN",
        description: "Auto-join on matching column names",
        sql: `-- Joins on all columns with same name
SELECT * FROM orders
NATURAL JOIN order_items;

-- Be careful: joins on ALL matching names
-- Prefer explicit JOIN conditions`,
        tags: ["natural", "join", "auto"],
      },
    ],
  },
  {
    id: "subqueries",
    name: "Subqueries",
    icon: "code",
    description: "Nested queries within queries",
    color: "#f97316", // orange
    examples: [
      {
        id: "subquery-where",
        title: "Subquery in WHERE",
        description: "Use query result as filter condition",
        sql: `SELECT * FROM products
WHERE price > (
  SELECT AVG(price) FROM products
);`,
        tags: ["subquery", "where", "filter"],
      },
      {
        id: "subquery-in",
        title: "Subquery with IN",
        description: "Match against subquery results",
        sql: `SELECT * FROM users
WHERE id IN (
  SELECT user_id FROM orders
  WHERE total > 1000
);`,
        tags: ["subquery", "in", "list"],
      },
      {
        id: "subquery-from",
        title: "Subquery in FROM",
        description: "Use subquery as a derived table",
        sql: `SELECT
  country,
  avg_order
FROM (
  SELECT
    u.country,
    AVG(o.total) AS avg_order
  FROM users u
  JOIN orders o ON u.id = o.user_id
  GROUP BY u.country
) AS country_stats
WHERE avg_order > 500;`,
        tags: ["subquery", "from", "derived"],
      },
      {
        id: "subquery-select",
        title: "Scalar Subquery in SELECT",
        description: "Return single value in column",
        sql: `SELECT
  name,
  price,
  price - (SELECT AVG(price) FROM products) AS diff_from_avg
FROM products;`,
        tags: ["subquery", "select", "scalar"],
      },
      {
        id: "correlated-subquery",
        title: "Correlated Subquery",
        description: "Subquery referencing outer query",
        sql: `SELECT * FROM products p
WHERE price > (
  SELECT AVG(price)
  FROM products
  WHERE category_id = p.category_id
);`,
        tags: ["correlated", "subquery", "reference"],
      },
      {
        id: "lateral-join",
        title: "LATERAL Join",
        description: "Subquery can reference preceding tables",
        sql: `SELECT
  u.name,
  recent.order_date,
  recent.total
FROM users u
CROSS JOIN LATERAL (
  SELECT order_date, total
  FROM orders
  WHERE user_id = u.id
  ORDER BY order_date DESC
  LIMIT 3
) AS recent;`,
        tags: ["lateral", "join", "each"],
      },
      {
        id: "not-exists",
        title: "NOT EXISTS",
        description: "Check subquery returns no rows",
        sql: `-- Users with no orders
SELECT * FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
);`,
        tags: ["not exists", "subquery", "none"],
      },
    ],
  },
  {
    id: "cte",
    name: "CTEs",
    icon: "boxes",
    description: "Common Table Expressions (WITH)",
    color: "#84cc16", // lime
    examples: [
      {
        id: "cte-basic",
        title: "Basic CTE",
        description: "Define a named subquery",
        sql: `WITH active_users AS (
  SELECT * FROM users
  WHERE status = 'active'
)
SELECT * FROM active_users
WHERE created_at > '2024-01-01';`,
        tags: ["cte", "with", "basic"],
      },
      {
        id: "cte-multiple",
        title: "Multiple CTEs",
        description: "Chain multiple CTEs together",
        sql: `WITH
  active_users AS (
    SELECT * FROM users WHERE status = 'active'
  ),
  user_orders AS (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
  )
SELECT
  u.name,
  COALESCE(o.order_count, 0) AS orders
FROM active_users u
LEFT JOIN user_orders o ON u.id = o.user_id;`,
        tags: ["cte", "multiple", "chain"],
      },
      {
        id: "cte-recursive",
        title: "Recursive CTE",
        description: "Query hierarchical or tree data",
        sql: `WITH RECURSIVE org_chart AS (
  -- Base case: top-level (no manager)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  INNER JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;`,
        tags: ["recursive", "cte", "hierarchy", "tree"],
      },
      {
        id: "cte-numbers",
        title: "Generate Number Series",
        description: "Create sequence with recursive CTE",
        sql: `WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 100
)
SELECT * FROM numbers;`,
        tags: ["recursive", "sequence", "generate"],
      },
    ],
  },
  {
    id: "window",
    name: "Window Functions",
    icon: "table-2",
    description: "ROW_NUMBER, RANK, LAG, LEAD",
    color: "#0ea5e9", // sky
    examples: [
      {
        id: "row-number",
        title: "ROW_NUMBER",
        description: "Assign sequential numbers to rows",
        sql: `SELECT
  name,
  price,
  ROW_NUMBER() OVER (ORDER BY price DESC) AS rank
FROM products;`,
        tags: ["row_number", "sequence", "number"],
      },
      {
        id: "rank-dense",
        title: "RANK vs DENSE_RANK",
        description: "Handle ties differently",
        sql: `SELECT
  name,
  price,
  RANK() OVER (ORDER BY price DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY price DESC) AS dense_rank
FROM products;`,
        tags: ["rank", "dense_rank", "ties"],
      },
      {
        id: "partition",
        title: "PARTITION BY",
        description: "Window function per group",
        sql: `SELECT
  category,
  name,
  price,
  RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank
FROM products;`,
        tags: ["partition", "group", "per"],
      },
      {
        id: "lag-lead",
        title: "LAG and LEAD",
        description: "Access previous/next row values",
        sql: `SELECT
  order_date,
  total,
  LAG(total) OVER (ORDER BY order_date) AS prev_total,
  LEAD(total) OVER (ORDER BY order_date) AS next_total
FROM orders;`,
        tags: ["lag", "lead", "previous", "next"],
      },
      {
        id: "running-total",
        title: "Running Total",
        description: "Cumulative sum with SUM window",
        sql: `SELECT
  order_date,
  total,
  SUM(total) OVER (ORDER BY order_date) AS running_total
FROM orders;`,
        tags: ["running", "total", "cumulative", "sum"],
      },
      {
        id: "moving-average",
        title: "Moving Average",
        description: "Average over sliding window",
        sql: `SELECT
  order_date,
  total,
  AVG(total) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7day
FROM orders;`,
        tags: ["moving", "average", "sliding", "window"],
      },
      {
        id: "first-last",
        title: "FIRST_VALUE / LAST_VALUE",
        description: "Get first or last value in window",
        sql: `SELECT
  name,
  price,
  FIRST_VALUE(name) OVER (ORDER BY price DESC) AS most_expensive,
  LAST_VALUE(name) OVER (
    ORDER BY price DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS cheapest
FROM products;`,
        tags: ["first_value", "last_value", "window"],
      },
      {
        id: "ntile",
        title: "NTILE Buckets",
        description: "Divide rows into N equal groups",
        sql: `SELECT
  name,
  price,
  NTILE(4) OVER (ORDER BY price) AS quartile
FROM products;`,
        tags: ["ntile", "bucket", "quartile", "percentile"],
      },
    ],
  },
  {
    id: "string",
    name: "String Functions",
    icon: "text",
    description: "Text manipulation functions",
    color: "#14b8a6", // teal
    examples: [
      {
        id: "concat",
        title: "CONCAT / ||",
        description: "Join strings together",
        sql: `SELECT
  CONCAT(first_name, ' ', last_name) AS full_name,
  first_name || ' ' || last_name AS full_name_alt
FROM users;`,
        tags: ["concat", "join", "combine"],
      },
      {
        id: "upper-lower",
        title: "UPPER / LOWER",
        description: "Change case",
        sql: `SELECT
  UPPER(name) AS uppercase,
  LOWER(email) AS lowercase,
  INITCAP(name) AS titlecase
FROM users;`,
        tags: ["upper", "lower", "case", "initcap"],
      },
      {
        id: "substring",
        title: "SUBSTRING",
        description: "Extract part of string",
        sql: `SELECT
  SUBSTRING(phone FROM 1 FOR 3) AS area_code,
  SUBSTRING(email FROM '@(.+)$') AS domain
FROM users;`,
        tags: ["substring", "extract", "part"],
      },
      {
        id: "trim",
        title: "TRIM / LTRIM / RTRIM",
        description: "Remove whitespace or characters",
        sql: `SELECT
  TRIM('  hello  ') AS trimmed,
  LTRIM('  hello  ') AS left_trimmed,
  RTRIM('  hello  ') AS right_trimmed,
  TRIM(BOTH '-' FROM '--hello--') AS custom_trim
FROM users;`,
        tags: ["trim", "whitespace", "remove"],
      },
      {
        id: "replace",
        title: "REPLACE",
        description: "Replace substring with another",
        sql: `SELECT
  REPLACE(phone, '-', '') AS phone_digits,
  REPLACE(name, 'Mr. ', '') AS name_no_title
FROM users;`,
        tags: ["replace", "substitute", "swap"],
      },
      {
        id: "split",
        title: "SPLIT_PART",
        description: "Split string and get part",
        sql: `SELECT
  email,
  SPLIT_PART(email, '@', 1) AS username,
  SPLIT_PART(email, '@', 2) AS domain
FROM users;`,
        tags: ["split", "part", "delimiter"],
      },
      {
        id: "length",
        title: "LENGTH / CHAR_LENGTH",
        description: "Get string length",
        sql: `SELECT
  name,
  LENGTH(name) AS name_length,
  CHAR_LENGTH(name) AS char_count
FROM users;`,
        tags: ["length", "count", "size"],
      },
      {
        id: "position",
        title: "POSITION / STRPOS",
        description: "Find substring position",
        sql: `SELECT
  email,
  POSITION('@' IN email) AS at_position,
  STRPOS(email, '@') AS at_position_alt
FROM users;`,
        tags: ["position", "find", "index", "strpos"],
      },
    ],
  },
  {
    id: "date",
    name: "Date & Time",
    icon: "calendar",
    description: "Date and time functions",
    color: "#a855f7", // purple-500
    examples: [
      {
        id: "current",
        title: "Current Date/Time",
        description: "Get current timestamp",
        sql: `SELECT
  CURRENT_DATE AS today,
  CURRENT_TIME AS now_time,
  CURRENT_TIMESTAMP AS now_full,
  NOW() AS now_func;`,
        tags: ["current", "now", "today"],
      },
      {
        id: "extract",
        title: "EXTRACT Parts",
        description: "Get specific date/time parts",
        sql: `SELECT
  created_at,
  EXTRACT(YEAR FROM created_at) AS year,
  EXTRACT(MONTH FROM created_at) AS month,
  EXTRACT(DAY FROM created_at) AS day,
  EXTRACT(HOUR FROM created_at) AS hour
FROM orders;`,
        tags: ["extract", "year", "month", "day"],
      },
      {
        id: "date-trunc",
        title: "DATE_TRUNC",
        description: "Truncate to specified precision",
        sql: `SELECT
  created_at,
  DATE_TRUNC('month', created_at) AS month_start,
  DATE_TRUNC('year', created_at) AS year_start,
  DATE_TRUNC('hour', created_at) AS hour_start
FROM orders;`,
        tags: ["date_trunc", "truncate", "round"],
      },
      {
        id: "date-add",
        title: "Date Arithmetic",
        description: "Add or subtract intervals",
        sql: `SELECT
  NOW() AS now,
  NOW() + INTERVAL '1 day' AS tomorrow,
  NOW() - INTERVAL '1 week' AS last_week,
  NOW() + INTERVAL '3 months' AS three_months
FROM orders;`,
        tags: ["interval", "add", "subtract", "arithmetic"],
      },
      {
        id: "age",
        title: "AGE Function",
        description: "Calculate difference between dates",
        sql: `SELECT
  name,
  birth_date,
  AGE(birth_date) AS age,
  AGE(NOW(), hire_date) AS tenure
FROM employees;`,
        tags: ["age", "difference", "between"],
      },
      {
        id: "format",
        title: "TO_CHAR Formatting",
        description: "Format date as string",
        sql: `SELECT
  created_at,
  TO_CHAR(created_at, 'YYYY-MM-DD') AS iso_date,
  TO_CHAR(created_at, 'Mon DD, YYYY') AS pretty_date,
  TO_CHAR(created_at, 'HH24:MI:SS') AS time_24h
FROM orders;`,
        tags: ["to_char", "format", "string"],
      },
      {
        id: "generate-series",
        title: "Generate Date Series",
        description: "Create sequence of dates",
        sql: `SELECT date::date
FROM generate_series(
  '2024-01-01'::date,
  '2024-12-31'::date,
  '1 month'::interval
) AS date;`,
        tags: ["generate_series", "sequence", "range"],
      },
    ],
  },
  {
    id: "json",
    name: "JSON",
    icon: "braces",
    description: "JSON data manipulation",
    color: "#eab308", // yellow
    examples: [
      {
        id: "json-access",
        title: "Access JSON Fields",
        description: "Use -> and ->> operators",
        sql: `SELECT
  data->'name' AS name_json,          -- returns JSON
  data->>'name' AS name_text,         -- returns text
  data->'address'->>'city' AS city    -- nested access
FROM users;`,
        tags: ["json", "access", "arrow", "field"],
      },
      {
        id: "json-path",
        title: "JSON Path",
        description: "Use #> and #>> for path access",
        sql: `SELECT
  data #> '{address,city}' AS city_json,
  data #>> '{address,city}' AS city_text,
  data #>> '{tags,0}' AS first_tag
FROM users;`,
        tags: ["json", "path", "nested"],
      },
      {
        id: "jsonb-contains",
        title: "JSONB Containment",
        description: "Check if JSON contains value",
        sql: `-- Contains this JSON?
SELECT * FROM products
WHERE data @> '{"status": "active"}';

-- Is contained by?
SELECT * FROM products
WHERE '{"status": "active", "type": "book"}' @> data;`,
        tags: ["jsonb", "contains", "search"],
      },
      {
        id: "json-build",
        title: "Build JSON Objects",
        description: "Create JSON from columns",
        sql: `SELECT
  json_build_object(
    'id', id,
    'name', name,
    'email', email
  ) AS user_json
FROM users;`,
        tags: ["json", "build", "create", "object"],
      },
      {
        id: "json-agg",
        title: "JSON Aggregation",
        description: "Aggregate rows into JSON array",
        sql: `SELECT
  category,
  json_agg(name) AS product_names,
  json_agg(json_build_object('name', name, 'price', price)) AS products
FROM products
GROUP BY category;`,
        tags: ["json_agg", "aggregate", "array"],
      },
      {
        id: "jsonb-set",
        title: "JSONB_SET Update",
        description: "Update nested JSON value",
        sql: `UPDATE users
SET data = jsonb_set(
  data,
  '{address,city}',
  '"New York"'
)
WHERE id = 1;`,
        tags: ["jsonb_set", "update", "modify"],
      },
    ],
  },
  {
    id: "insert-update-delete",
    name: "INSERT / UPDATE / DELETE",
    icon: "pencil",
    description: "Modify data in tables",
    color: "#ef4444", // red
    examples: [
      {
        id: "insert-basic",
        title: "Basic INSERT",
        description: "Insert a single row",
        sql: `INSERT INTO users (name, email, status)
VALUES ('John Doe', 'john@example.com', 'active');`,
        tags: ["insert", "add", "create"],
      },
      {
        id: "insert-multiple",
        title: "Insert Multiple Rows",
        description: "Insert several rows at once",
        sql: `INSERT INTO users (name, email)
VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com'),
  ('Carol', 'carol@example.com');`,
        tags: ["insert", "multiple", "batch"],
      },
      {
        id: "insert-returning",
        title: "INSERT with RETURNING",
        description: "Get inserted data back",
        sql: `INSERT INTO users (name, email)
VALUES ('John', 'john@example.com')
RETURNING id, name, created_at;`,
        tags: ["insert", "returning", "id"],
      },
      {
        id: "insert-select",
        title: "INSERT from SELECT",
        description: "Insert rows from a query",
        sql: `INSERT INTO users_archive (name, email)
SELECT name, email
FROM users
WHERE status = 'inactive';`,
        tags: ["insert", "select", "copy"],
      },
      {
        id: "upsert",
        title: "UPSERT (ON CONFLICT)",
        description: "Insert or update if exists",
        sql: `INSERT INTO users (id, name, email)
VALUES (1, 'John', 'john@example.com')
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
    email = EXCLUDED.email;`,
        tags: ["upsert", "conflict", "merge"],
      },
      {
        id: "upsert-nothing",
        title: "INSERT or Ignore",
        description: "Skip if already exists",
        sql: `INSERT INTO users (email, name)
VALUES ('john@example.com', 'John')
ON CONFLICT (email) DO NOTHING;`,
        tags: ["upsert", "ignore", "skip"],
      },
      {
        id: "update-basic",
        title: "Basic UPDATE",
        description: "Update rows matching condition",
        sql: `UPDATE users
SET status = 'inactive',
    updated_at = NOW()
WHERE last_login < '2024-01-01';`,
        tags: ["update", "modify", "set"],
      },
      {
        id: "update-returning",
        title: "UPDATE with RETURNING",
        description: "Get updated rows back",
        sql: `UPDATE products
SET price = price * 1.10
WHERE category = 'electronics'
RETURNING id, name, price;`,
        tags: ["update", "returning"],
      },
      {
        id: "update-from",
        title: "UPDATE with FROM",
        description: "Update using another table",
        sql: `UPDATE orders
SET status = 'shipped'
FROM shipments
WHERE orders.id = shipments.order_id
  AND shipments.shipped_at IS NOT NULL;`,
        tags: ["update", "join", "from"],
      },
      {
        id: "delete-basic",
        title: "Basic DELETE",
        description: "Delete rows matching condition",
        sql: `DELETE FROM users
WHERE status = 'deleted'
  AND updated_at < NOW() - INTERVAL '30 days';`,
        tags: ["delete", "remove"],
      },
      {
        id: "delete-returning",
        title: "DELETE with RETURNING",
        description: "Get deleted rows back",
        sql: `DELETE FROM sessions
WHERE expires_at < NOW()
RETURNING id, user_id;`,
        tags: ["delete", "returning"],
      },
      {
        id: "truncate",
        title: "TRUNCATE Table",
        description: "Delete all rows quickly",
        sql: `-- Fast delete all rows (resets sequences)
TRUNCATE TABLE logs;

-- Truncate multiple tables
TRUNCATE TABLE orders, order_items
RESTART IDENTITY CASCADE;`,
        tags: ["truncate", "clear", "all"],
      },
    ],
  },
  {
    id: "ddl",
    name: "Tables & DDL",
    icon: "database",
    description: "CREATE, ALTER, DROP structures",
    color: "#6366f1", // indigo
    examples: [
      {
        id: "create-table",
        title: "CREATE TABLE",
        description: "Create a new table",
        sql: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);`,
        tags: ["create", "table", "ddl"],
      },
      {
        id: "create-table-if",
        title: "CREATE IF NOT EXISTS",
        description: "Create table only if missing",
        sql: `CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  message TEXT,
  level VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);`,
        tags: ["create", "if not exists"],
      },
      {
        id: "create-as-select",
        title: "CREATE TABLE AS",
        description: "Create table from query",
        sql: `CREATE TABLE active_users AS
SELECT id, name, email
FROM users
WHERE status = 'active';`,
        tags: ["create", "as", "select", "copy"],
      },
      {
        id: "alter-add-column",
        title: "Add Column",
        description: "Add a new column to table",
        sql: `ALTER TABLE users
ADD COLUMN phone VARCHAR(20);

-- With default value
ALTER TABLE users
ADD COLUMN is_verified BOOLEAN DEFAULT false;`,
        tags: ["alter", "add", "column"],
      },
      {
        id: "alter-drop-column",
        title: "Drop Column",
        description: "Remove a column from table",
        sql: `ALTER TABLE users
DROP COLUMN phone;

-- Drop if exists
ALTER TABLE users
DROP COLUMN IF EXISTS temp_field;`,
        tags: ["alter", "drop", "column"],
      },
      {
        id: "alter-rename",
        title: "Rename Column / Table",
        description: "Rename columns or tables",
        sql: `-- Rename column
ALTER TABLE users
RENAME COLUMN name TO full_name;

-- Rename table
ALTER TABLE users
RENAME TO customers;`,
        tags: ["alter", "rename"],
      },
      {
        id: "alter-type",
        title: "Change Column Type",
        description: "Modify column data type",
        sql: `ALTER TABLE products
ALTER COLUMN price TYPE NUMERIC(10,2);

-- With conversion
ALTER TABLE users
ALTER COLUMN age TYPE INTEGER
USING age::INTEGER;`,
        tags: ["alter", "type", "modify"],
      },
      {
        id: "alter-default",
        title: "Set / Drop Default",
        description: "Change column default value",
        sql: `-- Set default
ALTER TABLE users
ALTER COLUMN status SET DEFAULT 'pending';

-- Remove default
ALTER TABLE users
ALTER COLUMN status DROP DEFAULT;`,
        tags: ["alter", "default"],
      },
      {
        id: "drop-table",
        title: "DROP TABLE",
        description: "Delete a table",
        sql: `DROP TABLE users;

-- Drop if exists
DROP TABLE IF EXISTS temp_users;

-- Drop with dependent objects
DROP TABLE orders CASCADE;`,
        tags: ["drop", "table", "delete"],
      },
      {
        id: "create-index",
        title: "CREATE INDEX",
        description: "Create index for faster queries",
        sql: `-- Basic index
CREATE INDEX idx_users_email ON users(email);

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Multi-column index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);`,
        tags: ["index", "create", "performance"],
      },
      {
        id: "drop-index",
        title: "DROP INDEX",
        description: "Remove an index",
        sql: `DROP INDEX idx_users_email;

DROP INDEX IF EXISTS idx_temp;`,
        tags: ["index", "drop"],
      },
      {
        id: "create-view",
        title: "CREATE VIEW",
        description: "Create a virtual table",
        sql: `CREATE VIEW active_orders AS
SELECT o.id, u.name, o.total, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'active';

-- Then query like a table
SELECT * FROM active_orders;`,
        tags: ["view", "create", "virtual"],
      },
    ],
  },
  {
    id: "constraints",
    name: "Constraints",
    icon: "lock",
    description: "PRIMARY KEY, FOREIGN KEY, UNIQUE",
    color: "#dc2626", // red-600
    examples: [
      {
        id: "primary-key",
        title: "PRIMARY KEY",
        description: "Unique identifier for rows",
        sql: `-- Inline definition
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- Named constraint
CREATE TABLE products (
  id INTEGER,
  sku VARCHAR(50),
  CONSTRAINT pk_products PRIMARY KEY (id)
);`,
        tags: ["primary", "key", "pk"],
      },
      {
        id: "foreign-key",
        title: "FOREIGN KEY",
        description: "Reference another table",
        sql: `CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2)
);

-- With ON DELETE action
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id)
    ON DELETE CASCADE,
  content TEXT
);`,
        tags: ["foreign", "key", "fk", "references"],
      },
      {
        id: "unique",
        title: "UNIQUE Constraint",
        description: "Prevent duplicate values",
        sql: `-- Single column
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE
);

-- Multiple columns
CREATE TABLE memberships (
  user_id INTEGER,
  group_id INTEGER,
  UNIQUE (user_id, group_id)
);`,
        tags: ["unique", "duplicate"],
      },
      {
        id: "not-null",
        title: "NOT NULL",
        description: "Require a value",
        sql: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL
);`,
        tags: ["not null", "required"],
      },
      {
        id: "check",
        title: "CHECK Constraint",
        description: "Validate column values",
        sql: `CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2) CHECK (price > 0),
  quantity INTEGER CHECK (quantity >= 0)
);

-- Named check
CREATE TABLE users (
  age INTEGER,
  CONSTRAINT valid_age CHECK (age >= 0 AND age < 150)
);`,
        tags: ["check", "validate", "constraint"],
      },
      {
        id: "default",
        title: "DEFAULT Value",
        description: "Set automatic default",
        sql: `CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  status VARCHAR(20) DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);`,
        tags: ["default", "automatic"],
      },
      {
        id: "add-constraint",
        title: "Add Constraint to Existing Table",
        description: "Add constraints with ALTER",
        sql: `-- Add foreign key
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id) REFERENCES users(id);

-- Add unique constraint
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Add check constraint
ALTER TABLE products
ADD CONSTRAINT positive_price CHECK (price > 0);`,
        tags: ["alter", "add", "constraint"],
      },
      {
        id: "drop-constraint",
        title: "Drop Constraint",
        description: "Remove a constraint",
        sql: `ALTER TABLE orders
DROP CONSTRAINT fk_orders_user;

ALTER TABLE users
DROP CONSTRAINT IF EXISTS unique_email;`,
        tags: ["drop", "constraint", "remove"],
      },
    ],
  },
  {
    id: "set-operations",
    name: "Set Operations",
    icon: "combine",
    description: "UNION, INTERSECT, EXCEPT",
    color: "#0891b2", // cyan-600
    examples: [
      {
        id: "union",
        title: "UNION",
        description: "Combine results, remove duplicates",
        sql: `SELECT name, email FROM customers
UNION
SELECT name, email FROM suppliers;`,
        tags: ["union", "combine", "distinct"],
      },
      {
        id: "union-all",
        title: "UNION ALL",
        description: "Combine results, keep duplicates",
        sql: `SELECT product_id, 'sale' AS type FROM sales
UNION ALL
SELECT product_id, 'return' AS type FROM returns;`,
        tags: ["union", "all", "duplicates"],
      },
      {
        id: "intersect",
        title: "INTERSECT",
        description: "Rows in both queries",
        sql: `SELECT user_id FROM premium_users
INTERSECT
SELECT user_id FROM active_users;`,
        tags: ["intersect", "common", "both"],
      },
      {
        id: "except",
        title: "EXCEPT",
        description: "Rows in first but not second",
        sql: `SELECT user_id FROM all_users
EXCEPT
SELECT user_id FROM banned_users;`,
        tags: ["except", "minus", "difference"],
      },
      {
        id: "set-order",
        title: "ORDER with Set Operations",
        description: "Sort combined results",
        sql: `(SELECT name, 'customer' AS type FROM customers)
UNION
(SELECT name, 'supplier' AS type FROM suppliers)
ORDER BY name;`,
        tags: ["union", "order", "sort"],
      },
    ],
  },
  {
    id: "type-casting",
    name: "Type Casting",
    icon: "arrow-right-left",
    description: "Convert between data types",
    color: "#7c3aed", // violet
    examples: [
      {
        id: "cast-operator",
        title: ":: Operator",
        description: "PostgreSQL cast shorthand",
        sql: `SELECT
  '123'::INTEGER AS num,
  '2024-01-15'::DATE AS date,
  123::TEXT AS str,
  '3.14'::NUMERIC AS decimal;`,
        tags: ["cast", "convert", "type"],
      },
      {
        id: "cast-function",
        title: "CAST Function",
        description: "Standard SQL casting",
        sql: `SELECT
  CAST('123' AS INTEGER) AS num,
  CAST('2024-01-15' AS DATE) AS date,
  CAST(price AS INTEGER) AS rounded
FROM products;`,
        tags: ["cast", "function", "convert"],
      },
      {
        id: "cast-numeric",
        title: "Numeric Conversions",
        description: "Convert between number types",
        sql: `SELECT
  1234.567::INTEGER AS truncated,    -- 1234
  1234.567::NUMERIC(10,1) AS rounded, -- 1234.6
  '99.99'::DECIMAL(5,2) AS decimal;`,
        tags: ["numeric", "integer", "decimal"],
      },
      {
        id: "cast-timestamp",
        title: "Date/Time Conversions",
        description: "Convert date and time types",
        sql: `SELECT
  NOW()::DATE AS today,
  NOW()::TIME AS current_time,
  '2024-01-15 10:30:00'::TIMESTAMP AS ts,
  EXTRACT(EPOCH FROM NOW())::INTEGER AS unix;`,
        tags: ["date", "time", "timestamp"],
      },
      {
        id: "cast-boolean",
        title: "Boolean Conversions",
        description: "Convert to/from boolean",
        sql: `SELECT
  'true'::BOOLEAN,
  'yes'::BOOLEAN,
  '1'::BOOLEAN,
  1::BOOLEAN,
  true::INTEGER;  -- 1`,
        tags: ["boolean", "bool", "convert"],
      },
      {
        id: "cast-json",
        title: "JSON Conversions",
        description: "Convert to/from JSON",
        sql: `SELECT
  '{"name": "John"}'::JSON,
  '{"name": "John"}'::JSONB,
  row_to_json(users.*) FROM users;`,
        tags: ["json", "jsonb", "convert"],
      },
    ],
  },
  {
    id: "numeric-functions",
    name: "Numeric Functions",
    icon: "hash",
    description: "ROUND, ABS, CEIL, FLOOR",
    color: "#ea580c", // orange-600
    examples: [
      {
        id: "round",
        title: "ROUND",
        description: "Round to decimal places",
        sql: `SELECT
  ROUND(3.14159) AS whole,         -- 3
  ROUND(3.14159, 2) AS two_dec,    -- 3.14
  ROUND(1234.5, -2) AS hundreds;   -- 1200`,
        tags: ["round", "decimal"],
      },
      {
        id: "ceil-floor",
        title: "CEIL / FLOOR",
        description: "Round up or down",
        sql: `SELECT
  CEIL(4.2) AS ceiling,   -- 5
  FLOOR(4.8) AS floor,    -- 4
  CEIL(-4.2) AS neg_ceil, -- -4
  FLOOR(-4.8) AS neg_fl;  -- -5`,
        tags: ["ceil", "floor", "ceiling"],
      },
      {
        id: "trunc",
        title: "TRUNC",
        description: "Truncate toward zero",
        sql: `SELECT
  TRUNC(4.9) AS truncated,     -- 4
  TRUNC(-4.9) AS neg_trunc,    -- -4
  TRUNC(123.456, 1) AS one_dec; -- 123.4`,
        tags: ["trunc", "truncate"],
      },
      {
        id: "abs",
        title: "ABS",
        description: "Absolute value",
        sql: `SELECT
  ABS(-5) AS positive,     -- 5
  ABS(5) AS still_pos,     -- 5
  ABS(price - 100) AS diff
FROM products;`,
        tags: ["abs", "absolute"],
      },
      {
        id: "power-sqrt",
        title: "POWER / SQRT",
        description: "Exponents and square root",
        sql: `SELECT
  POWER(2, 3) AS eight,       -- 8
  POWER(10, 2) AS hundred,    -- 100
  SQRT(16) AS four,           -- 4
  SQRT(2) AS root2;           -- 1.414...`,
        tags: ["power", "sqrt", "exponent"],
      },
      {
        id: "mod",
        title: "MOD / %",
        description: "Remainder after division",
        sql: `SELECT
  MOD(10, 3) AS remainder,    -- 1
  17 % 5 AS mod_operator,     -- 2
  MOD(id, 2) AS is_odd
FROM users;`,
        tags: ["mod", "modulo", "remainder"],
      },
      {
        id: "random",
        title: "RANDOM",
        description: "Generate random numbers",
        sql: `SELECT
  RANDOM() AS zero_to_one,
  FLOOR(RANDOM() * 100) AS zero_to_99,
  FLOOR(RANDOM() * (max - min + 1) + min) AS range;

-- Random row
SELECT * FROM users
ORDER BY RANDOM()
LIMIT 1;`,
        tags: ["random", "rand"],
      },
      {
        id: "sign",
        title: "SIGN / DIV",
        description: "Sign and integer division",
        sql: `SELECT
  SIGN(-5) AS negative,   -- -1
  SIGN(0) AS zero,        -- 0
  SIGN(5) AS positive,    -- 1
  DIV(17, 5) AS int_div;  -- 3`,
        tags: ["sign", "div", "division"],
      },
    ],
  },
  {
    id: "arrays",
    name: "Arrays",
    icon: "list",
    description: "PostgreSQL array operations",
    color: "#059669", // emerald-600
    examples: [
      {
        id: "array-literal",
        title: "Array Literals",
        description: "Create array values",
        sql: `SELECT
  ARRAY[1, 2, 3] AS int_array,
  ARRAY['a', 'b', 'c'] AS text_array,
  '{1,2,3}'::INTEGER[] AS cast_array;`,
        tags: ["array", "create", "literal"],
      },
      {
        id: "array-access",
        title: "Access Array Elements",
        description: "Get elements by index (1-based)",
        sql: `SELECT
  (ARRAY['a','b','c'])[1] AS first,   -- 'a'
  (ARRAY['a','b','c'])[2:3] AS slice, -- {'b','c'}
  tags[1] AS first_tag
FROM posts;`,
        tags: ["array", "index", "access"],
      },
      {
        id: "array-any",
        title: "ANY / ALL with Arrays",
        description: "Compare against array values",
        sql: `-- Match any value in array
SELECT * FROM users
WHERE status = ANY(ARRAY['active', 'pending']);

-- Match all values
SELECT * FROM products
WHERE price > ALL(ARRAY[10, 20, 30]);`,
        tags: ["any", "all", "array"],
      },
      {
        id: "array-contains",
        title: "Array Contains",
        description: "Check array containment",
        sql: `-- Contains all elements
SELECT * FROM posts
WHERE tags @> ARRAY['sql', 'database'];

-- Is contained by
SELECT * FROM posts
WHERE tags <@ ARRAY['sql', 'database', 'postgresql'];

-- Overlaps (has common elements)
SELECT * FROM posts
WHERE tags && ARRAY['sql', 'nosql'];`,
        tags: ["contains", "overlap", "array"],
      },
      {
        id: "array-agg",
        title: "ARRAY_AGG",
        description: "Aggregate values into array",
        sql: `SELECT
  category,
  ARRAY_AGG(name) AS product_names,
  ARRAY_AGG(DISTINCT status) AS statuses
FROM products
GROUP BY category;`,
        tags: ["array_agg", "aggregate"],
      },
      {
        id: "unnest",
        title: "UNNEST",
        description: "Expand array to rows",
        sql: `SELECT UNNEST(ARRAY[1, 2, 3]) AS num;

-- Expand column array
SELECT id, UNNEST(tags) AS tag
FROM posts;`,
        tags: ["unnest", "expand", "rows"],
      },
      {
        id: "array-functions",
        title: "Array Functions",
        description: "Common array operations",
        sql: `SELECT
  ARRAY_LENGTH(ARRAY[1,2,3], 1) AS len,    -- 3
  ARRAY_CAT(ARRAY[1,2], ARRAY[3,4]) AS concat, -- {1,2,3,4}
  ARRAY_APPEND(ARRAY[1,2], 3) AS append,   -- {1,2,3}
  ARRAY_REMOVE(ARRAY[1,2,3], 2) AS removed; -- {1,3}`,
        tags: ["array", "length", "append"],
      },
      {
        id: "array-position",
        title: "Array Search",
        description: "Find elements in arrays",
        sql: `SELECT
  ARRAY_POSITION(ARRAY['a','b','c'], 'b') AS pos, -- 2
  'b' = ANY(ARRAY['a','b','c']) AS exists,        -- true
  CARDINALITY(ARRAY[1,2,3]) AS size;              -- 3`,
        tags: ["array", "position", "search"],
      },
    ],
  },
];

// All cheatsheet data organized by database
export const cheatsheetData: CheatsheetData = {
  postgresql: postgresqlCategories,
  // Future databases:
  // mysql: mysqlCategories,
  // sqlite: sqliteCategories,
};

// Helper to get categories for a specific database
export function getCategories(databaseId: string): SQLCategory[] {
  return cheatsheetData[databaseId] ?? postgresqlCategories;
}

// Default export for backwards compatibility
export const sqlCategories = postgresqlCategories;

