import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIConfigs } from '../../../../shared/externalAPIEndpoints'
import { CACHE } from '../../../../shared/cache'
import { CacheTime } from '../../../../shared/keys/cacheTime'


export interface ICompanySearchEngineData {
  business_id: string
  google_id: string
  place_id: string
  google_mid: string
  phone_number: string | null
  name: string
  latitude: number
  longitude: number
  full_address: string
  review_count: number
  rating: number | null
  timezone: string
  working_hours: string | null
  website: string
  verified: boolean
  place_link: string
  cid: string
  reviews_link: string | null
  owner_id: string
  owner_link: string
  owner_name: string
  booking_link: string | null
  reservations_link: string | null
  business_status: string
  type: string
  subtypes: string[]
  photos_sample: IPhoto[]
  reviews_per_rating: Record<string, number> | null
  photo_count: number
  about: {
    summary: string | null
    details: {
      Acessibilidade: {
        'Entrada com acessibilidade': boolean
        'Estacionamento com acessibilidade': boolean
      }
    }
  }
  address: string
  order_link: string | null
  price_level: number | null
  district: string
  street_address: string
  city: string
  zipcode: string
  state: string
  country: string
}

interface IPhoto {
  photo_id: string
  photo_url: string
  photo_url_large: string | null
  video_thumbnail_url: string | null
  latitude: number
  longitude: number
  type: string
  photo_datetime_utc: string
  photo_timestamp: number
}

function parseCompany(company: ICompanySearchEngineData) {
  return {
    ...company,
    full_address: company?.full_address?.replace(
      new RegExp('^' + company.name + ' - '),
      '',
    ),
  }
}

export async function companySearchEngine(query: string) {
  const cacheKey = `company-searchEngine-${query}`
  const cachedData = CACHE.get(cacheKey)
  if (cachedData) return cachedData as ICompanySearchEngineData[]

  externalAPIConfigs.companySearchEngine.defaultOptions.params.query = query
  try {
    const response = await axios.request(
      externalAPIConfigs.companySearchEngine
        .defaultOptions as AxiosRequestConfig,
    )
    const companies = response.data.data.map(
      (company: ICompanySearchEngineData) => parseCompany(company),
    )

    CACHE.set(cacheKey, companies, CacheTime.one_month)

    return companies
  } catch (err: any) {
    return new AppError(
      {
        clientMessage: errorMessageKeys.cantSearch,
        apiError: err,
      }
    )
  }
}
