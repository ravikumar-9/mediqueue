import { z } from "zod"

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName:z.string().min(2),
  gender:z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  dateOfBirth:z.string(),
  phone:z.string().min(10)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
