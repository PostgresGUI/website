'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  initializeDatabase,
  executeQuery as execQuery,
  resetDatabase as resetDB,
  getSchema,
  setupSchema
} from '@/lib/learn/sql-engine';
import { QueryResult, TableInfo } from '@/lib/learn/lessons/types';

export function useSQLEngine() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<TableInfo[]>([]);

  useEffect(() => {
    let mounted = true;

    initializeDatabase()
      .then(() => {
        if (mounted) {
          setSchema(getSchema());
          setError(null);
        }
      })
      .catch((e) => {
        if (mounted) {
          setError(e.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const executeQuery = useCallback((sql: string): QueryResult => {
    const result = execQuery(sql);
    setSchema(getSchema());
    return result;
  }, []);

  const resetDatabase = useCallback(async () => {
    setIsLoading(true);
    resetDB();
    try {
      await initializeDatabase();
      setSchema([]);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initSchema = useCallback((sql: string): QueryResult => {
    const result = setupSchema(sql);
    setSchema(getSchema());
    return result;
  }, []);

  return {
    isLoading,
    error,
    schema,
    executeQuery,
    resetDatabase,
    initSchema
  };
}
