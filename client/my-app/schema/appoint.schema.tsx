import { z } from "zod"

/**
 * Book Appointment Schema
 */
export const bookAppointmentSchema = z.object({
  doctor: z
    .string()
    .min(3, "Doctor name is required")
    .max(100, "Doctor name is too long"),

  date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (value) => {
        const selected = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selected >= today
      },
      {
        message: "Date cannot be in the past",
      }
    ),

  timeSlot: z
    .string()
    .min(1, "Time slot is required"),

  reason: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(500, "Reason is too long"),
})

/**
 * Type for React Hook Form
 */
export type BookAppointmentFormValues = z.infer<
  typeof bookAppointmentSchema
>
