
import { appointments } from "@/components/users/appointments/appointment-card"
import { AppointmentCard } from "@/components/users/appointments/appointment-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ProtectedLayout from "@/components/layout/protectedLayout"

export default function AppointmentsPage() {
  return (
    <ProtectedLayout>
    <div className="space-y-12">

      {/* Page Header */}
      <header className="bg-linear-to-r from-primary/20 to-primary/5 p-8 rounded-xl shadow-sm border">
        <h1 className="text-3xl font-bold tracking-tight">
          Your Appointments
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          View, manage and track all your appointments
        </p>
      </header>

      {/* Tabs Layout */}
      <Tabs defaultValue="upcoming" className="space-y-10">
        
        {/* Tab Buttons */}
        <TabsList className="w-full justify-start h-12 rounded-xl bg-muted/50 p-1">
          <TabsTrigger value="upcoming" className="h-10 rounded-lg px-6 cursor-pointer">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="h-10 rounded-lg px-6 cursor-pointer">
            Completed
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="h-10 rounded-lg px-6 cursor-pointer">
            Cancelled
          </TabsTrigger>
          <TabsTrigger value="all" className="h-10 rounded-lg px-6 cursor-pointer">
            All
          </TabsTrigger>
        </TabsList>

        {/* UPCOMING TAB */}
        <TabsContent value="upcoming" className="space-y-6">
          <SectionTitle title="Upcoming Appointments" />
          <AppointmentGrid
            items={appointments.filter(
              (a) => a.status === "confirmed" || a.status === "pending"
            )}
          />
        </TabsContent>

        {/* COMPLETED TAB */}
        <TabsContent value="completed" className="space-y-6">
          <SectionTitle title="Completed Appointments" />
          <AppointmentGrid
            items={appointments.filter((a) => a.status === "completed")}
          />
        </TabsContent>

        {/* CANCELLED TAB */}
        <TabsContent value="cancelled" className="space-y-6">
          <SectionTitle title="Cancelled Appointments" />
          <AppointmentGrid
            items={appointments.filter((a) => a.status === "cancelled")}
          />
        </TabsContent>

        {/* ALL TAB */}
        <TabsContent value="all" className="space-y-6">
          <SectionTitle title="All Appointments" />
          <AppointmentGrid items={appointments} />
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedLayout>
  )
}

/* ---- Small Components ---- */

function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Separator className="mt-2" />
    </div>
  )
}

function AppointmentGrid({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.length > 0 ? (
        items.map((appt) => (
          <AppointmentCard key={appt.id} appt={appt} />
        ))
      ) : (
        <p className="text-muted-foreground">No appointments found.</p>
      )}
    </div>
  )
}
