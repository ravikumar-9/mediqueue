"use client";

import { apiErrorHandler } from "@/lib/handlers";
import { getDoctorDetailsService } from "@/services/doctorservice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Availability = {
  day: string;
  startTime: string;
  endTime: string;
};

type DoctorDetails = {
  firstName: string;
  lastName: string;
  specialization: string;
  experience?: number;
  phone: string;
  email: string;
  createdAt: string;
  isDeactivated: boolean;
  availability: Availability[];
};

export default function DoctorDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState<DoctorDetails | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) fetchDoctorDetails(id);
  }, [id]);

  const fetchDoctorDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await getDoctorDetailsService(id);
      if (response?.data?.status) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Loading doctor details...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        No doctor data found.
      </div>
    );
  }

  const groupedAvailability = doctor?.availability?.reduce<
    Record<string, Availability[]>
  >((acc, slot) => {
    acc[slot?.day] = acc[slot?.day] || [];
    acc[slot?.day].push(slot);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-6 py-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {doctor?.firstName[0]}
              {doctor?.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold">
              Dr. {doctor?.firstName} {doctor?.lastName}
            </h1>
            <p className="text-muted-foreground">{doctor?.specialization}</p>
          </div>

          <Badge
            variant={doctor?.isDeactivated ? "destructive" : "default"}
            className="h-fit"
          >
            {doctor?.isDeactivated ? "Deactivated" : "Active"}
          </Badge>
        </CardContent>
      </Card>

      {/* Doctor Info */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Info label="Email" value={doctor?.email} />
          <Info label="Phone" value={doctor?.phone} />
          <Info
            label="Experience"
            value={
              doctor.experience !== undefined
                ? `${doctor?.experience} years`
                : "—"
            }
          />
          <Info
            label="Joined On"
            value={new Date(doctor?.createdAt)?.toLocaleDateString()}
          />
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.keys(groupedAvailability)?.length === 0 ? (
            <p className="text-muted-foreground">No availability configured.</p>
          ) : (
            Object.entries(groupedAvailability)?.map(([day, slots]) => (
              <div key={day}>
                <h3 className="font-medium mb-3">{day}</h3>

                <div className="flex flex-wrap gap-2">
                  {slots?.map((slot, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-lg px-3 py-1 text-sm"
                    >
                      {slot?.startTime} – {slot?.endTime}
                    </Badge>
                  ))}
                </div>

                <Separator className="mt-4" />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Helper ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
