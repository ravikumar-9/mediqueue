import MetricCard from "@/components/ui/metricCard";
import { File, LucideProps, User, Users2 } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

const data = [
  {
    label: "Total Users",
    value: 150,
    icon: User,
  },
  {
    label: "Total Admins",
    value: 10,
    icon: Users2,
  },
  {
    label: "Total Appointments",
    value: 60,
    icon: File,
  },
  {
    label:"Upcoming Appointmnets",
    value:15,
    icon:File
  }
];

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map(
        (
          stat: {
            label: string;
            value: number;
            icon: ForwardRefExoticComponent<
              Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
            >;
          },
          index
        ) => (
          <MetricCard
            key={index}
            label={stat?.label}
            value={stat?.value}
            Icon={stat?.icon}
          />
        )
      )}
    </div>
  );
};

export default Stats;
