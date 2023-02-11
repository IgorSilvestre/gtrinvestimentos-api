import { z } from 'zod'
import { companyValidation } from './ZCompany'

export const updateCompanyValidation = z.object({
  id: z.string(),
  data: companyValidation
})

export type ZUpdateCompany = z.infer<typeof updateCompanyValidation>