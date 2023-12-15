import { z } from 'zod'

export const tagValidation = z.object({
  _id: z.any().optional(),
  label: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(2),
  lastUpdated: z.date().optional(),
  createdAt: z.date().optional(),
})

export type ZTag = z.infer<typeof tagValidation>
