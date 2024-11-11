import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'
import { externalAPIEndpoints } from '../../../../shared/externalAPIEndpoints'
import { CACHE } from '../../../../shared/cache'
import axios from 'axios'
import { isValidCNPJ } from 'br-lib'

export async function deepSearchCompany(domain: string) {
  const cachedData = CACHE.get(domain)
  if (cachedData) return cachedData

  let domainOwner: Record<string, any> | undefined = undefined

  try {
    const response = await axios.get(`${externalAPIEndpoints.whois}${domain}`)
    const output = response.data
    console.log('whois query: ', output)
    const { owner, ownerid, responsible } = output
  
    const documentType = isValidCNPJ(ownerid) ? 'cnpj' : 'cpf'

    domainOwner = output
      ? {
        name: owner,
        documentType,
        responsible,
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

