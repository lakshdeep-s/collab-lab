import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
})

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(50, { message: "Username must be less than 50 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be atleast 5 characters long" })
    .max(16, { message: "Password must be less than 16 characters long" }),
})
