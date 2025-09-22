"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createTradeAction } from "./actions";
import { useToast } from "../../../../components/toast-provider";

const initialState = {
  status: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Logging…" : "Log trade"}
    </button>
  );
}

function Field({ label, description, children }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-sm font-medium text-white">{label}</label>
        {description ? (
          <p className="text-xs text-neutral-500">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20";

export default function TradeForm() {
  const [state, formAction] = useFormState(createTradeAction, initialState);
  const formRef = useRef(null);
  const symbolRef = useRef(null);
  const { push } = useToast();

  useEffect(() => {
    if (state?.status === "success" && formRef.current) {
      formRef.current.reset();
      symbolRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    if (!state?.status) {
      return;
    }

    if (state.status === "success") {
      push({
        title: state.message ?? "Trade logged",
        variant: "success",
      });
    } else if (state.status === "error") {
      push({
        title: "Failed to log trade",
        description: state.message ?? "Please try again",
        variant: "error",
      });
    }
  }, [state, push]);

  return (
    <section className="w-full rounded-2xl border border-neutral-900 bg-neutral-950/70 p-5 sm:p-6">
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-white">Log a trade</h2>
        <p className="text-sm text-neutral-500">
          Capture executions as soon as they close. You can refine details later
          once analytics and attachments ship.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Symbol">
            <input
              ref={symbolRef}
              name="symbol"
              required
              placeholder="e.g. AAPL"
              className={inputClass}
              autoComplete="off"
            />
          </Field>

          <Field label="Side">
            <select name="side" defaultValue="long" className={inputClass}>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </Field>

          <Field label="Quantity">
            <input
              name="quantity"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="e.g. 100"
              className={inputClass}
            />
          </Field>

          <Field label="Status" description="Defaults to Planned if not provided.">
            <select name="status" defaultValue="planned" className={inputClass}>
              <option value="planned">Planned</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </Field>

          <Field label="Entry price">
            <input
              name="entryPrice"
              type="number"
              step="0.0001"
              min="0"
              placeholder="e.g. 180.42"
              className={inputClass}
            />
          </Field>

          <Field label="Exit price">
            <input
              name="exitPrice"
              type="number"
              step="0.0001"
              min="0"
              placeholder="e.g. 189.25"
              className={inputClass}
            />
          </Field>

          <Field label="Executed at" description="Local time">
            <input name="executedAt" type="datetime-local" className={inputClass} />
          </Field>

          <Field label="Closed at" description="Local time">
            <input name="closedAt" type="datetime-local" className={inputClass} />
          </Field>

          <Field label="Risk amount">
            <input
              name="riskAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Optional"
              className={inputClass}
            />
          </Field>
        </div>

        <Field
          label="Notes"
          description="Add context, emotions, or anything that will help during review."
        >
          <textarea
            name="notes"
            rows={3}
            placeholder="Setup, execution, mindset, outcomes..."
            className={`${inputClass} resize-none`}
          />
        </Field>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              <p className="text-neutral-600">
                Fields marked optional can be filled in later.
              </p>
            )}
          </div>
          <div className="flex justify-end sm:justify-start">
            <SubmitButton />
          </div>
        </div>
      </form>
    </section>
  );
}
