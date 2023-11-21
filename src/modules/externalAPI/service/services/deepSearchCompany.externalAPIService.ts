import whois from 'whois'
import { isValidCNPJ } from 'br-lib'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'

export async function deepSearchCompany(domain: string) {
  let companyCNPJ: string | undefined
  try {
    const whoisData: { ownerid: string } = await whois(domain)
    companyCNPJ = isValidCNPJ(whoisData.ownerid) ? whoisData.ownerid : undefined
  } catch (err) {
    console.log(err)
  }

  try {
    const [linkedinCompanyDataByDomain, CNPJData] = await Promise.allSettled([
      externalAPIService.fetchLinkedinCompanyDataByDomain(domain),
      companyCNPJ ? externalAPIService.fetchCNPJData(companyCNPJ) : undefined,
    ])

    return {
      linkedinData:
        linkedinCompanyDataByDomain.status === 'fulfilled'
          ? linkedinCompanyDataByDomain.value
          : undefined,
      CNPJData: CNPJData.status === 'fulfilled' ? CNPJData.value : undefined,
    }
  } catch (error) {
    console.error(error)
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: error,
    })
  }
}
