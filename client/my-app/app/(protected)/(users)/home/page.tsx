import ProtectedLayout from "@/components/layout/protectedLayout";
import { AppointmentHistoryChart } from "@/components/users/dashboard/appointment-history-chart";
import QuickActions from "@/components/users/dashboard/quick-actions";
import { StatsCards } from "@/components/users/dashboard/stats-cards";
import { UpcomingAppointments } from "@/components/users/dashboard/upcoming-appointments";

export default function UserDashboardPage() {
  return (
    <ProtectedLayout title="Dashboard">
    <div className="space-y-8">
      <StatsCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
        <AppointmentHistoryChart />
        </div>
        <UpcomingAppointments />
      </div>
      <QuickActions />
    </div>
    </ProtectedLayout>
  );
}
