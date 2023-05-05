import { z } from 'zod'
import { personValidation } from './ZPerson'

export const updatePersonValidation = z.object({
  id: z.string(),
  data: personValidation
})

export type ZUpdatePerson = z.infer<typeof updatePersonValidation>
