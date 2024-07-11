import { isValidCNPJ } from 'br-lib'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'
import { externalAPIEndpoints } from '../../../../shared/externalAPIEndpoints'
import axios from 'axios'

export async function deepSearchCompany(domain: string) {
    let companyCNPJ: string | undefined | null = undefined
    let domainOwner: Record<string, any> | undefined = undefined

    const response = await axios.get(`${externalAPIEndpoints.whois}${domain}`) 
    const output = response.data
    console.log(output)

    const ownerRegex = /owner:\s+(.*)/;
    const ownerMatch = output.match(ownerRegex);
    const owner = ownerMatch ? ownerMatch[1] : null;

    const personRegex = /person:\s+(.*)/;
    const personMatch = output.match(personRegex);
    const person = personMatch ? personMatch[1] : null;

    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = output.match(emailRegex);

    const owneridRegex = /ownerid:\s+(.*)/;
    const owneridMatch = output.match(owneridRegex);
    const ownerid = owneridMatch ? owneridMatch[1] : null;

    try {
        companyCNPJ = isValidCNPJ(ownerid ?? '')
            ? ownerid
            : undefined
        domainOwner = companyCNPJ
            ? undefined
            : {
                name: owner,
                fullName: person,
                document: ownerid,
                emails: emails?.toString().split(','),
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

