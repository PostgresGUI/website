"use client";

import { useState, useRef, useEffect } from "react";
import { FileCode2, Pencil, Copy, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { SavedQuery } from "../_lib/types";

interface QueryListItemProps {
  query: SavedQuery;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onStartEditing: () => void;
  onRename: (newName: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  className?: string;
  selectedClassName?: string;
  hoverClassName?: string;
  iconClassName?: string;
  selectedIconClassName?: string;
  textClassName?: string;
  selectedTextClassName?: string;
  inputClassName?: string;
  actionClassName?: string;
  dialogClassName?: string;
  dialogButtonClassName?: string;
  dialogCancelClassName?: string;
  dialogDeleteClassName?: string;
}

export function QueryListItem({
  query,
  isSelected,
  isEditing,
  onSelect,
  onStartEditing,
  onRename,
  onDuplicate,
  onDelete,
  className = "",
  selectedClassName = "",
  hoverClassName = "",
  iconClassName = "",
  selectedIconClassName = "",
  textClassName = "",
  selectedTextClassName = "",
  inputClassName = "",
  actionClassName = "",
  dialogClassName = "",
  dialogButtonClassName = "",
  dialogCancelClassName = "",
  dialogDeleteClassName = "",
}: QueryListItemProps) {
  const [editValue, setEditValue] = useState(query.name);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(query.name);
  }, [query.name]);

  const handleSubmit = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      onRename(trimmed);
    } else {
      setEditValue(query.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditValue(query.name);
      onRename(query.name); // Cancel editing
    }
  };

  return (
    <div
      className={`group w-full flex items-center gap-2 ${className} ${
        isSelected ? selectedClassName : hoverClassName
      }`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className={`flex-1 min-w-0 ${inputClassName}`}
        />
      ) : (
        <>
          <button
            onClick={onSelect}
            className="flex-1 flex items-center gap-2 min-w-0"
          >
            <FileCode2
              className={`w-4 h-4 flex-shrink-0 ${
                isSelected ? selectedIconClassName : iconClassName
              }`}
            />
            <span
              className={`flex-1 text-left font-medium truncate ${
                isSelected ? selectedTextClassName : textClassName
              }`}
            >
              {query.name}
            </span>
          </button>
          <div className={`flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${actionClassName}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartEditing();
              }}
              className="p-1 rounded hover:bg-black/10"
              title="Rename"
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1 rounded hover:bg-black/10"
              title="Duplicate"
            >
              <Copy className="w-3 h-3" />
            </button>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 rounded hover:bg-black/10 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className={dialogClassName}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Query</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{query.name}&quot;? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={dialogCancelClassName}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className={dialogDeleteClassName || "bg-red-600 hover:bg-red-700 text-white"}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}
