"use client";

import { apiErrorHandler } from "@/lib/handlers";
import { getDoctorDetailsService } from "@/services/doctorservice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    if (id) {
      fetchDoctorDetails(id);
    }
  }, [id]);

  const fetchDoctorDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await getDoctorDetailsService(id);

      if (response?.data?.status) {
        setDoctor(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading doctor details...</p>;
  }

  if (!doctor) {
    return <p className="text-center py-10">No doctor data found.</p>;
  }

  /* ---------------- UI ---------------- */

  const groupedAvailability = doctor.availability.reduce<
    Record<string, Availability[]>
  >((acc, slot) => {
    acc[slot.day] = acc[slot.day] || [];
    acc[slot.day].push(slot);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Dr. {doctor.firstName} {doctor.lastName}
          </h1>
          <p className="text-muted-foreground">
            {doctor.specialization}
          </p>
        </div>

        <Badge variant={doctor.isDeactivated ? "destructive" : "default"}>
          {doctor.isDeactivated ? "Deactivated" : "Active"}
        </Badge>
      </div>

      {/* Doctor Info */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Email" value={doctor.email} />
          <Info label="Phone" value={doctor.phone} />
          <Info
            label="Experience"
            value={
              doctor.experience !== undefined
                ? `${doctor.experience} years`
                : "—"
            }
          />
          <Info
            label="Account Created"
            value={new Date(doctor.createdAt).toLocaleDateString()}
          />
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.keys(groupedAvailability).length === 0 && (
            <p className="text-muted-foreground">
              No availability added.
            </p>
          )}

          {Object.entries(groupedAvailability).map(([day, slots]) => (
            <div key={day}>
              <h3 className="font-medium mb-2">{day}</h3>

              <div className="flex flex-wrap gap-3">
                {slots.map((slot, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm"
                  >
                    {slot.startTime} – {slot.endTime}
                  </Badge>
                ))}
              </div>

              <Separator className="mt-4" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Helper ---------------- */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
