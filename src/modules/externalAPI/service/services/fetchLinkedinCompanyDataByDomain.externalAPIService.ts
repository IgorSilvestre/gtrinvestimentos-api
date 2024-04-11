import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { externalAPIEndpoints } from '../../../../shared/externalAPIEndpoints'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { CACHE } from '../../../../shared/cache'
import { CacheTime } from '../../../../shared/keys/cacheTime'

interface Employee {
  link: string
  name: string
  title: string
}

interface Headquarters {
  country: string
  fullAddress: string
  locality: string
}

interface Location {
  cityStatePostalCountry: string
  fullAddress: string
  getDirectionsLink: string
  street: string
}

interface SimilarPage {
  industry: string
  link: string
  location: string
  logo: string
  title: string
}

interface Update {
  comments: number
  date: string
  linksInPostText: {
    hashtagLinks: string[]
  }
  media: string[]
  postAuthor: {
    link: string
    text: string
  }
  postText: string
  reactions: number
}

interface Company {
  banner_img: string
  company_id: number
  company_name: string
  company_size: string
  description: string
  domain: string
  employee_count_on_li: number
  employees_on_li: Employee[]
  final_li_url: string
  founded: number
  headquarters: Headquarters
  industries: string
  locations: Location[]
  logo: string
  original_li_url: string
  similar_pages: SimilarPage[]
  type: string
  updates: Update[]
  website: string
}

export interface ICompanyLinkedinData {
  message: string
  results: Company[]
}

export async function fetchLinkedinCompanyDataByDomain(
  domain: string,
): Promise<ICompanyLinkedinData | AppError> {
  const cachedKey = `fetchLinkedinCompanyDataByDomain-${domain}`
  const cachedData = await CACHE.get(cachedKey)
  if (cachedData) return cachedData as ICompanyLinkedinData

  const options = externalAPIEndpoints.linkedin.companyDataByDomain.options
  options.data.domains = [domain] // Set the domain to be searched
  try {
    const response: AxiosResponse<ICompanyLinkedinData> = await axios.request(
      options as AxiosRequestConfig,
    )
    if (!response.data.results || response.data.results.length < 1)
      throw new Error('CUSTOM: No results found')

    CACHE.set(cachedKey, response.data, CacheTime.one_month)
    return response.data
  } catch (error: any) {
    console.error(error)
    return new AppError(
      {
        clientMessage:
          errorMessageKeys.externalAPI.cantFetchLinkedinCompanyDataByDomain,
        apiError: error,
      },
      error?.response?.status,
    )
  }
}
