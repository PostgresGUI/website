/**
 * Validation utilities for the guided practice phase
 */

export interface GuidedValidationResult {
  isValid: boolean;
  hasExpectedKeyword: boolean;
  hasValidContent: boolean;
}

/**
 * Validates a query against the expected query pattern for guided practice.
 * Checks that the query:
 * 1. Contains the expected keyword (e.g., SELECT)
 * 2. Has valid content (non-empty string literal, number, or expression)
 */
export function validateGuidedQuery(
  query: string,
  expectedQuery: string
): GuidedValidationResult {
  const normalized = query.toLowerCase().replace(/\s+/g, " ").trim();
  const expected = expectedQuery.toLowerCase().replace(/\s+/g, " ").trim();

  // Check that the query contains the expected keyword (e.g., SELECT)
  const expectedKeyword = expected.split(" ")[0];
  const hasExpectedKeyword = normalized.includes(expectedKeyword);

  // Check that the query has content (non-empty string literal, number, or expression)
  // Match string literals with content: 'something' but not ''
  const hasStringWithContent = /'[^']+'/i.test(query);
  // Match numbers or math expressions (must contain at least one digit)
  const hasNumberOrExpression = /select\s+\d[\d+\-*/\s]*/i.test(query);

  const hasValidContent = hasStringWithContent || hasNumberOrExpression;

  return {
    isValid: hasExpectedKeyword && hasValidContent,
    hasExpectedKeyword,
    hasValidContent,
  };
}
