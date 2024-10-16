import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'
import { externalAPIEndpoints } from '../../../../shared/externalAPIEndpoints'
import { axiosWithoutSSL } from '../../../../shared/globalExports'
import { CACHE } from '../../../../shared/cache'

export async function deepSearchCompany(domain: string) {
  const cachedData = CACHE.get(domain)
  if (cachedData) return cachedData

  let domainOwner: Record<string, any> | undefined = undefined

  try {
    const response = await axiosWithoutSSL.get(`${externalAPIEndpoints.whois}${domain}`)
    const output = response.data

    const owner = output?.entities[0]?.legalRepresentative

    const documentType = output?.entities[0]?.publicIds[0]?.type
    const ownerid = output?.entities[0]?.publicIds[0]?.identifier

    domainOwner = output
      ? {
        name: owner,
        documentType,
        document: ownerid,
        // emails: emails?.toString().split(','),
      }
      : undefined
  } catch (err) {
    console.log(err)
  }

  try {
    const [CNPJResponse, linkedinResponse] = await Promise.allSettled([
      (domainOwner?.documentType === 'cnpj' && domainOwner?.document) ?
        externalAPIService.fetchCNPJData(domainOwner.document.replace(/\D/g, ''))
        : undefined,
      externalAPIService.fetchLinkedinCompanyDataByDomain(domain),
    ])


    const CNPJData =
      CNPJResponse.status === 'fulfilled' && CNPJResponse.value
        ? CNPJResponse.value
        : undefined
    const linkedinData =
      linkedinResponse.status === 'fulfilled'
        ? linkedinResponse.value
        : undefined
   
    const response = {
      CNPJData,
      domainOwner,
      linkedinData,
    }

    CACHE.set(domain, response, 2592000)
    return response 
  } catch (error) {
    console.error(error)
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: error,
    })
  }
}

