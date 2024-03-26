import { z } from 'zod'
import { tagValidation } from '../../tag/interfaces-validation/ZTag'

function stringOptions(type: string) {
  return {
    invalid_type_error: `${type} must be a string`,
  }
}

const tagStringValidation = z.array(z.string(stringOptions('tags')))

export const demandValidation = z.object({
  _id: z.any().optional(),
  tags: z.union([tagStringValidation, tagValidation]).optional(),
  requester: z.string(stringOptions('people')).optional(),
  description: z.string(stringOptions('description')).optional(),
  lastUpdated: z.date().optional(),
  createdAt: z.date().optional(),
})

export type ZDemand = z.infer<typeof demandValidation>
