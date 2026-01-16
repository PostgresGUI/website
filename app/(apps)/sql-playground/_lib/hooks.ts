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
  editingQueryId: string | null;
  setEditingQueryId: (id: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredQueries: SavedQuery[];
  handleAddQuery: () => void;
  handleSelectQuery: (q: SavedQuery) => void;
  handleRenameQuery: (id: string, newName: string) => void;
  handleDeleteQuery: (id: string) => void;
  handleDuplicateQuery: (q: SavedQuery) => void;
}

export function useSavedQueries({
  query,
  setQuery,
}: UseSavedQueriesOptions): UseSavedQueriesReturn {
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(null);
  const [editingQueryId, setEditingQueryId] = useState<string | null>(null);
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

  const handleRenameQuery = useCallback((id: string, newName: string) => {
    setSavedQueries((prev) => {
      const updated = prev.map((q) =>
        q.id === id ? { ...q, name: newName } : q
      );
      localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setEditingQueryId(null);
  }, []);

  const handleDeleteQuery = useCallback(
    (id: string) => {
      setSavedQueries((prev) => {
        const updated = prev.filter((q) => q.id !== id);
        localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updated));

        // If deleting the selected query, select another or clear
        if (selectedQueryId === id) {
          if (updated.length > 0) {
            const newSelected = updated[0];
            setSelectedQueryId(newSelected.id);
            localStorage.setItem(SELECTED_QUERY_KEY, newSelected.id);
            setQuery(newSelected.query);
          } else {
            setSelectedQueryId(null);
            localStorage.removeItem(SELECTED_QUERY_KEY);
            setQuery("");
          }
        }

        return updated;
      });
    },
    [selectedQueryId, setQuery]
  );

  const handleDuplicateQuery = useCallback(
    (q: SavedQuery) => {
      const newQuery: SavedQuery = {
        id: crypto.randomUUID(),
        name: `${q.name} (copy)`,
        query: q.query,
      };
      setSavedQueries((prev) => {
        const updated = [...prev, newQuery];
        localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      setSelectedQueryId(newQuery.id);
      localStorage.setItem(SELECTED_QUERY_KEY, newQuery.id);
      setQuery(newQuery.query);
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
    editingQueryId,
    setEditingQueryId,
    searchTerm,
    setSearchTerm,
    filteredQueries,
    handleAddQuery,
    handleSelectQuery,
    handleRenameQuery,
    handleDeleteQuery,
    handleDuplicateQuery,
  };
}
