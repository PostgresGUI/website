# PostgreSQL Learning Game - Design Document

## Vision Statement
A mobile-friendly game that teaches complete beginners PostgreSQL through realistic workplace scenarios. Each module ends with a hands-on project where learners apply everything they've learned.

---

## Story Framework: "QueryCraft"

### Narrative Premise
You've just been hired as a **Junior Data Analyst** at a growing startup called **"NorthLoop"** - a fictional e-commerce company. Your mentor, **Sam**, guides you through progressively challenging data tasks.

The story unfolds through realistic workplace scenarios:
- Slack-style messages from coworkers asking for data
- Email requests from the marketing team
- Urgent asks from the CEO
- Bug investigations with the engineering team

### Why This Works for Beginners
1. **Context matters** - Queries have purpose ("Marketing needs this for the campaign")
2. **Low stakes, real feel** - It's a game, but skills transfer to actual jobs
3. **Project-based learning** - Each module culminates in a practical project
4. **Natural difficulty curve** - Job responsibilities grow as skills grow

---

## Curriculum Structure

### MODULE 1: Foundations
*"Your first week - setting up and exploring data"*

| Lesson | Topic | Skills Learned |
|--------|-------|----------------|
| 1.1 | Creating Tables | CREATE TABLE, data types (INT, VARCHAR, DATE, BOOLEAN) |
| 1.2 | Inserting Data | INSERT INTO, VALUES, inserting multiple rows |
| 1.3 | Basic Queries | SELECT, FROM, WHERE, column selection |
| 1.4 | Sorting & Limiting | ORDER BY, ASC/DESC, LIMIT, OFFSET |
| 1.5 | Aggregating Data | COUNT, SUM, AVG, MIN, MAX, GROUP BY |

**Project: "Design Your Own Database"**
> Sam says: "For your first project, design a simple database for something you care about - a book collection, recipes, workout logs, whatever! Create the table, insert 10+ rows, and write 5 queries to explore it."

Deliverables:
- Design a table with at least 5 columns
- Insert meaningful sample data
- Write queries: list all, filter by condition, sort, count, calculate average

---

### MODULE 2: Intermediate Queries
*"Proving yourself - handling complex data requests"*

| Lesson | Topic | Skills Learned |
|--------|-------|----------------|
| 2.1 | Compound Conditions | AND, OR, NOT, operator precedence, parentheses |
| 2.2 | Pattern Matching | LIKE, ILIKE, wildcards (%, _) |
| 2.3 | Working with Sets | IN, NOT IN, subqueries in WHERE |
| 2.4 | Filtering Groups | HAVING vs WHERE, filtering aggregates |
| 2.5 | Conditional Logic | CASE WHEN, ELSE, nested CASE |
| 2.6 | NULL Handling | IS NULL, IS NOT NULL, COALESCE, NULLIF |

**Project: "Customer Segmentation Report"**
> Marketing needs customer segments for a campaign. Build queries that categorize customers by spending level, identify inactive users, and flag VIPs.

Deliverables:
- Query customers with multiple AND/OR conditions
- Use CASE to create spending tiers (Bronze/Silver/Gold)
- Use HAVING to find customer groups above thresholds
- Handle NULL values in optional fields

---

### MODULE 3: Relational Queries
*"Connecting the dots - working with related data"*

| Lesson | Topic | Skills Learned |
|--------|-------|----------------|
| 3.1 | Understanding Relations | Primary keys, foreign keys, table relationships |
| 3.2 | INNER JOIN | Matching rows between tables |
| 3.3 | LEFT/RIGHT JOIN | Including unmatched rows |
| 3.4 | Multiple JOINs | Chaining 3+ tables together |
| 3.5 | Self JOINs | Joining a table to itself |
| 3.6 | Subqueries Revisited | Correlated subqueries, EXISTS |
| 3.7 | Set Operations | UNION, INTERSECT, EXCEPT |

**Project: "Sales Performance Dashboard"**
> The CEO wants a comprehensive sales report. Build queries that combine customer, order, and product data to answer business questions.

Deliverables:
- Customer orders with product details (multi-table JOIN)
- Customers who never ordered (LEFT JOIN + NULL check)
- Top products by revenue (JOIN + aggregation)
- Compare this month vs last month (self-join or subquery)

