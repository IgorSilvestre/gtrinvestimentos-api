import axios, { AxiosRequestConfig } from 'axios'
import { externalAPIEndpoints } from '../../../../../../shared/externalAPIEndpoints'
import { AppError } from '../../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../../shared/keys/errorMessageKeys'
import { CACHE } from '../../../../../../shared/cache'
import { CacheTime } from '../../../../../../shared/keys/cacheTime'

/**
 * @param state - Brazilian state as acronym (e.g. SP, RJ, MG)
 */
export async function getCitiesByState(
  state: string,
): Promise<Record<string, any> | AppError> {
  const cachekey = `getCitiesByState-${state}`
  const cachedData = CACHE.get(cachekey)
  if (cachedData) return cachedData

  try {
    const response = await axios.get(
      externalAPIEndpoints.locations.url.getCitiesByState + state,
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
