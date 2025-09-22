"use server";

import { revalidatePath } from "next/cache";
import { createTrade, updateTrade, deleteTrade } from "../../../lib/trades";

function parseNumber(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
}

export async function createTradeAction(prevState, formData) {
  try {
    await createTrade({
      symbol: formData.get("symbol")?.toString().trim(),
      side:
        formData.get("side")?.toString().toLowerCase().trim() || "long",
      status:
        formData.get("status")?.toString().toLowerCase().trim() || "planned",
      entryType:
        formData.get("entryType")?.toString().toLowerCase().trim() || "market",
      strategyId: formData.get("strategyId")?.toString() || null,
      quantity: parseNumber(formData.get("quantity")),
      entryPrice: parseNumber(formData.get("entryPrice")),
      exitPrice: parseNumber(formData.get("exitPrice")),
      riskAmount: parseNumber(formData.get("riskAmount")),
      executedAt: parseDate(formData.get("executedAt")?.toString()),
      closedAt: parseDate(formData.get("closedAt")?.toString()),
      notes: formData.get("notes")?.toString().trim() || null,
    });

    revalidatePath("/dashboard/trades");

    return {
      status: "success",
      message: "Trade logged",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function updateTradeAction(prevState, formData) {
  const tradeId = formData.get("tradeId")?.toString();

  if (!tradeId) {
    return {
      status: "error",
      message: "Missing trade identifier",
    };
  }

  try {
    await updateTrade(tradeId, {
      symbol: formData.get("symbol")?.toString().trim(),
      side:
        formData.get("side")?.toString().toLowerCase().trim() || "long",
      status:
        formData.get("status")?.toString().toLowerCase().trim() || "planned",
      entryType:
        formData.get("entryType")?.toString().toLowerCase().trim() || "market",
      strategyId: formData.get("strategyId")?.toString() || null,
      quantity: parseNumber(formData.get("quantity")),
      entryPrice: parseNumber(formData.get("entryPrice")),
      exitPrice: parseNumber(formData.get("exitPrice")),
      riskAmount: parseNumber(formData.get("riskAmount")),
      executedAt: parseDate(formData.get("executedAt")?.toString()),
      closedAt: parseDate(formData.get("closedAt")?.toString()),
      notes: formData.get("notes")?.toString().trim() || null,
    });

    revalidatePath("/dashboard/trades");

    return {
      status: "success",
      message: "Trade updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function deleteTradeAction(tradeId) {
  if (!tradeId) {
    return {
      status: "error",
      message: "Missing trade identifier",
    };
  }

  try {
    await deleteTrade(tradeId);
    revalidatePath("/dashboard/trades");

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}
