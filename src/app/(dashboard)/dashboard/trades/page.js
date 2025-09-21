import { listRecentTrades } from "@/lib/trades";
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
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Review your most recent executions. The next iteration will add inline
          editing, advanced filters, and rich media attachments.
        </p>
      </header>

      <TradeForm />

      <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60">
        <div className="border-b border-neutral-900 px-6 py-4">
          <h2 className="text-lg font-medium">Recent trades</h2>
          <p className="text-sm text-neutral-500">
            Data loads directly from Supabase with Row Level Security enforcing
            per-user access.
          </p>
        </div>

        {fetchError ? (
          <div className="px-6 py-10 text-sm text-red-400">
            {fetchError}
          </div>
        ) : trades.length === 0 ? (
          <div className="px-6 py-10 text-sm text-neutral-400">
            No trades logged yet. Once you connect the entry form, new trades
            will surface here immediately.
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full divide-y divide-neutral-900 text-sm">
                <thead className="bg-neutral-950/80">
                <tr className="text-left text-neutral-500">
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
              <tbody className="divide-y divide-neutral-900">
                {trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-white/5">
                    <td className="px-6 py-3 font-medium text-white">
                      {trade.symbol}
                    </td>
                    <td className="px-6 py-3 capitalize text-neutral-300">
                      {trade.side}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatNumber(trade.quantity, { digits: 2 })}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatNumber(trade.entry_price, { digits: 4 })}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatNumber(trade.exit_price, { digits: 4 })}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatSignedNumber(calculateProfitValue(trade))}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatSignedPercentage(calculateProfitPercentage(trade))}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatDate(trade.executed_at)}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      {formatStatus(trade.status)}
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
                      <div className="flex flex-wrap gap-1">
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
                    </td>
                    <td className="px-6 py-3 text-neutral-300">
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

      <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 p-6">
        <h2 className="text-lg font-medium">Next build steps</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-neutral-400">
          <li>Server actions for creating/updating trades with optimistic UI.</li>
          <li>Filter toolbar (dates, strategy, tags) and saved views.</li>
          <li>Attachment gallery powered by Supabase Storage.</li>
        </ul>
      </div>
    </div>
  );
}
