import { z } from "zod"

export const AccountSchema = z.object({
    username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(50, { message: "Username must be less than 50 characters long" }),
})