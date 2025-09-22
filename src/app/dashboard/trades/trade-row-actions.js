"use client";

import { useState, useTransition } from "react";
import TradeEditForm from "./trade-edit-form";
import { deleteTradeAction } from "./actions";
import { useToast } from "../../../components/toast-provider";

export default function TradeRowActions({ trade, variant = "default" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { push } = useToast();

  const styles =
    variant === "compact"
      ? {
          wrapper: "flex items-center gap-2",
          edit:
            "rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-hover)]",
          remove:
            "rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70",
        }
      : {
          wrapper: "flex items-center gap-2",
          edit:
            "rounded border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
          remove:
            "rounded border border-red-500/40 px-3 py-1 text-xs font-medium text-red-500 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-70",
        };
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Delete this trade? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    startTransition(() => {
      deleteTradeAction(trade.id)
        .then((result) => {
          if (result?.status === "success") {
            push({ title: "Trade deleted", variant: "success" });
          } else {
            push({
              title: "Failed to delete trade",
              description: result?.message ?? "Please try again",
              variant: "error",
            });
          }
        })
        .catch((error) => {
          push({
            title: "Failed to delete trade",
            description: error.message ?? "Unexpected error",
            variant: "error",
          });
        });
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className={styles.edit}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className={styles.remove}
        >
          Delete
        </button>
      </div>

      {isEditing ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(24,25,26,0.65)] px-4 py-8"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <TradeEditForm trade={trade} onClose={() => setIsEditing(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
