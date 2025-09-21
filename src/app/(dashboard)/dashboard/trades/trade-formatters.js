const DASH = "—";

export function formatDate(value) {
  if (!value) return DASH;
  const date = new Date(value);
  return date.toLocaleString();
}

export function formatNumber(value, { digits = 2 } = {}) {
  if (value === null || value === undefined) return DASH;
  const number = Number(value);
  if (Number.isNaN(number)) return DASH;
  return number.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export function formatSignedNumber(value, { digits = 2 } = {}) {
  if (value === null || value === undefined) return DASH;
  const number = Number(value);
  if (Number.isNaN(number)) return DASH;
  return number.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    signDisplay: "always",
  });
}

export function formatSignedPercentage(value, { digits = 2 } = {}) {
  if (value === null || value === undefined) return DASH;
  const number = Number(value);
  if (Number.isNaN(number)) return DASH;
  const formatted = number.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    signDisplay: "always",
  });
  return `${formatted}%`;
}

export function formatStatus(value) {
  if (!value) return DASH;
  return value
    .toString()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function parseNumeric(value) {
  if (value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

export function calculateProfitValue(trade) {
  const entryPrice = parseNumeric(trade.entry_price);
  const exitPrice = parseNumeric(trade.exit_price);
  const quantity = parseNumeric(trade.quantity);

  if (entryPrice === null || quantity === null) {
    return null;
  }

  const side = trade.side?.toLowerCase();
  const fees = parseNumeric(trade.fees) ?? 0;

  if (exitPrice === null) {
    return fees ? -fees : null;
  }

  const grossProfit =
    side === "short"
      ? (entryPrice - exitPrice) * quantity
      : (exitPrice - entryPrice) * quantity;

  return grossProfit - fees;
}

export function calculateProfitPercentage(trade) {
  const entryPrice = parseNumeric(trade.entry_price);
  if (entryPrice === null || entryPrice === 0) {
    return null;
  }

  const profitValue = calculateProfitValue(trade);
  if (profitValue === null) {
    return null;
  }

  const quantity = parseNumeric(trade.quantity);
  if (quantity === null || quantity === 0) {
    return null;
  }

  const exposure = entryPrice * quantity;
  if (exposure === 0) {
    return null;
  }

  return (profitValue / exposure) * 100;
}

export { DASH };
