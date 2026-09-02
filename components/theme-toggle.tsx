"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-7 w-14" /> // Placeholder to prevent layout shift
  }

  const isChecked = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Sun className={cn("h-4 w-4 transition-opacity", isChecked ? "opacity-50" : "opacity-100 text-primary")} />
      <Switch
        checked={isChecked}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className={cn("h-4 w-4 transition-opacity", isChecked ? "opacity-100 text-primary" : "opacity-50")} />
    </div>
  )
}