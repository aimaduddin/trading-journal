"use client";

import { useCallback, useMemo, useState } from "react";
import TradeRowActions from "./trade-row-actions";
import {
  DASH,
  calculateProfitPercentage,
  calculateProfitValue,
  formatDate,
  formatNumber,
  formatSignedNumber,
  formatSignedPercentage,
  formatStatus,
} from "./trade-formatters";

const MAX_OFFSET = 120;
const THRESHOLD = 60;

function TradeCard({ trade }) {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useMemo(() => ({ value: 0 }), []);

  const handleStart = useCallback((event) => {
    setIsDragging(true);
    startX.value = event.touches ? event.touches[0].clientX : event.clientX;
  }, [startX]);

  const handleMove = useCallback(
    (event) => {
      if (!isDragging) return;
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = startX.value - clientX;
      const clamped = Math.min(Math.max(0, delta), MAX_OFFSET);
      setOffset(clamped);
    },
    [isDragging, startX]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setOffset((current) => (current > THRESHOLD ? MAX_OFFSET : 0));
  }, [isDragging]);

  return (
    <div className="relative">
      <div
        className="absolute inset-y-0 right-0 flex items-center gap-2 pr-4"
        style={{
          opacity: offset / MAX_OFFSET,
          pointerEvents: offset > 0 ? "auto" : "none",
        }}
      >
        <TradeRowActions trade={trade} variant="compact" />
      </div>

      <article
        className="rounded-2xl border border-neutral-900 bg-neutral-950/80 p-5 shadow-sm transition-transform"
        style={{ transform: `translateX(${-offset}px)` }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Symbol</p>
            <p className="text-xl font-semibold text-white">{trade.symbol}</p>
          </div>
          <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-300">
            {trade.side}
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-1 gap-4 text-sm text-neutral-300 sm:grid-cols-2">
          <div>
            <dt className="text-neutral-500">Quantity</dt>
            <dd className="mt-1 font-medium text-white">{formatNumber(trade.quantity, { digits: 2 })}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Executed</dt>
            <dd className="mt-1">{formatDate(trade.executed_at)}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Entry</dt>
            <dd className="mt-1">{formatNumber(trade.entry_price, { digits: 4 })}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Exit</dt>
            <dd className="mt-1">{formatNumber(trade.exit_price, { digits: 4 })}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">P/L</dt>
            <dd className="mt-1 font-medium">{formatSignedNumber(calculateProfitValue(trade))}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">P/L %</dt>
            <dd className="mt-1 font-medium">{formatSignedPercentage(calculateProfitPercentage(trade))}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-neutral-500">Status</dt>
            <dd className="mt-1">{formatStatus(trade.status)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-neutral-500">Tags</dt>
            <dd className="mt-1">
              <div className="flex flex-wrap gap-2">
                {trade.trade_tags?.length
                  ? trade.trade_tags.map((item) => (
                      <span
                        key={`${trade.id}-${item.tags?.id}`}
                        className="rounded-full bg-white/10 px-2 py-1 text-xs text-white"
                      >
                        {item.tags?.name ?? "Tag"}
                      </span>
                    ))
                  : DASH}
              </div>
            </dd>
          </div>
        </dl>

      </article>
    </div>
  );
}

export default function TradeCardList({ trades }) {
  return (
    <div className="flex flex-col gap-4 p-6 md:hidden">
      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </div>
  );
}
