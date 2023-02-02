import { z } from 'zod'

const stringOptions = {
  invalid_type_error: "Type must be a string",
}

export const companyValidation = z.object({
    _id: z.any().optional(),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }).min(2),
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
      }),
    website: z.string(stringOptions).url().optional(),
    documentType: z.string(stringOptions).optional(),
    documentNumber: z.string(stringOptions).optional(),
    phone: z.string(stringOptions).optional(),
    email: z.string(stringOptions).email().min(5).optional(),
    address: z.string(stringOptions).optional(),
    state: z.string(stringOptions).optional(),
    city: z.string(stringOptions).optional(),
    zipCode: z.string(stringOptions).optional(),
    lastUpdated: z.date().optional(),
    createdAt: z.date().optional(),
})

export type ZCompany = z.infer<typeof companyValidation>