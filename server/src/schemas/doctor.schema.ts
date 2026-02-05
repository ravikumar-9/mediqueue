// schemas/createDoctor.schema.ts
import { z } from "zod";

export const createDoctorSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  specialization: z.string().min(2),
  licenseNumber: z.string().min(5),
  experience: z.string().optional(),
  phone: z.string().min(10).max(13),
  availability: z
    .array(
      z
        .object({
          day: z.enum([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]),
          startTime: z.string().regex(/^\d{2}:\d{2}$/),
          endTime: z.string().regex(/^\d{2}:\d{2}$/),
        })
        .refine((v) => v.endTime > v.startTime, {
          message: "The end time must be greater than start time",
        })
    )
    .min(1),
});
