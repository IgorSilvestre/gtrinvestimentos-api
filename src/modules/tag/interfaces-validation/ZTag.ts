import { z } from 'zod'

function stringOptions(type: string) {
    return {
        invalid_type_error: `${type} must be a string`,
    }
}

export const tagValidation = z.object({
    _id: z.any().optional(),
    name: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
        .min(2),
    lastUpdated: z.date().optional(),
    createdAt: z.date().optional(),
})

export type ZTag = z.infer<typeof tagValidation>
