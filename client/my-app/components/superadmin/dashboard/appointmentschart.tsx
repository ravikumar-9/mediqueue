"use client"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { month: "Jan", count: 420 },
  { month: "Feb", count: 530 },
  { month: "Mar", count: 610 },
  { month: "Apr", count: 780 },
  { month: "May", count: 690 },
]

export function AppointmentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments Trend</CardTitle>
      </CardHeader>

      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="primaryFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--primary)"
              fill="url(#primaryFill)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
