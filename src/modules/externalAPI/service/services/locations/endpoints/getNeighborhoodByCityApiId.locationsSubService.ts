import axios, { AxiosRequestConfig } from 'axios'
import { externalAPIEndpoints } from '../../../../../../shared/externalAPIEndpoints'
import { AppError } from '../../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../../shared/keys/errorMessageKeys'
import { CACHE } from '../../../../../../shared/cache'
import { CacheTime } from '../../../../../../shared/keys/cacheTime'

/**
 * @param ApiId - Its the API ID for the city
 */
export async function getNeighborhoodByCityApiId(ApiId: string) {
  const cachekey = `getNeighberhoodByCityApiId-${ApiId}`
  const cachedData = CACHE.get(cachekey)
  if (cachedData) return cachedData

  try {
    const response = await axios.get(
      externalAPIEndpoints.locations.url.getNeighberhoodByCityApiId + ApiId,
      externalAPIEndpoints.locations.options,
    )

    CACHE.set(cachekey, response.data, CacheTime.one_year)
    return response.data
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: err,
    })
  }
}