---

### MODULE 4: Modifying Databases
*"Taking ownership - managing data integrity"*

| Lesson | Topic | Skills Learned |
|--------|-------|----------------|
| 4.1 | Updating Records | UPDATE, SET, WHERE (critical!), updating multiple columns |
| 4.2 | Deleting Records | DELETE, WHERE, cascading considerations |
| 4.3 | Transactions | BEGIN, COMMIT, ROLLBACK, why they matter |
| 4.4 | Constraints | NOT NULL, UNIQUE, CHECK, DEFAULT |
| 4.5 | Altering Tables | ADD COLUMN, DROP COLUMN, ALTER COLUMN |
| 4.6 | Indexes Basics | CREATE INDEX, when to use them |

**Project: "Database Migration"**
> NorthLoop is updating its data model. Write a migration script that safely updates the schema and transforms existing data.

Deliverables:
- Add new columns to existing tables
- Migrate data from old format to new (UPDATE with CASE)
- Clean up invalid/duplicate records
- Add appropriate constraints
- Wrap it all in a transaction for safety

---

## Lesson Structure (Each Lesson Flow)

Every lesson follows this pattern:

```
┌─────────────────────────────────────────────────────────┐
│  1. CONTEXT (30 seconds)                                │
│     "Sam sends you a Slack message with a task"         │
│     Real-world framing for why this skill matters       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  2. CONCEPT (2-3 minutes)                               │
│     Brief explanation with visual example               │
│     Show the syntax, explain each part                  │
│     "Here's how WHERE works..."                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  3. GUIDED PRACTICE (3-4 minutes)                       │
│     Write your first query with hints enabled           │
│     Immediate feedback on errors                        │
│     "Try selecting customers from California"           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  4. CHALLENGE (3-5 minutes)                             │
│     2-3 increasingly difficult tasks                    │
│     Hints available but cost coins                      │
│     Earn XP and unlock next lesson                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  5. SUMMARY CARD (30 seconds)                           │
│     Save syntax reference to your notebook              │
│     Quick quiz: "Which is correct?" (optional)          │
└─────────────────────────────────────────────────────────┘
```

**Total lesson time: 10-15 minutes**

---

## Sample Lessons in Detail

### Lesson 1.3: Basic Queries

**Context:**
> Sam (Slack): "Hey! Quick task - can you pull a list of all our products? The inventory team needs to do a spot check. Just need product names and prices for now."

**Concept:**
```
SELECT is how you ask the database for data.

SELECT column1, column2    ← What you want
FROM table_name            ← Where to look
WHERE condition;           ← Filter (optional)

Example:
SELECT name, price FROM products;
```

**Guided Practice:**
"Write a query to get all product names and prices"
```sql
SELECT _____, _____ FROM products;
```
[Hint: You need 'name' and 'price']

**Challenges:**
1. Get all columns from the customers table
2. Get only email addresses of customers
3. Get products where price > 50

**Summary Card:**
```
┌────────────────────────────┐
│  SELECT Basics             │
│                            │
│  SELECT *        (all)     │
│  SELECT col      (one)     │
│  SELECT a, b     (some)    │
│  FROM table                │
│                            │
│  [Save to Notebook]        │
└────────────────────────────┘
```

---

### Lesson 2.5: Conditional Logic (CASE)

**Context:**
> Marketing Lead (Email): "We're launching a loyalty program! Can you categorize our customers into tiers based on their total spending? Under $100 = Bronze, $100-500 = Silver, Over $500 = Gold. Need this by EOD!"

**Concept:**
```
CASE lets you create conditional columns:

SELECT name,
  CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE default_result
  END AS new_column
FROM table;
```

**Challenges:**
1. Categorize products as 'Cheap' (<$25), 'Mid' ($25-75), 'Premium' (>$75)
2. Label orders as 'Small', 'Medium', 'Large' by item count
3. Create customer loyalty tiers (the original request)

---

### Lesson 3.2: INNER JOIN

**Context:**
> CEO (Urgent): "I need to see which customers placed orders last month. Names and order totals. Board meeting in 2 hours!"

