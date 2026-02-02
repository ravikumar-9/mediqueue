"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { month: "Jan", users: 300, doctors: 12 },
  { month: "Feb", users: 420, doctors: 18 },
  { month: "Mar", users: 600, doctors: 26 },
  { month: "Apr", users: 820, doctors: 36 },
]

export function UsersDoctorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users vs Doctors Growth</CardTitle>
      </CardHeader>

      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="users"
              fill="var(--primary)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="doctors"
              fill="var(--accent)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
