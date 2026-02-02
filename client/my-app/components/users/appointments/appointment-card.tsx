import Image from "next/image"
  import { Card } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Calendar, Clock } from "lucide-react"

export interface Appointment {
    id: string
    doctorName: string
    doctorImage: string
    specialization: string
    date: string
    time: string
    reason: string
    status: "confirmed" | "pending" | "cancelled" | "completed"
  }
  
  export const appointments: Appointment[] = [
    {
      id: "1",
      doctorName: "Dr. Anil Kumar",
      doctorImage: "/doctors/doc1.jpg",
      specialization: "Cardiologist",
      date: "2026-01-20",
      time: "10:30 AM",
      reason: "Chest pain and weakness",
      status: "confirmed",
    },
    {
      id: "2",
      doctorName: "Dr. Sneha Reddy",
      doctorImage: "/doctors/doc2.jpg",
      specialization: "Dermatologist",
      date: "2026-01-15",
      time: "03:00 PM",
      reason: "Skin allergy check",
      status: "pending",
    },
    {
      id: "3",
      doctorName: "Dr. Mahesh Verma",
      doctorImage: "/doctors/doc3.jpg",
      specialization: "Orthopedic Surgeon",
      date: "2025-12-18",
      time: "01:30 PM",
      reason: "Lower back pain",
      status: "cancelled",
    },
  ]
  
  
  export function AppointmentCard({ appt }: { appt: Appointment }) {
    const statusColors = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-700",
      completed: "bg-blue-100 text-blue-700",
    }
  
    return (
      <Card className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-border/60">
        <div className="flex gap-5">
          
          {/* Doctor Image */}
          <Image
            src={appt.doctorImage}
            alt={appt.doctorName}
            width={100}
            height={100}
            className="rounded-xl object-cover h-24 w-24"
          />
  
          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{appt.doctorName}</h3>
              <Badge className={`${statusColors[appt.status]} capitalize`}>
                {appt.status}
              </Badge>
            </div>
  
            <p className="text-sm text-muted-foreground">
              {appt.specialization}
            </p>
  
            <div className="flex items-center gap-4 text-sm mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {appt.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {appt.time}
              </div>
            </div>
  
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              Reason: {appt.reason}
            </p>
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1">View</Button>
          {appt.status !== "cancelled" && appt.status !== "completed" && (
            <>
              <Button variant="outline" className="flex-1">Reschedule</Button>
              <Button variant="destructive" className="flex-1">Cancel</Button>
            </>
          )}
        </div>
      </Card>
    )
  }
  
