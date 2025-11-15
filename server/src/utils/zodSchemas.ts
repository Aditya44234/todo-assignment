import z, { email } from "zod";


export const authSchemas = {
    signup: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    }),


    login: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
};

export const todoSchemas = {
    create: z.object({
        title: z.string().min(1),
        description: z.string().optional(),
    }),
    update: z.object({
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
    }),
};