**Concept:**
```
JOIN connects related tables:

┌──────────────┐      ┌──────────────┐
│  customers   │      │    orders    │
├──────────────┤      ├──────────────┤
│ id ──────────│─────→│ customer_id  │
│ name         │      │ total        │
│ email        │      │ ordered_at   │
└──────────────┘      └──────────────┘

SELECT customers.name, orders.total
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;
```

**Visual Animation:**
Show rows "linking up" when IDs match, unmatched rows fade out.

---

## Project Experience Design

Each module ends with a hands-on project. Here's how they work:

### Project Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. BRIEFING                                            │
│     Realistic project brief (email/doc format)          │
│     Clear requirements and deliverables                 │
│     Example data to work with                           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  2. SANDBOX WORKSPACE                                   │
│     Full database access                                │
│     Schema explorer open                                │
│     Reference notebook available                        │
│     No step-by-step guidance - figure it out!           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  3. CHECKPOINT SUBMISSIONS                              │
│     Submit each deliverable for validation              │
│     Get feedback: "This works!" or "Try again..."       │
│     Partial credit for partial solutions                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  4. COMPLETION & REVIEW                                 │
│     See model solutions (after you finish)              │
│     Compare your approach to alternatives               │
│     Earn project badge + XP bonus                       │
└─────────────────────────────────────────────────────────┘
```

### Project 1: "Design Your Own Database"

**Briefing Screen:**
```
┌─────────────────────────────────────────────────────────┐
│  PROJECT: Design Your Own Database                      │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Congratulations on completing Module 1! Now it's       │
│  time to create something of your own.                  │
│                                                         │
│  Your Task:                                             │
│  Design a database for any topic you're interested in.  │
│  Some ideas:                                            │
│    • Book/movie collection                              │
│    • Recipes you want to try                            │
│    • Workout or fitness log                             │
│    • Game inventory or stats                            │
│    • Personal finance tracker                           │
│                                                         │
│  Requirements:                                          │
│  ☐ Create a table with at least 5 columns              │
│  ☐ Use at least 3 different data types                 │
│  ☐ Insert at least 10 rows of data                     │
│  ☐ Write 5 queries (see checklist)                     │
│                                                         │
│  [Start Project]                                        │
└─────────────────────────────────────────────────────────┘
```

**Query Checklist:**
```
┌─────────────────────────────────────────────────────────┐
│  Query Checklist                        Progress: 2/5   │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ✓ List all rows                                       │
│  ✓ Filter with WHERE                                   │
│  ☐ Sort results with ORDER BY                          │
│  ☐ Count total rows                                    │
│  ☐ Calculate an average                                │
│                                                         │
│  [Submit for Review]                                    │
└─────────────────────────────────────────────────────────┘
```

### Why "Design Your Own" for Project 1?

**Pedagogical reasoning:**
1. **Ownership** - Working with data you care about increases engagement
2. **Creativity** - No single "right answer" reduces anxiety
3. **Reinforcement** - Must use ALL Module 1 skills to complete
4. **Portfolio** - Creates something shareable/reusable

---

## Core Features

### 1. Interactive Query Console
**The heart of the game**

```
┌─────────────────────────────────────┐
│  NorthLoop Database Terminal        │
├─────────────────────────────────────┤
│                                     │
│  SELECT * FROM customers            │
│  WHERE state = 'CA'                 │
│  LIMIT 10;                          │
│                                     │
│  [Run Query]        [Hint] [Reset]  │
├─────────────────────────────────────┤
│  Results: 10 rows                   │
│  ┌─────┬──────────┬───────────┐    │
│  │ id  │ name     │ state     │    │
│  ├─────┼──────────┼───────────┤    │
│  │ 1   │ Alice    │ CA        │    │
│  │ 2   │ Bob      │ CA        │    │
│  └─────┴──────────┴───────────┘    │
└─────────────────────────────────────┘
```

**Mobile-Optimized Input:**
- Smart keyboard with SQL keywords
- Tap-to-insert table/column names from schema sidebar
- Swipe gestures for common operations
- Voice input option for accessibility

### 2. Schema Explorer
Visual representation of the database

```
┌─────────────────────────────────────┐
│  Database: northloop_prod           │
├─────────────────────────────────────┤
│                                     │
│  📁 customers (42,000 rows)         │
│     ├── id (PK)                     │
│     ├── name                        │
│     ├── email                       │
│     ├── state                       │
│     └── created_at                  │
│                                     │
│  📁 orders (128,000 rows)           │
│     ├── id (PK)                     │
│     ├── customer_id (FK→customers)  │
│     ├── total                       │
│     └── ordered_at                  │
│                                     │
│  📁 products                        │
│  📁 order_items                     │
│  📁 reviews                         │
└─────────────────────────────────────┘
```

**Features:**
- Tap table to see sample data
- Visual foreign key relationships
- Search across schema
- "Favorite" frequently used tables

### 3. Challenge System

**Challenge Types:**

| Type | Description | Example |
|------|-------------|---------|
| **Exact Match** | Write query that returns specific result | "Get all orders over $100" |
| **Fix the Bug** | Debug a broken query | "This query returns wrong count" |
| **Optimize** | Improve a slow query | "This takes 30s, make it faster" |
| **Freestyle** | Multiple valid solutions | "Find our best customers" |
| **Speed Run** | Time-limited challenges | "5 queries in 3 minutes" |

**Difficulty Indicators:**
- Coins reward (more = harder)
- Estimated time
- Skills required badges

### 4. Hint System (3-Tier)
Progressive hints that teach, not just give answers

```
┌─────────────────────────────────────┐
│  💡 Hints Available (3/3)           │
├─────────────────────────────────────┤
│                                     │
│  [Hint 1: Concept] -10 coins        │
│  "You'll need to combine data       │
│   from two tables for this one"     │
│                                     │
│  [Hint 2: Syntax] -25 coins         │
│  "Use JOIN...ON to connect tables   │
│   by their related columns"         │
│                                     │
│  [Hint 3: Solution] -50 coins       │
│  "SELECT * FROM orders              │
│   JOIN customers ON..."             │
│                                     │
└─────────────────────────────────────┘
```

### 5. Progress & Motivation

**XP System:**
- Earn XP for completing challenges
- Bonus XP for: no hints, fast completion, elegant solutions
- Level up unlocks new story chapters

**Skill Tree:**
```
                    [SQL Master]
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    [Query Expert]  [Data Analyst]  [PG Specialist]
          │              │              │
     ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
  [JOINs]  [Agg]  [CTEs] [Window] [JSON] [FTS]
     │       │       │       │       │      │
  [SELECT] [WHERE] [ORDER] [LIMIT] [GROUP] [HAVING]
