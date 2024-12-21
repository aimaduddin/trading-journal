"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NewTradeForm } from "./new-trade-form"
import { Plus } from "lucide-react"
import { useState } from "react"

export function NewTradeDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Trade
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Trade Entry</DialogTitle>
        </DialogHeader>
        <NewTradeForm onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
} 