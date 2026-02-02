"use client"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { month: "Jan", visits: 1 },
  { month: "Feb", visits: 2 },
  { month: "Mar", visits: 1 },
  { month: "Apr", visits: 3 },
  { month: "May", visits: 2 },
]

export function AppointmentHistoryChart() {
  return (
    <Card className="rounded-3xl border border-primary/10 shadow-sm backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Appointment History
        </CardTitle>
      </CardHeader>

      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="month" tick={{ fill: "#888" }} />
            <YAxis tick={{ fill: "#888" }} allowDecimals={false} />
            <Tooltip cursor={{ opacity: 0.1 }} />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#areaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
