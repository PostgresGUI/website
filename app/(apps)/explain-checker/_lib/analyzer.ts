export type FindingSeverity = "critical" | "warning" | "info";

export type PlanFinding = {
  id: string;
  severity: FindingSeverity;
  title: string;
  location: string;
  detail: string;
  tip: string;
};

export type PlanSummary = {
  executionMs: number | null;
  planningMs: number | null;
  totalCost: number | null;
  planRows: number | null;
  nodeCount: number;
};

export type AnalyzeResult = {
  findings: PlanFinding[];
  summary: PlanSummary;
};

type PlanNode = Record<string, unknown> & {
  Plans?: PlanNode[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function getRootPlan(parsed: unknown): Record<string, unknown> {
  if (Array.isArray(parsed) && isRecord(parsed[0])) {
    return parsed[0];
  }

  if (isRecord(parsed)) {
    return parsed;
  }

  throw new Error("Use EXPLAIN JSON output.");
}

function nodeLabel(node: PlanNode): string {
  const type = asString(node["Node Type"]) ?? "Plan";
  const relation = asString(node["Relation Name"]);
  const alias = asString(node.Alias);

  if (relation && alias && relation !== alias) {
    return `${type} on ${relation} ${alias}`;
  }

  if (relation) {
    return `${type} on ${relation}`;
  }

  return type;
}

function walkPlan(node: PlanNode, visit: (node: PlanNode) => void): number {
  visit(node);

  const children = Array.isArray(node.Plans) ? node.Plans : [];
  return 1 + children.reduce((count, child) => count + walkPlan(child, visit), 0);
}

function severityRank(severity: FindingSeverity): number {
  if (severity === "critical") return 0;
  if (severity === "warning") return 1;
  return 2;
}

function finding(
  id: string,
  severity: FindingSeverity,
  node: PlanNode,
  title: string,
  detail: string,
  tip: string,
): PlanFinding {
  return {
    id,
    severity,
    title,
    location: nodeLabel(node),
    detail,
    tip,
  };
}

export function parseExplainJson(input: string): unknown {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Paste EXPLAIN JSON.");
  }

  return JSON.parse(trimmed);
}

export function analyzeExplainPlan(parsed: unknown): AnalyzeResult {
  const root = getRootPlan(parsed);
  const plan = root.Plan;

  if (!isRecord(plan)) {
    throw new Error("Missing Plan object.");
  }

  const findings: PlanFinding[] = [];
  const seen = new Set<string>();

  const push = (item: PlanFinding) => {
    const key = `${item.id}:${item.location}:${item.detail}`;
    if (!seen.has(key)) {
      seen.add(key);
      findings.push(item);
    }
  };

  const nodeCount = walkPlan(plan as PlanNode, (node) => {
    const nodeType = asString(node["Node Type"]) ?? "";
    const actualRows = asNumber(node["Actual Rows"]);
    const planRows = asNumber(node["Plan Rows"]);
    const loops = asNumber(node["Actual Loops"]) ?? 1;
    const removed = asNumber(node["Rows Removed by Filter"]);
    const sortMethod = asString(node["Sort Method"]);
    const sortSpaceType = asString(node["Sort Space Type"]);
    const hashBatches = asNumber(node["Hash Batches"]);
    const tempRead = asNumber(node["Temp Read Blocks"]) ?? 0;
    const tempWritten = asNumber(node["Temp Written Blocks"]) ?? 0;
    const sharedRead = asNumber(node["Shared Read Blocks"]) ?? 0;

    if (actualRows !== null && planRows !== null && planRows > 0) {
      const ratio = Math.max(actualRows / planRows, planRows / Math.max(actualRows, 1));

      if (ratio >= 100) {
        push(
          finding(
            "row-estimate",
            "critical",
            node,
            "Bad estimate",
            `${Math.round(ratio)}x row mismatch`,
            "Run ANALYZE, check statistics, or review predicates.",
          ),
        );
      } else if (ratio >= 10) {
        push(
          finding(
            "row-estimate",
            "warning",
            node,
            "Row estimate",
            `${Math.round(ratio)}x row mismatch`,
            "Better stats can change the chosen plan.",
          ),
        );
      }
    }

    if (nodeType === "Seq Scan" && actualRows !== null && actualRows * loops >= 1000) {
      push(
        finding(
          "seq-scan",
          "warning",
          node,
          "Seq scan",
          `${Math.round(actualRows * loops).toLocaleString()} rows read`,
          "Check whether a selective WHERE or JOIN column needs an index.",
        ),
      );
    }

    if (removed !== null && removed * loops >= 1000) {
      push(
        finding(
          "rows-removed",
          "warning",
          node,
          "Filter waste",
          `${Math.round(removed * loops).toLocaleString()} rows removed`,
          "Move filtering earlier or add an index that matches the predicate.",
        ),
      );
    }

    if (
      sortMethod &&
      (sortMethod.toLowerCase().includes("external") || sortSpaceType === "Disk")
    ) {
      push(
        finding(
          "disk-sort",
          "critical",
          node,
          "Disk sort",
          sortMethod,
          "Consider an ORDER BY index or more work_mem for this query.",
        ),
      );
    }

    if (hashBatches !== null && hashBatches > 1) {
      push(
        finding(
          "hash-batches",
          "warning",
          node,
          "Hash spill",
          `${hashBatches} batches`,
          "Hash work exceeded memory; review join size or work_mem.",
        ),
      );
    }

    if (tempRead + tempWritten > 0) {
      push(
        finding(
          "temp-io",
          "warning",
          node,
          "Temp I/O",
          `${Math.round(tempRead + tempWritten).toLocaleString()} blocks`,
          "Sorts, hashes, or materialized steps may be spilling to disk.",
        ),
      );
    }

    if (sharedRead >= 10000) {
      push(
        finding(
          "shared-read",
          "info",
          node,
          "Heavy reads",
          `${Math.round(sharedRead).toLocaleString()} shared read blocks`,
          "Large reads may be normal; compare against cache and table size.",
        ),
      );
    }
  });

  findings.sort((a, b) => severityRank(a.severity) - severityRank(b.severity));

  if (findings.length === 0) {
    findings.push({
      id: "clean",
      severity: "info",
      title: "Looks clean",
      location: "Plan",
      detail: "No obvious rule hits",
      tip: "Still compare runtime with production data and indexes.",
    });
  }

  return {
    findings,
    summary: {
      executionMs: asNumber(root["Execution Time"]),
      planningMs: asNumber(root["Planning Time"]),
      totalCost: asNumber(plan["Total Cost"]),
      planRows: asNumber(plan["Plan Rows"]),
      nodeCount,
    },
  };
}

export function analyzeExplainJson(input: string): AnalyzeResult {
  return analyzeExplainPlan(parseExplainJson(input));
}

function formatSample(plan: Record<string, unknown>) {
  return JSON.stringify([plan], null, 2);
}

export const explainSamples = [
  {
    id: "healthy-index",
    label: "Healthy index scan",
    json: formatSample({
      Plan: {
        "Node Type": "Index Scan",
        "Relation Name": "users",
        Alias: "users",
        "Startup Cost": 0.28,
        "Total Cost": 8.3,
        "Plan Rows": 12,
        "Plan Width": 64,
        "Actual Startup Time": 0.019,
        "Actual Total Time": 0.081,
        "Actual Rows": 12,
        "Actual Loops": 1,
        "Index Name": "users_email_idx",
        "Index Cond": "(email = 'sam@example.com'::text)",
      },
      "Planning Time": 0.46,
      "Execution Time": 0.12,
    }),
  },
  {
    id: "missing-index",
    label: "Missing index",
    json: formatSample({
      Plan: {
        "Node Type": "Seq Scan",
        "Relation Name": "events",
        Alias: "events",
        "Startup Cost": 0,
        "Total Cost": 4211.38,
        "Plan Rows": 520,
        "Plan Width": 72,
        "Actual Startup Time": 0.041,
        "Actual Total Time": 128.62,
        "Actual Rows": 430,
        "Actual Loops": 1,
        Filter: "(account_id = 42)",
        "Rows Removed by Filter": 249570,
      },
      "Planning Time": 0.82,
      "Execution Time": 129.04,
    }),
  },
  {
    id: "bad-estimate",
    label: "Bad row estimate",
    json: formatSample({
      Plan: {
        "Node Type": "Nested Loop",
        "Startup Cost": 1.12,
        "Total Cost": 911.84,
        "Plan Rows": 8,
        "Plan Width": 96,
        "Actual Startup Time": 0.11,
        "Actual Total Time": 84.71,
        "Actual Rows": 14800,
        "Actual Loops": 1,
        Plans: [
          {
            "Node Type": "Index Scan",
            "Relation Name": "customers",
            Alias: "customers",
            "Startup Cost": 0.42,
            "Total Cost": 12.88,
            "Plan Rows": 3,
            "Plan Width": 40,
            "Actual Startup Time": 0.025,
            "Actual Total Time": 2.21,
            "Actual Rows": 740,
            "Actual Loops": 1,
            "Index Name": "customers_region_idx",
            "Index Cond": "(region = 'west'::text)",
          },
          {
            "Node Type": "Index Scan",
            "Relation Name": "orders",
            Alias: "orders",
            "Startup Cost": 0.7,
            "Total Cost": 299.64,
            "Plan Rows": 2,
            "Plan Width": 56,
            "Actual Startup Time": 0.006,
            "Actual Total Time": 0.102,
            "Actual Rows": 20,
            "Actual Loops": 740,
            "Index Name": "orders_customer_id_idx",
            "Index Cond": "(customer_id = customers.id)",
          },
        ],
      },
      "Planning Time": 1.2,
      "Execution Time": 85.03,
    }),
  },
  {
    id: "disk-spill",
    label: "Disk sort spill",
    json: formatSample({
      Plan: {
        "Node Type": "Sort",
        "Startup Cost": 2044.32,
        "Total Cost": 2044.57,
        "Plan Rows": 100,
        "Plan Width": 48,
        "Actual Startup Time": 91.613,
        "Actual Total Time": 93.402,
        "Actual Rows": 25000,
        "Actual Loops": 1,
        "Sort Key": ["orders.created_at DESC"],
        "Sort Method": "external merge",
        "Sort Space Type": "Disk",
        "Temp Read Blocks": 840,
        "Temp Written Blocks": 924,
        Plans: [
          {
            "Node Type": "Seq Scan",
            "Relation Name": "orders",
            Alias: "orders",
            "Startup Cost": 0,
            "Total Cost": 1805.0,
            "Plan Rows": 100,
            "Plan Width": 48,
            "Actual Startup Time": 0.021,
            "Actual Total Time": 62.4,
            "Actual Rows": 25000,
            "Actual Loops": 1,
            Filter: "(status = 'paid'::text)",
            "Rows Removed by Filter": 175000,
          },
        ],
      },
      "Planning Time": 1.841,
      "Execution Time": 95.223,
    }),
  },
] as const;

export const sampleExplainJson = explainSamples[3].json;
