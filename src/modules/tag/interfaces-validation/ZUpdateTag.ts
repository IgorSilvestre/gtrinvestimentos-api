import { z } from 'zod'
import { tagValidation } from './ZTag'

export const updateTagValidation = z.object({
  id: z.string(),
  data: tagValidation
})

export type ZUpdateTag = z.infer<typeof updateTagValidation>
