"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { TradeFormData } from "@/lib/types"

interface NewTradeFormProps {
  onComplete: () => void
}

export function NewTradeForm({ onComplete }: NewTradeFormProps) {
  const [entryDate, setEntryDate] = useState<Date>()
  const [symbol, setSymbol] = useState("")
  const [type, setType] = useState<"LONG" | "SHORT">()
  const [entryPrice, setEntryPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [stopLoss, setStopLoss] = useState("")
  const [takeProfit, setTakeProfit] = useState("")
  const [mood, setMood] = useState("")
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const tradeData: TradeFormData = {
      symbol: symbol.toUpperCase(),
      type: type || "LONG",
      status: "OPEN",
      entryPrice: parseFloat(entryPrice),
      quantity: parseInt(quantity),
      entryDate: entryDate || new Date(),
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      tags: tags.split(",").map(tag => tag.trim()),
      notes: `Mood: ${mood}\n\n${notes}`,
    }

    // Here you would typically save the trade data
    console.log(tradeData)
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !entryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {entryDate ? entryDate.toLocaleDateString() : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={entryDate}
                onSelect={setEntryDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Symbol
          </label>
          <Input
            placeholder="Enter symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Type
          </label>
          <Select value={type} onValueChange={(value: "LONG" | "SHORT") => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LONG">Long</SelectItem>
              <SelectItem value="SHORT">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Entry Price
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter entry price"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Quantity
          </label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Trading Mood
          </label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confident">Confident</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="anxious">Anxious</SelectItem>
              <SelectItem value="frustrated">Frustrated</SelectItem>
              <SelectItem value="excited">Excited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Stop Loss
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter stop loss"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Take Profit
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter take profit"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Tags
        </label>
        <Input
          placeholder="Enter tags separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Trade Notes
        </label>
        <Textarea
          placeholder="Write your trading thoughts, analysis, and reflections..."
          className="min-h-[150px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onComplete} type="button">
          Cancel
        </Button>
        <Button type="submit">Save Trade</Button>
      </div>
    </form>
  )
} 