import { companySearchEngine } from './controllers/companySearchEngine.externalAPIController'
import { deepSearchCompany } from './controllers/deepSearchCompany.externalController'
import { fetchBusinessEmail } from './controllers/fetchBusinessEmail.externalAPIController'
import { fetchCNPJData } from './controllers/fetchCNPJData.externalAPIController'
import { fetchLinkedinCompanyDataByDomain } from './controllers/fetchLinkedinCompanyDataByDomain.externalAPIController'
import { locationsSubController } from './controllers/locations/locationsSubController'

export const externalApiController = {
  fetchCNPJData,
  companySearchEngine,
  fetchLinkedinCompanyDataByDomain,
  deepSearchCompany,
  fetchBusinessEmail,
  locationsSubController
}
