"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiErrorHandler } from "@/lib/handlers";
import { getDoctorsListService } from "@/services/doctorservice";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  experience: string;
};

const Appointmentdoctorslist = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await getDoctorsListService({ skip: 0, limit: 10 });
      console.log(response?.data?.data);
      setDoctors(response?.data?.data);
    } catch (error) {
      console.log(error);
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Book New Appointment</h2>
          <Separator className="mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors?.map((doctor) => (
         <Card
         key={doctor?.id}
         className="group hover:shadow-xl transition-all duration-300 border-muted"
       >
         <CardContent className="p-6 space-y-4">
       
           {/* Header */}
           <div className="flex items-start justify-between">
       
             {/* Avatar + Info */}
             <div className="flex items-center gap-4">
               <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                 <AvatarFallback className="font-semibold">
                   {doctor?.firstName?.[0]}
                   {doctor?.lastName?.[0]}
                 </AvatarFallback>
               </Avatar>
       
               <div>
                 <h3 className="text-lg font-semibold group-hover:text-primary transition">
                   Dr. {doctor?.firstName} {doctor?.lastName}
                 </h3>
                 <p className="text-sm text-muted-foreground">
                   {doctor?.specialization}
                 </p>
               </div>
             </div>
       
             {/* Rating */}
             <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
               <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
               <span className="text-sm font-medium">4.8</span>
             </div>
           </div>
       
           {/* Experience */}
           <p className="text-sm text-muted-foreground">
             {doctor?.experience
               ? `${doctor.experience} years experience`
               : "Experience not available"}
           </p>
       
           {/* CTA */}
           <Link href={`/appointments/book/${doctor?.id}`}>
             <Button className="w-full mt-2 group-hover:scale-[1.02] transition">
               Book Appointment
             </Button>
           </Link>
       
         </CardContent>
       </Card>
       
          ))}
        </div>
      </section>
    </div>
  );
};

export default Appointmentdoctorslist;
