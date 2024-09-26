import { z } from 'zod'

function stringOptions(type: string) {
    return {
        invalid_type_error: `${type} must be a string`,
    }
}

export const assetValidation = z.object({
    _id: z.string().optional(),
    name: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
        .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    tags: z.array(z.string(stringOptions('tags'))).optional(),
    description: z.string().optional(),
    partnershipPercentage: z.number().optional(),
    price: z.number().optional(),
    contractTerm: z.string().optional(),
    isAtypicalContract: z.boolean().optional(),
    downPayment: z.number().optional(),
    capRatePercentage: z.number().optional(),
    monthlyRentInReais: z.number().optional(),
    kmFromSP: z.number().optional(),
    tenant: z.string().optional(),
    landAreaM2: z.number().optional(),
    constructedAreaM2: z.number().optional(),
    vgvInReais: z.number().optional(),
    energyInstalledCapacityInMWp: z.number().optional(),
    projectAproveDate: z.string().optional(),
    constructionStartDate: z.string().optional(),
    energyOffTaker: z.string(stringOptions('Tomador')).optional(),
    ppaInReaisToMWh: z.number().optional(),
    capexInReais: z.number().optional(),
    cashOrEquivalentInReais: z.number().optional(),
    privateDebtInReais: z.number().optional(),
    valuationPriceInReais: z.number().optional(),
    laborDebtInReais: z.number().optional(),
    publicDebtInReais: z.number().optional(),
    numberOfEmployees: z.number().optional(),
    docLink: z.string().url('Invalid URL').optional(),
    address: z.string(),
    addressComplement: z.string().optional(),
    contact: z.string().optional(),
    zoning: z.array(z.string(stringOptions('zonings'))).optional(),
    createdAt: z.date().optional(),
    lastUpdated: z.date().optional(),
})

export type ZAsset = z.infer<typeof assetValidation>
