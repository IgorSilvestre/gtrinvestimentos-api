import { z } from 'zod'

export const updateCompanyValidation = z.object({
  _id: z.string(),
  data: z.any()
})

export type ZUpdateCompany = z.infer<typeof updateCompanyValidation>