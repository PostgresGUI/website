"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteRowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  primaryKeyColumn: string | null;
  primaryKeyValue: unknown;
  // Theme customization
  overlayClassName?: string;
  dialogClassName?: string;
  headerClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  cancelButtonClassName?: string;
  deleteButtonClassName?: string;
}

export function DeleteRowDialog({
  isOpen,
  onClose,
  onConfirm,
  primaryKeyColumn,
  primaryKeyValue,
  overlayClassName = "",
  dialogClassName = "",
  headerClassName = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  footerClassName = "",
  cancelButtonClassName = "",
  deleteButtonClassName = "",
}: DeleteRowDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete row");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`relative max-w-sm w-full mx-4 ${dialogClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-4 pt-4 pb-2 ${headerClassName}`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 ${iconClassName}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className={titleClassName}>Delete Row</h2>
              <p className={`mt-1 ${descriptionClassName}`}>
                Are you sure you want to delete the row with{" "}
                <span className="font-medium">
                  {primaryKeyColumn} = {String(primaryKeyValue)}
                </span>
                ? This action cannot be undone.
              </p>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-2 px-4 py-3 ${footerClassName}`}>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className={cancelButtonClassName}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className={deleteButtonClassName}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
