"use client"

import Image from "next/image"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

export interface Doctor {
    id: string
    name: string
    specialization: string
    experience: number
    image: string
  }
  
  export const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Anil Kumar",
      specialization: "Cardiologist",
      experience: 12,
      image: "/doctors/doc1.jpg",
    },
    {
      id: "2",
      name: "Dr. Sneha Reddy",
      specialization: "Dermatologist",
      experience: 8,
      image: "/doctors/doc2.jpg",
    },
    {
      id: "3",
      name: "Dr. Mahesh Verma",
      specialization: "Orthopedic Surgeon",
      experience: 15,
      image: "/doctors/doc3.jpg",
    },
  ]
  

export function DoctorSelector({
  onSelect,
}: {
  onSelect: (doctor: Doctor) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Choose Your Doctor</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => {
          const isSelected = selected === doc.id

          return (
            <Card
              key={doc.id}
              onClick={() => {
                setSelected(doc.id)
                onSelect(doc)
              }}
              className={`relative p-4 rounded-2xl cursor-pointer transition-all
              ${
                isSelected
                  ? "ring-2 ring-primary shadow-xl scale-[1.02]"
                  : "hover:shadow-lg"
              }`}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-3 right-3 text-primary h-6 w-6" />
              )}

              <Image
                src={doc.image}
                alt={doc.name}
                width={500}
                height={500}
                className="h-40 w-full object-cover rounded-xl"
              />

              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-semibold">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {doc.specialization}
                </p>

                <Badge className="mt-2 bg-primary/10 text-primary">
                  {doc.experience}+ years experience
                </Badge>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

