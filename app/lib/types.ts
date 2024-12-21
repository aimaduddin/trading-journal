export type TradeType = 'LONG' | 'SHORT'
export type TradeStatus = 'OPEN' | 'CLOSED'

export interface Trade {
  id: string
  symbol: string
  type: TradeType
  status: TradeStatus
  entryPrice: number
  exitPrice?: number
  quantity: number
  entryDate: Date
  exitDate?: Date
  stopLoss?: number
  takeProfit?: number
  tags: string[]
  notes: string
  profitLoss?: number
  fees?: number
}

export interface TradeFormData extends Omit<Trade, 'id' | 'profitLoss'> {
  id?: string
}

export interface DashboardStats {
  totalTrades: number
  winRate: number
  totalProfitLoss: number
  averageProfitLoss: number
  bestTrade: number
  worstTrade: number
} 