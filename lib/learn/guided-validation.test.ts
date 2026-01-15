import { describe, it, expect } from 'vitest';
import { validateGuidedQuery } from './guided-validation';

describe('validateGuidedQuery', () => {
  const expectedQuery = "SELECT 'Hello, PostgreSQL!';";

  describe('accepts valid queries', () => {
    it("accepts SELECT 'hello'", () => {
      const result = validateGuidedQuery("SELECT 'hello'", expectedQuery);
      expect(result.isValid).toBe(true);
      expect(result.hasExpectedKeyword).toBe(true);
      expect(result.hasValidContent).toBe(true);
    });

    it("accepts SELECT 'Hello, PostgreSQL!'", () => {
      const result = validateGuidedQuery("SELECT 'Hello, PostgreSQL!'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it("accepts SELECT 'any message'", () => {
      const result = validateGuidedQuery("SELECT 'any message'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts lowercase select', () => {
      const result = validateGuidedQuery("select 'hello'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts mixed case SeLeCt', () => {
      const result = validateGuidedQuery("SeLeCt 'hello'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts with semicolon', () => {
      const result = validateGuidedQuery("SELECT 'hello';", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts with extra whitespace', () => {
      const result = validateGuidedQuery("SELECT   'hello'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts with leading whitespace', () => {
      const result = validateGuidedQuery("  SELECT 'hello'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts with trailing whitespace', () => {
      const result = validateGuidedQuery("SELECT 'hello'  ", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts numbers', () => {
      const result = validateGuidedQuery('SELECT 42', expectedQuery);
      expect(result.isValid).toBe(true);
      expect(result.hasValidContent).toBe(true);
    });

    it('accepts math expressions', () => {
      const result = validateGuidedQuery('SELECT 10 + 5', expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts subtraction', () => {
      const result = validateGuidedQuery('SELECT 10 - 5', expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts multiplication', () => {
      const result = validateGuidedQuery('SELECT 10 * 5', expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts division', () => {
      const result = validateGuidedQuery('SELECT 10 / 5', expectedQuery);
      expect(result.isValid).toBe(true);
    });
  });

  describe('rejects invalid queries - missing keyword', () => {
    it("rejects INSERT instead of SELECT", () => {
      const result = validateGuidedQuery("INSERT 'hello'", expectedQuery);
      expect(result.isValid).toBe(false);
      expect(result.hasExpectedKeyword).toBe(false);
    });

    it("rejects just a string literal", () => {
      const result = validateGuidedQuery("'hello'", expectedQuery);
      expect(result.isValid).toBe(false);
      expect(result.hasExpectedKeyword).toBe(false);
    });

    it('rejects just a number', () => {
      const result = validateGuidedQuery('42', expectedQuery);
      expect(result.isValid).toBe(false);
      expect(result.hasExpectedKeyword).toBe(false);
    });
  });

  describe('rejects invalid queries - missing content', () => {
    it('rejects empty string literal', () => {
      const result = validateGuidedQuery("SELECT ''", expectedQuery);
      expect(result.isValid).toBe(false);
      expect(result.hasExpectedKeyword).toBe(true);
      expect(result.hasValidContent).toBe(false);
    });

    it('rejects just SELECT', () => {
      const result = validateGuidedQuery('SELECT', expectedQuery);
      expect(result.isValid).toBe(false);
      expect(result.hasExpectedKeyword).toBe(true);
      expect(result.hasValidContent).toBe(false);
    });

    it('rejects SELECT with only whitespace', () => {
      const result = validateGuidedQuery('SELECT   ', expectedQuery);
      expect(result.isValid).toBe(false);
      expect(result.hasValidContent).toBe(false);
    });

    it('rejects empty query', () => {
      const result = validateGuidedQuery('', expectedQuery);
      expect(result.isValid).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('accepts string with spaces', () => {
      const result = validateGuidedQuery("SELECT 'hello world'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts string with special characters', () => {
      const result = validateGuidedQuery("SELECT 'hello!'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts string with numbers', () => {
      const result = validateGuidedQuery("SELECT 'test123'", expectedQuery);
      expect(result.isValid).toBe(true);
    });

    it('accepts complex math', () => {
      const result = validateGuidedQuery('SELECT 1 + 2 + 3', expectedQuery);
      expect(result.isValid).toBe(true);
    });
  });
});
