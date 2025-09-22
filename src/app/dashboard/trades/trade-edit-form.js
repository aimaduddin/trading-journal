"use client";

import { useEffect, useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateTradeAction } from "./actions";
import { useToast } from "../../../components/toast-provider";

const initialState = {
  status: null,
  message: null,
};

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[color:var(--muted)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(24,119,242,0.35)]";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

function formatDateTimeLocal(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

export default function TradeEditForm({ trade, onClose }) {
  const memoizedInitialState = useMemo(() => initialState, []);
  const [state, formAction] = useFormState(updateTradeAction, memoizedInitialState);
  const { push } = useToast();

  useEffect(() => {
    if (state?.status === "success") {
      onClose?.();
    }
  }, [state, onClose]);

  useEffect(() => {
    if (!state?.status) {
      return;
    }

    if (state.status === "success") {
      push({
        title: state.message ?? "Trade updated",
        variant: "success",
      });
    } else if (state.status === "error") {
      push({
        title: "Failed to update trade",
        description: state.message ?? "Please try again",
        variant: "error",
      });
    }
  }, [state, push]);

  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-1">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">Edit trade</h3>
        <p className="text-sm text-[var(--muted)]">
          Update execution details below. Fees recalculate automatically from entry and exit.
        </p>
      </header>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="tradeId" value={trade.id} />
        <input type="hidden" name="entryType" value={trade.entry_type ?? "market"} />
        <input type="hidden" name="strategyId" value={trade.strategy?.id ?? ""} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Symbol</label>
            <input
              name="symbol"
              defaultValue={trade.symbol}
              required
              className={inputClass}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Side</label>
            <select
              name="side"
              defaultValue={trade.side}
              className={inputClass}
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Quantity</label>
            <input
              name="quantity"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={trade.quantity ?? ""}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Status</label>
            <select
              name="status"
              defaultValue={trade.status}
              className={inputClass}
            >
              <option value="planned">Planned</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Entry price</label>
            <input
              name="entryPrice"
              type="number"
              step="0.0001"
              min="0"
              defaultValue={trade.entry_price ?? ""}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Exit price</label>
            <input
              name="exitPrice"
              type="number"
              step="0.0001"
              min="0"
              defaultValue={trade.exit_price ?? ""}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Executed at</label>
            <input
              name="executedAt"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(trade.executed_at)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Closed at</label>
            <input
              name="closedAt"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(trade.closed_at)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Risk amount</label>
            <input
              name="riskAmount"
              type="number"
              step="0.01"
              min="0"
              defaultValue={trade.risk_amount ?? ""}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Notes</label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={trade.notes ?? ""}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="min-h-[1.5rem] text-sm">
            {state?.message ? (
              <p
                className={
                  state.status === "error"
                    ? "text-red-400"
                    : "text-emerald-400"
                }
                role="status"
              >
                {state.message}
              </p>
            ) : (
              <p className="text-[var(--muted)]">Changes save when you click &quot;Save changes&quot;.</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}
