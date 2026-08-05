import { describe, expect, it } from "vitest";
import { analyzeExplainJson, sampleExplainJson } from "./analyzer";

describe("analyzeExplainJson", () => {
  it("flags obvious plan problems", () => {
    const result = analyzeExplainJson(sampleExplainJson);

    expect(result.summary.nodeCount).toBe(2);
    expect(result.findings.map((finding) => finding.id)).toEqual(
      expect.arrayContaining([
        "disk-sort",
        "row-estimate",
        "seq-scan",
        "rows-removed",
      ]),
    );
  });

  it("returns a clean finding when no checks fire", () => {
    const result = analyzeExplainJson(
      JSON.stringify([
        {
          Plan: {
            "Node Type": "Index Scan",
            "Relation Name": "users",
            "Plan Rows": 10,
            "Actual Rows": 10,
            "Actual Loops": 1,
          },
          "Execution Time": 2.1,
          "Planning Time": 0.3,
        },
      ]),
    );

    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].id).toBe("clean");
  });
});
