import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const appointments = [
  { doctor: "Dr. Anil Kumar", time: "Tomorrow · 10:30 AM", status: "Confirmed" },
  { doctor: "Dr. Priya Sharma", time: "Friday · 4:00 PM", status: "Pending" },
]

export function UpcomingAppointments() {
  return (
    <Card className="rounded-3xl border border-primary/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Upcoming Appointments</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {appointments.map((appt, i) => (
          <div
            key={i}
            className="
              flex items-center justify-between
              rounded-xl
              p-4
              border border-primary/10
              bg-card shadow-sm
              hover:bg-primary/5
              transition
            "
          >
            <div>
              <p className="font-semibold text-muted-foreground">{appt.doctor}</p>
              <p className="text-sm text-muted-foreground">{appt.time}</p>
            </div>

            <Badge variant={appt.status === "Confirmed" ? "default" : "secondary"}>
              {appt.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
