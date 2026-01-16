"use client";

import { useState, useEffect, useCallback } from "react";
import type { SavedQuery } from "./types";
import { QUERIES_STORAGE_KEY, SELECTED_QUERY_KEY } from "./constants";

interface UseSavedQueriesOptions {
  query: string;
  setQuery: (query: string) => void;
}

interface UseSavedQueriesReturn {
  savedQueries: SavedQuery[];
  selectedQueryId: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredQueries: SavedQuery[];
  handleAddQuery: () => void;
  handleSelectQuery: (q: SavedQuery) => void;
}

export function useSavedQueries({
  query,
  setQuery,
}: UseSavedQueriesOptions): UseSavedQueriesReturn {
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load saved queries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(QUERIES_STORAGE_KEY);
    if (saved) {
      try {
        setSavedQueries(JSON.parse(saved));
      } catch {
        // Invalid JSON, ignore
      }
    }
    const selectedId = localStorage.getItem(SELECTED_QUERY_KEY);
    if (selectedId) {
      setSelectedQueryId(selectedId);
    }
  }, []);

  // Auto-save query as user types
  useEffect(() => {
    if (!selectedQueryId) return;

    setSavedQueries((prev) => {
      const updated = prev.map((q) =>
        q.id === selectedQueryId ? { ...q, query } : q
      );
      localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [query, selectedQueryId]);

  const handleAddQuery = useCallback(() => {
    const newQuery: SavedQuery = {
      id: crypto.randomUUID(),
      name: `Query ${savedQueries.length + 1}`,
      query: "",
    };
    const updated = [...savedQueries, newQuery];
    setSavedQueries(updated);
    localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updated));
    setSelectedQueryId(newQuery.id);
    localStorage.setItem(SELECTED_QUERY_KEY, newQuery.id);
    setQuery("");
  }, [savedQueries, setQuery]);

  const handleSelectQuery = useCallback(
    (q: SavedQuery) => {
      setSelectedQueryId(q.id);
      localStorage.setItem(SELECTED_QUERY_KEY, q.id);
      setQuery(q.query);
    },
    [setQuery]
  );

  const filteredQueries = savedQueries.filter(
    (q) =>
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    savedQueries,
    selectedQueryId,
    searchTerm,
    setSearchTerm,
    filteredQueries,
    handleAddQuery,
    handleSelectQuery,
  };
}
