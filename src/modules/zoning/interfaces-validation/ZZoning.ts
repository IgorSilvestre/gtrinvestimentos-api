import { z } from 'zod'

export const zoningValidation = z.object({
  _id: z.any().optional(),
  label: z
    .string({
      required_error: 'Label is required',
      invalid_type_error: 'Label must be a string',
    })
    .min(2),
  lastUpdated: z.date().optional(),
  createdAt: z.date().optional(),
})

export type ZZoning = z.infer<typeof zoningValidation>
