import { Router } from 'express'
import { externalApiController } from '../../modules/externalAPI/infra/express/externalApiController'

export const externalAPIRouter = Router()

externalAPIRouter.get(
  '/fetch-cnpj-data/:cnpj',
  externalApiController.fetchCNPJData,
)

/**
 * @param query - The query to search for
 */
externalAPIRouter.get(
  '/company-searchEngine',
  externalApiController.companySearchEngine,
)
externalAPIRouter.get(
  '/fetch-company-linkedin-by-domain/:domain',
  externalApiController.fetchLinkedinCompanyDataByDomain,
)
externalAPIRouter.get(
  '/deep-search-company/:domain',
  externalApiController.deepSearchCompany,
)

/**
 * @param name - The name of the person
 * @param domain - The domain of the company
 */
externalAPIRouter.get(
  '/fetch-business-email',
  externalApiController.fetchBusinessEmail,
)
