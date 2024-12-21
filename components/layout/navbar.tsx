"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/layout/user-nav"
import { LineChart, History, Settings } from "lucide-react"

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
          <LineChart className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Trading Journal</h2>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button asChild variant="ghost">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              <LineChart className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/history" className="text-sm font-medium transition-colors hover:text-primary">
              <History className="h-4 w-4 mr-2" />
              History
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar 