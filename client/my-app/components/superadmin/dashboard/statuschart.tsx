"use client"

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { name: "Confirmed", value: 68 },
  { name: "Pending", value: 22 },
  { name: "Cancelled", value: 10 },
]

const COLORS = [
  "var(--primary)",
  "var(--secondary)",
  "var(--destructive)",
]

export function AppointmentStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Status</CardTitle>
      </CardHeader>

      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
