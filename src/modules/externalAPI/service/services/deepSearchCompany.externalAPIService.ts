import whois from 'whois'
import { isValidCNPJ } from 'br-lib'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'

export async function deepSearchCompany(domain: string) {
    let companyCNPJ: string | undefined
    let whoisData:
        | {
            ownerid: string
            owner: string
            person: string | undefined
            eMail: string | undefined
        }
        | undefined
    let domainOwner:
        | {
            name: string | undefined
            fullName: string | undefined
            document: string | undefined
            emails: string[] | undefined
        }
        | undefined

    try {
        whoisData = await whois(domain)
        companyCNPJ = isValidCNPJ(whoisData?.ownerid ?? '')
            ? whoisData?.ownerid
            : undefined
        domainOwner = companyCNPJ
            ? undefined
            : {
                name: whoisData?.owner,
                fullName: whoisData?.person,
                document: whoisData?.ownerid,
                emails: whoisData?.eMail?.split(' '),
            }
    } catch (err) {
        console.log(err)
    }

    try {
        const [CNPJResponse, linkedinResponse] = await Promise.allSettled([
            companyCNPJ ? externalAPIService.fetchCNPJData(companyCNPJ) : undefined,
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

        console.log('company', {
            CNPJData,
            domainOwner,
            linkedinData,
        })
        return {
            CNPJData,
            domainOwner,
            linkedinData,
        }
    } catch (error) {
        console.error(error)
        return new AppError({
            clientMessage: errorMessageKeys.cantSearch,
            apiError: error,
        })
    }
}
