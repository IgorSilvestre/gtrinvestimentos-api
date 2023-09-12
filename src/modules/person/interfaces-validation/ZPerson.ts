import { z } from 'zod'

function stringOptions(type: string) {
    return {
        invalid_type_error: `${type} must be a string`,
    }
}
function numberOptions(type: string) {
    return {
        invalid_type_error: `${type} must be a number`,
    }
}

export const personValidation = z.object({
    _id: z.any().optional(),
    name: z
        .string(stringOptions('name')).min(2).optional(),
    tags: z.array(z.string(stringOptions('tags'))).optional(),
    target: z.string(stringOptions('target')).optional(),
    email: z.string(stringOptions('email')).optional(),
    company: z.string(stringOptions('company')).optional(),
    landArea: z.number(numberOptions('landArea')).optional(),
    vgv: z.number(numberOptions('vgv')).optional(),
    lastUpdated: z.date().optional(),
    createdAt: z.date().optional(),
    error: z.string().optional(),
})

export type ZPerson = z.infer<typeof personValidation>
