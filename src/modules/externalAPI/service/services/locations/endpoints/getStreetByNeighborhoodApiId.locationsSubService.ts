import axios from 'axios'
import { externalAPIEndpoints } from '../../../../../../shared/externalAPIEndpoints'
import { AppError } from '../../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../../shared/keys/errorMessageKeys'
import { CACHE } from '../../../../../../shared/cache'
import { CacheTime } from '../../../../../../shared/keys/cacheTime'

export async function getStreetByNeighborhoodApiId(
  apiId: string,
): Promise<Record<string, any> | AppError> {
  const cachekey = `getStreetByNeighborhoodApiId-${apiId}`
  const cachedData = CACHE.get(cachekey)
  if (cachedData) return cachedData

  try {
    const response = await axios.get(
      externalAPIEndpoints.locations.url.getStreetByNeighborhoodApiId + apiId,
      externalAPIEndpoints.locations.options,
    )

    CACHE.set(cachekey, response.data, CacheTime.one_year)
    return response.data
  } catch (err: any) {
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: err,
    })
  }
}
