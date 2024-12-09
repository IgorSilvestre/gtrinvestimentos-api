import { z } from "zod";

export const userValidation = z.object({
  name: z.string().optional(),
  email: z.string().min(1, 'email must not be empty'),
  password: z.string().min(1, 'password must not be empty'),
})

export const userRegisterValidation = z.object({
  name: z.string().min(1, 'email must not be empty'),
  email: z.string().min(1, 'email must not be empty'),
  password: z.string().min(1, 'password must not be empty'),
})


export type ZUser = z.infer<typeof userValidation>

