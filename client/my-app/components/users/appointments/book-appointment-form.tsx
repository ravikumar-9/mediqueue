"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { bookAppointmentSchema, BookAppointmentFormValues } from "@/schema/appoint.schema"

export interface Doctor {
    id: string
    name: string
    specialization: string
    experience: number
    image: string
  }

export function BookAppointmentForm({ doctor }: { doctor: Doctor }) {

  const form = useForm<BookAppointmentFormValues>({
    resolver: zodResolver(bookAppointmentSchema),
    defaultValues: {
      doctor: doctor.name,
      date: "",
      timeSlot: "",
      reason: "",
    },
  })

  function onSubmit(values: BookAppointmentFormValues) {
    console.log(values)
  }

  return (
    <Card className="rounded-2xl border border-border/50 shadow-xl bg-white/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Book Appointment with {doctor.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          {doctor.specialization} • {doctor.experience}+yrs exp
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <input type="hidden" {...form.register("doctor")} />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="h-12 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Slot */}
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10:30 AM"
                      className="h-12 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="rounded-xl resize-none"
                      placeholder="Describe your symptoms..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 text-base rounded-xl shadow-md">
              Confirm Appointment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
