import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../externalAPIService'
import { externalAPIEndpoints } from '../../../../shared/externalAPIEndpoints'
import axios from 'axios'

export async function deepSearchCompany(domain: string) {
    let domainOwner: Record<string, any> | undefined = undefined

    const response = await axios.get(`${externalAPIEndpoints.whois}${domain}`) 
    const output = response.data

    const owner = output.entities[0].legalRepresentative

    const documentType = output.entities[0].publicIds[0].type
    const ownerid = output.entities[0].publicIds[0].identifier

    try {
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
            (domainOwner?.type === 'cnpj' && domainOwner?.document) ? externalAPIService.fetchCNPJData(domainOwner.document) : undefined,
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

