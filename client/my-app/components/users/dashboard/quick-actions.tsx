import Link from "next/link"
import { CalendarPlus, List, User } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const actions = [
  {
    label: "Book Appointment",
    href: "/appointments/book",
    icon: CalendarPlus,
  },
  {
    label: "My Appointments",
    href: "/appointments",
    icon: List,
  },
  {
    label: "Update Profile",
    href: "/profile",
    icon: User,
  },
]

export default function QuickActions() {
  return (
    <Card className="rounded-2xl border border-primary/10">
      <CardHeader>
        <CardTitle className="text-base">
          Quick Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="
              group
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-primary/10
              bg-background
              p-4
              transition
              hover:border-primary/30
              hover:bg-primary/5
            "
          >
            <div className="rounded-lg bg-primary/10 p-2">
              <action.icon className="h-5 w-5 text-primary" />
            </div>

            <span className="font-medium">
              {action.label}
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
