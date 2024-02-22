import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIConfigs } from '../../../../shared/externalAPIEndpoints'
import { CACHE } from '../../../../shared/cache'
import { CacheTime } from '../../../../shared/keys/cacheTime'

export async function fetchBusinessEmail({
  name,
  domain,
}: {
  name: string
  domain: string
}) {
  const [first_name, ...rest] = name.split(/\s+/)
  const last_name = rest.join(' ')

  const cacheKey = `fetch-business-email-${first_name}-${rest.join(
    '-',
  )}-${domain}`
  console.log('cacheKey', cacheKey)
  const cachedData = CACHE.get(cacheKey)
  if (cachedData) return cachedData

  externalAPIConfigs.fetchBusinessEmail.params.first_name = first_name
  externalAPIConfigs.fetchBusinessEmail.params.last_name = last_name
  externalAPIConfigs.fetchBusinessEmail.params.domain = domain

  try {
    const response = await axios.request(
      externalAPIConfigs.fetchBusinessEmail as AxiosRequestConfig,
    )
    const businessEmail = response.data

    CACHE.set(cacheKey, businessEmail, CacheTime.one_month)

    return businessEmail
  } catch (err: any) {
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: err,
    })
  }
}
