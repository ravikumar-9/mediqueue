import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be 10 digits"),
  gender: z.enum(["male", "female", "other"]),
  dob: z.string().min(1, "Date of birth is required"),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
