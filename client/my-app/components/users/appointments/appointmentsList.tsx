"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { apiErrorHandler } from "@/lib/handlers";
import { appointmentListService } from "@/services/appointmentservice";

type Appointment = {
  id: string;
  doctorName: string;
  specialization: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
};

const UserAppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const normalizeStatus = (status: string) => {
    const lower = status.toLowerCase();

    if (lower === "pending" || lower === "confirmed") return "upcoming";
    if (lower === "completed") return "completed";
    if (lower === "cancelled") return "cancelled";

    return "upcoming";
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentListService();

      const formatted = response?.data?.appointments?.map((appt: any) => ({
        id: appt.id,
        doctorName: `Dr. ${appt.firstName} ${appt.lastName}`,
        specialization: appt.specialization,
        appointmentDate: appt.appointmentDate,
        startTime: appt.startTime,
        endTime: appt.endTime,
        status: normalizeStatus(appt.status),
      }));

      setAppointments(formatted ?? []);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getFilteredAppointments = (status: string) => {
    if (status === "all") return appointments;
    return appointments.filter((a) => a.status === status);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between bg-linear-to-r from-primary/20 to-primary/5 p-6 rounded-2xl shadow-sm border">
        <div>
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage and track your doctor appointments
          </p>
        </div>

        <Button className="rounded-xl">Book Appointment</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        {["upcoming", "completed", "cancelled", "all"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {loading ? (
              <p className="text-muted-foreground mt-6">
                Loading appointments...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {getFilteredAppointments(tab).length > 0 ? (
                  getFilteredAppointments(tab).map((appt) => (
                    <Card
                      key={appt.id}
                      className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {appt.doctorName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {appt.specialization}
                          </p>
                        </div>

                        <Badge variant={getStatusVariant(appt.status)}>
                          {appt.status}
                        </Badge>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Calendar size={14} />
                          {formatDate(appt.appointmentDate)}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={14} />
                          {formatTime(appt.startTime)} -{" "}
                          {formatTime(appt.endTime)}
                        </p>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No appointments found.
                  </p>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default UserAppointmentsList;
