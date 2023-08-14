import { z } from 'zod'

function stringOptions(type: string) {
    return {
        invalid_type_error: `${type} must be a string`,
    }
}

export const personValidation = z.object({
    _id: z.any().optional(),
    name: z
        .string(stringOptions('name')).min(2).optional(),
    tags: z.array(z.string(stringOptions('tags'))).optional(),
    email: z.string(stringOptions('email')).optional(),
    company: z.string(stringOptions('company')).optional(),
    lastUpdated: z.date().optional(),
    createdAt: z.date().optional(),
    error: z.string().optional(),
})

export type ZPerson = z.infer<typeof personValidation>
