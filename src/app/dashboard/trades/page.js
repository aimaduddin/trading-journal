import { listRecentTrades } from "../../../lib/trades";
import TradeForm from "./trade-form";
import TradeRowActions from "./trade-row-actions";
import TradeCardList from "./trade-card-list";
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

export default async function TradesPage() {
  let trades = [];
  let fetchError = null;

  try {
    trades = await listRecentTrades({ limit: 10 });
  } catch (error) {
    fetchError = error.message;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8 px-4 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold">Trades</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Review your most recent executions. The next iteration will add inline
          editing, advanced filters, and rich media attachments.
        </p>
      </header>

      <TradeForm />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
        <div className="border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-lg font-medium text-[var(--foreground)]">Recent trades</h2>
          <p className="text-sm text-[var(--muted)]">
            Data loads directly from Supabase with Row Level Security enforcing
            per-user access.
          </p>
        </div>

        {fetchError ? (
          <div className="px-6 py-10 text-sm text-red-400">
            {fetchError}
          </div>
        ) : trades.length === 0 ? (
          <div className="px-6 py-10 text-sm text-[var(--muted)]">
            No trades logged yet. Once you connect the entry form, new trades
            will surface here immediately.
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full divide-y divide-[var(--border)] text-sm">
                <thead className="bg-[var(--surface-elevated)]">
                  <tr className="text-left text-[var(--muted)]">
                    <th className="px-6 py-3 font-medium">Symbol</th>
                    <th className="px-6 py-3 font-medium">Side</th>
                    <th className="px-6 py-3 font-medium">Qty</th>
                    <th className="px-6 py-3 font-medium">Entry</th>
                    <th className="px-6 py-3 font-medium">Exit</th>
                    <th className="px-6 py-3 font-medium">P/L</th>
                    <th className="px-6 py-3 font-medium">P/L %</th>
                    <th className="px-6 py-3 font-medium">Executed</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Tags</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {trades.map((trade) => (
                    <tr key={trade.id} className="transition hover:bg-[var(--surface-hover)]">
                      <td className="px-6 py-3 font-medium text-[var(--foreground)]">
                        {trade.symbol}
                      </td>
                      <td className="px-6 py-3 capitalize text-[var(--muted)]">
                        {trade.side}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatNumber(trade.quantity, { digits: 2 })}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatNumber(trade.entry_price, { digits: 4 })}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatNumber(trade.exit_price, { digits: 4 })}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatSignedNumber(calculateProfitValue(trade))}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatSignedPercentage(calculateProfitPercentage(trade))}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatDate(trade.executed_at)}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        {formatStatus(trade.status)}
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        <div className="flex flex-wrap gap-1">
                          {trade.trade_tags?.length
                            ? trade.trade_tags.map((item) => (
                                <span
                                  key={`${trade.id}-${item.tags?.id}`}
                                  className="rounded-full bg-[color:rgba(24,119,242,0.12)] px-2 py-1 text-xs font-medium text-[var(--primary)]"
                                >
                                  {item.tags?.name ?? "Tag"}
                                </span>
                              ))
                            : DASH}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-[var(--muted)]">
                        <TradeRowActions trade={trade} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TradeCardList trades={trades} />
          </>
        )}
      </div>

      <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-6">
        <h2 className="text-lg font-medium text-[var(--foreground)]">Next build steps</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-[var(--muted)]">
          <li>Server actions for creating/updating trades with optimistic UI.</li>
          <li>Filter toolbar (dates, strategy, tags) and saved views.</li>
          <li>Attachment gallery powered by Supabase Storage.</li>
        </ul>
      </div>
    </div>
  );
}
