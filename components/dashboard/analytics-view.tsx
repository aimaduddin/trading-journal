"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for analytics
const monthlyPerformance = [
  { month: "Jan", profit: 4500 },
  { month: "Feb", profit: -2300 },
  { month: "Mar", profit: 6700 },
  { month: "Apr", profit: 3400 },
  { month: "May", profit: -1200 },
  { month: "Jun", profit: 5600 },
]

const tradingPairs = [
  { name: "AAPL", value: 35 },
  { name: "MSFT", value: 25 },
  { name: "TSLA", value: 20 },
  { name: "NVDA", value: 15 },
  { name: "AMZN", value: 5 },
]

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

const tradingStats = {
  profitFactor: 2.5,
  averageWin: 450.75,
  averageLoss: -225.50,
  largestWin: 2750.00,
  largestLoss: -1500.00,
  winningStreak: 5,
  losingStreak: 2,
  expectancy: 125.25
}

export function AnalyticsView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tradingStats.profitFactor.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ratio of gross profit to gross loss</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Win</span>
                <span className="text-sm font-bold text-green-500">
                  {formatCurrency(tradingStats.averageWin)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Loss</span>
                <span className="text-sm font-bold text-red-500">
                  {formatCurrency(tradingStats.averageLoss)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Expectancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(tradingStats.expectancy)}</div>
            <p className="text-xs text-muted-foreground">Average profit per trade</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelStyle={{ color: "black" }}
                  />
                  <Bar
                    dataKey="profit"
                    fill={(entry) => (entry.profit >= 0 ? "#22c55e" : "#ef4444")}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Trading Pairs Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tradingPairs}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {tradingPairs.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trade Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Largest Win</p>
              <p className="text-2xl font-bold text-green-500">
                {formatCurrency(tradingStats.largestWin)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Largest Loss</p>
              <p className="text-2xl font-bold text-red-500">
                {formatCurrency(tradingStats.largestLoss)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Winning Streak</p>
              <p className="text-2xl font-bold text-green-500">{tradingStats.winningStreak}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Losing Streak</p>
              <p className="text-2xl font-bold text-red-500">{tradingStats.losingStreak}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 