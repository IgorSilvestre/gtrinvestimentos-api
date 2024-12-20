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
  if (name.includes('LTDA') || name.includes('S/A') || name.includes('S.A'))
    return new AppError({
      clientMessage: 'Email é apenas para pessoas'
    })

  const cacheKey = `fetch-business-email-${name.trim().replace(' ', '-')}-${domain}`
  const cachedData = CACHE.get(cacheKey)
  if (cachedData) {
    console.log('fetchBusinessEmail - cached data for key', cacheKey)
    return cachedData
  }

  const possibleEmailPermutations = createBusinessEmailPermutations(name, domain)

  try {
    const businessEmail = await externalAPIService.verifyEmail(possibleEmailPermutations)

    CACHE.set(cacheKey, businessEmail, CacheTime.one_month)

    return businessEmail
  } catch (err: any) {
    if (err instanceof Error) {
      return new AppError({
        clientMessage: errorMessageKeys.notFound,
        apiError: err.message,
      }, 200)
    }
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: err,
    })
  }
}
