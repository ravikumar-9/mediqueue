import { z } from "zod";

export const timeSlotSchema = z.object({
  start: z.string().min(1, "Start time is required"),
  end: z.string().min(1, "End time is required"),
});


export const createDoctorSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  specialization: z.string().min(2, "Specialization is required"),
  experience: z.number().min(1, "Experience must be at least 1 year"),
  slots: z.array(timeSlotSchema).min(1, "At least one time slot required"),
});

export type CreateDoctorFormValues = z.infer<typeof createDoctorSchema>;