```

**Streak System:**
- Daily challenge for maintaining streaks
- 7-day streak = bonus rewards
- Gentle reminders, not punishing

**Achievements:**
- "First Query" - Run your first SELECT
- "Join the Party" - Master all JOIN types
- "Null Hunter" - Correctly handle 10 NULL scenarios
- "Speed Demon" - Complete 5 challenges under par time
- "Mentor" - Help in community forums

### 6. Reference & Learning

**In-Game Documentation:**
- Searchable SQL reference
- Saved "snippets" from completed challenges
- Comparison tables (INNER vs LEFT vs OUTER)
- Common patterns library

**"Explain Like I'm 5" Mode:**
- Toggle that adds extra context
- Visualizes what query does step-by-step
- Shows data flow through JOINs

### 7. Practice Modes

**Story Mode** (Main progression)
- Narrative-driven challenges
- Unlocks sequentially
- Best for learning new concepts

**Sandbox Mode**
- Free exploration of database
- No objectives, just practice
- Test queries before challenges

**Daily Challenge**
- New challenge every day
- Leaderboard competition
- Maintains engagement

**Topic Drills**
- Focused practice on weak areas
- "50 JOIN challenges"
- Spaced repetition algorithm

---

## Database Design (The Fictional Company)

### NorthLoop E-Commerce Schema

**Core Tables:**
```sql
customers       -- id, name, email, state, created_at
products        -- id, name, category, price, stock_quantity
orders          -- id, customer_id, status, total, ordered_at
order_items     -- id, order_id, product_id, quantity, price
reviews         -- id, customer_id, product_id, rating, comment
employees       -- id, name, department, manager_id, hired_at
```

**Why This Schema:**
- Realistic e-commerce model
- Natural JOIN opportunities (customers ↔ orders ↔ products)
- Self-referential table (employees.manager_id)
- Aggregation scenarios (totals, averages, counts)
- NULL scenarios (some orders have no reviews)
- Date/time queries (trends, cohorts)

### Sample Challenges by Module

**Module 1 Example:**
> "Sam asks: Hey! Can you pull a list of all customers from Texas? The marketing team wants to send them a regional promotion."

```sql
-- Expected solution
SELECT name, email
FROM customers
WHERE state = 'TX';
```

**Module 3 Example:**
> "URGENT from CEO: Our reported revenue doesn't match finance's numbers. Can you find orders where the total doesn't equal the sum of order items?"

```sql
-- Expected solution
SELECT o.id, o.total as reported,
       SUM(oi.quantity * oi.price) as calculated
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.total
HAVING o.total != SUM(oi.quantity * oi.price);
```

---

## Mobile UX Considerations

### Touch-Friendly Query Input

**Option A: Hybrid Keyboard**
```
┌─────────────────────────────────────┐
│ [SELECT] [FROM] [WHERE] [JOIN]      │
│ [AND] [OR] [ORDER BY] [GROUP BY]    │
├─────────────────────────────────────┤
│ [Q][W][E][R][T][Y][U][I][O][P]      │
│ [A][S][D][F][G][H][J][K][L][;]      │
│ [⇧][Z][X][C][V][B][N][M][⌫]        │
│ [123] [tables] [  space  ] [Run]    │
└─────────────────────────────────────┘
```

**Option B: Block Builder (for very beginners)**
```
┌─────────────────────────────────────┐
│  Drag blocks to build your query:   │
├─────────────────────────────────────┤
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ SELECT │→│  name  │→│  FROM  │  │
│  └────────┘ └────────┘ └────────┘  │
│                  ↓                  │
│            ┌──────────┐            │
│            │customers │            │
│            └──────────┘            │
│                                     │
│  Generated: SELECT name FROM cust..│
└─────────────────────────────────────┘
```

### Session Design for Mobile

**Micro-sessions (3-5 min):**
- Single challenge focus
- Quick daily challenge
- Review flashcards

**Standard sessions (10-15 min):**
- 3-4 related challenges
- One story beat
- Concept + practice

**Deep sessions (30+ min):**
- Full chapter completion
- Sandbox exploration
- Topic drill marathon

### Offline Capability
- Download chapters for offline play
- Sync progress when back online
- Local SQLite for query execution

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

- **Color contrast:** 4.5:1 minimum for all text
- **Touch targets:** 44x44px minimum
- **Screen reader:** Full VoiceOver/TalkBack support
- **Keyboard nav:** Complete keyboard accessibility
- **Reduced motion:** Option to disable animations
- **Text scaling:** Supports system font size settings

### Cognitive Accessibility

- Clear, simple language
- Consistent UI patterns
- Undo/redo for queries
- No time pressure (except optional speed modes)
- Save progress automatically

---

## Engagement Hooks

### Why Players Come Back

1. **Story curiosity** - "What happens next at NorthLoop?"
2. **Skill progression** - Visible improvement in abilities
3. **Streak maintenance** - Don't break the chain
4. **Leaderboards** - Compete with friends
5. **Real-world application** - "I can use this at work"

### Anti-Frustration Features

- Unlimited attempts on challenges
- Skip option (with XP penalty, unlock later)
- "Phone a friend" - Community hints
- Review mode for failed challenges
- Encouraging failure messages ("Great attempt! Here's what to try...")

---

## Summary

**Core Loop:**
1. Receive workplace request (story context)
2. Explore schema to understand data
3. Write and test query
4. Get feedback and rewards
5. Progress to next challenge

**Key Differentiators:**
- Realistic professional narrative (not gamified fluff)
- Mobile-first with smart input methods
- Progressive complexity matched to real job growth
- Project-based learning at end of each module

**Success Metrics:**
- Completion rate per module
- Time to first successful JOIN
- Project completion rate
- Query accuracy improvement over time
