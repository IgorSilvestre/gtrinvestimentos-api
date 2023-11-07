import axios, { AxiosRequestConfig } from 'axios'
import { externalAPIConfigs } from '../../../../shared/externalAPIEndpoints'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { dummyResponseLinkedin } from './dummyResponseLinkedin'



interface IFetchLinkedinCompanyData {
    message: string
    results: Record<string, unknown>[]
}

export async function fetchLinkedinCompanyDataByDomain(domain: string): Promise<IFetchLinkedinCompanyData | AppError> {
    const options = externalAPIConfigs.linkedin.companyDataByDomain.options
    options.data.domains = [domain] // Set the domain to be searched
    try {
        return dummyResponseLinkedin
        // const response = await axios.request(options as AxiosRequestConfig)
        // return response.data
    } catch (error: any) {
        console.error(error)
        return new AppError({
            clientMessage: errorMessageKeys.externalAPI.cantFetchLinkedinCompanyDataByDomain,
            apiError: error,
        }, error?.response?.status)
    }
}
