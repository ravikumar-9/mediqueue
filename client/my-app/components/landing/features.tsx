import { CalendarCheck, Users, Clock } from "lucide-react"

const features = [
  {
    icon: CalendarCheck,
    title: "Easy Appointment Booking",
    desc: "Book appointments in seconds with real-time availability.",
  },
  {
    icon: Clock,
    title: "Queue Management",
    desc: "Know your turn and avoid unnecessary waiting.",
  },
  {
    icon: Users,
    title: "Role-Based Dashboards",
    desc: "Separate dashboards for users, doctors, and admins.",
  },
]

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold text-foreground">
          Why MediQueue?
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border p-6 hover:shadow-md transition"
            >
              <f.icon className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
