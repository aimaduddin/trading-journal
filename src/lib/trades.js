import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseServerClient } from "./supabase/server";

const DEFAULT_OWNER_ID = process.env.SUPABASE_DEFAULT_OWNER_ID;

function getOwnerId() {
  if (!DEFAULT_OWNER_ID) {
    throw new Error(
      "SUPABASE_DEFAULT_OWNER_ID must be configured in the environment."
    );
  }
  return DEFAULT_OWNER_ID;
}

function parseNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

function roundTo(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function calculateFees({ status, entryPrice, exitPrice, quantity }) {
  const qty = parseNumber(quantity);
  const entry = parseNumber(entryPrice);
  const exit = parseNumber(exitPrice);

  if (!qty || qty <= 0) {
    return 0;
  }

  const feeRate = 0.001;

  if (status === "closed" && entry !== null && exit !== null) {
    const entryValue = entry * qty;
    const exitValue = exit * qty;
    return roundTo(entryValue * feeRate + exitValue * feeRate);
  }

  if (entry !== null) {
    const entryValue = entry * qty;
    return roundTo(entryValue * feeRate);
  }

  return 0;
}

function normalizeInsertPayload(input) {
  const ownerId = getOwnerId();
  const quantity = parseNumber(input.quantity);
  const entryPrice = parseNumber(input.entryPrice);
  const exitPrice = parseNumber(input.exitPrice);
  const status = input.status ?? "planned";

  if (!input.symbol) {
    throw new Error("Trade symbol is required");
  }

  if (!input.side) {
    throw new Error("Trade side is required");
  }

  if (!quantity || quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  return {
    owner_id: ownerId,
    strategy_id: input.strategyId ?? null,
    symbol: input.symbol.toUpperCase(),
    side: input.side,
    status,
    entry_type: input.entryType ?? "market",
    entry_price: entryPrice,
    exit_price: exitPrice,
    quantity,
    risk_amount: input.riskAmount ?? null,
    fees: calculateFees({
      status,
      entryPrice,
      exitPrice,
      quantity,
    }),
    notes: input.notes ?? null,
    executed_at: input.executedAt ?? null,
    closed_at: input.closedAt ?? null,
  };
}

export async function listRecentTrades({ limit = 20 } = {}) {
  noStore();

  const supabase = await getSupabaseServerClient();
  const ownerId = getOwnerId();

  const { data, error } = await supabase
    .from("trades")
    .select(
      `
      id,
      symbol,
      side,
      status,
      entry_price,
      exit_price,
      entry_type,
      quantity,
      fees,
      risk_amount,
      notes,
      executed_at,
      closed_at,
      created_at,
      updated_at,
      strategy:strategies ( id, name ),
      trade_tags ( tags ( id, name, color ) )
    `
    )
    .order("executed_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .eq("owner_id", ownerId)
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch trades: ${error.message}`);
  }

  return data ?? [];
}

export async function createTrade(input) {
  const supabase = await getSupabaseServerClient();

  const payload = normalizeInsertPayload(input);

  const { data, error } = await supabase
    .from("trades")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create trade: ${error.message}`);
  }

  return data;
}

export async function updateTrade(tradeId, input) {
  if (!tradeId) {
    throw new Error("Trade id is required");
  }

  const supabase = await getSupabaseServerClient();
  const ownerId = getOwnerId();

  const payload = {
    ...normalizeInsertPayload(input),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("trades")
    .update(payload)
    .eq("id", tradeId)
    .eq("owner_id", ownerId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update trade: ${error.message}`);
  }

  return data;
}

export async function deleteTrade(tradeId) {
  if (!tradeId) {
    throw new Error("Trade id is required");
  }

  const supabase = await getSupabaseServerClient();
  const ownerId = getOwnerId();

  const { error } = await supabase
    .from("trades")
    .delete()
    .eq("id", tradeId)
    .eq("owner_id", ownerId);

  if (error) {
    throw new Error(`Failed to delete trade: ${error.message}`);
  }
}
