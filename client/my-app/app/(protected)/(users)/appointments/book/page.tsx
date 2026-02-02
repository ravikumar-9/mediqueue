"use client"

import { useState } from "react"
import { DoctorSelector } from "@/components/users/appointments/doctor-selector"
import { BookAppointmentForm } from "@/components/users/appointments/book-appointment-form"
import { AppointmentInfo } from "@/components/users/appointments/appointment-info"

export interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  image: string
}

export default function BookAppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  return (
    <div className="space-y-12">
      
      {/* Stunning Gradient Header */}
      <header className="bg-linear-to-r from-primary/20 to-primary/5 border-b p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold">Book an Appointment</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Select a doctor and schedule your visit
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Section */}
        <div className="lg:col-span-2 space-y-12">

          {/* Doctor Selection */}
          <DoctorSelector onSelect={setSelectedDoctor} />

          {/* Slide-in Appointment Form */}
          {selectedDoctor && (
            <BookAppointmentForm doctor={selectedDoctor} />
          )}
        </div>

        {/* Info Sidebar */}
        <div className="sticky top-24">
          <AppointmentInfo />
        </div>

      </div>
    </div>
  )
}
