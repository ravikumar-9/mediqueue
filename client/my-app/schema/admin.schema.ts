import { z } from "zod";

export const DayEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export type Day = z.infer<typeof DayEnum>;

export const availabilitySchema = z
  .object({
    day: DayEnum,

    startTime: z.string(),
    // .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    //   message: "Start time must be in HH:mm format",
    // }),

    endTime: z.string(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const createDoctorSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number must be at most 13 digits"),

  specialization: z.string().min(2, "Specialization is required"),

  experience: z.string(),

  // licenseNumber:z.string().min(3),

  availability: z
    .array(availabilitySchema)
    .min(1, "At least one availability slot is required"),
});

export type CreateDoctorFormValues = z.infer<typeof createDoctorSchema>;
