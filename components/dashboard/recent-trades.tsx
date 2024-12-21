"use client"

import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

// Mock data for recent trades
const recentTrades = [
  {
    id: 1,
    symbol: "AAPL",
    type: "LONG",
    entry: 185.50,
    exit: 190.25,
    profit: 475.0,
    date: new Date("2024-01-20T10:30:00"),
    quantity: 10
  },
  {
    id: 2,
    symbol: "MSFT",
    type: "SHORT",
    entry: 390.0,
    exit: 385.75,
    profit: 425.0,
    date: new Date("2024-01-19T15:45:00"),
    quantity: 10
  },
  {
    id: 3,
    symbol: "TSLA",
    type: "LONG",
    entry: 220.0,
    exit: 218.50,
    profit: -150.0,
    date: new Date("2024-01-18T11:20:00"),
    quantity: 10
  },
  {
    id: 4,
    symbol: "NVDA",
    type: "LONG",
    entry: 520.75,
    exit: 525.50,
    profit: 475.0,
    date: new Date("2024-01-17T14:15:00"),
    quantity: 10
  },
]

export function RecentTrades() {
  return (
    <div className="space-y-8">
      {recentTrades.map((trade) => (
        <div key={trade.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {trade.symbol}
              <span className={`ml-2 text-xs ${trade.type === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                {trade.type}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(trade.date)}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <div className="flex items-center space-x-2">
              {trade.profit > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={trade.profit > 0 ? "text-green-500" : "text-red-500"}>
                {formatCurrency(trade.profit)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 