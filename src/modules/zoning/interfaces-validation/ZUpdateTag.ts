import { z } from 'zod'
import { zoningValidation } from './ZZoning'

export const updateZoningValidation = z.object({
  id: z.string(),
  data: zoningValidation,
})

export type ZUpdateZoning = z.infer<typeof updateZoningValidation>
