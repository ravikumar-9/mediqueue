import z from "zod";

export const loginSchema=z.object({
    email:z.string().email("Enter a valid email"),
    password:z.string()
});

export type loginSchemaType=z.infer<typeof loginSchema>


export const registerSchema = z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .regex(/^[A-Za-z\s]+$/, "First name must contain only letters"),
  
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long")
      .regex(/^[A-Za-z\s]+$/, "Last name must contain only letters"),
  
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select your gender",
    }),
  
    email: z
      .string()
      .email("Invalid email address"),
  
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  
    dateOfBirth: z
      .string()
      .refine((date) => {
        const dob = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 13;
      }, "You must be at least 13 years old"),
  
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  });

export type registerSchemaType=z.infer<typeof registerSchema>;