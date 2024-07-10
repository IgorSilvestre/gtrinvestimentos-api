import { companySearchEngine } from './services/companySearchEngine.externalAPIService'
import { deepSearchCompany } from './services/deepSearchCompany.externalAPIService'
import { fetchBusinessEmail } from './services/fetchBusinessEmail.externalAPIService'
import { fetchCNPJData } from './services/fetchCNPJData.externalAPIService'
import { fetchLinkedinCompanyDataByDomain } from './services/fetchLinkedinCompanyDataByDomain.externalAPIService'
import { locationsSubService } from './services/locations/locations.externalAPIService'
import { scrapeContactsFromWebsite } from './services/scrapeContactsFromWebsite.externalAPIService'

export const externalAPIService = {
    fetchCNPJData,
    companySearchEngine,
    fetchLinkedinCompanyDataByDomain,
    deepSearchCompany,
    fetchBusinessEmail,
    locationsSubService,
    scrapeContactsFromWebsite
}
