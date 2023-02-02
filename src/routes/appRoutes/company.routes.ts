import { Router } from "express"
import { CompanyController } from '../../modules/company/infra/express/companyController'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)

companyRouter.get('/', () => (''))

companyRouter.put('/', () => (''))

companyRouter.delete('/', () => (''))