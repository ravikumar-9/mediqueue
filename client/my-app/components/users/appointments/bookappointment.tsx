"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import {
  createAppointmentService,
  fetchAppointmentSlotsService,
} from "@/services/appointmentservice";
import { apiErrorHandler } from "@/lib/handlers";
import { toast } from "react-toastify";
import { Loader2, Calendar, Clock } from "lucide-react";

type Slot = {
  startTime: string;
  endTime: string;
};

type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  experience: string;
  specialization: string;
  phone: string;
};

export function BookAppointmentForm() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    fetchSlots(today);
  }, []);

  const fetchSlots = async (selectedDate: string) => {
    try {
      setSlotsLoading(true);
      setSelectedSlot(null);
      const res = await fetchAppointmentSlotsService(id, selectedDate);
      setSlots(res?.data?.slots ?? []);
      setDoctor(res?.data?.doctorDetails ?? null);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setSlotsLoading(false);
    }
  };

  const createAppointment = async () => {
    if (!selectedSlot || !date) return;

    try {
      setBookingLoading(true);

      const payload = {
        startTime: selectedSlot?.startTime,
        endTime: selectedSlot?.endTime,
        date: date,
        doctorId: id,
      };

      const response = await createAppointmentService(payload);

      toast.success(response?.data?.message ?? "Appointment booked!");
      fetchSlots(date);
      setSelectedSlot(null);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Doctor Card */}
      <Card className="p-6 flex items-center gap-6 shadow-md rounded-2xl">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
          {doctor?.firstName?.[0]}
          {doctor?.lastName?.[0]}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">
            Dr. {doctor?.firstName} {doctor?.lastName}
          </h2>

          <p className="text-muted-foreground mt-1">{doctor?.specialization}</p>

          <p className="text-sm text-muted-foreground mt-1">
            {doctor?.experience} years experience • 📞 {doctor?.phone}
          </p>
        </div>
      </Card>

      {/* Booking Section */}
      <Card className="p-6 space-y-6 shadow-sm rounded-2xl">
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar size={16} />
            Select Appointment Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => {
              const selected = e.target.value;
              setDate(selected);
              fetchSlots(selected);
            }}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-primary outline-none"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Slots */}
        {date && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Clock size={16} />
              Available Time Slots
            </h3>

            {slotsLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            )}

            {!slotsLoading && slots?.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No slots available for this date.
              </p>
            )}

            {!slotsLoading && slots?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {slots?.map((slot, index) => {
                  const isSelected =
                    selectedSlot?.startTime === slot?.startTime;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-xl border text-center cursor-pointer transition-all duration-200
                        ${
                          isSelected
                            ? "bg-primary text-white shadow-lg scale-[1.03]"
                            : "bg-background hover:shadow-md hover:border-primary"
                        }`}
                    >
                      <p className="font-medium">{slot?.startTime}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Sticky Booking Summary */}
      {selectedSlot && (
        <Card className="p-6 rounded-2xl border-primary bg-primary/5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Selected Appointment
              </p>
              <p className="font-semibold mt-1">
                {date} • {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </p>
            </div>

            <Button
              disabled={bookingLoading}
              onClick={createAppointment}
              className="h-11 px-6 rounded-xl"
            >
              {bookingLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
