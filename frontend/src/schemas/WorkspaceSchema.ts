import { z } from "zod"

export const WorkspaceSchema = z.object({
    name: z
    .string().min(3, {
        message: "Workspace name must be atleast 3 characters long"
    }).max(15, {
        message: "Workspace name must be less than 15 characters long"
    }),
    description: z.string().max(100, {
        message: "Description must be less than 100 characters long"
    }).optional(),
    active: z.boolean().default(true)
})