import whois from 'whois'
import { isValidCNPJ } from 'br-lib'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'

export async function deepSearchCompany(domain: string) {
  let companyCNPJ: string | undefined
  let whoisData: { ownerid: string; owner: string } | undefined

  try {
    whoisData = await whois(domain)
    companyCNPJ = isValidCNPJ(whoisData?.ownerid ?? '')
      ? whoisData?.ownerid
      : undefined
  } catch (err) {
    console.log(err)
  }

  try {
    const [CNPJData, linkedinCompanyDataByDomain] = await Promise.allSettled([
      companyCNPJ ? externalAPIService.fetchCNPJData(companyCNPJ) : undefined,
      externalAPIService.fetchLinkedinCompanyDataByDomain(domain),
    ])
    console.log('CNPJData', CNPJData)
    return {
      CNPJData:
        CNPJData.status === 'fulfilled'
          ? CNPJData.value
          : {
              Dono: whoisData?.owner ?? 'Não encontrado',
              Documento: whoisData?.ownerid ?? 'Não encontrado',
            },
      linkedinData:
        linkedinCompanyDataByDomain.status === 'fulfilled'
          ? linkedinCompanyDataByDomain.value
          : undefined,
    }
  } catch (error) {
    console.error(error)
    return new AppError({
      clientMessage: errorMessageKeys.cantSearch,
      apiError: error,
    })
  }
}
