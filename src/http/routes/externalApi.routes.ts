import { Router } from 'express'
import { externalApiController } from '../../modules/externalAPI/infra/express/externalApiController'

export const externalAPIRouter = Router()

externalAPIRouter.get('/fetch-cnpj-data/:cnpj', externalApiController.fetchCNPJData)
