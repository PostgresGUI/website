import { describe, it, expect } from 'vitest';
import { lesson1_0 } from './lesson-1-0';
import { QueryResult } from '../types';

// Mock result - validations no longer use this, but the function signature requires it
const mockResult: QueryResult = { success: true, columns: [], rows: [], rowCount: 0 };

// Helper to get validate function by challenge index
const getValidator = (index: number) => lesson1_0.phases.challenges[index].validate;

describe('lesson-1-0: Introduction to SQL', () => {
  describe('Challenge 1: Your First Query (SELECT 42)', () => {
    const validate = getValidator(0);

    describe('accepts valid queries', () => {
      it('accepts SELECT 42', () => {
        const result = validate(mockResult, 'SELECT 42');
        expect(result.correct).toBe(true);
      });

      it('accepts SELECT 42;', () => {
        const result = validate(mockResult, 'SELECT 42;');
        expect(result.correct).toBe(true);
      });

      it('accepts lowercase select 42', () => {
        const result = validate(mockResult, 'select 42');
        expect(result.correct).toBe(true);
      });

      it('accepts mixed case SeLeCt 42', () => {
        const result = validate(mockResult, 'SeLeCt 42');
        expect(result.correct).toBe(true);
      });

      it('accepts extra whitespace SELECT  42', () => {
        const result = validate(mockResult, 'SELECT  42');
        expect(result.correct).toBe(true);
      });

      it('accepts leading whitespace', () => {
        const result = validate(mockResult, '  SELECT 42');
        expect(result.correct).toBe(true);
      });

      it('accepts trailing whitespace', () => {
        const result = validate(mockResult, 'SELECT 42  ');
        expect(result.correct).toBe(true);
      });

      it('accepts tabs and newlines', () => {
        const result = validate(mockResult, 'SELECT\t42');
        expect(result.correct).toBe(true);
      });
    });

    describe('rejects invalid queries', () => {
      it('rejects wrong number SELECT 43', () => {
        const result = validate(mockResult, 'SELECT 43');
        expect(result.correct).toBe(false);
      });

      it('rejects string instead of number SELECT "42"', () => {
        const result = validate(mockResult, "SELECT '42'");
        expect(result.correct).toBe(false);
      });

      it('rejects INSERT statement', () => {
        const result = validate(mockResult, 'INSERT 42');
        expect(result.correct).toBe(false);
      });

      it('rejects empty query', () => {
        const result = validate(mockResult, '');
        expect(result.correct).toBe(false);
      });

      it('rejects just a number', () => {
        const result = validate(mockResult, '42');
        expect(result.correct).toBe(false);
      });

      it('rejects 42 before SELECT', () => {
        const result = validate(mockResult, '42 SELECT');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT with text after 42', () => {
        const result = validate(mockResult, 'SELECT 42 extra');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT 420 (contains 42 but wrong number)', () => {
        const result = validate(mockResult, 'SELECT 420');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT 142 (contains 42 but wrong number)', () => {
        const result = validate(mockResult, 'SELECT 142');
        expect(result.correct).toBe(false);
      });
    });
  });

  describe('Challenge 2: Display Text (SELECT PostgresGUI)', () => {
    const validate = getValidator(1);

    describe('accepts valid queries', () => {
      it("accepts SELECT 'PostgresGUI'", () => {
        const result = validate(mockResult, "SELECT 'PostgresGUI'");
        expect(result.correct).toBe(true);
      });

      it("accepts SELECT 'PostgresGUI';", () => {
        const result = validate(mockResult, "SELECT 'PostgresGUI';");
        expect(result.correct).toBe(true);
      });

      it("accepts lowercase select 'postgresgui'", () => {
        const result = validate(mockResult, "select 'postgresgui'");
        expect(result.correct).toBe(true);
      });

      it("accepts mixed case in value SELECT 'POSTGRESGUI'", () => {
        const result = validate(mockResult, "SELECT 'POSTGRESGUI'");
        expect(result.correct).toBe(true);
      });

      it('accepts extra whitespace', () => {
        const result = validate(mockResult, "SELECT  'PostgresGUI'");
        expect(result.correct).toBe(true);
      });

      it('accepts leading/trailing whitespace', () => {
        const result = validate(mockResult, "  SELECT 'PostgresGUI'  ");
        expect(result.correct).toBe(true);
      });
    });

    describe('rejects invalid queries', () => {
      it('rejects without quotes SELECT PostgresGUI', () => {
        const result = validate(mockResult, 'SELECT PostgresGUI');
        expect(result.correct).toBe(false);
      });

      it('rejects double quotes SELECT "PostgresGUI"', () => {
        const result = validate(mockResult, 'SELECT "PostgresGUI"');
        expect(result.correct).toBe(false);
      });

      it('rejects wrong company name', () => {
        const result = validate(mockResult, "SELECT 'Postgres'");
        expect(result.correct).toBe(false);
      });

      it('rejects INSERT statement', () => {
        const result = validate(mockResult, "INSERT 'PostgresGUI'");
        expect(result.correct).toBe(false);
      });

      it('rejects empty query', () => {
        const result = validate(mockResult, '');
        expect(result.correct).toBe(false);
      });

      it('rejects just SELECT', () => {
        const result = validate(mockResult, 'SELECT');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT with number', () => {
        const result = validate(mockResult, 'SELECT 42');
        expect(result.correct).toBe(false);
      });
    });
  });

  describe('Challenge 3: Simple Math (SELECT 10 + 5)', () => {
    const validate = getValidator(2);

    describe('accepts valid queries', () => {
      it('accepts SELECT 10 + 5', () => {
        const result = validate(mockResult, 'SELECT 10 + 5');
        expect(result.correct).toBe(true);
      });

      it('accepts SELECT 10 + 5;', () => {
        const result = validate(mockResult, 'SELECT 10 + 5;');
        expect(result.correct).toBe(true);
      });

      it('accepts SELECT 10+5 (no spaces)', () => {
        const result = validate(mockResult, 'SELECT 10+5');
        expect(result.correct).toBe(true);
      });

      it('accepts SELECT 5 + 10 (reversed order)', () => {
        const result = validate(mockResult, 'SELECT 5 + 10');
        expect(result.correct).toBe(true);
      });

      it('accepts lowercase select 10 + 5', () => {
        const result = validate(mockResult, 'select 10 + 5');
        expect(result.correct).toBe(true);
      });

      it('accepts SELECT 15 (direct result)', () => {
        const result = validate(mockResult, 'SELECT 15');
        expect(result.correct).toBe(true);
      });

      it('accepts SELECT 15; (direct result with semicolon)', () => {
        const result = validate(mockResult, 'SELECT 15;');
        expect(result.correct).toBe(true);
      });
    });

    describe('rejects invalid queries', () => {
      it('rejects wrong math SELECT 10 + 6', () => {
        const result = validate(mockResult, 'SELECT 10 + 6');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT 10 - 5', () => {
        const result = validate(mockResult, 'SELECT 10 - 5');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT 10 * 5', () => {
        const result = validate(mockResult, 'SELECT 10 * 5');
        expect(result.correct).toBe(false);
      });

      it('rejects empty query', () => {
        const result = validate(mockResult, '');
        expect(result.correct).toBe(false);
      });

      it('rejects INSERT 10 + 5', () => {
        const result = validate(mockResult, 'INSERT 10 + 5');
        expect(result.correct).toBe(false);
      });

      it('rejects just 10 + 5', () => {
        const result = validate(mockResult, '10 + 5');
        expect(result.correct).toBe(false);
      });

      it('rejects SELECT with wrong result SELECT 16', () => {
        const result = validate(mockResult, 'SELECT 16');
        expect(result.correct).toBe(false);
      });
    });
  });
});
