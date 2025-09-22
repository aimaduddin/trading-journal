"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext(null);

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    ({ title, description, variant = "default", duration = 4000 }) => {
      const id = generateId();
      setToasts((current) => [
        ...current,
        {
          id,
          title,
          description,
          variant,
          duration,
        },
      ]);
      return id;
    },
    []
  );

  const value = useMemo(
    () => ({ push, dismiss }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastViewport({ toasts, onDismiss }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast.duration) {
      return undefined;
    }

    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const variantStyles = {
    default: "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    error: "border-red-500/40 bg-red-500/10 text-red-200",
  };

  const style = variantStyles[toast.variant] ?? variantStyles.default;

  return (
    <div
      role="status"
      className={`pointer-events-auto w-72 max-w-full rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${style}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {toast.title ? <p className="text-sm font-semibold">{toast.title}</p> : null}
          {toast.description ? (
            <p className="text-sm text-[var(--muted)]">{toast.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="text-xs uppercase tracking-wide text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
