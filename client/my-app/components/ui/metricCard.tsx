import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card } from "./card";
import { LucideProps } from "lucide-react";

const MetricCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <Card
      className="
      rounded-xl
      hover:shadow-lg
      p-6
      border border-primary/10
      shadow-sm
      transition-all duration-200 ease-in-out 
      cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>

        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
