"use client";

const sqlQueries = [
  "SELECT * FROM users WHERE active = true;",
  "CREATE TABLE connections (id SERIAL PRIMARY KEY);",
  "UPDATE projects SET status = 'complete';",
  "INSERT INTO logs (message) VALUES ('Connected');",
  "DELETE FROM cache WHERE expired = true;",
  "ALTER TABLE sessions ADD COLUMN last_active TIMESTAMP;",
  "SELECT COUNT(*) FROM queries GROUP BY database;",
  "BEGIN TRANSACTION;",
  "CREATE INDEX idx_user_email ON users(email);",
  "EXPLAIN ANALYZE SELECT * FROM metrics;",
];

// Left side: 6 queries (indices 0-5)
const leftQueries = [
  { query: sqlQueries[0], top: "15%", left: "2rem", delay: "0.5s" },
  { query: sqlQueries[1], top: "30%", left: "4rem", delay: "1.2s" },
  { query: sqlQueries[2], top: "45%", left: "2.5rem", delay: "2s" },
  { query: sqlQueries[3], top: "60%", left: "5rem", delay: "0.8s" },
  { query: sqlQueries[4], top: "75%", left: "3rem", delay: "1.6s" },
  { query: sqlQueries[5], top: "88%", left: "4.5rem", delay: "2.4s" },
];

// Right side: 4 queries (indices 6-9)
const rightQueries = [
  { query: sqlQueries[6], top: "20%", right: "3rem", delay: "1s" },
  { query: sqlQueries[7], top: "42%", right: "5rem", delay: "1.8s" },
  { query: sqlQueries[8], top: "65%", right: "2.5rem", delay: "0.3s" },
  { query: sqlQueries[9], top: "82%", right: "4rem", delay: "2.2s" },
];

export function FloatingSQLQueries() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left side queries */}
      <div className="sql-queries-left">
        {leftQueries.map((item, i) => (
          <div
            key={`left-${i}`}
            className="sql-query-typewriter"
            style={{
              top: item.top,
              left: item.left,
              animationDelay: item.delay,
            }}
          >
            <span className="font-mono text-xs md:text-sm opacity-[0.25] dark:opacity-[0.35] text-[var(--postgres-blue)]">
              {item.query}
            </span>
          </div>
        ))}
      </div>

      {/* Right side queries */}
      <div className="sql-queries-right">
        {rightQueries.map((item, i) => (
          <div
            key={`right-${i}`}
            className="sql-query-typewriter"
            style={{
              top: item.top,
              right: item.right,
              animationDelay: item.delay,
            }}
          >
            <span className="font-mono text-xs md:text-sm opacity-[0.25] dark:opacity-[0.35] text-[var(--postgres-blue)]">
              {item.query}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .sql-queries-left,
        .sql-queries-right {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .sql-query-typewriter {
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
        }

        .sql-query-typewriter span {
          display: inline-block;
          border-right: 2px solid var(--postgres-blue);
          padding-right: 2px;
          animation:
            typewriter 2s steps(50) forwards,
            blink 0.75s step-end infinite;
          animation-delay: inherit;
          width: 0;
          overflow: hidden;
        }

        /* Typewriter effect: reveals text character by character */
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        /* Cursor blink effect */
        @keyframes blink {
          0%, 100% {
            border-color: var(--postgres-blue);
          }
          50% {
            border-color: transparent;
          }
        }

        /* Stop blinking after typewriter completes */
        .sql-query-typewriter span {
          animation:
            typewriter 2s steps(50) forwards,
            blink 0.75s step-end 2s,
            removeCursor 0.01s 4s forwards;
        }

        @keyframes removeCursor {
          to {
            border-right-color: transparent;
          }
        }

        /* Responsive behavior */
        @media (max-width: 768px) {
          .sql-queries-left,
          .sql-queries-right {
            display: none;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .sql-query-typewriter span {
            opacity: 0.15;
          }

          .sql-queries-left .sql-query-typewriter:nth-child(n+4),
          .sql-queries-right .sql-query-typewriter:nth-child(n+3) {
            display: none;
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .sql-query-typewriter {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
