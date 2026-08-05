import { describe, expect, it } from "vitest";
import { generateMigrationDiff, migrationSamples } from "./diff";

describe("generateMigrationDiff", () => {
  it("generates alter statements and warnings", () => {
    const result = generateMigrationDiff(
      migrationSamples.before,
      migrationSamples.after,
    );

    expect(result.sql).toContain("CREATE TABLE tags");
    expect(result.sql).toContain("ALTER TABLE users ADD COLUMN display_name");
    expect(result.sql).toContain("ALTER TABLE users DROP COLUMN name");
    expect(result.sql).toContain("ALTER TABLE posts ALTER COLUMN title TYPE varchar(180)");
    expect(result.sql).toContain("ALTER TABLE posts DROP COLUMN published_at");
    expect(result.warnings.some((warning) => warning.title === "Drops column")).toBe(
      true,
    );
    expect(result.summary.tablesAdded).toBe(1);
  });

  it("returns a no-op migration for unchanged schemas", () => {
    const result = generateMigrationDiff(
      migrationSamples.before,
      migrationSamples.before,
    );

    expect(result.sql).toBe("-- No schema changes detected.");
    expect(result.summary.changes).toBe(0);
  });
});
