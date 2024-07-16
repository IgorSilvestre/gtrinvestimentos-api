import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { CACHE } from '../../../../shared/cache'
import { CacheTime } from '../../../../shared/keys/cacheTime'
import { createBusinessEmailPermutations } from '../../../../shared/functions/createBusinessEmailPermutations'
import { externalAPIService } from '../externalAPIService'

export async function fetchBusinessEmail({
    name,
    domain,
}: {
        name: string
        domain: string
    }) {
    const cacheKey = `fetch-business-email-${name.trim().replace(' ', '-')}-${domain}`
    const cachedData = CACHE.get(cacheKey)
    if (cachedData) return cachedData

    const possibleEmailPermutations = createBusinessEmailPermutations(name, domain)

    try {
        const businessEmail = await externalAPIService.verifyEmail(possibleEmailPermutations)
        
        if (businessEmail instanceof Error) {
            return new AppError({
                clientMessage: errorMessageKeys.notFound,
                apiError: businessEmail,
            }, 200)
        }

        CACHE.set(cacheKey, businessEmail, CacheTime.one_month)

        return businessEmail
    } catch (err: any) {
        return new AppError({
            clientMessage: errorMessageKeys.cantSearch,
            apiError: err,
        })
    }
}

