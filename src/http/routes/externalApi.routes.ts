import { Router } from 'express'
import { externalApiController } from '../../modules/externalAPI/infra/express/externalApiController'

export const externalAPIRouter = Router()

externalAPIRouter.get('/fetch-cnpj-data/:cnpj', externalApiController.fetchCNPJData)
externalAPIRouter.post('/company-searchEngine', externalApiController.companySearchEngine)
externalAPIRouter.get('/fetch-company-linkedin-by-domain/:domain', externalApiController.fetchLinkedinCompanyDataByDomain)
