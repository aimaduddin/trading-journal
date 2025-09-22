"use client";

import { useState, useTransition } from "react";
import TradeEditForm from "./trade-edit-form";
import { deleteTradeAction } from "./actions";
import { useToast } from "../../../../components/toast-provider";

export default function TradeRowActions({ trade, variant = "default" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { push } = useToast();

  const styles =
    variant === "compact"
      ? {
          wrapper: "flex items-center gap-2",
          edit:
            "rounded-md bg-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-100",
          remove:
            "rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70",
        }
      : {
          wrapper: "flex items-center gap-2",
          edit:
            "rounded border border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300 transition hover:border-neutral-600 hover:text-white",
          remove:
            "rounded border border-red-500/30 px-3 py-1 text-xs font-medium text-red-400 transition hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-70",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 px-4 py-8"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-neutral-900 bg-neutral-950 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <TradeEditForm trade={trade} onClose={() => setIsEditing(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
