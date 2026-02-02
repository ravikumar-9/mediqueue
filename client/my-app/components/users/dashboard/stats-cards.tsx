import { CalendarCheck, Clock, User } from "lucide-react";
import MetricCard from "@/components/ui/metricCard";

const stats = [
  { label: "Total Appointments", value: 24, icon: CalendarCheck },
  { label: "Upcoming", value: 3, icon: Clock },
  { label: "Doctors Visited", value: 7, icon: User },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <MetricCard
          key={i}
          label={stat?.label}
          value={stat?.value}
          Icon={stat?.icon}
        />
      ))}
    </div>
  );
}
