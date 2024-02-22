import { companySearchEngine } from './services/companySearchEngine.externalAPIService'
import { deepSearchCompany } from './services/deepSearchCompany.externalAPIService'
import { fetchBusinessEmail } from './services/fetchBusinessEmail.externalAPIService'
import { fetchCNPJData } from './services/fetchCNPJData.externalAPIService'
import { fetchLinkedinCompanyDataByDomain } from './services/fetchLinkedinCompanyDataByDomain.externalAPIService'

export const externalAPIService = {
  fetchCNPJData,
  companySearchEngine,
  fetchLinkedinCompanyDataByDomain,
  deepSearchCompany,
  fetchBusinessEmail
}
