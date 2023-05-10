import { z } from 'zod'

function stringOptions(type: string) {
    return {
        invalid_type_error: `${type} must be a string`,
    }
}

export const companyValidation = z.object({
    _id: z.any().optional(),
    name: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
        .min(2),
    tags: z.array(z.string(stringOptions('tags'))).optional() || z.array(z.object({
        value: z.string(stringOptions('value')),
        label: z.string(stringOptions('label'))
    })),
    description: z.string(stringOptions('description')).optional(),
    target: z.string(stringOptions('target')).optional(),
    lastUpdated: z.date().optional(),
    createdAt: z.date().optional(),
})

export type ZCompany = z.infer<typeof companyValidation>
