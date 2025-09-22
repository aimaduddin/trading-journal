"use client";

import { useEffect, useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateTradeAction } from "./actions";
import { useToast } from "../../../../components/toast-provider";

const initialState = {
  status: null,
  message: null,
};

const inputClass =
  "w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
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
        <h3 className="text-lg font-semibold text-white">Edit trade</h3>
        <p className="text-sm text-neutral-500">
          Update execution details below. Fees recalculate automatically from entry and exit.
        </p>
      </header>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="tradeId" value={trade.id} />
        <input type="hidden" name="entryType" value={trade.entry_type ?? "market"} />
        <input type="hidden" name="strategyId" value={trade.strategy?.id ?? ""} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Symbol</label>
            <input
              name="symbol"
              defaultValue={trade.symbol}
              required
              className={inputClass}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Side</label>
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
            <label className="text-sm font-medium text-white">Quantity</label>
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
            <label className="text-sm font-medium text-white">Status</label>
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
            <label className="text-sm font-medium text-white">Entry price</label>
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
            <label className="text-sm font-medium text-white">Exit price</label>
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
            <label className="text-sm font-medium text-white">Executed at</label>
            <input
              name="executedAt"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(trade.executed_at)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Closed at</label>
            <input
              name="closedAt"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(trade.closed_at)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-white">Risk amount</label>
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
            <label className="text-sm font-medium text-white">Notes</label>
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
              <p className="text-neutral-600">Changes save when you click &quot;Save changes&quot;.</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-neutral-600 hover:text-white"
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
