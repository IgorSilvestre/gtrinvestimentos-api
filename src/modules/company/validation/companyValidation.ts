import { z } from 'zod'


const companyValidation = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.date()
})

export type ZCompany = z.infer<typeof companyValidation>