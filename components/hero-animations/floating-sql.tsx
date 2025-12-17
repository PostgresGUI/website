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

export function FloatingSQLQueries() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Multiple layers of floating SQL queries */}
      <div className="floating-sql-layer-1">
        {sqlQueries.slice(0, 3).map((query, i) => (
          <div
            key={`layer1-${i}`}
            className="floating-sql-query"
            style={{
              top: `${i * 30 + 10}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <span className="font-mono text-xs md:text-sm opacity-[0.25] dark:opacity-[0.35] text-[var(--postgres-blue)]">
              {query}
            </span>
          </div>
        ))}
      </div>

      <div className="floating-sql-layer-2">
        {sqlQueries.slice(3, 6).map((query, i) => (
          <div
            key={`layer2-${i}`}
            className="floating-sql-query"
            style={{
              top: `${i * 30 + 20}%`,
              animationDelay: `${i * 2.5}s`,
            }}
          >
            <span className="font-mono text-xs md:text-sm opacity-[0.25] dark:opacity-[0.35] text-[var(--postgres-blue)]">
              {query}
            </span>
          </div>
        ))}
      </div>

      <div className="floating-sql-layer-3">
        {sqlQueries.slice(6).map((query, i) => (
          <div
            key={`layer3-${i}`}
            className="floating-sql-query"
            style={{
              top: `${i * 30 + 15}%`,
              animationDelay: `${i * 3}s`,
            }}
          >
            <span className="font-mono text-xs md:text-sm opacity-[0.25] dark:opacity-[0.35] text-[var(--postgres-blue)]">
              {query}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .floating-sql-layer-1,
        .floating-sql-layer-2,
        .floating-sql-layer-3 {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-sql-query {
          position: absolute;
          white-space: nowrap;
          animation: floatAcross 25s linear infinite;
        }

        .floating-sql-layer-2 .floating-sql-query {
          animation: floatAcross 30s linear infinite reverse;
        }

        .floating-sql-layer-3 .floating-sql-query {
          animation: floatAcross 35s linear infinite;
        }

        @keyframes floatAcross {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
