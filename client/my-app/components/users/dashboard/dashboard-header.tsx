"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-border/50">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="h-6 w-1 rounded-full bg-primary" />

        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back 👋
        </h1>
      </div>

      <div className="flex items-center gap-3 pl-10 text-sm">
        <p className="text-muted-foreground">
          Overview of your appointments and activity
        </p>
        <span className="text-muted-foreground">•</span>
        <p className="font-medium text-primary">{today}</p>
      </div>
    </div>
  )
}
